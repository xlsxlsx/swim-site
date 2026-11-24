# Swim Lane · Swimming Academy (MVP Static Site)

[简体中文](README.md) · [English](README.en.md)

A Plan A pure static site built from `PRD-游泳网站.md`, `IA-信息架构.md` and `内容模板.md`: zero backend, zero database, zero account system.

## How to Open
Double-click `index.html` directly (works over `file://`; content data is loaded inline via `<script>`, so there are no fetch/CORS issues), or host it on any static host (a smooth migration is reserved).

## Pages (per the IA sitemap)
| File | Page | Key modules |
|------|------|-------------|
| `index.html` | Home | Hero (with beginner entry), clickable L0–L3 level map, featured strokes, featured safety items (with pending-review markers) |
| `strokes.html` | Stroke list | 4 stroke cards + 1 locked "???" card (easter egg: dog paddle 🐕, just for fun) |
| `stroke.html?id=…` | Stroke detail (dynamic) | Shared `stroke-page.js` rendering: intro / breakdown / rhythm / corrections / level-based plans / videos / related safety & next steps |
| `stroke-breaststroke.html` | Breaststroke static entry | Dedicated URL and static summary, shares rendering logic with the dynamic version |
| `stroke-freestyle.html` | Freestyle static entry | Same as above |
| `stroke-backstroke.html` | Backstroke static entry | Same as above |
| `stroke-butterfly.html` | Butterfly static entry | Same as above |
| `safety.html` | Safety notes | Review-status banner, 39 entries, five-category continuous grouping + filters, keyword search, risk + prevention + emergency response, pending-review badges / unverified reference suggestions / special notes / cross-links and `#s-<id>` deep links |
| `levels.html` | Level quiz & learning path | Full L0–L3 path cards + 5-question quiz → scoring → recommended starting level + multiple content entries |
| `basics.html` | L0 beginner 5 lessons | Water adjustment / exhaling in water / prone float & stand / back float & calling for help / wall-side movement; each lesson has goals, steps, corrections, related safety and next steps |
| `training.html` | Training plans & gear buying | L1–L3 weekly plans (cycle / frequency / metrics) + buying criteria and pitfalls for 9 gear categories |
| `advanced.html` | L3 advanced technique | Turns / starts / pacing & periodization / video self-check lists, all self-practice content deliverable by a static site |

## Learning Path & Content Cross-Links
- The four level-map cards (home and quiz pages) are clickable: L0 → `basics.html`, L1 → breaststroke detail, L2 → `training.html`, L3 → `advanced.html`.
- Quiz results offer 3 content entries per level; stroke detail pages render "Read this first" and "Next step" at the bottom.
- Safety entries carry `#s-<id>` anchors; cross-links between strokes / lessons / gear / entries are centrally maintained in `CONTENT.strokeLinks` and `CONTENT.safetyLinks`, with `check.js` validating ids and in-site link reachability.
- L3 no longer promises community submissions / teaching assistants (out of scope for a static site); it now offers video self-check + review by a certified coach.

## Bilingual Support
- Chinese by default; the "🌐" button in the nav toggles ZH ⇄ EN, with the preference stored in `localStorage` (key `swim-lang`).
- Switching happens within the same page (no separate URLs, to keep SEO simple), with each page's `title` / `meta description` written dynamically in both languages.

## Dynamic Copy & Data Consistency
- Numbers and dates that change with content are never hardcoded: safety entry count, question count, lesson count and plan count use `{n}` placeholders, and the media snapshot date uses `{date}`; `fill()` in `app.js` injects values from `CONTENT` at render time.
- The quiz full score is derived from the last band's `bands[].max` instead of a hardcoded `/ 14`.
- All 39 safety entries are grouped continuously as `venue → contraindication → emergency → child → gear`, enforced by `check.js` so newly added entries cannot be inserted into the wrong group.

## SEO & Accessibility
- All 12 pages have static `canonical` / OG / Twitter / JSON-LD metadata, and `<noscript>` retains crawlable summaries of the main text; core content is readable without JS.
- Each of the 4 formal strokes has its own static URL (`stroke-*.html`) reusing `stroke-page.js`, so `?id=` parameter pages don't need to be indexed individually.
- Safety search supports multi-keyword AND, title-first relevance ranking, `<mark>` hit highlighting, `aria-live` result announcements and shareable `?q=` links.
- Language switching preserves quiz answers/results and opened videos; video covers have dimensions, bilingual alt text, `referrerpolicy="no-referrer"` and a load-failure fallback; `prefers-reduced-motion` is supported.

