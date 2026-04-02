# Codebase Structure

**Analysis Date:** 2026-04-02

## Directory Layout

```
focom-supports-bp/
├── src/                    # All application source code
│   ├── components/         # Reusable Astro components
│   ├── content/            # Markdown content collections
│   │   └── posts/          # Blog post .md files
│   ├── generated/          # Build-generated files (gitignored)
│   ├── layouts/            # Page layout wrappers
│   ├── pages/              # File-based routing (Astro)
│   │   ├── actualites/     # News/posts section
│   │   └── contact/        # Contact page
│   ├── styles/             # Global CSS
│   └── utils/              # TypeScript utility functions
├── public/                 # Static assets served as-is
│   └── images/posts/       # Downloaded post images (gitignored, build artifact)
├── scripts/                # Build-time Node.js scripts
├── dist/                   # Build output (gitignored)
├── plans/                  # Project planning notes
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
├── wrangler.toml           # Cloudflare Pages deployment config
└── package.json            # Project manifest and scripts
```

## Directory Purposes

**`src/components/`:**
- Purpose: Reusable UI components shared across pages
- Contains: `*.astro` component files
- Key files: `Header.astro`, `Footer.astro`, `Hero.astro`, `PostCard.astro`
- Subdirectories: None (flat)

**`src/content/posts/`:**
- Purpose: Source of truth for all published articles
- Contains: `*.md` files with YAML frontmatter (title, date, image, category)
- Key files: One `.md` file per post, slug derived from filename
- Subdirectories: None

**`src/generated/`:**
- Purpose: Build-generated artifacts consumed by source code
- Contains: `image-map.json` — maps post slugs to resolved local image paths
- Key files: `image-map.json` (produced by `scripts/fetch-images.mjs`)
- Subdirectories: None
- Note: Gitignored — must be regenerated on every build

**`src/layouts/`:**
- Purpose: Page shell templates wrapping page content
- Contains: `*.astro` layout files
- Key files: `BaseLayout.astro` — single layout used by all pages
- Subdirectories: None

**`src/pages/`:**
- Purpose: Astro file-based routing — each file maps to a URL
- Contains: `*.astro` page files
- Key files:
  - `index.astro` — homepage
  - `actualites/index.astro` — news listing (page 1)
  - `actualites/page/[page].astro` — paginated listing
  - `actualites/[slug].astro` — individual post detail
  - `contact/index.astro` — contact page
- Subdirectories: `actualites/`, `contact/`

**`src/utils/`:**
- Purpose: Shared TypeScript helper functions
- Contains: `*.ts` utility modules
- Key files:
  - `format.ts` — date/text formatting helpers
  - `images.ts` — resolves post images via `image-map.json`
- Subdirectories: None

**`src/styles/`:**
- Purpose: Global CSS applied site-wide
- Contains: `global.css`
- Key files: `global.css` — base styles, CSS variables

**`scripts/`:**
- Purpose: Build-time automation scripts
- Contains: `*.mjs` Node.js scripts run before `astro build`
- Key files: `fetch-images.mjs` — fetches remote post images, writes fallback SVGs, generates `src/generated/image-map.json`
- Subdirectories: None

**`public/`:**
- Purpose: Static files copied verbatim to build output
- Contains: `images/posts/` — resolved post images (gitignored, populated by build)
- Key files: None committed

**`plans/`:**
- Purpose: Project planning documents (informal)
- Contains: Planning notes and specs
- Subdirectories: None

## Key File Locations

**Entry Points:**
- `src/pages/index.astro` — homepage
- `src/pages/actualites/[slug].astro` — post detail page (dynamic route)
- `scripts/fetch-images.mjs` — prebuild step entry point

**Configuration:**
- `astro.config.mjs` — Astro config (site URL, output mode)
- `tsconfig.json` — TypeScript config (extends astro/tsconfigs/strict)
- `wrangler.toml` — Cloudflare Pages deployment (project name, build output dir)
- `.gitignore` — excludes `dist/`, `public/images/posts/`, `src/generated/image-map.json`, `node_modules/`, `.astro/`

**Core Logic:**
- `src/content.config.ts` — defines `posts` collection schema (title, date, image, category)
- `src/utils/images.ts` — resolves post image path from generated image map
- `src/utils/format.ts` — formatting utilities
- `scripts/fetch-images.mjs` — full image pipeline: reads frontmatter, fetches URLs, generates fallback SVGs, writes manifest

**Content:**
- `src/content/posts/*.md` — all articles (one file per post, slug = filename without `.md`)

**Generated (runtime):**
- `src/generated/image-map.json` — slug → local image path mapping, consumed by `src/utils/images.ts`
- `public/images/posts/*.jpg` — downloaded post images

## Naming Conventions

**Files:**
- `kebab-case.md` — post slugs and content files (e.g., `bienvenue-site-focom-supports-bp.md`)
- `PascalCase.astro` — components and layouts (e.g., `PostCard.astro`, `BaseLayout.astro`)
- `camelCase.ts` / `camelCase.mjs` — utility and script files (e.g., `format.ts`, `fetch-images.mjs`)
- `kebab-case.astro` — page files (e.g., `index.astro`, `[slug].astro`)

**Directories:**
- `kebab-case` for all directories
- Plural names for collections: `posts/`, `components/`, `pages/`, `layouts/`, `utils/`, `styles/`

**URL Convention:**
- Post URLs: `/actualites/{slug}` where slug = markdown filename without extension
- Paginated listing: `/actualites/page/{n}`

## Where to Add New Code

**New Blog Post:**
- Content: `src/content/posts/{slug}.md` with frontmatter (title, date, image, category)
- Image: Provide URL in frontmatter — `scripts/fetch-images.mjs` downloads it at build time

**New Page:**
- Implementation: `src/pages/{route}/index.astro` or `src/pages/{route}.astro`
- Uses: `src/layouts/BaseLayout.astro` as wrapper

**New Component:**
- Implementation: `src/components/{Name}.astro`
- Import in consuming page/layout directly

**New Utility:**
- Implementation: `src/utils/{name}.ts`
- Export named functions, import where needed

**New Content Category:**
- Collection schema: `src/content.config.ts`
- New collection directory: `src/content/{category}/`
- New page routes: `src/pages/{category}/`

## Special Directories

**`dist/`:**
- Purpose: Astro static build output
- Source: Generated by `astro build`
- Committed: No (gitignored)

**`public/images/posts/`:**
- Purpose: Downloaded post images served as static assets
- Source: Generated by `scripts/fetch-images.mjs` during build
- Committed: No (gitignored)

**`src/generated/`:**
- Purpose: Runtime-consumed build artifacts
- Source: Generated by `scripts/fetch-images.mjs`
- Committed: No (gitignored) — regenerated on every `npm run build`

**`.astro/`:**
- Purpose: Astro internal cache (type definitions, content modules, settings)
- Source: Auto-generated by Astro dev/build
- Committed: No (gitignored)

---

*Structure analysis: 2026-04-02*
*Update when directory structure changes*
