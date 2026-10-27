import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ProjectVisual } from "@/components/project-visual";
import { WebsiteWorkSection } from "@/components/website-work";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Projects | Om Deshmukh" };
const projects = [
  { kind: "book" as const, title: "Limit Order Book & Matching Engine", status: "In development", description: "A C++17 engine for price-time priority, partial fills, cancellation, and integer tick pricing. I’m extending the baseline toward replayable order-flow experiments and latency measurement.", tags: ["C++17", "CMake", "Market microstructure"], href: "/projects/order-book", action: "Live demo & project notes" },
  { kind: "paths" as const, title: "Monte Carlo Risk Simulation Lab", status: "Browser demo available", description: "A small experiment in uncertainty: simulate geometric Brownian motion, inspect terminal prices, and calculate 95% Value at Risk and Expected Shortfall. The Python research workflow is in progress.", tags: ["Monte Carlo", "Probability", "Risk"], href: "/projects/monte-carlo", action: "Live simulation" },
  { kind: "systems" as const, title: "Linux Systems & HPC Learning Lab", status: "In progress", description: "My working notebook on processes, threads, sockets, memory layout, and performance. The aim is a repeatable benchmark harness for understanding throughput and tail latency.", tags: ["C++", "Linux", "Concurrency", "HPC"], href: "/projects/systems-lab", action: "Read the lab notebook" },
];
export default function Projects() {
  return <main className="page"><PageHeading eyebrow="Things I’m building" title="Projects"><p>I learn best when I have something to build. These projects started with questions about trading systems, probability, and performance. Try the demos, or open the notes to see what I’m working on next.</p></PageHeading><div className="project-list">{projects.map(p=><article key={p.href}><Link href={p.href} className="project-visual" aria-label={p.title}><ProjectVisual kind={p.kind} /></Link><div><h2><Link href={p.href}>{p.title}</Link></h2><p>{p.description}</p><div className="tag-row">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="text-links"><Link href={p.href}>{p.action} <ArrowUpRight /></Link><span className="status">{p.status}</span></div></div></article>)}</div><section className="section"><h2>Research direction</h2><p>I want to study how order-book data structures behave under different liquidity and arrival patterns. My next steps are seeded Monte Carlo order flow, replay checks, and reproducible latency distributions. I’d like to turn the results into a paper once I have experiments worth writing about.</p><a className="underlined" href="https://github.com/OmDeshmukh04" target="_blank" rel="noreferrer">My GitHub profile <ArrowUpRight /></a></section><div id="web-work"><WebsiteWorkSection /></div></main>;
}
