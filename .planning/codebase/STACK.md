# Technology Stack

**Analysis Date:** 2026-04-02

## Languages

**Primary:**
- JavaScript/TypeScript (ESM) - All source code and configuration
- Markdown - Content files for blog posts

## Runtime

**Environment:**
- Node.js (18.20.8 || ^20.3.0 || >=22.0.0) - Based on Astro 5.18.1 requirements

**Package Manager:**
- npm - Uses lockfile version 3 (npm 10.x+)
- Lockfile: Present at `package-lock.json`

## Frameworks

**Core:**
- Astro 5.18.1 - Static site generator and framework for building the website
  - Output mode: Static (generates pre-rendered HTML)
  - Site configuration in `astro.config.mjs`

**Build/Dev:**
- Wrangler 4.79.0 - Cloudflare CLI tool (dev dependency)
  - Pages build output directory: `./dist`
  - Compatibility date: 2026-04-02

## Key Dependencies

**Critical:**
- astro (^5.0.0) - Core framework with integrated markdown processing
  - Includes @astrojs/compiler, @astrojs/markdown-remark, @astrojs/telemetry
  - Built-in content collections system (Astro Content API)

**Build & Markdown Processing:**
- @astrojs/markdown-remark (6.3.11) - Markdown/YAML front matter parsing
- @astrojs/prism (3.3.0) - Syntax highlighting for code blocks
- shiki (^3.21.0) - Modern syntax highlighter
- remark-* family (remark-parse, remark-gfm, remark-rehype, remark-smartypants)
- rehype-* family (rehype-raw, rehype-stringify)
- js-yaml (^4.1.1) - YAML parser for front matter

**Content & Data:**
- vfile (^6.0.3) - Virtual file abstraction for content processing
- zod - Schema validation (used in `src/content.config.ts`)
- unified (^11.0.5) - Plugin system for content processing

**Utilities:**
- esbuild (^0.27.3) - JavaScript bundler and minifier
- clsx (^2.1.1) - Conditional CSS class utility
- cookie (^1.1.1) - HTTP cookie parsing/serialization

## Configuration

**Environment:**
- No environment variables file detected (static site, no secrets required)
- Site URL configured in `astro.config.mjs`: https://focom-suportsbanquepostale.fr

**Build:**
- `astro.config.mjs` - Main Astro configuration
- `tsconfig.json` - TypeScript strict configuration (extends astro/tsconfigs/strict)
- `wrangler.toml` - Cloudflare Pages deployment config
- `package.json` - Node.js project manifest

**Scripts:**
- `npm run dev` - Start Astro dev server
- `npm run fetch-images` - Custom script to download remote images during build
- `npm run build` - Run image fetch then Astro build
- `npm run preview` - Preview production build locally

## Platform Requirements

**Development:**
- Node.js version 18.20.8 or later (20.3.0+ or 22.0.0+ recommended)
- npm 10.x+ (based on lockfile version 3)
- Operating system: Any (Windows, macOS, Linux)

**Production:**
- Deployment target: Cloudflare Pages
  - Uses Wrangler CLI for deployment
  - Static build output in `./dist` directory
  - Compatibility date: 2026-04-02
  - No database or runtime services required (fully static site)

**Project Type:**
- Static Site Generation (SSG)
- Pre-rendered at build time
- No server-side rendering or API backend

---

*Stack analysis: 2026-04-02*
