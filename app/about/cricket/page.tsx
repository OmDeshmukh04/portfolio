import type { Metadata } from "next";
import { PageHeading, AboutNav } from "@/components/page-heading";

export const metadata: Metadata = { title: "Cricket | Om Deshmukh" };

export default function Cricket() {
  return <main className="page about-page">
    <PageHeading eyebrow="Cricket" title="Rohit Sharma fanboy">
      <p>The 264 and that 2024 World Cup trophy lift are two moments I never tire of watching.</p>
    </PageHeading>
    <AboutNav active="cricket" />
    <article className="cricket-story">
      <figure>
        <img src="/photos/india-2024-trophy.webp" alt="Rohit Sharma and the India team lifting the 2024 ICC Men's T20 World Cup trophy" />
        <figcaption>India’s 2024 T20 World Cup celebration · Photo: ICC / Getty Images · <a href="https://www.icc-cricket.com/photos/album/india-celebrate-winning-the-icc-men-s-t20-world-cup-2024" target="_blank" rel="noreferrer">Official gallery</a></figcaption>
      </figure>
      <h2>29 June 2024. That trophy lift.</h2>
      <p>India beat South Africa by seven runs. I still go back to the moment Rohit lifted the trophy.</p>
      <p className="source"><a href="https://www.icc-cricket.com/news/rohit-sharma-reflects-on-india-s-t20-world-cup-triumph" target="_blank" rel="noreferrer">ICC: Rohit reflects on the World Cup triumph</a></p>
    </article>
    <section className="section">
      <div className="columns">
        <figure>
          <img src="/photos/rohit-264.webp" alt="Rohit Sharma raising his bat during his 264-run innings against Sri Lanka" loading="lazy" style={{ borderRadius: 4 }} />
          <figcaption>Photo: <a href="https://www.bcci.tv/news/article/report-india-vs-sri-lanka-4th-odi" target="_blank" rel="noreferrer">BCCI · India vs Sri Lanka, fourth ODI</a></figcaption>
        </figure>
        <div>
          <span className="cricket-number">264</span>
          <h2>An innings I still revisit.</h2>
          <p>173 balls against Sri Lanka at Eden Gardens in 2014. One of my favourite Rohit innings.</p>
        </div>
      </div>
    </section>
    <blockquote className="cricket-quote">The pull shot never gets old.</blockquote>
  </main>;
}
