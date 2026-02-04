import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { projects } from "@/data/projects";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

type Project = InferSelectModel<typeof projects>;

export async function ProjectsSection() {
  const featuredProjects: Project[] = await db.select().from(projects).limit(3);
  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Projects
            </p>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              Featured Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="text-sm text-primary  hover:font-semibold
            hover:text-[#6D65FF] hover:underline m-[8px]"
          >
            View all
            <span className="ml-1 text-xs">↗</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <Card
                className="
                  flex flex-col overflow-hidden border border-border/70 bg-card/80 shadow-sm
                  transition-all duration-400 cursor-pointer
                  hover:shadow-[0_0_15px_3px_#6D65FF]/30 hover:scale-[1.02] hover:border-[#6D65FF]
                "
              >
                <div
                  className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-80               
"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover duration-300 group-hover:scale-[1.15]"
                  />

                  {project.platform && (
                    <Badge
                      variant={
                        project.platform === "Web" ? "default" : "outline"
                      }
                      className="absolute top-4 right-4 text-[10px] uppercase tracking-wide"
                    >
                      {project.platform === "Web" ? "Web" : "Mobile"}
                    </Badge>
                  )}
                </div>

                <CardHeader className="relative z-20 pointer-events-none text-center">
                  <div className="flex justify-center">
                    <CardTitle className="pointer-events-auto font-semibold leading-tight text-base sm:text-lg md:text-xl transition-colors duration-200 group-hover:text-[#4E47CE]">
                      {project.title}
                    </CardTitle>
                  </div>
                  <p className="pointer-events-auto text-sm md:text-[15px] leading-snug text-[#4E47CE] transition-colors duration-200 group-hover:text-muted-foreground line-clamp-3">
                    {project.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3 pb-3 ">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="
                          text-[11px] font-medium transition-colors duration-200
                          group-hover:bg-[#E7E6FF] group-hover:text-[#4E47CE]
                        "
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto pt-0 mb-3">
                  <span
                    className="inline-flex items-center text-sm font-medium text-primary  hover:font-semibold
            hover:text-[#6D65FF] hover:underline"
                  >
                    See project
                    <span className="ml-1 text-xs">↗</span>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
