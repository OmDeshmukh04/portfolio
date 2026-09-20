/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, GraduationCap, Mountain, Trophy } from "lucide-react";
import { OrderBookDemo } from "@/components/order-book-demo";

const trekkingPhotos = Array.from({ length: 17 }, (_, index) => `/photos/trek-${String(index + 1).padStart(2, "0")}.jpg`);

const profiles = [
  { platform: "Codeforces", handle: "Deshmukh19", signal: "Expert · 1614", detail: "11 rated contests · best rank 166", href: "https://codeforces.com/profile/Deshmukh19" },
  { platform: "LeetCode", handle: "ExpertD19", signal: "Algorithms", detail: "Interview-style problem solving", href: "https://leetcode.com/u/ExpertD19/" },
  { platform: "CodeChef", handle: "om_deshmukh_19", signal: "Competitive coding", detail: "Contests and problem practice", href: "https://www.codechef.com/users/om_deshmukh_19" },
];

export default function Home() {
  return (
    <main className="portfolio-page">
      <section id="top" className="personal-hero">
        <header className="personal-nav">
          <a className="wordmark" href="#top" aria-label="Om Deshmukh, home"><TridentMark /><span>OM DESHMUKH</span></a>
          <nav aria-label="Primary navigation">
            <a href="#projects">Projects</a><a href="#education">Education</a><a href="#experience">Experience</a><a href="#about">About</a>
          </nav>
        </header>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="hero-overline"><span /> Pune, India · Software engineer</p>
          <h1>I build systems,<br />study markets,<br /><em>and keep climbing.</em></h1>
          <p className="hero-intro">I&apos;m Om Deshmukh — a software engineer building toward quantitative development through C++, competitive programming, financial engineering, and serious project work.</p>
          <div className="hero-links">
            <a href="#projects" className="light-button">See the work <ArrowDown /></a>
            <a href="https://www.linkedin.com/in/om-deshmukh-298165236" target="_blank" rel="noreferrer" className="ghost-button">LinkedIn <ArrowUpRight /></a>
          </div>
        </div>
        <div className="hero-index"><span>01</span><div /><p>ENGINEER · TREKKER · QUANT IN PROGRESS</p></div>
      </section>

      <section className="paper-section competitive-section" aria-labelledby="competitive-title">
        <div className="section-intro compact-intro">
          <p className="chapter">COMPETITIVE PROGRAMMING</p><h2 id="competitive-title">Algorithms under pressure.</h2>
          <p>Contest programming is where I train speed, precision, and the habit of turning an unfamiliar problem into working code.</p>
        </div>
        <div className="profile-grid">
          {profiles.map((profile, index) => (
            <a key={profile.platform} className="profile-card" href={profile.href} target="_blank" rel="noreferrer">
              <span className="profile-number">0{index + 1}</span><Trophy aria-hidden="true" /><p>{profile.platform}</p><h3>{profile.handle}</h3>
              <strong>{profile.signal}</strong><small>{profile.detail}</small><ArrowUpRight className="profile-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section id="projects" className="dark-section project-showcase">
        <div className="section-intro inverse">
          <p className="chapter">01 / PROJECTS</p><h2>Built to be opened,<br />tested, and questioned.</h2>
          <p>The flagship project is a ground-up C++17 limit order book. The demo below makes its core rule visible: best price first, then earliest order at that price.</p>
        </div>
        <div className="project-title-row">
          <div><span className="status-chip">IN PROGRESS</span><h3>Limit Order Book<br />& Matching Engine</h3></div>
          <div className="project-meta"><p>C++17 · CMake · deterministic tests</p><p>Monte Carlo order flow and latency study next</p><Link href="/projects/order-book">Read the engineering notebook <ArrowRight /></Link></div>
        </div>
        <OrderBookDemo />
      </section>

      <section id="education" className="paper-section education-section">
        <div className="section-intro">
          <p className="chapter">02 / EDUCATION</p><h2>From electrical systems<br />to computational finance.</h2>
          <p>The path is unconventional, but every stage adds something useful: physical systems, computer science, software engineering, and now markets.</p>
        </div>
        <div className="education-grid">
          <article className="education-card education-aissms">
            <div className="education-photo"><img src="/photos/aissms-campus.jpg" alt="AISSMS College of Engineering campus in Pune" /></div>
            <div className="education-copy"><span>FOUNDATION</span><h3>B.E. Electrical Engineering</h3><p>AISSMS College of Engineering, Pune</p><small>Circuits, control, mathematics, and engineering fundamentals.</small></div>
            <p className="hand-note note-one">where systems thinking began ↗</p>
          </article>
          <article className="education-card education-jspm">
            <div className="education-photo"><img src="/photos/jspm-campus.jpg" alt="Tree-lined road at JSPM University Pune's Wagholi campus" /></div>
            <div className="education-copy"><span>CURRENT</span><h3>M.Tech Computer Science</h3><p>JSPM University Pune</p><small>Using the order-book engine as a substantial systems and research project.</small></div>
            <p className="hand-note note-two">build it → measure it → explain it</p>
          </article>
          <article className="education-card education-wqu">
            <div className="wqu-pattern"><GraduationCap /><span>WORLDQUANT UNIVERSITY</span></div>
            <div className="education-copy"><span>INCOMING · OCT 2026</span><h3>MSc Financial Engineering</h3><p>WorldQuant University</p><small>Financial data, probability, statistics, econometrics, machine learning, and computational finance.</small></div>
            <p className="hand-note note-three">software + markets = the direction</p>
          </article>
        </div>
        <p className="source-note">Campus imagery: official AISSMS COE and JSPM University galleries.</p>
      </section>

      <section id="experience" className="ink-section">
        <div className="section-intro inverse compact-intro"><p className="chapter">03 / EXPERIENCE</p><h2>Shipping software in the real world.</h2></div>
        <article className="experience-card">
          <div className="experience-icon"><BriefcaseBusiness /></div>
          <div><span>MAR 2026 — PRESENT</span><h3>Software Engineer</h3><p>CapSurge · Pune</p></div>
          <p>Building and maintaining application systems with TypeScript, React, Python, PostgreSQL, Git, and production-oriented engineering workflows.</p>
        </article>
      </section>

      <section id="about" className="paper-section about-section">
        <div className="about-heading">
          <div><p className="chapter">04 / BEYOND CODE</p><h2>I find perspective<br />above the clouds.</h2></div>
          <div className="about-copy"><Mountain /><p>Trekking is the other serious practice in my life: patience on the climb, calm under uncertainty, and a better view after sustained effort. Every photograph here is from my own trail.</p></div>
        </div>
        <div className="trek-gallery" aria-label="Trekking photographs by Om Deshmukh">
          {trekkingPhotos.map((photo, index) => <figure key={photo} className={`trek-photo trek-photo-${index + 1}`}><img src={photo} alt={`Mountain and monsoon trekking view ${index + 1}`} loading={index > 3 ? "lazy" : undefined} /></figure>)}
        </div>
        <div className="cricket-card">
          <div className="cricket-number">45</div>
          <div><p className="chapter">CRICKET</p><h3>Rohit Sharma fan.<br />Timing over noise.</h3><p>I follow cricket closely and admire the calm, timing, and effortless-looking execution Rohit Sharma brings to the game.</p></div>
          <div className="seam" aria-hidden="true" />
        </div>
      </section>

      <footer className="portfolio-footer">
        <div className="wordmark"><TridentMark /><span>OM DESHMUKH</span></div>
        <p>Software engineer building toward quantitative development.</p>
        <div><a href="https://codeforces.com/profile/Deshmukh19" target="_blank" rel="noreferrer">Codeforces <ArrowUpRight /></a><a href="https://www.linkedin.com/in/om-deshmukh-298165236" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></div>
      </footer>
    </main>
  );
}

function TridentMark() {
  return <svg className="trident-mark" viewBox="0 0 32 38" role="img" aria-label="Trident mark"><path d="M16 3v30M16 12c-6 0-10-3-10-8v8c0 6 4 10 10 10m0-10c6 0 10-3 10-8v8c0 6-4 10-10 10M11 33h10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 2l-2.5 4h5L16 2ZM6 3 3.5 7h5L6 3Zm20 0-2.5 4h5L26 3Z" fill="currentColor" /></svg>;
}
