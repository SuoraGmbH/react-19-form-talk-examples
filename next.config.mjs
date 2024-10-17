/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/json-server/:path*",
        destination: "http://localhost:3008/:path*",
      },
    ];
  },
};

export default nextConfig;
