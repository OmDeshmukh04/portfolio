import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { ProjectShowcase } from "@/components/project-showcase";

export const metadata: Metadata = { title: "Projects | Om Deshmukh" };

export default function Projects() {
  return <main className="page projects-page">
    <div className="projects-page-topbar">
      <PageHeading eyebrow="Things I’m building" title="Explore the projects" />
      <a className="projects-github-link" href="https://github.com/OmDeshmukh04" target="_blank" rel="noreferrer">
        Explore GitHub <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
    <ProjectShowcase />
  </main>;
}
