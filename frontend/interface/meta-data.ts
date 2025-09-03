export type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;          // абсолютный
  noindex?: boolean;           // true → <meta name="robots" content="noindex,nofollow" />
  ogImage?: string;            // абсолютный
  ogUrl?: string;              // если нужно переопределить og:url
};