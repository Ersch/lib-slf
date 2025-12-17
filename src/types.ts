/**
 * Configuration du site pour le BaseLayout
 */
export interface SiteConfig {
  /** Nom du site (utilisé pour og:site_name) */
  name: string;
  /** Auteur du site (meta author) */
  author: string;
  /** Éditeur du site (meta publisher) */
  publisher: string;
  /** URL de base du site (ex: "https://monsite.com") */
  baseUrl: string;
}

/**
 * URLs alternatives pour les tags hreflang
 */
export interface AlternateUrls {
  /** URL de la version française */
  fr?: string;
  /** URL de la version anglaise */
  en?: string;
}

/**
 * Props du composant BaseLayout
 */
export interface BaseLayoutProps {
  /** Titre de la page (balise <title> et og:title) */
  title: string;

  /** Description de la page (meta description et og:description) */
  description: string;

  /** Code langue (ex: "fr-FR", "en-US") */
  lang: string;

  /** Configuration du site */
  siteConfig: SiteConfig;

  /** Données structurées JSON-LD (optionnel) */
  structuredData?: object;

  /** URLs alternatives pour hreflang (optionnel, auto-généré si non fourni) */
  alternateUrls?: AlternateUrls;

  /** URL de l'image Open Graph (optionnel) */
  ogImage?: string;

  /** Texte alternatif de l'image OG (optionnel, défaut: "{siteName} Logo") */
  ogImageAlt?: string;

  /** Type Open Graph (optionnel, défaut: "website") */
  ogType?: string;

  /** Activer les animations AOS (optionnel, défaut: true) */
  enableAOS?: boolean;

  /** Activer la transition noir/blanc du footer au scroll (optionnel, défaut: false) */
  enableFooterTransition?: boolean;

  /** Activer le système typographique (optionnel, défaut: true) */
  enableTypography?: boolean;

  /** URLs de polices personnalisées (optionnel) */
  customFonts?: string[];
}
