import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

// Next 최신 버전에서는 params가 Promise 타입으로 들어옴
type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  // ✅ 여기서 먼저 await 해서 slug 꺼내기
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-4xl w-full space-y-4">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        {/* <p className="mt-4 text-sm">{project.description}</p> */}
      </div>
    </section>
  );
}
