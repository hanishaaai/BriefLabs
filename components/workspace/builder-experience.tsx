"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import {
  aiRecommendations,
  finalBriefSections,
  hooks,
  ideas,
  interpretationInsights,
  scoreBreakdown
} from "@/data/product-content";
import type {
  BuilderFormValues,
  GeneratedBriefIntelligence
} from "@/lib/types";

const FORM_STORAGE_KEY = "lumia-brief-form";
const GENERATED_STORAGE_KEY = "lumia-brief-generated";

const initialForm: BuilderFormValues = {
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
    title: initialForm.campaignName,
    brand: initialForm.brandName,
    readiness: 84,
    summary:
      "A brief designed to help creators translate a barrier-first skincare story into premium-feeling short-form content with clarity and room for interpretation.",
    deliverables: [
      "1 x short-form video, 30-45 seconds",
      "3 x supporting story frames",
      "Clear product visibility in use"
    ],
    usageRights: initialForm.usageRights,
    finalSections: finalBriefSections
  }
};

const sections: Array<{
  title: string;
  description: string;
  fields: Array<{
    key: keyof BuilderFormValues;
    label: string;
    hint: string;
    multiline?: boolean;
  }>;
}> = [
  {
    title: "Campaign basics",
    description: "Set the brief foundation with the campaign, brand, product, and objective.",
    fields: [
      {
        key: "campaignName",
        label: "Campaign name",
        hint: "A clean internal and external title."
      },
      {
        key: "brandName",
        label: "Brand name",
        hint: "The company or brand running the campaign."
      },
      {
        key: "productService",
        label: "Product or service",
        hint: "What the creator is actually speaking about."
      },
      {
        key: "objective",
        label: "Primary objective",
        hint: "One clear campaign outcome.",
        multiline: true
      }
    ]
  },
  {
    title: "Audience & creator fit",
    description: "Define who the campaign is for and what kind of creator should carry it.",
    fields: [
      {
        key: "audience",
        label: "Audience",
        hint: "Who should feel spoken to?",
        multiline: true
      },
      {
        key: "platforms",
        label: "Platforms",
        hint: "TikTok, Instagram, YouTube Shorts, or a mix."
      },
      {
        key: "creatorProfile",
        label: "Creator profile",
        hint: "Style, trust signal, audience fit, and tone.",
        multiline: true
      }
    ]
  },
  {
    title: "Messaging & deliverables",
    description: "Clarify the brand message, what must be included, and what gets delivered.",
    fields: [
      {
        key: "keyMessage",
        label: "Key message",
        hint: "The main idea you want a creator to land.",
        multiline: true
      },
      {
        key: "mandatoryTalkingPoints",
        label: "Mandatory talking points",
        hint: "Key product truths or points that must appear.",
        multiline: true
      },
      {
        key: "deliverables",
        label: "Deliverables",
        hint: "Formats, counts, and rough lengths.",
        multiline: true
      },
      {
        key: "cta",
        label: "CTA",
        hint: "What should the audience do next?",
        multiline: true
      }
    ]
  },
  {
    title: "Creative direction",
    description: "Guide the tone and creative direction without over-scripting the output.",
    fields: [
      {
        key: "toneVibe",
        label: "Tone and vibe",
        hint: "How the content should feel.",
        multiline: true
      },
      {
        key: "visualDirection",
        label: "Visual direction",
        hint: "Lighting, pacing, framing, or styling cues.",
        multiline: true
      },
      {
        key: "contentDos",
        label: "Content do's",
        hint: "Helpful guardrails or strong encouragements.",
        multiline: true
      },
      {
        key: "contentDonts",
        label: "Content don'ts",
        hint: "What should be avoided.",
        multiline: true
      },
      {
        key: "inspirationExamples",
        label: "Inspiration examples",
        hint: "References, styles, or content patterns to emulate.",
        multiline: true
      }
    ]
  },
  {
    title: "Logistics & rights",
    description: "Capture the operational details creators and internal teams need.",
    fields: [
      {
        key: "deadlines",
        label: "Deadlines",
        hint: "Drafts, posting dates, or review timing.",
        multiline: true
      },
      {
        key: "approvalRequirements",
        label: "Approval requirements",
        hint: "What needs sign-off before posting.",
        multiline: true
      },
      {
        key: "usageRights",
        label: "Usage rights",
        hint: "Whitelisting, paid usage, reposting, or licensing.",
        multiline: true
      },
      {
        key: "compensationNotes",
        label: "Compensation notes",
        hint: "Optional notes on package or partner fit.",
        multiline: true
      },
      {
        key: "referenceLinks",
        label: "Reference links",
        hint: "Product pages, decks, or useful URLs.",
        multiline: true
      }
    ]
  },
  {
    title: "Review",
    description: "Add anything extra, then generate the AI brief pass from the context above.",
    fields: [
      {
        key: "additionalNotes",
        label: "Additional notes",
        hint: "Anything else a creator or strategist should know.",
        multiline: true
      }
    ]
  }
];

