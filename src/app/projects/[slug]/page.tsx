import { ProjectCarousel } from "@/components/project-carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
// todo: add role, type, contributions
type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-4xl w-full space-y-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-[#6D65FF] hover:underline"
        >
          ← Back to projects
        </Link>

        <Card className="overflow-hidden border border-border/70 bg-card/80 shadow-sm">
          <div className="relative">
            <ProjectCarousel images={project.images} title={project.title} />

            <div className="pointer-events-none absolute top-4 right-4 flex gap-2">
              <Badge
                variant={project.platform === "Web" ? "default" : "outline"}
                className="pointer-events-auto text-[10px] uppercase tracking-wide"
              >
                {project.platform}
              </Badge>
            </div>
          </div>

          <CardHeader className="space-y-2">
            <CardTitle className="text-xl font-semibold">
              {project.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {project.developedAt}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-[10px] font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-6">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="inline-flex items-center text-primary hover:text-[#6D65FF] hover:underline"
                >
                  Live demo
                  <span className="ml-1 text-xs">↗</span>
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="inline-flex items-center text-primary hover:text-[#6D65FF] hover:underline"
                >
                  GitHub
                  <span className="ml-1 text-xs">↗</span>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
