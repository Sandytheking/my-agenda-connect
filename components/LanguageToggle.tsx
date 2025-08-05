
//components/LanguageToggle.tsx

'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()

  const handleToggle = () => {
    if (pathname.startsWith('/home/en')) {
      // Estás en inglés → redirige al español
      router.push('/home')
    } else {
      // Estás en español → redirige al inglés
      router.push('/home/en')
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-purple-600 text-sm font-medium"
    >
      {pathname.startsWith('/home/en') ? 'Español' : 'English'}
    </button>
  )
}
