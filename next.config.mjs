import { configureRuntimeEnv } from "next-runtime-env/build/configure.js";

import { execSync } from "child_process";

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

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
