import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { OrderBookDemo } from "@/components/order-book-demo";
import { ProjectCaseStudy } from "@/components/project-case-study";

export const metadata: Metadata = { title: "Limit Order Book | Om Deshmukh" };
export default function OrderBook() {
  return <main className="page">
    <Link className="back-link" href="/projects">All projects</Link>
    <PageHeading eyebrow="C++17 · Market microstructure" title="Limit Order Book & Matching Engine"><p>I wanted to understand what actually happens when an order reaches an exchange. This is my starting point: match the best price first, preserve time priority, and account for every fill.</p></PageHeading>
    <OrderBookDemo />
    <div className="text-links"><a href="/downloads/quant-lob-engine.zip" download>Download C++ source</a><Link href="/projects/monte-carlo">Try the separate Monte Carlo demo</Link></div>
    <ProjectCaseStudy status="Baseline built · Research in progress"
      problem={<p>A single incoming order can consume several resting orders, leave a partial fill, or become a new price level. The book needs to remain consistent through all of those changes.</p>}
      approach={<><p>The C++17 implementation uses ordered price levels and a FIFO queue at each level. Prices are integer ticks, so matching does not depend on floating-point rounding.</p><ul><li>Price-time priority, partial fills, and resting quantities.</li><li>Cancellation by order ID and top-of-book snapshots.</li><li>A CMake build, a command-line example, and deterministic checks.</li></ul><p className="source">The live demo above is a separate TypeScript model. The downloadable source contains the C++ implementation.</p></>}
      result={<><p className="case-result-line">120 matched. 30 left on the ask.</p><p>In the native C++ check, two sell orders of 100 and 50 share a price. A buy for 120 fills the first order completely, then takes 20 from the second. The remaining 30 stays on the book. Cancellation and the final traded quantity also pass their checks.</p><p className="source">Verified with the included basic_test.cpp. This checks correctness; latency and throughput have not been measured yet.</p></>}
      next={<p>This matching engine is one module in my broader C++20 Trading Systems Laboratory, which also covers historical market data, deterministic replay, risk controls, recovery, and performance experiments.</p>}
    />
  </main>;
}
