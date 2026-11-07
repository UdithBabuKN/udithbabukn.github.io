import json
import re
import datetime

with open('src/data/blogPostsData.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'export const blogPosts = (\[[\s\S]*\]);', text)
posts = json.loads(m.group(1))

today = datetime.datetime.now().strftime("%Y-%m-%d")

urls = []
for p in posts:
    slug = p['slug']
    priority = "0.9" if (slug.startswith('who-is-') or slug.startswith('best-') or 'architect' in slug or 'geo' in slug or 'aeo' in slug) else "0.8"
    urls.append(f"""  <url>
    <loc>https://udithbabukn.github.io/blog/{slug}.html</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
  </url>""")

sitemap_blog = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>
"""

with open('public/sitemap-blog.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_blog)

sitemap_index = f"""<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Main Pages Sitemap (Homepage, Blog listing) -->
  <sitemap>
    <loc>https://udithbabukn.github.io/sitemap-pages.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>

  <!-- Blog Posts Sitemap (All {len(posts)} blog articles) -->
  <sitemap>
    <loc>https://udithbabukn.github.io/sitemap-blog.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>

</sitemapindex>
"""

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_index)

print(f"Generated public/sitemap-blog.xml with {len(posts)} URLs and updated public/sitemap.xml!")

