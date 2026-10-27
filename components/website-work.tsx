import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "PragyaFlow",
    kind: "My startup",
    description: "Web and mobile products, SaaS, finance automation, and AI enabled workflows.",
    href: "https://www.pragyaflow.com/",
    domain: "pragyaflow.com",
    image: "https://pragyaflow.com/og.png",
    imageAlt: "PragyaFlow web and automation services",
  },
  {
    name: "Tiger Machinery",
    kind: "Industrial website concept",
    description: "A site concept covering foundry and casting, machining, fabrication, and repair.",
    href: "https://tigermachinery.vercel.app/",
    domain: "tigermachinery.vercel.app",
    image: "https://tigermachinery.vercel.app/images/foundry.webp",
    imageAlt: "Foundry equipment featured on the Tiger Machinery website",
  },
  {
    name: "Regent Star Hotel",
    kind: "Hospitality website concept",
    description: "A hotel website concept for rooms, dining, celebrations, and stays near Piarco Airport.",
    href: "https://regentstarhotel.vercel.app/",
    domain: "regentstarhotel.vercel.app",
    image: "https://regentstarhotel.vercel.app/images/hero-lobby.webp",
    imageAlt: "Hotel lobby featured on the Regent Star Hotel website concept",
  },
  {
    name: "Caffè Italia",
    kind: "Restaurant website",
    description: "A live restaurant site for Italian dining, the menu, catering, reservations, and visiting.",
    href: "https://cafeitalia-six.vercel.app/",
    domain: "cafeitalia-six.vercel.app",
    image: "https://cafeitalia-six.vercel.app/images/antipasti-spread.jpg",
    imageAlt: "Antipasti featured on the Caffè Italia restaurant website",
  },
];

export function WebsiteWorkGrid() {
  return <div className="website-work-grid">
    {projects.map(({ name, kind, description, href, domain, image, imageAlt }) =>
      <article className="website-work-card" key={href}>
        <a href={href} target="_blank" rel="noreferrer" aria-label={`View ${name}, opens in a new tab`}>
          <div className="website-work-preview"><img src={image} alt={imageAlt} loading="lazy" /><span className="website-work-kind">{kind}</span></div>
          <h3>{name}</h3>
          <p>{description}</p>
          <div className="website-work-link"><span>{domain}</span><span className="website-work-open">View live site <ArrowUpRight aria-hidden="true" /></span></div>
        </a>
      </article>
    )}
  </div>;
}

export function WebsiteWorkSection({ compact = false }: { compact?: boolean }) {
  return <section className={compact ? "web-work-section web-work-compact" : "web-work-section"} aria-labelledby={compact ? "web-work-home-title" : "web-work-title"}>
    <div className="section-heading">
      <div><p className="eyebrow">Selected web work</p><h2 id={compact ? "web-work-home-title" : "web-work-title"}>{compact ? "Websites I’ve put live" : "Websites & product work"}</h2></div>
      {compact && <a className="section-link" href="/projects#web-work">See all four</a>}
    </div>
    <p className="web-work-intro">{compact ? "Alongside my systems projects, I build and deploy websites through PragyaFlow." : "A few live sites and website concepts from my work through PragyaFlow."}</p>
    <WebsiteWorkGrid />
  </section>;
}
