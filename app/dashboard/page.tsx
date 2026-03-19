import { AppShell } from "@/components/layout/app-shell";
import { DashboardOverview } from "@/components/workspace/dashboard-overview";
import { getDashboardData } from "@/lib/workspace-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <AppShell>
      <DashboardOverview
        briefs={data.briefs}
        templates={data.templates}
        stats={data.stats}
      />
    </AppShell>
  );
}
