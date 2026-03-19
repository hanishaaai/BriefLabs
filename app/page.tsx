import { AppShell } from "@/components/layout/app-shell";
import { MarketingFooter } from "@/components/marketing/footer";
import { FeatureSections } from "@/components/marketing/feature-sections";
import { HeroSection } from "@/components/marketing/hero-section";
import { InsightTeaser } from "@/components/marketing/insight-teaser";
import { TemplateShowcase } from "@/components/marketing/template-showcase";

export default function HomePage() {
  return (
    <AppShell>
      <HeroSection />
      <FeatureSections />
      <TemplateShowcase />
      <InsightTeaser />
      <MarketingFooter />
    </AppShell>
  );
}
