import { useHead, useRuntimeConfig, useRoute } from "nuxt/app";

export function useSeo({
  title,
  description,
  image = "https://herby.cat/assets/favicon.ico",
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}) {
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const canonicalUrl = process.server
    ? `${runtimeConfig.public.CLIENT_URL}${route.fullPath}`
    : window.location.href;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: type },
      { property: "og:url", content: canonicalUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: title,
          url: canonicalUrl,
          image: image,
          description: description,
        }),
      },
    ],
  });
}
