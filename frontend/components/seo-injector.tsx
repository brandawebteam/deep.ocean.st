

// function toAbs(url?: string, base?: string) {
//   if (!url) return undefined;
//   try {
//     return new URL(url, base).toString();
//   } catch {
//     return url; // если кривой URL — вернём как есть
//   }
// }

// export default function SeoInjector(props: SeoProps) {
//   const {
//     title,
//     description,
//     canonical,
//     noindex,
//     ogImage,
//     ogUrl,
//     siteName,
//     twitterCard = 'summary_large_image',
//     extraMeta,
//     extraLinks,
//     baseUrl = process.env.NEXT_PUBLIC_SITE_URL,
//   } = props;

//   const canonicalAbs = useMemo(() => toAbs(canonical, baseUrl), [canonical, baseUrl]);
//   const ogImageAbs  = useMemo(() => toAbs(ogImage,  baseUrl), [ogImage,  baseUrl]);
//   const ogUrlAbs    = useMemo(() => toAbs(ogUrl ?? canonical ?? '', baseUrl), [ogUrl, canonical, baseUrl]);

//   return (
//     <Head>
//       {/* Title / Description */}
//       {title && <title>{title}</title>}
//       {description && <meta name="description" content={description} />}

//       {/* Canonical */}
//       {canonicalAbs && <link key="canonical" rel="canonical" href={canonicalAbs} />}

//       {/* Robots */}
//       {noindex && <meta name="robots" content="noindex, nofollow" />}

//       {/* Open Graph */}
//       {siteName && <meta property="og:site_name" content={siteName} />}
//       {title && <meta property="og:title" content={title} />}
//       {description && <meta property="og:description" content={description} />}
//       {ogUrlAbs && <meta property="og:url" content={ogUrlAbs} />}
//       {ogImageAbs && <meta property="og:image" content={ogImageAbs} />}

//       {/* Twitter */}
//       <meta name="twitter:card" content={twitterCard} />
//       {title && <meta name="twitter:title" content={title} />}
//       {description && <meta name="twitter:description" content={description} />}
//       {ogImageAbs && <meta name="twitter:image" content={ogImageAbs} />}

//       {/* Расширяемые теги при необходимости */}
//       {extraMeta?.map((m, i) => <meta key={`x-meta-${i}`} {...m} />)}
//       {extraLinks?.map((l, i) => <link key={`x-link-${i}`} {...l} />)}
//     </Head>
//   );
// }
