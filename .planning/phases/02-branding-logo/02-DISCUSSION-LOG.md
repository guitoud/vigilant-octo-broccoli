# Phase 2: Branding & Logo - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-02
**Phase:** 02-branding-logo
**Areas discussed:** Fallback behavior, Emplacement du fichier logo, Format accepté

---

## Fallback behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Badge texte + commentaire | Garder le badge "FO" inchangé, ajouter un commentaire HTML montrant le `<img>` exact à substituer. Zéro risque de casser le site avant qu'un logo soit prêt. | ✓ |
| `<img>` immédiat | Remplacer dès maintenant par `<img src="/logo.svg">` et committer un fichier logo placeholder. Le site affiche le logo dès que le fichier est en place. | |

**User's choice:** Badge texte + commentaire
**Notes:** Approche recommandée retenue — pas de fichier image requis maintenant, swap explicite quand le logo sera disponible.

---

## Emplacement du fichier logo

| Option | Description | Selected |
|--------|-------------|----------|
| `public/logo.svg` | Racine de `public/` — URL directe `/logo.svg`, simple à documenter, cohérent avec la convention Astro. | ✓ |
| `public/assets/logo.svg` | Sous-dossier `assets/` pour séparer les logos des images de posts. Légèrement plus organisé mais dossier inexistant à créer. | |

**User's choice:** `public/logo.svg`
**Notes:** Simple et direct — pas de sous-dossier supplémentaire à gérer.

---

## Format accepté

| Option | Description | Selected |
|--------|-------------|----------|
| SVG uniquement | Vectoriel, léger, rendu parfait à toutes tailles. Le commentaire et la doc citent `/logo.svg` uniquement. | |
| SVG ou PNG | Les deux formats documentés. Le commentaire Header.astro générique, la doc Phase 3 explique les options. | ✓ |

**Sub-question — Commentaire Header.astro :**

| Option | Description | Selected |
|--------|-------------|----------|
| `<img>` générique | Un seul exemple `src="/logo.svg"` — la doc Phase 3 expliquera SVG vs PNG. Header.astro reste propre. | ✓ |
| Deux exemples commentés | Commentaire montre exemple SVG ET exemple PNG dans Header.astro. | |

**User's choice:** SVG ou PNG acceptés, commentaire `<img>` générique dans Header.astro
**Notes:** La flexibilité du format est documentée en Phase 3, pas dans le code source.

---

## Claude's Discretion

- Exact wording du commentaire HTML (français/anglais, longueur)
- Attributs `width`/`height` exacts dans le commentaire
- Ajout ou non d'un `aria-label` ou `alt` descriptif

## Deferred Ideas

- Conditional rendering (img si fichier existe, sinon badge) — over-engineering pour ce site
- Plusieurs tailles de logo (retina, favicon) — Phase future
- Dark mode du logo — hors scope v1
