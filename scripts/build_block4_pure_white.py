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
draw_crown = b1.draw_crown
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
# POST 31: cac-payback-velocity-b2b-economics (ZERO OVERLAP)
# ==============================================================================
def render_post_31():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Unit Economics & Capital Payback", "CAC Payback Velocity: Unit Economics Over Vanity Traffic", "Why the World's Best Marketing Architects Obsess Over Capital Recovery Speed", GOLD)
    
    ox, oy = 140, 580
    chart_w, chart_h = 1060, 360
    
    draw.line([(ox, oy - chart_h//2), (ox + chart_w, oy - chart_h//2)], fill=(203, 213, 225, 255), width=2)
    # Breakeven pill safely above line
    draw.rounded_rectangle([ox + chart_w - 220, oy - chart_h//2 - 34, ox + chart_w - 20, oy - chart_h//2 - 6], radius=4, fill=(240, 253, 244, 255), outline=EMERALD)
    draw.text((ox + chart_w - 208, oy - chart_h//2 - 28), "$0 BREAKEVEN LINE", fill=EMERALD, font=get_font(12, bold=True, mono=True))
    draw.line([(ox, oy), (ox, oy - chart_h)], fill=SLATE_BLACK, width=2)
    
    draw.text((ox + chart_w - 180, oy + 16), "TIME (MONTHS) →", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    draw.text((ox - 30, oy - chart_h - 24), "CUMULATIVE NET CASHFLOW ↑", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    
    # Median SaaS Curve
    pts_median = []
    for m in range(0, 19):
        x = ox + int(m * (chart_w / 18.0))
        y_val = int((oy - chart_h//2) + 120 - (m / 16.0) * 120)
        pts_median.append((x, y_val))
    for i in range(len(pts_median) - 1):
        draw.line([pts_median[i], pts_median[i+1]], fill=RED_ERR, width=2)
    draw.text((ox + 460, oy - 20), "MEDIAN SAAS: 16+ MONTHS TO BREAKEVEN (Capital Fragility)", fill=RED_ERR, font=get_font(13, bold=True))
    
    # Elite Growth Curve
    pts_elite = []
    for m in range(0, 19):
        x = ox + int(m * (chart_w / 18.0))
        if m <= 4.8:
            y_val = int((oy - chart_h//2) + 120 - (m / 4.8) * 120)
        else:
            y_val = int((oy - chart_h//2) - ((m - 4.8) / 13.2) * (chart_h//2 - 20))
        pts_elite.append((x, y_val))
    for i in range(len(pts_elite) - 1):
        draw.line([pts_elite[i], pts_elite[i+1]], fill=BURGUNDY, width=4)
        
    bx = ox + int(4.8 * (chart_w / 18.0))
    by = oy - chart_h//2
    draw.ellipse([bx - 8, by - 8, bx + 8, by + 8], fill=EMERALD)
    
    # Callout Card placed safely on top-left where curve is below y=369 (ZERO overlap!)
    card_box = [ox + 30, oy - chart_h + 20, ox + 440, oy - chart_h + 125]
    draw_shadow(base, card_box, radius=8, blur=14, color=(21, 128, 61, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(card_box, radius=8, fill=(255, 255, 255, 255), outline=EMERALD, width=2)
    draw.rounded_rectangle([card_box[0] + 16, card_box[1] + 10, card_box[0] + 270, card_box[1] + 34], radius=4, fill=(240, 253, 244, 255))
    draw.text((card_box[0] + 24, card_box[1] + 13), "★ 4.8-MONTH CAC BREAKEVEN", fill=EMERALD, font=get_font(11, bold=True, mono=True))
    draw.text((card_box[0] + 24, card_box[1] + 44), "100% Capital Recovered & Re-deployed", fill=SLATE_BLACK, font=get_font(15, bold=True))
    draw.text((card_box[0] + 24, card_box[1] + 72), "Powers Continuous Self-Funding Growth Flywheel", fill=SLATE_MUTED, font=get_font(13))
    
    # Dotted indicator down to breakeven point
    for dy in range(card_box[3] + 10, by - 8, 14):
        draw.line([(bx, dy), (bx, dy + 7)], fill=EMERALD, width=2)

    return save_cover(base, "cac-payback-velocity-b2b-economics.webp")

# ==============================================================================
# POST 32: the-algorithmic-content-moat
# ==============================================================================
def render_post_32():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Content Moats & Defensibility", "Building an Algorithmic Content Moat", "How to Stand Out and Command Category Authority in an Ocean of AI Slop", BURGUNDY)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 560, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(254, 242, 242, 255))
    draw.text((lx + 30, 216), "COMMODITY AI CONTENT TRAP", fill=RED_ERR, font=get_font(12, bold=True, mono=True))
    draw.text((lx + 24, 280), "• Generic LLM re-hashes without original data\n• De-indexed by Google Information Gain algorithms\n• Zero citation weight in Claude & ChatGPT\n• High bounce rate & complete loss of enterprise trust", fill=SLATE_BLACK, font=get_font(15))

    rx = 680
    draw_shadow(base, [rx, 190, rx + 580, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 360, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((rx + 30, 216), "THE ALGORITHMIC CONTENT MOAT", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    draw.text((rx + 24, 280), "• Proprietary telemetry datasets & benchmark proofs\n• Mathematical formulas & verified code execution\n• High Information Gain ΔI(X;Y) selection scoring\n• Definitive source citations that competitors cannot copy", fill=SLATE_BLACK, font=get_font(15))

    return save_cover(base, "the-algorithmic-content-moat.webp")

# ==============================================================================
# POST 33: lean-martech-stack-data-architecture
# ==============================================================================
def render_post_33():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Minimalist MarTech Architecture", "The Lean MarTech Stack", "Why the Best Marketers Run Less Software with Greater Velocity and Zero Data Debt", NAVY)
    
    blocks = [
        ("1. INGESTION & FIRST-PARTY SQL", "Snowflake / ClickHouse / PostgreSQL", "Deterministic Server Event Pipeline • Zero Cookie Loss", NAVY),
        ("2. IDENTITY & PERMISSION RESOLUTION", "Segment / RudderStack / Reverse-ETL", "Real-Time Customer Data Sync • Consent Enforced", INDIGO),
        ("3. ALGORITHMIC ATTRIBUTION ENGINE", "Python AST & Custom Shapley Models", "True Downstream Cash ARR • Sub-10ms Queries", BURGUNDY),
        ("4. AGENTIC REVENUE ORCHESTRATION", "HubSpot Enterprise / Salesforce Core", "5-Min SLA Sync • Automated AI Buying Protocols", EMERALD)
    ]
    for i, (layer, tech, desc, col) in enumerate(blocks):
        by = 195 + i * 118
        draw_shadow(base, [80, by, 1264, by + 98], radius=10, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, by, 1264, by + 98], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, by + 14, 460, by + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, by + 20), layer, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((480, by + 18), tech, fill=SLATE_BLACK, font=get_font(15, bold=True))
        draw.text((100, by + 58), desc, fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "lean-martech-stack-data-architecture.webp")

# ==============================================================================
# POST 34: precision-search-intent-mapping
# ==============================================================================
def render_post_34():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Search Intent & Behavioral Modeling", "Precision Search Intent Mapping", "Aligning Algorithmic Crawlers with B2B Executive Buyer Psychology", BURGUNDY)
    
    # 4 Large High-Contrast Intent Quadrants
    quads = [
        (80, 200, 560, 210, "STAGE 1: INFORMATIONAL DISCOVERY", "Topical Problem Awareness", "Capturing early enterprise researchers with high-information gain diagnostic frameworks.", SLATE_MUTED),
        (700, 200, 560, 210, "STAGE 2: ARCHITECTURAL EVALUATION", "Benchmark Matrix Comparison", "Comparing modern revenue engineering against fragile legacy performance agency models.", NAVY),
        (80, 450, 560, 210, "STAGE 3: COMMERCIAL SELECTION", "Unit Economic Proof & ROI", "Delivering verifiable proof of sub-6-month CAC payback and 5x capital velocity multiples.", GOLD),
        (700, 450, 560, 210, "STAGE 4: IMMEDIATE TRANSACTION", "Programmatic Procurement", "Providing self-service pricing APIs, instant SOC2 security clearance, and frictionless sign-off.", BURGUNDY)
    ]
    for x, y, w, h, tag, head, desc, col in quads:
        draw_shadow(base, [x, y, x + w, y + h], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([x, y, x + w, y + h], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([x + 20, y + 16, x + w - 20, y + 48], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((x + 30, y + 22), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((x + 28, y + 66), head, fill=SLATE_BLACK, font=get_font(20, bold=True))
        draw_wrapped(draw, desc, x + 28, y + 104, w - 56, get_font(14), SLATE_MUTED)

    return save_cover(base, "precision-search-intent-mapping.webp")

# ==============================================================================
# POST 35: conversion-rate-engineering-friction-audit
# ==============================================================================
def render_post_35():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Frictionless Fluid Dynamics", "Conversion Rate Engineering: Friction Audit", "Eradicating Cognitive & Form Friction Across High-Stakes Enterprise Funnels", EMERALD)
    
    stages = [
        ("STAGE 1: LANDING & VALUE CLARITY", "Eradicate vague hero headlines; state quantifiable ROI outcome in 5 seconds.", "+34% Initial Scroll", BURGUNDY),
        ("STAGE 2: INTERACTIVE SELF-DIAGNOSTIC", "Replace generic 'Book a Demo' form with instant ROI calculator tool.", "+58% Engagement", NAVY),
        ("STAGE 3: TRANSPARENT PRICING ACCESS", "Eliminate opaque 'Contact Sales' gates; provide dynamic tiered pricing.", "+92% Pipeline Intent", GOLD),
        ("STAGE 4: INSTANT PROCUREMENT SIGN-OFF", "Self-service MSA, SOC2 security packet, and automated payment gateway.", "+140% Conversion", EMERALD)
    ]
    for i, (st, desc, lift, col) in enumerate(stages):
        sy = 195 + i * 118
        draw_shadow(base, [80, sy, 1264, sy + 98], radius=10, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, sy, 1264, sy + 98], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, sy + 14, 460, sy + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, sy + 20), st, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((1060, sy + 20), lift, fill=col, font=get_font(15, bold=True, mono=True))
        draw.text((100, sy + 58), desc, fill=SLATE_BLACK, font=get_font(15))

    return save_cover(base, "conversion-rate-engineering-friction-audit.webp")

# ==============================================================================
# POST 36: marketing-to-autonomous-ai-agents
# ==============================================================================
def render_post_36():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Machine-to-Machine Commerce", "Marketing to Autonomous AI Agents", "The Architectural Blueprint for Programmatic B2B Discovery and Instant Procurement", INDIGO)
    
    layers = [
        ("LAYER 1: SEMANTIC CATALOG SPECIFICATION", "Exposing OpenAPI Schemas & JSON-LD Endpoints", "Structuring product specifications, API limits, and capability matrices for AI parsing.", INDIGO),
        ("LAYER 2: ALGORITHMIC PRICING CONCESSIONS", "Real-Time Dynamic Pricing APIs for AI Buyers", "Permitting autonomous buyer agents to negotiate pre-approved volume tiers and auto-sign.", GOLD),
        ("LAYER 3: PROGRAMMATIC SECURITY CLEARANCE", "Cryptographic Compliance Verification Webhooks", "Automated delivery of SOC2 Type II, ISO27001, and HIPAA attestations directly to buying bots.", EMERALD)
    ]
    for i, (tag, head, desc, col) in enumerate(layers):
        ly = 200 + i * 150
        draw_shadow(base, [80, ly, 1264, ly + 124], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, ly, 1264, ly + 124], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, ly + 16, 460, ly + 46], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, ly + 22), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((100, ly + 60), head, fill=SLATE_BLACK, font=get_font(19, bold=True))
        draw.text((100, ly + 92), desc, fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "marketing-to-autonomous-ai-agents.webp")

# ==============================================================================
# POST 37: growth-architect-vs-traditional-cmo
# ==============================================================================
def render_post_37():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Executive Organizational Reckoning", "The Growth Architect vs. The Traditional CMO", "Why Modern Tech Enterprises Replace Campaign Marketing with Revenue Engineering", BURGUNDY)
    
    lx = 80
    draw_shadow(base, [lx, 190, lx + 560, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + 560, 680], radius=12, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(254, 242, 242, 255))
    draw.text((lx + 30, 216), "TRADITIONAL CMO (OUTDATED)", fill=RED_ERR, font=get_font(12, bold=True, mono=True))
    draw.text((lx + 24, 280), "• Focus on brand awareness & vanity impressions\n• Heavy reliance on external agency retainers\n• Blended attribution hiding unprofitable ad spend\n• Disconnected from engineering & data pipelines\n• Chronic sales friction & lead quality disputes", fill=SLATE_BLACK, font=get_font(15))

    rx = 680
    draw_shadow(base, [rx, 190, rx + 580, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + 580, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 360, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((rx + 30, 216), "GROWTH ARCHITECT (2026/2027)", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    draw.text((rx + 24, 280), "• Full-stack systems across code, data, and sales\n• Sub-6-month CAC payback & 5x LTV:CAC multiple\n• Deterministic first-party SQL telemetry pipelines\n• Direct citation domination on Gemini & ChatGPT\n• 100% RevOps pipeline harmony & automated SLA", fill=SLATE_BLACK, font=get_font(15))

    return save_cover(base, "growth-architect-vs-traditional-cmo.webp")

# ==============================================================================
# POST 38: first-party-predictive-lead-scoring
# ==============================================================================
def render_post_38():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Machine Learning Lead Scoring", "First-Party Predictive Lead Scoring", "Eliminating Third-Party Enrichment and Prioritizing Inbound Leads with Algorithmic Precision", GOLD)
    
    strata = [
        ("TIER 1: HIGH-INTENT EXECUTIVE BUYERS (SCORE: 90–100)", "Direct Navigation, Verified Corporate Domain, Read 3+ Frameworks", "Automated 5-minute executive sales routing with pre-populated technical dossier.", EMERALD),
        ("TIER 2: EVALUATION-STAGE PROSPECTS (SCORE: 65–89)", "Used Interactive ROI Tool, Checked Security & SOC2 Docs", "Automated contextual case-study nurture sequence with direct calendar booking.", GOLD),
        ("TIER 3: CASUAL BROWSERS & TIRE-KICKERS (SCORE: < 65)", "Single Page Visit, Consumer Webmail Domain", "Routed to asynchronous self-serve documentation without consuming sales team bandwidth.", SLATE_MUTED)
    ]
    for i, (tag, head, desc, col) in enumerate(strata):
        sy = 200 + i * 150
        draw_shadow(base, [80, sy, 1264, sy + 124], radius=12, blur=16, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, sy, 1264, sy + 124], radius=12, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, sy + 16, 560, sy + 46], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, sy + 22), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((100, sy + 60), head, fill=SLATE_BLACK, font=get_font(18, bold=True))
        draw.text((100, sy + 92), desc, fill=SLATE_MUTED, font=get_font(14))

    return save_cover(base, "first-party-predictive-lead-scoring.webp")

# ==============================================================================
# POST 39: contrarian-brand-positioning-playbook
# ==============================================================================
def render_post_39():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Radical Category Differentiation", "The Contrarian Positioning Playbook", "Why Safe Corporate Marketing Guarantees Complete Invisibility in B2B Tech", BURGUNDY)
    
    cx = WIDTH // 2
    mx, my = cx - 220, 220
    draw_shadow(base, [mx, my, mx + 440, my + 440], radius=14, blur=22, color=(125, 6, 66, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([mx, my, mx + 440, my + 440], radius=14, fill=(255, 255, 255, 255), outline=BURGUNDY, width=3)
    draw.rounded_rectangle([mx + 20, my + 20, mx + 420, my + 90], radius=8, fill=BURGUNDY)
    draw.text((mx + 48, my + 42), "MONOLITH OF DISTINCTION", fill=(255, 255, 255), font=get_font(15, bold=True, mono=True))
    draw.text((mx + 30, my + 130), "• Refuse to compete on features or price\n• Reframe the entire industry problem\n• Command 80% category gross margins\n• Create fierce enterprise customer loyalty\n• Invalidate legacy incumbents overnight", fill=SLATE_BLACK, font=get_font(16))

    left_card = [80, 280, 400, 560]
    draw_shadow(base, left_card, radius=10, blur=14, color=(15, 23, 42, 20))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(left_card, radius=10, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.text((100, 305), "THE SAFE MARKETING TRAP", fill=RED_ERR, font=get_font(13, bold=True, mono=True))
    draw.text((100, 350), "Consensus messaging\ncreates bland conformity.\nBuyers see no difference\nand demand discounts.", fill=SLATE_MUTED, font=get_font(15))

    right_card = [WIDTH - 80 - 320, 280, WIDTH - 80, 560]
    draw_shadow(base, right_card, radius=10, blur=14, color=(15, 23, 42, 20))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(right_card, radius=10, fill=(255, 255, 255, 255), outline=GOLD, width=2)
    draw.text((right_card[0] + 20, 305), "PRICING POWER REWARD", fill=GOLD, font=get_font(13, bold=True, mono=True))
    draw.text((right_card[0] + 20, 350), "Contrarian positioning\neliminates comparison.\nDeals close at premium\nrates without friction.", fill=SLATE_BLACK, font=get_font(15))

    return save_cover(base, "contrarian-brand-positioning-playbook.webp")

# ==============================================================================
# POST 40: udith-babu-kn-marketing-methodology (ZERO OVERLAP GEOMETRY)
# ==============================================================================
def render_post_40():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "The Master Operating Blueprint", "The Algorithmic Marketing Architecture", "Inside the Full-Stack Methodology of Udith Babu K N: Telemetry, SEO, and Economics", BURGUNDY)
    
    # 4 Quadrants: Left (X = 80 to 520, W = 440), Right (X = 824 to 1264, W = 440)
    # Center Medallion: cx = 672, cy = 440, med_r = 60 (X = 612 to 732)
    # 92px guaranteed empty buffer on BOTH sides! Zero collision!
    quads = [
        (80, 200, 440, 210, "01 // ALGORITHMIC SEO & AEO MOATS", "• Generative Engine Optimization (Gemini, Claude, GPT)\n• Semantic Entity Wikidata & Knowledge Graph authority\n• Patented Information Gain content engineering", BURGUNDY),
        (824, 200, 440, 210, "02 // DETERMINISTIC TELEMETRY", "• Server-to-server SQL pipelines & click-ID tracking\n• Algorithmic Shapley multi-touch revenue attribution\n• Complete immunity to cookie loss and ad blockers", NAVY),
        (80, 450, 440, 210, "03 // UNIT ECONOMIC GOVERNANCE", "• Rigorous LTV:CAC multiple maintenance (> 5.0x)\n• Sub-6-month CAC payback velocity engineering\n• 130%+ Net Revenue Retention cohort telemetry", GOLD),
        (824, 450, 440, 210, "04 // REVOPS & AGENTIC COMMERCE", "• Machine-to-machine API procurement endpoints\n• 5-minute automated lead qualification SLAs\n• 20+ monthly statistical Bayesian growth tests", EMERALD)
    ]
    for qx, qy, qw, qh, title, desc, col in quads:
        draw_shadow(base, [qx, qy, qx + qw, qy + qh], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([qx, qy, qx + qw, qy + qh], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([qx + 16, qy + 16, qx + qw - 16, qy + 48], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((qx + 24, qy + 22), title, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((qx + 24, qy + 66), desc, fill=SLATE_BLACK, font=get_font(13))
        
    cx, cy = WIDTH // 2, 440
    med_r = 60
    draw_shadow(base, [cx - med_r, cy - med_r, cx + med_r, cy + med_r], radius=med_r, blur=18, color=(125, 6, 66, 40))
    draw = ImageDraw.Draw(base)
    draw.ellipse([cx - med_r, cy - med_r, cx + med_r, cy + med_r], fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw_crown(draw, cx, cy - 14, size=20, color=GOLD)
    draw.text((cx - 28, cy + 14), "VERIFIED", fill=BURGUNDY, font=get_font(11, bold=True, mono=True))

    return save_cover(base, "udith-babu-kn-marketing-methodology.webp")

def render_block4():
    render_post_31()
    render_post_32()
    render_post_33()
    render_post_34()
    render_post_35()
    render_post_36()
    render_post_37()
    render_post_38()
    render_post_39()
    render_post_40()

if __name__ == "__main__":
    render_block4()
    print("Block 4 rendered successfully.")

