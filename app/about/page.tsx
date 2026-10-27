import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Puzzle } from "lucide-react";
import { PageHeading, AboutNav } from "@/components/page-heading";

export const metadata: Metadata = { title: "About | Om Deshmukh" };

export default function About() {
  return <main className="page about-page">
    <PageHeading eyebrow="A little beyond the résumé" title="Life outside work" />
    <AboutNav active="about" />
    <div className="about-grid about-topics-grid">
      <article className="about-topic-card">
        <Link href="/about/trekking"><img src="/photos/trek-03.webp" alt="A green mountain trail beneath dramatic monsoon clouds" /></Link>
        <h2><Link href="/about/trekking">Trekking</Link></h2>
        <p>Sahyadri trails, high ridges, and photos along the way.</p>
      </article>
      <article className="about-topic-card">
        <Link href="/about/cricket"><img src="/photos/rohit-264.webp" alt="Rohit Sharma celebrating his record-breaking innings" /></Link>
        <h2><Link href="/about/cricket">Rohit Sharma fanboy</Link></h2>
        <p>264. The 2024 World Cup. Two moments I never tire of.</p>
      </article>
      <article className="about-topic-card">
        <Link className="about-topic-visual about-topic-visual-esports" href="/about/esports" aria-label="Read about BGMI esports and Team Soul">
          <Gamepad2 size={42} strokeWidth={1.5} aria-hidden="true" />
          <span>BGMI · TEAM SOUL</span>
        </Link>
        <h2><Link href="/about/esports">BGMI esports</Link></h2>
        <p>Team Soul fan—especially Soul Legit.</p>
      </article>
      <article className="about-topic-card">
        <Link className="about-topic-visual about-topic-visual-puzzles" href="/about/puzzles" aria-label="Read about the puzzles Om enjoys">
          <Puzzle size={42} strokeWidth={1.5} aria-hidden="true" />
          <span>LOGIC · GEOMETRY</span>
        </Link>
        <h2><Link href="/about/puzzles">Puzzles</Link></h2>
        <p>Simon Tatham’s Puzzles and Euclidea.</p>
      </article>
    </div>
  </main>;
}
