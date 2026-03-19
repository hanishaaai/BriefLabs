import {
  Aperture,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  FileText,
  Layers3,
  Lightbulb,
  MessageSquareQuote,
  PenTool,
  Sparkles,
  Target,
  WandSparkles
} from "lucide-react";

export const brand = {
  nameOptions: ["Lumia Brief", "Aurel", "Narra Studio", "Briefline", "Museframe"],
  chosenName: "Lumia Brief",
  oneLiner:
    "A premium creative brief workspace that helps brands write clearer, smarter, more inspiring influencer briefs."
};

export const productDesignDocument = {
  overview:
    "Lumia Brief is a strategy-first SaaS product for brand marketers, influencer managers, and agencies who need to turn loose campaign inputs into elegant, creator-friendly briefs. It combines guided structured input, strategic AI assistance, idea generation, ambiguity detection, and polished shareable outputs in one workspace.",
  problemStatement:
    "Influencer briefs are often scattered across docs, slides, chats, and internal notes. They are either too vague to guide creators or too prescriptive to inspire them. Teams need a faster, smarter, more visually refined workflow that improves clarity without killing creativity.",
  personas: [
    {
      title: "Brand Marketing Lead",
      summary:
        "Owns campaign outcomes and wants briefs that protect brand strategy while giving creators room to perform."
    },
    {
      title: "Social Media Manager",
      summary:
        "Needs to move quickly, keep details aligned, and avoid endless clarification messages after briefs are sent."
    },
    {
      title: "Agency Strategist",
      summary:
        "Creates client-facing briefs at scale and needs polished, repeatable outputs that still feel custom and elevated."
    },
    {
      title: "Startup Founder",
      summary:
        "Manages creator partnerships directly and wants strategic help without needing a full influencer team."
    }
  ],
  jobsToBeDone: [
    "When I brief creators, help me turn scattered notes into a clear campaign direction.",
    "When I am unsure whether my brief is good enough, show me the gaps before I send it.",
    "When I need stronger creative ideas, give me hooks and angles that fit the campaign.",
    "When I want creators aligned but not constrained, help me phrase guidance more collaboratively."
  ],
  vision:
    "Become the premium operating layer for influencer creative strategy: where campaign teams shape the ask, pressure-test interpretation, and deliver beautiful briefs that creators actually want to read.",
  goals: [
    "Increase clarity and completeness of influencer briefs.",
    "Reduce creator confusion and back-and-forth.",
    "Improve creative quality by generating better hooks and concept routes.",
    "Provide a premium interface that feels presentation-ready from day one."
  ],
  nonGoals: [
    "Managing full influencer CRM and outreach in V1.",
    "Replacing creator contract workflows or payment ops.",
    "Building heavy enterprise workflow administration in the first release."
  ],
  principles: [
    "Visually elegant, with editorial calm and restrained sophistication.",
    "Assistive rather than robotic, helping users think instead of flooding them with generic text.",
    "Structured but inspiring, balancing rigor with creative flexibility.",
    "Strategically useful, surfacing ambiguity before it becomes campaign misalignment."
  ],
  mvpScope: [
    "Landing page with clear product narrative and premium positioning.",
    "Dashboard showing saved briefs, templates, and current work.",
    "Template gallery with campaign starting points.",
    "Multi-step guided brief builder with sticky AI panel.",
    "Hook and concept generator section.",
    "Influencer interpretation analyzer and quality score.",
    "Final brief preview page with export-style layout."
  ],
  futureScope: [
    "Collaboration comments and approvals.",
    "Version diffing and multi-stakeholder review flows.",
    "Platform-specific brief reshaping for TikTok, Instagram, and YouTube.",
    "Creator persona simulation by niche and audience type.",
    "Localized or creator-friendly brief translation modes."
  ],
  differentiation: [
    "More strategic than a generic form builder.",
    "More elegant and shareable than docs and slides.",
    "More creator-aware than generic AI text generators.",
    "Purpose-built for influencer brief clarity, not general project management."
  ],
  successMetrics: [
    "Brief completion rate",
    "Average readiness score improvement per session",
    "Template-to-final-brief conversion rate",
    "Export/share rate",
    "Reduction in post-brief clarification requests"
  ],
  risks: [
    "AI outputs may feel generic if inputs are too thin.",
    "Too much structure could make teams feel boxed in.",
    "Users may expect full document export and collaboration earlier than V1 supports."
  ],
  assumptions: [
    "Teams value premium presentation enough to switch from docs.",
    "A readiness score and interpretation analysis will meaningfully improve trust in the brief.",
    "Marketers want strategic assistance without surrendering authorial control."
  ]
};

