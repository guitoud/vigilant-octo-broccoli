# Éditer les articles via GitHub Codespaces

Vous souhaitez publier un nouvel article sans installer Node.js sur votre ordinateur ? C'est possible grâce à **GitHub Codespaces** — un éditeur en ligne fourni gratuitement par GitHub.

## Comment ça marche ?

Suivez ces 6 étapes pour créer et publier un article :

### Étape 1 : Ouvrir le dépôt dans Codespaces

1. Allez sur https://github.com/FO-Com-Supports-BP/site (ou le lien de votre dépôt)
2. Cliquez sur le bouton vert **Code**
3. Sélectionnez l'onglet **Codespaces**
4. Cliquez sur **Create codespace on main**
5. Attendez ~2 minutes que l'éditeur se charge

### Étape 2 : Codespaces installe automatiquement les dépendances

Aucune action requise de votre part. Codespaces exécute automatiquement `npm install` au démarrage.

### Étape 3 : Créer un nouveau fichier article

1. Dans le panneau **Explorer** (à gauche), naviguez vers `src/content/posts/`
2. Cliquez droit sur le dossier `posts` → **New File**
3. Nommez le fichier avec le format : `votreurl-article.md`
   - Exemple : `greve-2026-04-03.md`
   - Utilisez des traits d'union `-` pour séparer les mots (pas d'espaces)

### Étape 4 : Remplir le modèle d'article

Collez ce template en haut de votre fichier, puis remplissez les champs :

```yaml
---
title: "Titre de votre article"
date: 2026-04-03
category: "Actualité"
image: "https://example.com/image.jpg"
---

Votre contenu ici...
```

**Explications des champs :**
- `title` : Titre de l'article (requis)
- `date` : Date de publication au format YYYY-MM-DD (requis)
- `category` : Type d'article, par exemple "Actualité", "Alerte", "Droits collectifs" (requis)
- `image` : URL complète vers une image (commence par `http://` ou `https://`) (requis)

**Exemple complet :**

```yaml
---
title: "Alerte : réorganisation en mai 2026"
date: 2026-04-03
category: "Alerte"
image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
---

# Alerte : réorganisation en mai 2026

La direction a annoncé une réorganisation majeure. Voici ce que vous devez savoir :

- Les équipes supports changent de structure
- La permanence syndicale passe de 3 à 2 jours par semaine
- Les droits individuels restent garantis

Pour plus d'informations, contactez la section FO.
```

### Étape 5 : Enregistrer et créer un commit

1. Appuyez sur **Ctrl+S** (ou Cmd+S sur Mac) pour enregistrer le fichier
2. Ouvrez le terminal intégré : **Terminal** → **New Terminal** (en haut)
3. Tapez ces commandes :

```bash
git add src/content/posts/votreurl-article.md
git commit -m "Ajouter article : titre de l'article"
git push
```

### Étape 6 : Vérifier le déploiement automatique

1. Le site se redéploie automatiquement après votre `git push`
2. Allez sur l'onglet **Actions** du dépôt GitHub (https://github.com/FO-Com-Supports-BP/site/actions)
3. Cherchez le workflow **Deploy to Cloudflare Pages**
4. Regardez l'état : 
   - **Succès** (coche verte) = votre article est maintenant en ligne
   - **Erreur** (croix rouge) = il y a un problème à vérifier

## Où trouver votre article en ligne ?

Une fois déployé, votre article apparaît à :
- **Page d'accueil** (`/`) : si c'est l'un des 3 articles les plus récents
- **Actualités** (`/actualites/`) : dans la liste complète
- **Article direct** : `https://votre-site.fr/actualites/votreurl-article/`

## Format du contenu (Markdown)

Dans la partie `---`, vous pouvez écrire en **Markdown** :

- **Gras** : `**texte gras**`
- *Italique* : `*texte en italique*`
- Listes à puces :
  ```
  - Élément 1
  - Élément 2
  ```
- Listes numérotées :
  ```
  1. Étape 1
  2. Étape 2
  ```
- Liens : `[texte](https://lien.com)`
- Titres :
  ```
  # Titre niveau 1
  ## Titre niveau 2
  ### Titre niveau 3
  ```

## Besoin d'aide ?

- **Erreur lors du commit ?** Vérifiez que le nom du fichier ne contient pas de caractères spéciaux (accent, espace, etc.)
- **L'article n'apparaît pas ?** Vérifiez dans l'onglet **Actions** que le déploiement a réussi (coche verte)
- **Problème d'image ?** Assurez-vous que le lien commence par `http://` ou `https://` et que le serveur de l'image est accessible

---

**Prêt à publier ?** Ouvrez Codespaces et créez votre premier article !
