import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderBookDemo } from "@/components/order-book-demo";

const implemented = [
  ["01", "Price-time priority", "Best price first, then FIFO within each price level."],
  ["02", "Deterministic matching", "Crossing orders, multi-order fills, and repeatable trade output."],
  ["03", "Partial fills", "Residual quantity remains available without losing its place incorrectly."],
  ["04", "Cancellation", "Orders can be removed by identifier while preserving book state."],
  ["05", "Integer ticks", "Prices avoid floating-point ambiguity inside the C++ engine."],
  ["06", "Correctness tests", "Core matching and state transitions have deterministic test coverage."],
];

const experiments = [
  ["E01", "Liquidity shape", "Dense and sparse price ladders under a fixed event count."],
  ["E02", "Message mix", "Different add, cancel, and marketable-order ratios."],
  ["E03", "Burst pressure", "Steady flow versus clustered arrival bursts."],
  ["E04", "Design variants", "Container and lookup strategies under identical seeded workloads."],
];

export default function OrderBookProject() {
  return (
    <main className="project-page">
      <nav className="project-nav"><Link href="/"><ArrowLeft /> Portfolio</Link><span className="status-chip">IN PROGRESS</span></nav>

      <header className="project-hero-new">
        <p className="chapter">FLAGSHIP PROJECT · C++17 · MARKET MICROSTRUCTURE</p>
        <h1>Limit Order Book & Matching Engine</h1>
        <p>A ground-up implementation of the mechanics behind an electronic exchange, becoming a reproducible study of order flow, data structures, and tail latency.</p>
        <div className="tag-row"><span>C++17</span><span>CMake</span><span>Price-time priority</span><span>Deterministic tests</span><span>Monte Carlo next</span></div>
      </header>

      <section className="project-content">
        <div className="project-heading"><span>01</span><h2>Try the matching rule yourself.</h2></div>
        <p className="project-prose">Submit a limit order or run a deterministic event. A marketable order consumes the opposite side from the best price outward. At the same price, the earliest resting order receives priority.</p>
        <div className="mt-10"><OrderBookDemo /></div>
      </section>

      <section className="project-content">
        <div className="project-heading"><span>02</span><h2>A correct baseline before optimization.</h2></div>
        <p className="project-prose">The current engine focuses on clear invariants and predictable state transitions. Optimization only matters after the reference behavior is trustworthy.</p>
        <div className="feature-list">
          {implemented.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="project-content">
        <div className="project-heading"><span>03</span><h2>From software artifact to research question.</h2></div>
        <p className="project-prose">The planned study asks how order-book data structures behave when liquidity and arrival patterns change. Every design will receive the same seeded order stream, with correctness checked before latency is recorded.</p>
        <div className="experiment-list">
          {experiments.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="project-content">
        <div className="project-heading"><span>04</span><h2>Claims I am not making yet.</h2></div>
        <div className="truth-panel"><p>No production-exchange claim.</p><p>No low-latency claim before measurements.</p><p>No real market-data claim before a licensed dataset.</p><p>No published-paper claim before review and acceptance.</p></div>
        <Link className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#cfe2c8]" href="/"><ArrowLeft className="size-4" /> Back to portfolio</Link>
      </section>
    </main>
  );
}
