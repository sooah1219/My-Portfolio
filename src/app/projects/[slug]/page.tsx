import { Badge } from "@/components/ui/badge";
import BouncyIcon from "@/components/ui/BouncyIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import ProjectDetails from "@/components/ui/project-details";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChevronDown, ChevronLeft } from "lucide-react";
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
            className="inline-flex items-center text-md text-muted-foreground transition-colors hover:text-[#6D65FF]"
          >
            <ChevronLeft size={14} />
            <span className="ml-1">View all projects</span>
          </Link>

          <Card className="overflow-hidden border border-[#6D65FF] bg-card/80 shadow-[0_0_15px_3px_#6D65FF]/30 mb-26 pb-5">
            {/* Carousel */}
            <div
              className="relative"
              style={{ viewTransitionName: `project-image-${slug}` }}
            >
              <ProjectCarousel
                images={project.images ?? []}
                title={project.title}
                className="mt-0 mb-0 sm:mt-9 sm:mb-3"
              />

              <div className="pointer-events-none absolute right-4 top-4 flex gap-2">
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

            <CardHeader className="space-y-1">
              {/* Date */}
              {project.developedAt && (
                <p className="text-xs text-muted-foreground mb-0">
                  {project.developedAt}
                </p>
              )}

              {/* Title + Links */}
              <div className="flex flex-wrap items-center gap-4">
                <CardTitle
                  className="text-xl font-semibold leading-tight sm:text-2xl md:text-3xl"
                  style={{ viewTransitionName: `project-title-${slug}` }}
                >
                  {project.title}
                </CardTitle>

                <div className="mt-2 flex items-center gap-2 sm:mt-3 md:mt-2">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 transition-colors duration-150"
                    >
                      <BouncyIcon delay={0}>
                        <FaPlayCircle className="text-base sm:text-lg md:text-xl text-[#6D65FF]" />
                      </BouncyIcon>
                      <span className="font-semibold text-[11px] text-muted-foreground transition-colors duration-150 group-hover:text-[#6D65FF] sm:text-xs md:text-sm">
                        Live Demo
                      </span>
                    </Link>
                  )}

                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 transition-colors duration-150"
                    >
                      <BouncyIcon delay={0.15}>
                        <FaGithub className="text-base sm:text-lg md:text-xl text-[#6D65FF]" />
                      </BouncyIcon>
                      <span className="font-semibold text-[11px] text-muted-foreground transition-colors duration-150 group-hover:text-[#6D65FF] sm:text-xs md:text-sm">
                        GitHub
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Summary */}
              {project.summary && (
                <p className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
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
                      className="font-medium text-[10px] sm:text-[11px] md:text-xs px-2 py-0.5 sm:px-2.5 md:px-3 md:py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2 text-[10px] sm:text-xs md:text-sm">
                {project.role && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#6D65FF]">Role:</span>
                    <span className="text-muted-foreground">
                      {project.role}
                    </span>
                  </div>
                )}

                {project.type && (
                  <div className="flex gap-2">
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
                    <p className="text-muted-foreground leading-relaxed mt-1">
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
        h-9 w-9
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
          -top-6 left-1/2 -translate-x-1/2
          whitespace-nowrap text-[12px] font-medium
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

          <ProjectDetails
            items={[
              {
                title: "AI-Based Career Matching System",
                description: [
                  "Collects user interests and work preferences through structured questions",
                  "Analyzes data using AI-driven logic",
                  "Generates personalized career recommendations with clear reasoning",
                  "Delivers a data-driven, branching user experience",
                ],
                video: "/videos/forge_1-optimized.mp4",
              },
              {
                title: "Feature 2",
                description: [
                  "Visualizes career progression through step-by-step, gamified stages",
                  "Breaks down education, skills, certifications, and growth milestones",
                  "Uses state-based progression to guide users from beginner to expert",
                ],
                image: "/images/forge.png",
              },
              {
                title: "Feature 3",
                description: [
                  "Highlights careers with strong market demand",
                  "Provides job descriptions, required skills, and opportunities",
                  "Supports informed and realistic career decision-making",
                ],
                image: "/images/forge.png",
              },
            ]}
          />
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
}
