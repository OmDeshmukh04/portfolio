import type { Metadata } from "next";
import { PageHeading, AboutNav } from "@/components/page-heading";
import { TrekGallery } from "@/components/trek-gallery";

export const metadata: Metadata = { title: "Trekking & Photography | Om Deshmukh" };

export default function Trekking() {
  return <main className="page about-page">
    <PageHeading eyebrow="Trekking" title="On the trail">
      <p>Sahyadri hikes, a camera, and trails I want to revisit.</p>
    </PageHeading>
    <AboutNav active="trekking" />
    <div className="trail-meta">
      <div><strong>Kalsubai</strong><span>1,646 m · Maharashtra’s highest peak</span></div>
      <div><strong>Ratangad</strong><span>Fort trails & mountain views</span></div>
      <div><strong>Harishchandragad</strong><span>Stone paths & Sahyadri ridges</span></div>
    </div>
    <TrekGallery />
    <p className="source">Kalsubai trail information: <a href="https://maharashtratourism.gov.in/nature/kalsubai-peak/" target="_blank" rel="noreferrer">Maharashtra Tourism</a>.</p>
  </main>;
}
