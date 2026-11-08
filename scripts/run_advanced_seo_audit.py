import os, sys, re, glob, json
from collections import Counter, defaultdict
from xml.etree import ElementTree as ET

print("=" * 80)
print("COMPREHENSIVE ADVANCED SEO AUDIT: UDITHBABUKN.GITHUB.IO")
print("=" * 80)

audit_results = {
    "homepage": {},
    "blogs_summary": {},
    "blogs_issues": [],
    "robots": {},
    "sitemaps": {},
    "feeds": {},
    "llms_txt": {},
    "link_graph": {},
    "word_counts": [],
    "schema_stats": Counter(),
    "broken_internal_links": []
}

# ----------------------------------------------------------------------
# 1. AUDIT HOMEPAGE (index.html)
# ----------------------------------------------------------------------
print("\n[1/7] Auditing Homepage (index.html)...")
with open("index.html", "r", encoding="utf-8") as f:
    home_html = f.read()

hp_title_match = re.search(r"<title>(.*?)</title>", home_html, re.I | re.S)
hp_title = hp_title_match.group(1).strip() if hp_title_match else ""

hp_desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', home_html, re.I | re.S)
hp_desc = hp_desc_match.group(1).strip() if hp_desc_match else ""

hp_canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', home_html, re.I | re.S)
hp_canonical = hp_canonical_match.group(1).strip() if hp_canonical_match else ""

hp_schemas = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', home_html, re.I | re.S)

hp_og_tags = dict(re.findall(r'<meta\s+property=["\'](og:[^"\']+)["\']\s+content=["\'](.*?)["\']', home_html, re.I))
hp_tw_tags = dict(re.findall(r'<meta\s+name=["\'](twitter:[^"\']+)["\']\s+content=["\'](.*?)["\']', home_html, re.I))

audit_results["homepage"] = {
    "title": hp_title,
    "title_length": len(hp_title),
    "description": hp_desc,
    "description_length": len(hp_desc),
    "canonical": hp_canonical,
    "schemas_count": len(hp_schemas),
    "og_tags_count": len(hp_og_tags),
    "tw_tags_count": len(hp_tw_tags),
}
print(f"  Title: '{hp_title}' ({len(hp_title)} chars)")
print(f"  Meta Description: '{hp_desc[:60]}...' ({len(hp_desc)} chars)")
print(f"  Canonical: {hp_canonical}")
print(f"  JSON-LD Schemas: {len(hp_schemas)}")
print(f"  OG tags: {len(hp_og_tags)} | Twitter tags: {len(hp_tw_tags)}")

# ----------------------------------------------------------------------
# 2. AUDIT ROBOTS.TXT
# ----------------------------------------------------------------------
print("\n[2/7] Auditing robots.txt...")
if os.path.exists("public/robots.txt"):
    with open("public/robots.txt", "r", encoding="utf-8") as f:
        robots_txt = f.read()
    sitemaps_in_robots = re.findall(r"Sitemap:\s*(https?://[^\s]+)", robots_txt, re.I)
    disallows = re.findall(r"Disallow:\s*([^\s]+)", robots_txt, re.I)
    ai_bots = re.findall(r"User-agent:\s*([^\s]+)", robots_txt, re.I)
    audit_results["robots"] = {
        "exists": True,
        "sitemaps": sitemaps_in_robots,
        "disallows": disallows,
        "user_agents": ai_bots
    }
    print(f"  Robots exists. Declared sitemaps: {len(sitemaps_in_robots)}")
    print(f"  User-agents addressed: {', '.join(ai_bots[:8])}")
    print(f"  Disallowed paths: {disallows}")
else:
    audit_results["robots"] = {"exists": False}
    print("  ERROR: robots.txt not found!")

# ----------------------------------------------------------------------
# 3. AUDIT XML SITEMAPS
# ----------------------------------------------------------------------
print("\n[3/7] Auditing XML Sitemaps...")
sitemaps = ["public/sitemap.xml", "public/sitemap-blog.xml", "public/sitemap-pages.xml"]
for sm in sitemaps:
    if os.path.exists(sm):
        try:
            tree = ET.parse(sm)
            root = tree.getroot()
            tag = root.tag.split("}")[-1]
            if tag == "sitemapindex":
                sub_sm = [e.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text for e in root]
                audit_results["sitemaps"][sm] = {"type": "index", "entries": len(sub_sm), "sub_sitemaps": sub_sm}
                print(f"  {sm}: Valid Sitemap Index with {len(sub_sm)} sub-sitemaps.")
            else:
                urls = [e.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text for e in root]
                audit_results["sitemaps"][sm] = {"type": "urlset", "entries": len(urls)}
                print(f"  {sm}: Valid URL set with {len(urls)} URLs.")
        except Exception as e:
            audit_results["sitemaps"][sm] = {"error": str(e)}
            print(f"  ERROR parsing {sm}: {e}")
    else:
        audit_results["sitemaps"][sm] = {"error": "File not found"}
        print(f"  ERROR: {sm} not found!")

