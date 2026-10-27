# Om Deshmukh — Portfolio

A personal portfolio covering software engineering, quantitative development projects, competitive programming, education, and interests.

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
git clone https://github.com/OmDeshmukh04/portfolio.git
cd portfolio
npm ci
npm run dev -- --port 5174
```

Open the local URL printed by the server, normally `http://localhost:5174` with the command above.

## Build and check

```sh
npx tsc --noEmit
npm run build
```

To preview the built Cloudflare Worker locally:

```sh
npm start
```

The coding-statistics API needs a server or Worker runtime; this project is not a static GitHub Pages export.

## Features

- A fluid homepage with an interactive 3D engineering journey, a circular portrait, and profile links.
- Visible page navigation on larger screens and a labelled Menu on smaller screens.
- A Three.js scene with physical materials, shadows, selectable stages, and a static fallback. The renderer loads on demand for desktop layouts.
- A compact, tappable journey on phones, with keyboard-accessible chapter controls.
- Project galleries, working website links, and browser-based project demonstrations.
- LeetCode and Codeforces profile charts, activity heatmaps, and a seeded practice roadmap.
- Problem filters, completion dates, and review tracking. Practice progress is saved in the current browser's local storage.
- Experience and education timelines, a résumé download, and separate pages for trekking, cricket, BGMI, and puzzles.

## Main files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Homepage content and links |
| `app/portfolio-experience.css` | Homepage, journey, shared navigation, and responsive layout |
| `app/globals.css` | Other page styles and shared design tokens |
| `components/site-header.tsx` | Navigation, Menu, page directory, and footer |
| `components/journey-scene.tsx` | Journey stages, controls, and descriptions |
| `components/journey-world.tsx` | Lazy-loaded 3D scene and rendering lifecycle |
| `components/project-showcase.tsx` | Projects and current work |
| `components/competitive-profiles.tsx` | Coding profile dashboards |
| `components/coding-progress-tracker.tsx` | Practice roadmap and local progress |
| `lib/coding-roadmap.json` | Seeded coding problems |
| `app/api/coding-stats/` | Public coding-profile data aggregation |
| `public/photos/` | Portfolio photographs and university assets |
| `public/resume/` | Downloadable résumé |

## Stack

React, TypeScript, Vinext with Next-style application routes, Vite, Tailwind CSS, Radix UI, Three.js, and Recharts. The existing build supports Cloudflare Workers and the Sites hosting configuration.

A clean checkout defaults to the portable execution profile. Checkout-local runtime state, build output, temporary files, and source-photo working folders are excluded from Git.

## Customization

Edit the profile and project links in the homepage and component files above. Keep the journey statuses factual: WorldQuant University is an incoming admission, and quantitative development is a career direction.

Set `NEXT_PUBLIC_SITE_URL` in a local environment file or deployment environment when using a custom website address. The default canonical address is configured in `app/site.ts`.

The design notes are retained in `HOMEPAGE_EXPERIENCE_V2_PLAN.md`; the earlier direction is recorded in `HOMEPAGE_NAVBAR_DESIGN_BRIEF.md`.
