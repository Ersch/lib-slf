# Personnalisation de lib-slf

Ce guide explique comment personnaliser et surcharger les styles de `lib-slf`.

## Surcharger le système typographique

### Option 1 : Surcharger les classes CSS (Recommandé)

Créez votre propre fichier CSS pour surcharger les classes :

```css
/* src/styles/custom-typography.css */

/* Surcharger les tailles existantes */
.heading-1 {
  font-size: 300px !important;
  line-height: 280px !important;
}

.heading-2 {
  font-size: 100px !important;
  line-height: 95px !important;
}

.body-1 {
  font-size: 36px !important;
  line-height: 42px !important;
}

/* Ajouter vos propres classes */
.my-custom-title {
  font-size: 150px;
  line-height: 140px;
  font-weight: 700;
  letter-spacing: -2px;
}

/* Media queries personnalisées */
@media (max-width: 1439px) {
  .heading-1 {
    font-size: 180px !important;
    line-height: 170px !important;
  }
}
```

Importez-le après le BaseLayout :

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
import '../styles/custom-typography.css';  // Après le BaseLayout
---

<BaseLayout {...props} siteConfig={siteConfig}>
  <h1 class="heading-1">Titre avec taille personnalisée</h1>
  <h2 class="my-custom-title">Mon titre custom</h2>
</BaseLayout>
```

### Option 2 : Désactiver typography.css complètement

Si vous voulez utiliser votre propre système typographique :

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
import '../styles/my-typography.css';  // Votre propre système
---

<BaseLayout
  {...props}
  siteConfig={siteConfig}
  enableTypography={false}  <!-- Désactive typography.css -->
>
  <h1 class="my-heading">Mon titre</h1>
</BaseLayout>
```

Créez votre propre système :

```css
/* src/styles/my-typography.css */

h1, .my-heading {
  font-size: 4rem;
  line-height: 1.2;
  font-weight: 800;
}

h2 {
  font-size: 3rem;
  line-height: 1.3;
  font-weight: 700;
}

/* ... votre système complet */
```

### Option 3 : Importer typography.css manuellement

Ne pas l'importer automatiquement et l'importer où vous voulez :

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';

// Import manuel uniquement sur certaines pages
import 'lib-slf/typography';
---

<BaseLayout
  {...props}
  siteConfig={siteConfig}
  enableTypography={false}
>
  <!-- Contenu -->
</BaseLayout>
```

## Surcharger les variables CSS

### Variables globales

Créez un fichier pour surcharger les variables :

```css
/* src/styles/custom-variables.css */

:root {
  /* Surcharger les polices */
  --font-primary: 'Inter', Arial, sans-serif;
  --font-secondary: 'Inter Medium', Arial, sans-serif;
  --font-light: 'Inter Light', Arial, sans-serif;

  /* Surcharger les couleurs */
  --color-text: #1a1a1a;
  --color-bg: #fafafa;
  --color-accent: #0066cc;

  /* Surcharger les transitions */
  --transition-fast: 150ms ease;
  --transition-medium: 250ms ease;
  --transition-slow: 400ms ease;

  /* Ajouter vos propres variables */
  --color-primary: #ff6b6b;
  --color-secondary: #4ecdc4;
  --spacing-unit: 1rem;
}
```

Importez-le dans votre projet :

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import '../styles/custom-variables.css';
---
```

## Désactiver les fonctionnalités

### Désactiver AOS (animations)

```astro
<BaseLayout enableAOS={false} {...props}>
  <!-- Pas d'animations AOS -->
</BaseLayout>
```

### Désactiver Footer Transition

```astro
<BaseLayout enableFooterTransition={false} {...props}>
  <!-- Pas de transition noir/blanc -->
</BaseLayout>
```

### Désactiver Typography

```astro
<BaseLayout enableTypography={false} {...props}>
  <!-- Utilisez votre propre système typographique -->
</BaseLayout>
```

## Créer votre propre wrapper

Si vous voulez standardiser la config dans votre projet :

```astro
---
// src/layouts/MyBaseLayout.astro
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
import '../styles/custom-variables.css';
import '../styles/custom-typography.css';

interface Props {
  title: string;
  description: string;
  lang?: string;
  // ... autres props personnalisées
}

const { title, description, lang = "fr-FR" } = Astro.props;
---

<BaseLayout
  title={title}
  description={description}
  lang={lang}
  siteConfig={siteConfig}
  enableTypography={false}
  enableFooterTransition={true}
  customFonts={["https://use.typekit.net/dop1cnn.css"]}
>
  <slot />
</BaseLayout>
```

Utilisez-le dans vos pages :

```astro
---
import MyBaseLayout from '@/layouts/MyBaseLayout.astro';
---

<MyBaseLayout title="Ma Page" description="Description">
  <h1>Contenu</h1>
</MyBaseLayout>
```

## Exemples complets

### Exemple 1 : Garder typography.css + quelques ajustements

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
---

<BaseLayout {...props} siteConfig={siteConfig}>
  <slot />
</BaseLayout>

<style is:global>
  /* Ajustements légers */
  .heading-1 {
    font-size: 250px;
  }

  @media (max-width: 767px) {
    .heading-1 {
      font-size: 80px;
    }
  }
</style>
```

### Exemple 2 : Système typographique 100% custom

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
import '../styles/my-complete-typography.css';
---

<BaseLayout
  {...props}
  siteConfig={siteConfig}
  enableTypography={false}
>
  <slot />
</BaseLayout>
```

```css
/* src/styles/my-complete-typography.css */

/* Votre système complet de A à Z */
h1 { font-size: clamp(2rem, 5vw, 5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 3rem); }
h3 { font-size: clamp(1.25rem, 3vw, 2rem); }
/* ... */
```

### Exemple 3 : Mix des deux approches

```astro
---
import BaseLayout from 'lib-slf/BaseLayout.astro';
import { siteConfig } from '@/config/site';
---

<BaseLayout
  {...props}
  siteConfig={siteConfig}
  enableTypography={true}  <!-- Garde le système de base -->
>
  <slot />
</BaseLayout>

<style is:global>
  /* Surcharges spécifiques */
  .page-title {
    font-size: 400px;
    background: linear-gradient(45deg, #ff0000, #0000ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
```

## Résumé des props de personnalisation

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `enableAOS` | `boolean` | `true` | Active/désactive les animations AOS |
| `enableFooterTransition` | `boolean` | `false` | Active/désactive la transition footer |
| `enableTypography` | `boolean` | `true` | Active/désactive typography.css |
| `customFonts` | `string[]` | `[]` | URLs de polices personnalisées |

## Bonnes pratiques

1. **Préférez les surcharges CSS** plutôt que désactiver complètement
2. **Utilisez `!important`** si nécessaire pour surcharger les styles de lib-slf
3. **Créez un wrapper** si vous avez des besoins spécifiques récurrents
4. **Centralisez vos variables CSS** dans un fichier dédié
5. **Testez la responsivité** après avoir fait des modifications
