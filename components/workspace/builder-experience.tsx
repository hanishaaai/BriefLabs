"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Sparkles,
  WandSparkles
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import {
  aiRecommendations,
  finalBriefSections,
  hooks,
  ideas,
  interpretationInsights,
  scoreBreakdown
} from "@/data/product-content";
import { EMPTY_BUILDER_FORM } from "@/lib/brief-form";
import type {
  BuilderFormValues,
  GeneratedBriefIntelligence
} from "@/lib/types";
import { cn } from "@/lib/utils";

const FORM_STORAGE_KEY = "lumia-brief-form";
const GENERATED_STORAGE_KEY = "lumia-brief-generated";
const ACTIVE_STEP_STORAGE_KEY = "lumia-brief-active-step";
const GENERATED_FROM_STORAGE_KEY = "lumia-brief-generated-from";

const REQUIRED_KEYS: Array<keyof BuilderFormValues> = [
  "campaignName",
  "brandName",
  "objective"
];

const demoForm: BuilderFormValues = {
  campaignName: "Solstice Serum Spring Push",
  brandName: "Aster & Co.",
  productService: "Solstice Serum",
  objective:
    "Drive high-intent consideration among skincare-curious women aged 24-34.",
  audience: "Beauty-aware consumers seeking gentle but effective routines.",
  platforms: "TikTok, Instagram Reels",
  creatorProfile:
    "Trusted skincare educators with polished but intimate routines.",
  keyMessage: "Visible glow can come from barrier support, not harsh actives.",
  mandatoryTalkingPoints:
    "Barrier support, gentle daily use, lightweight feel, easy layering.",
  deliverables: "1 x 30-45 second short-form video, 3 x story frames",
  toneVibe:
    "Calm confidence, elevated bathroom shelf energy, real skin over perfection.",
  visualDirection:
    "Soft natural light, vanity textures, tight product moments, morning-routine pacing.",
  contentDos:
    "Do show texture and routine context. Do make the serum feel naturally part of a real routine.",
  contentDonts:
    "Avoid clinical before/after framing, exaggerated claims, or a scripted ad tone.",
  cta: "Invite viewers to explore Solstice Serum and learn more on site.",
  deadlines: "First draft due April 12, final delivery April 18.",
  approvalRequirements:
    "Brand review required before posting. One revision round included.",
  usageRights:
    "90-day paid usage across paid social, plus brand organic reposting and whitelisting pending creator approval.",
  compensationNotes: "Paid partnership, mid-tier skincare creator budget.",
  referenceLinks: "https://asterco.example/solstice-serum",
  inspirationExamples:
    "Soft routine diaries, close texture shots, grounded recommendation-style narration.",
  additionalNotes:
    "We want the content to feel premium and relaxed, not over-produced."
};

const initialGenerated: GeneratedBriefIntelligence = {
  summary:
    "A strong skincare brief with clear positioning, thoughtful tone, and a few opportunities to make the CTA and creator freedom even clearer.",
  recommendations: aiRecommendations,
  hooks,
  ideas,
  interpretationInsights,
  scoreBreakdown,
  finalBrief: {
    title: demoForm.campaignName,
    brand: demoForm.brandName,
    readiness: 84,
    summary:
      "A brief designed to help creators translate a barrier-first skincare story into premium-feeling short-form content with clarity and room for interpretation.",
    deliverables: [
      "1 x short-form video, 30-45 seconds",
      "3 x supporting story frames",
      "Clear product visibility in use"
    ],
    usageRights: demoForm.usageRights,
    finalSections: finalBriefSections
  }
};

type FlowField = {
  key: keyof BuilderFormValues;
  label: string;
  hint: string;
  placeholder: string;
  multiline?: boolean;
  optional?: boolean;
  suggestions?: string[];
};

type FlowStep = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  whyItMatters: string;
  fields: FlowField[];
};

type StepStats = {
  answered: number;
  total: number;
  ready: boolean;
  complete: boolean;
};

const SNAPSHOT_FIELDS: Array<{
  label: string;
  key: keyof BuilderFormValues;
}> = [
  { label: "Campaign", key: "campaignName" },
  { label: "Brand", key: "brandName" },
  { label: "Objective", key: "objective" },
  { label: "Audience", key: "audience" },
  { label: "Creator fit", key: "creatorProfile" },
  { label: "Tone", key: "toneVibe" }
];

