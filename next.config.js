// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // ✅ SVG를 React 컴포넌트로 변환하는 설정
    });
    return config;
  },
};

module.exports = nextConfig;
