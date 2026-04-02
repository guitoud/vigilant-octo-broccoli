# External Integrations

**Analysis Date:** 2026-04-02

## APIs & External Services

**Image Fetching:**
- Remote image download during build (via `scripts/fetch-images.mjs`)
  - Fetches images from URLs specified in markdown front matter
  - Falls back to auto-generated SVG placeholder on failure
  - No SDK required; uses native Node.js `fetch()` API

**No other external APIs detected:**
- No third-party SaaS integrations (Stripe, SendGrid, etc.)
- No REST API clients configured
- No GraphQL integrations

## Data Storage

**Databases:**
- None - Content is static markdown files in `src/content/posts/`

**File Storage:**
- Local filesystem only
  - Source content: `src/content/posts/*.md` (markdown with YAML front matter)
  - Generated assets: `src/generated/image-map.json` (mapping of post slugs to image paths)
  - Public images: `public/images/posts/` (downloaded or fallback images)
  - Built output: `dist/` (static HTML/CSS/JS)

**Caching:**
- None configured - Static site with no runtime caching

## Authentication & Identity

**Auth Provider:**
- None - Static website with no user authentication
- No login/registration system
- No protected content areas

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Build-time logging only (console output during `npm run build`)
- Image fetch script logs success/failure to stdout:
  - `image ok {slug}` - Image successfully downloaded
  - `image fallback {slug}: {error}` - Image download failed, using SVG fallback
  - `manifest written {path}` - Image map manifest generated

**Site Monitoring:**
- No analytics or monitoring integrated (static site)

## CI/CD & Deployment

**Hosting:**
- Cloudflare Pages
  - Project name: focom-supports-bp
  - Configured via `wrangler.toml`
  - Compatibility date: 2026-04-02

**CI Pipeline:**
- Not configured in this repository
- Deployment likely configured in Cloudflare dashboard
- Build command: `npm run build` (fetches images then runs astro build)

**Build Output:**
- Static assets directory: `./dist`
- Ready for direct deployment to any static host

## Environment Configuration

**Required env vars:**
- None - Static site requires no runtime environment variables

**Secrets location:**
- None required - Site contains no sensitive credentials or API keys

**Build-time Configuration:**
- Site URL in `astro.config.mjs`
- Image source URLs specified in markdown front matter of posts

## Webhooks & Callbacks

**Incoming:**
- None - Static site cannot receive webhooks

**Outgoing:**
- None - No external services called after deployment

## Content Management

**Content Source:**
- Markdown files in `src/content/posts/`
- Front matter format (YAML):
  ```yaml
  ---
  title: Article Title
  date: 2024-01-15
  image: https://example.com/image.jpg or /local/path.jpg
  category: Category Name
  ---
  ```
- Schema validation via Zod in `src/content.config.ts`

**Image Management:**
- Remote images automatically downloaded and cached during build
- Local images referenced by relative path (no download needed)
- Fallback SVG generated if remote fetch fails
- Image paths mapped in `src/generated/image-map.json` for runtime resolution

## No External Service Dependencies

The site operates completely independently:
- No API calls to external services
- No database connections
- No authentication providers
- No payment processing
- No CDN configuration (uses static assets directly)
- No email service integration
- No analytics platforms

---

*Integration audit: 2026-04-02*
