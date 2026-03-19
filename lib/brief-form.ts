import type { BuilderFormValues } from "@/lib/types";

export const EMPTY_BUILDER_FORM: BuilderFormValues = {
  campaignName: "",
  brandName: "",
  productService: "",
  objective: "",
  audience: "",
  platforms: "",
  creatorProfile: "",
  keyMessage: "",
  mandatoryTalkingPoints: "",
  deliverables: "",
  toneVibe: "",
  visualDirection: "",
  contentDos: "",
  contentDonts: "",
  cta: "",
  deadlines: "",
  approvalRequirements: "",
  usageRights: "",
  compensationNotes: "",
  referenceLinks: "",
  inspirationExamples: "",
  additionalNotes: ""
};

export function normalizeBuilderFormValues(
  input: Partial<BuilderFormValues> | null | undefined
): BuilderFormValues {
  return {
    ...EMPTY_BUILDER_FORM,
    ...input
  };
}
