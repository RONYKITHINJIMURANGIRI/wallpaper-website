'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    wallpapers: 0,
    categories: 0,
    users: 0,
    downloads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [wallpapersRes, categoriesRes] = await Promise.all([
        fetch('/api/wallpapers', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const wallpapersData = await wallpapersRes.json();
      const categoriesData = await categoriesRes.json();

      setStats({
        wallpapers: wallpapersData.data?.pagination?.total || 0,
        categories: categoriesData.data?.length || 0,
        users: 0,
        downloads: 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="ðŸ–¼ï¸" label="Wallpapers" value={stats.wallpapers} loading={loading} />
        <StatCard icon="ðŸ“‚" label="Categories" value={stats.categories} loading={loading} />
        <StatCard icon="ðŸ“Š" label="Total Downloads" value={stats.downloads} loading={loading} />
        <StatCard icon="ðŸ‘¥" label="Users" value={stats.users} loading={loading} />
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-center">
            <span className="text-blue-400 mr-3">âœ“</span>
            <span>Create categories for organizing wallpapers</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-400 mr-3">âœ“</span>
            <span>Upload wallpapers with automatic compression and thumbnail generation</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-400 mr-3">âœ“</span>
            <span>Add tags to wallpapers for better search</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-400 mr-3">âœ“</span>
            <span>Manage wallpapers - edit details, delete, or feature them</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-400 mr-3">âœ“</span>
            <span>Track downloads and views for each wallpaper</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, loading }) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">
            {loading ? '...' : value}
          </p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

