import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function extractData() {
    // Import blog posts
    const { blogPosts } = await import('./src/data/blogPostsData.js');

    const siteData = {
        portfolio: {
            summary: {
                heading: "Expert Executive – Marketing and Sales | IT Business Analyst",
                subtitle: "MBA in Operations & Marketing | B.Tech in Information Technology",
                description: "As a forward-thinking Executive in Marketing and Sales, I specialize in creating and executing data-driven strategies that boost brand visibility and drive revenue growth. With a strong foundation as an IT Business Analyst, I bring a unique analytical perspective to market research, lead generation, and client engagement. Based in Kerala, India, I am adept at using tools like Python and MySQL for market analysis and Figma for crafting compelling marketing materials, ensuring every campaign is both innovative and effective."
            },
            skills: {
                "Marketing & SEO": ["SEO Strategy", "AEO & GEO", "Google Analytics", "Content Marketing", "Keyword Research"],
                "Core Technologies": ["Python", "MySQL", "JavaScript", "Vibe Coding (Claude, Gemini, etc.)"],
                "Project Management & Design": ["Jira", "Trello", "Figma", "UI/UX Designing", "AI Video Editing & Gen", "Poster Design"],
                "Business & Analysis": ["Stakeholder Negotiation", "Scrum Facilitation", "Root-Cause Analysis", "Microsoft Office", "CRM Handling"]
            },
            experience: [
                {
                    date: "Aug 2025 – Present",
                    role: "Executive – Marketing and Sales",
                    company: "Rêve",
                    responsibilities: [
                        "Developing and implementing marketing and sales strategies.",
                        "Building and maintaining strong client relationships.",
                        "Executing on-page and off-page SEO strategies to improve organic search rankings.",
                        "Conducting keyword research and competitor analysis to inform content strategy.",
                        "Analyzing website traffic and user engagement using Google Analytics to optimize campaigns.",
                        "Managing technical SEO audits to enhance site performance and crawlability."
                    ]
                },
                {
                    date: "May 2025 – Aug 2025",
                    role: "Business Development Executive",
                    company: "Accelgrowth Technology Pvt. Ltd.",
                    responsibilities: [
                        "Conducted market research and gathered client requirements for strategic planning.",
                        "Analyzed customer data to identify trends and support decisions.",
                        "Collaborated with tech teams to align business needs with functional requirements.",
                        "Prepared business cases, proposals, and stakeholder reports.",
                        "Coordinated UAT by managing client feedback and validating requirements.",
                        "Used Excel, Trello, and CRM tools for lead management and KPI tracking.",
                        "Built strong client relationships through consultative solutions and support."
                    ]
                },
                {
                    date: "Sep 2024 – Dec 2024",
                    role: "Business Analyst Intern",
                    company: "CST - Cyber Sapient",
                    responsibilities: [
                        "Gathered and documented 100+ business requirements.",
                        "Designed 10+ functional specifications and wireframes in Figma.",
                        "Analysed 50+ datasets using Python, improving sprint outcomes by 15%.",
                        "Coordinated and executed UAT for three key features with 98% compliance."
                    ]
                },
                {
                    date: "Aug 2023 – Sep 2023",
                    role: "Operations Intern",
                    company: "Techmindz",
                    responsibilities: [
                        "Automated customer service processes using AI, reducing response time by 30%.",
                        "Analysed customer data to improve service strategies (15% satisfaction increase).",
                        "Collaborated with development team to integrate AI tools."
                    ]
                }
            ],
            education: [
                {
                    date: "2022 – 2024",
                    role: "MBA (Operations & Marketing)",
                    company: "College of Engineering Thalassery",
                    details: [
                        "Specialized in Operations Management and Marketing.",
                        "Graduated with 7.29 CGPA (72.90%).",
                        "Gained expertise in supply chain, project management, and marketing strategies."
                    ]
                },
                {
                    date: "2018 – 2022",
                    role: "B.Tech (Information Technology)",
                    company: "College of Engineering Thalassery",
                    details: [
                        "Specialized in Information Technology.",
                        "Graduated with 7.84 CGPA (78.40%).",
                        "Developed a strong foundation in software development, database management, and networking."
                    ]
                }
            ],
            projects: [
                {
                    title: "Web Analyzer Pro",
                    tags: "JavaScript, HTML, CSS, Chart.js",
                    description: "Advanced tool to analyze any website's design system, extracting colors, typography, and CSS stats with visualizations. Provides in-depth design and code analysis.",
                    link: "https://udithkn.github.io/Web-Analyzer-Pro/"
                },
                {
                    title: "Advanced Web Security Chrome Extension",
                    tags: "Python, JavaScript, HTML, CSS, Machine Learning",
                    description: "Chrome extension for detecting malicious JPEG images during browsing, enhancing web security. Used machine learning to identify malicious patterns with 25% improved accuracy.",
                    link: "https://github.com/udithkn/maljpeg_project"
                },
                {
                    title: "Free LinkedIn Banner Premium Collection",
                    tags: "HTML, CSS, JavaScript",
                    description: "A collection of 50+ free, premium, and customizable LinkedIn banners to help users make a great first impression.",
                    link: "https://udithkn.github.io/Free-LinkedIn-Banner-Premium-Collection/"
                },
                {
                    title: "ImageForge",
                    tags: "HTML, CSS, JavaScript",
                    description: "A free-to-use, innovative image converting tool designed to help users avoid ads and login/sign-up requirements. Seamlessly convert images from one format to another, such as JPG to PNG, hassle-free.",
                    link: "https://udithkn.github.io/ImageForge/"
                }
            ],
            certifications: [
                {
                    title: "JPMorgan Chase & Co. Agile Job Simulation",
                    meta: "Forage | July 2024",
                    description: "Completed a simulation involving drafting user stories, running standups, and conducting sprint reviews, which increased team velocity by 20%.",
                    link: "https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link"
                },
                {
                    title: "micro1 Business Analyst Certification",
                    meta: "micro1 | May 2025",
                    description: "Successfully passed micro1's AI Interview and evaluation process, earning a certification as a Business Analyst.",
                    link: "https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing"
                }
            ],
            faq: [
                {
                    question: "Who is Udith Babu K N?",
                    answer: "Udith Babu K N is a Marketing and Sales Executive and IT Business Analyst based in Kerala, India, with an MBA in Operations & Marketing."
                },
                {
                    question: "What are Udith Babu K N's core skills?",
                    answer: "His core skills include Advanced SEO strategy, Generative Engine Optimization (GEO), Content Marketing, Python, MySQL, and Agile project management."
                },
                {
                    question: "How can I contact Udith Babu K N?",
                    answer: "You can contact Udith Babu K N via email at udithbabuvarrier@gmail.com or call at +91 8301993853."
                }
            ]
        },
        blogPosts: blogPosts
    };

    fs.writeFileSync(join(__dirname, 'site_data.json'), JSON.stringify(siteData, null, 2));
    console.log("Successfully extracted all structured data into site_data.json");
}

extractData().catch(console.error);