const flowSteps: FlowStep[] = [
  {
    id: "foundation",
    eyebrow: "Scene 01",
    title: "Start with the campaign foundation.",
    description:
      "Anchor the brief with the basic facts first so every later prompt stays specific instead of generic.",
    whyItMatters:
      "This is the context layer the AI and the creator both rely on to understand what the campaign actually is.",
    fields: [
      {
        key: "campaignName",
        label: "Campaign name",
        hint: "A short working title for the brief.",
        placeholder: "Summer reset creator launch",
        suggestions: [
          "Spring hydration reset",
          "Founder-led UGC wave",
          "Holiday gifting creator push"
        ]
      },
      {
        key: "brandName",
        label: "Brand name",
        hint: "Who is running the campaign?",
        placeholder: "Aster & Co."
      },
      {
        key: "productService",
        label: "Product or service",
        hint: "What are creators actually featuring?",
        placeholder: "Solstice Serum"
      }
    ]
  },
  {
    id: "objective",
    eyebrow: "Scene 02",
    title: "Clarify the outcome you want.",
    description:
      "Lead with the business intent, then describe the action you want the audience to take after seeing the content.",
    whyItMatters:
      "Strong objectives make the brief feel strategic, while a clear CTA gives creators an obvious finish line.",
    fields: [
      {
        key: "objective",
        label: "Primary objective",
        hint: "The one outcome that matters most.",
        placeholder:
          "Drive high-intent consideration among skincare-curious women aged 24-34.",
        multiline: true,
        suggestions: [
          "Drive qualified traffic to the landing page.",
          "Build trust with first-time buyers.",
          "Increase product trial intent."
        ]
      },
      {
        key: "cta",
        label: "Call to action",
        hint: "Optional, but helpful for sharper output.",
        placeholder: "Invite viewers to explore the product and learn more on site.",
        multiline: true,
        optional: true
      }
    ]
  },
  {
    id: "audience",
    eyebrow: "Scene 03",
    title: "Define who this should resonate with.",
    description:
      "Describe the audience, where they are most likely to engage, and which kind of creator feels like the right messenger.",
    whyItMatters:
      "This is where the brief starts to feel creator-aware instead of brand-centric.",
    fields: [
      {
        key: "audience",
        label: "Audience",
        hint: "Who should feel like this content is for them?",
        placeholder:
          "Beauty-aware consumers seeking gentle but effective routines.",
        multiline: true
      },
      {
        key: "platforms",
        label: "Platforms",
        hint: "Where will this content live?",
        placeholder: "TikTok, Instagram Reels",
        suggestions: [
          "TikTok",
          "Instagram Reels",
          "TikTok + Instagram Reels",
          "YouTube Shorts"
        ]
      },
      {
        key: "creatorProfile",
        label: "Creator profile",
        hint: "Describe the ideal voice, credibility, or audience fit.",
        placeholder:
          "Trusted skincare educators with polished but intimate routines.",
        multiline: true
      }
    ]
  },
  {
    id: "messaging",
    eyebrow: "Scene 04",
    title: "Shape the core message and deliverables.",
    description:
      "Explain what has to land in the story and what the creator is actually expected to hand back.",
    whyItMatters:
      "This scene protects clarity without over-scripting the creator's execution.",
    fields: [
      {
        key: "keyMessage",
        label: "Key message",
        hint: "What should the audience remember?",
        placeholder:
          "Visible glow can come from barrier support, not harsh actives.",
        multiline: true
      },
      {
        key: "mandatoryTalkingPoints",
        label: "Mandatory talking points",
        hint: "Non-negotiable facts, claims, or product truths.",
        placeholder:
          "Barrier support, gentle daily use, lightweight feel, easy layering.",
        multiline: true
      },
      {
        key: "deliverables",
        label: "Deliverables",
        hint: "Formats, counts, and any rough runtime.",
        placeholder: "1 x 30-45 second short-form video, 3 x story frames",
        multiline: true
      }
    ]
  },
  {
    id: "creative",
    eyebrow: "Scene 05",
    title: "Describe how the content should feel.",
    description:
      "Translate strategy into tone, pacing, visual texture, and any references that make the creative direction easier to interpret.",
    whyItMatters:
      "This is usually where briefs become either inspiring or painfully vague.",
    fields: [
      {
        key: "toneVibe",
        label: "Tone and vibe",
        hint: "How should the content feel when someone watches it?",
        placeholder:
          "Calm confidence, elevated bathroom shelf energy, real skin over perfection.",
        multiline: true
      },
      {
        key: "visualDirection",
        label: "Visual direction",
        hint: "Lighting, pacing, framing, setting, or styling cues.",
        placeholder:
          "Soft natural light, vanity textures, tight product moments, morning-routine pacing.",
        multiline: true
      },
      {
        key: "inspirationExamples",
        label: "Inspiration examples",
        hint: "Optional references, formats, or examples to borrow from.",
        placeholder:
          "Soft routine diaries, close texture shots, grounded recommendation-style narration.",
        multiline: true,
        optional: true
      }
    ]
  },
  {
    id: "guardrails",
    eyebrow: "Scene 06",
    title: "Set the creative guardrails gently.",
    description:
      "Give creators enough boundaries to stay aligned while still leaving room for personal delivery and interpretation.",
    whyItMatters:
      "Good do's and don'ts prevent avoidable revisions without making the brief feel rigid.",
    fields: [
      {
        key: "contentDos",
        label: "Content do's",
        hint: "Helpful moves, angles, or proof points to encourage.",
        placeholder:
          "Show texture and routine context. Make the product feel naturally part of a real routine.",
        multiline: true,
        optional: true
      },
      {
        key: "contentDonts",
        label: "Content don'ts",
        hint: "Things that would make the creative feel off-brand.",
        placeholder:
          "Avoid exaggerated claims, heavy scripts, or clinical before-and-after framing.",
        multiline: true,
        optional: true
      }
    ]
  },
  {
    id: "logistics",
    eyebrow: "Scene 07",
    title: "Capture the operational details.",
    description:
      "Lock in the timeline, approval flow, and rights structure so the brief is usable by internal teams as well as creators.",
    whyItMatters:
      "A beautiful brief still falls apart if logistics are thin or rights are unclear.",
    fields: [
      {
        key: "deadlines",
        label: "Deadlines",
        hint: "Drafts, approvals, posting windows, or launch dates.",
        placeholder: "First draft due April 12, final delivery April 18.",
        multiline: true
      },
      {
        key: "approvalRequirements",
        label: "Approval requirements",
        hint: "What needs to happen before anything goes live?",
        placeholder:
          "Brand review required before posting. One revision round included.",
        multiline: true
      },
      {
        key: "usageRights",
        label: "Usage rights",
        hint: "Paid usage, reposting, whitelisting, licensing, or duration.",
        placeholder:
          "90-day paid usage across paid social, plus brand organic reposting and whitelisting pending creator approval.",
        multiline: true
      }
    ]
  },
  {
    id: "polish",
    eyebrow: "Scene 08",
    title: "Finish with the details that make handoff smoother.",
    description:
      "Add any compensation context, reference links, or final notes that help the brief travel well across teams.",
    whyItMatters:
      "These aren't always mandatory, but they make the final document feel finished and easier to action.",
    fields: [
      {
        key: "compensationNotes",
        label: "Compensation notes",
        hint: "Optional pricing, package, or partner-fit notes.",
        placeholder: "Paid partnership, mid-tier skincare creator budget.",
        multiline: true,
        optional: true
      },
      {
        key: "referenceLinks",
        label: "Reference links",
        hint: "Optional URLs to decks, landing pages, or product pages.",
        placeholder: "https://brand.com/product-page",
        multiline: true,
        optional: true
      },
      {
        key: "additionalNotes",
        label: "Additional notes",
        hint: "Anything else a strategist or creator should know?",
        placeholder:
          "We want the content to feel premium and relaxed, not over-produced.",
        multiline: true,
        optional: true
      }
    ]
  }
];

