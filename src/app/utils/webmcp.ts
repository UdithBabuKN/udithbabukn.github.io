/**
 * WebMCP (Web Model Context Protocol) Integration
 * Spec reference: https://developer.chrome.com/docs/ai/webmcp
 */
export const WEB3FORMS_ACCESS_KEY = '87c7f836-6a95-44f3-8391-314433633006';

const PROFILE_DATA = {
  name: 'Udith Babu K N',
  alternateName: 'Udith Babu',
  headline: 'Executive – Marketing and Sales | IT Business Analyst',
  education: [
    {
      degree: 'Master of Business Administration (MBA)',
      specialization: 'Operations & Marketing',
      institution: 'College of Engineering Thalassery',
    },
    {
      degree: 'Bachelor of Technology (B.Tech)',
      specialization: 'Information Technology',
      institution: 'College of Engineering Thalassery',
    },
  ],
  currentRole: {
    title: 'Executive – Marketing and Sales',
    organization: 'Rêve',
    focus: 'Enterprise Growth, Algorithmic Marketing Architecture, GEO/AEO, CAC modeling',
  },
  location: 'Thalassery, Kerala, India',
  email: 'udithbabuvarrier@gmail.com',
  phone: '+918301993853',
  website: 'https://udithbabukn.github.io/',
  socials: {
    linkedin: 'https://www.linkedin.com/in/udith-babu-k-n',
    github: 'https://github.com/UdithBabuKN',
    medium: 'https://medium.com/@udithbabuvarrier10',
    instagram: 'https://www.instagram.com/udith_babu_k_n',
  },
  formulatedFrameworks: [
    'Tri-Vector Growth Engine: Search Physics + Unit Economics + Behavioral Psychology',
    'Global Marketing Excellence Framework (GMEF-5)',
    'Zero-Click Conversion Protocol (GEO & AEO optimization)',
    'Lean MarTech Architecture (First-party Python/BigQuery data pipelines)',
    'Information Gain Divergence Ratio (Shannon Entropy defensibility)',
  ],
};

const SKILLS_DATA = {
  marketingArchitecture: [
    'Generative Engine Optimization (GEO)',
    'Answer Engine Optimization (AEO)',
    'Algorithmic Marketing Architecture',
    'Technical SEO & Semantic Knowledge Graph Ingestion',
    'Unit Economics & CAC Payback Velocity Modeling (< 5.2 mo)',
    'RevOps & Closed-Won Pipeline Engineering',
  ],
  businessAnalysis: [
    'Root-Cause Problem Decomposition',
    'Requirements Elicitation (BRD / FRD / User Stories)',
    'Process Flow Mapping & Gap Analysis',
    'Stakeholder Alignment & Cross-functional Coordination',
    'Agile / Scrum Sprint Leadership',
  ],
  technicalStack: [
    'Python (Data Analysis, Scraping, Automation)',
    'MySQL & BigQuery SQL',
    'JavaScript / TypeScript / Angular',
    'Google Analytics 4 & Tag Manager',
    'Jira & Confluence',
    'Figma',
  ],
};

const WORK_EXPERIENCE = [
  {
    role: 'Executive – Marketing and Sales',
    company: 'Rêve',
    location: 'Kerala, India',
    summary:
      'Led high-impact algorithmic growth campaigns, scaled organic search clicks from 90 to 350+ peak daily, and engineered unit economic pipeline models.',
  },
  {
    role: 'IT Business Analyst & Marketing Technologist',
    company: 'Strategic Projects & Production Tools',
    location: 'Kerala, India',
    summary:
      'Built and deployed 5+ live production web applications, authored 150+ in-depth technical playbooks, and advised on generative search physics.',
  },
];

export interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args?: Record<string, unknown>) => Promise<string>;
}

