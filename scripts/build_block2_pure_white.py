import os, sys, math
sys.path.insert(0, os.path.abspath("."))
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import scripts.build_block1_pure_white as b1

WIDTH, HEIGHT = b1.WIDTH, b1.HEIGHT
WHITE = b1.WHITE
BURGUNDY = b1.BURGUNDY
BURGUNDY_DARK = b1.BURGUNDY_DARK
GOLD = b1.GOLD
SLATE_BLACK = b1.SLATE_BLACK
SLATE_MUTED = b1.SLATE_MUTED
SLATE_LIGHT = b1.SLATE_LIGHT
EMERALD = b1.EMERALD
NAVY = b1.NAVY
INDIGO = b1.INDIGO
TEAL = b1.TEAL
ROSE = b1.ROSE
RED_ERR = b1.RED_ERR

get_font = b1.get_font
create_pure_white_canvas = b1.create_pure_white_canvas
draw_shadow = b1.draw_shadow
draw_header = b1.draw_header
save_cover = b1.save_cover

def draw_wrapped(draw, text, x, y, max_w, font, fill, line_spacing=5):
    words = text.split()
    lines = []
    curr = []
    for w in words:
        test = " ".join(curr + [w])
        if draw.textlength(test, font=font) <= max_w:
            curr.append(w)
        else:
            if curr:
                lines.append(" ".join(curr))
            curr = [w]
    if curr:
        lines.append(" ".join(curr))
    curr_y = y
    for l in lines:
        draw.text((x, curr_y), l, fill=fill, font=font)
        curr_y += 18 + line_spacing

