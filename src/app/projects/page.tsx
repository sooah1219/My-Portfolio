"use client";

import ProjectsList from "@/components/ProjectsList";

export default function ProjectsPage() {
  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full">
        <ProjectsList />
      </div>
    </section>
  );
}
