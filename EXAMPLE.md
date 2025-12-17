# Exemples d'utilisation de lib-slf

## Test en local (avant de publier)

Pour tester la librairie dans votre projet Astro avant de la publier :

### 1. Dans votre projet Astro, modifiez `package.json`

```json
{
  "dependencies": {
    "lib-slf": "file:../lib-slf"
  }
}
```

### 2. Installez

```bash
bun install
```

### 3. Utilisez dans vos pages Astro

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';

const siteConfig = {
  name: "Studio La Folie",
  author: "Studio La Folie © 2025",
  publisher: "Studio La Folie",
  baseUrl: "https://studiolafolie.com"
};
---

<BaseLayout
  title="Ma Page"
  description="Description de ma page"
  lang="fr-FR"
  siteConfig={siteConfig}
  enableFooterTransition={true}
  customFonts={["https://use.typekit.net/dop1cnn.css"]}
>
  <h1>Titre de ma page</h1>
  <div data-aos="fade-up">
    Contenu avec animation
  </div>
</BaseLayout>
```

## Migrer votre projet actuel (slf)

Voici comment migrer votre projet actuel pour utiliser `lib-slf` :

### 1. Installer la lib en local

```bash
cd /Users/ericschidlo/Projects/slf
```

Ajouter dans `package.json` :

```json
{
  "dependencies": {
    "lib-slf": "file:../lib-slf"
  }
}
```

```bash
bun install
```

### 2. Créer un fichier de configuration centralisé

Créer `src/config/site.ts` :

```typescript
export const siteConfig = {
  name: "Studio La Folie",
  author: "Studio La Folie © 2025",
  publisher: "Studio La Folie",
  baseUrl: "https://studiolafolie.com"
};
```

### 3. Remplacer votre BaseLayout actuel

Dans vos pages, remplacez :

```astro
---
// AVANT
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Mon titre"
  description="Ma description"
  lang="fr-FR"
>
  <!-- contenu -->
</BaseLayout>
```

Par :

```astro
---
// APRÈS
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
---

<BaseLayout
  title="Mon titre"
  description="Ma description"
  lang="fr-FR"
  siteConfig={siteConfig}
  enableFooterTransition={true}
  customFonts={["https://use.typekit.net/dop1cnn.css"]}
>
  <!-- contenu -->
</BaseLayout>
```

### 4. Supprimer l'ancien BaseLayout (optionnel)

Une fois que tout fonctionne, vous pouvez supprimer :
- `src/layouts/BaseLayout.astro` (maintenant dans lib-slf)
- `src/styles/global.css` (maintenant dans lib-slf)
- `src/styles/typography.css` (maintenant dans lib-slf)

**Note:** Gardez vos autres styles spécifiques au projet !

## Publier sur GitHub

Une fois que vous êtes satisfait :

```bash
cd /Users/ericschidlo/Projects/lib-slf
git init
git add .
git commit -m "Initial commit: BaseLayout configurable avec SEO"
git remote add origin git@github.com:votre-username/lib-slf.git
git push -u origin main
```

Puis dans tous vos projets :

```bash
bun add github:votre-username/lib-slf
```

## Mettre à jour la lib

Quand vous modifiez `lib-slf` :

### Si vous utilisez `file:../lib-slf` :

Les changements sont automatiquement disponibles (pas besoin de réinstaller).

### Si vous utilisez `github:...` :

```bash
bun update lib-slf
```

## Notes importantes

1. **AOS** doit être installé dans votre projet :
   ```bash
   bun add aos
   ```

2. **Astro** version 5+ est requis

3. **Variables CSS personnalisées** : Vous pouvez surcharger les variables dans votre propre CSS :
   ```css
   :root {
     --font-primary: 'Ma Police Custom', Arial, sans-serif;
     --color-accent: #ff0000;
   }
   ```