export const uxStrategy = {
  mainJourney: [
    "Arrive from landing page and understand the product in under a minute.",
    "Start from a template or blank brief.",
    "Move through guided steps with AI assistance and real-time recommendations.",
    "Generate ideas and interpretation insights once core strategy is present.",
    "Refine weak spots and finalize into a polished shareable brief."
  ],
  onboarding:
    "Lightweight onboarding asks role, company, and typical campaign type, then presents templates and one active draft to reduce blank-page anxiety.",
  briefCreation:
    "A progressive multi-step flow groups inputs into Strategy, Creator Fit, Creative Direction, Logistics, and Final Polish. Each step combines concise prompts, examples, and AI feedback.",
  ideaGeneration:
    "After campaign essentials are completed, users can generate hooks, scene ideas, POVs, and alternative creator routes tuned to tone and platform.",
  testing:
    "The analyzer reflects the brief back through a creator lens, highlighting vagueness, restrictive language, likely misreads, and missing production detail.",
  finalization:
    "Users review the final score, preview the brief in a presentation-ready format, then export or share a link.",
  dashboard:
    "The home workspace emphasizes recency, campaign health, and elegant access to drafts, templates, and final briefs."
};

export const informationArchitecture = [
  {
    title: "Marketing Site",
    items: ["Landing", "Product story", "Feature highlights", "Pricing placeholder", "CTA to dashboard"]
  },
  {
    title: "Auth",
    items: ["Sign in", "Create account", "Magic link / SSO placeholder"]
  },
  {
    title: "Workspace",
    items: ["Dashboard", "Saved briefs", "Projects by brand", "Template library"]
  },
  {
    title: "Builder",
    items: ["Step sidebar", "Guided input canvas", "AI recommendations panel", "Idea generator", "Interpretation analyzer"]
  },
  {
    title: "Output",
    items: ["Final brief preview", "Presentation mode", "Share link", "PDF export placeholder"]
  },
  {
    title: "Account",
    items: ["Profile", "Brand settings", "Team placeholder", "AI preferences placeholder"]
  }
];

export const pageSpecs = [
  {
    page: "Landing Page",
    goal: "Establish product positioning and premium trust quickly.",
    sections: ["Editorial hero", "Benefits grid", "Feature story", "Product philosophy", "Primary CTA"],
    primaryCta: "Start a brief",
    secondaryCta: "View dashboard",
    premiumNote:
      "Use generous whitespace, rich headline typography, layered panels, and calm warm neutrals so the product feels expensive before any interaction."
  },
  {
    page: "Dashboard",
    goal: "Give users an elegant command center for active work and template entry points.",
    sections: ["Welcome header", "Quick actions", "Recent briefs", "Readiness highlights", "Template row"],
    primaryCta: "New brief",
    secondaryCta: "Open template gallery",
    premiumNote:
      "The dashboard should feel curated rather than data-dense: light cards, quiet metrics, and a refined sense of order."
  },
  {
    page: "Template Gallery",
    goal: "Reduce blank-page friction with strategic starting points.",
    sections: ["Category filters", "Featured templates", "Template cards", "Preview cues"],
    primaryCta: "Use template",
    secondaryCta: "Start blank",
    premiumNote:
      "Templates should read like crafted creative frameworks, not commodity cards."
  },
  {
    page: "Brief Builder",
    goal: "Guide users through creating a strong influencer brief with progressive clarity.",
    sections: ["Sticky step navigation", "Input modules", "AI side panel", "Smart prompts", "Progress footer"],
    primaryCta: "Continue",
    secondaryCta: "Save draft",
    premiumNote:
      "Inputs should feel editorial and calm; smart prompts should feel like strategic nudges rather than chat bubbles."
  },
  {
    page: "Idea Generator",
    goal: "Translate campaign strategy into creator-ready hooks and concepts.",
    sections: ["Generation controls", "Hook cards", "Angle matrix", "Story routes"],
    primaryCta: "Regenerate ideas",
    secondaryCta: "Add to brief",
    premiumNote:
      "Generated outputs should feel collectible and elegant, like insight cards a strategist would keep."
  },
  {
    page: "Interpretation Analyzer",
    goal: "Reveal how creators may read the brief and where alignment could break.",
    sections: ["Strength score", "Clarity findings", "Potential misreads", "Collaborative tone check"],
    primaryCta: "Apply fixes",
    secondaryCta: "Preview final brief",
    premiumNote:
      "Feedback should feel observant and constructive, never scolding."
  },
  {
    page: "Final Brief Preview",
    goal: "Present the brief in a polished format ready to share.",
    sections: ["Header summary", "Strategic overview", "Creative direction", "Logistics", "Export actions"],
    primaryCta: "Share brief",
    secondaryCta: "Export PDF",
    premiumNote:
      "The page should look close to a designed document: airy, beautifully typeset, and calm enough for client-facing use."
  }
];

