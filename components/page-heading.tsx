import Link from "next/link";

export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <div className="intro">{children}</div>}</header>;
}
export function AboutNav() {
  return <nav className="subnav" aria-label="About pages"><Link href="/about">About me</Link><Link href="/about/trekking">Trekking & photography</Link><Link href="/about/cricket">Cricket</Link></nav>;
}
