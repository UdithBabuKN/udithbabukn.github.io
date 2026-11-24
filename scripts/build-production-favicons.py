import os
import shutil
import subprocess
from PIL import Image, ImageDraw

workspace_dir = r"c:\Users\Admin\OneDrive\Desktop\udithbabukn.github.io-main"
public_dir = os.path.join(workspace_dir, "public")
artifact_dir = r"C:\Users\Admin\.gemini\antigravity\brain\12bbfec4-39d8-4992-a47d-8ddb5b5aa061"

svg_path = os.path.join(public_dir, "favicon.svg")

# 1. Create a clean standalone HTML template for 1024x1024 screenshot with transparent body
render_html = os.path.join(public_dir, "_render_temp.html")
with open(svg_path, "r", encoding="utf-8") as f:
    svg_content = f.read()

html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{ width: 1024px; height: 1024px; overflow: hidden; background: transparent !important; }}
  svg {{ width: 1024px; height: 1024px; display: block; }}
</style>
</head>
<body>
{svg_content}
</body>
</html>"""

with open(render_html, "w", encoding="utf-8") as f:
    f.write(html_content)

# 2. Render 1024x1024 PNG using Chrome headless with transparent background
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
temp_png_1024 = os.path.join(public_dir, "_temp_1024.png")

cmd = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--default-background-color=00000000",
    "--force-device-scale-factor=1",
    "--window-size=1024,1024",
    f"--screenshot={temp_png_1024}",
    f"file:///{render_html.replace(os.sep, '/')}"
]

print("Rendering 1024x1024 with Chrome headless...")
subprocess.run(cmd, check=True)

raw_img = Image.open(temp_png_1024).convert("RGBA")

# 3. Create a strict squircle alpha mask at 1024x1024 (radius = 256px, 25%)
# This guarantees that all 4 corners are mathematically (0, 0, 0, 0) - ZERO white pixels!
width, height = raw_img.size
mask = Image.new("L", (width, height), 0)
draw = ImageDraw.Draw(mask)
corner_radius = int(width * 0.25)
draw.rounded_rectangle((0, 0, width, height), radius=corner_radius, fill=255)

# Clean master image: wherever mask is 0, pixel is (0, 0, 0, 0)
master_1024 = Image.new("RGBA", (width, height), (0, 0, 0, 0))
master_1024.paste(raw_img, (0, 0), mask=mask)

print(f"Master top-left pixel: {master_1024.getpixel((0, 0))}")
print(f"Master top-right pixel: {master_1024.getpixel((width - 1, 0))}")
print(f"Master center pixel: {master_1024.getpixel((width // 2, height // 2))}")

# 4. Save 1:1 master PNG
master_png_path = os.path.join(public_dir, "udith-brand-mark-1x1.png")
master_1024.save(master_png_path, "PNG", optimize=True)
print(f"Saved: {master_png_path}")

# Copy 1:1 master to artifact directory
artifact_master = os.path.join(artifact_dir, "udith-brand-mark-1x1.png")
shutil.copyfile(master_png_path, artifact_master)
print(f"Saved artifact: {artifact_master}")

def export_icon(size, filename):
    resized = master_1024.resize((size, size), Image.Resampling.LANCZOS)
    # Re-apply exact squircle mask at target size to eliminate any downsampling fringing
    target_mask = Image.new("L", (size, size), 0)
    target_draw = ImageDraw.Draw(target_mask)
    r = max(2, int(size * 0.25))
    target_draw.rounded_rectangle((0, 0, size, size), radius=r, fill=255)
    
    clean_icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    clean_icon.paste(resized, (0, 0), mask=target_mask)
    
    out_path = os.path.join(public_dir, filename)
    clean_icon.save(out_path, "PNG", optimize=True)
    print(f"Saved {filename} ({size}x{size}) - corner(0,0): {clean_icon.getpixel((0,0))}")
    return clean_icon

# Export all PNG sizes
export_icon(512, "android-chrome-512x512.png")
export_icon(512, "favicon-512x512.png")
export_icon(192, "android-chrome-192x192.png")
export_icon(180, "apple-touch-icon.png")
icon_32 = export_icon(32, "favicon-32x32.png")
icon_16 = export_icon(16, "favicon-16x16.png")

# 5. Build multi-resolution ICO with 16, 32, 48, 64
icon_48 = master_1024.resize((48, 48), Image.Resampling.LANCZOS)
icon_64 = master_1024.resize((64, 64), Image.Resampling.LANCZOS)

ico_path = os.path.join(public_dir, "favicon.ico")
master_1024.save(
    ico_path,
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
)
print(f"Saved multi-resolution ICO: {ico_path}")

# Cleanup temp files
if os.path.exists(render_html):
    os.remove(render_html)
if os.path.exists(temp_png_1024):
    os.remove(temp_png_1024)

print("ALL FAVICON ASSETS GENERATED WITH ZERO CORNER ARTIFACTS!")