## File Structure
- `content.js` — site data: 4 strokes + 1 hidden dog paddle (Template A), 39 safety entries (Template B, all `reviewed: false` and all with `level`), `reviewPolicy`, `basics` / `advanced` / `training` (Template C), `strokeLinks` / `safetyLinks` cross-link tables, level map, quiz bank.
- `app.js` — i18n, top nav / footer (with 3 new page entries), card rendering (review status + anchors + cross-links), shared helpers `safetyLinksHtml` / `nextLinksHtml`.
- `styles.css` — clean sporty style (blue/cyan primary, cards, responsive with mobile hamburger menu) plus review-status, lesson / training / gear module and cross-link styles.
- `stroke-page.js` — shared stroke-detail rendering logic (used by the dynamic page and the 4 static entry pages, still reading from `content.js`).
- `check.js` — local content review gate (`node check.js`, zero-dependency, local only, not loaded by pages), 24 checks covering bilingual fields, review traceability, level/plan alignment, cross-links, dynamic copy, static SEO metadata and a11y facilities.
- `sitemap.xml` / `robots.txt` — static sitemap and crawl rules (replace `example.com` with the real domain at deployment).
- `REVIEW-审核记录.md` — gold-standard outline, 39-item line-by-line review table, source-recording spec and change log.

## Hidden Easter Egg 🐕
The last "??? · Locked" card in the stroke list is the easter egg (dog paddle): clicking it opens a joke version with the full template structure (intro / breakdown / rhythm / corrections / practice plan + 3 memey Bilibili videos), with an "🥚 Easter egg stroke · for fun only" badge on the detail page; it is excluded from home features and the "previous/next stroke" navigation (which loops only through the 4 formal strokes), and is fully bilingual.

## Media Assets (placeholders replaced)
- Videos: embedded Bilibili player (click the cover to play) + an "Open on Bilibili" external link. 3 per stroke: main tutorial, breakdown/principles, corrections, picked by likes + favorites from Bilibili search and author collections; snapshot dates are centralized in `CONTENT.mediaSnapshot` and injected into page copy via `{date}`.
- Images: card covers are the corresponding Bilibili video covers (`i*.hdslb.com`), with dimensions, bilingual alt text, `referrerpolicy="no-referrer"` and a load-failure fallback.
- To add a stroke: add `{bvid, pic, title, up, like, collect, min, label}` to `videos[]` in `content.js`, and complete that stroke's related safety and next steps in `strokeLinks`.

## Content Review Status (currently: AI draft, not finally reviewed)
- All 39 safety / medical entries have `reviewed: false`; `source` is an "unverified reference direction suggestion", not a verified source.
- Pages show a "⚠ AI draft · pending coach review" badge, a review banner on the safety page, "special notes" on entries with numbers / first-aid procedures, and the footer carries a real disclaimer + emergency number (120 in mainland China).
- L0 / L3 / training / gear pages are also AI drafts, with safety-precondition notes and links to pending-review entries; review them together at final review.
- **Before going live, a certified coach must complete the final review (plus a doctor for medical / first-aid entries)**: see `REVIEW-审核记录.md` for the process, gold-standard outline and 39 line-by-line records.

## Pre-Launch Gate (must pass)
1. Run `node check.js` (zero-dependency, local only, not loaded by pages); exit code must be 0.
2. The gate enforces: non-empty `zh`/`en` bilingual fields, unique ids, complete three-part structure, entries with `reviewed === true` must have `review{}` and `sourceRef{}` traceability, the render layer must not fake "reviewed", all strokes' `level` aligned with `plan`, cross-link ids and in-site links reachable, five-category continuous grouping, dynamic placeholders with `fill()` present, and easter eggs excluded from the stroke loop.
3. Key-point coverage of the gold-standard outline ≥ 90% (manual check, recorded in `REVIEW-审核记录.md`).
4. Only after all checks pass may `CONTENT.reviewPolicy.status` be changed to `approved` with `owner` filled in.

## Reserved Migration Fields
Strokes carry `id / level`; safety entries carry `id / level / category` (all 39 have `level` filled by category); this satisfies the data-model requirement for "Plan B smooth upgrade" in the PRD.
