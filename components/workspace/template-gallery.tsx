import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeader } from "@/components/workspace/section-header";
import type { TemplateRecord } from "@/lib/types";

type TemplateGalleryProps = {
  templates: TemplateRecord[];
};

export function TemplateGallery({ templates }: TemplateGalleryProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-12 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Template library"
          title="Start from templates made for real creator campaigns."
          description="Choose a polished starting point for product launches, UGC, awareness pushes, app installs, seasonal moments, and more."
        />
        <ButtonLink href="/builder">Start blank</ButtonLink>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-ink/58">
        {["All", "Launch", "UGC", "Awareness", "Seasonal", "Conversion"].map((filter) => (
          <div
            key={filter}
            className="rounded-full border border-line bg-white/76 px-4 py-2 shadow-soft"
          >
            {filter}
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.title}
            className="rounded-[1.9rem] border border-line bg-panel p-6 shadow-card"
          >
            <div className="text-xs tracking-[0.18em] text-ink/42 uppercase">
              {template.tone}
            </div>
            <h3 className="mt-3 text-2xl font-medium text-ink">{template.title}</h3>
            <p className="mt-4 text-sm leading-7 text-ink/64">{template.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-soft px-3 py-1.5 text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-ink/48">Ready in under 5 minutes</span>
              <ButtonLink href="/builder" variant="secondary">
                Use template
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