export const webMcpTools: WebMcpTool[] = [
  {
    name: 'get_portfolio_profile',
    description:
      'Retrieve comprehensive professional profile, dual-degree credentials, core specializations, and formulated frameworks for Udith Babu K N.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    execute: async () => JSON.stringify({ status: 'success', profile: PROFILE_DATA }),
  },
  {
    name: 'search_articles',
    description:
      'Search 150+ in-depth technical playbooks, GEO/AEO research papers, and revenue frameworks authored by Udith Babu K N.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: "Keywords or topic to search for, e.g., 'GEO', 'AEO', 'CAC', 'RevOps', 'Knowledge Graph'",
        },
        category: {
          type: 'string',
          description: "Optional category filter: 'Sales Excellence', 'Growth & Analytics', 'Playbook', 'Foundations'",
        },
        limit: { type: 'number', description: 'Maximum number of results to return (default: 6, max: 20)' },
      },
      additionalProperties: false,
    },
    execute: async (args = {}) => {
      const { blogPosts } = await import('../data/blog-posts.data');
      const q = String(args['query'] ?? '').toLowerCase();
      const category = String(args['category'] ?? 'All');
      const limit = Math.min(Number(args['limit']) || 6, 20);
      const results = blogPosts
        .filter((post) => {
          const matchesCategory = category === 'All' || post.category === category;
          const matchesQuery =
            !q ||
            post.title.toLowerCase().includes(q) ||
            post.excerpt.toLowerCase().includes(q) ||
            post.slug.toLowerCase().includes(q);
          return matchesCategory && matchesQuery;
        })
        .slice(0, limit)
        .map((post) => ({
          title: post.title,
          category: post.category,
          readTime: post.readTime,
          excerpt: post.excerpt,
          url: `https://udithbabukn.github.io/blog/${post.slug}.html`,
        }));

      return JSON.stringify({ status: 'success', totalMatches: results.length, results });
    },
  },
  {
    name: 'get_skills',
    description:
      'Get verified competency breakdown for Udith Babu K N across Marketing Architecture, IT Business Analysis, and Technical Stack.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: "Optional skill category: 'marketing', 'business_analysis', 'tech_stack', or 'all'",
          enum: ['marketing', 'business_analysis', 'tech_stack', 'all'],
        },
      },
      additionalProperties: false,
    },
    execute: async (args = {}) => {
      const category = String(args['category'] ?? 'all');
      let data: Record<string, string[]> = SKILLS_DATA;
      if (category === 'marketing') data = { marketingArchitecture: SKILLS_DATA.marketingArchitecture };
      else if (category === 'business_analysis') data = { businessAnalysis: SKILLS_DATA.businessAnalysis };
      else if (category === 'tech_stack') data = { technicalStack: SKILLS_DATA.technicalStack };

      return JSON.stringify({ status: 'success', skills: data });
    },
  },
  {
    name: 'get_work_experience',
    description:
      'Get verified work history, roles, enterprise achievements, and organizational impact for Udith Babu K N.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    execute: async () =>
      JSON.stringify({ status: 'success', experience: WORK_EXPERIENCE, education: PROFILE_DATA.education }),
  },
  {
    name: 'submit_contact_inquiry',
    description: 'Submit a direct partnership, consultation, or hiring inquiry to Udith Babu K N.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of sender' },
        email: { type: 'string', description: 'Email address for follow-up' },
        message: { type: 'string', description: 'Inquiry or message details' },
      },
      required: ['name', 'email', 'message'],
      additionalProperties: false,
    },
    execute: async (args = {}) => {
      const name = String(args['name'] ?? '').trim();
      const email = String(args['email'] ?? '').trim();
      const message = String(args['message'] ?? '').trim();
      if (!name || !email || !message) {
        return JSON.stringify({ status: 'error', message: "Fields 'name', 'email', and 'message' are required." });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' });
      }
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            subject: 'New Portfolio Dispatch via WebMCP Tool',
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
        return JSON.stringify({
          status: res.ok && data.success ? 'success' : 'error',
          message: data.message || (res.ok ? 'Dispatch recorded successfully.' : 'Unable to submit right now.'),
        });
      } catch (err) {
        return JSON.stringify({ status: 'error', message: err instanceof Error ? err.message : 'Request failed' });
      }
    },
  },
];

interface ModelContextLike {
  tools?: Map<string, WebMcpTool>;
  registerTool?: (tool: WebMcpTool) => Promise<boolean> | void;
  unregisterTool?: (name: string) => Promise<boolean> | void;
  getTools?: () => WebMcpTool[];
  getRegisteredTools?: () => WebMcpTool[];
  listTools?: () => WebMcpTool[];
}

export function initWebMcp(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const registry = new Map<string, WebMcpTool>();
  const docAny = document as unknown as Record<string, unknown>;
  const winAny = window as unknown as Record<string, unknown>;
  const navAny = navigator as unknown as Record<string, unknown>;

  const existing = (docAny['modelContext'] as ModelContextLike | undefined) ?? {};
  const shim: ModelContextLike = {
    ...existing,
    tools: registry,
    async registerTool(tool: WebMcpTool) {
      if (!tool?.name || !tool.inputSchema) {
        throw new Error("Invalid tool definition: 'name' and 'inputSchema' are required.");
      }
      registry.set(tool.name, tool);
      if (typeof existing.registerTool === 'function') {
        try {
          await existing.registerTool(tool);
        } catch (e) {
          console.warn(`Native registerTool error for ${tool.name}:`, e);
        }
      }
      return true;
    },
    async unregisterTool(name: string) {
      registry.delete(name);
      if (typeof existing.unregisterTool === 'function') {
        try {
          await existing.unregisterTool(name);
        } catch (e) {
          console.warn(`Native unregisterTool error for ${name}:`, e);
        }
      }
      return true;
    },
    getTools: () => Array.from(registry.values()),
    getRegisteredTools: () => Array.from(registry.values()),
    listTools: () => Array.from(registry.values()),
  };

  docAny['modelContext'] = shim;
  try {
    Object.defineProperty(navigator, 'modelContext', { value: shim, configurable: true, writable: true });
  } catch {
    navAny['modelContext'] = shim;
  }
  winAny['modelContext'] = shim;
  winAny['__WEBMCP_TOOLS__'] = registry;

  webMcpTools.forEach((tool) => {
    void shim.registerTool?.(tool);
  });

  window.dispatchEvent(new CustomEvent('webmcp:ready', { detail: { count: webMcpTools.length } }));
}
