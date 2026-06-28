import re

with open('index_old.html', 'r', encoding='utf-8') as f:
    old_content = f.read()

head_match = re.search(r'<head>(.*?)</head>', old_content, re.DOTALL)
if head_match:
    head_content = head_match.group(1)
    
    head_content = re.sub(r'<link rel="stylesheet" href="style\.css".*?>', '', head_content, flags=re.DOTALL)
    head_content = re.sub(r'<noscript>\s*<link rel="stylesheet" href="style\.css">\s*</noscript>', '', head_content, flags=re.DOTALL)
    head_content = re.sub(r'<style>.*?</style>', '', head_content, flags=re.DOTALL)

    new_index = f"""<!DOCTYPE html>
<html lang="en-IN" data-theme="light">
<head>
{head_content}
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>"""

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_index)

inline_style_match = re.search(r'<style>(.*?)</style>', old_content, re.DOTALL)
with open('style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

if inline_style_match:
    inline_css = inline_style_match.group(1)
    combined_css = inline_css + "\n" + css_content
else:
    combined_css = css_content

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(combined_css)
