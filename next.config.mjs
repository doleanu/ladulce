/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old English menu URL → new locale-prefixed route.
      { source: "/carta/en", destination: "/en/carta", permanent: true },
      // Old WordPress English homepage → new /en.
      { source: "/en/home-ingles", destination: "/en", permanent: true },
    ];
  },
};

export default nextConfig;
