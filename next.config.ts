// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus redirects actuales (los mantienes tal cual)
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Si tienes más redirects, agrégalos aquí
    ];
  },

  // Configuración para imágenes remotas (esto soluciona el error)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        port: '',
        pathname: '/**',
      },

{
  protocol: 'https',
  hostname: 'happoin.com',
  port: '',
  pathname: '/storage/uploads/**',
},

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
     
       {
         protocol: 'https',
         hostname: 'blog.miosalon.com',
         port: '',
         pathname: '/wp-content/uploads/**',
      },
    ],
  },

  // Si tienes otras configuraciones (ej. experimental, env, etc.), ponlas aquí
};

module.exports = nextConfig;