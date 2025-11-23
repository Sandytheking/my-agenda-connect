// app/superadmin/blog/page.tsx (Server Component)
import React from 'react';
import BlogAdminClient from '@/components/BlogAdminClient';

export default function BlogAdminPage() {
  return (
    <div className="min-h-screen p-6 bg-[#0C1A1A] text-white">
      <h1 className="text-2xl mb-6">📝 Blog - Panel</h1>
      <BlogAdminClient />
    </div>
  );
}
