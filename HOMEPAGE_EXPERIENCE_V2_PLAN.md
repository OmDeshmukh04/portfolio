# Homepage V2 — a spatial journey

27 October 2026 · Proposed direction following Om's feedback

## What changed in the brief

Om wants the homepage to express his journey through something spatial and interactive. He dislikes the conventional navbar and the narrow, fixed-looking layout. More photographs are not the solution he requested. Keep the existing portrait visually unchanged wherever it is used, and replace the trishul identity with a simple circled O.

This plan supersedes `HOMEPAGE_NAVBAR_DESIGN_BRIEF.md`. The implementation has since been updated through Om's feedback: a real Three.js scene, visible desktop side navigation, a labelled mobile Menu, and a circular portrait above the introduction. The stage labels sit in a separate row beneath the objects. The original proposal below records the design process; the implementation notes at the end describe the current result.

## Recommended concept

Build a light, spacious page around a 3D-style journey map: a connected set of platforms seen in perspective. The platforms represent foundations, present work, and the direction Om is building toward.

Use a quiet pale canvas, dark text, and the existing plum accent. Depth should come from perspective, connecting paths, overlapping planes, and restrained lighting. Avoid unrelated floating objects and permanent motion.

The scene should communicate this story:

1. **Electrical engineering — foundations.** B.E. at AISSMS College of Engineering, completed.
2. **Software engineering — building.** Current full-time work at CapSurge, including healthcare and finance software.
3. **Computer science — deepening.** M.Tech at JSPM University, in progress; C++, algorithms, and systems projects.
4. **Quant development — direction.** The trading-systems project and admission to the upcoming WQU financial-engineering cohort. Show this as the next direction, not an achieved job title.

These are connected themes with overlapping dates, not four sequential jobs. Present the scene as a learning path and use explicit Completed / Current / In progress / Next labels. Do not invent employment, university dates, performance figures, or project results.

## Homepage composition

```text
O  Om Deshmukh                                      Explore  +

WHO I AM                           SPATIAL JOURNEY SCENE
Hi, I'm Om.                        Electrical foundations
Software engineer at CapSurge.          ↗ Software engineering
Building toward quant development.         ↗ Computer science
                                              ↗ Quant direction
Projects →  Résumé
LinkedIn · GitHub · LeetCode · Codeforces

                Selected stage: brief description + relevant page link

CURRENTLY BUILDING                      OUTSIDE WORK
C++20 Trading Systems Laboratory        Treks · Cricket · BGMI · Puzzles
One sentence + project link             One sentence + About link

Quiet footer
```

The main scene is the focal point, occupying roughly 55–65% of the desktop hero width. Keep the introduction concise and readable beside it. The original portrait can remain on About for this composition, with its current asset retained; do not make it compete with the journey scene.

On initial load, select the current software-engineering stage. Selecting another platform changes a short description and a relevant link. Keep the same stage order available as ordinary HTML buttons for keyboard and touch users. The visitor must be able to read the story without hovering.

## Replace the navbar with a page directory

Recommended default: a minimal top row with the circled O and name at the left, and one **Explore +** control at the right. It opens an accessible page directory, rather than a long horizontal row of links.

- On desktop, use a spacious overlay with two columns: Projects, Coding, Experience, Education, About, and Résumé. Keep a Home link, current-page indication, and contact links.
- On phones, use the same control and a single column of links.
- Reuse the existing Radix dialog/Sheet behavior for focus containment, Escape, close control, and focus restoration.
- Animate the panel with a short fade or slide. Do not use an elaborate transition before the links become usable.
- The homepage keeps direct Projects and Résumé actions, so the main visitor tasks remain immediately accessible.

Tradeoff: other page destinations require opening the directory first. The cleaner page composition is the reason to choose this pattern. Do not add a floating bottom dock as well; use one consistent navigation model.

## Make large screens meaningfully different

The present width is capped at 1040px in the shared header/home/footer rule. Several inner-page rules also cap the page at 1040px. That is the reason the content appears locked into a narrow center column on a wide monitor.

Use a fluid outer composition with viewport-based side padding:

```css
.site-frame {
  width: 100%;
  padding-inline: clamp(20px, 4vw, 96px);
}
```

