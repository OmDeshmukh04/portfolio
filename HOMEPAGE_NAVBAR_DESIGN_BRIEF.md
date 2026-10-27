# Om Deshmukh — homepage and navigation polish

Prepared for implementation with Sol 6 · 27 October 2026

> Superseded by `HOMEPAGE_EXPERIENCE_V2_PLAN.md`. Om has requested a spatial journey homepage, alternative navigation, a simple circled O, and a fluid layout for large screens. Use the V2 plan for further design work. The instructions below describe the previous direction.

## 1. Goal and scope

Make the existing portfolio feel calm, personal, and carefully arranged. A visitor should quickly understand who Om is, what he is working on, what he enjoys, and his direction toward quantitative development.

This is an implementation brief, not an instruction to rebuild the site. The user has already chosen the content and separate pages. Start with the current checkout at `C:\Users\CapSurge\Documents\Personal 2\quant-portfolio-site` and preserve its uncommitted work. The first delivery should be a local preview; deployment requires a separate request.

**Recommended direction:** compact typography, generous alignment and spacing, the existing plum accent, a quiet light background, and restrained borders. Let the original portrait and the actual work provide the personality.

## 2. What the source review found

This review is based on the current source, not a fresh rendered screenshot. Visual judgments below are recommendations to validate in the browser during implementation.

| Current implementation | Recommendation |
| --- | --- |
| Header, navigation states, portrait, cards, social links, and footer repeatedly use raised or inset shadows. | Reduce the number of shadowed surfaces. Use a clear hierarchy: main action, current project, then supporting text. |
| The homepage has a good introduction followed by three equally styled cards. | Keep the introduction, give the active project a compact feature, and make interests and study plans simple text sections. |
| `.home-now-card` body text is `.78rem` and its labels are `.65rem`. | Keep headings compact but make actual reading text 15–16px at the default root size. |
| Profile links use tiny recessed pills, while a second navigation row repeats destinations below the cards. | Use one readable profile row near the introduction and remove the redundant `.home-more-links` row. |
| Homepage and header rules recur throughout `app/globals.css`, with old breakpoint rules still present. | Consolidate the relevant selectors as part of the change. Avoid another layer of overrides at the bottom. |
| The header already uses a Radix-based `Sheet` and supports nested-route active states. | Refine this implementation and retain its dialog behavior. |

The current `public/photos/om-deshmukh.png` is about 2.63 MB. Keep the original image and its appearance; a separately generated, visually equivalent delivery derivative may improve loading if needed. Do not retouch, replace, recolor, or change its composition.

## 3. Homepage composition

Use three content bands below the header, followed by the existing footer. Aim for roughly 120–170 words of substantive copy, excluding navigation. Do not force everything into a fixed screen height.

```text
DESKTOP

Om Deshmukh   Projects  Coding  Experience  Education  About   [Résumé]
──────────────────────────────────────────────────────────────────────

Software engineer · Pune, India                  Original portrait
Hi, I’m Om.                                      200–220px square
Short introduction and career direction.

[Explore projects]  Read résumé
LinkedIn   GitHub   LeetCode   Codeforces

──────────────────────────────────────────────────────────────────────
Currently building                                      In progress
C++20 Trading Systems Laboratory
One short description.                                  View project →
──────────────────────────────────────────────────────────────────────

Outside work                          What’s next
Two short lines of interests.         WQU admission in one sentence.
More about me →                       Education →

© Om Deshmukh                         Email · GitHub · LinkedIn
```

The portrait stays on the right on desktop. On phones, place a 96–112px version next to the greeting, then put the introduction, actions, and profile links below across the full width. Stack the current project and supporting sections naturally. Avoid `display: contents` for the entire introduction; use explicit grid areas or a small greeting wrapper so reading order and layout are straightforward.

### Suggested copy

Use this as the starting copy. Preserve the facts if adjusting wording for line breaks.

**Eyebrow:** Software engineer · Pune, India

**Heading:** Hi, I’m Om.

**Introduction:** I’m a software engineer at CapSurge and an M.Tech Computer Science student at JSPM University. I enjoy C++, algorithms, and building software. I’m working toward a career in quantitative development.

**Main action:** Explore projects → `/projects`

**Secondary action:** Read résumé → `/resume`

**Currently building:** C++20 Trading Systems Laboratory

**Description:** I’m building an order-book project with market-data replay, risk checks, and performance measurement.

**Status:** In progress

**Project link:** View project → `/projects#currently-working-title`

The anchor currently exists in `components/project-showcase.tsx`. Keep it working if the project presentation changes.

