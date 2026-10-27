"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";

type ProjectCategory = "all" | "quant" | "web" | "github";
type ProjectVisualKind = "book" | "paths" | "systems" | "github";
type Project = {
  title: string;
  category: Exclude<ProjectCategory, "all">;
  area: string;
  status: string;
  description: string;
  tags: string[];
  href: string;
  action: string;
  visual?: ProjectVisualKind;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  source?: { href: string; label: string };
};

const projects: Project[] = [
  {
    title: "Limit Order Book & Matching Engine",
    category: "quant",
    area: "Market microstructure",
    status: "In development",
    description: "A C++17 matching engine for price-time priority, partial fills, cancellations, and integer tick pricing, with deterministic checks for basic order flows.",
    tags: ["C++17", "Matching engine", "Market microstructure"],
    href: "/projects/order-book",
    action: "Try the demo",
    visual: "book",
    source: { href: "/downloads/quant-lob-engine.zip", label: "Download C++ source" },
  },
  {
    title: "Monte Carlo Risk Simulation Lab",
    category: "quant",
    area: "Probability & risk",
    status: "Interactive demo",
    description: "Explore simulated price paths and terminal-value distributions, then see how volatility and the time horizon change 95% VaR and Expected Shortfall.",
    tags: ["Monte Carlo", "VaR & Expected Shortfall", "Probability"],
    href: "/projects/monte-carlo",
    action: "Run the simulation",
    visual: "paths",
  },
  {
    title: "Linux Systems & HPC Learning Lab",
    category: "quant",
    area: "Systems performance",
    status: "Study in progress",
    description: "A working notebook on memory layout, concurrency, sockets, and careful benchmarking. The goal is to understand what limits throughput and tail latency.",
    tags: ["C++", "Linux", "Concurrency", "HPC"],
    href: "/projects/systems-lab",
    action: "Read the lab notes",
    visual: "systems",
  },
  {
    title: "PragyaFlow",
    category: "web",
    area: "Startup · product work",
    status: "Live website",
    description: "My startup, focused on web and mobile products, SaaS, finance automation, and AI-enabled workflows.",
    tags: ["Product", "SaaS", "Automation"],
    href: "https://www.pragyaflow.com/",
    action: "Visit PragyaFlow",
    image: "https://pragyaflow.com/og.png",
    imageAlt: "PragyaFlow product and automation services",
  },
  {
    title: "Tiger Machinery",
    category: "web",
    area: "Industrial website concept",
    status: "Live website",
    description: "A deployed industrial site concept covering foundry and casting, machining, fabrication, and repair.",
    tags: ["Industrial", "Responsive design", "Web development"],
    href: "https://tigermachinery.vercel.app/",
    action: "View the live site",
    image: "https://tigermachinery.vercel.app/images/foundry.webp",
    imageAlt: "Foundry equipment on the Tiger Machinery site",
  },
  {
    title: "Regent Star Hotel",
    category: "web",
    area: "Hospitality website concept",
    status: "Live website",
    description: "A hotel site concept for rooms, dining, celebrations, and stays near Piarco Airport.",
    tags: ["Hospitality", "Responsive design", "Web development"],
    href: "https://regentstarhotel.vercel.app/",
    action: "View the live site",
    image: "https://regentstarhotel.vercel.app/images/hero-lobby.webp",
    imageAlt: "Lobby on the Regent Star Hotel site",
  },
  {
    title: "Caffè Italia",
    category: "web",
    area: "Restaurant website",
    status: "Live website",
    description: "A restaurant site for Italian dining, the menu, catering, reservations, and visiting.",
    tags: ["Restaurant", "Reservations", "Web development"],
    href: "https://cafeitalia-six.vercel.app/",
    action: "View the live site",
    image: "https://cafeitalia-six.vercel.app/images/antipasti-spread.jpg",
    imageAlt: "Antipasti on the Caffè Italia site",
  },
  {
    title: "MediBridge",
    category: "github",
    area: "Healthcare · health records",
    status: "Prototype · demo data",
    description: "A role-based health-record prototype with patient timelines, report analysis, multilingual summaries, and emergency referral flows. Government-service integrations are demo adapters.",
    tags: ["React", "Node.js", "Health records", "OCR prototype"],
    href: "https://github.com/OmDeshmukh04/MediBridge",
    action: "View on GitHub",
    image: "/project-previews/medibridge-dashboard.png",
    imageAlt: "MediBridge prototype dashboard showing synthetic demo records and a medical report reader",
    imagePosition: "center 20%",
  },
  {
    title: "VoiceReserve AI",
    category: "github",
    area: "Voice-assisted appointment booking",
    status: "Prototype",
    description: "A voice and text assistant for healthcare appointments. It extracts details such as specialty, city, and time, matches clinicians, and checks available slots before booking.",
    tags: ["Voice UX", "Intent extraction", "Scheduling", "React + Express"],
    href: "https://github.com/OmDeshmukh04/VoiceReserve-AI",
    action: "View on GitHub",
    visual: "github",
  },
  {
    title: "AutoBat Mobile App",
    category: "github",
    area: "Mobile app · battery operations",
    status: "Planning & scaffold",
    description: "A mobile-first plan for battery traceability and warranty handling from dispatch through sale and claims. The repository is a scaffold; production workflows are not implemented yet.",
    tags: ["Mobile app", "Battery traceability", "Warranty workflows", "Scaffold"],
    href: "https://github.com/OmDeshmukh04/AutoBat",
    action: "View on GitHub",
    visual: "github",
  },
  {
    title: "vConstruct Buildathon",
    category: "github",
    area: "Construction · PDF submittals",
    status: "Buildathon prototype",
    description: "A construction submittal RFI demo that accepts PDFs, extracts document text with OCR fallback, and returns quick flags in a small web workflow.",
    tags: ["Python", "FastAPI", "React", "PDF & OCR"],
    href: "https://github.com/OmDeshmukh04/vConstructBuildathon",
    action: "View on GitHub",
    visual: "github",
  },
];

