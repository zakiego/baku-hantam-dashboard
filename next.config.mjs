/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
}

export default nextConfig
