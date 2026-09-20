import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const implemented = [
  "Price-time priority for resting orders",
  "Bid/ask crossing and multi-order matching",
  "Partial fills and residual order handling",
  "Cancellation by order identifier",
  "Integer tick pricing for exact money representation",
  "Deterministic tests for matching and book state",
];

const planned = [
  "Market, IOC, and amend/cancel-replace order semantics",
  "Deterministic Monte Carlo order-flow generator",
  "Dense and sparse liquidity regimes",
  "Burst-load and cancel-to-add workload scenarios",
  "Alternative data-structure implementations",
  "Latency distribution and throughput harness",
];

const experiments = [
  { number: "E01", title: "Liquidity shape", text: "Compare dense and sparse price ladders while holding event count and order-size distribution constant." },
  { number: "E02", title: "Message mix", text: "Vary add, cancel, and marketable-order ratios to model different order-flow regimes." },
  { number: "E03", title: "Burst pressure", text: "Measure steady-state and burst behavior rather than reporting only average throughput." },
  { number: "E04", title: "Design variants", text: "Compare alternative containers and lookup strategies under the same seeded workload." },
];

export default function OrderBookProject() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="market-grid" aria-hidden="true" />
      <header className="site-header">
        <Link className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Portfolio</Link>
        <Badge className="border border-amber-300/20 bg-amber-300/10 text-amber-200">IN PROGRESS</Badge>
      </header>

      <section className="project-hero">
        <div>
          <p className="section-kicker">FLAGSHIP SYSTEM · M.TECH RESEARCH DIRECTION</p>
          <h1>Limit Order Book & Matching Engine</h1>
          <p className="project-lede">A ground-up C++17 implementation of the core mechanics behind an electronic exchange, evolving into a reproducible study of data structures, order flow, and tail latency.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {['C++17','CMake','Price-time priority','Deterministic tests','Monte Carlo next'].map((tag) => <Badge key={tag} variant="outline" className="border-white/10 bg-white/[0.035] px-3 py-1 text-slate-300">{tag}</Badge>)}
          </div>
        </div>
        <div className="system-readout">
          <div className="readout-head"><span>SYSTEM STATUS</span><strong>BASELINE VALID</strong></div>
          <div className="readout-grid">
            <div><span>LANGUAGE</span><strong>C++17</strong></div>
            <div><span>PRIORITY</span><strong>PRICE / TIME</strong></div>
            <div><span>PRICING</span><strong>INTEGER TICKS</strong></div>
            <div><span>NEXT</span><strong>ORDER FLOW SIM</strong></div>
          </div>
        </div>
      </section>

      <section className="project-section section-rule">
        <div className="project-section-title"><span>01</span><div><p>HOW IT WORKS</p><h2>One event, one deterministic state transition.</h2></div></div>
        <div className="flow-line" aria-label="Order processing architecture">
          {['Order event','Validate','Cross book','Emit trades','Rest remainder','Publish state'].map((step, index) => (
            <div key={step} className="flow-node"><span>{String(index + 1).padStart(2,'0')}</span><strong>{step}</strong>{index < 5 && <ChevronRight aria-hidden="true" />}</div>
          ))}
        </div>
        <p className="project-copy">An incoming limit order first passes basic validation. If it is marketable, it consumes the opposite side from best price outward and FIFO within each price level. Every fill creates a trade record. Any remaining quantity rests in the book with a stable time-priority position.</p>
      </section>

      <section className="project-section section-rule">
        <div className="project-section-title"><span>02</span><div><p>CURRENT BUILD</p><h2>A truthful baseline before optimization.</h2></div></div>
        <div className="split-checklist">
          <Card className="check-card py-0"><CardContent className="p-6 sm:p-8"><div className="check-heading"><CheckCircle2 /><div><p>IMPLEMENTED</p><h3>Working now</h3></div></div><ul>{implemented.map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul></CardContent></Card>
          <Card className="check-card py-0"><CardContent className="p-6 sm:p-8"><div className="check-heading"><CircleDashed /><div><p>NEXT MILESTONES</p><h3>Research expansion</h3></div></div><ul>{planned.map((item) => <li key={item}><CircleDashed />{item}</li>)}</ul></CardContent></Card>
        </div>
      </section>

      <section className="project-section section-rule">
        <div className="project-section-title"><span>03</span><div><p>RESEARCH DESIGN</p><h2>Measure regimes, not one impressive number.</h2></div></div>
        <p className="project-copy">The goal is to explain when an implementation choice helps, when it hurts, and why. Every comparison will run against the same seeded order stream, with correctness checked before performance is recorded.</p>
        <div className="experiment-cards">
          {experiments.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
        <div className="metric-band">
          <div><Gauge /><span>LATENCY</span><strong>p50 · p95 · p99 · p99.9</strong></div>
          <div><Layers3 /><span>THROUGHPUT</span><strong>messages / second</strong></div>
          <div><ShieldCheck /><span>CORRECTNESS</span><strong>invariants before speed</strong></div>
          <div><GitBranch /><span>REPRODUCIBILITY</span><strong>seeded workloads</strong></div>
        </div>
      </section>

      <section className="project-section section-rule">
        <div className="project-section-title"><span>04</span><div><p>PUBLICATION PATH</p><h2>The engine is the system. The finding becomes the paper.</h2></div></div>
        <div className="paper-panel">
          <FlaskConical aria-hidden="true" />
          <div><p className="section-kicker">WORKING TITLE</p><h3>Performance and Tail-Latency Analysis of Limit-Order-Book Data Structures Under Changing Liquidity and Burst-Load Regimes</h3><p>This title is provisional. It will be narrowed only after the literature review, baseline implementation, and pilot measurements identify a defensible contribution.</p></div>
        </div>
      </section>

      <section className="project-section section-rule pb-16 sm:pb-24">
        <div className="project-section-title"><span>05</span><div><p>LIMITATIONS</p><h2>What this project does not claim yet.</h2></div></div>
        <div className="limitations">
          <p>No production-exchange claim.</p><p>No low-latency claim before benchmarks.</p><p>No real market-data claim before a licensed dataset is integrated.</p><p>No published-paper claim before peer review and acceptance.</p>
        </div>
        <Link className="back-link mt-10" href="/"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
      </section>
    </main>
  );
}
