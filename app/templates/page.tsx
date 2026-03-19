import { AppShell } from "@/components/layout/app-shell";
import { TemplateGallery } from "@/components/workspace/template-gallery";
import { getTemplates } from "@/lib/workspace-data";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <AppShell>
      <TemplateGallery templates={templates} />
    </AppShell>
  );
}
