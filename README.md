# FO Com Supports Banque Postale — Site syndical

Site web statique du syndicat FO Com Supports Banque Postale, destiné aux équipes travaillant pour La Banque Postale au sein de l'établissement Supports Banque. Publie des analyses syndicales, points d'alerte sur les réorganisations, rappels sur les droits collectifs et prises de position.

## À quoi ça sert ?

Vous êtes militant ou représentant syndical ? Vous avez besoin de **publier rapidement** une alerte, une analyse ou un point d'information ? Ce site rend cela possible sans friction technique.

Le site est **entièrement statique** — aucun serveur complexe, pas de base de données, pas d'authentification. Tout est hébergé sur Cloudflare Pages et se déploie automatiquement à chaque changement via GitHub.

## Notre engagement envers vous

**Les militants peuvent publier un article en quelques minutes via un simple fichier Markdown, et le site est déployé automatiquement — sans friction technique.**

C'est possible parce que :
- Pas d'installation logicielle requise (utilisez votre navigateur)
- Interface simple : créez un fichier, remplissez un formulaire Markdown, c'est tout
- Déploiement automatique en 3-4 minutes après publication

## Par où commencer ?

### Je veux publier un article

Vous êtes content creator ? Pas de connaissances techniques requises.

**Accédez au guide :** [README-CODESPACES.md](./README-CODESPACES.md)

Ce guide vous montre comment :
- Ouvrir l'éditeur en ligne (GitHub Codespaces) — zéro installation
- Créer un article Markdown en 6 étapes simples
- Publier et vérifier le déploiement

Temps estimé : 10 minutes pour votre premier article.

### Je gère l'infrastructure ou la technique

Vous voulez comprendre le pipeline de déploiement et configurer les secrets ?

**Accédez au guide :** [README-DEPLOIEMENT.md](./README-DEPLOIEMENT.md)

Ce guide couvre :
- Comment fonctionne le déploiement automatique (GitHub Actions → Cloudflare Pages)
- Configuration des secrets (Cloudflare Account ID, API Token)
- Dépannage en cas d'erreur
- Déploiement manuel local si nécessaire

### Je veux modifier le site lui-même

Vous développez des nouvelles fonctionnalités ou améliorez le design ?

**Accédez au guide technique :** [CLAUDE.md](./CLAUDE.md)

Vous y trouverez :
- Stack technologique complet (Astro 5, Wrangler, Cloudflare Pages)
- Conventions de code et patterns utilisés
- Architecture du projet
- Comment configurer votre environnement de développement

## Stack technique — synthèse

| Aspect | Détail |
|--------|--------|
| **Framework** | Astro 5 (site statique) |
| **Contenu** | Markdown + YAML frontmatter |
| **Déploiement** | Cloudflare Pages (via Wrangler) |
| **CI/CD** | GitHub Actions (automatique) |
| **Langage** | Français partout (contenu + docs) |
| **Backend** | Aucun (pur statique) |
| **Base de données** | Aucune (Git est la source de vérité) |
| **Authentification** | Aucune (site public) |

## Statut du projet

**Milestone :** v1.0
**Phase actuelle :** Phase 02 (Branding & Logo) — Documentation progressive
**Phase suivante :** Phase 03 (Guides de contribution complètes)

Pour plus de détails sur la feuille de route, consultez [.planning/ROADMAP.md](./.planning/ROADMAP.md).

## Comment contribuer ?

1. **Commencez ici :**
   - Content creators → [README-CODESPACES.md](./README-CODESPACES.md)
   - Administrateurs techniques → [README-DEPLOIEMENT.md](./README-DEPLOIEMENT.md)
   - Développeurs → [CLAUDE.md](./CLAUDE.md)

2. **Besoin d'aide ?**
   - Consultez la page [Contact](https://focom-supportsbanquepostale.fr/contact) du site
   - Ou ouvrez une issue GitHub

3. **Vous avez une idée ou un problème ?**
   - Créez une issue ou une pull request
   - Ou contactez un représentant syndical

## Licence

Ce projet est hébergé sur GitHub par FO Com Supports Banque Postale.

---

**Prêt à commencer ?** Choisissez votre chemin ci-dessus et lancez-vous !
