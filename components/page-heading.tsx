import Link from "next/link";

export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <div className="intro">{children}</div>}</header>;
}
export function AboutNav({ active = "about" }: { active?: "about" | "trekking" | "cricket" | "esports" | "puzzles" }) {
  const tabs = [
    ["about", "/about", "About me"],
    ["trekking", "/about/trekking", "Trekking"],
    ["cricket", "/about/cricket", "Cricket"],
    ["esports", "/about/esports", "BGMI esports"],
    ["puzzles", "/about/puzzles", "Puzzles"],
  ] as const;

  return <nav className="subnav about-tabs" aria-label="About pages">
    {tabs.map(([id, href, label]) => <Link key={id} href={href} aria-current={active === id ? "page" : undefined}>{label}</Link>)}
  </nav>;
}
