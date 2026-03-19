import { landingHookExamples, landingInsightCards } from "@/data/product-content";

import { Chip } from "@/components/ui/chip";

export function InsightTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-line bg-accent/95 p-8 text-white shadow-card lg:p-10">
          <Chip className="border-white/16 bg-white/10 text-white/80">
            Brief testing
          </Chip>
          <h2 className="mt-5 max-w-lg font-display text-4xl leading-tight">
            Test the brief before a creator reads it.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/76">
            Lumia Brief helps you catch unclear asks, overly rigid direction, and subtle
            interpretation gaps before they turn into revisions.
          </p>

          <div className="mt-8 grid gap-4">
            {landingInsightCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[1.4rem] border border-white/12 bg-white/10 p-5"
              >
                <div className="text-sm font-medium text-white">{card.label}</div>
                <p className="mt-2 text-sm leading-7 text-white/74">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-line bg-panel p-8 shadow-card lg:p-10">
          <Chip>Hook generator</Chip>
          <h2 className="mt-5 max-w-lg font-display text-4xl leading-tight text-ink">
            Give creators stronger ways into the story.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-ink/66">
            Generate realistic hooks, POVs, and concept starters based on the audience,
            platform, tone, and creator style you are targeting.
          </p>

          <div className="mt-8 space-y-4">
            {landingHookExamples.map((example) => (
              <div
                key={example}
                className="rounded-[1.35rem] border border-line bg-white/82 p-5 text-sm leading-7 text-ink/74 shadow-soft"
              >
                {example}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
