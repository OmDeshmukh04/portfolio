"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { profileLinks } from "@/components/social-icons";

const links = [
  ["/projects", "Projects", "Systems, simulations & live websites"],
  ["/competitive-programming", "Coding", "Practice, contests & progress"],
  ["/experience", "Experience", "The work behind the software"],
  ["/education", "Education", "Engineering, computer science & finance"],
  ["/about", "About", "Life outside work"],
  ["/resume", "Résumé", "Read or download"],
] as const;

function Name() {
  return <><span className="brand-initial" aria-hidden="true">O</span><span className="brand-name"><b>Om</b> Deshmukh</span></>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/" aria-label="Om Deshmukh, home" onClick={() => setOpen(false)}>
      <Name />
    </Link>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild><button type="button" className="explore-trigger" aria-label="Open menu"><span>Menu</span><Menu aria-hidden="true" /></button></SheetTrigger>
      <SheetContent side="top" className="site-directory" showCloseButton={false}>
        <div className="directory-topline"><Link className="brand" href="/" aria-label="Om Deshmukh, home" onClick={() => setOpen(false)}><Name /></Link><SheetClose asChild><button type="button" className="directory-close" aria-label="Close navigation"><span>Close</span><X aria-hidden="true" /></button></SheetClose></div>
        <div className="directory-heading"><div><p className="eyebrow">Find your way</p><SheetTitle>Explore the portfolio.</SheetTitle></div><Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>Home <ArrowUpRight aria-hidden="true" /></Link></div>
        <SheetDescription className="sr-only">Choose a page to explore Om’s work, education, coding, and interests.</SheetDescription>
        <nav className="directory-links" aria-label="Main navigation">
          {links.map(([href, label, description], index) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined} onClick={() => setOpen(false)}><span className="directory-number">0{index + 1}</span><span className="directory-link-copy"><strong>{label}</strong><span>{description}</span></span><ArrowUpRight aria-hidden="true" /></Link>)}
        </nav>
        <div className="directory-footer"><div><p>Pune, India</p><a href="mailto:omdeshmukh1906@gmail.com">omdeshmukh1906@gmail.com</a></div><div className="directory-social">{profileLinks.map(profile => <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer">{profile.label}<ArrowUpRight aria-hidden="true" /></a>)}</div></div>
      </SheetContent>
    </Sheet>
    <span className="header-location">Pune, India</span>
  </div><nav className="page-rail" aria-label="Page navigation">
    <p>Portfolio</p>
    <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
    {links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined}>{label}</Link>)}
    <a className="rail-contact" href="mailto:omdeshmukh1906@gmail.com">Get in touch <ArrowUpRight aria-hidden="true" /></a>
  </nav></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><span>© 2026 Om Deshmukh · Pune, India</span><div><a href="mailto:omdeshmukh1906@gmail.com">Email</a><a href="https://github.com/OmDeshmukh04" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/om-deshmukh-298165236/" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>;
}
