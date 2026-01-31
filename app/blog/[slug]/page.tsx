//Página de artículo individual

import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts = [
  {
    title: "Cómo reducir las ausencias en un salón de belleza",
    slug: "como-reducir-ausencias-salon",
    description:
      "Estrategias prácticas para que tus clientas no falten a sus citas.",
    content: `
      <p>Las ausencias a citas son uno de los problemas que más dinero le hacen perder a un salón de belleza...</p>

      <h2>¿Por qué las clientas faltan a sus citas?</h2>
      <ul>
        <li>Se les olvidó la cita</li>
        <li>No recibieron recordatorio</li>
        <li>No sabían cómo cancelar</li>
        <li>La reservaron con muchos días de anticipación</li>
      </ul>

      <h2>1. Usa recordatorios automáticos</h2>
      <p>Los recordatorios reducen las ausencias hasta en un 70–80%...</p>

      <h2>2. Permite reservas online 24/7</h2>
      <p>Tener una <strong>agenda online para salón de belleza</strong> hace que la clienta vea claramente su horario...</p>

      <h2>Conclusión</h2>
      <p>Las ausencias no son mala suerte, son un problema de sistema...</p>
    `,
  },
  {
    title: "La mejor agenda para peluquerías en 2026",
    slug: "agenda-para-peluquerias",
    description:
      "Qué debe tener un sistema de reservas moderno para peluquerías.",
    content: `
      <p>Elegir una agenda digital para peluquería puede marcar la diferencia...</p>

      <h2>1. Reservas online 24/7</h2>
      <p>Tus clientes deben poder agendar sin llamarte...</p>

      <h2>2. Recordatorios automáticos</h2>
      <p>Reducen drásticamente las ausencias...</p>

      <h2>3. Control por estilista</h2>
      <p>Cada profesional debe tener su propio horario...</p>

      <h2>Conclusión</h2>
      <p>Una peluquería moderna necesita algo más que una libreta...</p>
    `,
  },
];

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog Agenda Connect`,
    description: post.description,
    alternates: {
      canonical: `https://www.agenda-connect.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.agenda-connect.com/blog/${post.slug}`,
      siteName: "Agenda Connect",
      locale: "es_DO",
      type: "article",
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            author: {
              "@type": "Organization",
              name: "Agenda Connect",
            },
            publisher: {
              "@type": "Organization",
              name: "Agenda Connect",
              logo: {
                "@type": "ImageObject",
                url: "https://www.agenda-connect.com/logo.png",
              },
            },
            mainEntityOfPage: `https://www.agenda-connect.com/blog/${post.slug}`,
          }),
        }}
      />
    </main>
  );
}
