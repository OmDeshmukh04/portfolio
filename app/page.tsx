import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JourneyScene } from "@/components/journey-scene";

const homepageProfiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/om-deshmukh-298165236/" },
  { label: "GitHub", href: "https://github.com/OmDeshmukh04" },
  { label: "LeetCode", href: "https://leetcode.com/u/ExpertD19/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/Om_Deshmukh_" },
];

export default function Home() {
  return <main className="home-page">
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-introduction">
        <figure className="home-avatar"><img src="/photos/om-deshmukh.png" alt="Om Deshmukh" width="1254" height="1254" fetchPriority="high" /></figure>
        <p className="eyebrow">Software engineer · Pune, India</p>
        <h1 id="home-title">Hi, I’m Om.</h1>
        <p className="home-lede">I’m a software engineer at CapSurge, studying computer science and building toward <span>quantitative development.</span></p>
        <div className="home-actions">
          <Link className="home-primary-action" href="/projects">Explore projects <ArrowRight aria-hidden="true" /></Link>
          <Link className="home-secondary-action" href="/resume">Read résumé <ArrowRight aria-hidden="true" /></Link>
        </div>
        <nav className="home-profile-links" aria-label="Professional and coding profiles">
          {homepageProfiles.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight aria-hidden="true" /></a>)}
        </nav>
      </div>
      <JourneyScene />
    </section>
  </main>;
}
