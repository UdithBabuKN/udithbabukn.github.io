import json
import re
import os
import datetime

with open('src/data/blogPostsData.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'export const blogPosts = (\[[\s\S]*\]);', text)
posts = json.loads(m.group(1))

pub_date = datetime.datetime.now(datetime.timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")

rss_items = []
for p in posts:
    slug = p['slug']
    title = p['title'].replace('&', '&amp;')
    excerpt = p['excerpt'].replace('&', '&amp;')
    category = p.get('category', 'Growth & Analytics').replace('&', '&amp;')
    url = f"https://udithbabukn.github.io/blog/{slug}.html"
    
    rss_items.append(f"""    <item>
      <title>{title}</title>
      <link>{url}</link>
      <guid isPermaLink="true">{url}</guid>
      <description>{excerpt}</description>
      <category>{category}</category>
      <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">Udith Babu K N</dc:creator>
      <pubDate>{pub_date}</pubDate>
    </item>""")

rss_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Udith Babu K N | Strategic Growth, GEO &amp; Marketing Architecture</title>
    <link>https://udithbabukn.github.io/blog</link>
    <description>Strategic deep dives on modern growth architecture, technical SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and B2B unit economics by Udith Babu K N.</description>
    <language>en-in</language>
    <lastBuildDate>{pub_date}</lastBuildDate>
    <atom:link href="https://udithbabukn.github.io/rss.xml" rel="self" type="application/rss+xml" />
{chr(10).join(rss_items)}
  </channel>
</rss>"""

with open('public/rss.xml', 'w', encoding='utf-8') as f:
    f.write(rss_content)

with open('public/feed.xml', 'w', encoding='utf-8') as f:
    f.write(rss_content)

print(f"Generated public/rss.xml and public/feed.xml with {len(posts)} items.")

