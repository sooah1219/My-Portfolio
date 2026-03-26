import BouncyIcon from "@/components/ui/BouncyIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaPlayCircle } from "react-icons/fa";

type ProjectHeroCardProps = {
  project: {
    title: string;
    images?: string[] | null;
    platform?: "Web" | "Mobile" | string | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
    techStack?: string[] | null;
    developedAt?: string | null;
    role?: string | null;
    type?: string | null;
    summary?: string | null;
    contributions?: string | null;
  };
};

export default function ProjectHeroCard({ project }: ProjectHeroCardProps) {
  const hostname =
    project.liveUrl && isValidUrl(project.liveUrl)
      ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
      : project.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Card className="mb-26 overflow-hidden border border-[#6D65FF] bg-card/80 pb-5 shadow-[0_0_15px_3px_#6D65FF]/30">
      <div className="relative">
        <div className="relative mb-3 overflow-hidden rounded-xl sm:mt-8 md:mb-6">
          {project.images?.[0] && (
            <>
              {project.platform === "Web" ? (
                <div className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
                  <div className="mx-auto w-full max-w-[1120px] [perspective:1800px]">
                    <div className="group relative rounded-[28px] border border-white/10 bg-[#111] p-3 transition-transform duration-500 [transform:rotateX(6deg)] hover:[transform:rotateX(0deg)_translateY(-4px)] sm:p-4">
                      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />

                      <div className="mb-3 overflow-hidden rounded-[18px] border border-white/10 bg-[#2b2727] sm:mb-4">
                        <div className="flex items-center gap-2 px-4 py-3 sm:px-5">
                          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                          <span className="h-3 w-3 rounded-full bg-[#28c840]" />

                          <div className="ml-3 flex-1">
                            <div className="mx-auto flex h-10 max-w-[720px] items-center rounded-full border border-white/10 bg-white/6 px-4 text-sm font-semibold text-white/90 shadow-inner">
                              {hostname}
                            </div>
                          </div>
                        </div>

                        {/* screen */}
                        <div className="relative overflow-hidden rounded-b-[18px] bg-black">
                          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                            <Image
                              src={project.images[0]}
                              alt={project.title}
                              fill
                              priority
                              className="object-cover object-top"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1120px"
                            />

                            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/20" />
                            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
                          </div>
                        </div>
                      </div>

                      <div className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-full bg-black/30 blur-2xl" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`relative w-full ${
                    project.platform === "Mobile"
                      ? "h-[280px] sm:h-[300px] md:h-[380px]"
                      : "h-[300px] sm:h-[400px] md:h-[480px]"
                  }`}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* platform badge */}
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

      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <CardTitle className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            {project.title}
          </CardTitle>

          <div className="mt-1 flex items-center gap-3">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 transition-colors duration-150"
              >
                <BouncyIcon delay={0}>
                  <FaPlayCircle className="text-xl text-[#6D65FF]" />
                </BouncyIcon>

                <span className="text-sm font-semibold text-muted-foreground group-hover:text-[#6D65FF]">
                  Live Website
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
                  <FaGithub className="text-xl text-[#6D65FF]" />
                </BouncyIcon>

                <span className="text-sm font-semibold text-muted-foreground group-hover:text-[#6D65FF]">
                  GitHub
                </span>
              </Link>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-6">
        {!!project.techStack?.length && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-[#6D65FF]/10 px-3 py-1 text-xs font-medium text-[#6D65FF]"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-3 text-base">
          {(project.developedAt || project.role || project.type) && (
            <div className="flex flex-col gap-2 text-[15px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:text-base">
              {project.developedAt && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#6D65FF]">
                    Developed
                  </span>
                  <span className="text-muted-foreground">
                    {project.developedAt}
                  </span>
                </div>
              )}

              {project.developedAt && (project.role || project.type) && (
                <span className="hidden text-muted-foreground/40 sm:inline">
                  •
                </span>
              )}

              {project.role && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#6D65FF]">Role</span>
                  <span className="text-muted-foreground">{project.role}</span>
                </div>
              )}

              {project.role && project.type && (
                <span className="hidden text-muted-foreground/40 sm:inline">
                  •
                </span>
              )}

              {project.type && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#6D65FF]">Type</span>
                  <span className="text-muted-foreground">{project.type}</span>
                </div>
              )}
            </div>
          )}

          <span className="font-semibold text-[#6D65FF]">Overview</span>

          {project.summary && (
            <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          )}

          {project.contributions && (
            <div className="space-y-1">
              <span className="font-semibold text-[#6D65FF]">
                Contributions
              </span>
              <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                {project.contributions}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <div className="mb-8 flex justify-center overflow-visible">
        <BouncyIcon delay={0}>
          <a
            href="#details"
            aria-label="Scroll to details"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#6D65FF]/30 bg-background/60 shadow-[0_0_15px_3px_#6D65FF]/20 backdrop-blur transition-all duration-200 hover:border-[#6D65FF]/60"
          >
            <ChevronDown
              strokeWidth={2.5}
              className="h-5 w-5 text-muted-foreground group-hover:text-[#6D65FF]"
            />

            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-[#6D65FF] opacity-0 group-hover:opacity-100">
              Product Walkthrough
            </span>
          </a>
        </BouncyIcon>
      </div>
    </Card>
  );
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