export const designSystem = {
  visual:
    "Modern editorial SaaS with warm neutral surfaces, deep ink typography, desaturated green accents, and soft terracotta highlights.",
  layout:
    "12-column desktop grid, strong max-width containers, asymmetric feature compositions, and sticky support panels where useful.",
  spacing:
    "Base spacing system of 4, 8, 12, 16, 24, 32, 48, 64, and 96 with deliberate breathing room between modules.",
  typography:
    "Use a high-contrast display face for product storytelling and a crisp sans-serif for interface copy. Headlines should feel composed, not loud.",
  colors:
    "Canvas beige, ivory cards, charcoal text, eucalyptus green primary accent, muted clay highlight, and soft olive tint backgrounds.",
  components:
    "Rounded cards with quiet shadows, pill controls, outlined inputs with warm hover states, and iconography that feels precise and lightweight.",
  motion:
    "Subtle reveal, panel slide, and hover lifts under 220ms. Motion should increase polish without calling attention to itself.",
  aiStyling:
    "AI outputs should live in softly tinted panels with clear labels, score chips, and concise actions that feel like strategist annotations."
};

export const coreComponents = [
  "Step progress sidebar",
  "Smart prompt cards",
  "AI recommendation cards",
  "Quality score meter",
  "Interpretation insight panel",
  "Hook generator cards",
  "Reference and inspiration module",
  "Final brief content blocks",
  "Template cards",
  "Save state indicators"
];

export const copyStrategy = {
  voice:
    "Clear, polished, concise, and creative-industry fluent. The product should sound strategic without sounding corporate or clinical.",
  samples: [
    "Onboarding: Tell us what kind of campaign you are shaping, and we will set up a stronger starting point.",
    "Empty state: Start with a blank brief or choose a template crafted around how creators actually work.",
    "AI recommendation: This section is directionally strong, but creators may need a clearer cue on how visible the CTA should be.",
    "Warning state: The visual direction is inspiring, though a few details may feel too open to interpretation.",
    "Success: Your brief is now clear, creator-friendly, and ready to share.",
    "Export: Generate a clean share link or prepare a presentation-style version."
  ]
};

export const technicalArchitecture = {
  frontend:
    "Next.js App Router with React, TypeScript, Tailwind CSS, and a small library of composable primitives. Use server components for static shells and client components for interactive builder modules.",
  backend:
    "Supabase for auth, Postgres data, row-level security, storage for exports, and edge functions for AI orchestration.",
  modules: [
    "app/(marketing) and app/(workspace) route groups",
    "components/marketing, components/workspace, and components/shared",
    "data/ for seed templates and placeholder insight payloads",
    "lib/ai for prompt builders and response mappers",
    "lib/db for typed data access"
  ],
  dataModel: [
    "brands",
    "users",
    "projects",
    "briefs",
    "brief_versions",
    "templates",
    "brief_scores",
    "ai_generations",
    "share_links"
  ],
  apiNeeds: [
    "POST /api/briefs",
    "PATCH /api/briefs/:id",
    "POST /api/briefs/:id/analyze",
    "POST /api/briefs/:id/generate-hooks",
    "POST /api/briefs/:id/export",
    "POST /api/share-links"
  ],
  aiTouchpoints:
    "Section rewriting, gap detection, hook generation, interpretation analysis, score generation, and creator-friendly rephrasing all run through composable prompt templates with stored outputs for auditability.",
  export:
    "V1 can support polished web preview and print stylesheet export. Later add PDF rendering via headless Chromium or React PDF."
};

