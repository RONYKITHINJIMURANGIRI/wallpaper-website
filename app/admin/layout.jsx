'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="text-xl font-bold text-white">
              ðŸ“¸ WallpaperCMS
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              â˜°
            </button>

            <div className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4`}>
              {user && (
                <>
                  <span className="text-slate-300 text-sm">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen p-6 hidden md:block">
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-3 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              ðŸ“Š Dashboard
            </Link>
            <Link
              href="/admin/upload"
              className="block px-4 py-3 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              â¬†ï¸ Upload Wallpaper
            </Link>
            <Link
              href="/admin/wallpapers"
              className="block px-4 py-3 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              ðŸ–¼ï¸ All Wallpapers
            </Link>
            <Link
              href="/admin/categories"
              className="block px-4 py-3 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              ðŸ“‚ Categories
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

