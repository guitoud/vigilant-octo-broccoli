# Coding Conventions

**Analysis Date:** 2026-04-02

## Naming Patterns

**Files:**
- Astro components: PascalCase (e.g., `Header.astro`, `PostCard.astro`, `BaseLayout.astro`)
- Utility files: camelCase (e.g., `format.ts`, `images.ts`)
- TypeScript files: camelCase (e.g., `content.config.ts`, `env.d.ts`)
- CSS files: kebab-case in directory names (`global.css` in `styles/`)
- Page routes: kebab-case or index structure (e.g., `[slug].astro`, `index.astro`)
- Script files: kebab-case with `.mjs` extension (e.g., `fetch-images.mjs`)

**Functions:**
- camelCase for function names: `formatDate()`, `resolvePostImage()`, `inferExtension()`, `buildFallbackSvg()`, `escapeXml()`
- Utility functions exported as named exports: `export function formatDate(value: Date)`
- Internal helper functions not exported: `function inferExtension()`, `function buildFallbackSvg()`

**Variables:**
- camelCase for all variable declarations: `navItems`, `pathname`, `sourceImage`, `outputName`, `pagedPosts`, `pageSize`
- Constants use camelCase (not UPPER_CASE): `pageSize = 6`, `__dirname`, `rootDir`
- Exported constants follow same camelCase pattern: `manifest`, `collections`

**Types:**
- PascalCase for interfaces: `interface Props`, `type ImageMap`
- Nested type definitions: `Record<string, string>`
- Generic types: `Props` for component properties

## Code Style

**Formatting:**
- No explicit formatter detected in configuration
- Manual formatting observed with consistent style:
  - 2-space indentation throughout
  - Single quotes in TypeScript, double quotes in HTML
  - No trailing semicolons in template literals or object literals within code blocks
  - Consistent spacing around operators and after control flow keywords

**Linting:**
- No ESLint or Biome configuration files detected in project root
- TypeScript strict mode disabled: `"strict": false` in `tsconfig.json` (extends `astro/tsconfigs/strict`)
- Astro configuration uses `astro/tsconfigs/strict` as base

## Import Organization

**Order:**
1. Node.js built-in modules: `import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";`
2. Third-party framework imports: `import { defineCollection, z } from "astro:content";`
3. Relative imports from same project: `import { formatDate } from "../utils/format";`
4. Astro-specific imports: `import { getCollection } from "astro:content";`

**Path Aliases:**
- No path aliases detected; all imports use relative paths with `../` notation
- Common pattern: `../../layouts/`, `../../components/`, `../../utils/`

**Astro Component Structure:**
- Astro components use front matter (code fence) followed by HTML template
- Separation of concerns: TypeScript/logic in front matter, JSX-like syntax in template
- Example from `src/pages/actualites/index.astro`: code fence imports and data fetching, then HTML below

## Error Handling

**Patterns:**
- Try-catch blocks for async operations: `try { ... } catch (error) { ... }`
- Graceful fallback pattern in scripts: fetch error → generate fallback SVG (see `fetch-images.mjs`)
- Error logging via `process.stdout.write()` for build scripts
- Type guards using `instanceof` for error discrimination: `error instanceof Error ? error.message : String(error)`
- Nullish coalescing for defaults: `const map = imageMap as ImageMap;`, `response.headers.get("content-type") ?? ""`
- Optional chaining for safe property access: `post.body?.slice(0, 150)`

## Logging

**Framework:** console/process.stdout only (no logging library)

**Patterns:**
- Build scripts use `process.stdout.write()` for status messages
- Messages are descriptive: `"image ok ${slug}"`, `"image fallback ${slug}: ..."`
- No structured logging; plain text output
- Messages end with `\n` for line breaks

## Comments

**When to Comment:**
- No comments in source code observed
- Code is self-documenting through clear naming
- Markdown files document content and explain purpose

**JSDoc/TSDoc:**
- Not used in codebase
- Type information provided via TypeScript interfaces

## Function Design

**Size:** Functions are small and focused
- `formatDate()`: 7 lines
- `resolvePostImage()`: 8 lines
- `inferExtension()`: 5 lines
- Utility functions rarely exceed 10 lines

**Parameters:**
- Destructuring used for component props: `const { post } = Astro.props;`
- Explicit typed parameters: `formatDate(value: Date)`, `resolvePostImage(postId: string, image: string)`
- Simple, focused parameter lists (1-2 parameters typical)

**Return Values:**
- Explicit return types: `formatDate(): string`
- Single return value pattern
- Use of optional returns where appropriate: `sourcemap?.[1]?.trim()`

## Module Design

**Exports:**
- Named exports for utility functions: `export function formatDate()`
- Single default export for layouts: `export` implied by Astro convention
- Type exports for TypeScript: `type ImageMap = Record<string, string>;`

**Barrel Files:**
- No barrel files (`index.ts`) observed
- Direct imports from source files: `from "../utils/format"`

## Astro-Specific Conventions

**Component Props:**
- Props defined as TypeScript interfaces in front matter: `interface Props { ... }`
- Props destructured: `const { post } = Astro.props;`
- Props marked `optional?` when not always required: `description?: string`

**Template Syntax:**
- Astro uses curly brace interpolation: `{post.data.title}`
- Dynamic attributes: `href={`/actualites/${post.id}/`}`
- Class binding with Astro helper: `class:list={[condition && "className"]}`
- Conditional rendering with ternary or logical operators

**Data Fetching:**
- Static content collection: `await getCollection("posts")`
- Server-side rendering in pages: `const posts = (await getCollection("posts"))`
- Static path generation: `export async function getStaticPaths()`

**Layout Inheritance:**
- `<slot />` pattern for layout composition: `<BaseLayout>` wraps page content
- Props passed down to layouts: `title` and `description` to `BaseLayout.astro`

---

*Convention analysis: 2026-04-02*
