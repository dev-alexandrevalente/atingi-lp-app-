import { HeroAtingiTest } from "@/components/sections/HeroAtingiTest";
import { FeaturesTabs } from "@/components/sections/FeaturesTabs";

export const metadata = {
  title: "Atingi | Teste Design System",
  description: "Teste da nova interface",
};

export default function AtingiTestePage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <HeroAtingiTest />
      <FeaturesTabs />
    </main>
  );
}
