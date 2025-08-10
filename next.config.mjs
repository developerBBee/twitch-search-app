/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: [
      "static-cdn.jtvnw.net",
      "vod-secure.twitch.tv",
      "vod-metro.twitch.tv",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vod-secure.twitch.tv",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vod-metro.twitch.tv",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