export const v1BuildPlan = [
  "Establish premium brand direction and app shell first.",
  "Ship marketing page, dashboard, template gallery, and builder navigation as the visible core.",
  "Mock AI outputs with realistic placeholder data while keeping the architecture ready for live generation.",
  "Keep save/export/auth flows visually real but functionally lightweight in the first version.",
  "Invest time in typography, spacing, surfaces, and transitions so the prototype already feels fundable."
];

export const landingFeatures = [
  {
    icon: Brain,
    title: "Strategic brief guidance",
    text: "Surface missing context, sharpen objectives, and improve phrasing while you build."
  },
  {
    icon: Lightbulb,
    title: "Hooks and concept routes",
    text: "Generate creator-ready opening lines, storytelling paths, and angle variations."
  },
  {
    icon: Eye,
    title: "Influencer interpretation analysis",
    text: "See where a creator may misunderstand the ask or feel boxed in."
  },
  {
    icon: FileText,
    title: "Polished final brief",
    text: "Turn campaign strategy into a beautiful, shareable brief that feels ready to send."
  }
];

export const productHighlights = [
  {
    title: "Guide without over-scripting",
    description:
      "Balance clarity and creative freedom with coaching that helps teams phrase direction more collaboratively."
  },
  {
    title: "Pressure-test the ask",
    description:
      "Preview likely creator interpretation before the brief leaves your team, reducing avoidable friction."
  },
  {
    title: "Make the output presentation-ready",
    description:
      "From dashboard to final brief, every surface is designed to feel elegant, calm, and premium."
  }
];

export const dashboardStats = [
  { label: "Active briefs", value: "14", detail: "+3 this week" },
  { label: "Avg readiness", value: "84", detail: "Across current drafts" },
  { label: "Templates used", value: "9", detail: "Most popular: UGC Launch" }
];

export const briefs = [
  {
    title: "Solstice Serum Launch",
    brand: "Aster & Co.",
    status: "In review",
    readiness: 91,
    updated: "12 min ago",
    summary: "Strong strategic framing with minor CTA ambiguity."
  },
  {
    title: "Back To Campus Creator Push",
    brand: "Northline",
    status: "Draft",
    readiness: 76,
    updated: "2 hours ago",
    summary: "Great tone and audience details, missing clearer usage rights."
  },
  {
    title: "Pulse App Momentum Brief",
    brand: "Pulse",
    status: "Shared",
    readiness: 88,
    updated: "Yesterday",
    summary: "Balanced, creator-friendly brief with crisp deliverables."
  }
];

export const templates = [
  {
    title: "Product Launch",
    description: "For hero SKUs, feature education, and creator first impressions.",
    tags: ["Conversion", "TikTok", "UGC"],
    tone: "Sharp launch energy"
  },
  {
    title: "Back-to-School Campaign",
    description: "Structured for lifestyle storytelling, routines, and shopping seasonality.",
    tags: ["Seasonal", "Lifestyle", "Instagram"],
    tone: "Fresh, relatable, daily-use"
  },
  {
    title: "App Promotion",
    description: "Ideal for demo-driven creators, feature education, and conversion proof.",
    tags: ["Demo", "YouTube Shorts", "Paid usage"],
    tone: "Clean, utility-led"
  },
  {
    title: "UGC Brief",
    description: "Designed for native-looking creator content with flexible brand cues.",
    tags: ["UGC", "Whitelisting", "Meta"],
    tone: "Natural, creator-first"
  },
  {
    title: "Awareness Campaign",
    description: "For top-of-funnel reach with memorability and brand lift in mind.",
    tags: ["Reach", "Storytelling", "Brand"],
    tone: "Distinctive and broad"
  },
  {
    title: "Giveaway Campaign",
    description: "Built around urgency, participation mechanics, and clear CTA delivery.",
    tags: ["Activation", "Community", "CTA"],
    tone: "Energetic but simple"
  }
];

