# Pipeline de déploiement — Comment ça marche ?

Ce document explique comment votre site est automatiquement déployé à chaque commit. **Aucune action manuelle requise !**

## Qu'est-ce qui se passe automatiquement ?

À chaque fois que vous poussez un commit vers la branche `main`, le site subit ce processus :

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. Vous exécutez : git push                               │
│     (ou vous publiez via GitHub Codespaces)                │
│                                                             │
│                        ↓                                    │
│                                                             │
│  2. GitHub Actions se lance automatiquement                │
│     (workflow: "Deploy to Cloudflare Pages")               │
│                                                             │
│                        ↓                                    │
│                                                             │
│  3. GitHub Actions :                                       │
│     • Télécharge le code (actions/checkout@v4)             │
│     • Installe Node.js 20 (actions/setup-node@v4)          │
│     • Installe les dépendances (npm ci)                    │
│     • Compile le site (npm run build)                      │
│       - Télécharge les images distantes                    │
│       - Construit le HTML statique avec Astro             │
│                                                             │
│                        ↓                                    │
│                                                             │
│  4. Wrangler (outil Cloudflare) publie le dossier ./dist  │
│     sur Cloudflare Pages                                   │
│                                                             │
│                        ↓                                    │
│                                                             │
│  5. ✅ Votre site est en ligne !                           │
│     Visiteurs peuvent accéder au contenu mis à jour        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Les étapes détaillées

### Étape 1 : Git push (votre action)

```bash
git push origin main
```

Ou via Codespaces : cliquez sur le bouton **Sync** en bas à gauche.

### Étape 2 : GitHub Actions détecte le changement

GitHub surveille la branche `main`. Dès qu'un nouveau commit arrive, le workflow `Deploy to Cloudflare Pages` se déclenche automatiquement.

### Étape 3 : Construction (npm run build)

Le serveur GitHub exécute :

```bash
npm ci                    # Installe les dépendances exactes (fichier package-lock.json)
npm run build             # Lance le script de build qui :
                          # 1. Télécharge les images (npm run fetch-images)
                          # 2. Compile avec Astro (astro build)
                          # Génère le dossier ./dist avec tous les fichiers HTML statiques
```

**Fichiers importants :**
- `package.json` : Liste des dépendances et scripts
- `package-lock.json` : Versions exactes garantissant une build reproductible
- `astro.config.mjs` : Configuration Astro (URL du site, répertoire de sortie)
- `wrangler.toml` : Configuration Cloudflare (ID du projet, répertoire de déploiement)

### Étape 4 : Déploiement vers Cloudflare Pages

Wrangler télécharge le dossier `./dist` vers Cloudflare Pages :

```bash
npx wrangler pages deploy ./dist
```

Cela nécessite deux variables d'environnement (stockées comme secrets GitHub) :
- `CLOUDFLARE_ACCOUNT_ID` : Identifiant unique de votre compte Cloudflare
- `CLOUDFLARE_API_TOKEN` : Jeton d'authentification sécurisé

**⚠️ Important :** Ces secrets **ne sont jamais** affichés dans les logs ou le code. Ils restent confidentiels.

### Étape 5 : Site en ligne

Cloudflare Pages met à jour le site en quelques secondes. Les visiteurs accèdent immédiatement au contenu actualisé.

---

## Vérifier le statut du déploiement

### Via GitHub (recommandé)

1. Allez sur : https://github.com/FO-Com-Supports-BP/site (ou votre dépôt)
2. Cliquez sur l'onglet **Actions**
3. Cherchez le workflow **"Deploy to Cloudflare Pages"**
4. Cliquez sur le dernier run (en haut de la liste)

**Vous verrez :**
- **En cours** (spinner jaune/orange) = compilation en cours (environ 2-3 minutes)
- **✅ Succès** (coche verte) = site déployé avec succès
- **❌ Erreur** (croix rouge) = il y a un problème à analyser

### Détails en cas d'erreur

Si le déploiement échoue :

1. Cliquez sur le run en erreur
2. Cliquez sur le job **deploy**
3. Cherchez l'étape rouge (ex: "npm run build")
4. Lisez le message d'erreur pour identifier le problème

