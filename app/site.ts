// Absolute URLs for share cards and the sitemap; a custom domain may override the live Sites URL.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://om-deshmukh-quant.amit-kadam417387.chatgpt.site";

export const routes = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/projects/order-book", priority: 0.8 },
  { path: "/projects/monte-carlo", priority: 0.8 },
  { path: "/projects/systems-lab", priority: 0.7 },
  { path: "/experience", priority: 0.9 },
  { path: "/education", priority: 0.8 },
  { path: "/competitive-programming", priority: 0.8 },
  { path: "/resume", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/about/trekking", priority: 0.6 },
  { path: "/about/cricket", priority: 0.5 },
];