export const builderSteps = [
  "Campaign basics",
  "Audience & creator fit",
  "Messaging & deliverables",
  "Creative direction",
  "Logistics & rights",
  "Review"
];

export const builderFields = [
  {
    section: "Campaign basics",
    items: [
      {
        label: "Campaign name",
        value: "Solstice Serum Spring Push",
        hint: "A clean internal and external title for the brief."
      },
      {
        label: "Objective",
        value: "Drive high-intent consideration among skincare-curious women aged 24-34.",
        hint: "Focus on one primary outcome."
      },
      {
        label: "Key message",
        value: "Visible glow can come from barrier support, not harsh actives.",
        hint: "Keep it memorable and creator-friendly."
      }
    ]
  },
  {
    section: "Audience & creator fit",
    items: [
      {
        label: "Audience",
        value: "Beauty-aware consumers seeking gentle but effective routines.",
        hint: "Who should feel spoken to?"
      },
      {
        label: "Creator type",
        value: "Trusted skincare educators with polished but intimate routines.",
        hint: "Describe style, trust signal, and audience fit."
      }
    ]
  },
  {
    section: "Creative direction",
    items: [
      {
        label: "Tone / vibe",
        value: "Calm confidence, elevated bathroom shelf energy, real skin over perfection.",
        hint: "Use emotional and visual cues."
      },
      {
        label: "Visual direction",
        value: "Soft natural light, vanity textures, tight product moments, morning-routine pacing.",
        hint: "Offer cues, not storyboards."
      },
      {
        label: "Do's and don'ts",
        value: "Do show texture and routine context. Avoid clinical before/after framing or exaggerated claims.",
        hint: "Protect the brand without suffocating the creator."
      }
    ]
  }
];

export const aiRecommendations = [
  {
    title: "Clarify the CTA format",
    body: "Consider specifying whether the CTA should be spoken, on-screen, or both. Creators may prioritize one and omit the other.",
    type: "Gap"
  },
  {
    title: "Loosen one visual instruction",
    body: "The brief is directionally strong, but the visual guidance may feel slightly constrained. You could frame it as an invitation rather than a requirement.",
    type: "Tone"
  },
  {
    title: "Strengthen deliverable context",
    body: "Add whether the asset should feel like a routine diary, a recommendation, or a product test. That will help creators choose the right narrative shape.",
    type: "Strategy"
  }
];

export const hooks = [
  "I stopped chasing stronger actives and my skin actually looks better.",
  "If your glow routine feels too aggressive, this is the switch I would make.",
  "This is what my barrier-first skincare looks like on a real weekday morning.",
  "One serum changed how I layer my routine without making it feel complicated.",
  "Not every skincare result has to come from irritation."
];

export const ideas = [
  {
    title: "Routine Reveal",
    summary: "Open on a calm morning shelf shot and frame the product as the step that simplified the routine."
  },
  {
    title: "Texture Close-Up",
    summary: "Use tight tactile shots and narration that emphasizes comfort, finish, and daily use."
  },
  {
    title: "Myth Reframe",
    summary: "Challenge the belief that more aggressive ingredients always equal better skin."
  }
];

export const interpretationInsights = [
  {
    title: "What feels clear",
    text: "Creators will likely understand the emotional tone, brand aesthetic, and desired audience quickly."
  },
  {
    title: "What may be vague",
    text: "The difference between 'natural product integration' and 'visible product demonstration' could still be interpreted in several ways."
  },
  {
    title: "Where a creator may feel constrained",
    text: "The visual direction is strong, but some creators may read it as a preferred shot list unless you soften the phrasing."
  },
  {
    title: "What they may prioritize",
    text: "Expect creators to anchor on the barrier-support message and de-emphasize approval requirements unless those are made more prominent."
  }
];

