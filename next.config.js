const env = process.env.NODE_ENV;

const getConnectSrcCSPConfig = () => {
  // add your S3 bucket, CDN, API and other external URLs here
  const defaultConnectSrc = "";

  if (["development", "local"].includes(env)) {
    return `${defaultConnectSrc} http://localhost:*`;
  }

  return defaultConnectSrc;
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
