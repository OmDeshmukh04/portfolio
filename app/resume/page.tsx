import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = { title: "Résumé | Om Deshmukh" };

const skills = [
  ["Languages", "C++17, Python, SQL, JavaScript/TypeScript"],
  ["Systems", "Linux, concurrency, memory layout, sockets, CMake, Git"],
  ["Data", "PostgreSQL, schema and index design, validation, reconciliation"],
  ["Quantitative", "Monte Carlo simulation, probability, VaR & Expected Shortfall, market microstructure"],
  ["Foundations", "Data structures & algorithms, complexity analysis, profiling and measurement"],
];

export default function Resume() {
  return <main className="page">
    <PageHeading eyebrow="Experience · education · projects" title="Résumé">
      <p>Here’s the short version of my work, projects, and education. You can read it below, print this page, or download my one-page résumé.</p>
    </PageHeading>

    <div className="resume-actions">
      <PrintButton />
      <a className="button-link secondary" href="/resume/Om_Deshmukh_2027.pdf" download>Download résumé ↓</a>
      <a className="button-link secondary" href="mailto:omdeshmukh1906@gmail.com">Email me ↗</a>
      <a className="button-link secondary" href="https://www.linkedin.com/in/om-deshmukh-298165236/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
    </div>

    <article className="resume-doc">
      <header className="resume-head">
        <h2>Om Deshmukh</h2>
        <p className="degree">Software Engineer · Quantitative development in progress</p>
        <ul className="resume-contact">
          <li>Pune, India</li>
          <li><a href="mailto:omdeshmukh1906@gmail.com">omdeshmukh1906@gmail.com</a></li>
          <li><a href="https://github.com/OmDeshmukh04" target="_blank" rel="noreferrer">github.com/OmDeshmukh04</a></li>
          <li><a href="https://www.linkedin.com/in/om-deshmukh-298165236/" target="_blank" rel="noreferrer">linkedin.com/in/om-deshmukh-298165236</a></li>
        </ul>
      </header>

      <section className="resume-section">
        <h3>Summary</h3>
        <p>Software engineer building the data and automation behind financial-modeling workflows, with an M.Tech in Computer Science underway and an incoming MSc in Financial Engineering. I work in C++ and Python on systems where the same input has to produce the same result, failures stay traceable, and performance claims are measured rather than assumed.</p>
      </section>

      <section className="resume-section">
        <h3>Experience</h3>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>CapSurge</strong> <span>— Software Engineer, Full-time</span></div>
            <span className="date">March 2026 – Present · Pune</span>
          </div>
          <ul>
            <li>Build an automation engine that ingests provider data, validates and normalizes financial inputs, and produces reproducible reconciliation outputs for analysts — <strong>2,200+ records processed monthly across 13 data providers</strong>.</li>
            <li>Design tenant-isolated data services with composite PostgreSQL indexes and explicit data boundaries.</li>
            <li>Make reconciliation idempotent through deduplication keys, validation checks, and structured exception handling, so retries never create duplicate work.</li>
            <li>Define structured data contracts that cut integration turnaround for a new financial input by roughly <strong>40%</strong>.</li>
          </ul>
        </div>
      </section>

      <section className="resume-section">
        <h3>Projects</h3>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>Limit Order Book & Matching Engine</strong> <span>— C++17, CMake</span></div>
            <span className="date">In development</span>
          </div>
          <ul>
            <li>Matching engine with price-time priority, partial fills, cancellation, and integer tick pricing; a browser demo of the book runs on this site.</li>
            <li>Extending the baseline toward replayable order-flow experiments and latency measurement.</li>
          </ul>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>Monte Carlo Risk Simulation Lab</strong> <span>— Probability, risk</span></div>
            <span className="date">Browser demo available</span>
          </div>
          <ul>
            <li>Simulates geometric Brownian motion, inspects terminal price distributions, and computes 95% Value at Risk and Expected Shortfall.</li>
          </ul>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>Linux Systems & HPC Learning Lab</strong> <span>— C++, Linux, concurrency</span></div>
            <span className="date">In progress</span>
          </div>
          <ul>
            <li>Working notebook on processes, threads, sockets, memory layout, and performance, aimed at a repeatable benchmark harness for throughput and tail latency.</li>
          </ul>
        </div>
      </section>

      <section className="resume-section">
        <h3>Education</h3>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>WorldQuant University</strong> <span>— MSc, Financial Engineering</span></div>
            <span className="date">Incoming cohort</span>
          </div>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>JSPM University, Pune</strong> <span>— M.Tech, Computer Science · CGPA 8.0 / 10</span></div>
            <span className="date">2025 – 2027 expected</span>
          </div>
          <ul><li>Focus on data structures and algorithms, computer systems and databases, and HPC topics: cache locality, parallel decomposition, and synchronization cost.</li></ul>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <div><strong>AISSMS College of Engineering, Pune</strong> <span>— B.E., Electrical Engineering · CGPA 7.5 / 10</span></div>
            <span className="date">2019 – 2023</span>
          </div>
          <ul><li>Mathematical modeling, signals and control, and numerical reasoning — the groundwork for approximation, precision, and error in simulation software.</li></ul>
        </div>
      </section>

      <section className="resume-section">
        <h3>Competitive Programming</h3>
        <ul className="resume-inline-list">
          <li><strong>Codeforces</strong> — <a href="https://codeforces.com/profile/Deshmukh19" target="_blank" rel="noreferrer">Deshmukh19</a>, Expert</li>
          <li><strong>LeetCode</strong> — <a href="https://leetcode.com/u/ExpertD19/" target="_blank" rel="noreferrer">ExpertD19</a>, Knight, 350 problems solved</li>
          <li><strong>CodeChef</strong> — <a href="https://www.codechef.com/users/om_deshmukh_19" target="_blank" rel="noreferrer">om_deshmukh_19</a>, contest practice</li>
        </ul>
        <p className="small muted">Practice areas: graphs and shortest paths, dynamic programming, range-query structures, and binary search on the answer.</p>
      </section>

      <section className="resume-section">
        <h3>Skills</h3>
        <dl className="resume-skills">{skills.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
    </article>

    <p className="source no-print">Prefer the long version? The <Link href="/experience">experience</Link>, <Link href="/projects">projects</Link>, and <Link href="/education">education</Link> pages go into more detail.</p>
  </main>;
}
