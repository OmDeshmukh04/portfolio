import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSlideshow } from "@/components/hero-slideshow";

export default function Home() {
  return <main className="home-page">
    <section className="home-intro"><div className="home-intro-copy"><p className="eyebrow">Software engineer · Pune, India</p><h1>Hi, I’m Om.</h1><p>I’m a software engineer at CapSurge, studying computer science at JSPM University and working toward a career in quant development.</p><p>Right now, that means a lot of C++, an order-book project, and questions about how computers actually run the code I write. Away from the keyboard, you’ll find me trekking in the Sahyadris or watching Rohit Sharma highlights. Probably again.</p><div className="text-links"><Link href="/projects">See what I’m building <ArrowUpRight /></Link><Link href="/resume">My résumé <ArrowUpRight /></Link></div></div><figure className="home-portrait"><img src="/photos/om-deshmukh.png" alt="Om Deshmukh" width="1254" height="1254" fetchPriority="high" /></figure></section>
    <HeroSlideshow />
    <section className="home-bottom"><div><p className="eyebrow">On my desk</p><h2>An order book, and a few experiments.</h2><p>I wanted to understand what happens when an order reaches an exchange, so I started building a matching engine. There’s also a Monte Carlo demo to play with while I work on the next parts.</p><Link className="underlined" href="/projects">Take a look at the projects</Link></div><div className="home-index"><Link href="/competitive-programming"><span>01</span><div><h3>Competitive programming</h3><p>Codeforces · LeetCode · CodeChef</p></div><ArrowUpRight /></Link><Link href="/education"><span>02</span><div><h3>Education</h3><p>Electrical engineering, computer science, and what’s next.</p></div><ArrowUpRight /></Link><Link href="/about"><span>03</span><div><h3>Away from the keyboard</h3><p>Mountain trails, photographs, and Rohit Sharma.</p></div><ArrowUpRight /></Link></div></section>
  </main>;
}
