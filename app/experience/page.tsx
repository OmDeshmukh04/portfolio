import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Experience | Om Deshmukh" };

export default function Experience() {
  return <main className="page experience-page">
    <PageHeading eyebrow="Work experience" title="Experience" />

    <section className="portfolio-timeline experience-timeline" aria-label="Professional experience timeline">
        <article className="portfolio-timeline-item">
          <div className="portfolio-timeline-card">
            <div className="portfolio-timeline-card-heading">
              <div>
                <time className="portfolio-timeline-date" dateTime="2026-09">Sep 2026 – Present</time>
                <h3>Software Engineer</h3>
                <h4>CapSurge · Full-time · Pune, India</h4>
              </div>
              <a className="experience-company-logo-link" href="https://capsurge.in/" target="_blank" rel="noreferrer" aria-label="Visit CapSurge website">
                <img className="experience-company-logo" src="/company-logos/capsurge.png" alt="CapSurge" />
              </a>
            </div>
          </div>
          <span className="portfolio-timeline-icon" aria-hidden="true"><Briefcase size={16} /></span>
        </article>

        <article className="portfolio-timeline-item">
          <div className="portfolio-timeline-card">
            <div className="portfolio-timeline-card-heading">
              <div>
                <time className="portfolio-timeline-date" dateTime="2026-03">Mar 2026 – Aug 2026</time>
                <h3>Software Development Intern</h3>
                <h4>CapSurge · Pune, India</h4>
              </div>
              <a className="experience-company-logo-link" href="https://capsurge.in/" target="_blank" rel="noreferrer" aria-label="Visit CapSurge website">
                <img className="experience-company-logo" src="/company-logos/capsurge.png" alt="CapSurge" />
              </a>
            </div>
            <ul className="experience-intern-points">
              <li>Built data-ingestion and reconciliation pipelines with normalization, deduplication keys, validation checks, and structured exception handling for analyst-facing workflows.</li>
            </ul>
          </div>
          <span className="portfolio-timeline-icon" aria-hidden="true"><Briefcase size={16} /></span>
        </article>

        <article className="portfolio-timeline-item">
          <div className="portfolio-timeline-card">
            <div className="portfolio-timeline-card-heading">
              <div>
                <time className="portfolio-timeline-date" dateTime="2021-12">Dec 2021 – Feb 2022</time>
                <h3>Project Engineer Intern</h3>
                <h4>Tata Communications</h4>
              </div>
              <a className="experience-company-logo-link tata-logo-link" href="https://www.tatacommunications.com/" target="_blank" rel="noreferrer" aria-label="Visit Tata Communications website">
                <img className="experience-company-logo tata-company-logo" src="/company-logos/tata-communications.svg" alt="Tata Communications" />
              </a>
            </div>
          </div>
          <span className="portfolio-timeline-icon" aria-hidden="true"><Briefcase size={16} /></span>
        </article>
    </section>

    <section className="section experience-featured-project" aria-labelledby="experience-projects-title">
      <header className="experience-project-header">
        <div>
          <p className="eyebrow">CapSurge</p>
          <h2 id="experience-projects-title">Project work</h2>
        </div>
      </header>
      <div className="experience-work-grid">
        <article className="experience-work-card">
          <h3>Healthcare systems</h3>
          <p>Built tenant-scoped APIs and ETL for patient, appointment, charge, and payment data, with validation and PostgreSQL storage.</p>
        </article>
        <article className="experience-work-card">
          <h3>Finance operations</h3>
          <p>Developed receivables and reconciliation workflows for data ingestion, matching, collection tracking, and review.</p>
        </article>
        <article className="experience-work-card">
          <h3>Financial analysis</h3>
          <p>Worked on KPI dashboards that turn financial models into period comparisons, driver views, and concise summaries.</p>
        </article>
        <article className="experience-work-card">
          <h3>IT consulting</h3>
          <p>Built business software for timesheets, operational data, dashboards, and reporting.</p>
        </article>
      </div>
      <p className="eyebrow experience-stack-label">Tools &amp; technologies</p>
      <div className="experience-project-stack" aria-label="Tools and technologies">
        {["Python", "FastAPI", "PostgreSQL", "AWS RDS", "SQLAlchemy", "Pandas", "React", "Git", "GitHub Actions", "Terraform"].map((technology) => <span key={technology}>{technology}</span>)}
      </div>
    </section>
  </main>;
}
