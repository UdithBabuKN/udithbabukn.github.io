import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, output, viewChild } from '@angular/core';
import { PortraitFrame } from '../data/portraits.data';

@Component({
  selector: 'app-portrait-lightbox',
  standalone: true,
  template: `
    <dialog
      #lightboxDialog
      class="ca-lightbox-dialog"
      aria-labelledby="lightbox-caption"
      closedby="any"
      (close)="closed.emit()"
    >
      @if (activeFrame(); as frame) {
        <div class="ca-lightbox-body">
          <img
            [src]="frame.src"
            [alt]="frame.alt"
            class="ca-lightbox-img"
            width="576"
            height="1024"
          />
          <div class="ca-lightbox-bar">
            <div>
              <div id="lightbox-caption" class="ca-lightbox-title">{{ frame.label }}</div>
              <div class="ca-lightbox-sub">{{ frame.frameNum }} / {{ totalCount() }} · {{ frame.series }}</div>
            </div>
            <div class="ca-lightbox-actions">
              <button
                type="button"
                class="ca-lightbox-btn"
                aria-label="Previous portrait"
                (click)="step.emit(-1)"
              >
                ←
              </button>
              <button
                type="button"
                class="ca-lightbox-btn"
                aria-label="Next portrait"
                (click)="step.emit(1)"
              >
                →
              </button>
              <button
                type="button"
                class="ca-lightbox-btn"
                aria-label="Close portrait viewer"
                (click)="close()"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </dialog>
  `,
})
export class PortraitLightboxComponent {
  readonly activeFrame = input<PortraitFrame | null>(null);
  readonly totalCount = input<number>(14);
  readonly step = output<number>();
  readonly closed = output<void>();

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('lightboxDialog');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const dialog = this.dialogRef()?.nativeElement;
      if (!dialog || typeof HTMLDialogElement === 'undefined') return;

      const onKey = (e: KeyboardEvent) => {
        if (!dialog.open) return;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.step.emit(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.step.emit(1);
        }
      };

      const outside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };

      let pressedOutside = false;
      const onDown = (e: PointerEvent) => {
        pressedOutside = outside(e);
      };
      const onUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e) && !('closedBy' in HTMLDialogElement.prototype)) {
          dialog.close();
        }
      };

      window.addEventListener('keydown', onKey);
      dialog.addEventListener('pointerdown', onDown);
      dialog.addEventListener('pointerup', onUp);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('keydown', onKey);
        dialog.removeEventListener('pointerdown', onDown);
        dialog.removeEventListener('pointerup', onUp);
      });
    });
  }

  open(): void {
    const dialog = this.dialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  close(): void {
    this.dialogRef()?.nativeElement.close();
  }
}
