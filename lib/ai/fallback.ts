import type {
  AiRecommendation,
  BuilderFormValues,
  FeaturedBrief,
  GeneratedBriefIntelligence,
  IdeaCard,
  InterpretationInsight,
  ScoreBreakdownItem
} from "@/lib/types";

function splitItems(value: string) {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function firstPhrase(value: string, fallback: string) {
  const cleaned = value.trim();
  if (!cleaned) {
    return fallback;
  }

  const sentence = cleaned.split(/[.!?]/)[0]?.trim();
  return sentence && sentence.length > 0 ? sentence : cleaned;
}

function buildRecommendations(fields: BuilderFormValues): AiRecommendation[] {
  const recommendations: AiRecommendation[] = [];

  if (!fields.cta.trim()) {
    recommendations.push({
      title: "Add a clearer CTA",
      body: "Creators will need a more specific action to land the brief cleanly, especially if the content needs to drive measurable traffic or conversion.",
      type: "Messaging"
    });
  } else {
    recommendations.push({
      title: "Tighten the CTA delivery",
      body: `Your CTA is directionally clear, but consider clarifying whether "${firstPhrase(
        fields.cta,
        "the CTA"
      )}" should be spoken, shown on screen, or both.`,
      type: "Messaging"
    });
  }

  if (!fields.visualDirection.trim()) {
    recommendations.push({
      title: "Add visual guidance",
      body: "A short note on framing, pacing, or environment would help creators picture the content without making the brief feel prescriptive.",
      type: "Creative"
    });
  } else {
    recommendations.push({
      title: "Leave room inside the visual direction",
      body: "The aesthetic direction is useful, though it may land better if framed as inspiration rather than an implicit shot list.",
      type: "Creative"
    });
  }

  if (!fields.mandatoryTalkingPoints.trim()) {
    recommendations.push({
      title: "Clarify what must be said",
      body: "Add two or three non-negotiable talking points so the creator knows what cannot be skipped.",
      type: "Clarity"
    });
  } else {
    recommendations.push({
      title: "Prioritize the talking points",
      body: "Consider ranking the mandatory points by importance so creators know what matters most if the edit needs to stay tight.",
      type: "Clarity"
    });
  }

  if (!fields.usageRights.trim() || !fields.approvalRequirements.trim()) {
    recommendations.push({
      title: "Round out the logistics",
      body: "Usage rights and approval timing still need to be explicit so creators know how the content will be reviewed and reused.",
      type: "Logistics"
    });
  } else {
    recommendations.push({
      title: "Surface the operational details earlier",
      body: "Approval requirements and usage rights are present, but moving them closer to the deliverables can reduce creator confusion later.",
      type: "Logistics"
    });
  }

  return recommendations.slice(0, 4);
}

function buildHooks(fields: BuilderFormValues) {
  const product = firstPhrase(fields.productService, "this product");
  const audience = firstPhrase(fields.audience, "people like me");
  const message = firstPhrase(fields.keyMessage, "this changed the routine");
  const objective = firstPhrase(fields.objective, "this is worth paying attention to");

  return [
    `POV: the ${product} switch that made my routine feel simpler`,
    `If you're one of those ${audience}, this is the first thing I'd want to know`,
    `The 15-second version of why ${message.toLowerCase()}`,
    `A more realistic routine built around ${product}`,
    `Why I'd describe this campaign as ${objective.toLowerCase()}`
  ];
}

function buildIdeas(fields: BuilderFormValues): IdeaCard[] {
  const product = firstPhrase(fields.productService, "the product");
  const vibe = firstPhrase(fields.toneVibe, "calm and grounded");
  const creator = firstPhrase(fields.creatorProfile, "a trusted creator");

  return [
    {
      title: "Routine-first walkthrough",
      summary: `Open inside a believable daily moment and let ${creator.toLowerCase()} show how ${product} fits into the routine without over-explaining it.`
    },
    {
      title: "Quick recommendation format",
      summary: `Frame the content like a concise recommendation to a friend, using the ${vibe.toLowerCase()} tone to keep the brief feeling premium and natural.`
    },
    {
      title: "Problem to payoff arc",
      summary: "Start with the tension the audience already feels, then show how the product or service reduces friction in a way that feels immediate and lived-in."
    }
  ];
}

function buildInsights(fields: BuilderFormValues): InterpretationInsight[] {
  return [
    {
      title: "Likely clear",
      text: `Creators should understand the core ask around ${firstPhrase(
        fields.productService,
        "the product"
      )}, the campaign objective, and the intended audience fairly quickly.`
    },
    {
      title: "Likely ambiguous",
      text: fields.cta.trim()
        ? "The CTA exists, but creators may still interpret the expected visibility differently unless you specify whether it should be verbal, on-screen, or both."
        : "The audience action is not specific enough yet, so creators may default to a soft mention instead of a clear closing ask."
    },
    {
      title: "Where creators may want flexibility",
      text: fields.visualDirection.trim()
        ? "The visual direction is useful, though some creators may want a little more room to adapt the format to their own filming style."
        : "Without visual guidance, creators will likely default to their usual format, which may or may not match the brand tone."
    },
    {
      title: "How to improve alignment",
      text: "Make the non-negotiables easier to scan, soften any overly specific style notes, and clarify the exact success signal for the piece."
    }
  ];
}

function buildScoreBreakdown(fields: BuilderFormValues): ScoreBreakdownItem[] {
  const completeness = [
    fields.objective,
    fields.audience,
    fields.creatorProfile,
    fields.keyMessage,
    fields.deliverables,
    fields.cta,
    fields.visualDirection,
    fields.usageRights
  ].filter((value) => value.trim().length > 0).length;

  const base = 62 + completeness * 4;

  return [
    { label: "Clarity", score: Math.min(94, base + 4) },
    { label: "Strategic completeness", score: Math.min(92, base) },
    { label: "Creator-friendliness", score: Math.min(90, base - 2) },
    { label: "Creative inspiration", score: Math.min(93, base + 2) },
    { label: "Specificity", score: Math.min(91, base - 1) },
    { label: "Flexibility", score: Math.min(88, base - 4) }
  ];
}

function buildFinalBrief(fields: BuilderFormValues): FeaturedBrief {
  const deliverables = splitItems(fields.deliverables);
  const product = firstPhrase(fields.productService, "the product");

  return {
    title: fields.campaignName || "Generated brief",
    brand: fields.brandName || "Brand",
    readiness:
      Math.round(
        buildScoreBreakdown(fields).reduce((sum, item) => sum + item.score, 0) / 6
      ) || 78,
    summary: `A polished creator brief for ${product} built around ${firstPhrase(
      fields.objective,
      "a clear campaign outcome"
    ).toLowerCase()}.`,
    deliverables:
      deliverables.length > 0
        ? deliverables
        : ["1 x short-form video", "Clear product integration", "Defined CTA moment"],
    usageRights:
      fields.usageRights ||
      "Usage rights still need to be confirmed before this brief is shared externally.",
    finalSections: [
      {
        title: "Campaign Summary",
        content: `${fields.brandName || "The brand"} is launching a creator brief for ${
          fields.productService || "the featured product"
        } focused on ${firstPhrase(fields.objective, "driving campaign response").toLowerCase()}.`
      },
      {
        title: "The Ask",
        content: `Create content for ${fields.platforms || "the chosen platforms"} that speaks to ${
          fields.audience || "the intended audience"
        } and lands the key message: ${firstPhrase(fields.keyMessage, "the product matters")}.`
      },
      {
        title: "Creative Direction",
        content: `The content should feel ${firstPhrase(
          fields.toneVibe,
          "clear and creator-friendly"
        ).toLowerCase()}, using visual cues like ${
          fields.visualDirection || "simple, natural creator storytelling"
        }.`
      },
      {
        title: "Guardrails",
        content: `Keep the brief aligned with these boundaries: ${
          fields.contentDonts || "avoid over-scripted or misleading framing"
        }. Include these must-have points where relevant: ${
          fields.mandatoryTalkingPoints || "core campaign messaging still needs to be finalized"
        }.`
      }
    ]
  };
}

export function buildFallbackBriefIntelligence(
  fields: BuilderFormValues,
  reason?: string
): GeneratedBriefIntelligence {
  const finalBrief = buildFinalBrief(fields);

  return {
    summary: reason
      ? `Live generation is temporarily unavailable, so Lumia Brief created a fast strategist-style draft from the campaign fields you entered.`
      : `Lumia Brief created a fast strategist-style draft from the campaign fields you entered.`,
    recommendations: buildRecommendations(fields),
    hooks: buildHooks(fields),
    ideas: buildIdeas(fields),
    interpretationInsights: buildInsights(fields),
    scoreBreakdown: buildScoreBreakdown(fields),
    finalBrief
  };
}
