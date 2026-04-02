# Architecture

**Analysis Date:** 2026-04-02

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Content Management via Git-driven Markdown

**Key Characteristics:**
- Fully static HTML output with no server-side rendering required
- Content sourced from versioned Markdown files in the repository
- Build-time asset processing (image fetching and optimization)
- Single-page application architecture with file-based routing
- No external runtime dependencies beyond build-time tooling

## Layers

**Presentation Layer:**
- Purpose: Render HTML templates and components for user-facing content
- Location: `src/pages/`, `src/components/`, `src/layouts/`
- Contains: Astro page templates, reusable UI components, base layout structure
- Depends on: Content layer (via `astro:content`), utility functions
- Used by: Browser rendering engine, deployed static site

**Content Layer:**
- Purpose: Define and manage structured content schemas and collections
- Location: `src/content/`, `src/content.config.ts`
- Contains: Markdown post files with YAML frontmatter, content collection definitions
- Depends on: File system, Zod validation
- Used by: Pages layer, build-time content generation

**Utility Layer:**
- Purpose: Provide reusable helper functions for formatting and data transformation
- Location: `src/utils/`
- Contains: Date formatting, image URL resolution functions
- Depends on: Generated assets (image map manifest)
- Used by: Pages and components

**Asset Processing Layer:**
- Purpose: Handle external image fetching, local caching, and fallback generation
- Location: `scripts/fetch-images.mjs`, build pipeline
- Contains: Image download logic, format detection, SVG fallback generator
- Depends on: Remote URLs, file system, public directory
- Used by: Build process, image resolution utilities
- Generated artifacts: `src/generated/image-map.json`, `public/images/posts/`

**Layout Layer:**
- Purpose: Provide consistent page structure and metadata
- Location: `src/layouts/BaseLayout.astro`
- Contains: HTML document structure, meta tags, global styles
- Depends on: CSS styles
- Used by: All pages

## Data Flow

**Content Publication Flow:**

1. Author writes Markdown file in `src/content/posts/` with frontmatter (title, date, image, category)
2. Build process (`npm run build`) executes in sequence:
   - `fetch-images` script reads all post files
   - Extracts image URLs from frontmatter
   - Downloads remote images or uses local paths
   - Creates `src/generated/image-map.json` mapping post IDs to image paths
   - Astro processes all pages using content collections
   - Markdown is rendered to HTML
   - Static site generated to `dist/` directory

3. Image Resolution:
   - `resolvePostImage()` in `src/utils/images.ts` looks up post ID in manifest
   - Falls back to original image path if not found
   - Returns final image URL for template rendering

**Page Navigation Flow:**

1. User visits URL (e.g., `/actualites/`)
2. Astro router matches file-based route to page component
3. Page component fetches content collection using `getCollection()`
4. Content is sorted, filtered, and rendered via components
5. Static HTML generated with embedded component output
6. Browser receives complete HTML (no client-side hydration)

**Static Generation Flow:**

1. Home page (`src/pages/index.astro`):
   - Fetches all posts from collection
   - Sorts by date (newest first)
   - Displays 3 latest as cards + info section

2. Actualites listing (`src/pages/actualites/index.astro`):
   - Fetches all posts
   - Paginates with 6 posts per page
   - Generates pagination links

3. Actualites dynamic pages (`src/pages/actualites/page/[page].astro`):
   - Pre-rendered for each page number
   - Shows paginated subset of posts

4. Individual article (`src/pages/actualites/[slug].astro`):
   - Uses `getStaticPaths()` to pre-render all posts
   - Each slug maps to unique post via file-based routing
   - Renders full article with metadata

5. Contact page (`src/pages/contact/index.astro`):
   - Static content (no dynamic generation)

**State Management:**

- No runtime state management (static site)
- Content state exists only at build time in memory
- Posts collection is read, sorted, and rendered once per build
- User-facing interaction is pure HTML/CSS (no JavaScript framework)

## Key Abstractions

**Content Collection:**
- Purpose: Type-safe schema for post metadata and content
- Examples: `src/content.config.ts` defines `posts` collection
- Pattern: Zod schema validation with required fields (title, date, image, category)

