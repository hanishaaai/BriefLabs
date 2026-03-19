import { AppShell } from "@/components/layout/app-shell";
import { FinalBriefPreview } from "@/components/workspace/final-brief-preview";
import { getFeaturedBrief } from "@/lib/workspace-data";

export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  const brief = await getFeaturedBrief();

  return (
    <AppShell>
      <FinalBriefPreview brief={brief} />
    </AppShell>
  );
}
