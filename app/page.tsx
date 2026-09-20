import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  FlaskConical,
  Network,
  Sigma,
  TerminalSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const asks = [
  { price: "101.08", quantity: "310", width: "44%" },
  { price: "101.06", quantity: "520", width: "68%" },
  { price: "101.04", quantity: "180", width: "31%" },
];

const bids = [
  { price: "101.01", quantity: "460", width: "61%" },
  { price: "100.99", quantity: "290", width: "42%" },
  { price: "100.97", quantity: "650", width: "82%" },
];

const focusAreas = [
  { icon: Network, title: "Market microstructure", text: "Order flow, liquidity, matching rules, queues, spread, and the mechanics behind electronic markets." },
  { icon: Braces, title: "Performance engineering", text: "Careful C++ design, deterministic behavior, profiling, memory choices, and reproducible measurement." },
  { icon: Sigma, title: "Quantitative foundations", text: "Probability, statistics, financial data, optimization, and computational finance through the MScFE path." },
];

const timeline = [
  { date: "Oct 2026 — incoming", title: "MSc Financial Engineering", place: "WorldQuant University", detail: "Financial markets, financial data, probability, statistics, econometrics, machine learning, and computational finance." },
  { date: "Mar 2026 — present", title: "Software Engineer", place: "CapSurge", detail: "Building software with TypeScript, React, Python, PostgreSQL, Git, and production-oriented engineering workflows." },
  { date: "Current", title: "M.Tech, Computer Science", place: "JSPM University Pune", detail: "Developing the order-book system as a substantial engineering and research project." },
  { date: "2022 — 2023", title: "Project Engineer Intern", place: "Tata Communications", detail: "Early engineering experience spanning project execution, design coordination, and technical delivery." },
];

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="inline-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}<ArrowUpRight aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="market-grid" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="flex items-center gap-3" aria-label="Om Deshmukh, home">
          <span className="brand-mark">OD</span>
          <span className="hidden text-sm font-semibold tracking-wide text-white sm:inline">OM DESHMUKH</span>
        </a>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 text-sm text-slate-400 sm:gap-7">
          <a className="nav-link" href="#work">Work</a>
          <a className="nav-link" href="#research">Research</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link hidden sm:inline" href="#journey">Journey</a>
        </nav>
      </header>

      <section id="top" className="hero-section">
        <div className="max-w-3xl">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="status-pill"><span className="status-dot" /> Building in public</span>
            <span className="eyebrow">Pune, India · 2026</span>
          </div>

          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">Software Engineer → Quantitative Developer</p>
          <h1 className="display-title">Engineering systems for where<span className="text-gradient"> code meets markets.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            I&apos;m Om Deshmukh, a software engineer and incoming MSc Financial Engineering student building toward quantitative development through C++, algorithms, market microstructure, and measured systems work.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a className="primary-action" href="#work">Explore my work <ArrowDownRight aria-hidden="true" /></a>
            <a className="secondary-action" href="https://codeforces.com/profile/Deshmukh19" target="_blank" rel="noreferrer">Codeforces · Expert <ArrowUpRight aria-hidden="true" /></a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-7">
            <div><p className="stat-value">1614</p><p className="stat-label">Codeforces rating</p></div>
            <div><p className="stat-value">C++17</p><p className="stat-label">Current systems stack</p></div>
            <div><p className="stat-value">MScFE</p><p className="stat-label">Incoming at WQU</p></div>
          </div>
        </div>

        <div className="orderbook-shell" aria-label="Illustrative limit order book interface">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200"><Code2 aria-hidden="true" className="size-4" /></span>
              <div><p className="font-mono text-sm font-semibold text-white">LOB_ENGINE / SIM</p><p className="text-xs text-slate-500">price-time priority · deterministic replay</p></div>
            </div>
            <Badge className="border border-amber-300/20 bg-amber-300/10 text-amber-200">IN PROGRESS</Badge>
          </div>
          <div className="grid grid-cols-3 border-b border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-slate-500"><span>Side</span><span>Price</span><span className="text-right">Quantity</span></div>
          <div className="px-3 py-3">
            {asks.map((row) => <div key={row.price} className="book-row"><span className="book-bar ask-bar" style={{ width: row.width }} /><span className="relative z-10 text-rose-300">ASK</span><span className="relative z-10 text-white">{row.price}</span><span className="relative z-10 text-right text-slate-300">{row.quantity}</span></div>)}
            <div className="my-2 flex items-center justify-between rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-2 font-mono text-xs text-cyan-200"><span>SPREAD</span><span>0.03 · 2.97 bps</span></div>
            {bids.map((row) => <div key={row.price} className="book-row"><span className="book-bar bid-bar" style={{ width: row.width }} /><span className="relative z-10 text-emerald-300">BID</span><span className="relative z-10 text-white">{row.price}</span><span className="relative z-10 text-right text-slate-300">{row.quantity}</span></div>)}
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 p-4"><div className="metric-cell"><span>Orders</span><strong>06</strong></div><div className="metric-cell"><span>Trades</span><strong>02</strong></div><div className="metric-cell"><span>State</span><strong className="text-emerald-300">VALID</strong></div></div>
        </div>
      </section>

      <section id="work" className="content-section section-rule">
        <div className="section-heading">
          <div><p className="section-kicker">01 / SELECTED WORK</p><h2>Proof, not a list of tools.</h2></div>
          <p>One serious system, documented from first invariant to final benchmark. The portfolio will expand as the work becomes real.</p>
        </div>

        <div className="work-grid">
          <Card className="feature-card col-span-full overflow-hidden py-0 lg:col-span-8">
            <CardHeader className="gap-5 px-6 pt-7 sm:px-8 sm:pt-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge className="border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">FLAGSHIP · IN PROGRESS</Badge>
                <span className="font-mono text-xs text-slate-500">C++17 / CMAKE / TESTS</span>
              </div>
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">Limit Order Book & Matching Engine</h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">A deterministic electronic order book implementing price-time priority, crossing logic, partial fills, cancellations, integer tick pricing, and book-state validation. Built as the base for an original market-microstructure research study.</p>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-7 sm:px-8 sm:pb-9">
              <div className="feature-code-grid">
                <div><span>Matching</span><strong>price → time → fill</strong></div>
                <div><span>Correctness</span><strong>deterministic tests</strong></div>
                <div><span>Research next</span><strong>Monte Carlo order flow</strong></div>
              </div>
              <a className="project-cta" href="/projects/order-book">View engineering notebook <ArrowRight aria-hidden="true" /></a>
            </CardContent>
          </Card>

          <Card className="signal-card col-span-full py-0 sm:col-span-6 lg:col-span-4">
            <CardHeader className="px-6 pt-7"><TerminalSquare className="size-6 text-violet-300" /><p className="card-label">COMPETITIVE PROGRAMMING</p><h3>Codeforces Expert</h3></CardHeader>
            <CardContent className="px-6 pb-7"><p>Rating 1614 across 11 rated contests, with a best contest rank of 166 and consistent work across algorithms, greedy methods, implementation, and mathematics.</p><ArrowLink href="https://codeforces.com/profile/Deshmukh19">View profile</ArrowLink></CardContent>
          </Card>

          <Card className="signal-card col-span-full py-0 sm:col-span-6">
            <CardHeader className="px-6 pt-7"><Database className="size-6 text-cyan-300" /><p className="card-label">SOFTWARE ENGINEERING</p><h3>Production foundations</h3></CardHeader>
            <CardContent className="px-6 pb-7"><p>Working across TypeScript, React, Python, PostgreSQL, Git, and application systems at CapSurge while sharpening the lower-level skills used in quantitative infrastructure.</p></CardContent>
          </Card>

          <Card className="signal-card col-span-full py-0 sm:col-span-6">
            <CardHeader className="px-6 pt-7"><FlaskConical className="size-6 text-emerald-300" /><p className="card-label">PROJECT PIPELINE</p><h3>Evidence as it arrives</h3></CardHeader>
            <CardContent className="px-6 pb-7"><p>Future work will appear only after it has code, tests, analysis, and a clear explanation. Current focus stays on the matching engine and its research extension.</p></CardContent>
          </Card>
        </div>
      </section>

      <section id="research" className="content-section section-rule">
        <div className="section-heading">
          <div><p className="section-kicker">02 / RESEARCH DIRECTION</p><h2>From implementation to an answerable question.</h2></div>
          <p>The software system is the artifact. The controlled experiment and the result become the paper.</p>
        </div>

        <div className="research-panel">
          <div className="research-copy">
            <Badge className="mb-5 border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">WORKING QUESTION</Badge>
            <h3>How do order-book data structures behave under changing liquidity and burst-load regimes?</h3>
            <p>The planned study will compare correctness, throughput, and tail latency under dense and sparse books, different cancel-to-add ratios, normal and bursty arrivals, and deterministic Monte Carlo order-flow scenarios.</p>
            <a className="project-cta" href="/projects/order-book">Read the research plan <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="experiment-grid" aria-label="Planned experiment sequence">
            <div><span>01</span><strong>Baseline</strong><p>Correct engine and repeatable workload.</p></div>
            <div><span>02</span><strong>Variants</strong><p>Alternative book, lookup, and queue designs.</p></div>
            <div><span>03</span><strong>Measure</strong><p>p50 through p99.9 latency and throughput.</p></div>
            <div><span>04</span><strong>Explain</strong><p>Results, limits, and reproducible evidence.</p></div>
          </div>
        </div>
      </section>

      <section id="about" className="content-section section-rule">
        <div className="section-heading">
          <div><p className="section-kicker">03 / CURRENT FOCUS</p><h2>Building the bridge deliberately.</h2></div>
          <p>My path combines software delivery, computer science, competitive programming, and formal financial-engineering study.</p>
        </div>
        <div className="focus-grid">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article key={title} className="focus-item"><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section id="journey" className="content-section section-rule">
        <div className="section-heading">
          <div><p className="section-kicker">04 / JOURNEY</p><h2>Experience and education.</h2></div>
          <p>The direction is quantitative development; the foundation is practical software engineering.</p>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article key={`${item.title}-${item.place}`} className="timeline-item">
              <p className="timeline-date">{item.date}</p>
              <div><h3>{item.title}</h3><p className="timeline-place">{item.place}</p><p className="timeline-detail">{item.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="closing-panel">
          <div>
            <p className="section-kicker">THE WORK IS EARLY. THE DIRECTION IS CLEAR.</p>
            <h2>Follow the build as it becomes evidence.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="primary-action" href="https://www.linkedin.com/in/om-deshmukh-298165236" target="_blank" rel="noreferrer"><ExternalLinkIcon /> LinkedIn</a>
            <a className="secondary-action" href="https://leetcode.com/u/ExpertD19/" target="_blank" rel="noreferrer"><Code2 /> LeetCode</a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 border-t border-white/10 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
        <p>© 2026 Om Deshmukh</p>
        <p className="font-mono text-xs">ENGINEER · LEARN · MEASURE · EXPLAIN</p>
      </footer>
    </main>
  );
}

function ExternalLinkIcon() {
  return <ArrowUpRight aria-hidden="true" />;
}
