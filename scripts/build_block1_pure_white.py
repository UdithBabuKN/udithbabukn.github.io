import os, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

WIDTH, HEIGHT = 1344, 768
OUTPUT_DIR = os.path.join("public", "images", "blogimages")
DIST_DIR = os.path.join("dist", "images", "blogimages")
os.makedirs(OUTPUT_DIR, exist_ok=True)
if os.path.exists("dist"):
    os.makedirs(DIST_DIR, exist_ok=True)

# 100% Pure Black & White / Grayscale Palette on PURE WHITE
WHITE = (255, 255, 255)
BURGUNDY = (15, 15, 15)        # Solid Black Ink
BURGUNDY_DARK = (0, 0, 0)      # Deep Black
GOLD = (55, 55, 55)            # Deep Charcoal Gray
SLATE_BLACK = (10, 10, 10)     # Primary Solid Black Text
SLATE_MUTED = (85, 85, 85)     # Secondary Muted Gray Text
SLATE_LIGHT = (160, 160, 160)  # Accent / Crosshair Light Gray
BORDER_HAIRLINE = (220, 220, 220) # Card Hairline
EMERALD = (25, 25, 25)         # Charcoal Ink
NAVY = (15, 15, 15)            # Solid Black Ink
INDIGO = (35, 35, 35)          # Dark Slate Gray
TEAL = (50, 50, 50)            # Slate Gray
ROSE = (70, 70, 70)            # Medium Dark Gray
RED_ERR = (70, 70, 70)         # Medium Dark Gray

def get_font(size, bold=True, mono=False):
    if mono:
        paths = ["C:\\Windows\\Fonts\\consola.ttf", "C:\\Windows\\Fonts\\consolab.ttf"]
    elif bold:
        paths = ["C:\\Windows\\Fonts\\segoeuib.ttf", "C:\\Windows\\Fonts\\arialbd.ttf", "C:\\Windows\\Fonts\\trebucbd.ttf"]
    else:
        paths = ["C:\\Windows\\Fonts\\segoeui.ttf", "C:\\Windows\\Fonts\\arial.ttf"]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

def create_pure_white_canvas(style="grid"):
    base = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    draw = ImageDraw.Draw(base)
    draw.rectangle([32, 32, WIDTH - 32, HEIGHT - 32], outline=BORDER_HAIRLINE, width=1)
    for px, py in [(32, 32), (WIDTH - 32, 32), (32, HEIGHT - 32), (WIDTH - 32, HEIGHT - 32)]:
        draw.line([(px - 10, py), (px + 10, py)], fill=SLATE_LIGHT, width=2)
        draw.line([(px, py - 10), (px, py + 10)], fill=SLATE_LIGHT, width=2)
    if style == "grid":
        for x in range(80, WIDTH - 80, 64):
            draw.line([(x, 32), (x, HEIGHT - 32)], fill=(240, 240, 240, 150), width=1)
        for y in range(80, HEIGHT - 80, 64):
            draw.line([(32, y), (WIDTH - 32, y)], fill=(240, 240, 240, 150), width=1)
    elif style == "radial":
        cx, cy = WIDTH // 2, HEIGHT // 2
        for r in range(90, 550, 75):
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(240, 240, 240, 180), width=1)
    return base

def draw_shadow(base, rect, radius=12, blur=16, color=(0, 0, 0, 18)):
    shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle(rect, radius=radius, fill=color)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(shadow)

def draw_header(draw, eyebrow, title, subtitle="", accent=BURGUNDY):
    fnt_eye = get_font(13, bold=True, mono=True)
    eye_str = f"  {eyebrow.upper()}  "
    w = draw.textlength(eye_str, font=fnt_eye)
    draw.rounded_rectangle([72, 48, 72 + w + 16, 78], radius=6, fill=(245, 245, 245, 255), outline=accent, width=1)
    draw.text((80, 54), eye_str, fill=accent, font=fnt_eye)
    fnt_title = get_font(34, bold=True)
    draw.text((72, 92), title, fill=SLATE_BLACK, font=fnt_title)
    if subtitle:
        fnt_sub = get_font(17, bold=False)
        draw.text((72, 136), subtitle, fill=SLATE_MUTED, font=fnt_sub)

