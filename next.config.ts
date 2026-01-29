// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mantienes tus redirects actuales
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Configuración obligatoria para imágenes remotas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        port: '',
        pathname: '/**',          // permite cualquier ruta en ese dominio
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Puedes agregar más dominios si usas otros en el futuro
      // Ejemplo:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.pixabay.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

module.exports = nextConfig;