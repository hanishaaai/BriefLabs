import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeader } from "@/components/workspace/section-header";
import type { BriefSummary, TemplateRecord } from "@/lib/types";

type DashboardOverviewProps = {
  briefs: BriefSummary[];
  templates: TemplateRecord[];
  stats: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export function DashboardOverview({
  briefs,
  templates,
  stats
}: DashboardOverviewProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-12 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Workspace"
          title="Create campaign briefs with elegance and clarity."
          description="Track active drafts, jump into templates, and keep campaign strategy moving in one premium workspace."
        />
        <div className="flex gap-3">
          <ButtonLink href="/templates" variant="secondary">
            Browse templates
          </ButtonLink>
          <ButtonLink href="/builder">New brief</ButtonLink>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[1.75rem] border border-line bg-white/72 p-6 shadow-soft"
          >
            <div className="text-sm text-ink/52">{stat.label}</div>
            <div className="mt-3 font-display text-4xl text-ink">{stat.value}</div>
            <div className="mt-2 text-sm text-ink/58">{stat.detail}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-ink/50">Recent briefs</div>
              <h2 className="mt-2 text-2xl font-medium text-ink">Current campaign work</h2>
            </div>
            <ButtonLink href="/preview" variant="ghost">
              Open final preview
            </ButtonLink>
          </div>
          <div className="space-y-4">
            {briefs.map((brief) => (
              <div
                key={brief.title}
                className="rounded-[1.5rem] border border-line bg-white/80 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs tracking-[0.16em] text-ink/42 uppercase">
                      {brief.brand}
                    </div>
                    <div className="mt-1 text-lg font-medium text-ink">{brief.title}</div>
                  </div>
                  <div className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">
                    {brief.readiness}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/64">{brief.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-ink/46">
                  <span>{brief.status}</span>
                  <span>{brief.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-line bg-accent/95 p-6 text-white shadow-card lg:p-8">
            <div className="text-sm text-white/68">Suggested next move</div>
            <h3 className="mt-3 font-display text-3xl leading-tight">
              Refine your top brief before export.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/82">
              The Solstice Serum brief is almost ready. Clarify CTA formatting and soften one
              visual instruction to improve creator freedom.
            </p>
            <ButtonLink
              href="/builder"
              variant="secondary"
              className="mt-6 border-white/20 bg-white/12 text-white hover:bg-white/18"
            >
              Continue brief
            </ButtonLink>
          </div>

          <div className="rounded-[2rem] border border-line bg-panel p-6 shadow-card lg:p-8">
            <div className="text-sm text-ink/50">Recommended templates</div>
            <div className="mt-5 space-y-3">
              {templates.slice(0, 3).map((template) => (
                <div
                  key={template.title}
                  className="rounded-[1.4rem] border border-line bg-white/85 p-4"
                >
                  <div className="text-base font-medium text-ink">{template.title}</div>
                  <div className="mt-1 text-sm text-ink/56">{template.tone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
