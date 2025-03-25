const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

// next.config.js (Next.js 루트 폴더에 있음)
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // SVG를 React 컴포넌트로 변환
    });
    return config;
  },
};

module.exports = nextConfig;

