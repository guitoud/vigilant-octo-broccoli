# Requirements: FO Com Supports Banque Postale

**Defined:** 2026-04-02
**Core Value:** Un militant peut publier un article et déployer le site via Wrangler sans friction technique

## v1 Requirements

### Documentation

- [ ] **DOCS-01**: Un contributeur peut créer un article Markdown complet en suivant le guide (frontmatter title/date/image/category, emplacement du fichier, exemple minimal)
- [ ] **DOCS-02**: Un contributeur peut configurer son environnement local en suivant le guide (clone, npm install, npm run dev)
- [ ] **DOCS-03**: Un contributeur peut builder et vérifier le site localement (npm run build, vérification du dossier dist/)
- [ ] **DOCS-04**: Un contributeur peut déployer le site sur Cloudflare Pages en suivant le guide Wrangler (wrangler pages deploy)

### Branding

- [ ] **BRAND-01**: Le Header expose un slot image clairement documenté pour remplacer le texte "FO" par un fichier logo (SVG/PNG), avec instructions dans le guide de contribution

### Contact

- [ ] **CONT-01**: La page contact affiche des coordonnées réelles sans doublons de représentants
- [ ] **CONT-02**: Les données de contact (email, représentants, permanences) sont centralisées dans un fichier de configuration ou un composant dédié — pas dupliquées dans le HTML

### Déploiement

- [ ] **DEPL-01**: La commande `npm run deploy` (ou `wrangler pages deploy ./dist`) fonctionne et pousse le site sur Cloudflare Pages
- [x] **DEPL-02**: L'URL canonique dans astro.config.mjs est corrigée (focom-suportsbanquepostale.fr → focom-supportsbanquepostale.fr ou domaine réel)

## v2 Requirements

### SEO & Distribution

- **SEO-01**: Flux RSS généré automatiquement pour les abonnés (via @astrojs/rss)
- **SEO-02**: Sitemap XML généré à chaque build (via @astrojs/sitemap)

### Qualité

- **QUAL-01**: Suite de tests automatisés (Vitest) pour les utilitaires (format, images)
- **QUAL-02**: TypeScript strict mode activé (supprimer `"strict": false` de tsconfig.json)

### Performance

- **PERF-01**: Cache d'images entre les builds (skip fetch si fichier déjà présent dans public/images/posts/)
- **PERF-02**: Fetch des images en parallèle (Promise.all au lieu de boucle for séquentielle)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Formulaire de contact avec backend | Choix explicite: affichage email uniquement (statique) |
| Server-side rendering | Site entièrement statique — pas de runtime |
| CMS ou interface admin | Git/Markdown est le workflow éditorial choisi |
| Authentification | Site public, lecture seule |
| CI/CD automatique (GitHub Actions) | Wrangler CLI manuel suffit pour v1 |
| Application mobile | Web uniquement |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DOCS-01 | 3 | Pending |
| DOCS-02 | 3 | Pending |
| DOCS-03 | 3 | Pending |
| DOCS-04 | 3 | Pending |
| BRAND-01 | 2 | Pending |
| CONT-01 | 1 | Pending |
| CONT-02 | 1 | Pending |
| DEPL-01 | 3 | Pending |
| DEPL-02 | 1 | Complete |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0
- Coverage: 100% ✓

---
*Requirements defined: 2026-04-02*
*Last updated: 2026-04-02 after roadmap creation*
