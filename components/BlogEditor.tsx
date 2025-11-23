// components/BlogEditor.tsx
'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import "./blog-editor-dark.css";


// cargar Tiptap dinámicamente (evita SSR)
const EditorContent = dynamic(() => import('@tiptap/react').then(m => m.EditorContent), { ssr: false });
const useEditor = dynamic(() => import('@tiptap/react').then(m => m.useEditor), { ssr: false });
import StarterKit from '@tiptap/starter-kit';

type Props = {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string;
    image_url?: string;
    published?: boolean;
  };
};

export default function BlogEditor({ initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [excerpt, setExcerpt] = useState(initial?.excerpt || '');
  const [imageUrl, setImageUrl] = useState(initial?.image_url || '');
  const [saving, setSaving] = useState(false);
  const [published, setPublished] = useState(!!initial?.published);

  // useEditor hook (client-only)
  // @ts-ignore
  const editor = useEditor?.({
    extensions: [StarterKit],
    content: initial?.content || '<p></p>',
  });

  useEffect(() => {
    if (!slug && title) {
      const s = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      setSlug(s);
    }
  }, [title]);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('filename', file.name);

    const res = await fetch('/api/uploads', { method: 'POST', body: fd });
    const json = await res.json();
    if (res.ok) setImageUrl(json.url);
    else alert('Upload error: ' + json.error);
  };

  const handleSave = async () => {
    if (!title || !editor) return alert('Título y contenido requeridos');
    setSaving(true);
    const contentHtml = editor.getHTML();

    const payload = {
      title,
      slug,
      content: contentHtml,
      excerpt,
      image_url: imageUrl,
      published,
    };

    const token = sessionStorage.getItem('superadmin_token') || '';

    const method = initial?.id ? 'PUT' : 'POST';
    const url = initial?.id ? `/api/posts/${initial.id}` : `/api/posts`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    setSaving(false);
    if (!res.ok) return alert('Error: ' + (json.error || 'unknown'));
    // ir a listado de admin
    router.refresh();
    alert('Guardado con éxito');
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-3 rounded border bg-white text-black"
        placeholder="Título del artículo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-3">
        <input
          className="flex-1 p-2 rounded border bg-white text-black"
          placeholder="Slug (se genera automático)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publicado
        </label>
      </div>

      <input
        className="w-full p-2 rounded border bg-white text-black"
        placeholder="Extracto (opcional)"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <div>
        <label className="block text-sm mb-1">Imagen destacada</label>
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
          {imageUrl && <img src={imageUrl} className="w-24 h-16 object-cover rounded" alt="cover" />}
        </div>
      </div>

      <div>
        <div className="border rounded p-2 bg-white min-h-[220px]">
          {editor ? <EditorContent editor={editor} /> : <p>Loading editor…</p>}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave} disabled={saving} className="bg-[#5B21B6] text-white px-4 py-2 rounded">
          {saving ? 'Guardando...' : 'Guardar artículo'}
        </button>
      </div>
    </div>
  );
}
