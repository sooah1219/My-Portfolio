"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

type PlatformFilter = "all" | "Web" | "Mobile";
type SortOption = "newest" | "oldest" | "title";
type ProjectsListProps = {
  projects: Project[];
};

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    let list = projects.filter((project) => {
      if (platformFilter !== "all" && project.platform !== platformFilter) {
        return false;
      }
      if (normalizedSearch.length > 0) {
        const inTitle = project.title.toLowerCase().includes(normalizedSearch);
        const inSummary = project.summary
          ?.toLowerCase()
          .includes(normalizedSearch);
        const inTech =
          project.techStack?.some((tech) =>
            tech.toLowerCase().includes(normalizedSearch)
          ) ?? false;

        if (!inTitle && !inSummary && !inTech) {
          return false;
        }
      }

      return true;
    });

    list = [...list].sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }

      const dateA = a.developedAt ? new Date(a.developedAt).getTime() : 0;
      const dateB = b.developedAt ? new Date(b.developedAt).getTime() : 0;

      if (sortOption === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB; // oldest
      }
    });

    return list;
  }, [search, platformFilter, sortOption, projects]);

  return (
    <section className="w-full flex justify-center px-4">
      <div className="max-w-6xl w-full space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Selected work across web and mobile — filter, search, and explore.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-1/2">
            <Input
              placeholder="Search by title, tech, or summary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm border-[#C6C4FF]/60 focus-visible:ring-[#6D65FF]/40 focus-visible:border-[#6D65FF]"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end">
            <div className="flex rounded-full border border-border/70 bg-card/60 p-1">
              {(["all", "Web", "Mobile"] as PlatformFilter[]).map((value) => {
                const isActive = platformFilter === value;
                const label =
                  value === "all" ? "All" : value === "Web" ? "Web" : "Mobile";

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPlatformFilter(value)}
                    className={[
                      "px-3 py-1 text-xs rounded-full transition-all",
                      isActive
                        ? "bg-[#6D65FF] text-white shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <Select
              value={sortOption}
              onValueChange={(v) => setSortOption(v as SortOption)}
            >
              <SelectTrigger className="w-40 h-9 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="title">Title (A–Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <Card
                  className="
                    overflow-hidden flex flex-col border border-border/70 bg-card/80 shadow-sm
                    hover:shadow-[0_0_12px_2px_#6D65FF]/25 hover:border-[#6D65FF]
                    transition-all duration-300
                  "
                >
                  <div className="relative w-full aspect-[5/4] sm:aspect-[4/3]">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                      className="object-cover duration-300 group-hover:scale-[1.08]"
                    />

                    {project.platform && (
                      <Badge
                        variant={
                          project.platform === "Web" ? "default" : "outline"
                        }
                        className="absolute top-2 right-2 text-[10px] uppercase tracking-wide"
                      >
                        {project.platform}
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="p-3 pb-1 space-y-1">
                    {project.developedAt && (
                      <p className="text-[11px] text-muted-foreground">
                        {project.developedAt}
                      </p>
                    )}

                    <CardTitle className="text-base sm:text-lg font-semibold leading-snug">
                      {project.title}
                    </CardTitle>

                    {project.subtitle && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.subtitle}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="p-3 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 6).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="
          text-[11px] sm:text-xs font-medium px-2 py-0.5
          transition-colors duration-200
          group-hover:bg-[#E7E6FF] group-hover:text-[#4E47CE]
        "
                        >
                          {tech}
                        </Badge>
                      ))}

                      {project.techStack.length > 6 && (
                        <span className="text-[11px] sm:text-xs text-muted-foreground">
                          +{project.techStack.length - 6} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No projects matched your filters. Try changing search or filters.
          </p>
        )}
      </div>
    </section>
  );
}
