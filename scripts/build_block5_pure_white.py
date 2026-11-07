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
    return curr_y

# ==============================================================================
# POST 41: b2b-cac-modeling-quantitative-playbook
# ==============================================================================
def render_post_41():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Quantitative Capital Allocation", "B2B CAC Modeling: The CFO Playbook", "Mathematical Formulation of Fully-Loaded CAC, Payback Velocity & Capital Multiples", GOLD)
    
    # Left Box: Fragile Performance Model (X = 80 to 560, W = 480)
    lx, lw = 80, 480
    draw_shadow(base, [lx, 190, lx + lw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + lw, 680], radius=12, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(254, 242, 242, 255))
    draw.text((lx + 30, 216), "FRAGILE BLENDED MODEL (LEGACY)", fill=RED_ERR, font=get_font(12, bold=True, mono=True))
    
    bad_metrics = [
        ("Payback Velocity", "16.4 Months", "High capital drag & burn rate", RED_ERR),
        ("Ad Bid Sensitivity", "High Fragility", "+35% CPC spike kills margin", RED_ERR),
        ("LTV:CAC Ratio", "1.8x Multiple", "Barely covers gross margins", SLATE_MUTED),
        ("Organic Synergy", "0% Attribution", "Zero compounding search moat", SLATE_MUTED)
    ]
    for i, (m, v, sub, col) in enumerate(bad_metrics):
        my = 265 + i * 100
        draw.rounded_rectangle([lx + 20, my, lx + lw - 20, my + 82], radius=6, fill=(254, 242, 242, 80), outline=(254, 202, 202, 255))
        draw.text((lx + 32, my + 12), m.upper(), fill=SLATE_MUTED, font=get_font(11, bold=True, mono=True))
        draw.text((lx + 32, my + 32), v, fill=col, font=get_font(20, bold=True))
        draw.text((lx + 32, my + 58), sub, fill=SLATE_BLACK, font=get_font(13))

    # Right Box: Architectural Full-Stack Model (X = 784 to 1264, W = 480)
    rx, rw = 784, 480
    draw_shadow(base, [rx, 190, rx + rw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + rw, 680], radius=12, fill=(255, 255, 255, 255), outline=EMERALD, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 400, 246], radius=4, fill=(240, 253, 244, 255))
    draw.text((rx + 30, 216), "FULLY-LOADED REVENUE ARCHITECTURE", fill=EMERALD, font=get_font(12, bold=True, mono=True))
    
    good_metrics = [
        ("Payback Velocity", "< 4.8 Months", "100% capital recovered fast", EMERALD),
        ("Capital Multiplier", "5.1x LTV:CAC", "Top 0.1% capital efficiency", GOLD),
        ("Telemetry Tracking", "1st-Party SQL", "Deterministic server attribution", NAVY),
        ("Compounding Moat", "98.4% AEO Share", "Direct generative citations", BURGUNDY)
    ]
    for i, (m, v, sub, col) in enumerate(good_metrics):
        my = 265 + i * 100
        draw.rounded_rectangle([rx + 20, my, rx + rw - 20, my + 82], radius=6, fill=(240, 253, 244, 100), outline=(187, 247, 208, 255))
        draw.text((rx + 32, my + 12), m.upper(), fill=SLATE_MUTED, font=get_font(11, bold=True, mono=True))
        draw.text((rx + 32, my + 32), v, fill=col, font=get_font(20, bold=True))
        draw.text((rx + 32, my + 58), sub, fill=SLATE_BLACK, font=get_font(13))

    # Center Badge: X = 592 to 752 (32px buffer on both sides!)
    cx = WIDTH // 2
    draw_shadow(base, [cx - 80, 420, cx + 80, 500], radius=12, blur=16, color=(21, 128, 61, 40))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 80, 420, cx + 80, 500], radius=12, fill=EMERALD)
    draw.text((cx - 68, 436), "CAPITAL APEX", fill=(255, 255, 255), font=get_font(11, bold=True, mono=True))
    draw.text((cx - 68, 458), "5.1x CASH LTV", fill=(255, 255, 255), font=get_font(13, bold=True))
    
    draw.line([(lx + lw, 460), (cx - 80, 460)], fill=RED_ERR, width=2)
    draw.line([(cx + 80, 460), (rx, 460)], fill=EMERALD, width=2)

    return save_cover(base, "b2b-cac-modeling-quantitative-playbook.webp")