**Outside work:** I love trekking in the Sahyadris, watching Rohit Sharma bat, following Team Soul in BGMI, and solving logic puzzles.

**Link:** More about me → `/about`

**What’s next:** I’ve been admitted to the upcoming MSc in Financial Engineering cohort at WorldQuant University.

**Link:** Education → `/education`

Do not describe WQU classes as underway unless Om supplies an updated status. The quant role is a career direction, and the trading project is in progress. Avoid invented benchmarks, achievements, rankings, or claims of production readiness.

### What to feature

- Give the homepage one main visual: Om’s existing portrait.
- Give it one project feature: the current C++20 trading project.
- Keep GitHub, LinkedIn, LeetCode, and the currently selected Codeforces profile accessible in one lightweight row.
- Leave full project grids, website previews, coding charts, heatmaps, college timelines, and hobby galleries on their existing pages.
- Use natural first-person sentences. Avoid filler such as “passionate developer,” “building and learning,” “turning ideas into reality,” and “my journey.”

## 4. Navbar: specific recommendation

Use a single quiet horizontal header. All items should share one vertical alignment and a predictable spacing rhythm.

### Desktop

- Retain the current six destinations: Projects, Coding, Experience, Education, About, Résumé. The name links home.
- Put the name at the left, the five ordinary links at the right, and Résumé last with a subtle outline. The homepage’s Explore projects button remains the strongest filled action.
- Use a 64–68px header height and a shared 1040px content container. Align the name with the main text edge and the final action with the right edge of the content.
- Use 14px medium-weight navigation text, approximately 12–16px between link targets, and 44px-high clickable areas.
- Ordinary links should be flat. Use plum text plus a thin underline for the active route; reserve the underline space so selection does not move the layout.
- Use a simple 1px bottom divider and a nearly opaque light background. Keep the sticky behavior, with a visible focus indicator and enough anchor offset below the header.
- Preserve `aria-current="page"` for nested routes. A project detail should keep Projects active; an interest page should keep About active.
- An optional small trishul can sit beside the name, reflecting Om’s earlier preference. Reuse the existing SVG geometry, render it as a restrained monochrome 16–18px decorative mark, and keep the favicon asset intact. The name remains readable without it.

Avoid a new dropdown taxonomy or extra navbar social icons. The existing page names are already clear.

### Mobile and tablet

- Show the name at the left and one 44px Menu control at the right. Keep the hamburger icon and an accessible label; avoid wrapping desktop links into two rows.
- Start with desktop navigation at widths above 960px and the menu at 960px and below. Use matching CSS and JavaScript boundaries; the current header’s `matchMedia` uses 901px and must change if this recommendation is implemented.
- Retain the existing `Sheet` component. Use a panel width of `min(340px, calc(100vw - 24px))`, a clear close button, and 48px link rows.
- Mobile link order: Home, Projects, Competitive programming, Experience, Education, About, Résumé.
- Keep a simple active row, then email and social links in the panel footer. Allow the panel itself to scroll on short screens.
- Preserve Escape dismissal, overlay dismissal, focus containment, focus return on ordinary close, and body scroll locking supplied by the dialog. Confirm that route changes close the panel and that crossing to desktop does not leave an overlay behind.

## 5. Visual specifications

These values are design starting points, not a request to globally restyle every page in the first pass.

| Element | Recommendation |
| --- | --- |
| Font | Keep the existing Inter family. Use weights 400, 500, and 600. |
| Primary accent | Keep plum `#663854`; use darker plum for hover. |
| Background | A quiet light surface close to the existing palette. Avoid introducing an unrelated theme. |
| Surfaces | One light surface and subtle dividers. No inset shadows on text links. |
| Main heading | About 36px desktop, 30px phone; line-height 1.15–1.25. |
| Section headings | 18–20px. Existing inner-page titles stay centered and plum. |
| Body copy | 15–16px; line-height 1.6–1.7; about 55–65 characters per line. |
| Small labels | 12px; use them only for brief supporting labels. |
| Content width | 1040px maximum; consistent 24px desktop and 20px phone side gutters. |
| Main vertical spacing | About 40–48px desktop and 24–32px phone between content bands. |
| Buttons | 44px minimum target height; 8px corner radius; clear focus outline. |
| Portrait | 200–220px desktop and 96–112px phone; original square composition. |
| Current project | One shallow bordered section, roughly 20–24px padding; no fixed height. |
| Motion | Color and opacity changes around 150–180ms. Respect reduced motion. |

