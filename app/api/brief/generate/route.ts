import { NextResponse } from "next/server";

import { buildFallbackBriefIntelligence } from "@/lib/ai/fallback";
import { generateBriefIntelligence } from "@/lib/ai/openrouter";
import type { BuilderFormValues } from "@/lib/types";

export async function POST(request: Request) {
  let fields: Partial<BuilderFormValues> | null = null;

  try {
    fields = (await request.json()) as Partial<BuilderFormValues>;

    if (!fields.campaignName || !fields.brandName || !fields.objective) {
      return NextResponse.json(
        {
          error:
            "Campaign name, brand name, and objective are required before generating."
        },
        { status: 400 }
      );
    }

    const intelligence = await generateBriefIntelligence(fields as BuilderFormValues);

    return NextResponse.json(intelligence);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Brief generation failed.";

    if (fields?.campaignName && fields?.brandName && fields?.objective) {
      const fallback = buildFallbackBriefIntelligence(
        fields as BuilderFormValues,
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