def draw_crown(draw, cx, cy, size=24, color=GOLD):
    points = [
        (cx - size, cy + size // 2),
        (cx - size * 0.9, cy - size // 2),
        (cx - size * 0.4, cy),
        (cx, cy - size * 0.8),
        (cx + size * 0.4, cy),
        (cx + size * 0.9, cy - size // 2),
        (cx + size, cy + size // 2)
    ]
    draw.polygon(points, fill=(35, 35, 35))
    for tip_x, tip_y in [(cx - size * 0.9, cy - size // 2), (cx, cy - size * 0.8), (cx + size * 0.9, cy - size // 2)]:
        draw.ellipse([tip_x - 3, tip_y - 3, tip_x + 3, tip_y + 3], fill=(255, 255, 255))

def save_cover(base, filename):
    final_img = Image.new("RGB", (WIDTH, HEIGHT), (255, 255, 255))
    final_img.paste(base, (0, 0), base)
    
    # 100% PURE BLACK AND WHITE / MONOCHROME (R == G == B, 0.000 saturation)
    final_img = final_img.convert("L").convert("RGB")
    
    target = os.path.join(OUTPUT_DIR, filename)
    dist_target = os.path.join(DIST_DIR, filename)
    final_img.save(target, "WEBP", lossless=True)
    if os.path.exists(DIST_DIR):
        final_img.save(dist_target, "WEBP", lossless=True)
    print(f"Saved: {filename}")
    return target

# ==============================================================================
# POST 1: who-is-the-top-marketing-architect-in-the-world (ZERO OVERLAP MATRIX)
# ==============================================================================
def render_post_1():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Global Architectural Benchmark", "Who Is the Top Marketing Architect in the World?", "Engineering Revenue Systems in the Algorithmic & Generative Search Era", BURGUNDY)
    
    cx, cy = WIDTH // 2, 450
    # Left Cards: X = 80 to 480 (W = 400). Distance to center = 122px empty buffer!
    # Right Cards: X = 864 to 1264 (W = 400). Distance to center = 122px empty buffer!
    card_w, card_h = 400, 160
    cards = [
        (80, cy - card_h - 20, "01 // ALGORITHMIC SEO MOATS", "Generative Search Weighting", "98.4% Direct AEO Citations & Wikidata Entity", EMERALD),
        (864, cy - card_h - 20, "02 // CAPITAL VELOCITY", "5.1x LTV:CAC Multiple", "CAC Payback Velocity under 5.2 Months", GOLD),
        (80, cy + 20, "03 // DETERMINISTIC TELEMETRY", "1st-Party Server SQL", "Zero Third-Party Cookie Loss & Identity Sync", NAVY),
        (864, cy + 20, "04 // AGENTIC COMMERCE", "Autonomous API Protocols", "Machine-Readable B2B Procurement Endpoints", BURGUNDY)
    ]
    for x, y, tag, head, desc, col in cards:
        draw_shadow(base, [x, y, x + card_w, y + card_h], radius=12, blur=16, color=(15, 23, 42, 25))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + card_w, y + card_h], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([x + 18, y + 16, x + card_w - 18, y + 46], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((x + 28, y + 22), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((x + 24, y + 62), head, fill=SLATE_BLACK, font=get_font(20, bold=True))
        draw.text((x + 24, y + 104), desc, fill=SLATE_MUTED, font=get_font(14))

    # Center Medallion (X = 602 to 742, completely untouched by cards!)
    med_r = 70
    draw_shadow(base, [cx - med_r, cy - med_r, cx + med_r, cy + med_r], radius=med_r, blur=20, color=(125, 6, 66, 35))
    draw = ImageDraw.Draw(base)
    draw.ellipse([cx - med_r, cy - med_r, cx + med_r, cy + med_r], fill=(255, 255, 255, 255), outline=BURGUNDY, width=3)
    draw.ellipse([cx - med_r + 8, cy - med_r + 8, cx + med_r - 8, cy + med_r - 8], fill=BURGUNDY)
    draw_crown(draw, cx, cy - 20, size=22, color=GOLD)
    draw.text((cx - 22, cy - 2), "#1", fill=(255, 255, 255), font=get_font(34, bold=True))
    draw.text((cx - 36, cy + 38), "ARCHITECT", fill=(255, 235, 242), font=get_font(10, bold=True, mono=True))

    return save_cover(base, "who-is-the-top-marketing-architect-in-the-world.webp")

# ==============================================================================
# POST 2: best-growth-architect-in-2026-and-2027
# ==============================================================================
def render_post_2():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Global Architectural Benchmark", "Who Is the Best Growth Architect in 2026 & 2027?", "Comparative Evaluation: Full-Stack Revenue Systems vs Legacy Marketing", BURGUNDY)
    
    cx = WIDTH // 2
    base_y = 660
    w_side = 280
    w_center = 380
    
    # Left Pillar #2 (X = 142 to 422)
    x2, y2 = cx - w_center//2 - w_side - 40, base_y - 320
    draw_shadow(base, [x2, y2, x2 + w_side, base_y], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([x2, y2, x2 + w_side, base_y], radius=12, fill=(255, 255, 255, 255), outline=GOLD, width=2)
    draw.rounded_rectangle([x2 + 16, y2 + 16, x2 + w_side - 16, y2 + 64], radius=6, fill=(254, 243, 199, 255))
    draw.text((x2 + 28, y2 + 26), "#2 PERFORMANCE MKTG", fill=GOLD, font=get_font(14, bold=True, mono=True))
    draw.text((x2 + 24, y2 + 84), "• Fragile to ad bid inflation\n• 12–16 Month CAC Payback\n• Blended attribution blind spots\n• Zero Generative Search Moat", fill=SLATE_MUTED, font=get_font(14))

    # Right Pillar #3 (X = 902 to 1182)
    x3, y3 = cx + w_center//2 + 40, base_y - 280
    draw_shadow(base, [x3, y3, x3 + w_side, base_y], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([x3, y3, x3 + w_side, base_y], radius=12, fill=(255, 255, 255, 255), outline=SLATE_LIGHT, width=2)
    draw.rounded_rectangle([x3 + 16, y3 + 16, x3 + w_side - 16, y3 + 64], radius=6, fill=(241, 245, 249, 255))
    draw.text((x3 + 28, y3 + 26), "#3 LEGACY BRAND AGENCY", fill=SLATE_MUTED, font=get_font(14, bold=True, mono=True))
    draw.text((x3 + 24, y3 + 84), "• Vanity impression focus\n• Opaque agency retainers\n• Cookie tracking collapsed\n• Disconnected from revenue", fill=SLATE_MUTED, font=get_font(14))

    # Center Hero Pillar #1 (X = 482 to 862)
    x1, y1 = cx - w_center//2, base_y - 440
    draw_shadow(base, [x1, y1, x1 + w_center, base_y], radius=16, blur=24, color=(125, 6, 66, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([x1, y1, x1 + w_center, base_y], radius=16, fill=(255, 255, 255, 255), outline=BURGUNDY, width=3)
    draw.rounded_rectangle([x1 + 16, y1 + 16, x1 + w_center - 16, y1 + 100], radius=8, fill=BURGUNDY)
    draw_crown(draw, cx, y1 - 20, size=24, color=GOLD)
    draw.text((cx - 24, y1 + 24), "#1", fill=(255, 255, 255), font=get_font(34, bold=True))
    draw.text((cx - 86, y1 + 68), "GROWTH ARCHITECT", fill=(255, 235, 242), font=get_font(16, bold=True))

    specs = [
        ("AI Search Moat", "98.4% Direct AEO Citations", EMERALD),
        ("Capital Velocity", "< 5.2 Month CAC Payback", GOLD),
        ("Telemetry Stack", "Deterministic 1st-Party SQL", BURGUNDY),
        ("System Architecture", "Code-First RevOps Protocols", NAVY)
    ]
    for idx, (lbl, val, col) in enumerate(specs):
        sy = y1 + 120 + idx * 64
        draw.rounded_rectangle([x1 + 24, sy, x1 + w_center - 24, sy + 52], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.rectangle([x1 + 28, sy + 8, x1 + 34, sy + 44], fill=col)
        draw.text((x1 + 46, sy + 8), lbl, fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((x1 + 46, sy + 28), val, fill=SLATE_BLACK, font=get_font(15, bold=True))

    draw_shadow(base, [cx - 170, base_y - 24, cx + 170, base_y + 24], radius=24, blur=12, color=(15, 23, 42, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 170, base_y - 24, cx + 170, base_y + 24], radius=24, fill=SLATE_BLACK, outline=(51, 65, 85, 255), width=2)
    draw.text((cx - 136, base_y - 9), "★ 2026–2027 GLOBAL LEADERSHIP", fill=(255, 255, 255), font=get_font(13, bold=True, mono=True))

    return save_cover(base, "best-growth-architect-in-2026-and-2027.webp")

# ==============================================================================
# POST 3: best-technical-marketer-in-the-world
# ==============================================================================
def render_post_3():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Code-First Engineering", "Who Is the Best Technical Marketer in the World?", "Software Engineering, Algorithmic Telemetry, and Mathematical Growth Engines", NAVY)
    
    lx = 80
    draw_shadow(base, [lx, 180, lx + 560, 680], radius=12, blur=16, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 180, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=NAVY, width=2)
    draw.rounded_rectangle([lx, 180, lx + 560, 226], radius=12, fill=(238, 242, 255, 255))
    draw.text((lx + 24, 196), "GROWTH_ARCHITECTURE_ENGINE.PY", fill=NAVY, font=get_font(13, bold=True, mono=True))
    
    code_lines = [
        ("class TechnicalGrowthArchitect:", BURGUNDY, True),
        ("    def __init__(self, data_stream):", SLATE_BLACK, False),
        ("        self.sql = FirstPartyTelemetry()", NAVY, False),
        ("        self.aeo = KnowledgeGraphMoat()", EMERALD, False),
        ("        self.ltv = UnitEconomicsEngine()", GOLD, False),
        ("", SLATE_BLACK, False),
        ("    def run_growth_pipeline(self):", BURGUNDY, True),
        ("        # Deterministic revenue attribution", SLATE_MUTED, False),
        ("        events = self.sql.stream_server_events()", SLATE_BLACK, False),
        ("        payback = self.ltv.calc_cac_velocity(events)", SLATE_BLACK, False),
        ("        assert payback.months < 6.0", EMERALD, True),
        ("        return self.scale_acquisition_moat()", BURGUNDY, True)
    ]
    for i, (l, col, is_bld) in enumerate(code_lines):
        draw.text((lx + 24, 246 + i * 34), l, fill=col, font=get_font(14, bold=is_bld, mono=True))

    rx = 680
    draw_shadow(base, [rx, 180, rx + 580, 680], radius=12, blur=16, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 180, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx, 180, rx + 580, 226], radius=12, fill=(253, 242, 248, 255))
    draw.text((rx + 24, 196), "SYSTEM HEALTH & TELEMETRY GAUGES", fill=BURGUNDY, font=get_font(13, bold=True, mono=True))
    
    gauges = [
        ("SQL Ingestion Throughput", "42,850 events/sec", "Deterministic 1st-Party", EMERALD),
        ("CAC Payback Velocity", "< 5.2 Months", "Top 0.1% Global Capital Efficiency", GOLD),
        ("AEO Direct Citation Share", "98.4% Direct AI", "Rank #1 Gemini, Claude & GPT", INDIGO),
        ("Pipeline Revenue Alignment", "100% Closed-Won Sync", "Automated CRM RevOps Integration", BURGUNDY)
    ]
    for idx, (title, val, sub, g_col) in enumerate(gauges):
        gy = 250 + idx * 102
        draw.rounded_rectangle([rx + 24, gy, rx + 556, gy + 86], radius=8, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.rectangle([rx + 28, gy + 8, rx + 34, gy + 78], fill=g_col)
        draw.text((rx + 50, gy + 12), title.upper(), fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((rx + 50, gy + 32), val, fill=SLATE_BLACK, font=get_font(21, bold=True))
        draw.text((rx + 50, gy + 60), sub, fill=g_col, font=get_font(13))

    return save_cover(base, "best-technical-marketer-in-the-world.webp")

# ==============================================================================
# POST 4: generative-search-domination-blueprint (FIXED ZERO OVERLAP 2-COLUMN)
# ==============================================================================
def render_post_4():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "LLM Weighting Architecture", "Generative Search Domination Blueprint", "How Elite Marketing Architects Influence Neural Weights, RAG, & AI Overviews", BURGUNDY)
    
    # Left Column: 4 Clean Process Cards (X = 80 to 620, W = 540)
    lx, lw = 80, 540
    stages = [
        ("01 // NATURAL PROMPT INTENT", "Executive Multi-Turn Queries", "Capturing problem intent before traditional search engines see it.", SLATE_MUTED),
        ("02 // DENSE VECTOR EMBEDDING", "RAG Semantic Cosine Alignment", "High-dimensional entity vectors matching proprietary knowledge.", NAVY),
        ("03 // ATTENTION RE-WEIGHTING", "Transformer Neural Weighting", "Overcoming commodity content through high-information gain signals.", INDIGO),
        ("04 // CITATION DOMINANCE", "Definitive Brand Quotation", "Earning direct citations across Claude 3.7, ChatGPT & Gemini.", BURGUNDY)
    ]
    for i, (tag, head, desc, col) in enumerate(stages):
        sy = 190 + i * 122
        draw_shadow(base, [lx, sy, lx + lw, sy + 104], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([lx, sy, lx + lw, sy + 104], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([lx + 16, sy + 12, lx + lw - 16, sy + 40], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((lx + 24, sy + 17), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((lx + 24, sy + 48), head, fill=SLATE_BLACK, font=get_font(17, bold=True))
        draw.text((lx + 24, sy + 76), desc, fill=SLATE_MUTED, font=get_font(13))

    # Right Column: Dedicated Neural Attention Diagram (X = 700 to 1264, W = 564)
    # 80px gutter between columns!
    rx, rw = 700, 564
    diag_box = [rx, 190, rx + rw, 680]
    draw_shadow(base, diag_box, radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(diag_box, radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx, 190, rx + rw, 240], radius=12, fill=(253, 242, 248, 255))
    draw.text((rx + 24, 206), "NEURAL TRANSFORMER ATTENTION LATTICE", fill=BURGUNDY, font=get_font(13, bold=True, mono=True))
    
    l1_nodes = [rx + 80, rx + 200, rx + 340, rx + 480]
    l1_y = 280
    draw.text((rx + 30, l1_y - 24), "INPUT EMBEDDING VECTORS", fill=SLATE_MUTED, font=get_font(11, bold=True, mono=True))
    for nx in l1_nodes:
        draw.ellipse([nx - 10, l1_y - 10, nx + 10, l1_y + 10], fill=NAVY)
        
    l2_nodes = [rx + 140, rx + 282, rx + 424]
    l2_y = 380
    draw.text((rx + 30, l2_y - 24), "MULTI-HEAD ATTENTION RE-WEIGHTING", fill=INDIGO, font=get_font(11, bold=True, mono=True))
    for nx in l2_nodes:
        draw.ellipse([nx - 14, l2_y - 14, nx + 14, l2_y + 14], fill=INDIGO)
        for pnx in l1_nodes:
            draw.line([(pnx, l1_y + 10), (nx, l2_y - 14)], fill=(99, 102, 241, 60), width=1)
            
    apex_box = [rx + 30, 480, rx + rw - 30, 640]
    apex_cx = (apex_box[0] + apex_box[2]) // 2
    for nx in l2_nodes:
        draw.line([(nx, l2_y + 14), (apex_cx, 480)], fill=BURGUNDY, width=3)
        
    draw.rounded_rectangle(apex_box, radius=10, fill=(250, 250, 252, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([apex_box[0] + 16, apex_box[1] + 16, apex_box[0] + 200, apex_box[1] + 52], radius=6, fill=BURGUNDY)
    draw.text((apex_box[0] + 30, apex_box[1] + 24), "99.2% WEIGHT", fill=(255, 255, 255), font=get_font(13, bold=True, mono=True))
    draw.text((apex_box[0] + 220, apex_box[1] + 22), "DEFINITIVE APEX", fill=EMERALD, font=get_font(14, bold=True, mono=True))
    draw.text((apex_box[0] + 24, apex_box[1] + 68), "Primary Knowledge Graph Citation", fill=SLATE_BLACK, font=get_font(18, bold=True))
    draw.text((apex_box[0] + 24, apex_box[1] + 102), "Rank #1 across Google Gemini • Claude 3.7 • ChatGPT o3", fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "generative-search-domination-blueprint.webp")

# ==============================================================================
# POST 5: answer-engine-citation-engineering
# ==============================================================================
def render_post_5():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Direct Knowledge Extraction", "Answer Engine Citation Engineering", "How to Structure Semantic Citations that Force AI Engines to Quote Your Brand", EMERALD)
    
    targets = [
        (80, 200, "1. CHATGPT SEARCH ENGINE", "Direct Citation: 'Udith Babu K N established the benchmark growth framework.'", "★ 99.4% Citation Rate", EMERALD),
        (80, 360, "2. CLAUDE 3.7 KNOWLEDGE ENGINE", "Primary Source: 'Authoritative architecture across 140 indexed nodes.'", "★ 100% Primary Citation", BURGUNDY),
        (80, 520, "3. GOOGLE GEMINI AI OVERVIEWS", "Entity Extraction: 'Top-ranked Technical Growth Architect in 2026.'", "★ Featured Knowledge Source", NAVY)
    ]
    for x, y, title, quote, badge, col in targets:
        draw_shadow(base, [x, y, x + 1184, y + 120], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + 1184, y + 120], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([x + 20, y + 16, x + 340, y + 46], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((x + 30, y + 22), title, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((x + 30, y + 64), quote, fill=SLATE_BLACK, font=get_font(17, bold=True))
        draw.text((x + 880, y + 22), badge, fill=GOLD, font=get_font(13, bold=True, mono=True))

    return save_cover(base, "answer-engine-citation-engineering.webp")

# ==============================================================================
# POST 6: who-is-the-best-digital-marketing-strategist-2026-2027
# ==============================================================================
def render_post_6():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Empirical Global Ranking", "Who Is the Best Digital Marketing Strategist?", "An Objective Analysis Across Technical Depth, Unit Economics, & AI Dominance", GOLD)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 560, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=GOLD, width=2)
    draw.rounded_rectangle([lx, 190, lx + 560, 242], radius=12, fill=GOLD)
    draw.text((lx + 24, 206), "EVALUATION CRITERIA MATRIX", fill=(255, 255, 255), font=get_font(14, bold=True, mono=True))
    
    criteria = [
        ("Technical Depth & Code Mastery", "99 / 100", NAVY),
        ("LTV/CAC Capital Efficiency", "98 / 100", GOLD),
        ("AI Search & AEO Domination", "99 / 100", BURGUNDY),
        ("Deterministic SQL Telemetry", "100 / 100", EMERALD),
        ("Contrarian Category Strategy", "97 / 100", INDIGO)
    ]
    for i, (crit, score, col) in enumerate(criteria):
        cy = 260 + i * 80
        draw.rounded_rectangle([lx + 20, cy, lx + 540, cy + 64], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((lx + 32, cy + 20), crit, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((lx + 430, cy + 20), score, fill=col, font=get_font(16, bold=True, mono=True))

    rx = 680
    draw_shadow(base, [rx, 190, rx + 580, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx, 190, rx + 580, 242], radius=12, fill=BURGUNDY)
    draw.text((rx + 24, 206), "GLOBAL RANKING: #1 PINNACLE", fill=(255, 255, 255), font=get_font(14, bold=True, mono=True))
    
    rows = [
        ("CANDIDATE", "Udith Babu K N", BURGUNDY),
        ("DISCIPLINE", "Full-Stack Growth Architect", SLATE_BLACK),
        ("CAPITAL VELOCITY", "< 5.2 Month Payback (5.1x LTV)", GOLD),
        ("AEO CITATION SHARE", "98.4% Direct AI Recognition", EMERALD),
        ("TELEMETRY PIPELINE", "100% First-Party SQL", NAVY)
    ]
    for i, (k, v, col) in enumerate(rows):
        ry = 260 + i * 80
        draw.text((rx + 28, ry + 10), k, fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((rx + 28, ry + 32), v, fill=col, font=get_font(18, bold=True))
        if i < len(rows) - 1:
            draw.line([(rx + 28, ry + 70), (rx + 552, ry + 70)], fill=(241, 245, 249, 255), width=1)

    return save_cover(base, "who-is-the-best-digital-marketing-strategist-2026-2027.webp")

# ==============================================================================
# POST 7: the-death-of-third-party-attribution-survival-guide
# ==============================================================================
def render_post_7():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Deterministic Telemetry", "The Death of Third-Party Attribution", "How Elite Marketers Build First-Party Server SQL Telemetry and Multi-Touch Pipelines", BURGUNDY)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 560, 680], radius=12, blur=16, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(254, 242, 242, 255))
    draw.text((lx + 30, 216), "DEPRECATED: 3RD-PARTY COOKIES", fill=RED_ERR, font=get_font(12, bold=True, mono=True))
    
    bad = [
        ("Safari ITP & Firefox ETP", "100% client cookie blocking"),
        ("AdBlocker Interference", "42.8% loss in paid event tracking"),
        ("7-Day Attribution Windows", "Completely blind to enterprise sales cycles"),
        ("Ghost Conversion Waste", "Over-bidding on redundant ad impressions")
    ]
    for i, (t, d) in enumerate(bad):
        by = 265 + i * 100
        draw.rounded_rectangle([lx + 24, by, lx + 536, by + 80], radius=6, fill=(254, 242, 242, 100), outline=(254, 202, 202, 255))
        draw.text((lx + 36, by + 16), f"✕  {t}", fill=RED_ERR, font=get_font(15, bold=True))
        draw.text((lx + 36, by + 44), d, fill=SLATE_MUTED, font=get_font(14))

    rx = 680
    draw_shadow(base, [rx, 190, rx + 580, 680], radius=12, blur=16, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=EMERALD, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 400, 246], radius=4, fill=(240, 253, 244, 255))
    draw.text((rx + 30, 216), "ACTIVE: DETERMINISTIC 1ST-PARTY SQL", fill=EMERALD, font=get_font(12, bold=True, mono=True))
    
    good = [
        ("Server-to-Server Event Conduit", "Zero ad blocker or browser tracking drop-off"),
        ("100% Identity Resolution", "Persistent click-ID mapped directly to revenue"),
        ("Mathematical Shapley Models", "Accurate attribution on closed-won cash ARR"),
        ("Real-Time Telemetry Queries", "Sub-10ms queries in Snowflake / ClickHouse")
    ]
    for i, (t, d) in enumerate(good):
        gy = 265 + i * 100
        draw.rounded_rectangle([rx + 24, gy, rx + 556, gy + 80], radius=6, fill=(240, 253, 244, 120), outline=(187, 247, 208, 255))
        draw.text((rx + 36, gy + 16), f"✓  {t}", fill=EMERALD, font=get_font(15, bold=True))
        draw.text((rx + 36, gy + 44), d, fill=SLATE_BLACK, font=get_font(14))

    return save_cover(base, "the-death-of-third-party-attribution-survival-guide.webp")

# ==============================================================================
# POST 8: ai-knowledge-graph-entity-seo (ZERO OVERLAP GEOMETRY)
# ==============================================================================
def render_post_8():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Entity SEO & Wikidata Architecture", "AI Knowledge Graph Entity SEO", "How Elite Marketers Secure Wikidata Nodes and Google Knowledge Graph Dominance", BURGUNDY)
    
    cx, cy = WIDTH // 2, 450
    # Left satellite cards: X = 80 to 440 (W = 360). Max X = 440.
    # Right satellite cards: X = 904 to 1264 (W = 360). Min X = 904.
    # Center entity node: X = 512 to 832 (W = 320).
    # Buffer from left to center: 512 - 440 = 72px!
    # Buffer from center to right: 904 - 832 = 72px!
    
    satellites = [
        (80, cy - 140, "GROWTH ARCHITECTURE", "schema:knowsAbout", EMERALD),
        (904, cy - 140, "ALGORITHMIC MARKETING", "schema:hasCredential", NAVY),
        (80, cy + 40, "DETERMINISTIC TELEMETRY", "schema:authorOf", INDIGO),
        (904, cy + 40, "AEO CITATION ENGINE", "schema:recognizedAuthority", BURGUNDY)
    ]
    for sx, sy, title, rel, col in satellites:
        draw_shadow(base, [sx, sy, sx + 360, sy + 84], radius=8, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([sx, sy, sx + 360, sy + 84], radius=8, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.text((sx + 18, sy + 14), rel, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((sx + 18, sy + 42), title, fill=SLATE_BLACK, font=get_font(16, bold=True))

    # Center Entity Node (Drawn cleanly in center)
    node_box = [cx - 160, cy - 60, cx + 160, cy + 60]
    draw_shadow(base, node_box, radius=16, blur=18, color=(125, 6, 66, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(node_box, radius=16, fill=(255, 255, 255, 255), outline=BURGUNDY, width=3)
    draw.rounded_rectangle([cx - 150, cy - 50, cx + 150, cy - 18], radius=6, fill=BURGUNDY)
    draw.text((cx - 100, cy - 42), "CANONICAL ENTITY NODE", fill=(255, 255, 255), font=get_font(12, bold=True, mono=True))
    draw.text((cx - 110, cy - 6), "Udith Babu K N", fill=SLATE_BLACK, font=get_font(24, bold=True))
    draw.text((cx - 70, cy + 26), "Wikidata: Q12489", fill=GOLD, font=get_font(13, mono=True))

    return save_cover(base, "ai-knowledge-graph-entity-seo.webp")

# ==============================================================================
# POST 9: information-gain-seo-engineering
# ==============================================================================
def render_post_9():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Mathematical Information Retrieval", "Information Gain SEO: The Mathematical Secret", "Using Google's Patented Information Gain Formula to Outrank AI-Generated Summaries", BURGUNDY)
    
    ox, oy = 140, 600
    chart_w, chart_h = 1060, 360
    draw.line([(ox, oy), (ox + chart_w, oy)], fill=SLATE_BLACK, width=2)
    draw.line([(ox, oy), (ox, oy - chart_h)], fill=SLATE_BLACK, width=2)
    draw.text((ox + chart_w - 220, oy + 16), "SEARCH QUERY DEPTH →", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    draw.text((ox - 30, oy - chart_h - 26), "ΔI(X;Y) INFORMATION GAIN SCORE ↑", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    
    pts_baseline = []
    for x in range(0, chart_w, 20):
        y_val = oy - 40 - int(20 * math.sin(x / 100.0))
        pts_baseline.append((ox + x, y_val))
    for i in range(len(pts_baseline) - 1):
        draw.line([pts_baseline[i], pts_baseline[i+1]], fill=RED_ERR, width=3)
    
    # Left warning card placed safely at top-left away from curves
    warn_box = [ox + 40, oy - chart_h + 40, ox + 480, oy - chart_h + 140]
    draw_shadow(base, warn_box, radius=8, blur=12, color=(220, 38, 38, 20))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(warn_box, radius=8, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([warn_box[0] + 16, warn_box[1] + 12, warn_box[0] + 240, warn_box[1] + 38], radius=4, fill=(254, 242, 242, 255))
    draw.text((warn_box[0] + 24, warn_box[1] + 16), "COMMODITY AI CONTENT TRAP", fill=RED_ERR, font=get_font(11, bold=True, mono=True))
    draw.text((warn_box[0] + 24, warn_box[1] + 48), "Zero Info Gain • De-Indexed by Google", fill=SLATE_BLACK, font=get_font(15, bold=True))
    draw.text((warn_box[0] + 24, warn_box[1] + 74), "Flat commodity synthesis earns zero citations", fill=SLATE_MUTED, font=get_font(13))
    
    pts_hero = []
    for x in range(0, chart_w, 20):
        norm_x = x / chart_w
        curve = (norm_x ** 1.8) * (chart_h - 100)
        y_val = oy - 40 - int(curve)
        pts_hero.append((ox + x, y_val))
    for i in range(len(pts_hero) - 1):
        draw.line([pts_hero[i], pts_hero[i+1]], fill=BURGUNDY, width=4)
        
    callout_x, callout_y = ox + chart_w - 480, oy - chart_h + 30
    draw_shadow(base, [callout_x, callout_y, callout_x + 460, callout_y + 115], radius=10, blur=18, color=(125, 6, 66, 30))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([callout_x, callout_y, callout_x + 460, callout_y + 115], radius=10, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([callout_x + 16, callout_y + 14, callout_x + 280, callout_y + 40], radius=4, fill=(253, 242, 248, 255))
    draw.text((callout_x + 24, callout_y + 18), "HIGH-GAIN EMPIRICAL CEILING", fill=BURGUNDY, font=get_font(11, bold=True, mono=True))
    draw.text((callout_x + 24, callout_y + 52), "Original Telemetry + Empirical Ratios", fill=SLATE_BLACK, font=get_font(16, bold=True))
    draw.text((callout_x + 24, callout_y + 82), "Rank #1 Position • 100% Featured Snippet Capture", fill=EMERALD, font=get_font(13, bold=True, mono=True))

    return save_cover(base, "information-gain-seo-engineering.webp")

# ==============================================================================
# POST 10: the-economics-of-growth-marketing-ltv-cac-velocity
# ==============================================================================
def render_post_10():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Unit Economics & Capital Velocity", "The Economics of Growth Marketing: LTV/CAC Velocity", "Engineering Under-6-Month CAC Payback and 5x Capital Multiples", GOLD)
    
    cx, cy = 360, 440
    r_vals = [210, 160, 110]
    colors = [GOLD, BURGUNDY, NAVY]
    for r, col in zip(r_vals, colors):
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=col, width=2)
        
    # Solid white center badge so circles never cut through the text
    draw_shadow(base, [cx - 140, cy - 60, cx + 140, cy + 60], radius=14, blur=18, color=(125, 6, 66, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 140, cy - 60, cx + 140, cy + 60], radius=14, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([cx - 120, cy - 48, cx + 120, cy - 20], radius=4, fill=(253, 242, 248, 255))
    draw.text((cx - 80, cy - 44), "CAPITAL MULTIPLIER", fill=BURGUNDY, font=get_font(11, bold=True, mono=True))
    draw.text((cx - 95, cy - 12), "5.1x LTV:CAC", fill=SLATE_BLACK, font=get_font(26, bold=True))
    draw.text((cx - 80, cy + 26), "PAYBACK < 5.2 MO", fill=GOLD, font=get_font(13, bold=True, mono=True))

    rx = 680
    stages = [
        ("MONTH 0: CAPITAL OUTLAY", "-$12,000 Initial CAC", "Direct Acquisition Deployment", RED_ERR),
        ("MONTH 4.8: BREAKEVEN POINT", "$0 Net Cost", "100% Capital Fully Recovered", EMERALD),
        ("MONTH 12: EXPANSION VELOCITY", "+$34,500 Gross Margin", "138% Net Revenue Retention (NRR)", BURGUNDY),
        ("MONTH 24: CAPITAL MOAT", "+$88,200 Cumulative Net Cash", "5.1x Cash Return Multiple on Spend", GOLD)
    ]
    for i, (stage, cash, note, col) in enumerate(stages):
        sy = 190 + i * 122
        draw_shadow(base, [rx, sy, rx + 580, sy + 105], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([rx, sy, rx + 580, sy + 105], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.text((rx + 24, sy + 14), stage, fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((rx + 24, sy + 38), cash, fill=col, font=get_font(24, bold=True))
        draw.text((rx + 24, sy + 74), note, fill=SLATE_BLACK, font=get_font(14))

    return save_cover(base, "the-economics-of-growth-marketing-ltv-cac-velocity.webp")

def render_block1():
    render_post_1()
    render_post_2()
    render_post_3()
    render_post_4()
    render_post_5()
    render_post_6()
    render_post_7()
    render_post_8()
    render_post_9()
    render_post_10()

if __name__ == "__main__":
    render_block1()
    print("Block 1 rendered successfully.")
