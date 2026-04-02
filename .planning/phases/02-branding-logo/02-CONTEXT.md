# Phase 2: Branding & Logo - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Préparer `Header.astro` pour accepter un fichier logo image en remplaçant le badge texte "FO" par un slot documenté. La documentation complète (instructions contributeur) va dans le guide de contribution de Phase 3. Cette phase se limite à la modification du composant Header et à la documentation inline du slot.

</domain>

<decisions>
## Implementation Decisions

### Fallback behavior
- **D-01:** Garder `<span class="brand-mark">FO</span>` inchangé comme état actuel — aucun fichier image requis.
- **D-02:** Ajouter un commentaire HTML dans `Header.astro` montrant exactement le `<img>` à substituer quand un logo est disponible. Le badge texte reste visible jusqu'au swap explicite.

### Emplacement du fichier logo
- **D-03:** Le fichier logo va dans `public/logo.svg` (racine de `public/`) — URL directe `/logo.svg`, simple à documenter, cohérent avec la convention Astro pour les assets statiques.

### Format accepté
- **D-04:** SVG et PNG sont tous les deux acceptés. Le commentaire dans Header.astro montre un exemple générique `<img src="/logo.svg">` — la doc de Phase 3 expliquera le choix SVG vs PNG et les implications de chaque format.

### Claude's Discretion
- Exact wording du commentaire HTML (français ou anglais, longueur)
- Attributs `width`/`height` exacts dans le commentaire (48×48px aligné avec le badge actuel semble raisonnable)
- Ajout ou non d'un `aria-label` ou `alt` descriptif dans le commentaire

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Composant à modifier
- `src/components/Header.astro` — Composant header existant avec badge texte `.brand-mark` (ligne 19)

### Styles existants
- `src/styles/global.css` — CSS `.brand-mark` (largeur 3rem × 3rem, rouge, border-radius 0.9rem) — la classe sera réutilisée sur le futur `<img>` pour conserver les dimensions

### Requirements
- `.planning/REQUIREMENTS.md` — BRAND-01 : "Le Header expose un slot image clairement documenté pour remplacer le texte 'FO' par un fichier logo (SVG/PNG), avec instructions dans le guide de contribution"

### Conventions codebase
- `.planning/codebase/CONVENTIONS.md` — PascalCase pour les composants, pas d'alias de chemin, pas de commentaires dans le code sauf nécessité documentée

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/Header.astro` — Structure existante à conserver (nav, brand link, `brand-copy`). Seul le `<span class="brand-mark">FO</span>` est concerné.
- `.brand-mark` CSS class — Déjà stylée à 3rem × 3rem avec border-radius et shadow. Applicable directement sur un `<img>` pour conserver les dimensions.

### Established Patterns
- Pas d'assets statiques dans `public/` actuellement committé (images de posts gitignorées). `public/logo.svg` sera le premier asset statique commité.
- Imports relatifs sans alias : `../../components/Header.astro` — pas de changement de pattern requis.

### Integration Points
- `Header.astro` est importé dans toutes les pages via `src/layouts/BaseLayout.astro` — toute modification impacte l'ensemble du site.
- La classe `.brand-mark` dans `global.css` contrôle les dimensions et l'apparence — réutiliser cette classe sur le futur `<img>` garantit la cohérence visuelle sans nouveau CSS.

</code_context>

<specifics>
## Specific Ideas

- Le commentaire doit montrer exactement le code de remplacement prêt à copier-coller :
  ```html
  <!-- Pour remplacer par une image logo :
  <img
    src="/logo.svg"
    alt="FO Com Supports Banque Postale"
    width="48"
    height="48"
    class="brand-mark"
  />
  -->
  ```
- Le badge texte "FO" reste la source visuelle de vérité jusqu'à ce qu'un vrai fichier logo soit fourni

</specifics>

<deferred>
## Deferred Ideas

- Conditional rendering (afficher img si fichier existe, sinon badge) — over-engineering pour ce site, ajouterait de la logique Astro non nécessaire
- Plusieurs tailles de logo (retina, favicon) — Phase future si besoin
- Dark mode du logo — hors scope v1

</deferred>

---

*Phase: 02-branding-logo*
*Context gathered: 2026-04-02*
