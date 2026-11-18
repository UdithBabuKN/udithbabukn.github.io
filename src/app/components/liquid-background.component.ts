import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-liquid-background',
  standalone: true,
  template: `
    <div class="sk-static-background" aria-hidden="true">
      <canvas #canvas class="sk-liquid-canvas"></canvas>
    </div>
  `,
})
export class LiquidBackgroundComponent {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
      if (!gl) return;

      const vsSource = `
        attribute vec2 aPosition;
        varying vec2 vUv;
        void main() {
          vUv = aPosition * 0.5 + 0.5;
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `;

      const flowmapFsSource = `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tMap;
        uniform float uFalloff;
        uniform float uAlpha;
        uniform float uDissipation;
        uniform float uAspect;
        uniform vec2 uMouse;
        uniform vec2 uVelocity;

        void main() {
          vec2 cursor = vUv - uMouse;
          cursor.x *= uAspect;

          vec4 color = texture2D(tMap, vUv);
          color.rg = (color.rg - 0.5) * uDissipation + 0.5;
          color.b = color.b * uDissipation;

          float speed = length(uVelocity);
          if (speed > 0.0001) {
            vec2 clampedVel = uVelocity;
            float l = length(clampedVel);
            if (l > 1.0) clampedVel /= l;

            vec3 stamp = vec3(clampedVel * 0.5 + 0.5, min(1.0, speed * 2.8));
            float dist = length(cursor);
            float falloff = smoothstep(uFalloff, 0.0, dist) * uAlpha;
            color.rgb = mix(color.rgb, stamp, falloff);
          }

          gl_FragColor = color;
        }
      `;

      const renderFsSource = `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tWater;
        uniform sampler2D tFlow;
        uniform vec4 res;
        uniform float uTime;

        void main() {
          vec4 flowTex = texture2D(tFlow, vUv);
          vec2 flow = (flowTex.rg - 0.5) * 2.0;
          float speed = flowTex.b;

          vec2 myUV = (vUv - vec2(0.5)) * res.zw + vec2(0.5);
          myUV -= flow * (0.15 * 0.7);

          vec4 tex = texture2D(tWater, myUV);
          vec3 normal = normalize(vec3(-flow.x * 2.6, -flow.y * 2.6, 1.0));
          vec3 lightDir = normalize(vec3(0.3, 0.5, 0.82));
          float spec = pow(max(0.0, dot(normal, lightDir)), 18.0) * speed;

          tex.rgb += vec3(1.0) * (spec * 0.35);
          gl_FragColor = vec4(tex.rgb, 1.0);
        }
      `;

