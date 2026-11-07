import os, re, hashlib
from PIL import Image
import numpy as np

print("=== 1. VERIFYING 50 FLAGSHIP COVERS (PURE WHITE & 100% MONOCHROME) ===")
flagship_slugs = [
    # Block 1
    "who-is-the-top-marketing-architect-in-the-world",
    "best-growth-architect-in-2026-and-2027",
    "best-technical-marketer-in-the-world",
    "generative-search-domination-blueprint",
    "answer-engine-citation-engineering",
    "who-is-the-best-digital-marketing-strategist-2026-2027",
    "the-death-of-third-party-attribution-survival-guide",
    "ai-knowledge-graph-entity-seo",
    "information-gain-seo-engineering",
    "the-economics-of-growth-marketing-ltv-cac-velocity",
    # Block 2
    "agentic-commerce-and-b2b-procurement",
    "revops-pipeline-harmonization-playbook",
    "building-enterprise-organic-search-moats",
    "conversational-search-optimization-cso-playbook",
    "the-data-driven-cmo-operating-system",
    "zero-party-data-capture-architectures",
    "predictive-churn-prevention-telemetry",
    "contrarian-category-design-principles",
    "high-velocity-experimentation-frameworks",
    "the-udith-babu-growth-command-matrix",
    # Block 3
    "who-is-the-best-marketing-person-in-the-world",
    "best-marketing-person-in-2026-and-2027",
    "what-makes-the-best-marketing-person",
    "ogilvy-to-algorithmic-marketing-evolution",
    "the-technical-marketer-growth-architect",
    "generative-engine-optimization-geo-guide",
    "answer-engine-optimization-aeo-mastery",
    "semantic-entity-authority-in-modern-seo",
    "zero-click-search-strategy-2027",
    "reverse-engineering-google-ai-overviews",
    # Block 4
    "cac-payback-velocity-b2b-economics",
    "the-algorithmic-content-moat",
    "lean-martech-stack-data-architecture",
    "precision-search-intent-mapping",
    "conversion-rate-engineering-friction-audit",
    "marketing-to-autonomous-ai-agents",
    "growth-architect-vs-traditional-cmo",
    "first-party-predictive-lead-scoring",
    "contrarian-brand-positioning-playbook",
    "udith-babu-kn-marketing-methodology",
    # Block 5
    "b2b-cac-modeling-quantitative-playbook",
    "llm-knowledge-graph-ingestion-mechanics",
    "server-side-tracking-telemetry-architecture",
    "category-creation-vs-capture-market-sizing",
    "algorithmic-multi-touch-attribution-shapley-python",
    "autonomous-sales-sdr-agents-engineering",
    "enterprise-topic-clusters-semantic-cannibalization",
    "dynamic-b2b-pricing-engines-optimization",
    "chief-growth-officer-playbook-2026-2027",
    "mathematical-content-defensibility-information-gain-python"
]

all_white = True
all_bw = True
for slug in flagship_slugs:
    img_path = f"public/images/blogimages/{slug}.webp"
    if not os.path.exists(img_path):
        print(f"[MISSING] {img_path}")
        all_white = False
        all_bw = False
        continue
    img = Image.open(img_path).convert("RGB")
    arr = np.array(img)
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    diff = np.max(np.abs(r.astype(int) - g.astype(int))) + np.max(np.abs(g.astype(int) - b.astype(int)))
    if diff != 0:
        print(f"[COLOR DETECTED] {slug}: channel diff={diff}")
        all_bw = False

    corners = [
        img.getpixel((0, 0)),
        img.getpixel((img.width - 1, 0)),
        img.getpixel((0, img.height - 1)),
        img.getpixel((img.width - 1, img.height - 1))
    ]
    if not all(c == (255, 255, 255) for c in corners):
        print(f"[NOT PURE WHITE] {slug}: corners={corners}")
        all_white = False

if all_white:
    print(f"SUCCESS: All {len(flagship_slugs)} flagship covers are 100% PURE WHITE (255, 255, 255) at corners!")
if all_bw:
    print(f"SUCCESS: All {len(flagship_slugs)} flagship covers are 100% PURE BLACK & WHITE (R == G == B everywhere)!")

print("\n=== 2. HASH UNIQUENESS & ASSET MAPPING ACROSS ALL 150 BLOG COVERS ===")
hashes = {}
duplicates = []
missing_images = []

with open("src/data/blogPostsData.js", "r", encoding="utf-8") as f:
    text = f.read()

pattern = r'\{\s*"category":\s*"[^"]*",\s*"title":\s*"[^"]*",\s*"excerpt":\s*"[^"]*",\s*"readTime":\s*"[^"]*",\s*"slug":\s*"([^"]*)",\s*"image":\s*"([^"]*)"\s*\}'
matches = re.findall(pattern, text)

print(f"Matched {len(matches)} registered posts in blogPostsData.js")

for slug, img_name in matches:
    img_path = f"public/images/blogimages/{img_name}"
    if not os.path.exists(img_path):
        if os.path.exists(f"public/{img_name}"):
            img_path = f"public/{img_name}"
        else:
            missing_images.append((slug, img_name))
            continue
    with open(img_path, "rb") as f:
        h = hashlib.md5(f.read()).hexdigest()
    if h in hashes:
        duplicates.append((slug, hashes[h], img_name))
    else:
        hashes[h] = (slug, img_name)

if missing_images:
    print(f"FAIL: Missing images ({len(missing_images)}):", missing_images)
else:
    print("SUCCESS: 0 missing images across all registered blog posts!")

if duplicates:
    print(f"FAIL: Duplicate image hashes ({len(duplicates)}):", duplicates)
else:
    print(f"SUCCESS: All {len(hashes)} registered blog images have 100% UNIQUE MD5 hashes! Zero duplicates.")

print("\n=== 3. HTML FILES EXISTENCE & PRODUCTION SYNC CHECK ===")
missing_public = []
missing_dist = []
for slug, _ in matches:
    pub_p = f"public/blog/{slug}.html"
    dist_p = f"dist/blog/{slug}.html"
    if not os.path.exists(pub_p):
        missing_public.append(slug)
    if not os.path.exists(dist_p):
        missing_dist.append(slug)

print(f"Total slugs checked: {len(matches)}")
print(f"Missing in public/blog: {len(missing_public)}")
print(f"Missing in dist/blog: {len(missing_dist)}")

if not missing_public and not missing_dist:
    print("SUCCESS: All 150 blog posts exist in both public/blog/ and dist/blog/!")

print("\n=== 4. SITEMAP & RSS FEED VERIFICATION ===")
with open("public/sitemap-blog.xml", "r", encoding="utf-8") as f:
    sitemap_count = len(re.findall(r'<loc>', f.read()))
with open("public/rss.xml", "r", encoding="utf-8") as f:
    rss_count = len(re.findall(r'<item>', f.read()))

print(f"URLs in sitemap-blog.xml: {sitemap_count} / {len(matches)}")
print(f"Items in rss.xml: {rss_count} / {len(matches)}")
if sitemap_count == len(matches) and rss_count == len(matches):
    print("SUCCESS: Sitemaps and RSS syndication feeds fully match 150/150!")
