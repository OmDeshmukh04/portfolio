"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { profileLinks } from "@/components/social-icons";

const links = [["/projects", "Projects"], ["/competitive-programming", "Coding"], ["/experience", "Experience"], ["/education", "Education"], ["/about", "About"], ["/resume", "Résumé"]];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  function navLinks(mobile = false) {
    return links.map(([href, label]) => <Link key={href} href={href} className={href === "/resume" ? "nav-resume" : undefined} aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined} onClick={() => setOpen(false)}>{mobile && label === "Coding" ? "Competitive programming" : label}</Link>);
  }
  function socialLinks() {
    return profileLinks.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} profile (opens in a new tab)`} title={s.label}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={s.path} /></svg></a>);
  }
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/" onClick={() => setOpen(false)}><b>Om</b><span>Deshmukh</span></Link>
    <nav aria-label="Main navigation" className="navigation">{navLinks()}</nav>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild><button className="mobile-menu" aria-label="Open navigation"><span>Menu</span><Menu aria-hidden="true" /></button></SheetTrigger>
      <SheetContent side="right" className="mobile-sidebar" showCloseButton={false}>
        <div className="sidebar-heading"><SheetTitle>Om Deshmukh</SheetTitle><SheetClose asChild><button className="sidebar-close" aria-label="Close navigation"><X aria-hidden="true" /></button></SheetClose></div>
        <SheetDescription className="sr-only">Explore my projects, education, experience, and interests.</SheetDescription>
        <nav className="sidebar-links" aria-label="Mobile navigation"><Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>Home</Link>{navLinks(true)}</nav>
        <div className="sidebar-footer"><p>Pune, India</p><div className="sidebar-social">{socialLinks()}</div><a href="mailto:omdeshmukh1906@gmail.com">omdeshmukh1906@gmail.com</a></div>
      </SheetContent>
    </Sheet>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><span>© 2026 Om Deshmukh · Pune, India</span><div><a href="mailto:omdeshmukh1906@gmail.com">Email</a><a href="https://github.com/OmDeshmukh04" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/om-deshmukh-298165236/" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>;
}
