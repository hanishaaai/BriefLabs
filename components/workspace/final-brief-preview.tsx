"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeader } from "@/components/workspace/section-header";
import type { FeaturedBrief } from "@/lib/types";

type FinalBriefPreviewProps = {
  brief: FeaturedBrief;
};

const GENERATED_STORAGE_KEY = "lumia-brief-generated";

export function FinalBriefPreview({ brief }: FinalBriefPreviewProps) {
  const [currentBrief, setCurrentBrief] = useState(brief);

  useEffect(() => {
    const stored = window.localStorage.getItem(GENERATED_STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { finalBrief?: FeaturedBrief };

      if (parsed.finalBrief?.title) {
        setCurrentBrief(parsed.finalBrief);
      }
    } catch {
      window.localStorage.removeItem(GENERATED_STORAGE_KEY);
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Final brief"
          title="A polished output that feels ready to send."
          description="The final view is intentionally presentation-like: clean, airy, and easy for creators, agencies, and stakeholders to understand at a glance."
        />
        <div className="flex gap-3">
          <ButtonLink href="/builder" variant="secondary">
            Edit brief
          </ButtonLink>
          <ButtonLink href="/preview">Share brief</ButtonLink>
        </div>
      </div>

      <section className="rounded-[2.4rem] border border-line bg-panel p-8 shadow-card lg:p-12">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs tracking-[0.22em] text-ink/40 uppercase">{`${currentBrief.brand} x Creator Campaign`}</div>
            <h2 className="mt-3 font-display text-5xl leading-tight text-ink">
              {currentBrief.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink/62">
              {currentBrief.summary}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-line bg-white/85 p-5">
            <div className="text-sm text-ink/46">Readiness</div>
            <div className="mt-1 font-display text-4xl text-ink">{currentBrief.readiness}</div>
            <div className="mt-2 text-sm text-ink/58">Clear, strategic, and nearly ready</div>
          </div>
        </div>

        <div className="grid gap-6 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            {currentBrief.finalSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.6rem] border border-line bg-white/82 p-6"
              >
                <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                  {section.title}
                </div>
                <p className="mt-3 text-base leading-8 text-ink/72">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.6rem] border border-line bg-mist p-6">
              <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                Deliverables
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
                {currentBrief.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.6rem] border border-line bg-white/85 p-6">
              <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                Usage rights
              </div>
              <p className="mt-4 text-sm leading-7 text-ink/68">{currentBrief.usageRights}</p>
            </div>
            <div className="rounded-[1.6rem] border border-line bg-accent/95 p-6 text-white">
              <div className="text-sm tracking-[0.16em] text-white/60 uppercase">
                Export actions
              </div>
              <div className="mt-4 space-y-3 text-sm text-white/82">
                <div>Generate share link</div>
                <div>Open presentation mode</div>
                <div>Prepare print-optimized export</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
