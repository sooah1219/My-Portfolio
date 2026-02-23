import { Badge } from "@/components/ui/badge";
import BouncyIcon from "@/components/ui/BouncyIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectDetailsAuto from "@/components/ui/project-details";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { cldVideo } from "@/lib/cloudinary";
import { eq } from "drizzle-orm";
import { ChevronDown, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub, FaPlayCircle } from "react-icons/fa";

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
  if (!project) return notFound();

  return (
    <div id="top">
      <section className="mt-10 flex w-full justify-center px-4">
        <div className="w-full max-w-4xl space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm sm:text-base text-muted-foreground transition-colors hover:text-[#6D65FF]"
          >
            <ChevronLeft size={16} />
            <span className="ml-1">View all projects</span>
          </Link>

          <Card className="overflow-hidden border border-[#6D65FF] bg-card/80 shadow-[0_0_15px_3px_#6D65FF]/30 mb-26 pb-5">
            <div
              className="relative"
              style={{ viewTransitionName: `project-image-${slug}` }}
            >
              <div
                className="relative mt-0 mb-0 sm:mt-9 sm:mb-3 overflow-hidden rounded-xl"
                style={{ viewTransitionName: `project-image-${slug}` }}
              >
                {project.images?.[0] && (
                  <div
                    className={`
        relative w-full
        ${
          project.platform === "Web"
            ? "h-[300px] sm:h-[400px] md:h-[480px] lg:my-8 lg:h-[500px]"
            : "h-[280px] sm:h-[300px] md:h-[380px] lg:h-[380px]"
        }
      `}
                  >
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 896px"
                    />
                  </div>
                )}
              </div>

              <div className="pointer-events-none absolute right-4 top-4 flex gap-2">
                {project.platform && (
                  <Badge
                    variant={project.platform === "Web" ? "default" : "outline"}
                    className="pointer-events-auto text-xs uppercase tracking-wide"
                  >
                    {project.platform}
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="space-y-2">
              {/* Date */}
              {project.developedAt && (
                <p className="text-sm sm:text-base text-muted-foreground mb-0">
                  {project.developedAt}
                </p>
              )}

              {/* Title + Links */}
              <div className="flex flex-wrap items-center gap-4">
                <CardTitle
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight"
                  style={{ viewTransitionName: `project-title-${slug}` }}
                >
                  {project.title}
                </CardTitle>

                <div className="mt-1 flex items-center gap-3 sm:mt-2 md:mt-2">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-colors duration-150"
                    >
                      <BouncyIcon delay={0}>
                        <FaPlayCircle className="text-lg sm:text-xl md:text-2xl text-[#6D65FF]" />
                      </BouncyIcon>
                      <span className="font-semibold text-sm sm:text-base text-muted-foreground transition-colors duration-150 group-hover:text-[#6D65FF]">
                        Live Demo
                      </span>
                    </Link>
                  )}

                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-colors duration-150"
                    >
                      <BouncyIcon delay={0.15}>
                        <FaGithub className="text-lg sm:text-xl md:text-2xl text-[#6D65FF]" />
                      </BouncyIcon>
                      <span className="font-semibold text-sm sm:text-base text-muted-foreground transition-colors duration-150 group-hover:text-[#6D65FF]">
                        GitHub
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Summary */}
              {project.summary && (
                <p className="whitespace-pre-line text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
              )}

              {/* Tech stack */}
              {!!project.techStack?.length && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="font-medium text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1  bg-[#6D65FF]/10
          text-[#6D65FF]"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4 pb-6">
              <div className="space-y-3 text-sm sm:text-base md:text-lg">
                {project.role && (
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span className="font-semibold text-[#6D65FF]">Role:</span>
                    <span className="text-muted-foreground">
                      {project.role}
                    </span>
                  </div>
                )}

                {project.type && (
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span className="font-semibold text-[#6D65FF]">Type:</span>
                    <span className="text-muted-foreground">
                      {project.type}
                    </span>
                  </div>
                )}

                {project.contributions && (
                  <div className="space-y-1">
                    <span className="font-semibold text-[#6D65FF]">
                      Contributions
                    </span>
                    <p className="text-muted-foreground leading-relaxed mt-1 text-sm sm:text-base md:text-lg">
                      {project.contributions}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>

            <div className="flex justify-center overflow-visible mb-8">
              <BouncyIcon delay={0}>
                <a
                  href="#details"
                  aria-label="Scroll to details"
                  className="
                    group relative inline-flex items-center justify-center
                    h-10 w-10
                    overflow-visible
                    rounded-full
                    border-2 border-[#6D65FF]/30
                    bg-background/60 backdrop-blur
                    transition-all duration-200
                    hover:border-[#6D65FF]/60
                    hover:shadow-[0_0_8px_2px_rgba(109,101,255,0.35)]
                  "
                >
                  <ChevronDown
                    strokeWidth={2.5}
                    className="
                      h-5 w-5 text-muted-foreground
                      transition-all duration-200
                      group-hover:translate-y-0.5
                      group-hover:text-[#6D65FF]
                      group-hover:drop-shadow-[0_0_4px_rgba(109,101,255,0.6)]
                    "
                  />

                  {/* hover text (TOP) */}
                  <span
                    className="
                      pointer-events-none absolute
                      -top-7 left-1/2 -translate-x-1/2
                      whitespace-nowrap text-sm sm:text-base font-medium
                      text-[#6D65FF]
                      opacity-0 translate-y-1
                      transition-all duration-200
                      group-hover:opacity-100
                      group-hover:translate-y-0
                    "
                  >
                    Product Walkthrough
                  </span>
                </a>
              </BouncyIcon>
            </div>
          </Card>

          <ProjectDetailsAuto
            items={(project.details ?? []).map((d) => ({
              ...d,
              video: d.video ? cldVideo(d.video) : undefined,
            }))}
            platform={project.platform}
          />
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
}
