<!-- GSD:project-start source:PROJECT.md -->
## Project

**FO Com Supports Banque Postale — Site syndical**

Site web statique du syndicat FO Com Supports Banque Postale, destiné aux équipes travaillant pour La Banque Postale et CNP Assurances au sein de l'établissement Supports Banque. Publie des analyses syndicales, points d'alerte sur les réorganisations, rappels sur les droits collectifs et prises de position. Entièrement statique, hébergé sur Cloudflare Pages, géré via Git/Markdown.

**Core Value:** Les militants peuvent publier un article en quelques minutes via un simple fichier Markdown, et le site est déployé automatiquement via Wrangler — sans friction technique.

### Constraints

- **Tech**: Astro 5 statique uniquement — aucun runtime serveur
- **Déploiement**: Cloudflare Pages via Wrangler — pas de CI/CD externe requis
- **Contenu**: Markdown + frontmatter YAML — pas de base de données
- **Build**: `npm run build` (fetch-images puis astro build) — internet requis au build pour les images distantes
- **Langue**: Site en français — tous les textes et la doc de contribution en français
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript/TypeScript (ESM) - All source code and configuration
- Markdown - Content files for blog posts
## Runtime
- Node.js (18.20.8 || ^20.3.0 || >=22.0.0) - Based on Astro 5.18.1 requirements
- npm - Uses lockfile version 3 (npm 10.x+)
- Lockfile: Present at `package-lock.json`
## Frameworks
- Astro 5.18.1 - Static site generator and framework for building the website
- Wrangler 4.79.0 - Cloudflare CLI tool (dev dependency)
## Key Dependencies
- astro (^5.0.0) - Core framework with integrated markdown processing
- @astrojs/markdown-remark (6.3.11) - Markdown/YAML front matter parsing
- @astrojs/prism (3.3.0) - Syntax highlighting for code blocks
- shiki (^3.21.0) - Modern syntax highlighter
- remark-* family (remark-parse, remark-gfm, remark-rehype, remark-smartypants)
- rehype-* family (rehype-raw, rehype-stringify)
- js-yaml (^4.1.1) - YAML parser for front matter
- vfile (^6.0.3) - Virtual file abstraction for content processing
- zod - Schema validation (used in `src/content.config.ts`)
- unified (^11.0.5) - Plugin system for content processing
- esbuild (^0.27.3) - JavaScript bundler and minifier
- clsx (^2.1.1) - Conditional CSS class utility
- cookie (^1.1.1) - HTTP cookie parsing/serialization
## Configuration
- No environment variables file detected (static site, no secrets required)
- Site URL configured in `astro.config.mjs`: https://focom-suportsbanquepostale.fr
- `astro.config.mjs` - Main Astro configuration
- `tsconfig.json` - TypeScript strict configuration (extends astro/tsconfigs/strict)
- `wrangler.toml` - Cloudflare Pages deployment config
- `package.json` - Node.js project manifest
- `npm run dev` - Start Astro dev server
- `npm run fetch-images` - Custom script to download remote images during build
- `npm run build` - Run image fetch then Astro build
- `npm run preview` - Preview production build locally
## Platform Requirements
- Node.js version 18.20.8 or later (20.3.0+ or 22.0.0+ recommended)
- npm 10.x+ (based on lockfile version 3)
- Operating system: Any (Windows, macOS, Linux)
- Deployment target: Cloudflare Pages
- Static Site Generation (SSG)
- Pre-rendered at build time
- No server-side rendering or API backend
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Astro components: PascalCase (e.g., `Header.astro`, `PostCard.astro`, `BaseLayout.astro`)
- Utility files: camelCase (e.g., `format.ts`, `images.ts`)
- TypeScript files: camelCase (e.g., `content.config.ts`, `env.d.ts`)
- CSS files: kebab-case in directory names (`global.css` in `styles/`)
- Page routes: kebab-case or index structure (e.g., `[slug].astro`, `index.astro`)
- Script files: kebab-case with `.mjs` extension (e.g., `fetch-images.mjs`)
- camelCase for function names: `formatDate()`, `resolvePostImage()`, `inferExtension()`, `buildFallbackSvg()`, `escapeXml()`
- Utility functions exported as named exports: `export function formatDate(value: Date)`
- Internal helper functions not exported: `function inferExtension()`, `function buildFallbackSvg()`
- camelCase for all variable declarations: `navItems`, `pathname`, `sourceImage`, `outputName`, `pagedPosts`, `pageSize`
- Constants use camelCase (not UPPER_CASE): `pageSize = 6`, `__dirname`, `rootDir`
- Exported constants follow same camelCase pattern: `manifest`, `collections`
- PascalCase for interfaces: `interface Props`, `type ImageMap`
- Nested type definitions: `Record<string, string>`
- Generic types: `Props` for component properties
## Code Style
- No explicit formatter detected in configuration
- Manual formatting observed with consistent style:
- No ESLint or Biome configuration files detected in project root
- TypeScript strict mode disabled: `"strict": false` in `tsconfig.json` (extends `astro/tsconfigs/strict`)
- Astro configuration uses `astro/tsconfigs/strict` as base
## Import Organization
- No path aliases detected; all imports use relative paths with `../` notation
- Common pattern: `../../layouts/`, `../../components/`, `../../utils/`
- Astro components use front matter (code fence) followed by HTML template
- Separation of concerns: TypeScript/logic in front matter, JSX-like syntax in template
- Example from `src/pages/actualites/index.astro`: code fence imports and data fetching, then HTML below
## Error Handling
- Try-catch blocks for async operations: `try { ... } catch (error) { ... }`
- Graceful fallback pattern in scripts: fetch error → generate fallback SVG (see `fetch-images.mjs`)
- Error logging via `process.stdout.write()` for build scripts
- Type guards using `instanceof` for error discrimination: `error instanceof Error ? error.message : String(error)`
- Nullish coalescing for defaults: `const map = imageMap as ImageMap;`, `response.headers.get("content-type") ?? ""`
- Optional chaining for safe property access: `post.body?.slice(0, 150)`
## Logging
- Build scripts use `process.stdout.write()` for status messages
- Messages are descriptive: `"image ok ${slug}"`, `"image fallback ${slug}: ..."`
- No structured logging; plain text output
- Messages end with `\n` for line breaks
## Comments
- No comments in source code observed
- Code is self-documenting through clear naming
- Markdown files document content and explain purpose
- Not used in codebase
- Type information provided via TypeScript interfaces
## Function Design
- `formatDate()`: 7 lines
- `resolvePostImage()`: 8 lines
- `inferExtension()`: 5 lines
- Utility functions rarely exceed 10 lines
- Destructuring used for component props: `const { post } = Astro.props;`
- Explicit typed parameters: `formatDate(value: Date)`, `resolvePostImage(postId: string, image: string)`
- Simple, focused parameter lists (1-2 parameters typical)
- Explicit return types: `formatDate(): string`
- Single return value pattern
- Use of optional returns where appropriate: `sourcemap?.[1]?.trim()`
## Module Design
- Named exports for utility functions: `export function formatDate()`
- Single default export for layouts: `export` implied by Astro convention
- Type exports for TypeScript: `type ImageMap = Record<string, string>;`
- No barrel files (`index.ts`) observed
- Direct imports from source files: `from "../utils/format"`
## Astro-Specific Conventions
- Props defined as TypeScript interfaces in front matter: `interface Props { ... }`
- Props destructured: `const { post } = Astro.props;`
- Props marked `optional?` when not always required: `description?: string`
- Astro uses curly brace interpolation: `{post.data.title}`
- Dynamic attributes: `href={`/actualites/${post.id}/`}`
- Class binding with Astro helper: `class:list={[condition && "className"]}`
- Conditional rendering with ternary or logical operators
- Static content collection: `await getCollection("posts")`
- Server-side rendering in pages: `const posts = (await getCollection("posts"))`
- Static path generation: `export async function getStaticPaths()`
- `<slot />` pattern for layout composition: `<BaseLayout>` wraps page content
- Props passed down to layouts: `title` and `description` to `BaseLayout.astro`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Fully static HTML output with no server-side rendering required
- Content sourced from versioned Markdown files in the repository
- Build-time asset processing (image fetching and optimization)
- Single-page application architecture with file-based routing
- No external runtime dependencies beyond build-time tooling
## Layers
- Purpose: Render HTML templates and components for user-facing content
- Location: `src/pages/`, `src/components/`, `src/layouts/`
- Contains: Astro page templates, reusable UI components, base layout structure
- Depends on: Content layer (via `astro:content`), utility functions
- Used by: Browser rendering engine, deployed static site
- Purpose: Define and manage structured content schemas and collections
- Location: `src/content/`, `src/content.config.ts`
- Contains: Markdown post files with YAML frontmatter, content collection definitions
- Depends on: File system, Zod validation
- Used by: Pages layer, build-time content generation
- Purpose: Provide reusable helper functions for formatting and data transformation
- Location: `src/utils/`
- Contains: Date formatting, image URL resolution functions
- Depends on: Generated assets (image map manifest)
- Used by: Pages and components
- Purpose: Handle external image fetching, local caching, and fallback generation
- Location: `scripts/fetch-images.mjs`, build pipeline
- Contains: Image download logic, format detection, SVG fallback generator
- Depends on: Remote URLs, file system, public directory
- Used by: Build process, image resolution utilities
- Generated artifacts: `src/generated/image-map.json`, `public/images/posts/`
- Purpose: Provide consistent page structure and metadata
- Location: `src/layouts/BaseLayout.astro`
- Contains: HTML document structure, meta tags, global styles
- Depends on: CSS styles
- Used by: All pages
## Data Flow
- No runtime state management (static site)
- Content state exists only at build time in memory
- Posts collection is read, sorted, and rendered once per build
- User-facing interaction is pure HTML/CSS (no JavaScript framework)
## Key Abstractions
- Purpose: Type-safe schema for post metadata and content
- Examples: `src/content.config.ts` defines `posts` collection
- Pattern: Zod schema validation with required fields (title, date, image, category)
- Purpose: Astro `.astro` file that represents a URL route
- Examples: `src/pages/index.astro`, `src/pages/actualites/[slug].astro`
- Pattern: Frontmatter JavaScript + template markup, async data fetching
- Purpose: Wrapper template for page HTML structure
- Example: `src/layouts/BaseLayout.astro`
- Pattern: Accepts `title` and optional `description` props, renders `<slot />`
- Purpose: Pure function for data transformation
- Examples: `formatDate()`, `resolvePostImage()`
- Pattern: Export named functions from TypeScript modules in `src/utils/`
- Purpose: Reusable presentation of post summary
- Example: `src/components/PostCard.astro`
- Pattern: Accepts post object with data and body, renders article preview
## Entry Points
- Location: `astro.config.mjs`
- Triggers: `npm run build` command
- Responsibilities: Define site URL, output mode (static), build configuration
- Location: `astro dev` (implicit, uses `astro.config.mjs`)
- Triggers: `npm run dev` command
- Responsibilities: Local development server with hot reload
- Location: `src/pages/index.astro`
- Triggers: Route `/` or domain root
- Responsibilities: Display hero section, 3 latest posts, section info
- Location: `src/pages/actualites/index.astro`
- Triggers: Route `/actualites/`
- Responsibilities: Display paginated post listing (6 per page), pagination controls
- Location: `src/pages/actualites/page/[page].astro`
- Triggers: Route `/actualites/page/{page}/` where page >= 2
- Responsibilities: Display paginated subset for specific page number
- Location: `src/pages/actualites/[slug].astro`
- Triggers: Route `/actualites/{post-id}/`
- Responsibilities: Display full article with metadata, image, rendered content
- Location: `src/pages/contact/index.astro`
- Triggers: Route `/contact/`
- Responsibilities: Display contact information and representative details
## Error Handling
- **Image Fetch Failure:** Script catches fetch errors and generates fallback SVG with gradient and text overlay (file: `scripts/fetch-images.mjs` lines 46-52)
- **Missing Image Mapping:** `resolvePostImage()` uses nullish coalescing (`??`) to fall back to original image path if post ID not in manifest (file: `src/utils/images.ts` line 7)
- **Content Not Found:** Astro's file-based routing returns 404 for non-existent slugs (implicit behavior)
- **Build Failures:** npm script chain uses `&&` so image fetch failure stops build before Astro runs
## Cross-Cutting Concerns
- Navigation labels: "Accueil", "Actualites", "Contact"
- Page headings: "Dernieres actualites", "Vie de la section"
- Contact information: "Email :", "Permanence :", "Site :"
- No translation framework; locale fixed at build time
- Framework: Plain CSS (no preprocessor)
- Global styles: `src/styles/global.css`
- Design tokens: CSS custom properties for colors (`--fo-red`, `--fo-navy`), spacing, typography
- Approach: CSS Grid and Flexbox for layout, responsive design via `min()` function
- Semantic HTML (header, nav, main, article, footer)
- ARIA labels on navigation (`aria-label="Navigation principale"`)
- Image alt text populated from post title
- Link context preserved (e.g., "Lire l'article" vs. generic "Read more")
- Strategy: Pure static files serve instantly
- Image optimization: Lazy loading on post card images (`loading="lazy"`)
- Build optimization: `npm run fetch-images` runs once per build, caches images locally
- No JavaScript runtime overhead (static HTML only)
- Page titles: Descriptive, unique per page (e.g., `${post.data.title} | FO Com Supports Banque Postale`)
- Meta description: Default in `BaseLayout`, per-page override via props
- Open Graph: Not implemented (static content site)
- Structured data: Not implemented
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
