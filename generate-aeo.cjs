const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const blogDir = path.join(__dirname, 'public/blog');

if (!fs.existsSync(blogDir)) {
    console.error('Blog directory not found.');
    process.exit(1);
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
let processedCount = 0;

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // Check if FAQPage schema already exists
    let hasFAQSchema = false;
    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const json = JSON.parse($(el).html());
            if (json['@type'] === 'FAQPage') {
                hasFAQSchema = true;
            }
        } catch (e) {
            // Ignore parse errors
        }
    });

    if (hasFAQSchema) {
        return; // Skip if already has FAQ
    }

    const questions = [];

    // Look for h2 and h3 in article content
    $('.article-content h2, .article-content h3').each((i, el) => {
        const questionText = $(el).text().trim();
        // The answer is the text of the next <p> tag
        const answerEl = $(el).next('p');
        
        if (answerEl.length > 0) {
            const answerText = answerEl.text().trim();
            // Only add if it's reasonably substantive
            if (questionText && answerText && answerText.length > 20) {
                questions.push({
                    "@type": "Question",
                    "name": questionText,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answerText
                    }
                });
            }
        }
    });

    if (questions.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": questions
        };

        const scriptTag = `\n    <!-- AEO FAQ Schema automatically generated -->\n    <script type="application/ld+json">\n    ${JSON.stringify(faqSchema, null, 2)}\n    </script>\n`;
        $('head').append(scriptTag);

        fs.writeFileSync(filePath, $.html(), 'utf8');
        console.log(`[AEO] Added FAQ schema to ${file} with ${questions.length} questions.`);
        processedCount++;
    }
});

console.log(`[AEO] Processing complete. Added AEO schemas to ${processedCount} blog posts.`);
