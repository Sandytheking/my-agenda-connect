
//app/blog/[slug]/page.tsx
export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`, {
    cache: "no-cache",
  });

  const post = await res.json();

  if (!post || post.error) {
    return (
      <main className="max-w-3xl mx-auto py-12 px-4">
        <p>Artículo no encontrado</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Publicado el {new Date(post.created_at).toLocaleDateString()}
      </p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
