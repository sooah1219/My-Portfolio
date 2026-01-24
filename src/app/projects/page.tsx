import ProjectsList from "@/components/ProjectsList";
import { getProjects } from "@/lib/projects";

export const runtime = "nodejs";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full">
        <ProjectsList projects={projects} />
      </div>
    </section>
  );
}