export function BuilderExperience() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<BuilderFormValues>(EMPTY_BUILDER_FORM);
  const [generated, setGenerated] =
    useState<GeneratedBriefIntelligence>(initialGenerated);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [lastGeneratedDraft, setLastGeneratedDraft] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedForm = window.localStorage.getItem(FORM_STORAGE_KEY);
    const storedGenerated = window.localStorage.getItem(GENERATED_STORAGE_KEY);
    const storedStep = window.localStorage.getItem(ACTIVE_STEP_STORAGE_KEY);
    const storedGeneratedFrom = window.localStorage.getItem(
      GENERATED_FROM_STORAGE_KEY
    );

    let resolvedForm = EMPTY_BUILDER_FORM;

    if (storedForm) {
      try {
        resolvedForm = {
          ...EMPTY_BUILDER_FORM,
          ...(JSON.parse(storedForm) as Partial<BuilderFormValues>)
        };
        setForm(resolvedForm);
      } catch {
        window.localStorage.removeItem(FORM_STORAGE_KEY);
      }
    }

    if (storedGenerated) {
      try {
        setGenerated(JSON.parse(storedGenerated) as GeneratedBriefIntelligence);
        setHasGenerated(true);
      } catch {
        window.localStorage.removeItem(GENERATED_STORAGE_KEY);
        window.localStorage.removeItem(GENERATED_FROM_STORAGE_KEY);
      }
    }

    if (storedGeneratedFrom) {
      setLastGeneratedDraft(storedGeneratedFrom);
    }

    if (storedStep) {
      const parsedStep = Number.parseInt(storedStep, 10);

      if (Number.isFinite(parsedStep)) {
        setActiveStep(Math.max(0, Math.min(flowSteps.length, parsedStep)));
        return;
      }
    }

    setActiveStep(getFirstOpenStep(resolvedForm));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    window.localStorage.setItem(ACTIVE_STEP_STORAGE_KEY, String(activeStep));
  }, [activeStep]);

  const totalFields = Object.keys(form).length;
  const answeredCount = Object.values(form).filter((value) => isFilled(value)).length;
  const completionPercent = Math.round((answeredCount / totalFields) * 100);
  const remainingCount = totalFields - answeredCount;
  const stageCount = flowSteps.length + 1;
  const isReviewStage = activeStep === flowSteps.length;
  const currentStep = isReviewStage ? null : flowSteps[activeStep];
  const currentStats = currentStep ? getStepStats(currentStep, form) : null;
  const completedScenes = flowSteps.filter((step) => getStepStats(step, form).complete)
    .length;
  const essentialsReady = REQUIRED_KEYS.every((key) => isFilled(form[key]));
  const stageProgress = Math.round(((activeStep + 1) / stageCount) * 100);
  const draftSignature = JSON.stringify(form);
  const isGeneratedStale = hasGenerated && lastGeneratedDraft !== draftSignature;
  const nextLabel = activeStep === flowSteps.length - 1 ? "Review brief" : "Continue";

  const sceneEyebrow = isReviewStage ? "Final review" : currentStep?.eyebrow;
  const sceneTitle = isReviewStage
    ? "Review the story before you generate."
    : currentStep?.title;
  const sceneDescription = isReviewStage
    ? "Take one last pass through the intake, edit anything that feels thin, then generate a polished AI brief from the information you captured."
    : currentStep?.description;
  const sceneMeta = isReviewStage
    ? `${answeredCount} of ${totalFields} prompts captured`
    : `${currentStats?.answered ?? 0} of ${currentStats?.total ?? 0} prompts filled`;

  function updateField(key: keyof BuilderFormValues, value: string) {
    setError(null);

    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function goToStep(stepIndex: number) {
    setActiveStep(Math.max(0, Math.min(flowSteps.length, stepIndex)));
  }

  function goForward() {
    if (!currentStep || !getStepStats(currentStep, form).ready) {
      return;
    }

    setActiveStep((current) => Math.min(flowSteps.length, current + 1));
  }

  function goBack() {
    setActiveStep((current) => Math.max(0, current - 1));
  }

  function handleGenerate() {
    setError(null);

    const missingRequiredKey = REQUIRED_KEYS.find((key) => !isFilled(form[key]));

    if (missingRequiredKey) {
      setError(
        "Add a campaign name, brand name, and objective before generating the AI brief."
      );
      setActiveStep(findStepIndexForField(missingRequiredKey));
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/brief/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });

        const payload = (await response.json()) as
          | GeneratedBriefIntelligence
          | { error: string };

        if (!response.ok || "error" in payload) {
          throw new Error(
            "error" in payload ? payload.error : "Brief generation failed."
          );
        }

        const generatedFrom = JSON.stringify(form);

        setGenerated(payload);
        setHasGenerated(true);
        setLastGeneratedDraft(generatedFrom);
        window.localStorage.setItem(
          GENERATED_STORAGE_KEY,
          JSON.stringify(payload)
        );
        window.localStorage.setItem(GENERATED_FROM_STORAGE_KEY, generatedFrom);
      } catch (generationError) {
        setError(
          generationError instanceof Error
            ? generationError.message
            : "Brief generation failed."
        );
      }
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-10">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="rounded-full bg-accent-soft px-3 py-1 text-xs tracking-[0.18em] text-accent uppercase">
              Guided intake
            </div>
            <div className="rounded-full border border-line bg-white/78 px-3 py-1 text-xs text-ink/56">
              Auto-saved locally
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              Shape the brief one thoughtful step at a time.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-ink/64">
              The old builder has been reworked into a Typeform-style flow:
              fewer distractions, one clear scene at a time, and a cleaner handoff
              into review and AI generation once the story feels complete.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {essentialsReady ? (
            <button
              type="button"
              onClick={() => goToStep(flowSteps.length)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/82 px-5 py-3 text-sm font-medium text-ink transition hover:bg-white"
            >
              Review answers
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : null}
          {hasGenerated ? (
            <Link
              href="/preview"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent/95"
            >
              Open preview
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>

      <section className="rounded-[2rem] border border-line bg-panel p-6 shadow-card">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="flex items-center justify-between text-sm text-ink/56">
              <span>{sceneEyebrow}</span>
              <span>{`${activeStep + 1} / ${stageCount} scenes`}</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-mist">
              <div
                className="h-2 rounded-full bg-accent transition-all duration-300"
                style={{ width: `${stageProgress}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink/58">
              <span>{`${completionPercent}% of the brief captured`}</span>
              <span>{`${completedScenes} scenes fully complete`}</span>
              <span>{sceneMeta}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ProgressStat label="Captured" value={String(answeredCount)} />
            <ProgressStat label="Open" value={String(remainingCount)} />
            <ProgressStat
              label="AI state"
              value={
                hasGenerated ? (isGeneratedStale ? "Needs refresh" : "Current") : "Not run"
              }
            />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-[2.4rem] border border-line bg-panel shadow-card">
            <div className="absolute inset-x-0 top-0 h-44 bg-glow opacity-75" />

            <div className="relative border-b border-line px-6 py-6 lg:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
                    {sceneEyebrow}
                  </div>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-ink lg:text-4xl">
                    {sceneTitle}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/62">
                    {sceneDescription}
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-line bg-white/78 px-4 py-3 text-sm text-ink/56">
                  {sceneMeta}
                </div>
              </div>
            </div>

            <div className="relative p-6 lg:p-8">
              <AnimatePresence initial={false} mode="wait">
                {isReviewStage ? (
                  <ReviewStage
                    key="review"
                    form={form}
                    answeredCount={answeredCount}
                    totalFields={totalFields}
                    onEditStep={goToStep}
                    onBack={goBack}
                    onGenerate={handleGenerate}
                    isPending={isPending}
                    essentialsReady={essentialsReady}
                    hasGenerated={hasGenerated}
                    isGeneratedStale={isGeneratedStale}
                  />
                ) : (
                  <motion.div
                    key={currentStep?.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="rounded-[1.7rem] border border-white/10 bg-accent/95 p-5 text-white shadow-soft">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-0.5 h-5 w-5 flex-none text-white/78" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            Why this scene matters
                          </div>
                          <p className="mt-2 text-sm leading-7 text-white/80">
                            {currentStep?.whyItMatters}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {currentStep?.fields.map((field, index) => (
                        <ConversationField
                          key={field.key}
                          field={field}
                          value={form[field.key]}
                          emphasized={index === 0}
                          autoFocus={index === 0}
                          onChange={(value) => updateField(field.key, value)}
                          onSuggestion={(value) => updateField(field.key, value)}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="text-sm text-ink/52">
                        {currentStats?.ready
                          ? "This scene is ready to move on."
                          : "Fill the required prompts in this scene to continue."}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={goBack}
                          disabled={activeStep === 0}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/82 px-4 py-2.5 text-sm text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={goForward}
                          disabled={!currentStats?.ready}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent/95 disabled:cursor-not-allowed disabled:opacity-55"
                        >
                          {nextLabel}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {hasGenerated ? (
            <GeneratedReadout
              generated={generated}
              isPending={isPending}
              isGeneratedStale={isGeneratedStale}
              onGenerate={handleGenerate}
            />
          ) : null}
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:h-fit">
          <FlowNavigator
            activeStep={activeStep}
            form={form}
            onSelectStep={goToStep}
          />

          <BriefSnapshot
            form={form}
            answeredCount={answeredCount}
            completionPercent={completionPercent}
          />

          <AiDraftCard
            error={error}
            generated={generated}
            hasGenerated={hasGenerated}
            isGeneratedStale={isGeneratedStale}
            isPending={isPending}
            essentialsReady={essentialsReady}
            onGenerate={handleGenerate}
          />
        </aside>
      </div>
    </div>
  );
}

function ProgressStat({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.3rem] border border-line bg-white/82 p-4">
      <div className="text-xs tracking-[0.16em] text-ink/42 uppercase">{label}</div>
      <div className="mt-2 text-lg font-medium text-ink">{value}</div>
    </div>
  );
}

function FlowNavigator({
  activeStep,
  form,
  onSelectStep
}: {
  activeStep: number;
  form: BuilderFormValues;
  onSelectStep: (stepIndex: number) => void;
}) {
  return (
    <div className="rounded-[2rem] border border-line bg-panel p-5 shadow-card">
      <div>
        <div className="text-sm text-ink/48">Flow</div>
        <div className="mt-2 text-xl font-medium text-ink">
          A calmer, scene-by-scene intake
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {flowSteps.map((step, index) => {
          const stats = getStepStats(step, form);
          const isActive = activeStep === index;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(index)}
              className={cn(
                "w-full rounded-[1.4rem] border px-4 py-3 text-left transition",
                isActive
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-white/78 hover:bg-white"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {stats.complete ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent" />
                  ) : (
                    <Circle
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-none",
                        isActive ? "text-accent" : "text-ink/28"
                      )}
                    />
                  )}
                  <div>
                    <div className="text-xs tracking-[0.16em] text-ink/40 uppercase">
                      {step.eyebrow}
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink">{step.title}</div>
                  </div>
                </div>

                <div className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink/50">
                  {stats.answered}/{stats.total}
                </div>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onSelectStep(flowSteps.length)}
          className={cn(
            "w-full rounded-[1.4rem] border px-4 py-3 text-left transition",
            activeStep === flowSteps.length
              ? "border-accent bg-accent-soft"
              : "border-line bg-white/78 hover:bg-white"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <WandSparkles className="h-4 w-4 text-accent" />
              <div>
                <div className="text-xs tracking-[0.16em] text-ink/40 uppercase">
                  Final scene
                </div>
                <div className="mt-1 text-sm font-medium text-ink">
                  Review and generate
                </div>
              </div>
            </div>

            <div className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink/50">
              {Math.round(
                (Object.values(form).filter((value) => isFilled(value)).length /
                  Object.keys(form).length) *
                  100
              )}
              %
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function BriefSnapshot({
  form,
  answeredCount,
  completionPercent
}: {
  form: BuilderFormValues;
  answeredCount: number;
  completionPercent: number;
}) {
  return (
    <div className="rounded-[2rem] border border-line bg-panel p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-ink/48">Brief snapshot</div>
          <div className="mt-2 text-xl font-medium text-ink">
            The story taking shape
          </div>
        </div>
        <div className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">
          {completionPercent}%
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {SNAPSHOT_FIELDS.map((item) => (
          <div key={item.key} className="rounded-[1.4rem] border border-line bg-white/82 p-4">
            <div className="text-xs tracking-[0.16em] text-ink/40 uppercase">
              {item.label}
            </div>
            <div className="mt-2 text-sm leading-7 text-ink/72">
              {isFilled(form[item.key]) ? form[item.key] : "Still to be added"}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-line bg-mist p-4 text-sm leading-7 text-ink/66">
        {answeredCount} prompts are already captured. The rest can be completed scene
        by scene and reviewed before anything gets generated.
      </div>
    </div>
  );
}

function AiDraftCard({
  error,
  generated,
  hasGenerated,
  isGeneratedStale,
  isPending,
  essentialsReady,
  onGenerate
}: {
  error: string | null;
  generated: GeneratedBriefIntelligence;
  hasGenerated: boolean;
  isGeneratedStale: boolean;
  isPending: boolean;
  essentialsReady: boolean;
  onGenerate: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-line bg-panel p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white shadow-soft">
          <WandSparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm text-ink/48">AI draft</div>
          <div className="mt-2 text-xl font-medium text-ink">
            Generate only when the intake feels strong
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-[1.4rem] border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 rounded-[1.4rem] border border-line bg-mist p-4 text-sm leading-7 text-ink/66">
        {hasGenerated
          ? generated.summary
          : "Once you generate, the builder will turn your answers into recommendations, hooks, interpretation notes, and a polished final brief."}
      </div>

      {hasGenerated ? (
        <div className="mt-4 rounded-[1.4rem] border border-line bg-white/84 p-4">
          <div className="flex items-center justify-between text-sm text-ink/54">
            <span>Readiness</span>
            <span>{generated.finalBrief.readiness}</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-mist">
            <div
              className="h-2 rounded-full bg-accent transition-all duration-300"
              style={{ width: `${generated.finalBrief.readiness}%` }}
            />
          </div>
          <div className="mt-3 text-sm leading-7 text-ink/62">
            {isGeneratedStale
              ? "You changed the intake after the last run. Refresh the AI brief to sync the newest answers."
              : "The AI output matches the answers currently saved in the flow."}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onGenerate}
        disabled={isPending || !essentialsReady}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent/95 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {isPending
          ? "Generating..."
          : hasGenerated
            ? isGeneratedStale
              ? "Refresh AI brief"
              : "Regenerate AI brief"
            : "Generate AI brief"}
        <ArrowRight className="h-4 w-4" />
      </button>

      {!essentialsReady ? (
        <div className="mt-3 text-xs leading-6 text-ink/48">
          Campaign name, brand name, and objective are needed before generation.
        </div>
      ) : null}
    </div>
  );
}

function ConversationField({
  field,
  value,
  emphasized,
  autoFocus,
  onChange,
  onSuggestion
}: {
  field: FlowField;
  value: string;
  emphasized: boolean;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onSuggestion: (value: string) => void;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.7rem] border border-line bg-white/84 transition focus-within:border-accent focus-within:bg-white focus-within:shadow-soft",
        emphasized ? "p-6 lg:p-7" : "p-5"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <label className={cn("font-medium text-ink", emphasized ? "text-xl" : "text-base")}>
            {field.label}
          </label>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/56">{field.hint}</p>
        </div>

        <div
          className={cn(
            "rounded-full px-3 py-1 text-xs",
            field.optional
              ? "bg-mist text-ink/50"
              : "bg-accent-soft text-accent"
          )}
        >
          {field.optional ? "Optional" : "Required"}
        </div>
      </div>

      {field.multiline ? (
        <textarea
          autoFocus={autoFocus}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={emphasized ? 6 : 4}
          placeholder={field.placeholder}
          className={cn(
            "mt-4 w-full resize-none border-0 bg-transparent p-0 text-ink outline-none placeholder:text-ink/28",
            emphasized ? "text-lg leading-8" : "text-sm leading-7"
          )}
        />
      ) : (
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={cn(
            "mt-4 w-full border-0 bg-transparent p-0 text-ink outline-none placeholder:text-ink/28",
            emphasized ? "text-lg" : "text-sm"
          )}
        />
      )}

      {field.suggestions?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {field.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestion(suggestion)}
              className="rounded-full border border-line bg-mist px-3 py-1.5 text-xs text-ink/62 transition hover:bg-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ReviewStage({
  form,
  answeredCount,
  totalFields,
  onEditStep,
  onBack,
  onGenerate,
  isPending,
  essentialsReady,
  hasGenerated,
  isGeneratedStale
}: {
  form: BuilderFormValues;
  answeredCount: number;
  totalFields: number;
  onEditStep: (stepIndex: number) => void;
  onBack: () => void;
  onGenerate: () => void;
  isPending: boolean;
  essentialsReady: boolean;
  hasGenerated: boolean;
  isGeneratedStale: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="rounded-[1.7rem] border border-white/10 bg-accent/95 p-6 text-white shadow-soft">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 flex-none text-white/78" />
          <div>
            <div className="text-lg font-medium text-white">
              The intake is now arranged like a guided conversation.
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80">
              You captured {answeredCount} of {totalFields} prompts. Review the
              scenes below, jump back to edit anything thin, then generate the
              brief intelligence when it feels ready.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {flowSteps.map((step, index) => {
          const stats = getStepStats(step, form);
          const filledFields = step.fields.filter((field) => isFilled(form[field.key]));
          const missingCount = step.fields.length - filledFields.length;

          return (
            <div
              key={step.id}
              className="rounded-[1.6rem] border border-line bg-white/84 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-xs tracking-[0.16em] text-ink/40 uppercase">
                    {step.eyebrow}
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink/58">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-full px-3 py-1 text-xs",
                      stats.complete
                        ? "bg-accent-soft text-accent"
                        : "bg-mist text-ink/52"
                    )}
                  >
                    {stats.answered}/{stats.total} saved
                  </div>
                  <button
                    type="button"
                    onClick={() => onEditStep(index)}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink transition hover:bg-mist"
                  >
                    Edit scene
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {filledFields.length > 0 ? (
                  filledFields.map((field) => (
                    <div
                      key={field.key}
                      className="rounded-[1.2rem] border border-line bg-mist p-4"
                    >
                      <div className="text-xs tracking-[0.16em] text-ink/40 uppercase">
                        {field.label}
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-ink/72">
                        {form[field.key]}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.2rem] border border-dashed border-line bg-mist p-4 text-sm text-ink/54">
                    Nothing has been added in this scene yet.
                  </div>
                )}
              </div>

              <div className="mt-4 text-xs leading-6 text-ink/46">
                {missingCount > 0
                  ? `${missingCount} prompt${missingCount === 1 ? "" : "s"} still open in this scene.`
                  : "This scene is fully captured."}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-ink/54">
          {hasGenerated
            ? isGeneratedStale
              ? "The AI readout is older than the current answers."
              : "The AI readout already reflects the current answers."
            : "Generate once you feel confident in the information gathered."}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/82 px-4 py-2.5 text-sm text-ink transition hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={onGenerate}
            disabled={isPending || !essentialsReady}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent/95 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isPending
              ? "Generating..."
              : hasGenerated
                ? isGeneratedStale
                  ? "Refresh AI brief"
                  : "Regenerate AI brief"
                : "Generate AI brief"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function GeneratedReadout({
  generated,
  isPending,
  isGeneratedStale,
  onGenerate
}: {
  generated: GeneratedBriefIntelligence;
  isPending: boolean;
  isGeneratedStale: boolean;
  onGenerate: () => void;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
              AI readout
            </div>
            <h2 className="mt-2 text-2xl font-medium text-ink">
              Recommendations, quality signal, and final brief direction
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/60">
              The guided intake now feeds a cleaner downstream review: strategy
              notes, concept starters, creator interpretation, and a polished brief
              preview.
            </p>
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/82 px-4 py-2.5 text-sm text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isPending ? "Refreshing..." : "Refresh readout"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            <div className="rounded-[1.6rem] border border-line bg-white/84 p-5">
              <div className="text-sm text-ink/48">Strategic summary</div>
              <p className="mt-3 text-sm leading-7 text-ink/70">{generated.summary}</p>
            </div>

            {generated.recommendations.map((item) => (
              <div
                key={`${item.title}-${item.type}`}
                className="rounded-[1.6rem] border border-line bg-white/84 p-5"
              >
                <div className="text-xs tracking-[0.16em] text-ink/40 uppercase">
                  {item.type}
                </div>
                <div className="mt-2 text-base font-medium text-ink">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-ink/64">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.6rem] border border-line bg-mist p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-ink/48">Brief strength</div>
                  <div className="mt-2 font-display text-4xl text-ink">
                    {generated.finalBrief.readiness}
                  </div>
                </div>
                <div className="rounded-full bg-white/88 px-3 py-1 text-xs text-ink/52">
                  {isGeneratedStale ? "Out of date" : "Current"}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {generated.scoreBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm text-ink/58">
                      <span>{item.label}</span>
                      <span>{item.score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/88">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-line bg-accent/95 p-5 text-white">
              <div className="text-sm text-white/68">Preview-ready output</div>
              <div className="mt-2 text-lg font-medium text-white">
                {generated.finalBrief.title}
              </div>
              <p className="mt-3 text-sm leading-7 text-white/78">
                {generated.finalBrief.summary}
              </p>
              <Link
                href="/preview"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white"
              >
                Open full preview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-line bg-panel p-6 shadow-card">
          <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
            Hook generator
          </div>
          <h3 className="mt-2 text-2xl font-medium text-ink">
            Creator-ready opening lines
          </h3>

          <div className="mt-5 space-y-3">
            {generated.hooks.map((hook) => (
              <div
                key={hook}
                className="rounded-[1.3rem] border border-line bg-white/82 px-4 py-3 text-sm leading-7 text-ink/72"
              >
                {hook}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-line bg-panel p-6 shadow-card">
          <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
            Idea routes
          </div>
          <h3 className="mt-2 text-2xl font-medium text-ink">
            Concepts that match the brief
          </h3>

          <div className="mt-5 space-y-4">
            {generated.ideas.map((idea) => (
              <div
                key={idea.title}
                className="rounded-[1.4rem] border border-line bg-white/82 p-5"
              >
                <div className="text-lg font-medium text-ink">{idea.title}</div>
                <p className="mt-2 text-sm leading-7 text-ink/64">{idea.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-line bg-accent/95 p-6 text-white shadow-card lg:p-8">
        <div className="text-xs tracking-[0.18em] text-white/58 uppercase">
          Creator interpretation
        </div>
        <h3 className="mt-2 font-display text-3xl text-white">
          How the brief may be read on the other side
        </h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {generated.interpretationInsights.map((insight) => (
            <div
              key={insight.title}
              className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5"
            >
              <div className="text-sm font-medium text-white">{insight.title}</div>
              <p className="mt-2 text-sm leading-7 text-white/78">{insight.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
              Final brief draft
            </div>
            <h3 className="mt-2 text-2xl font-medium text-ink">
              Presentation-ready output
            </h3>
          </div>
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/82 px-4 py-2.5 text-sm text-ink transition hover:bg-white"
          >
            Open full preview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 rounded-[1.6rem] border border-line bg-white/84 p-6">
          <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
            {generated.finalBrief.brand}
          </div>
          <h4 className="mt-2 font-display text-3xl text-ink">
            {generated.finalBrief.title}
          </h4>
          <p className="mt-4 text-sm leading-7 text-ink/64">
            {generated.finalBrief.summary}
          </p>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            {generated.finalBrief.finalSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.4rem] border border-line bg-mist p-5"
              >
                <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                  {section.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-ink/68">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.4rem] border border-line bg-white/84 p-5">
              <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                Deliverables
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/68">
                {generated.finalBrief.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.4rem] border border-line bg-white/84 p-5">
              <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                Usage rights
              </div>
              <p className="mt-4 text-sm leading-7 text-ink/68">
                {generated.finalBrief.usageRights}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function isFilled(value: string) {
  return value.trim().length > 0;
}

function getStepStats(step: FlowStep, form: BuilderFormValues): StepStats {
  const answered = step.fields.filter((field) => isFilled(form[field.key])).length;
  const requiredFields = step.fields.filter((field) => !field.optional);

  return {
    answered,
    total: step.fields.length,
    ready: requiredFields.every((field) => isFilled(form[field.key])),
    complete: answered === step.fields.length
  };
}

function getFirstOpenStep(form: BuilderFormValues) {
  const firstIncompleteStep = flowSteps.findIndex(
    (step) => !getStepStats(step, form).complete
  );

  return firstIncompleteStep === -1 ? flowSteps.length : firstIncompleteStep;
}

function findStepIndexForField(key: keyof BuilderFormValues) {
  const stepIndex = flowSteps.findIndex((step) =>
    step.fields.some((field) => field.key === key)
  );

  return stepIndex === -1 ? 0 : stepIndex;
}