      const compileShader = (src: string, type: number) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const createProgram = (vsSrc: string, fsSrc: string) => {
        const vs = compileShader(vsSrc, gl.VERTEX_SHADER);
        const fs = compileShader(fsSrc, gl.FRAGMENT_SHADER);
        if (!vs || !fs) return null;
        const prog = gl.createProgram();
        if (!prog) return null;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          gl.deleteProgram(prog);
          return null;
        }
        return prog;
      };

      const flowmapProg = createProgram(vsSource, flowmapFsSource);
      const renderProg = createProgram(vsSource, renderFsSource);
      if (!flowmapProg || !renderProg) return;

      const quadBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

      const FLOW_SIZE = 256;
      const textures: WebGLTexture[] = [];
      const framebuffers: WebGLFramebuffer[] = [];

      const initialFlowData = new Uint8Array(FLOW_SIZE * FLOW_SIZE * 4);
      for (let i = 0; i < FLOW_SIZE * FLOW_SIZE; i++) {
        initialFlowData[i * 4 + 0] = 128;
        initialFlowData[i * 4 + 1] = 128;
        initialFlowData[i * 4 + 2] = 0;
        initialFlowData[i * 4 + 3] = 255;
      }

      for (let i = 0; i < 2; i++) {
        const tex = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, FLOW_SIZE, FLOW_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, initialFlowData);
        textures.push(tex);

        const fb = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        framebuffers.push(fb);
      }

      let readIndex = 0;
      let writeIndex = 1;

      const waterTexture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, waterTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([17, 68, 209, 255]));

      let cancelled = false;
      let lastActiveTime = performance.now();
      let animId: number | null = null;

      const flowUniforms = {
        tMap: gl.getUniformLocation(flowmapProg, 'tMap'),
        uFalloff: gl.getUniformLocation(flowmapProg, 'uFalloff'),
        uAlpha: gl.getUniformLocation(flowmapProg, 'uAlpha'),
        uDissipation: gl.getUniformLocation(flowmapProg, 'uDissipation'),
        uAspect: gl.getUniformLocation(flowmapProg, 'uAspect'),
        uMouse: gl.getUniformLocation(flowmapProg, 'uMouse'),
        uVelocity: gl.getUniformLocation(flowmapProg, 'uVelocity'),
      };
      const flowPositionAttr = gl.getAttribLocation(flowmapProg, 'aPosition');

      const renderUniforms = {
        tWater: gl.getUniformLocation(renderProg, 'tWater'),
        tFlow: gl.getUniformLocation(renderProg, 'tFlow'),
        res: gl.getUniformLocation(renderProg, 'res'),
        uTime: gl.getUniformLocation(renderProg, 'uTime'),
      };
      const renderPositionAttr = gl.getAttribLocation(renderProg, 'aPosition');

      const mouse = { x: 0.5, y: 0.5 };
      const lastMouse = { x: -1, y: -1 };
      const targetVelocity = { x: 0, y: 0 };
      const currentVelocity = { x: 0, y: 0 };
      let lastTime = performance.now();
      const startTime = performance.now();
      const imageAspect = 1800 / 2880;

      const render = (now: number) => {
        animId = null;
        if (canvas.width === 0 || canvas.height === 0 || window.innerWidth === 0) return;

        currentVelocity.x += (targetVelocity.x - currentVelocity.x) * 0.16;
        currentVelocity.y += (targetVelocity.y - currentVelocity.y) * 0.16;
        targetVelocity.x *= 0.88;
        targetVelocity.y *= 0.88;

        const aspect = canvas.width / canvas.height;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[writeIndex]);
        gl.viewport(0, 0, FLOW_SIZE, FLOW_SIZE);
        gl.useProgram(flowmapProg);
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.enableVertexAttribArray(flowPositionAttr);
        gl.vertexAttribPointer(flowPositionAttr, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures[readIndex]);
        gl.uniform1i(flowUniforms.tMap, 0);
        gl.uniform1f(flowUniforms.uFalloff, 0.18);
        gl.uniform1f(flowUniforms.uAlpha, 0.95);
        gl.uniform1f(flowUniforms.uDissipation, 0.962);
        gl.uniform1f(flowUniforms.uAspect, aspect);
        gl.uniform2f(flowUniforms.uMouse, mouse.x, mouse.y);
        gl.uniform2f(flowUniforms.uVelocity, currentVelocity.x, currentVelocity.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        const temp = readIndex;
        readIndex = writeIndex;
        writeIndex = temp;

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(renderProg);
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.enableVertexAttribArray(renderPositionAttr);
        gl.vertexAttribPointer(renderPositionAttr, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures[readIndex]);
        gl.uniform1i(renderUniforms.tFlow, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, waterTexture);
        gl.uniform1i(renderUniforms.tWater, 1);

        let scaleW: number;
        let scaleH: number;
        const screenAspect = window.innerHeight / window.innerWidth;
        if (screenAspect < imageAspect) {
          scaleW = 1;
          scaleH = screenAspect / imageAspect;
        } else {
          scaleW = (1 / screenAspect) * imageAspect;
          scaleH = 1;
        }

        gl.uniform4f(renderUniforms.res, canvas.width, canvas.height, scaleW, scaleH);
        gl.uniform1f(renderUniforms.uTime, (now - startTime) * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        const speed = Math.hypot(currentVelocity.x, currentVelocity.y);
        if (speed > 0.0005 || now - lastActiveTime < 2200) {
          animId = requestAnimationFrame(render);
        }
      };

      const wake = () => {
        lastActiveTime = performance.now();
        if (animId === null && !cancelled) {
          animId = requestAnimationFrame(render);
        }
      };

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (cancelled) return;
        gl.bindTexture(gl.TEXTURE_2D, waterTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        wake();
      };
      img.src = '/olivasky.png';

      const handlePointer = (clientX: number, clientY: number) => {
        const now = performance.now();
        const dt = Math.max(10, now - lastTime);
        lastTime = now;
        mouse.x = clientX / window.innerWidth;
        mouse.y = 1.0 - clientY / window.innerHeight;
        if (lastMouse.x >= 0) {
          targetVelocity.x = ((clientX - lastMouse.x) / dt) * 1.6;
          targetVelocity.y = -((clientY - lastMouse.y) / dt) * 1.6;
        }
        lastMouse.x = clientX;
        lastMouse.y = clientY;
        wake();
      };

      const onPointerMove = (e: PointerEvent) => handlePointer(e.clientX, e.clientY);
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onPointerDown = (e: PointerEvent | TouchEvent) => {
        const clientX =
          'clientX' in e ? e.clientX : e.touches?.[0]?.clientX ?? window.innerWidth * 0.5;
        const clientY =
          'clientY' in e ? e.clientY : e.touches?.[0]?.clientY ?? window.innerHeight * 0.5;
        handlePointer(clientX, clientY);
        targetVelocity.x += (Math.random() - 0.5) * 3.5;
        targetVelocity.y += (Math.random() - 0.5) * 3.5;
        wake();
      };
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        wake();
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerdown', onPointerDown, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('resize', resize, { passive: true });
      resize();

      this.destroyRef.onDestroy(() => {
        cancelled = true;
        img.onload = null;
        if (animId !== null) cancelAnimationFrame(animId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchstart', onPointerDown);
        window.removeEventListener('resize', resize);
        for (let i = 0; i < 2; i++) {
          gl.deleteTexture(textures[i]);
          gl.deleteFramebuffer(framebuffers[i]);
        }
        gl.deleteTexture(waterTexture);
        gl.deleteBuffer(quadBuffer);
        gl.deleteProgram(flowmapProg);
        gl.deleteProgram(renderProg);
      });
    });
  }
}
