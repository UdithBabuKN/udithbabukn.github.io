import os
import shutil
import subprocess
from PIL import Image

workspace_dir = r"c:\Users\Admin\OneDrive\Desktop\udithbabukn.github.io-main"
public_dir = os.path.join(workspace_dir, "public")
artifact_dir = r"C:\Users\Admin\.gemini\antigravity\brain\12bbfec4-39d8-4992-a47d-8ddb5b5aa061"

option9_svg_path = os.path.join(public_dir, "favicons", "option9.svg")
target_svg_path = os.path.join(public_dir, "favicon.svg")

# 1. Copy option9.svg to public/favicon.svg
shutil.copyfile(option9_svg_path, target_svg_path)
print(f"Copied {option9_svg_path} -> {target_svg_path}")

# 2. Create a clean standalone HTML template for 1024x1024 screenshot
render_html = os.path.join(public_dir, "_render_temp.html")
with open(option9_svg_path, "r", encoding="utf-8") as f:
    svg_content = f.read()

html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{ width: 1024px; height: 1024px; overflow: hidden; background: transparent; }}
  svg {{ width: 1024px; height: 1024px; display: block; }}
</style>
</head>
<body>
{svg_content}
</body>
</html>"""

with open(render_html, "w", encoding="utf-8") as f:
    f.write(html_content)

# 3. Render 1024x1024 PNG using Chrome headless
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
temp_png_1024 = os.path.join(public_dir, "_temp_1024.png")

cmd = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--force-device-scale-factor=1",
    "--window-size=1024,1024",
    f"--screenshot={temp_png_1024}",
    f"file:///{render_html.replace(os.sep, '/')}"
]

print("Rendering 1024x1024 with Chrome headless...")
subprocess.run(cmd, check=True)

# 4. Process with PIL
img = Image.open(temp_png_1024).convert("RGBA")
print(f"Rendered image size: {img.size}")

# High-Res 1:1 master PNG
master_1024 = os.path.join(public_dir, "udith-brand-mark-1x1.png")
img.save(master_1024, "PNG", optimize=True)
print(f"Saved: {master_1024}")

# Copy 1:1 master to artifact directory for easy user download
artifact_master = os.path.join(artifact_dir, "udith-brand-mark-1x1.png")
shutil.copyfile(master_1024, artifact_master)
print(f"Saved artifact: {artifact_master}")

# 512x512
img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
img_512.save(os.path.join(public_dir, "android-chrome-512x512.png"), "PNG", optimize=True)
img_512.save(os.path.join(public_dir, "favicon-512x512.png"), "PNG", optimize=True)

# 192x192
img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img_192.save(os.path.join(public_dir, "android-chrome-192x192.png"), "PNG", optimize=True)

# 180x180 (Apple touch icon)
img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
img_180.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG", optimize=True)

# 32x32
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG", optimize=True)

# 16x16
img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG", optimize=True)

# Multi-resolution ICO: 16, 32, 48, 64
ico_path = os.path.join(public_dir, "favicon.ico")
img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print(f"Saved multi-res ICO: {ico_path}")

# Cleanup temp files
if os.path.exists(render_html):
    os.remove(render_html)
if os.path.exists(temp_png_1024):
    os.remove(temp_png_1024)

print("All production favicon formats and 1:1 PNG generated successfully!")
