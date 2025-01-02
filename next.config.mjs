import i18nConfig from "./next-i18next.config.mjs";
import { configureRuntimeEnv } from "next-runtime-env/build/configure.js";
import { execSync } from "child_process";
import withPWA from "next-pwa";

configureRuntimeEnv();

const env = process.env.NEXT_PUBLIC_STAGE_ENV;

const getConnectSrcCSPConfig = () => {
  // add your S3 bucket, CDN, API, WS and other external URLs here
  const defaultConnectSrc = [];

  if (env === "local") {
    defaultConnectSrc.push("http://localhost:*");
    defaultConnectSrc.push("ws://localhost:*");
  }

  return defaultConnectSrc.join(" ");
};

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${getConnectSrcCSPConfig()};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' ${getConnectSrcCSPConfig()};
`;

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname.startsWith("/api"),
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(js|css|png|jpg|jpeg|svg|gif|ico|json)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-assets",
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWAConfig({
  generateBuildId: () => execSync("git rev-parse HEAD").toString().trim(),

  webpack: (config, { buildId }) => {
    // append build id to all the generated files
    config.output.chunkFilename = config.output.chunkFilename.replace(
      "[name]",
      `[name]-${buildId}`,
    );

    return config;
  },

  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  images: {
    domains: ["localhost"],
  },

  i18n: i18nConfig.i18n,

  // eslint-disable-next-line require-await
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-FRAME-OPTIONS",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
});

export default nextConfig;