Do not apply a single 1040px maximum to the whole homepage. Constrain individual text columns to about 55–65 characters; allow the scene, navigation frame, project grids, and dashboard containers to use the remaining space.

| Screen | Composition |
| --- | --- |
| 1600px and wider | Intro takes about one third; the journey expands across the remaining width. Larger scene spacing, rather than larger paragraph text. |
| 1024–1599px | Intro and scene share a two-column layout with closer stage spacing. |
| 768–1023px | Introduction first, scene beneath; four stages can form a two-by-two arrangement. |
| Below 768px | Compact intro and a simple vertical or stepped journey. All stages remain visible or directly selectable, with no hover requirement. |

Avoid fixed hero heights that clip content on short monitors. Do not stretch résumés and long prose across an ultrawide screen. Apply page-specific width rules to inner pages: wider coding/project layouts, readable prose, and balanced timelines.

## Implementation approach

Start with HTML, SVG, and CSS perspective. This can express a clean platform-and-path scene while keeping labels, buttons, and links accessible and avoiding a new rendering dependency. Use it as the first visual prototype; verify that it actually looks dimensional before calling the scene finished.

If that prototype cannot deliver the desired depth, evaluate a small WebGL scene as a separate implementation choice. Keep the HTML story and controls outside the canvas, lazy-load the renderer, and provide the same static composition when graphics are unavailable. Do not install a 3D stack before the first composition is reviewable.

Interaction details:

- A subtle pointer tilt may add depth on devices with a precise pointer; keep it restrained and disable it for touch and reduced motion.
- Clicking or focusing a stage exposes its short description and page link. Use buttons for selection and links for navigation.
- Avoid scroll hijacking, automatic camera flights, drag-only controls, and continuously spinning objects.
- Keep future and completed stages distinct through labels and treatment, not color alone.
- The scene should sit behind or beside the content without intercepting ordinary page scrolling.

## Suggested short copy

**Hero:** Hi, I'm Om.

**Introduction:** I'm a software engineer at CapSurge, studying computer science and building toward quantitative development.

**Current project:** I'm building a C++20 trading-systems project around order matching, market-data replay, and performance measurement.

**Outside work:** Sahyadri treks, Rohit Sharma, Team Soul, and a good logic puzzle.

Keep supporting text to one or two sentences per stage. Put full education details, company work, and project descriptions on their existing pages.

## Delivery order

1. Establish the fluid desktop and phone composition, including the minimal header and page-directory overlay.
2. Build the static perspective journey with accurate labels and working stage selection. Show this as the first reviewable version.
3. Add restrained depth and pointer effects after the scene reads well without animation.
4. Check the shared header and width changes on other routes. Preserve the coding dashboard, stored progress, profile integrations, demos, and résumé download.
5. Verify keyboard/touch use, reduced motion, 360–2560px widths, short screens, navigation dismissal, image loading, and a production build. Keep the local preview open.

The first visual review should answer three concrete questions: does the scene explain the journey, does the page use a wide screen well, and does the directory feel easier to use than the previous navbar?

## Implementation notes after review

- The desktop journey now uses lazy-loaded Three.js geometry with physical materials, bevelled edges, an environment map, and contact shadows. The scene renders on size and selection changes. An SVG illustration remains available when WebGL cannot render.
- Stage objects are clickable; a separate row of labelled HTML buttons below the scene provides keyboard access and keeps text away from the objects. Phones use a compact vertical chapter list.
- Page names remain visible in a side navigation at widths of 1180px and above. Smaller screens use a clearly labelled Menu button and an accessible page directory.
- The original portrait is shown above the introduction in a circle, at 128px on larger screens and 108px on phones. The source image is visually unchanged.
- The name and desktop side-navigation text have been slightly enlarged. The identity uses a simple circled O.
- Om requested removal of selected-stage description panels and the additional current-project and interests sections. The homepage now focuses on a centered portrait/introduction group beside the interactive objects and stage labels; detailed work, education, and interests remain on their own pages.
- The homepage and dashboard frames are fluid. Reading-heavy pages retain their individual content limits.
- Primary files: `app/page.tsx`, `app/portfolio-experience.css`, `components/site-header.tsx`, `components/journey-scene.tsx`, and `components/journey-world.tsx`.
