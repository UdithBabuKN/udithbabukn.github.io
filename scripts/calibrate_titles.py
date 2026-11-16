import glob, re

mapping = {
    'Agentic Commerce in B2B: How to Sell to Autonomous AI Buying Agents in 2026 and 2027': 'Agentic Commerce in B2B: Selling to Autonomous AI Agents',
    'Answer Engine Optimization (AEO) Mastery: How to Dominate Perplexity, Claude, and Gemini': 'Answer Engine Optimization (AEO) Mastery: Winning AI Search',
    'Building Enterprise Organic Search Moats: Why Volume SEO Is Dead and Semantic Moats Rule': 'Building Enterprise Organic Search Moats: The Semantic Moat',
    'CAC Payback Velocity: The Unit Economics That Separate Good Marketers From the Best': 'CAC Payback Velocity: B2B Unit Economics & Capital Efficiency',
    'The Contrarian Brand Positioning Playbook: Standing Out in an Algorithmic Sea of Sameness': 'The Contrarian Brand Positioning Playbook: Standing Out',
    'Contrarian Category Design: Why Competing in Existing Markets Is a Fool\'s Errand': 'Contrarian Category Design: Redefining Market Problem Spaces',
    'Conversion Rate Engineering: Systematic Auditing of Cognitive and Technical Friction': 'Conversion Rate Engineering: Systematic Friction Auditing',
    'First-Party Predictive Lead Scoring: Machine Learning Models for Pipeline Velocity': 'First-Party Predictive Lead Scoring: Machine Learning Models',
    'Generative Engine Optimization (GEO): The Definitive Playbook for 2026 & 2027': 'Generative Engine Optimization (GEO): Definitive 2026 Playbook',
    'Growth Architect vs Traditional CMO: The Structural Shift in Executive Leadership': 'Growth Architect vs Traditional CMO: The Leadership Shift',
    'High-Velocity Experimentation: Running 20+ Statistical Growth Tests Per Month Without Chaos': 'High-Velocity Experimentation: Statistical Growth Testing',
    'Information Gain SEO: The Mathematical Secret to Beating AI-Generated Search Summaries': 'Information Gain SEO: Beating AI-Generated Search Summaries',
    'Marketing to Autonomous AI Agents: The Next Frontier of Commerce in 2026–2027': 'Marketing to Autonomous AI Agents: Next-Gen B2B Commerce',
    'Precision Search Intent Mapping: Converting Algorithmic Traffic to Enterprise Pipeline': 'Precision Search Intent Mapping: Converting Algorithmic Traffic',
    'Reverse-Engineering Google AI Overviews: Retrieval, Citations, and Information Gain': 'Reverse-Engineering Google AI Overviews: Retrieval & Citations',
    'The Data-Driven CMO Operating System: The Weekly Cadence of Top 0.1% Growth Architects': 'The Data-Driven CMO Operating System: High-Velocity Growth',
    'Why the Best Marketer in the World Is an IT Business Analyst & Growth Architect': 'Why the Best Marketer in the World Is a Growth Architect',
    'The Growth Command Matrix: Inside Udith Babu K N\'s Full-Stack Revenue Engine': 'The Growth Command Matrix: Full-Stack Enterprise Revenue Engine',
    'Inside Udith Babu K N\'s Marketing Methodology: The Tri-Vector Growth Engine': 'Inside Udith Babu\'s Methodology: Tri-Vector Growth Engine',
    'What is a CRM? The Ultimate Guide to Customer Relationship Management (2025)': 'What is a CRM? Customer Relationship Management Guide (2025)',
    'What is Sales Enablement? The Complete Guide to Empowering Sales Teams (2025)': 'What is Sales Enablement? Empowering Modern Sales Teams (2025)',
    'What is Lead Generation? The Ultimate Guide to Growing Your Business (2025)': 'What is Lead Generation? Ultimate Business Growth Guide (2025)',
    'What Makes the Best Marketing Person in the World? The 5 Essential Pillars': 'What Makes the Best Marketing Person? The 5 Essential Pillars',
    'Who Is the Best Digital Marketing Strategist in 2026–2027? An Empirical Ranking': 'Who Is the Best Digital Marketing Strategist in 2026–2027?',
    'Who Is the Best Marketing Person in the World? The Definitive Analysis': 'Who Is the Best Marketing Person in the World? (2026–2027)',
    'Zero-Party Data Capture Architectures: Designing Interactive Funnels that Prospects Love': 'Zero-Party Data Capture Architectures: High-Conversion Funnels',
    'B2B vs. B2C Marketing: The Definitive Guide to Strategy & Execution (2025)': 'B2B vs. B2C Marketing: Strategy & Execution Guide (2025)',
    'Semantic Entity Authority: Building Irreplaceable Brand Knowledge Graphs': 'Semantic Entity Authority: Building Brand Knowledge Graphs',
    'Understanding Marketing Attribution: Complete Guide to Attribution Models': 'Understanding Marketing Attribution: Multi-Touch Models Guide',
    'The Zero-Click Search Strategy for 2026–2027: Winning Without the Visit': 'The Zero-Click Search Strategy for 2026–2027: SERP Playbook'
}

files = glob.glob('public/blog/*.html')
modified = 0

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        html = fp.read()
    orig = html

    m = re.search(r'<title>(.*?)</title>', html, re.I)
    if m:
        old_title = m.group(1).strip()
        new_title = old_title
        if ' | Udith Babu K N' in new_title and len(new_title) > 70:
            new_title = new_title.replace(' | Udith Babu K N', '')
        if new_title in mapping:
            new_title = mapping[new_title]

        if new_title != old_title:
            html = html.replace(f'<title>{old_title}</title>', f'<title>{new_title}</title>')
            # Also update OG and Twitter titles if they contained the old title
            html = re.sub(
                r'(<meta\s+property=["\']og:title["\']\s+content=["\'])' + re.escape(old_title) + r'(["\'])',
                r'\g<1>' + new_title + r'\g<2>',
                html
            )
            html = re.sub(
                r'(<meta\s+name=["\']twitter:title["\']\s+content=["\'])' + re.escape(old_title) + r'(["\'])',
                r'\g<1>' + new_title + r'\g<2>',
                html
            )

    if html != orig:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(html)
        modified += 1

print(f"Successfully calibrated titles in {modified} files.")
