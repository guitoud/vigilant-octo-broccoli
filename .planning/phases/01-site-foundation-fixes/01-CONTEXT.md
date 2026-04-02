# Phase 1: Site Foundation Fixes - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Corriger les problèmes fondamentaux du site existant : typo dans l'URL canonique et centralisation des données contact (suppression des doublons de représentants). Aucun ajout de fonctionnalité — uniquement corrections et restructuration.

</domain>

<decisions>
## Implementation Decisions

### URL canonique
- **D-01:** L'URL correcte est `https://focom-supportsbanquepostale.fr` — corriger `site:` dans `astro.config.mjs` (changer `focom-suportsbanquepostale.fr` → `focom-supportsbanquepostale.fr`)

### Claude's Discretion
- Format de centralisation des données contact : utiliser `src/config/contact.ts` (TypeScript export, cohérent avec les conventions du projet — fichiers .ts en camelCase dans src/)
- Contenu des représentants : supprimer les doublons de Ana-Maria VAZQUEZ, conserver la structure existante (un représentant par rôle). Les vraies données seront saisies par le propriétaire du site après.
- Positionnement de la config contact : importée dans `src/pages/contact/index.astro`, pas d'autres consommateurs prévus pour v1

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Fichiers à modifier
- `astro.config.mjs` — URL canonique à corriger (ligne ~4, champ `site:`)
- `src/pages/contact/index.astro` — Page contact avec données hardcodées en doublon

### Référence codebase
- `.planning/codebase/CONVENTIONS.md` — Conventions de nommage (camelCase .ts pour les fichiers utilitaires/config)
- `.planning/codebase/CONCERNS.md` — Typo URL documenté (section Known Bugs)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/pages/contact/index.astro` : structure HTML existante à conserver, données à externaliser
- `astro.config.mjs` : config Astro existante, une ligne à corriger

### Established Patterns
- Fichiers TypeScript de config/utils en camelCase dans `src/` (ex: `src/utils/format.ts`, `src/utils/images.ts`)
- Imports relatifs sans alias de chemin (`../../utils/`)
- Pas de dossier `src/config/` existant — à créer

### Integration Points
- `astro.config.mjs` → génération URLs canoniques, sitemap, OG tags
- `src/config/contact.ts` → importé dans `src/pages/contact/index.astro` uniquement

</code_context>

<specifics>
## Specific Ideas

- URL confirmée par le propriétaire : `https://focom-supportsbanquepostale.fr`
- Le fichier `src/config/contact.ts` doit exporter des données typées (interface `ContactData` ou similaire) pour faciliter les futures modifications

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-site-foundation-fixes*
*Context gathered: 2026-04-02*
