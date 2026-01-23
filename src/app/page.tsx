import GitHubCalendar from "@/components/GithubCalendar";
import MyHero from "@/components/MyHero";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <main className="flex flex-col min-h-screen">
        <MyHero />
        <ProjectsSection />
        <GitHubCalendar />
      </main>
    </div>
  );
}
