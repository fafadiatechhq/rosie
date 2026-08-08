import type { NextConfig } from "next";

const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs",
        destination: `${docsUrl}/docs`,
        permanent: false,
      },
      {
        source: "/docs/quickstart",
        destination: `${docsUrl}/docs/getting-started/quickstart`,
        permanent: false,
      },
      {
        source: "/docs/authentication",
        destination: `${docsUrl}/docs/getting-started/authentication`,
        permanent: false,
      },
      {
        source: "/docs/collections",
        destination: `${docsUrl}/docs/concepts/collections`,
        permanent: false,
      },
      {
        source: "/docs/fetchers",
        destination: `${docsUrl}/docs/concepts/fetchers`,
        permanent: false,
      },
      {
        source: "/docs/webhooks",
        destination: `${docsUrl}/docs/concepts/webhooks`,
        permanent: false,
      },
      {
        source: "/docs/api",
        destination: `${docsUrl}/docs/api/rest`,
        permanent: false,
      },
      {
        source: "/docs/sdks",
        destination: `${docsUrl}/docs/api/sdks`,
        permanent: false,
      },
      {
        source: "/docs/faq",
        destination: `${docsUrl}/docs/support/faq`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
