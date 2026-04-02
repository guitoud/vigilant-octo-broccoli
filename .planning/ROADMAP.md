# Roadmap: FO Com Supports Banque Postale v1

**Project:** Static syndical website (Astro 5 + Cloudflare Pages)
**Core Value:** Les militants peuvent publier un article et déployer le site via Wrangler sans friction technique
**Granularity:** COARSE (3 phases)
**Coverage:** 9/9 v1 requirements mapped

## Phases

- [ ] **Phase 1: Site Foundation Fixes** - Correct URL typo and centralize contact data
- [ ] **Phase 2: Branding & Logo** - Prepare Header for logo image and document in contribution guide
- [ ] **Phase 3: Contribution & Deployment Guide** - Complete documentation enabling contributors to create articles and deploy independently

## Phase Details

### Phase 1: Site Foundation Fixes

**Goal:** Fix critical issues in existing site (URL typo, contact data) to ensure correct deployment and clean contact info

**Depends on:** Nothing (foundation)

**Requirements:** DEPL-02, CONT-01, CONT-02

**Success Criteria** (what must be TRUE):
1. URL in astro.config.mjs is corrected (focom-supportsbanquepostale.fr instead of focom-suportsbanquepostale.fr)
2. Contact page displays no duplicate representatives
3. Contact data (email, representatives, permanences) is stored in a single configuration source (not duplicated in HTML template)

**Plans:** 2 plans

Plans:
- [ ] 01-01-PLAN.md — Correction de la typo URL canonique dans astro.config.mjs
- [ ] 01-02-PLAN.md — Centralisation des données contact dans src/config/contact.ts et suppression des doublons

---

### Phase 2: Branding & Logo

**Goal:** Enable logo customization by documenting logo slot and preparing Header for image replacement

**Depends on:** Phase 1

**Requirements:** BRAND-01

**Success Criteria** (what must be TRUE):
1. Header component has a clearly documented image slot for logo (replaces text "FO")
2. Contribution guide includes instructions for where to place logo file and how to swap in Header

**Plans:** TBD

**UI hint:** yes

---

### Phase 3: Contribution & Deployment Guide

**Goal:** Empower contributors to create articles and deploy site independently via clear, comprehensive documentation

**Depends on:** Phase 1

**Requirements:** DOCS-01, DOCS-02, DOCS-03, DOCS-04, DEPL-01

**Success Criteria** (what must be TRUE):
1. Contributor can create a complete Markdown article by following guide (frontmatter with title/date/image/category, correct file placement, minimal example provided)
2. Contributor can set up local environment by following guide (clone repository, npm install, npm run dev)
3. Contributor can build and verify site locally by following guide (npm run build, dist/ folder verification, build output checking)
4. Contributor can deploy to Cloudflare Pages by following documented Wrangler command (npm run deploy or wrangler pages deploy ./dist)

**Plans:** TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Site Foundation Fixes | 0/2 | Not started | — |
| 2. Branding & Logo | 0/2 | Not started | — |
| 3. Contribution & Deployment Guide | 0/5 | Not started | — |