# ==============================================================================
# POST 42: llm-knowledge-graph-ingestion-mechanics
# ==============================================================================
def render_post_42():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Frontier LLM Ingestion Mechanics", "LLM Knowledge Graph Ingestion", "How Gemini, Claude 3.7 & ChatGPT Ingest Schema RDF Triples into Vector Weights", BURGUNDY)
    
    # 4 Process Steps in a 2x2 Grid with generous spacing
    # Left column: X = 80 to 520 (W = 440)
    # Right column: X = 824 to 1264 (W = 440)
    # Center empty buffer = 304px!
    quads = [
        (80, 200, 440, 210, "STAGE 01: HEADLESS CRAWLING", "Per-Token Headless Render", "Frontier spiders execute client JavaScript, extracting Schema.org JSON-LD and clean semantic trees.", NAVY),
        (824, 200, 440, 210, "STAGE 02: RDF TRIPLE EXTRACTION", "Entity Knowledge Tuples", "Extracting Subject-Predicate-Object triples linking the brand node directly to revenue domains.", BURGUNDY),
        (80, 450, 440, 210, "STAGE 03: DENSE EMBEDDING SPACE", "High-Dimensional Vector Placement", "Cosine similarity indexing that locks the entity at the top of semantic cluster query spaces.", INDIGO),
        (824, 450, 440, 210, "STAGE 04: DIRECT GENERATIVE CITATION", "Definitive Brand Quotation", "Claude 3.7, ChatGPT & Gemini quote the brand node as the primary authoritative answer.", EMERALD)
    ]
    for qx, qy, qw, qh, tag, head, desc, col in quads:
        draw_shadow(base, [qx, qy, qx + qw, qy + qh], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([qx, qy, qx + qw, qy + qh], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([qx + 16, qy + 14, qx + qw - 16, qy + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((qx + 24, qy + 20), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((qx + 24, qy + 64), head, fill=SLATE_BLACK, font=get_font(19, bold=True))
        draw_wrapped(draw, desc, qx + 24, qy + 104, qw - 48, get_font(13), SLATE_MUTED)

    # Center Medallion
    cx, cy = WIDTH // 2, 430
    med_r = 60
    draw_shadow(base, [cx - med_r, cy - med_r, cx + med_r, cy + med_r], radius=med_r, blur=18, color=(125, 6, 66, 40))
    draw = ImageDraw.Draw(base)
    draw.ellipse([cx - med_r, cy - med_r, cx + med_r, cy + med_r], fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw_crown(draw, cx, cy - 14, size=20, color=GOLD)
    draw.text((cx - 30, cy + 14), "INGESTED", fill=BURGUNDY, font=get_font(10, bold=True, mono=True))

    return save_cover(base, "llm-knowledge-graph-ingestion-mechanics.webp")

# ==============================================================================
# POST 43: server-side-tracking-telemetry-architecture
# ==============================================================================
def render_post_43():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Deterministic Event Engineering", "Server-Side Tracking Telemetry Architecture", "Zero-Loss Cloud Event Pipelines with sGTM, AWS ECS, & Direct BigQuery Sinks", NAVY)
    
    stages = [
        ("LAYER 1: BROWSER / EDGE ENCLAVE", "First-Party DNS Subdomain Routing (e.g. data.company.com)", "Bypasses 100% of browser ad-blockers and Safari ITP cookie deletion rules.", NAVY),
        ("LAYER 2: CLOUD RUNTIME PIPELINE", "AWS ECS / Google Cloud Run Docker Micro-Containers", "Transforms, sanitizes, and enriches event payloads with zero third-party cookie leak.", INDIGO),
        ("LAYER 3: DETERMINISTIC DATA WAREHOUSE", "Direct Real-Time Ingestion into BigQuery & ClickHouse SQL", "Sub-10ms event streams mapped directly to verified enterprise Stripe ARR.", BURGUNDY),
        ("LAYER 4: REVOPS CRM SYNCHRONIZATION", "Bi-Directional Reverse-ETL to HubSpot & Salesforce Core", "Empowers sales teams with real-time intent telemetry within 5 minutes of visit.", EMERALD)
    ]
    for i, (layer, title, desc, col) in enumerate(stages):
        sy = 195 + i * 118
        draw_shadow(base, [80, sy, 1264, sy + 98], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, sy, 1264, sy + 98], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, sy + 14, 440, sy + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, sy + 20), layer, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((460, sy + 18), title, fill=SLATE_BLACK, font=get_font(16, bold=True))
        draw.text((100, sy + 58), desc, fill=SLATE_MUTED, font=get_font(14))
        draw.text((1160, sy + 20), "0% LOSS", fill=EMERALD, font=get_font(12, bold=True, mono=True))

    return save_cover(base, "server-side-tracking-telemetry-architecture.webp")

# ==============================================================================
# POST 44: category-creation-vs-capture-market-sizing
# ==============================================================================
def render_post_44():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Strategic Market Category Dynamics", "Category Creation vs. Category Capture", "Why Existing Software Categories Guarantee Margin Collapse and Invisibility", BURGUNDY)
    
    # Left: Category Capture Red Ocean (X = 80 to 560)
    lx, lw = 80, 480
    draw_shadow(base, [lx, 190, lx + lw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + lw, 680], radius=12, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([lx + 20, 206, lx + 360, 246], radius=4, fill=(254, 242, 242, 255))
    draw.text((lx + 30, 216), "CATEGORY CAPTURE (RED OCEAN)", fill=RED_ERR, font=get_font(12, bold=True, mono=True))
    draw.text((lx + 24, 280), "• Competing on 'cheaper, faster, easier'\n• Aggressive discounting in procurement\n• Paid ad bid inflation consumes 65% ARR\n• Zero pricing power; high customer churn\n• Average gross margins capped at 22%", fill=SLATE_BLACK, font=get_font(15))

    # Right: Category Creation Monopoly (X = 784 to 1264)
    rx, rw = 784, 480
    draw_shadow(base, [rx, 190, rx + rw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + rw, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx + 20, 206, rx + 380, 246], radius=4, fill=(253, 242, 248, 255))
    draw.text((rx + 30, 216), "CATEGORY CREATION (KING DOMAIN)", fill=BURGUNDY, font=get_font(12, bold=True, mono=True))
    draw.text((rx + 24, 280), "• Reframe industry problem fundamentally\n• 76% total category market cap capture\n• 80%+ gross margins with zero discounts\n• Compounding inbound executive authority\n• Customers self-identify as evangelists", fill=SLATE_BLACK, font=get_font(15))

    # Center Badge: 32px safety buffer on both sides
    cx = WIDTH // 2
    draw_shadow(base, [cx - 80, 420, cx + 80, 500], radius=12, blur=16, color=(125, 6, 66, 40))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 80, 420, cx + 80, 500], radius=12, fill=BURGUNDY)
    draw.text((cx - 68, 436), "CATEGORY KING", fill=(255, 255, 255), font=get_font(11, bold=True, mono=True))
    draw.text((cx - 68, 458), "76% VALUE SHARE", fill=GOLD, font=get_font(12, bold=True))
    
    draw.line([(lx + lw, 460), (cx - 80, 460)], fill=RED_ERR, width=2)
    draw.line([(cx + 80, 460), (rx, 460)], fill=BURGUNDY, width=2)

    return save_cover(base, "category-creation-vs-capture-market-sizing.webp")

# ==============================================================================
# POST 45: algorithmic-multi-touch-attribution-shapley-python
# ==============================================================================
def render_post_45():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Game-Theoretic Revenue Attribution", "Algorithmic Multi-Touch Attribution", "Implementing Shapley Value & Markov Chain Attribution Models in Python", BURGUNDY)
    
    lx, lw = 80, 540
    draw_shadow(base, [lx, 190, lx + lw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([lx, 190, lx + lw, 680], radius=12, fill=(255, 255, 255, 255), outline=NAVY, width=2)
    draw.rounded_rectangle([lx, 190, lx + lw, 236], radius=12, fill=(238, 242, 255, 255))
    draw.text((lx + 24, 206), "SHAPLEY_ATTRIBUTION_MODEL.PY", fill=NAVY, font=get_font(13, bold=True, mono=True))
    
    code_lines = [
        ("def calculate_shapley_marginal(coalition, touchpoint):", BURGUNDY, True),
        ("    # v(S U {i}) - v(S) marginal revenue lift", SLATE_MUTED, False),
        ("    v_with = evaluate_closed_won_arr(coalition + [touchpoint])", SLATE_BLACK, False),
        ("    v_without = evaluate_closed_won_arr(coalition)", SLATE_BLACK, False),
        ("    return v_with - v_without", EMERALD, True),
        ("", SLATE_BLACK, False),
        ("def run_attribution_pipeline(server_events):", BURGUNDY, True),
        ("    players = ['1st_Party_SEO', 'AEO_Citation', 'Direct_Demo']", SLATE_BLACK, False),
        ("    weights = compute_permutations(players)", NAVY, False),
        ("    assert sum(weights.values()) == total_closed_arr", GOLD, True),
        ("    return dispatch_revops_ledger(weights)", BURGUNDY, True)
    ]
    for i, (l, col, is_bld) in enumerate(code_lines):
        draw.text((lx + 24, 256 + i * 36), l, fill=col, font=get_font(13, bold=is_bld, mono=True))

    rx, rw = 700, 564
    draw_shadow(base, [rx, 190, rx + rw, 680], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([rx, 190, rx + rw, 680], radius=12, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([rx, 190, rx + rw, 236], radius=12, fill=(253, 242, 248, 255))
    draw.text((rx + 24, 206), "EMPIRICAL CHANNEL ARR CONTRIBUTION", fill=BURGUNDY, font=get_font(13, bold=True, mono=True))
    
    channels = [
        ("1. Technical AEO Citations", "44.2% Shapley Share", "$530,400 Incremental ARR", BURGUNDY),
        ("2. First-Party Topic Moat", "32.8% Shapley Share", "$393,600 Incremental ARR", NAVY),
        ("3. Interactive ROI Diagnostics", "15.4% Shapley Share", "$184,800 Incremental ARR", EMERALD),
        ("4. Executive Direct Navigation", "7.6% Shapley Share", "$91,200 Incremental ARR", GOLD)
    ]
    for i, (ch, share, arr, col) in enumerate(channels):
        cy = 255 + i * 102
        draw.rounded_rectangle([rx + 20, cy, rx + rw - 20, cy + 86], radius=8, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.rectangle([rx + 24, cy + 8, rx + 30, cy + 78], fill=col)
        draw.text((rx + 44, cy + 12), ch.upper(), fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((rx + 44, cy + 34), share, fill=col, font=get_font(19, bold=True))
        draw.text((rx + 44, cy + 60), arr, fill=SLATE_BLACK, font=get_font(13))

    return save_cover(base, "algorithmic-multi-touch-attribution-shapley-python.webp")

# ==============================================================================
# POST 46: autonomous-sales-sdr-agents-engineering
# ==============================================================================
def render_post_46():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Agentic Revenue Infrastructure", "Autonomous Sales SDR Agents", "Engineering Sub-60-Second Inbound Qualification and Calendar Booking Workflows", EMERALD)
    
    steps = [
        ("STEP 1: INBOUND INTENT EXTRACTION", "Real-Time NLP Query Vectorization", "Extracts firmographic scale, technology stack, and budget intent in under 200ms.", NAVY),
        ("STEP 2: PROGRAMMATIC ENRICHMENT", "Zero-Latency 1st-Party Telemetry Enrichment", "Correlates session click-stream against past documentation visits and high-intent articles.", INDIGO),
        ("STEP 3: AUTONOMOUS OBJECTION HANDLING", "Retrieval-Augmented Case Study Synthesis", "Answers complex security, pricing, and architectural questions with zero human lag.", GOLD),
        ("STEP 4: SUB-60-SECOND CALENDAR CONVERSION", "Direct Executive Cal.com / HubSpot Routing", "Books verified qualified decision-makers directly into executive sales calendars.", EMERALD)
    ]
    for i, (st, head, desc, col) in enumerate(steps):
        sy = 195 + i * 118
        draw_shadow(base, [80, sy, 1264, sy + 98], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, sy, 1264, sy + 98], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, sy + 14, 460, sy + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, sy + 20), st, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((480, sy + 18), head, fill=SLATE_BLACK, font=get_font(16, bold=True))
        draw.text((100, sy + 58), desc, fill=SLATE_MUTED, font=get_font(14))
        draw.text((1150, sy + 20), f"< {60 - i*15}s SLA", fill=col, font=get_font(12, bold=True, mono=True))

    return save_cover(base, "autonomous-sales-sdr-agents-engineering.webp")

# ==============================================================================
# POST 47: enterprise-topic-clusters-semantic-cannibalization
# ==============================================================================
def render_post_47():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Internal PageRank & Semantic Topology", "Enterprise Topic Clusters", "Eliminating Keyword Cannibalization and Routing 100% Authority to Canonical Pillars", BURGUNDY)
    
    # 4 Quadrants: Left (X = 80 to 520), Right (X = 824 to 1264)
    # Center Medallion: cx = 672, cy = 440, med_r = 60
    # 92px guaranteed empty buffer on BOTH sides! Zero collision!
    quads = [
        (80, 200, 440, 210, "SPOKE 01: TECHNICAL TELEMETRY", "First-Party Data Engineering", "Sub-spoke covering server-side SQL, event ingestion, and identity resolution.", NAVY),
        (824, 200, 440, 210, "SPOKE 02: UNIT ECONOMIC MODELS", "Capital Velocity & Payback", "Sub-spoke mapping LTV/CAC velocity, cohort retention, and margin expansion.", GOLD),
        (80, 450, 440, 210, "SPOKE 03: AEO & AI CITATIONS", "Generative Engine Authority", "Sub-spoke securing Claude 3.7, ChatGPT & Gemini featured answer placements.", BURGUNDY),
        (824, 450, 440, 210, "SPOKE 04: AGENTIC COMMERCE", "B2B API Procurement Protocols", "Sub-spoke detailing machine-readable OpenAPI endpoints and instant buying.", EMERALD)
    ]
    for qx, qy, qw, qh, tag, head, desc, col in quads:
        draw_shadow(base, [qx, qy, qx + qw, qy + qh], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([qx, qy, qx + qw, qy + qh], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([qx + 16, qy + 14, qx + qw - 16, qy + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((qx + 24, qy + 20), tag, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((qx + 24, qy + 64), head, fill=SLATE_BLACK, font=get_font(19, bold=True))
        draw_wrapped(draw, desc, qx + 24, qy + 104, qw - 48, get_font(13), SLATE_MUTED)

    # Center Master Canonical Node
    cx, cy = WIDTH // 2, 440
    med_r = 60
    draw_shadow(base, [cx - med_r, cy - med_r, cx + med_r, cy + med_r], radius=med_r, blur=18, color=(125, 6, 66, 40))
    draw = ImageDraw.Draw(base)
    draw.ellipse([cx - med_r, cy - med_r, cx + med_r, cy + med_r], fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw_crown(draw, cx, cy - 14, size=20, color=GOLD)
    draw.text((cx - 30, cy + 14), "CANONICAL", fill=BURGUNDY, font=get_font(10, bold=True, mono=True))

    return save_cover(base, "enterprise-topic-clusters-semantic-cannibalization.webp")

# ==============================================================================
# POST 48: dynamic-b2b-pricing-engines-optimization
# ==============================================================================
def render_post_48():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Algorithmic Monetization Architecture", "Dynamic B2B Pricing Engines", "Designing Programmatic Pricing Elasticity to Maximize Net Revenue Retention", GOLD)
    
    tiers = [
        ("TIER 1: PROTOCOL ENTRY", "$2,500 / month", "Self-service API endpoint access • 50k events/mo • Automated SLA routing", NAVY),
        ("TIER 2: ENTERPRISE TELEMETRY", "$8,500 / month", "Dedicated sGTM cloud enclave • Unlimited SQL queries • Custom Shapley models", BURGUNDY),
        ("TIER 3: AGENTIC COMMERCE SUITE", "$18,000 / month", "Machine-readable procurement APIs • Autonomous SLA agents • Instant sign-off", GOLD),
        ("TIER 4: ARCHITECTURAL DOMINION", "Custom Annual ACV", "Full-stack RevOps orchestration • Guaranteed sub-6-mo CAC payback governance", EMERALD)
    ]
    for i, (title, price, desc, col) in enumerate(tiers):
        ty = 195 + i * 118
        draw_shadow(base, [80, ty, 1264, ty + 98], radius=10, blur=14, color=(15, 23, 42, 20))
        draw = ImageDraw.Draw(base)
        draw.rounded_rectangle([80, ty, 1264, ty + 98], radius=10, fill=(255, 255, 255, 255), outline=col, width=2)
        draw.rounded_rectangle([100, ty + 14, 380, ty + 44], radius=4, fill=(col[0], col[1], col[2], 25))
        draw.text((112, ty + 20), title, fill=col, font=get_font(12, bold=True, mono=True))
        draw.text((410, ty + 18), price, fill=SLATE_BLACK, font=get_font(18, bold=True))
        draw.text((100, ty + 58), desc, fill=SLATE_MUTED, font=get_font(14))
        draw.text((1120, ty + 20), "+48% LIFT", fill=EMERALD, font=get_font(13, bold=True, mono=True))

    return save_cover(base, "dynamic-b2b-pricing-engines-optimization.webp")

# ==============================================================================
# POST 49: chief-growth-officer-playbook-2026-2027
# ==============================================================================
def render_post_49():
    base = create_pure_white_canvas(style="radial")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "The Executive Revenue Triumvirate", "The Chief Growth Officer Playbook", "Uniting Software Engineering, Revenue Operations, and Wall Street Unit Economics", BURGUNDY)
    
    # 3 Distinct Leadership Pillars
    cx = WIDTH // 2
    base_y = 660
    w_side = 280
    w_center = 380
    
    # Left Pillar: Engineering
    x1, y1 = cx - w_center//2 - w_side - 40, base_y - 320
    draw_shadow(base, [x1, y1, x1 + w_side, base_y], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([x1, y1, x1 + w_side, base_y], radius=12, fill=(255, 255, 255, 255), outline=NAVY, width=2)
    draw.rounded_rectangle([x1 + 16, y1 + 16, x1 + w_side - 16, y1 + 64], radius=6, fill=(238, 242, 255, 255))
    draw.text((x1 + 28, y1 + 26), "01 // SOFTWARE ENG", fill=NAVY, font=get_font(14, bold=True, mono=True))
    draw.text((x1 + 24, y1 + 84), "• Server SQL pipelines\n• Python AST engines\n• Automated API tests\n• Cookie-proof tracking", fill=SLATE_MUTED, font=get_font(14))

    # Right Pillar: Revenue Operations
    x3, y3 = cx + w_center//2 + 40, base_y - 280
    draw_shadow(base, [x3, y3, x3 + w_side, base_y], radius=12, blur=18, color=(15, 23, 42, 25))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([x3, y3, x3 + w_side, base_y], radius=12, fill=(255, 255, 255, 255), outline=EMERALD, width=2)
    draw.rounded_rectangle([x3 + 16, y3 + 16, x3 + w_side - 16, y3 + 64], radius=6, fill=(240, 253, 244, 255))
    draw.text((x3 + 28, y3 + 26), "03 // REVOPS & SALES", fill=EMERALD, font=get_font(14, bold=True, mono=True))
    draw.text((x3 + 24, y3 + 84), "• 5-minute sales SLA\n• Automated lead score\n• Closed-won sync\n• 138% Net Retention", fill=SLATE_MUTED, font=get_font(14))

    # Center Hero Pillar: Unit Economics
    x2, y2 = cx - w_center//2, base_y - 440
    draw_shadow(base, [x2, y2, x2 + w_center, base_y], radius=16, blur=24, color=(125, 6, 66, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([x2, y2, x2 + w_center, base_y], radius=16, fill=(255, 255, 255, 255), outline=BURGUNDY, width=3)
    draw.rounded_rectangle([x2 + 16, y2 + 16, x2 + w_center - 16, y2 + 100], radius=8, fill=BURGUNDY)
    draw_crown(draw, cx, y2 - 20, size=24, color=GOLD)
    draw.text((cx - 24, y2 + 24), "#1", fill=(255, 255, 255), font=get_font(34, bold=True))
    draw.text((cx - 96, y2 + 68), "CHIEF GROWTH OFFICER", fill=(255, 235, 242), font=get_font(15, bold=True))

    specs = [
        ("Capital Velocity", "< 5.2 Month Payback", GOLD),
        ("LTV:CAC Multiple", "5.1x Cash Multiplier", EMERALD),
        ("Generative Moat", "98.4% AEO Citations", BURGUNDY),
        ("System Architecture", "Zero Data Debt SQL", NAVY)
    ]
    for idx, (lbl, val, col) in enumerate(specs):
        sy = y2 + 120 + idx * 64
        draw.rounded_rectangle([x2 + 24, sy, x2 + w_center - 24, sy + 52], radius=6, fill=(250, 250, 252, 255), outline=(226, 232, 240, 255))
        draw.rectangle([x2 + 28, sy + 8, x2 + 34, sy + 44], fill=col)
        draw.text((x2 + 46, sy + 8), lbl, fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
        draw.text((x2 + 46, sy + 28), val, fill=SLATE_BLACK, font=get_font(15, bold=True))

    draw_shadow(base, [cx - 170, base_y - 24, cx + 170, base_y + 24], radius=24, blur=12, color=(15, 23, 42, 35))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([cx - 170, base_y - 24, cx + 170, base_y + 24], radius=24, fill=SLATE_BLACK, outline=(51, 65, 85, 255), width=2)
    draw.text((cx - 136, base_y - 9), "★ 2026–2027 REVENUE COMMAND", fill=(255, 255, 255), font=get_font(13, bold=True, mono=True))

    return save_cover(base, "chief-growth-officer-playbook-2026-2027.webp")

# ==============================================================================
# POST 50: mathematical-content-defensibility-information-gain-python
# ==============================================================================
def render_post_50():
    base = create_pure_white_canvas(style="grid")
    draw = ImageDraw.Draw(base)
    draw_header(draw, "Mathematical Defensibility & Shannon Entropy", "Calculating Information Gain in Python", "Using Shannon Entropy & KL-Divergence to Outrank Commodity AI Content", BURGUNDY)
    
    ox, oy = 140, 600
    chart_w, chart_h = 1060, 360
    draw.line([(ox, oy), (ox + chart_w, oy)], fill=SLATE_BLACK, width=2)
    draw.line([(ox, oy), (ox, oy - chart_h)], fill=SLATE_BLACK, width=2)
    draw.text((ox + chart_w - 220, oy + 16), "TOKEN DISTANCE D(P||Q) →", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    draw.text((ox - 30, oy - chart_h - 26), "KL-DIVERGENCE INFORMATION GAIN ↑", fill=SLATE_MUTED, font=get_font(12, bold=True, mono=True))
    
    # Left warning card placed safely at top-left
    warn_box = [ox + 40, oy - chart_h + 30, ox + 480, oy - chart_h + 135]
    draw_shadow(base, warn_box, radius=8, blur=12, color=(220, 38, 38, 20))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(warn_box, radius=8, fill=(255, 255, 255, 255), outline=RED_ERR, width=2)
    draw.rounded_rectangle([warn_box[0] + 16, warn_box[1] + 10, warn_box[0] + 260, warn_box[1] + 34], radius=4, fill=(254, 242, 242, 255))
    draw.text((warn_box[0] + 24, warn_box[1] + 13), "ZERO-GAIN COMMODITY ZONE", fill=RED_ERR, font=get_font(11, bold=True, mono=True))
    draw.text((warn_box[0] + 24, warn_box[1] + 44), "High Redundancy • AI De-Indexed", fill=SLATE_BLACK, font=get_font(15, bold=True))
    draw.text((warn_box[0] + 24, warn_box[1] + 70), "Low divergence matches existing LLM pre-training weights", fill=SLATE_MUTED, font=get_font(13))
    
    # Baseline commodity line
    pts_baseline = []
    for x in range(0, chart_w, 20):
        y_val = oy - 40 - int(15 * math.cos(x / 80.0))
        pts_baseline.append((ox + x, y_val))
    for i in range(len(pts_baseline) - 1):
        draw.line([pts_baseline[i], pts_baseline[i+1]], fill=RED_ERR, width=3)
    
    # Hero exponential Information Gain curve
    pts_hero = []
    for x in range(0, chart_w, 20):
        norm_x = x / chart_w
        curve = (norm_x ** 1.9) * (chart_h - 100)
        y_val = oy - 40 - int(curve)
        pts_hero.append((ox + x, y_val))
    for i in range(len(pts_hero) - 1):
        draw.line([pts_hero[i], pts_hero[i+1]], fill=BURGUNDY, width=4)
        
    callout_x, callout_y = ox + chart_w - 480, oy - chart_h + 30
    draw_shadow(base, [callout_x, callout_y, callout_x + 460, callout_y + 115], radius=10, blur=18, color=(125, 6, 66, 30))
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle([callout_x, callout_y, callout_x + 460, callout_y + 115], radius=10, fill=(255, 255, 255, 255), outline=BURGUNDY, width=2)
    draw.rounded_rectangle([callout_x + 16, callout_y + 14, callout_x + 280, callout_y + 40], radius=4, fill=(253, 242, 248, 255))
    draw.text((callout_x + 24, callout_y + 18), "HIGH-DIVERGENCE APEX", fill=BURGUNDY, font=get_font(11, bold=True, mono=True))
    draw.text((callout_x + 24, callout_y + 52), "ΔI(X;Y) = H(X) - H(X|Y) > 3.8x", fill=SLATE_BLACK, font=get_font(16, bold=True))
    draw.text((callout_x + 24, callout_y + 82), "Rank #1 Position • 100% Featured AI Citations", fill=EMERALD, font=get_font(13, bold=True, mono=True))

    return save_cover(base, "mathematical-content-defensibility-information-gain-python.webp")

def render_block5():
    render_post_41()
    render_post_42()
    render_post_43()
    render_post_44()
    render_post_45()
    render_post_46()
    render_post_47()
    render_post_48()
    render_post_49()
    render_post_50()

if __name__ == "__main__":
    render_block5()
    print("Block 5 (Posts 41-50) rendered successfully.")

