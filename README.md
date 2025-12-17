# lib-slf

Bibliothèque de composants Astro réutilisables optimisés pour le SEO, incluant un layout de base configurable avec support multilingue, Open Graph, structured data et animations.

## Installation

### Via Git (recommandé pour le développement)

```bash
bun add github:votre-username/lib-slf
```

### Via un chemin local (pour tester)

Dans votre projet Astro, ajoutez à votre `package.json` :

```json
{
  "dependencies": {
    "lib-slf": "file:../lib-slf"
  }
}
```

Puis installez :

```bash
bun install
```

## Utilisation

### BaseLayout

Le composant principal qui gère le SEO, les meta tags, Open Graph, hreflang et les animations.

#### Import

```astro
---
import { BaseLayout } from 'lib-slf/BaseLayout.astro';
// ou
import BaseLayout from 'lib-slf/BaseLayout.astro';
---
```

#### Exemple basique

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
  title="Accueil - Studio La Folie"
  description="Agence créative spécialisée en design et développement web"
  lang="fr-FR"
  siteConfig={siteConfig}
>
  <h1>Bienvenue sur notre site</h1>
  <p>Contenu de la page...</p>
</BaseLayout>
```

#### Exemple avec toutes les options

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';

const siteConfig = {
  name: "Mon Site",
  author: "Mon Nom © 2025",
  publisher: "Mon Entreprise",
  baseUrl: "https://monsite.com"
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mon Entreprise",
  "url": "https://monsite.com"
};
---

<BaseLayout
  title="Ma Page"
  description="Description de ma page"
  lang="fr-FR"
  siteConfig={siteConfig}

  <!-- SEO optionnel -->
  structuredData={structuredData}
  ogImage="/images/og-image.jpg"
  ogImageAlt="Description de l'image"
  ogType="website"

  <!-- URLs alternatives personnalisées -->
  alternateUrls={{
    en: "https://monsite.com/en/my-page",
    fr: "https://monsite.com/fr/ma-page"
  }}

  <!-- Features optionnelles -->
  enableAOS={true}
  enableFooterTransition={true}
  customFonts={["https://use.typekit.net/votrefonts.css"]}
>
  <div data-aos="fade-up">
    Contenu avec animation AOS
  </div>
</BaseLayout>
```

### Props du BaseLayout

#### Props requises

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Titre de la page (balise `<title>` et OG) |
| `description` | `string` | Description de la page (meta description et OG) |
| `lang` | `string` | Code langue (ex: `"fr-FR"`, `"en-US"`) |
| `siteConfig` | `object` | Configuration du site (voir ci-dessous) |

#### siteConfig

```typescript
{
  name: string;       // Nom du site (og:site_name)
  author: string;     // Auteur du site
  publisher: string;  // Éditeur du site
  baseUrl: string;    // URL de base (ex: "https://monsite.com")
}
```

#### Props optionnelles

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `structuredData` | `object` | `undefined` | Données structurées JSON-LD |
| `alternateUrls` | `{fr?: string, en?: string}` | Auto-généré | URLs alternatives pour hreflang |
| `ogImage` | `string` | Image par défaut | URL de l'image Open Graph |
| `ogImageAlt` | `string` | `"{siteName} Logo"` | Texte alternatif de l'image OG |
| `ogType` | `string` | `"website"` | Type Open Graph |
| `enableAOS` | `boolean` | `true` | Activer les animations AOS |
| `enableFooterTransition` | `boolean` | `false` | Transition noir/blanc au scroll |
| `customFonts` | `string[]` | `[]` | URLs de polices personnalisées |

## Styles

### Importer les styles

```astro
---
// Les styles sont automatiquement importés avec BaseLayout
// Mais vous pouvez aussi les importer séparément :
import 'lib-slf/styles';        // Styles globaux + AOS
import 'lib-slf/typography';    // Système typographique
---
```

### Classes CSS disponibles

#### Typographie

