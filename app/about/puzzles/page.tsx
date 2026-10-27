import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, AboutNav } from "@/components/page-heading";

export const metadata: Metadata = { title: "Puzzles | Om Deshmukh" };

export default function Puzzles() {
  return <main className="page about-page">
    <PageHeading eyebrow="Logic & geometry" title="Puzzles" />
    <AboutNav active="puzzles" />
    <section className="puzzle-app-grid" aria-label="Puzzle apps I enjoy">
      <a className="puzzle-app-card" href="https://www.chiark.greenend.org.uk/~sgtatham/puzzles/index.html" target="_blank" rel="noreferrer">
        <img src="https://f-droid.org/repo/name.boyle.chris.sgtpuzzles/en-US/tenInchScreenshots/04_tents_1653039482420.png" alt="Tents logic puzzle from Simon Tatham’s Puzzles app" loading="lazy" decoding="async" />
        <span className="puzzle-app-info">
          <span><span className="eyebrow">Logic puzzles</span><strong>Simon Tatham’s Puzzles</strong></span>
          <ArrowUpRight aria-hidden="true" />
        </span>
        <span className="puzzle-app-credit">Screenshot via F-Droid</span>
      </a>
      <a className="puzzle-app-card" href="https://www.euclidea.xyz/" target="_blank" rel="noreferrer">
        <img src="https://www.euclidea.xyz/faq/images/P8_3.png" alt="A Euclidea geometric construction puzzle on a grid" loading="lazy" decoding="async" />
        <span className="puzzle-app-info">
          <span><span className="eyebrow">Geometry</span><strong>Euclidea</strong></span>
          <ArrowUpRight aria-hidden="true" />
        </span>
        <span className="puzzle-app-credit">Screenshot from Euclidea</span>
      </a>
    </section>
  </main>;
}
