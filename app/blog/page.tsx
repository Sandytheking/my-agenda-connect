// app/blog/page.tsx (server component)
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function BlogListPage() {
  // fetch via serverless: puedes usar supabase client or fetch to /api/posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`);
  const posts = await res.json();

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6">
        {posts.map((p:any) => (
          <article key={p.id} className="bg-white rounded-lg overflow-hidden shadow">
            {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="text-primary mt-3 inline-block">Leer más →</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
