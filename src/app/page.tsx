import MyHero from "@/components/MyHero";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex flex-col min-h-screen">
        <MyHero />
        <ProjectsSection />
      </main>
    </div>
  );
}
