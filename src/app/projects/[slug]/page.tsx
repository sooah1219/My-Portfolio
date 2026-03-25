import ProjectCaseStudy from "@/components/caseStudy/Project-CaseStudy";
import SectionHeader from "@/components/caseStudy/SectionHeader";
import ProjectHeroCard from "@/components/project/Project-HeroCard";
import ProjectMedia from "@/components/project/Project-Media";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { cldVideo } from "@/lib/cloudinary";
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
  if (!project) return notFound();

  return (
    <div id="top">
      <section className="mt-10 flex w-full justify-center px-4">
        <div className="w-full max-w-4xl space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-[#6D65FF]"
          >
            <ChevronLeft size={16} />
            <span className="ml-1">View all projects</span>
          </Link>

          <ProjectHeroCard project={project} />

          <SectionHeader
            label="Details"
            title="Product Walkthrough"
            description="A step-by-step look at how the product works through real interactions."
          />

          <ProjectMedia
            items={(project.details ?? []).map((d) => ({
              ...d,
              video: d.video ? cldVideo(d.video) : undefined,
            }))}
            platform={project.platform}
          />
          <ProjectCaseStudy
            title={project.title}
            architecture={project.architecture}
            improvements={project.improvements}
            problem={project.problem}
            problem_intro={project.problem_intro}
            problem_metrics={project.problem_metrics}
          />
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
}
