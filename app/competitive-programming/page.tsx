import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { CompetitiveProfiles } from "@/components/competitive-profiles";

export const metadata: Metadata = { title: "Competitive Programming | Om Deshmukh" };

export default function CompetitiveProgramming() {
  return <main className="page competitive-page">
    <PageHeading eyebrow="LeetCode · Codeforces" title="Competitive Programming" />
    <CompetitiveProfiles />
  </main>;
}
