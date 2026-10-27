import Link from "next/link";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ProjectVisual } from "@/components/project-visual";
import { WebsiteWorkSection } from "@/components/website-work";

export default function Home() {
  return <main className="home-page">
    <section className="home-intro">
      <div className="home-intro-copy">
        <p className="eyebrow">Software engineer · Pune, India</p>
        <h1>Hi, I’m Om.</h1>
        <p><span className="intro-desktop">I’m a software engineer at CapSurge and an M.Tech student at JSPM University. I’m interested in C++, trading systems, and the details that make software run well.</span><span className="intro-mobile">I’m a software engineer at CapSurge, studying computer science and working toward quant development.</span></p>
        <p className="intro-personal">I’m working toward quant development, one project at a time. Away from my desk, it’s usually a trek in the Sahyadris or a cricket match.</p>
        <div className="text-links"><Link href="/projects">Explore my projects</Link><Link href="/resume">Read my résumé</Link></div>
      </div>
      <figure className="home-portrait"><img src="/photos/om-deshmukh.png" alt="Om Deshmukh" width="1254" height="1254" fetchPriority="high" /></figure>
    </section>
    <section className="home-work" aria-labelledby="home-work-title">
      <div className="section-heading"><h2 id="home-work-title">What I’m working on</h2><Link className="section-link" href="/projects">All projects</Link></div>
      <div className="home-projects">
        <article className="home-project">
          <Link href="/projects/order-book" className="home-project-chart" aria-label="Open the limit order book project"><ProjectVisual kind="book" /></Link>
          <div className="home-project-copy"><p className="project-category">C++ · Market microstructure</p><h3><Link href="/projects/order-book">Limit Order Book</Link></h3><p>How orders match, queue, and fill. A C++ baseline with an interactive matching demo.</p><Link className="underlined" href="/projects/order-book">Try the demo & read the notes</Link></div>
        </article>
        <article className="home-project">
          <Link href="/projects/monte-carlo" className="home-project-chart" aria-label="Open the Monte Carlo simulation"><ProjectVisual kind="paths" /></Link>
          <div className="home-project-copy"><p className="project-category">Probability · Simulation</p><h3><Link href="/projects/monte-carlo">Monte Carlo Lab</Link></h3><p>A small experiment in uncertainty, simulated price paths, and the tail of a distribution.</p><Link className="underlined" href="/projects/monte-carlo">Explore the simulation</Link></div>
        </article>
      </div>
      <p className="home-lab-note">Also on my desk: <Link href="/projects/systems-lab">notes on Linux, memory, and parallel computing.</Link></p>
    </section>
    <WebsiteWorkSection compact />
    <section className="home-personal" aria-labelledby="home-personal-title">
      <div className="home-personal-photo"><div className="section-heading"><h2 id="home-personal-title">A little beyond the code</h2></div><HeroSlideshow /></div>
      <nav className="home-index" aria-label="More about Om">
        <Link href="/competitive-programming"><span>01</span><div><h3>Competitive programming</h3><p>350 LeetCode problems, plus Codeforces and CodeChef.</p></div></Link>
        <Link href="/education"><span>02</span><div><h3>Education</h3><p>From electrical engineering to computer science.</p></div></Link>
        <Link href="/about"><span>03</span><div><h3>Off the clock</h3><p>Sahyadri trails, my camera, and Rohit Sharma.</p></div></Link>
      </nav>
    </section>
  </main>;
}
