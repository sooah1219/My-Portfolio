"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

export function ProjectsSection() {
  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full space-y-6">
        {/* Section header */}
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Projects
            </p>
            <h2 className="text-xl font-bold tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Project cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="
              group flex flex-col overflow-hidden border border-border/70 bg-card/80 shadow-sm
              transition-all duration-400 cursor-pointer
              hover:shadow-[0_0_15px_3px_#6D65FF]/30 hover:scale-[1.02] hover:border-[#6D65FF]
            "
              // shadow-[0_0_15px_3px_#6D65FF]/30hover:bg-[#F5F4FF]
            >
              <div className="relative h-80 w-full">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover duration-300 hover:scale-[1.2]"
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base font-semibold leading-tight">
                    {project.title}
                  </CardTitle>
                  {project.platform && (
                    <Badge
                      variant={
                        project.platform === "Web" ? "default" : "outline"
                      }
                      className="text-[10px] uppercase tracking-wide"
                    >
                      {project.platform === "Web" ? "Web" : "Mobile"}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
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
              </CardContent>

              <CardFooter className="mt-auto pt-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  See project
                  <span className="ml-1 text-xs">↗</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
