# FO Com Supports Banque Postale — Site syndical

## What This Is

Site web statique du syndicat FO Com Supports Banque Postale, destiné aux équipes travaillant pour La Banque Postale au sein de l'établissement Supports Banque. Publie des analyses syndicales, points d'alerte sur les réorganisations, rappels sur les droits collectifs et prises de position. Entièrement statique, hébergé sur Cloudflare Pages, géré via Git/Markdown.

## Core Value

Les militants peuvent publier un article en quelques minutes via un simple fichier Markdown, et le site est déployé automatiquement via Wrangler — sans friction technique.

## Requirements

### Validated

- ✓ Site statique Astro 5 génère du HTML depuis des posts Markdown — existing
- ✓ Listing des articles avec pagination (6 par page) — existing
- ✓ Pages de détail par article avec image de couverture — existing
- ✓ Pipeline d'images (fetch-images.mjs : téléchargement + cache local) — existing
- ✓ Structure de base (Header, Footer, BaseLayout, nav active) — existing
- ✓ Page contact avec email, permanences, représentants — existing
- ✓ wrangler.toml configuré pour Cloudflare Pages (output: ./dist) — existing
- ✓ Corriger le typo d'URL dans astro.config.mjs (focom-suportsbanquepostale.fr → focom-supportsbanquepostale.fr) — Validated in Phase 1: site-foundation-fixes
- ✓ Page contact : corriger les doublons de représentants et rendre les données configurables — Validated in Phase 1: site-foundation-fixes

### Active

- [ ] Guide de contribution : créer un article Markdown (frontmatter, images, catégories)
- [ ] Guide de contribution : setup local (clone, install, dev server)
- [ ] Guide de contribution : build & vérification
- [ ] Guide de contribution : déployer via Wrangler
- [ ] Logo : documenter l'emplacement + préparer le slot dans Header pour fichier image
- [ ] Pipeline Wrangler : documenter les commandes de déploiement, vérifier que `wrangler pages deploy` fonctionne

### Out of Scope

- Formulaire de contact avec backend — choix: affichage email/coordonnées uniquement (statique)
- Server-side rendering — site entièrement statique
- Suite de tests automatisés — documentation de build suffit pour v1
- CMS ou interface admin — Git/Markdown est le workflow éditorial
- Authentification — site public, lecture seule

## Context

Codebase brownfield existante, analysée le 2026-04-02 (`.planning/codebase/`). Points importants :
- `post.id` dans Astro 5 inclut l'extension `.md` — déjà corrigé dans PostCard.astro et [slug].astro (commit bccbc76)
- Logo actuel : texte `<span class="brand-mark">FO</span>` dans Header.astro — pas d'image
- Page contact : données en dur dans le template (dupliquer à corriger)
- TypeScript strict mode désactivé (`tsconfig.json`) — tech debt connu
- URL configurée avec typo : `focom-suportsbanquepostale.fr` (manque un 'p')

## Constraints

- **Tech**: Astro 5 statique uniquement — aucun runtime serveur
- **Déploiement**: Cloudflare Pages via Wrangler — pas de CI/CD externe requis
- **Contenu**: Markdown + frontmatter YAML — pas de base de données
- **Build**: `npm run build` (fetch-images puis astro build) — internet requis au build pour les images distantes
- **Langue**: Site en français — tous les textes et la doc de contribution en français

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cloudflare Pages via Wrangler | wrangler.toml déjà présent, déploiement simple | — Pending |
| Pas de backend formulaire | Static-first, email direct suffit pour une section syndicale | — Pending |
| Logo slot documenté (pas d'image fournie) | Pas de fichier logo disponible — on documente le swap | — Pending |
| Contribution guide en français | Public cible = militants, pas des devs anglophones | — Pending |

## Evolution

Ce document évolue aux transitions de phases et aux jalons.

**Après chaque phase** (via `/gsd:transition`) :
1. Requirements invalidés ? → Out of Scope
2. Requirements validés ? → Validated avec référence de phase
3. Nouveaux requirements ? → Active
4. Décisions à logger ? → Key Decisions

**Après chaque milestone** (via `/gsd:complete-milestone`) :
1. Revue complète de toutes les sections
2. Core Value toujours juste ?
3. Audit Out of Scope — raisons toujours valides ?

---
*Last updated: 2026-04-02 — Phase 1 complete (URL typo fixed, contact data centralized)*
