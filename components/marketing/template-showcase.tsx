import { landingTemplatePreview } from "@/data/product-content";

import { ButtonLink } from "@/components/ui/button-link";
import { Chip } from "@/components/ui/chip";

export function TemplateShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
      <div className="rounded-[2rem] border border-line bg-panel p-8 shadow-card lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Chip>Template library</Chip>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink">
              Start with campaign templates built for how creator teams actually brief.
            </h2>
            <p className="max-w-xl text-base leading-8 text-ink/66">
              Skip the blank doc. Lumia Brief gives you a stronger starting structure for
              launches, UGC campaigns, awareness pushes, app installs, giveaways, and more.
            </p>
          </div>
          <ButtonLink href="/templates" variant="secondary">
            Browse all templates
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {landingTemplatePreview.map((template) => (
            <div
              key={template.title}
              className="rounded-[1.75rem] border border-line bg-white/82 p-6 shadow-soft"
            >
              <div className="text-lg font-medium text-ink">{template.title}</div>
              <p className="mt-3 text-sm leading-7 text-ink/62">{template.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-soft px-3 py-1.5 text-xs text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ButtonLink href="/builder" variant="ghost" className="mt-6 px-0">
                Use template
              </ButtonLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