**Page Component:**
- Purpose: Astro `.astro` file that represents a URL route
- Examples: `src/pages/index.astro`, `src/pages/actualites/[slug].astro`
- Pattern: Frontmatter JavaScript + template markup, async data fetching

**Layout Component:**
- Purpose: Wrapper template for page HTML structure
- Example: `src/layouts/BaseLayout.astro`
- Pattern: Accepts `title` and optional `description` props, renders `<slot />`

**Utility Function:**
- Purpose: Pure function for data transformation
- Examples: `formatDate()`, `resolvePostImage()`
- Pattern: Export named functions from TypeScript modules in `src/utils/`

**Card Component:**
- Purpose: Reusable presentation of post summary
- Example: `src/components/PostCard.astro`
- Pattern: Accepts post object with data and body, renders article preview

## Entry Points

**Build Entry:**
- Location: `astro.config.mjs`
- Triggers: `npm run build` command
- Responsibilities: Define site URL, output mode (static), build configuration

**Development Entry:**
- Location: `astro dev` (implicit, uses `astro.config.mjs`)
- Triggers: `npm run dev` command
- Responsibilities: Local development server with hot reload

**Page Entry Points:**

**Home Page:**
- Location: `src/pages/index.astro`
- Triggers: Route `/` or domain root
- Responsibilities: Display hero section, 3 latest posts, section info

**Actualites Root:**
- Location: `src/pages/actualites/index.astro`
- Triggers: Route `/actualites/`
- Responsibilities: Display paginated post listing (6 per page), pagination controls

**Actualites Page:**
- Location: `src/pages/actualites/page/[page].astro`
- Triggers: Route `/actualites/page/{page}/` where page >= 2
- Responsibilities: Display paginated subset for specific page number

**Actualites Article:**
- Location: `src/pages/actualites/[slug].astro`
- Triggers: Route `/actualites/{post-id}/`
- Responsibilities: Display full article with metadata, image, rendered content

**Contact Page:**
- Location: `src/pages/contact/index.astro`
- Triggers: Route `/contact/`
- Responsibilities: Display contact information and representative details

## Error Handling

**Strategy:** Build-time failures vs. graceful degradation

**Patterns:**

- **Image Fetch Failure:** Script catches fetch errors and generates fallback SVG with gradient and text overlay (file: `scripts/fetch-images.mjs` lines 46-52)
- **Missing Image Mapping:** `resolvePostImage()` uses nullish coalescing (`??`) to fall back to original image path if post ID not in manifest (file: `src/utils/images.ts` line 7)
- **Content Not Found:** Astro's file-based routing returns 404 for non-existent slugs (implicit behavior)
- **Build Failures:** npm script chain uses `&&` so image fetch failure stops build before Astro runs

## Cross-Cutting Concerns

**Localization:**

All UI text is hardcoded in French:
- Navigation labels: "Accueil", "Actualites", "Contact"
- Page headings: "Dernieres actualites", "Vie de la section"
- Contact information: "Email :", "Permanence :", "Site :"
- No translation framework; locale fixed at build time

**Styling:**

- Framework: Plain CSS (no preprocessor)
- Global styles: `src/styles/global.css`
- Design tokens: CSS custom properties for colors (`--fo-red`, `--fo-navy`), spacing, typography
- Approach: CSS Grid and Flexbox for layout, responsive design via `min()` function

**Accessibility:**

- Semantic HTML (header, nav, main, article, footer)
- ARIA labels on navigation (`aria-label="Navigation principale"`)
- Image alt text populated from post title
- Link context preserved (e.g., "Lire l'article" vs. generic "Read more")

**Performance:**

- Strategy: Pure static files serve instantly
- Image optimization: Lazy loading on post card images (`loading="lazy"`)
- Build optimization: `npm run fetch-images` runs once per build, caches images locally
- No JavaScript runtime overhead (static HTML only)

**Metadata & SEO:**

- Page titles: Descriptive, unique per page (e.g., `${post.data.title} | FO Com Supports Banque Postale`)
- Meta description: Default in `BaseLayout`, per-page override via props
- Open Graph: Not implemented (static content site)
- Structured data: Not implemented

---

*Architecture analysis: 2026-04-02*
