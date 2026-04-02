# Codebase Concerns

**Analysis Date:** 2026-04-02

## Tech Debt

**TypeScript strict mode disabled:**
- Issue: `tsconfig.json` extends `astro/tsconfigs/strict` but immediately overrides with `"strict": false`
- File: `tsconfig.json`
- Why: Likely set to unblock development quickly
- Impact: Type safety guarantees lost — null/undefined errors, implicit `any`, missing return types won't be caught at compile time
- Fix approach: Remove `"strict": false` from `tsconfig.json` and fix any resulting type errors

**Fragile frontmatter regex in image fetcher:**
- Issue: `scripts/fetch-images.mjs` extracts the `image:` field with a manual regex (`/^---\n[\s\S]*?\nimage:\s*["']?([^"'\n]+)["']?[\s\S]*?\n---/m`) instead of a proper YAML parser
- File: `scripts/fetch-images.mjs` (line 22)
- Why: Avoids adding a dependency for a simple case
- Impact: Will silently produce no image for posts with non-standard frontmatter (e.g., multiline values, extra spaces, different quote styles)
- Fix approach: Use `gray-matter` or `js-yaml` to parse frontmatter reliably

**Sequential image fetching (no parallelism):**
- Issue: `scripts/fetch-images.mjs` fetches images one at a time via a serial `for` loop
- File: `scripts/fetch-images.mjs` (lines 18–53)
- Why: Simple initial implementation
- Impact: Build time grows linearly with post count — 10 posts with 500ms each = 5s added to build
- Fix approach: Replace with `Promise.all()` over mapped fetch operations

## Known Bugs

**Image resolution always falls back to remote URL (ID mismatch):**
- Symptoms: Post images are served from the original remote URL instead of the locally downloaded copy in `public/images/posts/`
- Files: `src/pages/actualites/[slug].astro` (line 19), `src/utils/images.ts`, `scripts/fetch-images.mjs`
- Root cause: `resolvePostImage(post.id, ...)` is called with `post.id` which includes the `.md` extension (e.g., `bienvenue-site-focom-supports-bp.md`), but the image manifest keys are stored without extension (e.g., `bienvenue-site-focom-supports-bp`). The lookup `map[postId]` always returns `undefined`, so the fallback remote URL is always used.
- Evidence: `[slug].astro` line 12 uses `post.id.replace(/\.md$/, '')` to strip the extension for slugs, confirming `post.id` includes `.md`
- Workaround: Images still load because remote URLs work, but the local download pipeline is effectively bypassed
- Fix: Change line 19 in `[slug].astro` from `resolvePostImage(post.id, ...)` to `resolvePostImage(post.id.replace(/\.md$/, ''), ...)`

**Site URL typo in Astro config:**
- Symptoms: Canonical URLs, sitemap, and OG meta tags will reference the wrong domain
- File: `astro.config.mjs` (line 4) — `"https://focom-suportsbanquepostale.fr"` (missing 'p': "suports" instead of "supports")
- Trigger: Any build that generates canonical/meta tags
- Workaround: None — all generated canonical links point to wrong URL
- Fix: Change to `"https://focom-supportsbanquepostale.fr"` (or whichever is the correct registered domain)

## Security Considerations

**Remote image URLs fetched at build time without validation:**
- Risk: The `image:` frontmatter field in posts is fetched as a URL with no hostname allowlist or content-type restriction beyond basic inference
- File: `scripts/fetch-images.mjs` (lines 31–52)
- Current mitigation: Failures produce a fallback SVG (no crash); images are written to `public/` before serving
- Recommendations: Add an allowed-hostname check for external URLs (e.g., only `images.unsplash.com`) to prevent SSRF-style abuse if content authors are untrusted

## Performance Bottlenecks

**Build-time network dependency:**
- Problem: `npm run build` requires internet access to fetch post images
- File: `scripts/fetch-images.mjs`
- Measurement: Each remote image fetch adds ~200–800ms to build time depending on origin latency
- Cause: Images are not cached between builds (always refetched)
- Improvement path: Cache downloaded images by content hash or skip fetch if file already exists in `public/images/posts/`

## Fragile Areas

**`scripts/fetch-images.mjs` — build pipeline:**
- Why fragile: Single script handles directory creation, frontmatter parsing, HTTP fetching, error fallback, and manifest writing with no unit tests
- Common failures: Regex misses image URL → post rendered with broken/missing image; fetch hangs → build timeout
- Safe modification: Test regex changes against all existing post files before deploying
- Test coverage: None

**`src/generated/image-map.json` dependency:**
- Why fragile: `src/utils/images.ts` imports this file directly at build time. If the file is missing (fresh checkout, CI without prebuild), the Astro build fails with a module resolution error
- Common failures: Running `astro build` directly without `npm run build` (which runs `fetch-images` first)
- Safe modification: Always use `npm run build`, never `astro build` directly
- Test coverage: None

## Scaling Limits

**Content model (flat posts collection):**
- Current capacity: Works well for tens of posts
- Limit: No categories/tags index pages, no search — discoverability degrades past ~50 posts
- Symptoms at limit: Users can't filter or search; pagination becomes unwieldy
- Scaling path: Add category filtering pages or a client-side search (e.g., Pagefind)

## Dependencies at Risk

**No dependency pinning:**
- Risk: `package.json` uses `^5.0.0` for Astro — a minor update could introduce breaking changes in content collections API or build behavior
- Impact: `npm install` on a fresh clone could pull a newer Astro version with different behavior
- Migration plan: Pin to exact version (`"astro": "5.x.x"`) or lock via `package-lock.json` (already present — adequate mitigation if lock file is committed)

## Missing Critical Features

**No RSS feed:**
- Problem: Union communication site has no RSS/Atom feed for subscribers
- Current workaround: Users must visit the site manually to check for new posts
- Blocks: Subscribers cannot follow updates via feed readers
- Implementation complexity: Low (Astro has built-in `@astrojs/rss` integration)

**No sitemap:**
- Problem: No `sitemap.xml` generated at build time
- Current workaround: None
- Blocks: Search engine indexing is less efficient
- Implementation complexity: Low (Astro has built-in `@astrojs/sitemap` integration)

**No contact form backend:**
- Problem: `src/pages/contact/index.astro` exists but the site is fully static with no form submission handler
- Current workaround: Unknown — page may just display contact information
- Blocks: Users cannot submit inquiries through the site
- Implementation complexity: Low-Medium (static form + Cloudflare Worker or third-party form service)

## Test Coverage Gaps

**No test suite:**
- What's not tested: Everything — build pipeline, components, routing, image resolution
- Risk: Regressions in image fetching or content rendering go undetected until deployment
- Priority: Medium — site is simple but build pipeline has several failure modes
- Difficulty to test: Low for utils (pure functions); Medium for Astro components (requires Vitest + Astro test utils)

---

*Concerns audit: 2026-04-02*
*Update as issues are fixed or new ones discovered*
