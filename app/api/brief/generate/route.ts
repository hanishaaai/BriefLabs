import { NextResponse } from "next/server";

import { buildFallbackBriefIntelligence } from "@/lib/ai/fallback";
import { normalizeBuilderFormValues } from "@/lib/brief-form";
import { generateBriefIntelligence } from "@/lib/ai/openrouter";
import { env } from "@/lib/env";
import type { BuilderFormValues } from "@/lib/types";

export async function POST(request: Request) {
  let fields: BuilderFormValues | null = null;

  try {
    fields = normalizeBuilderFormValues(
      (await request.json()) as Partial<BuilderFormValues>
    );

    if (!fields.campaignName || !fields.brandName || !fields.objective) {
      return NextResponse.json(
        {
          error:
            "Campaign name, brand name, and objective are required before generating."
        },
        { status: 400 }
      );
    }

    if (env.openrouterModel === "openrouter/free") {
      const fallback = buildFallbackBriefIntelligence(
        fields,
        "OpenRouter free is currently running in reliability mode."
      );

      return NextResponse.json(fallback, {
        headers: {
          "x-lumia-fallback": "true"
        }
      });
    }

    const intelligence = await generateBriefIntelligence(fields);

    return NextResponse.json(intelligence);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Brief generation failed.";

    if (fields?.campaignName && fields?.brandName && fields?.objective) {
      const fallback = buildFallbackBriefIntelligence(
        normalizeBuilderFormValues(fields),
        message
      );

      return NextResponse.json(fallback, {
        headers: {
          "x-lumia-fallback": "true"
        }
      });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