export const scoreBreakdown = [
  { label: "Clarity", score: 90 },
  { label: "Strategic completeness", score: 82 },
  { label: "Creator-friendliness", score: 78 },
  { label: "Creative inspiration", score: 86 },
  { label: "Specificity", score: 84 },
  { label: "Flexibility", score: 73 }
];

export const finalBriefSections = [
  {
    title: "Campaign Summary",
    content:
      "Solstice Serum Spring Push introduces a barrier-first skincare story designed for creators who can translate efficacy into calm, intimate routine content."
  },
  {
    title: "The Ask",
    content:
      "Create one 30-45 second short-form video that shows how the serum fits naturally into a gentle glow-focused routine, with a clear product moment and a light conversion CTA."
  },
  {
    title: "Creative Direction",
    content:
      "Keep the content soft, premium, and human. Prioritize natural light, tactile product texture, and grounded narration over scripted claims."
  },
  {
    title: "Guardrails",
    content:
      "Avoid medical framing, avoid before/after promises, and avoid language that makes the routine feel over-engineered or inaccessible."
  }
];

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Layers3 },
  { label: "Templates", href: "/templates", icon: BookOpen },
  { label: "Builder", href: "/builder", icon: PenTool },
  { label: "Preview", href: "/preview", icon: FileText }
];

export const heroMetrics = [
  { label: "Faster brief creation", value: "3.2x" },
  { label: "Avg clarity lift", value: "+27%" },
  { label: "Ready-to-share output", value: "1 view" }
];

export const ctaLinks = [
  { label: "Start a brief", href: "/dashboard", icon: ArrowRight },
  { label: "Explore templates", href: "/templates", icon: BadgeCheck }
];

export const featureStrip = [
  { label: "Guided Builder", icon: Target },
  { label: "AI Brief Assistant", icon: WandSparkles },
  { label: "Hook Generator", icon: Sparkles },
  { label: "Interpretation Lens", icon: MessageSquareQuote },
  { label: "Final Brief Output", icon: CheckCircle2 },
  { label: "Workspace Templates", icon: BriefcaseBusiness },
  { label: "Readiness Score", icon: Aperture }
];

export const marketingFlow = [
  {
    step: "01",
    title: "Shape the ask",
    text: "Start from a campaign template or a blank brief, then fill in the brand, objective, creator fit, and creative direction."
  },
  {
    step: "02",
    title: "Pressure-test the brief",
    text: "See where creators may need more clarity, where the direction feels too rigid, and what details are still open to interpretation."
  },
  {
    step: "03",
    title: "Share something polished",
    text: "Turn the final brief into a clean, presentation-ready page that feels thoughtful enough to send as-is."
  }
];

export const landingTemplatePreview = [
  {
    title: "Product Launch",
    description: "Feature education, first impressions, and a crisp conversion story.",
    tags: ["TikTok", "UGC", "Conversion"]
  },
  {
    title: "UGC Campaign",
    description: "Creator-first direction with enough structure to keep the brand ask clear.",
    tags: ["Meta", "Whitelisting", "Native feel"]
  },
  {
    title: "Seasonal Push",
    description: "Perfect for back-to-school, holiday, or routine-based campaign moments.",
    tags: ["Seasonal", "Instagram", "Lifestyle"]
  }
];

export const landingInsightCards = [
  {
    label: "Likely clear",
    text: "Creators will understand the emotional tone, audience, and hero product story quickly."
  },
  {
    label: "Likely ambiguous",
    text: "Natural integration could mean a subtle mention or a clear in-use demo unless you define the expectation."
  },
  {
    label: "Flexibility to protect",
    text: "The visual direction is strong, but it will land better if it feels like inspiration rather than a shot list."
  }
];

export const landingHookExamples = [
  "POV: The one school-night routine that finally feels easy",
  "3 things I'd never skip when using this app with my kids",
  "A realistic morning routine with one less thing to think about",
  "How I'd explain this product to another teacher in 15 seconds"
];

export const footerLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Templates", href: "/templates" },
  { label: "Builder", href: "/builder" },
  { label: "Preview", href: "/preview" }
];
