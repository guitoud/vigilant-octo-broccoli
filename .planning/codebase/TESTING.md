# Testing Patterns

**Analysis Date:** 2026-04-02

## Test Framework

**Runner:**
- Not detected - No test runner configured (Jest, Vitest, etc. not in dependencies)
- `package.json` contains only `astro` and `wrangler` as dependencies

**Assertion Library:**
- Not applicable - No test framework present

**Run Commands:**
- No test commands in `package.json`
- Build command: `npm run build` (runs `npm run fetch-images && astro build`)
- Development: `npm run dev` (runs `astro dev`)
- Image fetching: `npm run fetch-images` (manual pre-build script)

## Test File Organization

**Location:**
- No test files present in codebase
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files in `src/` directory
- Test files from dependencies exist in `node_modules/` (from Zod, etc.) but are not part of this project

**Naming:**
- Not applicable - No test files in project

**Structure:**
- Not applicable - No test framework in use

## Test Structure

**Suite Organization:**
- Not applicable - No test suites present

**Patterns:**
- Not applicable - No testing infrastructure

## Mocking

**Framework:**
- Not applicable - No testing framework

**Patterns:**
- Not applicable

**What to Mock:**
- Not applicable

**What NOT to Mock:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not applicable - No test framework

**Location:**
- Not applicable

## Coverage

**Requirements:**
- Not enforced - No code coverage tooling detected
- No test coverage configuration

**View Coverage:**
- Not applicable

## Test Types

**Unit Tests:**
- Not present in codebase
- Type checking via TypeScript provides some validation (strict mode disabled)

**Integration Tests:**
- Not present in codebase
- Build process integration is tested indirectly via successful `npm run build`

**E2E Tests:**
- Not used
- Static site generation (`output: "static"` in astro.config.mjs) limits E2E testing needs

## Manual Validation Patterns

**Build Validation:**
- The build process is the primary validation mechanism
- Build command includes `fetch-images` script which:
  - Validates image URLs and HTTP responses
  - Generates fallback SVGs on fetch failure
  - Creates manifest JSON for image mapping
  - Reports success/failure per image via stdout

**Error Handling in Build:**
- Fetch errors produce informational output: `"image fallback ${slug}: ${error}"`
- Invalid HTTP responses throw with status: `throw new Error(\`HTTP ${response.status}\`)`
- Graceful degradation: Failed fetches generate fallback placeholder SVGs

**Data Validation:**
- Astro content schema validation via Zod in `src/content.config.ts`:
  ```typescript
  const posts = defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      image: z.string(),
      category: z.string(),
    }),
  });
  ```
- Schema enforces required fields and types for all posts
- Date coercion: `z.coerce.date()` converts string to Date

**TypeScript Type Checking:**
- TypeScript configured with `astro/tsconfigs/strict` as base (though strict mode disabled)
- Interfaces provide compile-time type safety:
  - `interface Props { ... }` ensures component prop structure
  - `type ImageMap = Record<string, string>;` type-checks image mapping
- No runtime type validation beyond schema

## Quality Assurance Approach

**Current State:**
- Testing relies on TypeScript type system and build-time validation
- Manual testing via `npm run dev` for development
- Build failure indicates issues in:
  - Image fetching/processing
  - Content schema violations
  - TypeScript compilation errors

**Validation Layers:**
1. **Build Script Validation** (`fetch-images.mjs`):
   - HTTP status code validation
   - File type detection from content-type header
   - Fallback SVG generation on failure

2. **Astro Content Validation**:
   - Zod schema validation on posts collection
   - Type coercion for dates

3. **TypeScript Validation**:
   - Interface compliance for component props
   - Type inference for utility function returns

**Gaps:**
- No unit test coverage for utility functions (`format.ts`, `images.ts`)
- No integration tests for content rendering pipeline
- No E2E tests for frontend functionality
- Build script error handling is graceful but not tested

## Testing Recommendations

For future additions:
- Consider Vitest for unit testing utilities (format.ts, images.ts)
- Use Astro's built-in testing capabilities for component testing
- Add E2E tests with Playwright if interactive features are added
- Consider adding pre-commit hooks to validate Markdown frontmatter

---

*Testing analysis: 2026-04-02*