# ==============================================================================
# POST 11: agentic-commerce-and-b2b-procurement (ZERO OVERLAP 2-COLUMN)
# ==============================================================================
def render_post_11():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Autonomous Procurement Protocols", "Agentic Commerce in B2B: Selling to AI Buying Agents", "Structuring Machine-Readable API Endpoints, Pricing Schemas, and Instant Procurement", INDIGO)
    
    cx = WIDTH // 2
    # Buyer Portal (Left: X = 80 to 560, W = 480)
    lx, lw = 80, 480
    draw_shadow(base, [lx, 190, lx + lw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + lw, 680], radius=12, fill=(255, 255, 255, 255), outline=INDIGO, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + lw - 20, 246], radius=4, fill=(238, 242, 255, 255))
    draw.text((lx + 30, 216), "AUTONOMOUS BUYER AGENT PROTOCOL", fill=INDIGO, font=get_font(12, bold=True, mono=True))
    
    buyer_steps = [
        ("Query & Capability Parse", "GET /api/v2/pricing/enterprise"),
        ("Compliance Validation", "Automated TLS SOC2 Type II Handshake"),
        ("Budget Authorization Gate", "$50k Pre-Approved Corporate Limit"),
        ("Autonomous Contract Sign", "Sub-100ms Programmatic Order")
    ]
    for i, (st, desc) in enumerate(buyer_steps):
        sy = 270 + i * 98
        draw.rounded_rectangle([lx + 24, sy, lx + lw - 24, sy + 78], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((lx + 36, sy + 14), st, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((lx + 36, sy + 42), desc, fill=INDIGO, font=get_font(13, mono=True))

    # Seller Gateway (Right: X = 784 to 1264, W = 480)
    rx, rw = 784, 480
    draw_shadow(base, [rx, 190, rx + rw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + rw, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + rw - 20, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((rx + 30, 216), "SELLER AGENTIC REVENUE ENGINE", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    
    seller_steps = [
        ("Dynamic API Catalog", "Machine-Readable JSON-LD Endpoints"),
        ("Volume Tier Concessions", "Algorithmic Real-Time Elastic Pricing"),
        ("Provisioning Webhook", "Automated Account & Workspace Spawn"),
        ("Programmatic Settlement", "Direct Stripe Enterprise Escrow Transfer")
    ]
    for i, (st, desc) in enumerate(seller_steps):
        sy = 270 + i * 98
        draw.rounded_rectangle([rx + 24, sy, rx + rw - 24, sy + 78], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((rx + 36, sy + 14), st, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((rx + 36, sy + 42), desc, fill=BURGUNDY, font=get_font(13, mono=True))

    # Center Connector Badge (X = 592 to 752, completely untouched by cards!)
    draw.line([(lx + lw, 435), (rx, 435)], fill=EMERALD, width=4)
    draw_shadow(base, [cx - 80, 400, cx + 80, 470], radius=12, blur=14, color=(21, 128, 61, 40))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 80, 400, cx + 80, 470], radius=12, fill=EMERALD)
    draw.text((cx - 55, 414), "0-SECOND", fill=(255, 255, 255), font=get_font(11, bold=True, mono=True))
    draw.text((cx - 68, 436), "DEAL CLOSED", fill=(255, 255, 255), font=get_font(13, bold=True))

    return save_cover(base, "agentic-commerce-and-b2b-procurement.webp")

# ==============================================================================
# POST 12: revops-pipeline-harmonization-playbook
# ==============================================================================
def render_post_12():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "RevOps Engine & Pipeline Synchronization", "RevOps Pipeline Harmonization Playbook", "Uniting Marketing Telemetry, Sales Cadences, and CRM Revenue Data", BURGUNDY)
    
    streams = [
        (80, 200, "1. MARKETING ATTRIBUTION TELEMETRY", "1st-Party Server SQL • Identity Resolution • Deterministic Touchpoints", BURGUNDY),
        (80, 360, "2. SALES DEVELOPMENT CADENCE & SLA", "Automated Lead Scoring • 5-Minute Inbound SLA Routing • CRM Sync", NAVY),
        (80, 520, "3. PRODUCT RETENTION & NRR TELEMETRY", "Active License Telemetry • Early Churn Triggers • Expansion Upgrades", EMERALD)
    ]
    for x, y, title, desc, col in streams:
        draw_shadow(base, [x, y, x + 760, y + 120], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + 760, y + 120], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([x + 20, y + 16, x + 380, y + 46], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((x + 30, y + 22), title, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((x + 30, y + 66), desc, fill=SLATE_BLACK, font=get_font(16, bold=True))
        draw.line([(x + 760, y + 60), (920, 430)], fill=col, width=3)
        
    rx = 920
    draw_shadow(base, [rx, 200, rx + 344, 640], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 200, rx + 344, 640], radius=12, fill=(255, 255, 255, 255), outline=GOLD, width=2)
    draw.rounded_rectangle([rx, 200, rx + 344, 252], radius=12, fill=GOLD)
    draw.text((rx + 24, 216), "REVENUE OUTCOME", fill=(255, 255, 255), font=get_font(14, bold=True, mono=True))
    
    kpis = [
        ("Pipeline Velocity", "+142% Acceleration", EMERALD),
        ("Lead-to-Win Rate", "34.8% (vs 12% avg)", BURGUNDY),
        ("Sales Cycle Length", "Reduced to 28 Days", NAVY),
        ("Net Retention (NRR)", "138.4% Net Expansion", GOLD)
    ]
    for i, (k, v, col) in enumerate(kpis):
        ky = 275 + i * 88
        draw.text((rx + 24, ky), k.upper(), fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((rx + 24, ky + 24), v, fill=col, font=get_font(18, bold=True))

    return save_cover(base, "revops-pipeline-harmonization-playbook.webp")

# ==============================================================================
# POST 13: building-enterprise-organic-search-moats
# ==============================================================================
def render_post_13():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Semantic Organic Moats", "Building Enterprise Organic Search Moats", "Why Commodity Volume SEO Is Dead and Topic Cluster Moats Rule 2026/2027", BURGUNDY)
    
    cards = [
        (80, 200, 560, 210, "01 // ZERO KEYWORD CANNIBALIZATION", "Deterministic Semantic Hubs", "Every search intent is mapped to an authoritative parent pillar, preventing internal ranking competition.", BURGUNDY),
        (700, 200, 560, 210, "02 // KNOWLEDGE GRAPH DENSITY", "140 Interconnected Semantic Nodes", "Rich internal schema.org RDF triples establish unbreakable topical depth that algorithmic updates reward.", NAVY),
        (80, 450, 560, 210, "03 // HIGH INFORMATION GAIN", "Original Primary Telemetry", "Patented Google Information Gain architecture ensures content outranks AI-generated summary aggregations.", GOLD),
        (700, 450, 560, 210, "04 // ORGANIC REVENUE MULTIPLIER", "Zero Ongoing Ad Spend Dependency", "High-intent executive buyers discover frameworks organically, driving self-funding pipeline scale.", EMERALD)
    ]
    for x, y, w, h, tag, head, desc, col in cards:
        draw_shadow(base, [x, y, x + w, y + h], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + w, y + h], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([x + 20, y + 16, x + w - 20, y + 48], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((x + 30, y + 22), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((x + 28, y + 66), head, fill=SLATE_BLACK, font=get_font(20, bold=True))
        draw_wrapped(draw, desc, x + 28, y + 104, w - 56, get_font(14), SLATE_MUTED)

    return save_cover(base, "building-enterprise-organic-search-moats.webp")

# ==============================================================================
# POST 14: conversational-search-optimization-cso-playbook
# ==============================================================================
def render_post_14():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Prompt Resonance & Conversational Retrieval", "Conversational Search Optimization (CSO)", "Crafting Content Prompts That Modern Search Engines Translate Directly Into Clicks", TEAL)
    
    strata = [
        (80, 200, "1. PROMPT INTENT SYNTHESIS", "Mapping Multi-Turn Conversational Prompts into Direct Answers", "Eliminating linguistic ambiguity so AI engines match user problems directly to your brand node.", TEAL),
        (80, 360, "2. DIRECT CITATION POSITIONING", "Securing Definitive Featured Status in Perplexity, Claude & Gemini", "Structuring machine-readable proofs that answer engines cite verbatim with zero hallucination.", BURGUNDY),
        (80, 520, "3. CLICK-GENERATION MECHANICS", "Converting Answer Engine Summaries into High-Value Inbound Visits", "Framing citations with high-information curiosity gaps that drive executive decision-makers to full specs.", GOLD)
    ]
    for x, y, tag, head, desc, col in strata:
        draw_shadow(base, [x, y, x + 1184, y + 124], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + 1184, y + 124], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([x + 20, y + 16, x + 340, y + 46], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((x + 30, y + 22), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((x + 30, y + 58), head, fill=SLATE_BLACK, font=get_font(18, bold=True))
        draw.text((x + 30, y + 90), desc, fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "conversational-search-optimization-cso-playbook.webp")

# ==============================================================================
# POST 15: the-data-driven-cmo-operating-system
# ==============================================================================
def render_post_15():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Executive Revenue Infrastructure", "The Data-Driven CMO Operating System", "The Weekly Operating Cadence, Metrics Dashboard, and Decision Engine of Top 0.1% Leaders", NAVY)
    
    kpis = [
        (80, 190, 275, 115, "LTV:CAC MULTIPLE", "5.1x Multiple", "Target: > 4.0x", EMERALD),
        (385, 190, 275, 115, "CAC PAYBACK SPEED", "4.8 Months", "Top 0.1% Globally", GOLD),
        (690, 190, 275, 115, "NET RETENTION (NRR)", "138.4% NRR", "Expansion Moat", BURGUNDY),
        (995, 190, 275, 115, "AEO CITATION SHARE", "98.4% Share", "Dominant Search Moat", NAVY)
    ]
    for x, y, w, h, title, val, note, col in kpis:
        draw_shadow(base, [x, y, x + w, y + h], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + w, y + h], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.text((x + 18, y + 14), title, fill=SLATE_MUTED, font=get_font(11, bold=True, mono=True))
        draw.text((x + 18, y + 38), val, fill=col, font=get_font(24, bold=True))
        draw.text((x + 18, y + 78), note, fill=SLATE_BLACK, font=get_font(13))

    draw_shadow(base, [80, 335, 1270, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([80, 335, 1270, 680], radius=12, fill=(255, 255, 255, 255), outline=NAVY, width=2)
    draw.rounded_rectangle([80, 335, 1270, 385], radius=12, fill=(238, 242, 255, 255))
    draw.text((104, 350), "WEEKLY OPERATING CADENCE OF THE MODERN GROWTH ARCHITECT", fill=NAVY, font=get_font(13, bold=True, mono=True))
    
    cadence = [
        ("MONDAY 09:00", "Cohort Cashflow Review", "Audit weekend lead velocity and inspect deterministic SQL telemetry pipelines.", BURGUNDY),
        ("WEDNESDAY 14:00", "Experimentation Sprint", "Evaluate 5 active statistical growth tests; kill underperformers, scale winners.", GOLD),
        ("FRIDAY 16:00", "Pipeline Harmonization", "Reconcile sales closed-won deals against marketing first-party touchpoint models.", EMERALD)
    ]
    for i, (day, act, detail, col) in enumerate(cadence):
        cy = 405 + i * 86
        draw.rounded_rectangle([104, cy, 1246, cy + 72], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.rectangle([104, cy + 8, 110, cy + 64], fill=col)
        draw.text((128, cy + 12), day, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((320, cy + 12), act, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((320, cy + 40), detail, fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "the-data-driven-cmo-operating-system.webp")

# ==============================================================================
# POST 16: zero-party-data-capture-architectures
# ==============================================================================
def render_post_16():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Consensual Telemetry & Conversion Engineering", "Zero-Party Data Capture Architectures", "Designing High-Value Interactive Funnels That Prospects Gladly Volunteer Data Into", EMERALD)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 560, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=EMERALD, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 400, 246], radius=4, fill=(240, 253, 244, 255))
    draw.text((lx + 30, 216), "PROPRIETARY VALUE-EXCHANGE FUNNEL", fill=EMERALD, font=get_font(12, bold=True, mono=True))
    
    funnel_steps = [
        ("Step 1: Interactive Diagnostic", "Prospect enters current team scale & tooling"),
        ("Step 2: Real-Time ROI Benchmark", "Instant calculation reveals $120k lost revenue"),
        ("Step 3: Bespoke Revenue Roadmap", "Prospect unlocks custom growth architecture"),
        ("Result: 100% Zero-Party Data", "Budget, Authority, Need, & Timeline recorded")
    ]
    for i, (st, desc) in enumerate(funnel_steps):
        sy = 265 + i * 100
        draw.rounded_rectangle([lx + 24, sy, lx + 536, sy + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((lx + 36, sy + 14), st, fill=EMERALD, font=get_font(15, bold=True))
        draw.text((lx + 36, sy + 44), desc, fill=SLATE_BLACK, font=get_font(14))

    rx = 680
    draw_shadow(base, [rx, 190, rx + 580, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 380, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((rx + 30, 216), "ZERO-PARTY ARCHITECTURAL ADVANTAGES", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    
    benefits = [
        ("100% Explicit Consent", "Completely immune to GDPR, CCPA, and privacy clampdowns.", BURGUNDY),
        ("Zero Inference Guesswork", "You know exactly what software they use and when they plan to buy.", NAVY),
        ("Instant Sales Qualification", "Sales teams get a pre-scored deal dossier before the first call.", GOLD),
        ("84% Higher Conversion", "Interactive diagnostic vs traditional static PDF gate.", EMERALD)
    ]
    for i, (b_title, b_desc, col) in enumerate(benefits):
        by = 265 + i * 100
        draw.rounded_rectangle([rx + 24, by, rx + 556, by + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((rx + 36, by + 14), b_title, fill=col, font=get_font(15, bold=True))
        draw.text((rx + 36, by + 44), b_desc, fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "zero-party-data-capture-architectures.webp")

# ==============================================================================
# POST 17: predictive-churn-prevention-telemetry
# ==============================================================================
def render_post_17():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Retention & LTV Defense", "Predictive Churn Prevention Telemetry", "How World-Class Marketers Build Telemetry to Protect 130%+ Net Revenue Retention", BURGUNDY)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 560, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((lx + 30, 216), "EARLY CHURN TELEMETRY GAUGES", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    
    signals = [
        ("Login Velocity Decay", "Usage drops > 35% in 14 days", "TRIGGER: Risk Flagged", RED_ERR),
        ("Export Volume Freeze", "Core analytical output down 50%", "TRIGGER: CSM Outreach", GOLD),
        ("Admin Champion Churn", "Key executive buyer profile changed", "TRIGGER: Re-engagement", BURGUNDY),
        ("Seat Saturation < 60%", "Licenses idle for 30+ days", "TRIGGER: Value Training", NAVY)
    ]
    for i, (sig, det, trig, col) in enumerate(signals):
        sy = 265 + i * 100
        draw.rounded_rectangle([lx + 24, sy, lx + 536, sy + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((lx + 36, sy + 14), sig, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((lx + 36, sy + 38), det, fill=SLATE_MUTED, font=get_font(13))
        draw.text((lx + 36, sy + 58), trig, fill=col, font=get_font(12, bold=True, mono=True))

    rx = 680
    draw_shadow(base, [rx, 190, rx + 580, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=EMERALD, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 360, 246], radius=4, fill=(240, 253, 244, 255))
    draw.text((rx + 30, 216), "NET REVENUE RETENTION (NRR)", fill=EMERALD, font=get_font(12, bold=True, mono=True))
    
    nrr_stats = [
        ("BASE REVENUE COHORT", "$100,000 ARR", "Initial Closed-Won Customer Base", SLATE_BLACK),
        ("GROSS CHURN PREVENTED", "-$2,400 ARR", "97.6% Gross Logo Retention", EMERALD),
        ("EXPANSION & SEAT UPSELL", "+$40,800 ARR", "Product-Led Tier Upgrades", GOLD),
        ("FINAL MONTH 12 COHORT", "$138,400 ARR", "138.4% Net Revenue Retention (Top Tier)", BURGUNDY)
    ]
    for i, (metric, val, note, col) in enumerate(nrr_stats):
        ny = 265 + i * 100
        draw.rounded_rectangle([rx + 24, ny, rx + 556, ny + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((rx + 36, ny + 12), metric, fill=SLATE_MUTED, font=get_font(11, bold=True, mono=True))
        draw.text((rx + 36, ny + 32), val, fill=col, font=get_font(20, bold=True))
        draw.text((rx + 36, ny + 56), note, fill=SLATE_BLACK, font=get_font(13))

    return save_cover(base, "predictive-churn-prevention-telemetry.webp")

# ==============================================================================
# POST 18: contrarian-category-design-principles (ZERO OVERLAP 2-COLUMN)
# ==============================================================================
def render_post_18():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Strategic Market Category Creation", "Contrarian Category Design", "Why Competing in Existing Software Markets Guarantees Invisibility and Margin Collapse", BURGUNDY)
    
    # Left: Red Ocean vs New Category Vector (Strictly X = 80 to 620)
    lx, lw = 80, 540
    draw_shadow(base, [lx, 190, lx + lw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + lw, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((lx + 30, 216), "MARKET DIFFERENTIATION VECTORS", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    
    # Draw Red Ocean dots inside left container
    for x in range(lx + 40, lx + 260, 30):
        for y in range(320, 560, 30):
            draw.ellipse([x - 5, y - 5, x + 5, y + 5], fill=(226, 232, 240))
    draw.text((lx + 40, 580), "CONGESTED COMMODITY SWARM", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    
    # Bold Vector breaking away toward top-right of left container
    draw.line([(lx + 200, 440), (lx + 360, 320)], fill=BURGUNDY, width=6)
    draw.rounded_rectangle([lx + 240, 280, lx + lw - 80, 360], radius=8, fill=BURGUNDY)
    draw.text((lx + 260, 298), "NEW CATEGORY", fill=(255, 255, 255), font=get_font(12, bold=True, mono=True))
    draw.text((lx + 260, 324), "80% MARGINS", fill=GOLD, font=get_font(14, bold=True))

    # Right: Category Creation Playbook (Strictly X = 700 to 1264)
    rx, rw = 700, 564
    draw_shadow(base, [rx, 190, rx + rw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + rw, 680], radius=12, fill=(255, 255, 255, 255), outline=GOLD, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 360, 246], radius=4, fill=(254, 243, 199, 255))
    draw.text((rx + 30, 216), "CATEGORY CREATION PROTOCOL", fill=GOLD, font=get_font(12, bold=True, mono=True))
    
    pillars = [
        ("1. Reject the Incumbent Frame", "Refuse to compete on 'faster or cheaper'. Declare a new problem domain.", BURGUNDY),
        ("2. Name the Villain", "Identify the legacy practice costing enterprises millions in wasted capital.", RED_ERR),
        ("3. Create a Proprietary Lexicon", "Coin the terminology the industry adopts (e.g. 'Growth Architecture').", GOLD),
        ("4. Capture 80% Economics", "The category king captures 76% of market cap and commands high margins.", EMERALD)
    ]
    for i, (p_title, p_desc, col) in enumerate(pillars):
        py = 265 + i * 100
        draw.rounded_rectangle([rx + 24, py, rx + rw - 24, py + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((rx + 36, py + 14), p_title, fill=col, font=get_font(15, bold=True))
        draw.text((rx + 36, py + 42), p_desc, fill=SLATE_BLACK, font=get_font(13))

    return save_cover(base, "contrarian-category-design-principles.webp")

# ==============================================================================
# POST 19: high-velocity-experimentation-frameworks
# ==============================================================================
def render_post_19():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Statistical Growth Acceleration", "High-Velocity Experimentation Frameworks", "Running 20+ Statistical Growth Tests Per Month Without Organizational Chaos", GOLD)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 620, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 620, 680], radius=12, fill=(255, 255, 255, 255), outline=GOLD, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 440, 246], radius=4, fill=(254, 243, 199, 255))
    draw.text((lx + 30, 216), "ACTIVE STATISTICAL SPRINT (20 TESTS/MO)", fill=GOLD, font=get_font(12, bold=True, mono=True))
    
    tests = [
        ("EXP-042: Interactive Pricing Calculator", "P-Value: 0.002", "+28.4% Lift", EMERALD),
        ("EXP-043: Direct AEO Structured Citation", "P-Value: 0.008", "+94.1% Visibility", BURGUNDY),
        ("EXP-044: 1st-Party Formless Qualification", "P-Value: 0.014", "+41.2% Qualified", NAVY),
        ("EXP-045: Video Technical Walkthrough", "P-Value: 0.420", "NO EFFECT (KILLED)", RED_ERR)
    ]
    for i, (name, pval, res, col) in enumerate(tests):
        ty = 265 + i * 100
        draw.rounded_rectangle([lx + 24, ty, lx + 596, ty + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.rectangle([lx + 28, ty + 8, lx + 34, ty + 72], fill=col)
        draw.text((lx + 46, ty + 14), name, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((lx + 46, ty + 44), f"Stats: {pval}", fill=SLATE_MUTED, font=get_font(13, mono=True))
        draw.text((lx + 400, ty + 44), res, fill=col, font=get_font(15, bold=True))

    rx = 740
    draw_shadow(base, [rx, 190, rx + 520, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 520, 680], radius=12, fill=(255, 255, 255, 255), outline=SLATE_LIGHT, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 320, 246], radius=4, fill=(241, 245, 249, 255))
    draw.text((rx + 30, 216), "SCIENTIFIC EXPERIMENT RULES", fill=SLATE_BLACK, font=get_font(12, bold=True, mono=True))
    
    rules = [
        ("1. Strict Bayesian Confidence", "Never declare a winner before 95% certainty and 500 conversions.", BURGUNDY),
        ("2. Kill Fast, Scale Aggressively", "Tests showing neutral impact are killed on Day 14 without hesitation.", RED_ERR),
        ("3. Full-Funnel Telemetry", "Measure downstream revenue, not vanity click-throughs.", EMERALD),
        ("4. Continuous Compound Growth", "20 monthly tests compounding at 2% monthly produces 26.8% annual lift.", GOLD)
    ]
    for i, (r_title, r_desc, col) in enumerate(rules):
        ry = 265 + i * 100
        draw.rounded_rectangle([rx + 24, ry, rx + 496, ry + 80], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.text((rx + 36, ry + 14), r_title, fill=col, font=get_font(15, bold=True))
        draw.text((rx + 36, ry + 44), r_desc, fill=SLATE_MUTED, font=get_font(13))

    return save_cover(base, "high-velocity-experimentation-frameworks.webp")

# ==============================================================================
# POST 20: the-udith-babu-growth-command-matrix
# ==============================================================================
def render_post_20():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Proprietary Architecture Blueprint", "The Growth Command Matrix", "Inside Udith Babu K N's Full-Stack Revenue Engine & Technical Moat", BURGUNDY)
    
    tiers = [
        ("TIER 1: ALGORITHMIC DISCOVERY", "AEO Citations • Generative Engine Optimization (GEO) • Semantic Entity Wikidata", BURGUNDY),
        ("TIER 2: DETERMINISTIC TELEMETRY", "1st-Party Server SQL Pipeline • Identity Resolution • Cookie-Proof Multi-Touch", NAVY),
        ("TIER 3: UNIT ECONOMIC ACCELERATOR", "LTV/CAC > 5.1x • Sub-6-Month Payback Velocity • Net Retention 138%", GOLD),
        ("TIER 4: REVOPS & AGENTIC COMMERCE", "Autonomous AI Buyer Protocols • 5-Min SLA Sync • Closed-Won CRM Orchestration", EMERALD)
    ]
    for i, (title, desc, col) in enumerate(tiers):
        ty = 190 + i * 125
        draw_shadow(base, [80, ty, 1264, ty + 105], radius=10, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, ty, 1264, ty + 105], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, ty + 14, 420, ty + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, ty + 20), title, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((112, ty + 58), desc, fill=SLATE_BLACK, font=get_font(16, bold=True))
        draw.text((1140, ty + 20), f"TIER 0{i+1}", fill=SLATE_MUTED, font=get_font(13, bold=True, mono=True))
        
    cx = WIDTH // 2
    draw_shadow(base, [cx - 180, 680, cx + 180, 728], radius=24, blur=12, color=(125, 6, 66, 30))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 180, 680, cx + 180, 728], radius=24, fill=SLATE_BLACK)
    draw.text((cx - 146, 694), "★ UDITH BABU K N METHODOLOGY", fill=(255, 255, 255), font=get_font(13, bold=True, mono=True))

    return save_cover(base, "the-udith-babu-growth-command-matrix.webp")

def render_block2():
    render_post_11()
    render_post_12()
    render_post_13()
    render_post_14()
    render_post_15()
    render_post_16()
    render_post_17()
    render_post_18()
    render_post_19()
    render_post_20()

if __name__ == "__main__":
    render_block2()
    print("Block 2 rendered successfully.")