# ----------------------------------------------------------------------
# 4. AUDIT RSS & ATOM FEEDS
# ----------------------------------------------------------------------
print("\n[4/7] Auditing Syndication Feeds (rss.xml, feed.xml)...")
for feed_path in ["public/rss.xml", "public/feed.xml"]:
    if os.path.exists(feed_path):
        try:
            tree = ET.parse(feed_path)
            root = tree.getroot()
            channel = root.find("channel")
            items = channel.findall("item") if channel is not None else []
            audit_results["feeds"][feed_path] = {"items": len(items), "valid": True}
            print(f"  {feed_path}: Valid RSS feed with {len(items)} items.")
        except Exception as e:
            audit_results["feeds"][feed_path] = {"error": str(e), "valid": False}
            print(f"  ERROR parsing {feed_path}: {e}")
    else:
        audit_results["feeds"][feed_path] = {"error": "File not found"}

# ----------------------------------------------------------------------
# 5. AUDIT LLMS.TXT (AI SEARCH & LLM INGESTION)
# ----------------------------------------------------------------------
print("\n[5/7] Auditing llms.txt...")
if os.path.exists("public/llms.txt"):
    with open("public/llms.txt", "r", encoding="utf-8") as f:
        llms_content = f.read()
    llms_urls = re.findall(r"-\s*\[(.*?)\]\((https?://[^\)]+)\)", llms_content)
    audit_results["llms_txt"] = {
        "exists": True,
        "length_bytes": len(llms_content),
        "indexed_links": len(llms_urls)
    }
    print(f"  llms.txt exists ({len(llms_content)} bytes). Links indexed: {len(llms_urls)}")
else:
    audit_results["llms_txt"] = {"exists": False}
    print("  ERROR: public/llms.txt not found!")

# ----------------------------------------------------------------------
# 6. COMPREHENSIVE ON-PAGE AUDIT ACROSS ALL 150 BLOG POSTS
# ----------------------------------------------------------------------
print("\n[6/7] Auditing all 150 Blog Posts in public/blog/...")
blog_files = glob.glob("public/blog/*.html")

titles = {}
descriptions = {}
canonicals = {}
internal_inbound = defaultdict(list)
all_known_slugs = set([os.path.splitext(os.path.basename(f))[0] for f in blog_files])

short_titles = []
long_titles = []
short_descs = []
long_descs = []
missing_h1 = []
multiple_h1 = []
missing_canonicals = []
invalid_canonicals = []
missing_schemas = []
broken_json_ld = []
missing_og = []
missing_twitter = []
thin_content = []  # < 1000 words
missing_alts = []
missing_img_dimensions = []
mixed_content_http = []

for bf in blog_files:
    slug = os.path.splitext(os.path.basename(bf))[0]
    with open(bf, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Title
    t_m = re.search(r"<title>(.*?)</title>", html, re.I | re.S)
    if t_m:
        title = t_m.group(1).strip()
        titles[slug] = title
        if len(title) < 30:
            short_titles.append((slug, title, len(title)))
        elif len(title) > 75:
            long_titles.append((slug, title, len(title)))
    else:
        titles[slug] = ""
        short_titles.append((slug, "MISSING", 0))

    # Meta Description
    d_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.I | re.S)
    if d_m:
        desc = d_m.group(1).strip()
        descriptions[slug] = desc
        if len(desc) < 70:
            short_descs.append((slug, desc, len(desc)))
        elif len(desc) > 170:
            long_descs.append((slug, desc, len(desc)))
    else:
        descriptions[slug] = ""
        short_descs.append((slug, "MISSING", 0))

    # Canonical
    c_m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', html, re.I | re.S)
    expected_canonical = f"https://udithbabukn.github.io/blog/{slug}.html"
    if c_m:
        can = c_m.group(1).strip()
        canonicals[slug] = can
        if can != expected_canonical:
            invalid_canonicals.append((slug, can, expected_canonical))
    else:
        missing_canonicals.append(slug)

    # Headings
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.I | re.S)
    if len(h1s) == 0:
        missing_h1.append(slug)
    elif len(h1s) > 1:
        multiple_h1.append((slug, len(h1s)))

    # Schemas (JSON-LD)
    schema_blocks = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', html, re.I | re.S)
    if not schema_blocks:
        missing_schemas.append(slug)
    else:
        for sb in schema_blocks:
            try:
                data = json.loads(sb.strip())
                stype = data.get("@type", "Unknown")
                audit_results["schema_stats"][stype] += 1
            except Exception as e:
                broken_json_ld.append((slug, str(e)))

    # OG & Twitter
    has_og = bool(re.search(r'<meta\s+property=["\']og:title["\']', html, re.I))
    has_tw = bool(re.search(r'<meta\s+name=["\']twitter:card["\']', html, re.I))
    if not has_og:
        missing_og.append(slug)
    if not has_tw:
        missing_twitter.append(slug)

    # Word count estimation (strip HTML tags)
    clean_text = re.sub(r"<script[^>]*>.*?</script>", " ", html, flags=re.I | re.S)
    clean_text = re.sub(r"<style[^>]*>.*?</style>", " ", clean_text, flags=re.I | re.S)
    clean_text = re.sub(r"<[^>]+>", " ", clean_text)
    words = clean_text.split()
    word_count = len(words)
    audit_results["word_counts"].append(word_count)
    if word_count < 800:
        thin_content.append((slug, word_count))

    # Images audit
    img_tags = re.findall(r"<img\s+[^>]*>", html, re.I)
    for itag in img_tags:
        alt_m = re.search(r'alt=["\']([^"\']*)["\']', itag, re.I)
        if not alt_m or not alt_m.group(1).strip():
            missing_alts.append((slug, itag[:60]))
        has_w = bool(re.search(r'width=["\']\d+["\']', itag, re.I))
        has_h = bool(re.search(r'height=["\']\d+["\']', itag, re.I))
        if not (has_w and has_h):
            missing_img_dimensions.append((slug, itag[:60]))

    # HTTP mixed content
    http_links = re.findall(r'href=["\']http://(?!localhost)[^"\']+["\']', html, re.I)
    if http_links:
        mixed_content_http.append((slug, http_links))

    # Internal links graph
    int_links = re.findall(r'href=["\'](?:/blog/|\./blog/|https://udithbabukn\.github\.io/blog/)([a-zA-Z0-9\-_]+)(?:\.html)?["\']', html, re.I)
    for target_slug in int_links:
        target_clean = target_slug.replace(".html", "")
        if target_clean in all_known_slugs:
            internal_inbound[target_clean].append(slug)
        else:
            audit_results["broken_internal_links"].append((slug, target_clean))

