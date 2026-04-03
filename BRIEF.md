# Brief : Site FO Com Supports Banque Postale

## Domaine
`focom-supportsbanquepostale.fr`

## Identité
- **Nom** : FO Com - Supports Banque Postale
- **Organisation** : Fédération Force Ouvrière de la Communication (FO Com)
- **Périmètre** : Établissement Disctinct Supports Banque Postale de La Poste — les agents qui travaillent pour La Banque Postale
- **Groupe** : Groupe Caisse des Dépôts (La Poste, La Banque Postale, CNP Assurances)

## Inspiration

Le site doit s'inspirer fortement de https://focom-laposte.fr :
- Design épuré, couleurs FO (rouge/blanc/bleu ou rouge/noir selon la charte FO Com)
- Navigation claire : accueil, actualités, contact
- Logo FO Com (à adapter pour Supports BP)

## Architecture technique
- **Site statique** généré à partir de fichiers **Markdown**
- Build avec un générateur statique léger (Astro, 11ty/Eleventy, ou Hugo)
- **Déployable sur Cloudflare Workers/Pages** (output statique)
- À chaque build :
  - Les articles sont lus depuis des fichiers `.md` dans un dossier `content/`
  - Les images référencées dans le markdown sont téléchargées en local (dans `public/images/`)
  - Le site est reconstruit en statique

## Sections
1. **Accueil** : dernières actualités, présentation de la section
2. **Actualités** : liste des articles avec pagination, chaque article est un fichier markdown
3. **Contact** : formulaire de contact (ou coordonnées statiques), liens vers les représentants

## Contenu markdown (exemple)
```markdown
---
title: "Bienvenue sur le site FO Com Supports BP"
date: 2026-04-02
image: https://example.com/image.jpg
category: "Actualité"
---

Contenu de l'article ici...
```

## Build & Deploy
- `npm run build` → génère le site statique dans `dist/`
- Compatible Cloudflare Pages (ou Workers Sites)
- Le script de build doit :
  1. Lire les fichiers markdown de `content/`
  2. Télécharger les images distantes en local
  3. Générer le HTML statique

## Design
- Responsive (mobile-first)
- Couleurs FO Com : rouge (#E2001A), blanc, bleu marine (#1B2A4A)
- Typographie lisible, professionnelle
- Header avec logo + navigation
- Footer avec mentions légales, liens utiles

## Contraintes
- Pas de base de données
- Pas de CMS côté serveur
- Tout le contenu est dans des fichiers markdown versionnés dans git
- Le site doit être maintenable par quelqu'un qui sait éditer du markdown
