export type TemplateRecord = {
  title: string;
  description: string;
  tone: string;
  tags: string[];
  category?: string;
};

export type BriefSummary = {
  id?: string;
  title: string;
  brand: string;
  status: string;
  readiness: number;
  updated: string;
  summary: string;
};

export type BriefSection = {
  title: string;
  content: string;
};

export type BuilderFormValues = {
  campaignName: string;
  brandName: string;
  productService: string;
  objective: string;
  audience: string;
  platforms: string;
  creatorProfile: string;
  keyMessage: string;
  mandatoryTalkingPoints: string;
  deliverables: string;
  toneVibe: string;
  visualDirection: string;
  contentDos: string;
  contentDonts: string;
  cta: string;
  deadlines: string;
  approvalRequirements: string;
  usageRights: string;
  compensationNotes: string;
  referenceLinks: string;
  inspirationExamples: string;
  additionalNotes: string;
};

export type AiRecommendation = {
  title: string;
  body: string;
  type: string;
};

export type IdeaCard = {
  title: string;
  summary: string;
};

export type InterpretationInsight = {
  title: string;
  text: string;
};

export type ScoreBreakdownItem = {
  label: string;
  score: number;
};

export type FeaturedBrief = {
  title: string;
  brand: string;
  readiness: number;
  summary: string;
  deliverables: string[];
  usageRights: string;
  finalSections: BriefSection[];
};

export type GeneratedBriefIntelligence = {
  summary: string;
  recommendations: AiRecommendation[];
  hooks: string[];
  ideas: IdeaCard[];
  interpretationInsights: InterpretationInsight[];
  scoreBreakdown: ScoreBreakdownItem[];
  finalBrief: FeaturedBrief;
};
