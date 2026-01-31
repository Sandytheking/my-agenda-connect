//Página principal del blog

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog sobre gestión de citas y reservas | Agenda Connect",
  description:
    "Consejos para peluquerías, salones, clínicas y barberías sobre cómo automatizar citas, reducir ausencias y organizar mejor su agenda.",
};

export default function BlogPage() {
  const posts = [
    {
      title: "Cómo reducir las ausencias en un salón de belleza",
      slug: "reducir-ausencias-salon-belleza",
      desc: "Estrategias prácticas para que tus clientas no falten a sus citas y llenes tu agenda todos los días.",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Enero 2026",
    },
    {
      title: "La mejor agenda para peluquerías en 2026",
      slug: "mejor-agenda-para-peluquerias-2026",
      desc: "Qué funciones debe tener un sistema de reservas moderno para maximizar ingresos y reducir estrés.",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Enero 2026",
    },
    // Agrega más posts aquí cuando los tengas

{
  title: "Cómo organizar las citas de tu negocio sin volverte loco",
  slug: "organizar-citas-negocio-sin-estres",
  desc: "Pasa del caos de WhatsApp y papel a una agenda organizada que trabaja por ti.",
  image: "https://images.unsplash.com/photo-1554774853-b415df9eeb92?q=80&w=1470&auto=format&fit=crop",
  date: "Febrero 2026",
}

    
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
  src="https://thumbs.dreamstime.com/b/vibrant-abstract-bokeh-background-sparkling-glitter-particles-glowing-lights-creating-dynamic-featuring-gradient-warm-432660033.jpg"
  alt="Fondo abstracto morado elegante"
  fill
  priority
  sizes="100vw"
  className="object-cover"
/>

        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Blog de Agenda Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Consejos reales para peluquerías, salones de belleza y barberías: automatiza citas, reduce ausencias y haz crecer tu negocio en 2026.
          </p>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="relative h-48 overflow-hidden">
              <Image
  src={post.image}
  alt={post.title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover transition-transform duration-500 group-hover:scale-110"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-sm text-gray-300">{post.date}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.desc}
                </p>
                <span className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                  Leer más →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Si no hay más posts, mensaje */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">Pronto más artículos útiles para tu salón 💇‍♀️</p>
          </div>
        )}
      </section>

      {/* CTA final */}
      <section className="bg-purple-950/30 border-t border-purple-500/20 py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-4">¿Quieres llenar tu agenda sin esfuerzo?</h3>
          <p className="text-lg text-gray-300 mb-8">
            Prueba Agenda Connect gratis y automatiza tus reservas hoy mismo.
          </p>
          <Link
            href="/precios"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg"
          >
            Probar Gratis →
          </Link>
        </div>
      </section>
    </main>
  );
}