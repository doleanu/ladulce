/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Next's built-in "/x/ -> /x" 308 (it runs before custom redirects, so
  // /en/home-ingles/ took 2 hops). The same rule is re-added as the LAST redirect
  // below, so every other trailing-slash URL behaves exactly as before.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Old English menu URL → new locale-prefixed route.
      { source: "/carta/en", destination: "/en/carta", permanent: true },
      // Old WordPress English homepage → new /en.
      // Matches with or without trailing slash (see skipTrailingSlashRedirect).
      { source: "/en/home-ingles", destination: "/en", permanent: true },
      // Replacement for the built-in trailing-slash redirect (keep last).
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