**Problèmes courants :**
- **SyntaxError in Markdown file** : Vérifiez la syntaxe du YAML frontmatter (espaces, tirets mal alignés)
- **Image URL invalid** : Vérifiez que l'URL commence par `http://` ou `https://`
- **Node.js version mismatch** : Très rare, généralement résolu automatiquement

---

## Déploiement manuel (fallback local)

Si vous devez déployer **localement** pour tester avant de pousser :

### Prérequis

- Node.js 20+ installé localement
- npm 10.x+ installé
- Wrangler configuré avec vos credentials Cloudflare

### Commandes

```bash
# Télécharger les dépendances (première fois seulement)
npm install

# Compiler le site
npm run build

# Déployer vers Cloudflare Pages
npx wrangler pages deploy ./dist
```

**Exemple complet :**

```bash
$ npm install
$ npm run build
> focom-supports-bp@1.0.0 build
> node scripts/fetch-images.mjs && astro build

image ok article-1
image ok article-2
...
✔ build complete

$ npx wrangler pages deploy ./dist
Deploying to Cloudflare Pages...
✔ Deployment successful
```

---

## Secrets et sécurité

### Où sont stockés les secrets ?

Accès : https://github.com/FO-Com-Supports-BP/site/settings/secrets/actions

**Les deux secrets requis :**
1. `CLOUDFLARE_ACCOUNT_ID` — Identifiant Cloudflare (20 caractères alphanumériques)
2. `CLOUDFLARE_API_TOKEN` — Jeton d'authentification (commence par `v1...` ou `c4...`)

### Qui peut les voir ?

- ✅ **GitHub Actions** (automatisé) : peut lire et utiliser les secrets
- ❌ **Logs publics** : les secrets ne sont jamais affichés
- ❌ **Code** : les secrets ne sont jamais commités

### Si un secret s'expose

1. Régénérez immédiatement le token dans Cloudflare
2. Mettez à jour le secret GitHub
3. Attendez que le prochain déploiement utilise le nouveau token

---

## Dépannage

### "Workflow not running"

**Cause possible :** Le workflow n'est pas activé.

**Solution :**
1. Allez sur https://github.com/FO-Com-Supports-BP/site/actions
2. Vérifiez que les workflows sont activés (bouton en haut à droite)

### "npm ci failed"

**Cause possible :** `package-lock.json` est corrompu ou incompatible.

**Solution :**
```bash
# Localement :
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Régénérer package-lock.json"
git push
```

### "wrangler pages deploy failed"

**Cause possible :** Secrets manquants ou invalides.

**Solution :**
1. Vérifiez dans GitHub Settings → Secrets → Actions
2. Assurez-vous que `CLOUDFLARE_ACCOUNT_ID` et `CLOUDFLARE_API_TOKEN` existent
3. Si besoin, regénérez le token dans Cloudflare

### "Image URL invalid"

**Cause possible :** Une image dans un article pointe vers une URL invalide.

**Solution :**
1. Ouvrez le run en erreur
2. Cherchez "Image URL invalid" dans les logs
3. Trouvez l'article en question
4. Vérifiez le champ `image:` du frontmatter
5. Utilisez une URL de test gratuite : https://via.placeholder.com/800x400

---

## Fréquence des déploiements

- **Automatiquement :** À chaque commit poussé vers `main`
- **Manuellement :** Vous pouvez déclencher un workflow depuis l'onglet Actions
- **Planifié :** Possible de planifier des déploiements (non activé actuellement)

---

## Performance et cache

- **Build time :** ~2-3 minutes (téléchargement images + compilation)
- **Déploiement time :** ~30 secondes
- **Propagation Cloudflare :** Instantané (pages statiques)
- **Cache visiteur :** 24 heures par défaut (configurable)

---

## Résumé

| Étape | Durée | Déclencheur | Action |
|-------|-------|------------|--------|
| Détection commit | Instant | GitHub | Reconnaît le push vers main |
| Installation | ~30s | GitHub Actions | npm ci |
| Build | ~2min | GitHub Actions | npm run build + fetch-images |
| Déploiement | ~30s | Wrangler | Upload vers Cloudflare |
| **Total** | **~3-4min** | - | Site en ligne |

---

**Questions ?** Consultez la [documentation Astro](https://docs.astro.build/) ou [Cloudflare Pages](https://developers.cloudflare.com/pages/).
