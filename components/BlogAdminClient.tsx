// components/BlogAdminClient.tsx
'use client';
import React, { useEffect, useState } from 'react';
import BlogEditor from './BlogEditor';

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
};

export default function BlogAdminClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/posts');
    const json = await res.json();
    // NOTE: /api/posts returns only published posts for public. For admin listing, you might create /api/admin/posts
    // For simplicity, call a new endpoint or use supabase client directly here if you prefer.
    // We'll call /api/admin/posts in this example.
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = sessionStorage.getItem('superadmin_token') || '';
      const res = await fetch('/api/admin/posts', { headers: { Authorization: `Bearer ${token}` }});
      const json = await res.json();
      if (res.ok) setPosts(json);
      else alert(json.error || 'Error fetching posts');
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar artículo?')) return;
    const token = sessionStorage.getItem('superadmin_token') || '';
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` }});
    const json = await res.json();
    if (!res.ok) return alert(json.error || 'Error');
    setPosts(p => p.filter(x => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div />
        <div className="flex gap-3">
          <button onClick={() => setCreating(!creating)} className="bg-green-600 px-3 py-2 rounded">+ Nuevo</button>
        </div>
      </div>

      {creating && (
        <div className="bg-white p-4 rounded text-black shadow">
          <BlogEditor />
        </div>
      )}

      {loading ? <p>Cargando...</p> : (
        <table className="w-full text-left bg-[#071414] rounded">
          <thead>
            <tr>
              <th className="p-2">Título</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Publicado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-t border-gray-700">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.slug}</td>
                <td className="p-2">{p.published ? 'Sí' : 'No'}</td>
                <td className="p-2">
                  <button onClick={() => setEditing(p)} className="bg-yellow-500 px-2 py-1 rounded mr-2">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-600 px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <div className="bg-white p-4 rounded text-black shadow">
          {/* para editar, debes cargar el post y pasarlo como initial */}
          <EditWrapper id={editing.id} onClose={() => setEditing(null)} />
        </div>
      )}
    </div>
  );
}

// wrapper que obtiene el post por id y muestra BlogEditor con initial
function EditWrapper({ id, onClose } : { id: string, onClose: ()=>void }) {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem('superadmin_token') || '';
      const res = await fetch(`/api/posts/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      const json = await res.json();
      if (res.ok) setPost(json);
      else alert(json.error || 'error');
    })();
  }, [id]);

  if (!post) return <p>Cargando post...</p>;
  return (
    <div>
      <button onClick={onClose} className="mb-4 text-sm text-gray-600">Cerrar</button>
      <BlogEditor initial={post} />
    </div>
  );
}
