'use client';

import { useState, useEffect } from 'react';

export default function WallpapersPage() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchWallpapers();
    fetchCategories();
  }, [categoryFilter]);

  const fetchWallpapers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = categoryFilter
        ? `/api/wallpapers?categoryId=${categoryFilter}`
        : '/api/wallpapers';
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setWallpapers(data.data || []);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load wallpapers' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this wallpaper?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/wallpapers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: 'error', text: data.message });
        return;
      }

      setMessage({ type: 'success', text: 'Wallpaper deleted!' });
      fetchWallpapers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting wallpaper' });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">All Wallpapers</h1>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/50 text-green-400'
              : 'bg-red-500/10 border border-red-500/50 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-slate-400 py-12">
            Loading wallpapers...
          </div>
        ) : wallpapers.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 py-12">
            No wallpapers found
          </div>
        ) : (
          wallpapers.map((wp) => (
            <div
              key={wp.id}
              className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-slate-600 transition"
            >
              <div className="relative pb-[56.25%]">
                <img
                  src={wp.thumbnail}
                  alt={wp.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold truncate">{wp.title}</h3>
                <p className="text-slate-400 text-sm">{wp.category.name}</p>
                <div className="flex gap-2 text-xs text-slate-500 mt-2">
                  <span>ðŸ‘ {wp.views}</span>
                  <span>ðŸ’¾ {wp.downloads}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(wp.id)}
                    className="flex-1 px-2 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

