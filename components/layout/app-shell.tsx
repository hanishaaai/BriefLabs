import { TopNav } from "@/components/layout/top-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