Use whitespace, type weight, and one accent to establish hierarchy. Avoid animated counters, typing effects, moving backgrounds, giant headings, and hover movement on every element.

For readability, target at least 4.5:1 contrast for normal text. Use 44px touch targets as this portfolio’s design target; WCAG 2.2 AA’s target-size minimum is 24px with specified exceptions, not a blanket 44px requirement. See the [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## 6. Implementation map and order

| Priority | Files | Work |
| --- | --- | --- |
| 1 | `app/page.tsx` | Apply the concise introduction, single project feature, and simple interests/study sections. Remove the redundant lower navigation row. |
| 1 | `components/site-header.tsx` | Clean up alignment, navigation emphasis, menu sizing, and the shared breakpoint behavior. |
| 1 | `app/globals.css` | Consolidate the affected homepage/header rules into coherent sections, including responsive rules. Scope homepage changes to avoid altering other page layouts. |
| 2 | `components/site-header.tsx` | Simplify the shared footer surface and align its content with the page container. |
| 2 | `public/photos/om-deshmukh.png` and its usage | Preserve the original. If optimizing delivery, retain a source copy and compare the derivative visually before switching usage. Keep dimensions to prevent layout shift. |
| 2 | `components/page-heading.tsx`, `app/globals.css` | If needed, give centered inner-page headings an explicit shared style rather than adding more per-page overrides. Preserve current wording. |
| 3 | Existing page components | Only fix spacing or button inconsistencies revealed by the header/style change. A broader redesign is outside this first pass. |

Before deleting CSS, search for its consumers. Old `.home-*` rules may share selectors with components used on other pages. Keep edits small and reviewable; do not reset the dirty checkout, reformat unrelated files, replace dependencies, or migrate the framework.

This repository uses Vinext with Next-style routes. Use its existing `package.json` scripts and configured runtime. Reuse a running local server when available. Otherwise use `npm run dev -- --port 5174`, and follow the URL actually printed by the server. Do not launch duplicate preview servers.

## 7. Completion checks for implementation

- [ ] The opening view introduces Om, shows the original portrait, and offers a clear project action.
- [ ] The homepage explains his work, interests, and goal in short, factual copy.
- [ ] Only one current project is featured; detailed galleries and dashboards stay on their pages.
- [ ] The header has even spacing, one clear active state, and no heavy shadow on each link.
- [ ] Check 360, 390, 768, 960, 961, 1024, and 1440px widths. No horizontal overflow, squeezed text, or disappearing menu control.
- [ ] Check 200% zoom, keyboard navigation, the skip link, focus visibility, and the drawer’s open/close/resize behavior.
- [ ] Confirm `/projects#currently-working-title`, résumé, email, and the four profile links point to the intended destinations.
- [ ] Check the shared header on Projects, Coding, Experience, Education, About, an About child route, and Résumé. Preserve centered page headings.
- [ ] Do not alter coding progress persistence, seeded problems, profile fetching, filters, charts, heatmaps, project demos, or the résumé PDF.
- [ ] Confirm the portrait has no composition or color change, and its loading does not move surrounding content.
- [ ] Run the existing build command appropriate to the configured local runtime. Do not add snapshot tests for static wording.
- [ ] Capture desktop and mobile screenshots if supported. If browser access is unavailable, state that limitation rather than claiming visual verification.
- [ ] Leave a working local preview and a concise account of changed files and checks. Do not publish as part of this brief alone.

## 8. Prompt to give Sol 6

```text
Read HOMEPAGE_NAVBAR_DESIGN_BRIEF.md in:
C:\Users\CapSurge\Documents\Personal 2\quant-portfolio-site

Implement its recommended homepage and navigation design in the existing app.
Start by inspecting the current files and any AGENTS.md instructions. Preserve
all existing uncommitted work and the current routes and functionality.

Use the recommended composition and copy: concise introduction with my original
portrait, one current C++ project, and brief interests and study plans. Keep the
plum identity, compact headings, readable body text, and clean desktop/mobile
navigation. Consolidate affected CSS instead of appending more overrides.

Keep my photograph visually unchanged. Keep project and education status factual.
Preserve the coding dashboard and its data. Do not add dependencies or migrate
the framework for this visual update.

Work through priorities 1 and 2, then only address regressions found elsewhere.
Use the existing local server or start it with the repo's scripts. Check the
listed screen widths, drawer behavior, routes, and build. Show me the local
result with desktop/mobile screenshots if supported, and report any verification
limits. This is a local implementation request; do not deploy it.
```
