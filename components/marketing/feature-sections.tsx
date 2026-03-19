import { Chip } from "@/components/ui/chip";
import { landingFeatures, marketingFlow, productHighlights } from "@/data/product-content";

export function FeatureSections() {
  return (
    <section className="mx-auto max-w-7xl space-y-16 px-6 py-8 lg:px-10 lg:py-16">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {landingFeatures.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-[1.75rem] border border-line bg-white/72 p-6 shadow-soft"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/64">{text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 rounded-[2rem] border border-line bg-panel p-8 shadow-card lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
        <div className="space-y-4">
          <Chip>How it works</Chip>
          <h2 className="max-w-lg font-display text-4xl leading-tight text-ink">
            A smoother path from campaign brief to creator-ready direction.
          </h2>
          <p className="max-w-md text-base leading-8 text-ink/66">
            The workflow is structured enough to keep campaigns aligned, but open enough to
            preserve creator instincts and better ideas.
          </p>
        </div>
        <div className="grid gap-4">
          {marketingFlow.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-line bg-white/80 p-6"
            >
              <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">{item.step}</div>
              <div className="mt-3 text-lg font-medium text-ink">{item.title}</div>
              <p className="mt-2 text-sm leading-7 text-ink/62">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {productHighlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-[1.6rem] border border-line bg-white/76 p-6 shadow-soft"
          >
            <div className="text-lg font-medium text-ink">{highlight.title}</div>
            <p className="mt-3 text-sm leading-7 text-ink/62">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
