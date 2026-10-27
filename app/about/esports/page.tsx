import type { Metadata } from "next";
import { PageHeading, AboutNav } from "@/components/page-heading";

export const metadata: Metadata = { title: "BGMI Esports | Om Deshmukh" };

const titleMoments = [
  {
    event: "BGIS 2026",
    image: "https://media.assettype.com/outlook-respawn/2026-03-30/4wxilpib/image-1200x630-77.jpg",
    alt: "Team Soul, including LEGIT, celebrating their BGIS 2026 win",
    source: "https://respawn.outlookindia.com/gaming/gaming-news/bgis-2026-hits-600k-viewers-as-iqoo-soul-wins-in-chennai",
    credit: "Photo: Outlook Respawn",
  },
  {
    event: "BMSD 2026",
    image: "https://staticg.sportskeeda.com/editor/2026/10/a91e5-17923297935188-1920.jpg",
    alt: "Team Soul celebrating the BMSD 2026 title, with LEGIT among the winning squad",
    source: "https://dujseks5cqq0r.cloudfront.net/bgmi/news-team-soul-wins-bmsd-2026-qualifies-pmgc",
    credit: "Photo via KRAFTON India Esports",
  },
];

const favouritePlayers = [
  {
    name: "SPOWER",
    image: "https://liquipedia.net/commons/images/e/ea/Godl_Spower.JPG",
    alt: "SPOWER in an esports jersey",
    source: "https://liquipedia.net/pubgmobile/Spower",
  },
  {
    name: "SPRAYGOD",
    image: "https://media.esportsverse.in/players/SPRAYGOD_mkrwwt.webp",
    alt: "SPRAYGOD in a BGMI jersey",
    source: "https://www.esportsverse.in/players/spraygod",
  },
  {
    name: "LEGIT",
    image: "https://liquipedia.net/commons/images/f/fa/Soul_Legit_2026.png",
    alt: "LEGIT in a Team Soul jersey",
    source: "https://liquipedia.net/pubgmobile/LEGIT",
  },
];

export default function Esports() {
  return <main className="page about-page">
    <PageHeading eyebrow="BGMI" title="Esports fan" />
    <AboutNav active="esports" />
    <section className="bgmi-trophy-section" aria-labelledby="bgmi-moments-title">
      <header className="bgmi-section-heading">
        <p className="eyebrow">Team Soul</p>
        <h2 id="bgmi-moments-title">Two trophy moments</h2>
      </header>
      <div className="bgmi-trophy-grid">
        {titleMoments.map((moment) => <a className="bgmi-trophy-card" key={moment.event} href={moment.source} target="_blank" rel="noreferrer">
          <img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" />
          <span className="bgmi-trophy-caption">
            <strong>{moment.event}</strong>
            <span>{moment.credit} ↗</span>
          </span>
        </a>)}
      </div>
    </section>
    <section className="bgmi-favourites" aria-labelledby="bgmi-favourites-title">
      <header className="bgmi-section-heading">
        <h2 id="bgmi-favourites-title">Favourite players</h2>
      </header>
      <div className="bgmi-player-grid">
        {favouritePlayers.map((player) => <a className="bgmi-player-card" key={player.name} href={player.source} target="_blank" rel="noreferrer">
          <img src={player.image} alt={player.alt} loading="lazy" decoding="async" />
          <span>{player.name}</span>
        </a>)}
      </div>
    </section>
  </main>;
}