```html
<!-- Headings -->
<h1 class="heading-1">Très grand titre (215px)</h1>
<h2 class="heading-2">Grand titre (82px)</h2>
<h3 class="heading-3">Moyen titre (51px)</h3>
<h4 class="heading-4">Petit titre (19px)</h4>
<h5 class="heading-5">Mini titre (12px)</h5>

<!-- Body text -->
<p class="body-1">Grand texte (31px)</p>
<p class="body-2">Texte normal (19px)</p>

<!-- Cas spécifiques -->
<h1 class="page-title">Titre de page</h1>
<h2 class="section-intro">Intro de section</h2>
<h3 class="section-subtitle">Sous-titre</h3>
```

Les styles sont **responsive** et s'adaptent automatiquement aux écrans tablettes et mobiles.

### Variables CSS

```css
:root {
  --font-primary: 'Helvetica Neue', Arial, sans-serif;
  --font-secondary: 'Helvetica Neue Medium', Arial, sans-serif;
  --font-light: 'Helvetica Neue Light', Arial, sans-serif;
  --color-text: #000000;
  --color-bg: #ffffff;
  --color-accent: #000000;
  --transition-fast: 200ms ease;
  --transition-medium: 300ms ease;
  --transition-slow: 500ms ease;
}
```

## Fonctionnalités

### SEO automatique

- Meta tags (title, description, author, publisher)
- Canonical URL
- Sitemap link
- Robots meta
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Hreflang multilingue (auto ou manuel)
- Structured Data (JSON-LD)

### Animations AOS

```html
<div data-aos="fade-up">Animation au scroll</div>
<div data-aos="fade-down" data-aos-delay="200">Avec délai</div>
```

Configuration par défaut :
- Duration: 800ms
- Easing: ease-in-out
- Once: false (répète l'animation)
- Offset: 50px

### Footer Transition

Active la transition noir/blanc au scroll (optionnel) :

```astro
<BaseLayout enableFooterTransition={true} {...props}>
  <!-- Contenu -->
  <footer>Mon footer</footer>
</BaseLayout>
```

## Exemples de configuration par projet

### Projet multilingue

```astro
---
// pages/fr/index.astro
const siteConfig = {
  name: "Mon Site",
  author: "Mon Nom",
  publisher: "Mon Entreprise",
  baseUrl: "https://monsite.com"
};
---

<BaseLayout
  title="Accueil"
  description="Page d'accueil en français"
  lang="fr-FR"
  siteConfig={siteConfig}
>
  <!-- Contenu FR -->
</BaseLayout>
```

```astro
---
// pages/en/index.astro
const siteConfig = {
  name: "My Site",
  author: "My Name",
  publisher: "My Company",
  baseUrl: "https://mysite.com"
};
---

<BaseLayout
  title="Home"
  description="Home page in English"
  lang="en-US"
  siteConfig={siteConfig}
>
  <!-- EN content -->
</BaseLayout>
```

### Centraliser la config

```typescript
// src/config/site.ts
export const siteConfig = {
  name: "Mon Site",
  author: "Mon Nom © 2025",
  publisher: "Mon Entreprise",
  baseUrl: import.meta.env.SITE || "https://monsite.com"
};
```

```astro
---
import { siteConfig } from '@/config/site';
import BaseLayout from 'lib-slf/BaseLayout.astro';
---

<BaseLayout
  title="Ma Page"
  description="Description"
  lang="fr-FR"
  siteConfig={siteConfig}
>
  <!-- Contenu -->
</BaseLayout>
```

## Dépendances

- `astro` ^5.0.0 (peer dependency)
- `aos` ^2.3.4 (peer dependency - pour les animations)

Installez dans votre projet :

```bash
bun add aos
```

## Développement

### Structure du projet

```
lib-slf/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── typography.css
│   ├── assets/
│   │   └── og-default.svg
│   └── index.ts
├── package.json
└── README.md
```

### Publier le package

#### Sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:votre-username/lib-slf.git
git push -u origin main
```

Puis dans vos projets :

```bash
bun add github:votre-username/lib-slf
```

#### Sur NPM (optionnel)

```bash
# Créer un compte sur npmjs.com puis :
npm login
npm publish --access public
```

## Licence

MIT
