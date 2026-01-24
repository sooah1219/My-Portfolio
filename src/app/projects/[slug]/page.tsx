import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: { slug: string };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  const project = result[0];

  if (!project) {
    return notFound();
  }

  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-4xl w-full space-y-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-md text-muted-foreground hover:text-[#6D65FF]"
        >
          <ChevronLeft size={14} /> View all projects
        </Link>

        <Card className="overflow-hidden border bg-card/80 shadow-sm shadow-[0_0_15px_3px_#6D65FF]/30 border-[#6D65FF]">
          <div className="relative">
            <ProjectCarousel
              images={project.images ?? []}
              title={project.title}
            />

            <div className="pointer-events-none absolute top-4 right-4 flex gap-2">
              {project.platform && (
                <Badge
                  variant={project.platform === "Web" ? "default" : "outline"}
                  className="pointer-events-auto text-[10px] uppercase tracking-wide"
                >
                  {project.platform}
                </Badge>
              )}
            </div>
          </div>

          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {project.developedAt && (
                <p className="text-xs text-muted-foreground">
                  {project.developedAt}
                </p>
              )}

              <div className="flex flex-wrap gap-2 text-xs text-primary">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="inline-flex items-center transition-all duration-150 hover:text-[#6D65FF] hover:font-semibold"
                  >
                    Live demo<span className="ml-1 text-[13px]">↗</span>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="inline-flex items-center transition-all duration-150 hover:text-[#6D65FF] hover:font-semibold"
                  >
                    GitHub<span className="ml-1 text-[13px]">↗</span>
                  </Link>
                )}
              </div>
            </div>

            <CardTitle className="text-xl font-semibold">
              {project.title}
            </CardTitle>

            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-[11px] font-medium bg-[#E7E6FF] text-[#4E47CE]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <p
              className="
      text-xs sm:text-sm md:text-base
      text-muted-foreground
      whitespace-pre-line
      leading-relaxed
    "
            >
              {project.summary}
            </p>

            <div className="space-y-2 text-[10px] sm:text-xs md:text-sm">
              {project.role && (
                <div className="flex items-center gap-3">
                  <span
                    className="
            rounded-md bg-[#6D65FF]
            px-3 py-[5px]
            text-[10px] sm:text-[10px] md:text-xs
            font-semibold text-white
            uppercase tracking-wide
            leading-none
          "
                  >
                    Role
                  </span>
                  <span
                    className="text-muted-foreground text-xs sm:text-sm
                  text-left leading-normal"
                  >
                    {project.role}
                  </span>
                </div>
              )}

              {project.type && (
                <div className="flex items-center gap-3">
                  <span
                    className="
             rounded-md bg-[#6D65FF]
            px-3 py-[5px]
            text-[10px] sm:text-[10px] md:text-xs
            font-semibold text-white
            uppercase tracking-wide
            leading-none
          "
                  >
                    Type
                  </span>
                  <span
                    className="text-muted-foreground text-xs sm:text-sm
                  text-left leading-normal"
                  >
                    {project.type}
                  </span>
                </div>
              )}

              {project.contributions && (
                <div className="flex items-start gap-3">
                  <span
                    className="
                   rounded-md bg-[#6D65FF]
            px-3 py-[5px]
            text-[10px] sm:text-[10px] md:text-xs
            font-semibold text-white
            uppercase tracking-wide
            leading-none shrink-0
                "
                  >
                    Contributions
                  </span>
                  <span
                    className="
                  flex-1 text-muted-foreground
                  text-xs sm:text-sm
                  text-left leading-normal
                "
                  >
                    {project.contributions}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