const filters: Array<{ id: ProjectCategory; label: string }> = [
  { id: "all", label: "All work" },
  { id: "quant", label: "Quant & systems" },
  { id: "web", label: "Web & product" },
  { id: "github", label: "GitHub projects" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isExternal = project.href.startsWith("https://");
  return <article className="showcase-project-card" aria-labelledby={`showcase-project-${index}`}>
    <div className={`showcase-project-preview${project.image ? " has-image" : " has-diagram"}`}>
      {project.image
        ? <img src={project.image} alt={project.imageAlt} loading="lazy" style={{ objectPosition: project.imagePosition ?? "center" }} />
        : project.visual ? <ProjectVisual kind={project.visual} /> : null}
      <span className="showcase-project-area">{project.area}</span>
      <span className={`showcase-project-status${project.status === "Live website" || project.status === "Interactive demo" ? " is-live" : ""}`}>
        {project.status}
      </span>
    </div>
    <div className="showcase-project-content">
      <h3 id={`showcase-project-${index}`}>{project.title}</h3>
      <p>{project.description}</p>
      <div className="showcase-project-tags" aria-label="Technologies and topics">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="showcase-project-actions">
        {isExternal
          ? <a className="showcase-project-primary" href={project.href} target="_blank" rel="noreferrer">{project.action}<ArrowUpRight aria-hidden="true" /></a>
          : <Link className="showcase-project-primary" href={project.href}>{project.action}<ArrowUpRight aria-hidden="true" /></Link>}
        {project.source && <a className="showcase-project-secondary" href={project.source.href} download>{project.source.label}</a>}
      </div>
    </div>
  </article>;
}

export function ProjectShowcase() {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [search, setSearch] = useState("");
  const counts = useMemo(() => ({
    all: projects.length,
    quant: projects.filter((project) => project.category === "quant").length,
    web: projects.filter((project) => project.category === "web").length,
    github: projects.filter((project) => project.category === "github").length,
  }), []);
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      const matchesSearch = !query || `${project.title} ${project.area} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);
  return <>
    <section className="project-overview" aria-label="Project overview">
      <article><strong>{counts.quant}</strong><span>Quant & systems builds</span></article>
      <article><strong>{counts.web}</strong><span>Live websites</span></article>
      <article><strong>{counts.github}</strong><span>GitHub projects</span></article>
    </section>

    <section className="project-showcase" aria-label="Project gallery">
      <div className="project-showcase-controls">
        <div className="project-filter-list" role="group" aria-label="Filter projects by category">
          {filters.map((filter) => <button
            key={filter.id}
            type="button"
            className={category === filter.id ? "is-selected" : ""}
            aria-pressed={category === filter.id}
            onClick={() => setCategory(filter.id)}
          >{filter.label}<span>{counts[filter.id]}</span></button>)}
        </div>
        <span className="project-result-count" aria-live="polite">{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}</span>
        <label className="project-search">
          <span className="sr-only">Search projects</span>
          <Search aria-hidden="true" />
          <input value={search} onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Search projects or topics" />
        </label>
      </div>
      {filteredProjects.length
        ? <div className="project-showcase-grid">{filteredProjects.map((project, index) => <ProjectCard key={project.href} project={project} index={index} />)}</div>
        : <p className="project-showcase-empty">No projects match that search. Try a different title or topic.</p>}
    </section>

    <section className="project-currently-working" aria-labelledby="currently-working-title">
      <div className="project-currently-heading">
        <p className="eyebrow">Currently working on</p>
        <span className="project-current-status"><i />Active M.Tech project</span>
      </div>
      <h2 id="currently-working-title">C++20 Trading Systems Laboratory</h2>
      <p>A local research app spanning order-book matching, ITCH market-data replay, simulated execution, pre-trade risk, durable recovery, and performance experiments. The first milestone is in place; I’m assessing the next project scope.</p>
      <div className="project-current-tags"><span>C++20</span><span>Trading systems</span><span>Correctness & replay</span><span>Performance</span></div>
      <div className="project-current-actions">
        <Link href="/projects/order-book">Try the matching demo <ArrowUpRight aria-hidden="true" /></Link>
        <a href="codex://threads/01a0f2fc-2170-7b31-b5ac-a23be21f7c9d">Assess quant project scope <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  </>;
}
