import {
  briefs as fallbackBriefs,
  finalBriefSections as fallbackFinalSections,
  templates as fallbackTemplates
} from "@/data/product-content";
import { query } from "@/lib/db";
import { hasDatabase } from "@/lib/env";
import type { BriefSection, BriefSummary, FeaturedBrief, TemplateRecord } from "@/lib/types";

type DbTemplate = {
  title: string;
  description: string;
  tone: string;
  tags: string[] | null;
  category: string | null;
};

type DbBrief = {
  id: string;
  title: string;
  brand: string;
  status: string;
  readiness: number;
  summary: string;
  updated_at: string;
};

type DbFeaturedBrief = {
  title: string;
  brand: string;
  readiness: number;
  summary: string;
  deliverables: string[] | null;
  usage_rights: string;
  final_sections: BriefSection[] | null;
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(new Date(dateValue));
}

export async function getTemplates(): Promise<TemplateRecord[]> {
  if (!hasDatabase) {
    return fallbackTemplates;
  }

  try {
    const rows = await query<DbTemplate>(
      `select title, description, tone, tags, category
       from templates
       order by sort_order asc, created_at asc`
    );

    if (!rows.length) {
      return fallbackTemplates;
    }

    return rows.map((row) => ({
      title: row.title,
      description: row.description,
      tone: row.tone,
      tags: row.tags ?? [],
      category: row.category ?? undefined
    }));
  } catch {
    return fallbackTemplates;
  }
}

export async function getBriefSummaries(): Promise<BriefSummary[]> {
  if (!hasDatabase) {
    return fallbackBriefs;
  }

  try {
    const rows = await query<DbBrief>(
      `select id, title, brand, status, readiness, summary, updated_at
       from briefs
       order by updated_at desc
       limit 6`
    );

    if (!rows.length) {
      return fallbackBriefs;
    }

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      brand: row.brand,
      status: row.status,
      readiness: row.readiness,
      summary: row.summary,
      updated: formatDate(row.updated_at)
    }));
  } catch {
    return fallbackBriefs;
  }
}

export async function getFeaturedBrief(): Promise<FeaturedBrief> {
  if (!hasDatabase) {
    return {
      title: "Solstice Serum Spring Push",
      brand: "Aster & Co.",
      readiness: 84,
      summary:
        "A brief designed to help creators translate a barrier-first skincare story into premium-feeling short-form content with clarity and room for interpretation.",
      deliverables: [
        "1 x short-form video, 30-45 seconds",
        "Clear product visibility in use",
        "On-screen CTA with optional spoken reinforcement"
      ],
      usageRights:
        "90-day paid usage across paid social, plus brand organic reposting and whitelisting pending creator approval.",
      finalSections: fallbackFinalSections
    };
  }

  try {
    const rows = await query<DbFeaturedBrief>(
      `select title, brand, readiness, summary, deliverables, usage_rights, final_sections
       from briefs
       order by updated_at desc
       limit 1`
    );

    const row = rows[0];

    if (!row) {
      throw new Error("No brief found");
    }

    return {
      title: row.title,
      brand: row.brand,
      readiness: row.readiness,
      summary: row.summary,
      deliverables: row.deliverables ?? [],
      usageRights: row.usage_rights,
      finalSections: row.final_sections?.length ? row.final_sections : fallbackFinalSections
    };
  } catch {
    return {
      title: "Solstice Serum Spring Push",
      brand: "Aster & Co.",
      readiness: 84,
      summary:
        "A brief designed to help creators translate a barrier-first skincare story into premium-feeling short-form content with clarity and room for interpretation.",
      deliverables: [
        "1 x short-form video, 30-45 seconds",
        "Clear product visibility in use",
        "On-screen CTA with optional spoken reinforcement"
      ],
      usageRights:
        "90-day paid usage across paid social, plus brand organic reposting and whitelisting pending creator approval.",
      finalSections: fallbackFinalSections
    };
  }
}

export async function getDashboardData() {
  const [briefs, templates] = await Promise.all([getBriefSummaries(), getTemplates()]);

  const averageReadiness =
    briefs.length > 0
      ? Math.round(briefs.reduce((sum, brief) => sum + brief.readiness, 0) / briefs.length)
      : 0;

  return {
    briefs,
    templates,
    stats: [
      {
        label: "Active briefs",
        value: String(briefs.length),
        detail: "Live workspace count"
      },
      {
        label: "Avg readiness",
        value: String(averageReadiness),
        detail: "Across current drafts"
      },
      {
        label: "Templates used",
        value: String(templates.length),
        detail: "Available starting points"
      }
    ]
  };
}
