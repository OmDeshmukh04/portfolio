import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { MonteCarloDemo } from "@/components/monte-carlo-demo";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { runSimulation } from "@/lib/monte-carlo";

export const metadata: Metadata = { title: "Monte Carlo Lab | Om Deshmukh" };
export default function MonteCarlo() {
  const reference = runSimulation(25, 252, 19);
  return <main className="page">
    <Link className="back-link" href="/projects">All projects</Link>
    <PageHeading eyebrow="Probability · Simulation · Browser experiment" title="Monte Carlo Risk Simulation Lab"><p>I built this to make probability less abstract. Change the volatility or time horizon, then look at how the price paths spread out and what happens to the worst outcomes.</p></PageHeading>
    <MonteCarloDemo />
    <ProjectCaseStudy status="Interactive demo available"
      problem={<p>An average outcome tells only part of the story. I wanted a way to look at a whole distribution and compare a loss threshold with the severity of the losses beyond it.</p>}
      approach={<><p>A seeded TypeScript simulation generates 2,000 geometric Brownian motion paths, each with 64 time steps. The chart shows 24 of those paths; the histogram and risk statistics use all 2,000 terminal values.</p><div className="formula">S(t + Δt) = S(t) · exp[(μ − σ²/2)Δt + σ√Δt · Z]<br />Z ~ N(0, 1)</div><p>95% Value at Risk is an empirical loss percentile. Expected Shortfall averages the worst 5% of losses. Reusing a seed makes an experiment repeatable.</p></>}
      result={<><p className="case-result-line">A reproducible reference run</p><p>Starting value 100, 25% annual volatility, 5% annual drift, a 252-calendar-day horizon, and seed 19.</p><dl className="reference-results"><div><dt>Mean terminal value</dt><dd>{reference.mean.toFixed(2)}</dd></div><div><dt>95% VaR · loss</dt><dd>{reference.var95.toFixed(2)}</dd></div><div><dt>95% ES · loss</dt><dd>{reference.es95.toFixed(2)}</dd></div></dl><p className="source">Same-seed repeatability and histogram totals are checked. These are synthetic model outputs, not observed market results.</p></>}
      next={<p>Convergence checks, comparisons across seeds, and a Python/NumPy workflow are next. The current model assumes constant drift and volatility; it does not include jumps, transaction costs, or market calibration. Stochastic order flow for the matching engine is a separate planned experiment.</p>}
    />
  </main>;
}