# Duplicate Titles & Descriptions Check
title_counts = Counter(titles.values())
dup_titles = [t for t, c in title_counts.items() if c > 1 and t]

desc_counts = Counter(descriptions.values())
dup_descs = [d for d, c in desc_counts.items() if c > 1 and d]

# Orphan pages (0 inbound internal links from other blog posts)
orphan_pages = [s for s in all_known_slugs if len(internal_inbound[s]) == 0]

print(f"  Total Blogs Scanned: {len(blog_files)}")
print(f"  Average Word Count: {sum(audit_results['word_counts']) // len(blog_files):,} words (Min: {min(audit_results['word_counts']):,}, Max: {max(audit_results['word_counts']):,})")
print(f"  Missing H1s: {len(missing_h1)} | Multiple H1s: {len(multiple_h1)}")
print(f"  Short Titles (<30): {len(short_titles)} | Long Titles (>75): {len(long_titles)}")
print(f"  Duplicate Titles: {len(dup_titles)}")
print(f"  Short Descriptions (<70): {len(short_descs)} | Long Descriptions (>170): {len(long_descs)}")
print(f"  Duplicate Descriptions: {len(dup_descs)}")
print(f"  Missing Canonicals: {len(missing_canonicals)} | Invalid Canonicals: {len(invalid_canonicals)}")
print(f"  Broken JSON-LD: {len(broken_json_ld)}")
print(f"  Missing OG Tags: {len(missing_og)} | Missing Twitter Tags: {len(missing_twitter)}")
print(f"  Thin Content (<800w): {len(thin_content)}")
print(f"  Images Missing Alt: {len(missing_alts)}")
print(f"  Images Missing Width/Height: {len(missing_img_dimensions)}")
print(f"  HTTP Mixed Content: {len(mixed_content_http)}")
print(f"  Broken Internal Links: {len(audit_results['broken_internal_links'])}")
print(f"  Orphan Pages (0 inbound internal links): {len(orphan_pages)}")

# Print details of findings
print("\n--- SCHEMA BREAKDOWN ---")
for k, v in audit_results["schema_stats"].items():
    print(f"  {k}: {v}")

print("\n--- SAMPLE ORPHAN PAGES ---")
print(f"  Count: {len(orphan_pages)} / {len(blog_files)}")
for op in orphan_pages[:10]:
    print(f"    - {op}")

if broken_json_ld:
    print("\n--- BROKEN JSON-LD ---")
    for b in broken_json_ld[:5]:
        print(f"  {b[0]}: {b[1]}")

if invalid_canonicals:
    print("\n--- INVALID CANONICALS ---")
    for ic in invalid_canonicals[:5]:
        print(f"  {ic[0]}: found '{ic[1]}' expected '{ic[2]}'")

if dup_titles:
    print("\n--- DUPLICATE TITLES ---")
    for dt in dup_titles[:5]:
        print(f"  '{dt}' (count: {title_counts[dt]})")

if dup_descs:
    print("\n--- DUPLICATE DESCRIPTIONS ---")
    for dd in dup_descs[:5]:
        print(f"  '{dd[:60]}...' (count: {desc_counts[dd]})")

