/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },

  exportPathMap: async function (defaultPathMap) {
    return {
      "/": { page: "/home-page" },
    };
  },
};

export default nextConfig;
