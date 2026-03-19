import { env, hasOpenRouter } from "@/lib/env";
import type {
  BuilderFormValues,
  GeneratedBriefIntelligence,
  IdeaCard,
  InterpretationInsight,
  ScoreBreakdownItem
} from "@/lib/types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

function compactFields(fields: BuilderFormValues) {
  return Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value.trim()}`)
    .join("\n");
}

function extractJson(content: string) {
  const trimmed = content.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");

    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
  }

  throw new Error("The model did not return valid JSON.");
}

function toContentString(
  content: string | Array<{ type?: string; text?: string }> | undefined
) {
  if (!content) {
    return "";
  }

  if (typeof content === "string") {
    return content;
  }

  return content
    .map((part) => part.text ?? "")
    .join("")
    .trim();
}

function normalizeList<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function normalizeScoreBreakdown(value: unknown): ScoreBreakdownItem[] {
  return normalizeList<ScoreBreakdownItem>(value, []).map((item) => ({
    label: item.label,
    score: Math.max(0, Math.min(100, Number(item.score) || 0))
  }));
}

function normalizeIdeas(value: unknown): IdeaCard[] {
  return normalizeList<IdeaCard>(value, []).map((idea) => ({
    title: idea.title,
    summary: idea.summary
  }));
}

function normalizeInsights(value: unknown): InterpretationInsight[] {
  return normalizeList<InterpretationInsight>(value, []).map((insight) => ({
    title: insight.title,
    text: insight.text
  }));
}

export async function generateBriefIntelligence(
  fields: BuilderFormValues
): Promise<GeneratedBriefIntelligence> {
  if (!hasOpenRouter || !env.openrouterApiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const prompt = `
You are a senior influencer creative strategist helping a brand create a better brief.

Use the campaign context below to generate sharp, practical, creator-aware output.
Keep the tone premium, concise, and useful. Avoid generic filler.

Campaign context:
${compactFields(fields)}

Return only valid JSON with this exact shape:
{
  "summary": "string",
  "recommendations": [
    {"title": "string", "body": "string", "type": "Clarity | Messaging | Creative | Logistics"}
  ],
  "hooks": ["string"],
  "ideas": [
    {"title": "string", "summary": "string"}
  ],
  "interpretationInsights": [
    {"title": "string", "text": "string"}
  ],
  "scoreBreakdown": [
    {"label": "Clarity | Strategic completeness | Creator-friendliness | Creative inspiration | Specificity | Flexibility", "score": 0}
  ],
  "finalBrief": {
    "title": "string",
    "brand": "string",
    "readiness": 0,
    "summary": "string",
    "deliverables": ["string"],
    "usageRights": "string",
    "finalSections": [
      {"title": "Campaign Summary | The Ask | Creative Direction | Guardrails", "content": "string"}
    ]
  }
}

Requirements:
- Write 4 recommendations.
- Write 5 hooks.
- Write 3 idea cards.
- Write 4 interpretation insights.
- Write 6 score items.
- Write 4 final brief sections.
- Make recommendations specific to the provided inputs.
- If a field is missing, call that out constructively.
`.trim();

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openrouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://brieflabs.vercel.app",
      "X-Title": "Lumia Brief"
    },
    body: JSON.stringify({
      model: env.openrouterModel,
      response_format: {
        type: "json_object"
      },
      messages: [
        {
          role: "system",
          content:
            "You generate creator-brief strategy output for brands. Return clean JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const payload = (await response.json()) as OpenRouterResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "OpenRouter request failed.");
  }

  const content = toContentString(payload.choices?.[0]?.message?.content);
  const parsed = extractJson(content) as GeneratedBriefIntelligence;

  return {
    summary: parsed.summary,
    recommendations: normalizeList(parsed.recommendations, []),
    hooks: normalizeList(parsed.hooks, []),
    ideas: normalizeIdeas(parsed.ideas),
    interpretationInsights: normalizeInsights(parsed.interpretationInsights),
    scoreBreakdown: normalizeScoreBreakdown(parsed.scoreBreakdown),
    finalBrief: {
      title: parsed.finalBrief?.title ?? fields.campaignName || "Generated brief",
      brand: parsed.finalBrief?.brand ?? fields.brandName || "Brand",
      readiness: Math.max(
        0,
        Math.min(100, Number(parsed.finalBrief?.readiness) || 0)
      ),
      summary: parsed.finalBrief?.summary ?? parsed.summary,
      deliverables: normalizeList(parsed.finalBrief?.deliverables, []),
      usageRights: parsed.finalBrief?.usageRights ?? fields.usageRights,
      finalSections: normalizeList(parsed.finalBrief?.finalSections, [])
    }
  };
}
