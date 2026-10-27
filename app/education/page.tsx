import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Education | Om Deshmukh" };

export default function Education() {
  return <main className="page education-page">
    <PageHeading eyebrow="Electrical engineering → computer science → finance" title="Education" />

    <section className="portfolio-timeline education-timeline" aria-label="Education timeline">
      <article className="portfolio-timeline-item">
        <div className="portfolio-timeline-card">
          <span className="portfolio-timeline-date">Incoming cohort · Admitted</span>
          <h3>MSc · Financial Engineering</h3>
          <h4>WorldQuant University</h4>
          <img className="education-wqu-logo" src="/photos/wqu-logo.svg" alt="WorldQuant University logo" />
          <p>Admitted to the upcoming cohort; classes have not started yet.</p>
          <a className="underlined" href="https://www.wqu.edu/" target="_blank" rel="noreferrer">About the university ↗</a>
        </div>
        <span className="portfolio-timeline-icon" aria-hidden="true"><GraduationCap size={17} /></span>
      </article>

      <article className="portfolio-timeline-item">
        <div className="portfolio-timeline-card">
          <time className="portfolio-timeline-date" dateTime="2025">2025 – 2027 expected</time>
          <h3>M.Tech · Computer Science</h3>
          <h4>JSPM University, Pune</h4>
          <figure className="education-campus-figure">
            <img src="/photos/jspm-campus.webp" alt="JSPM University building overlooking the campus fountain" />
            <figcaption>JSPM University · <a href="https://jspmuni.ac.in/jspm-university" target="_blank" rel="noreferrer">Campus</a></figcaption>
          </figure>
          <p className="education-result">Pursuing · CGPA 8.0 / 10</p>
        </div>
        <span className="portfolio-timeline-icon" aria-hidden="true"><GraduationCap size={17} /></span>
      </article>

      <article className="portfolio-timeline-item">
        <div className="portfolio-timeline-card">
          <span className="portfolio-timeline-date">2019 – 2023</span>
          <h3>B.E. · Electrical Engineering</h3>
          <h4>AISSMS College of Engineering, Pune</h4>
          <figure className="education-campus-figure">
            <img src="/photos/aissms-campus.webp" alt="AISSMS College of Engineering campus in Pune" />
            <figcaption>AISSMS College of Engineering · <a href="https://aissmscoe.com/" target="_blank" rel="noreferrer">Campus</a></figcaption>
          </figure>
          <p className="education-result">Completed · CGPA 7.5 / 10</p>
        </div>
        <span className="portfolio-timeline-icon" aria-hidden="true"><GraduationCap size={17} /></span>
      </article>
    </section>

    <section className="section education-notes">
      <h2>Study notes</h2>
      <div className="note-grid">
        <div className="study-note"><h3>Signals → systems</h3><p>dx / dt = Ax + Bu</p></div>
        <div className="study-note"><h3>Complexity</h3><p>Tree · O(log n)</p><p>Scan · O(n)</p></div>
        <div className="study-note"><h3>Parallel speedup</h3><p>S(p) = 1 / [(1 − f) + f/p]</p></div>
      </div>
    </section>
  </main>;
}