export function BuilderExperience() {
  const [activeSection, setActiveSection] = useState(0);
  const [form, setForm] = useState<BuilderFormValues>(initialForm);
  const [generated, setGenerated] =
    useState<GeneratedBriefIntelligence>(initialGenerated);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedForm = window.localStorage.getItem(FORM_STORAGE_KEY);
    const storedGenerated = window.localStorage.getItem(GENERATED_STORAGE_KEY);

    if (storedForm) {
      try {
        setForm(JSON.parse(storedForm) as BuilderFormValues);
      } catch {
        window.localStorage.removeItem(FORM_STORAGE_KEY);
      }
    }

    if (storedGenerated) {
      try {
        setGenerated(JSON.parse(storedGenerated) as GeneratedBriefIntelligence);
      } catch {
        window.localStorage.removeItem(GENERATED_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const filledCount = Object.values(form).filter((value) => value.trim().length > 0).length;
  const progress = Math.round((filledCount / Object.keys(form).length) * 100);
  const currentSection = sections[activeSection];

  function updateField(key: keyof BuilderFormValues, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function handleGenerate() {
    setError(null);

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

        setGenerated(payload);
        window.localStorage.setItem(
          GENERATED_STORAGE_KEY,
          JSON.stringify(payload)
        );
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
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-12 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
            New brief
          </div>
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Build a brief that feels clear before it ever reaches a creator.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-ink/64">
            Fill in the campaign details, then generate recommendations, hooks,
            interpretation insights, and a polished final brief using the context
            you provide.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/preview"
            className="inline-flex items-center justify-center rounded-full border border-line bg-white/80 px-5 py-3 text-sm font-medium text-ink transition hover:bg-white"
          >
            Open preview
          </Link>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent/95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Generating..." : "Generate AI brief"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_360px]">
        <aside className="xl:sticky xl:top-28 xl:h-fit">
          <div className="rounded-[2rem] border border-line bg-panel p-5 shadow-card">
            <div className="text-sm text-ink/50">Progress</div>
            <div className="mt-2 font-display text-2xl text-ink">{progress}% complete</div>
            <div className="mt-6 space-y-3">
              {sections.map((section, index) => (
                <button
                  key={section.title}
                  type="button"
                  onClick={() => setActiveSection(index)}
                  className={`w-full rounded-[1.2rem] border px-4 py-3 text-left text-sm transition ${
                    index === activeSection
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-line bg-white/72 text-ink/58 hover:bg-white"
                  }`}
                >
                  <span className="mr-2 text-xs text-ink/42">{`0${index + 1}`}</span>
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
                  Current step
                </div>
                <h2 className="mt-2 text-2xl font-medium text-ink">
                  {currentSection.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/60">
                  {currentSection.description}
                </p>
              </div>
              <div className="rounded-full bg-white/80 px-3 py-1 text-sm text-ink/55">
                Auto-saved locally
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {currentSection.fields.map((field) => (
                <FieldCard
                  key={field.key}
                  label={field.label}
                  hint={field.hint}
                  value={form[field.key]}
                  multiline={field.multiline}
                  onChange={(value) => updateField(field.key, value)}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setActiveSection((current) => Math.max(0, current - 1))
                }
                className="rounded-full border border-line bg-white/80 px-4 py-2 text-sm text-ink transition hover:bg-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveSection((current) =>
                    Math.min(sections.length - 1, current + 1)
                  )
                }
                className="rounded-full border border-line bg-white/80 px-4 py-2 text-sm text-ink transition hover:bg-white"
              >
                Next
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
                  Hook + idea generator
                </div>
                <h2 className="mt-2 text-2xl font-medium text-ink">
                  Creator-ready hooks, angles, and concept starters
                </h2>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isPending}
                className="rounded-full border border-line bg-white/80 px-4 py-2 text-sm text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? "Refreshing..." : "Refresh ideas"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-line bg-white/82 p-5">
                <div className="text-sm text-ink/48">Suggested hooks</div>
                <div className="mt-4 space-y-3">
                  {generated.hooks.map((hook) => (
                    <div
                      key={hook}
                      className="rounded-[1.1rem] border border-line bg-mist px-4 py-3 text-sm leading-7 text-ink/74"
                    >
                      {hook}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {generated.ideas.map((idea) => (
                  <div
                    key={idea.title}
                    className="rounded-[1.5rem] border border-line bg-white/82 p-5"
                  >
                    <div className="text-lg font-medium text-ink">{idea.title}</div>
                    <p className="mt-2 text-sm leading-7 text-ink/62">{idea.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-line bg-accent/95 p-6 text-white shadow-card lg:p-8">
            <div className="text-xs tracking-[0.18em] text-white/58 uppercase">
              Influencer interpretation
            </div>
            <h2 className="mt-3 font-display text-3xl">How a creator may read this brief</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {generated.interpretationInsights.map((insight) => (
                <div
                  key={insight.title}
                  className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5"
                >
                  <div className="text-sm font-medium text-white">{insight.title}</div>
                  <p className="mt-2 text-sm leading-7 text-white/76">{insight.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
                  Final brief draft
                </div>
                <h2 className="mt-2 text-2xl font-medium text-ink">
                  Presentation-ready brief output
                </h2>
              </div>
              <Link
                href="/preview"
                className="rounded-full border border-line bg-white/80 px-4 py-2 text-sm text-ink transition hover:bg-white"
              >
                Open full preview
              </Link>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-line bg-white/85 p-6">
              <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
                {generated.finalBrief.brand}
              </div>
              <h3 className="mt-2 font-display text-3xl text-ink">
                {generated.finalBrief.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-ink/64">
                {generated.finalBrief.summary}
              </p>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:h-fit">
          <div className="rounded-[2rem] border border-line bg-panel p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-ink/50">AI assistant</div>
                <div className="mt-2 text-xl font-medium text-ink">
                  Suggestions based on your fields
                </div>
              </div>
              <div className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">
                {generated.recommendations.length} live
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-[1.4rem] border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
                {error}
              </div>
            ) : null}

            <div className="mt-5 rounded-[1.4rem] border border-line bg-mist p-4 text-sm leading-7 text-ink/70">
              {generated.summary}
            </div>

            <div className="mt-4 space-y-4">
              {generated.recommendations.map((item) => (
                <div
                  key={`${item.title}-${item.type}`}
                  className="rounded-[1.4rem] border border-line bg-white/86 p-4"
                >
                  <div className="text-xs tracking-[0.16em] text-ink/42 uppercase">
                    {item.type}
                  </div>
                  <div className="mt-2 text-base font-medium text-ink">{item.title}</div>
                  <p className="mt-2 text-sm leading-7 text-ink/64">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-line bg-panel p-5 shadow-card">
            <div className="text-sm text-ink/50">Brief strength score</div>
            <div className="mt-2 font-display text-4xl text-ink">
              {generated.finalBrief.readiness}
            </div>
            <div className="mt-5 space-y-4">
              {generated.scoreBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-ink/58">
                    <span>{item.label}</span>
                    <span>{item.score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-mist">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FieldCard({
  label,
  hint,
  value,
  multiline,
  onChange
}: {
  label: string;
  hint: string;
  value: string;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[1.4rem] border border-line bg-white/85 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink">{label}</label>
        <span className="text-xs text-ink/46">{hint}</span>
      </div>

      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="mt-3 w-full resize-none rounded-[1.1rem] border border-line bg-mist px-4 py-4 text-sm leading-7 text-ink outline-none transition focus:border-accent focus:bg-white"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-3 w-full rounded-[1.1rem] border border-line bg-mist px-4 py-4 text-sm text-ink outline-none transition focus:border-accent focus:bg-white"
        />
      )}
    </div>
  );
}
