import type { Metadata } from "next";
import { PageHeading, AboutNav } from "@/components/page-heading";
import { TrekGallery } from "@/components/trek-gallery";

export const metadata: Metadata = { title: "Trekking & Photography | Om Deshmukh" };
export default function Trekking() {
  return <main className="page"><PageHeading eyebrow="The Sahyadris, through my lens" title="On the trail"><p>I really like trekking. Kalsubai, Ratangad, Harishchandragad — give me a trail in the Sahyadris and I’m interested. I take a lot of photographs along the way; this page is where some of them have ended up.</p></PageHeading><AboutNav /><div className="trail-meta"><div><strong>Kalsubai</strong><span>1,646 m · Maharashtra’s highest peak</span></div><div><strong>Ratangad</strong><span>Fort trails & mountain views</span></div><div><strong>Harishchandragad</strong><span>Stone paths & Sahyadri ridges</span></div></div><TrekGallery /><section className="section"><h2>What I bring back</h2><div className="columns"><p>Some of my favourite photos aren’t from the summit at all. They’re the flowers beside the trail, an old fort gate, or a ridge that almost disappears into the clouds.</p><p>There are photos here from my trekking collection around Kalsubai, Ratangad, and Harishchandragad. Have a look through. The gallery moves on its own, but you can pause it if a view catches your eye.</p></div><p className="source">Trail information: <a href="https://maharashtratourism.gov.in/nature/kalsubai-peak/" target="_blank" rel="noreferrer">Maharashtra Tourism</a>.</p></section></main>;
}
