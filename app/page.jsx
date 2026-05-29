"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdSlot from '../components/ui/AdSlot';

const WALLPAPERS = [
  {
    id: "001", title: "Elden Ring — The Erdtree", game: "Elden Ring", genre: "RPG",
    thumb: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    full: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=90",
    tags: ["dark fantasy", "open world", "fromsoft"], artist: "FromSoftware Press Kit",
    downloads: 14823, views: 58291, trending: true, premium: false, uploadedAt: "2024-01-15",
    resolutions: ["HD","4K","8K","Ultrawide","Mobile"]
  },
  {
    id: "002", title: "Cyberpunk 2077 — Night City Skyline", game: "Cyberpunk 2077", genre: "Sci-Fi",
    thumb: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    full: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=90",
    tags: ["cyberpunk", "neon", "open world"], artist: "CD Projekt Red",
    downloads: 22410, views: 91020, trending: true, premium: false, uploadedAt: "2024-01-18",
    resolutions: ["HD","4K","8K","Ultrawide","Mobile"]
  },
  {
    id: "003", title: "Doom Eternal — Slayer's Lair", game: "Doom Eternal", genre: "FPS",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    full: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=90",
    tags: ["fps", "demons", "hell"], artist: "id Software",
    downloads: 9872, views: 34567, trending: false, premium: false, uploadedAt: "2024-01-20",
    resolutions: ["HD","4K","Ultrawide","Mobile"]
  },
  {
    id: "004", title: "Ghost of Tsushima — Samurai's Dawn", game: "Ghost of Tsushima", genre: "Open World",
    thumb: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    full: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=90",
    tags: ["samurai", "japan", "open world"], artist: "Sucker Punch Productions",
    downloads: 18230, views: 72110, trending: true, premium: false, uploadedAt: "2024-01-22",
    resolutions: ["HD","4K","8K","Ultrawide","Mobile"]
  },
  {
    id: "005", title: "Hollow Knight — Forgotten Crossroads", game: "Hollow Knight", genre: "Fantasy",
    thumb: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&q=80",
    full: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=1920&q=90",
    tags: ["indie", "dark", "fantasy"], artist: "Team Cherry",
    downloads: 7643, views: 29811, trending: false, premium: false, uploadedAt: "2024-01-25",
    resolutions: ["HD","4K","Mobile"]
  },
  {
    id: "006", title: "Resident Evil Village — Castle Dimitrescu", game: "Resident Evil Village", genre: "Horror",
    thumb: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=800&q=80",
    full: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=1920&q=90",
    tags: ["horror", "gothic", "survival"], artist: "Capcom",
    downloads: 11290, views: 48900, trending: true, premium: false, uploadedAt: "2024-01-28",
    resolutions: ["HD","4K","8K","Mobile"]
  },
  {
    id: "007", title: "Valorant — Neon Abstract", game: "Valorant", genre: "FPS",
    thumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    full: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=90",
    tags: ["tactical", "neon", "fps"], artist: "Riot Games",
    downloads: 19875, views: 85330, trending: true, premium: false, uploadedAt: "2024-02-01",
    resolutions: ["HD","4K","Ultrawide","Mobile"]
  },
  {
    id: "008", title: "God of War — Kratos in Midgard", game: "God of War", genre: "RPG",
    thumb: "https://images.unsplash.com/photo-1591989302820-e9fdb7cb70f9?w=800&q=80",
    full: "https://images.unsplash.com/photo-1591989302820-e9fdb7cb70f9?w=1920&q=90",
    tags: ["norse", "mythology", "action"], artist: "Santa Monica Studio",
    downloads: 25100, views: 102000, trending: true, premium: true, uploadedAt: "2024-02-05",
    resolutions: ["HD","4K","8K","Ultrawide","Mobile"]
  },
  {
    id: "009", title: "Hades — The Underworld Gates", game: "Hades", genre: "Fantasy",
    thumb: "https://images.unsplash.com/photo-1636955840493-f43a02bfa064?w=800&q=80",
    full: "https://images.unsplash.com/photo-1636955840493-f43a02bfa064?w=1920&q=90",
    tags: ["roguelite", "greek", "mythology"], artist: "Supergiant Games",
    downloads: 8910, views: 31200, trending: false, premium: false, uploadedAt: "2024-02-08",
    resolutions: ["HD","4K","Mobile"]
  },
  {
    id: "010", title: "Apex Legends — Neon Bangalore", game: "Apex Legends", genre: "FPS",
    thumb: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
    full: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1920&q=90",
    tags: ["battle royale", "sci-fi", "fps"], artist: "Respawn Entertainment",
    downloads: 14500, views: 59800, trending: false, premium: false, uploadedAt: "2024-02-10",
    resolutions: ["HD","4K","Ultrawide","Mobile"]
  },
  {
    id: "011", title: "Spiritfarer — The Glowing Sea", game: "Spiritfarer", genre: "Anime",
    thumb: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
    full: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=90",
    tags: ["indie", "anime", "cozy"], artist: "Thunder Lotus Games",
    downloads: 6780, views: 22400, trending: false, premium: false, uploadedAt: "2024-02-12",
    resolutions: ["HD","4K","Mobile"]
  },
  {
    id: "012", title: "No Man's Sky — Infinite Cosmos", game: "No Man's Sky", genre: "Sci-Fi",
    thumb: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    full: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=90",
    tags: ["space", "exploration", "procedural"], artist: "Hello Games",
    downloads: 17320, views: 68900, trending: true, premium: true, uploadedAt: "2024-02-15",
    resolutions: ["HD","4K","8K","Ultrawide","Mobile"]
  }
];

const CATEGORIES = ["All","FPS","RPG","Open World","Sci-Fi","Fantasy","Horror","Anime","Abstract"];

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({length: 80}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 270 : 190
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function ResolutionBadge({ res }) {
  const styles = {
    "8K": "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40",
    "4K": "bg-purple-500/20 text-purple-400 border border-purple-500/40",
    "HD": "bg-gray-600/30 text-gray-400 border border-gray-600/40",
    "Ultrawide": "bg-amber-500/20 text-amber-400 border border-amber-500/40",
    "Mobile": "bg-green-500/20 text-green-400 border border-green-500/40",
  };
  return (
    <span className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded-sm ${styles[res] || styles["HD"]}`}>
      {res}
    </span>
  );
}

function WallpaperCard({ w, onPreview, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const topRes = w.resolutions.includes("8K") ? "8K" : w.resolutions.includes("4K") ? "4K" : "HD";
  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ background: "#111827", boxShadow: hovered ? "0 0 30px rgba(124,58,237,0.3)" : "0 4px 20px rgba(0,0,0,0.5)", transition: "box-shadow 0.3s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={w.thumb}
          alt={w.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {w.premium && (
          <div className="absolute top-2 right-2 bg-amber-500/90 text-black text-[9px] font-black px-2 py-0.5 rounded tracking-wider">PRO</div>
        )}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(3,7,18,0.65)", backdropFilter: "blur(2px)" }}>
          <button
            type="button"
            onClick={() => onPreview(w)}
            className="px-4 py-2 rounded-lg text-sm font-bold border border-purple-500/60 text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            ⚡ Preview
          </button>
          <button
            type="button"
            onClick={() => onNavigate(w)}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors"
            style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}
          >
            ↓ Download
          </button>
        </div>
        <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
          <ResolutionBadge res={topRes} />
          {w.trending && <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-sm bg-orange-500/20 text-orange-400 border border-orange-500/40">🔥 TREND</span>}
        </div>
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-bold truncate leading-snug">{w.title}</p>
        <p className="text-gray-400 text-xs mt-0.5">{w.game}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-purple-400 font-semibold">{w.genre}</span>
          <span className="text-[11px] text-gray-500">↓ {(w.downloads / 1000).toFixed(1)}K</span>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ wall, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  if (!wall) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.95)" }} onClick={onClose}>
      <div className="relative max-w-6xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white text-3xl font-thin leading-none">×</button>
        <img src={wall.full} alt={wall.title} className="w-full rounded-xl max-h-[80vh] object-contain" />
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-lg">{wall.title}</p>
            <p className="text-gray-400 text-sm">{wall.artist}</p>
          </div>
          <div className="flex gap-2">
            {wall.resolutions.map(r => <ResolutionBadge key={r} res={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePageContent({ setPage, onPreview, setDetailWall }) {
  const [category, setCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [page_, setPage_] = useState(1);
  const PER_PAGE = 9;

  const filtered = useMemo(() => {
    let list = WALLPAPERS;
    if (category !== "All") list = list.filter(w => w.genre === category);
    if (searchQ) list = list.filter(w => w.title.toLowerCase().includes(searchQ.toLowerCase()) || w.game.toLowerCase().includes(searchQ.toLowerCase()));
    return list;
  }, [category, searchQ]);

  const visible = filtered.slice(0, page_ * PER_PAGE);
  const trending = WALLPAPERS.filter(w => w.trending);

  return (
    <div>
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden pt-16">
        <ParticleCanvas />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border" style={{ background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.3)", color: "#a78bfa" }}>
            🎮 Free · No Signup · No Watermarks
          </div>
          <h1 className="font-black text-white leading-none mb-4" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.03em" }}>
            Ultra HD<br />
            <span style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Gaming Wallpapers
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 font-medium">4K · 8K · Ultrawide · Mobile — All Free</p>
          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search by game, genre, or art style..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="w-full py-4 pl-12 pr-5 rounded-2xl text-white placeholder-gray-500 focus:outline-none text-base"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(8px)" }}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
            <span>Trending:</span>
            {trending.slice(0,4).map(w => (
              <button key={w.id} type="button" onClick={() => { setDetailWall(w); setPage("detail"); }} className="text-purple-400 hover:text-cyan-400 transition-colors">{w.game}</button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-600 text-xs tracking-widest">↓ SCROLL</div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <AdSlot label="728×90 Leaderboard" />

        <section className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-black text-xl flex items-center gap-2">🔥 <span>Trending Now</span></h2>
            <span className="text-gray-600 text-sm">{trending.length} wallpapers</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {trending.map(w => (
              <div key={w.id} className="shrink-0 w-56 rounded-xl overflow-hidden cursor-pointer group relative" style={{ background: "#111827" }} onClick={() => { setDetailWall(w); setPage("detail"); }}>
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  <img src={w.thumb} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2"><ResolutionBadge res={w.resolutions.includes("8K") ? "8K" : "4K"} /></div>
                </div>
                <div className="p-2.5">
                  <p className="text-white text-xs font-bold truncate">{w.game}</p>
                  <p className="text-gray-500 text-[11px]">↓ {(w.downloads / 1000).toFixed(1)}K</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} type="button" onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${category === c ? "text-white scale-105" : "text-gray-400 hover:text-white"}`}
                style={category === c ? { background: "linear-gradient(135deg,#7C3AED,#06B6D4)" } : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-black text-xl">{category === "All" ? "All Wallpapers" : category} <span className="text-gray-600 font-normal text-base">({filtered.length})</span></h2>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-600">No wallpapers found. Try a different search or category.</div>
          ) : (
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
              {visible.map((w, i) => (
                <Fragment key={w.id}>
                  <WallpaperCard w={w} onPreview={onPreview} onNavigate={ww => { setDetailWall(ww); setPage("detail"); }} />
                  {i === 5 && <div key="ad" className="col-span-full"><AdSlot label="In-Grid Ad Slot" /></div>}
                </Fragment>
              ))}
            </div>
          )}
          {visible.length < filtered.length && (
            <div className="text-center mt-10">
              <button type="button" onClick={() => setPage_(p => p + 1)}
                className="px-8 py-3 rounded-xl font-bold text-white border border-purple-500/40 hover:bg-purple-500/10 transition-colors">
                Load More Wallpapers
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function DetailPage({ wall, onPreview, setPage, setDetailWall }) {
  const [selRes, setSelRes] = useState(wall?.resolutions?.[1] || "4K");
  if (!wall) return <div className="pt-24 text-center text-gray-500">Wallpaper not found.</div>;
  const related = WALLPAPERS.filter(w => w.id !== wall.id && (w.genre === wall.genre || w.game === wall.game)).slice(0, 4);
  const handleDownload = () => {
    if (wall.premium && selRes === "8K") {
      alert("⚡ 8K downloads are a Pro feature. Upgrade to VersaceHub Pro for $4.99/month!");
      setPage("premium");
      return;
    }
    window.open(wall.full, "_blank");
  };
  return (
    <div className="pt-24 max-w-7xl mx-auto px-4">
      <button type="button" onClick={() => setPage("home")} className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
        ← Back to Gallery
      </button>
      <div className="relative rounded-2xl overflow-hidden mb-8 cursor-pointer" onClick={() => onPreview(wall)}>
        <img src={wall.full} alt={wall.title} className="w-full max-h-[70vh] object-cover" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}>
          <span className="text-white font-bold text-lg border border-white/40 px-6 py-3 rounded-xl">🔍 Full Preview</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-white font-black text-3xl mb-1">{wall.title}</h1>
          <p className="text-gray-400 mb-4">{wall.game} · {wall.genre}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {wall.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full text-purple-300 border border-purple-500/30 bg-purple-500/10">#{t}</span>)}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[["👁️ Views", wall.views.toLocaleString()], ["↓ Downloads", wall.downloads.toLocaleString()], ["🎨 Artist", wall.artist.split(" ").slice(0,2).join(" ")], ["📅 Added", wall.uploadedAt]].map(([k,v]) => (
              <div key={k} className="rounded-xl p-3" style={{ background: "#111827" }}>
                <p className="text-gray-500 text-xs mb-1">{k}</p>
                <p className="text-white font-bold text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold mb-3">Share this wallpaper</p>
            <div className="flex gap-2 flex-wrap">
              {["🐦 Twitter","💬 Discord","🟠 Reddit","🔗 Copy Link"].map(l => (
                <button key={l} type="button" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white transition-colors border border-white/10 hover:border-white/20 bg-white/5">
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-xl p-4 flex items-center gap-4 border border-amber-500/20 bg-amber-500/5">
            <span className="text-2xl">🖥️</span>
            <div className="flex-1">
              <p className="text-white text-sm font-bold">Get a monitor worthy of this wallpaper</p>
              <p className="text-gray-500 text-xs">LG 27" 4K OLED — see it the way it was meant to be seen</p>
            </div>
            <a href="#" className="shrink-0 px-4 py-2 rounded-lg text-xs font-bold text-amber-400 border border-amber-500/40 hover:bg-amber-500/10 transition-colors">View Deal →</a>
          </div>
        </div>
        <div>
          <div className="rounded-2xl p-5 sticky top-20" style={{ background: "#111827", border: "1px solid rgba(124,58,237,0.2)" }}>
            <p className="text-white font-bold text-lg mb-4">Download</p>
            <div className="space-y-2 mb-5">
              {wall.resolutions.map(r => (
                <button key={r} type="button" onClick={() => setSelRes(r)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm ${selRes === r ? "text-white" : "text-gray-400 hover:text-white"}`}
                  style={{ background: selRes === r ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.04)", border: selRes === r ? "1px solid rgba(124,58,237,0.5)" : "1px solid transparent" }}>
                  <span>{r === "HD" ? "1080p HD" : r === "4K" ? "4K Ultra HD" : r === "8K" ? "8K Super HD" : r === "Ultrawide" ? "Ultrawide 21:9" : "Mobile Portrait"}</span>
                  {r === "8K" && wall.premium ? <span className="text-[10px] font-black text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded">PRO</span> : <ResolutionBadge res={r} />}
                </button>
              ))}
            </div>
            <button type="button" onClick={handleDownload}
              className="w-full py-4 rounded-xl font-black text-white text-base transition-transform hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}>
              ↓ Download {selRes}
            </button>
            <p className="text-center text-gray-600 text-xs mt-3">Free forever · No signup required</p>
            {wall.premium && (
              <button type="button" onClick={() => setPage("premium")} className="w-full mt-3 py-2 rounded-xl text-sm font-bold text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-colors">
                ⚡ Unlock 8K with Pro
              </button>
            )}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-white font-black text-xl mb-6">Related Wallpapers</h2>
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {related.map(w => <WallpaperCard key={w.id} w={w} onPreview={onPreview} onNavigate={ww => { setDetailWall(ww); setPage("detail"); }} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function SearchPage({ query, onPreview, setPage, setDetailWall }) {
  const [localQ, setLocalQ] = useState(query || "");
  const [resFilter, setResFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");

  const results = useMemo(() => {
    let list = WALLPAPERS;
    if (localQ) list = list.filter(w => w.title.toLowerCase().includes(localQ.toLowerCase()) || w.game.toLowerCase().includes(localQ.toLowerCase()) || w.tags.some(t => t.includes(localQ.toLowerCase())));
    if (resFilter !== "All") list = list.filter(w => w.resolutions.includes(resFilter));
    if (genreFilter !== "All") list = list.filter(w => w.genre === genreFilter);
    return list;
  }, [localQ, resFilter, genreFilter]);

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4">
      <h1 className="text-white font-black text-3xl mb-6">Search Wallpapers</h1>
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        <input type="text" placeholder="Search by game, genre, tags..."
          value={localQ} onChange={e => setLocalQ(e.target.value)}
          className="w-full py-4 pl-12 pr-5 rounded-2xl text-white placeholder-gray-500 focus:outline-none text-base"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,58,237,0.25)" }} />
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-500 text-sm self-center">Resolution:</span>
          {["All","HD","4K","8K","Ultrawide","Mobile"].map(r => (
            <button key={r} type="button" onClick={() => setResFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${resFilter === r ? "text-white" : "text-gray-500 hover:text-white"}`}
              style={resFilter === r ? { background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.5)" } : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-500 text-sm self-center">Genre:</span>
          {["All",...CATEGORIES.filter(c=>c!=="All")].map(g => (
            <button key={g} type="button" onClick={() => setGenreFilter(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${genreFilter === g ? "text-white" : "text-gray-500 hover:text-white"}`}
              style={genreFilter === g ? { background: "rgba(6,182,212,0.2)", border: "1px solid rgba(6,182,212,0.4)" } : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-6">{results.length} result{results.length !== 1 ? "s" : ""} {localQ ? `for "${localQ}"` : ""}</p>
      {results.length === 0 ? (
        <div className="text-center py-24 text-gray-600">No wallpapers match your search. Try a different term.</div>
      ) : (
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {results.map(w => <WallpaperCard key={w.id} w={w} onPreview={onPreview} onNavigate={ww => { setDetailWall(ww); setPage("detail"); }} />)}
        </div>
      )}
    </div>
  );
}

function CategoryPage({ genre, onPreview, setPage, setDetailWall }) {
  const [sort, setSort] = useState("trending");
  const wallpapers = useMemo(() => {
    let list = WALLPAPERS.filter(w => w.genre === genre);
    if (sort === "newest") list = [...list].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    if (sort === "downloads") list = [...list].sort((a, b) => b.downloads - a.downloads);
    if (sort === "trending") list = [...list].sort((a, b) => b.trending - a.trending);
    if (sort === "4k") list = list.filter(w => w.resolutions.includes("4K") || w.resolutions.includes("8K"));
    return list;
  }, [genre, sort]);
  return (
    <div className="pt-24 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <button type="button" onClick={() => setPage("home")} className="text-gray-500 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">← All Categories</button>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white font-black text-4xl">{genre}</h1>
            <p className="text-gray-500 mt-1">{wallpapers.length} wallpapers in this category</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[ ["trending","🔥 Trending"],["newest","⏰ Newest"],["downloads","↓ Most Downloaded"],["4k","🔷 4K+"] ].map(([s,l]) => (
              <button key={s} type="button" onClick={() => setSort(s)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${sort === s ? "text-white" : "text-gray-400 hover:text-white"}`}
                style={sort === s ? { background: "linear-gradient(135deg,#7C3AED,#06B6D4)" } : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      {wallpapers.length === 0 ? (
        <div className="text-center py-24 text-gray-600">No wallpapers found in this category yet. Check back soon!</div>
      ) : (
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {wallpapers.map(w => <WallpaperCard key={w.id} w={w} onPreview={onPreview} onNavigate={ww => { setDetailWall(ww); setPage("detail"); }} />)}
        </div>
      )}
    </div>
  );
}

function PremiumPage() {
  const features = {
    free: ["HD & 4K Downloads","All Game Categories","No Account Needed","New Wallpapers Weekly"],
    pro: ["Everything in Free","8K Ultra Downloads","Zero Ads, Ever","Early Access (48h before public)","Exclusive Artist Packs","Request a Wallpaper","Discord Pro Role","Priority Support"]
  };
  return (
    <div className="pt-24 max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border" style={{ background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.3)", color: "#fbbf24" }}>
          ⚡ VersaceHub Pro
        </div>
        <h1 className="text-white font-black text-5xl mb-4" style={{ letterSpacing: "-0.03em" }}>Level Up Your<br /><span style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wallpaper Game</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Get 8K downloads, zero ads, exclusive packs, and the ability to request custom wallpapers — all for less than a cup of coffee.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
        <div className="rounded-2xl p-7" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-gray-400 font-bold mb-1 uppercase text-xs tracking-wider">Free</p>
          <p className="text-white font-black text-4xl mb-1">$0<span className="text-gray-500 font-normal text-base">/mo</span></p>
          <p className="text-gray-500 text-sm mb-6">Always free, no card needed</p>
          <ul className="space-y-3 mb-8">
            {features.free.map(f => <li key={f} className="text-gray-300 text-sm flex items-center gap-2"><span className="text-green-400">✓</span>{f}</li>)}
          </ul>
          <button type="button" className="w-full py-3 rounded-xl font-bold text-gray-400 border border-white/10 hover:bg-white/5 transition-colors">Current Plan</button>
        </div>
        <div className="rounded-2xl p-7 relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.4)" }}>
          <div className="absolute top-4 right-4 text-[10px] font-black tracking-widest px-2 py-1 rounded bg-amber-500 text-black">BEST VALUE</div>
          <p className="text-purple-300 font-bold mb-1 uppercase text-xs tracking-wider">Pro</p>
          <p className="text-white font-black text-4xl mb-1">$4.99<span className="text-gray-400 font-normal text-base">/mo</span></p>
          <p className="text-gray-400 text-sm mb-6">or $39.99/year (save 33%)</p>
          <ul className="space-y-3 mb-8">
            {features.pro.map(f => <li key={f} className="text-white text-sm flex items-center gap-2"><span className="text-cyan-400">✦</span>{f}</li>)}
          </ul>
          <button type="button" className="w-full py-3 rounded-xl font-black text-white transition-transform hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}>
            ⚡ Upgrade to Pro — $4.99/mo
          </button>
          <p className="text-center text-gray-500 text-xs mt-3">Secure checkout via Stripe · Cancel anytime</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-white font-black text-2xl mb-6 text-center">Frequently Asked Questions</h2>
        {[["Can I cancel anytime?","Yes, cancel from your account settings at any time. No questions asked."],["Are the free wallpapers actually free?","100%. No login, no ads, no catch. HD and 4K are free forever."],["What makes Pro 8K different?","8K files are massive (~50MB+) and require significant bandwidth to host. Pro helps us keep the servers running."],["Do you take wallpaper requests?","Pro members can submit requests via the Pro dashboard. We try to fulfill within 2 weeks."]].map(([q,a]) => (
          <div key={q} className="mb-4 rounded-xl p-4" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-white font-bold text-sm mb-1">{q}</p>
            <p className="text-gray-500 text-sm">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage({ setPage }) {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="text-white font-black text-5xl mb-5" style={{ letterSpacing: "-0.03em" }}>Built by a Gamer,<br /><span style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>For Gamers</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          VersaceHub was born from one simple frustration: why are the best gaming wallpapers stuck behind paywalls, full of watermarks, or impossible to find at the right resolution?
        </p>
      </div>
      <div className="rounded-2xl p-8 mb-10" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <h2 className="text-white font-black text-2xl mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed text-base">
          Every gamer deserves a desktop that looks as epic as the games they play. VersaceHub is committed to being the world's best free source for ultra-high-definition gaming wallpapers — curated, organized, and always free to download in every resolution from 1080p to 8K. No signups. No watermarks. No bullshit.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5 mb-16">
        {[ ["🎮","Free Forever","The core gallery will always be free. We believe great art should be accessible to everyone, regardless of budget."],["🖼️","Quality First","We curate every single wallpaper. No AI upscales, no blurry garbage — only crisp, cinematic, resolution-native art."],["🌐","Community Built","VersaceHub thrives on community submissions. Every artist credited. Every download counted. Every gamer appreciated."] ].map(([e,t,d]) => (
          <div key={t} className="rounded-2xl p-6" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-3xl mb-3">{e}</div>
            <h3 className="text-white font-black mb-2">{t}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 mb-16" style={{ background: "#111827", border: "1px solid rgba(124,58,237,0.25)" }}>
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black" style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}>
            R
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-black text-2xl">Rony</p>
          <p className="text-purple-400 font-bold text-sm mb-2">s7xversace · Founder & Creator</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Gamer since age 7. Designer since age 16. I built VersaceHub because I wanted one place on the internet that takes gaming wallpapers seriously. If you enjoy the site, the only thing I ask is: share it with a friend who games.
          </p>
          <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">🐦 Twitter</a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">💬 Discord</a>
            <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors text-sm">🟠 Reddit</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {[ ["12+","Wallpapers"],["100K+","Downloads"],["6","Game Genres"],["Free","Always"] ].map(([n,l]) => (
          <div key={l} className="text-center rounded-xl py-6" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="font-black text-3xl" style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</p>
            <p className="text-gray-500 text-sm mt-1">{l}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button type="button" onClick={() => setPage("home")} className="px-8 py-4 rounded-xl font-black text-white" style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}>
          Browse Wallpapers →
        </button>
      </div>
    </div>
  );
}

export default function VersaceHub() {
  const [page, setPage] = useState("home");
  const [lightboxWall, setLightboxWall] = useState(null);
  const [detailWall, setDetailWall] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [catGenre, setCatGenre] = useState("FPS");

  const navigate = useCallback((p) => {
    if (p.startsWith("cat-")) {
      setCatGenre(p.replace("cat-", ""));
      setPage("category");
    } else {
      setPage(p);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const setPageWrapped = useCallback((p) => {
    navigate(p);
  }, [navigate]);

  const handleSetDetailAndNav = useCallback((w) => {
    setDetailWall(w);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{ background: "#030712", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 999px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Header
        page={page}
        setPage={setPageWrapped}
        searchQuery={searchQuery}
        setSearchQuery={(q) => { setSearchQuery(q); if (q) setPage("search"); }}
      />

      <main>
        {page === "home" && (
          <HomePageContent
            setPage={setPageWrapped}
            onPreview={setLightboxWall}
            setDetailWall={handleSetDetailAndNav}
          />
        )}
        {page === "detail" && (
          <DetailPage
            wall={detailWall}
            onPreview={setLightboxWall}
            setPage={setPageWrapped}
            setDetailWall={handleSetDetailAndNav}
          />
        )}
        {page === "search" && (
          <SearchPage
            query={searchQuery}
            onPreview={setLightboxWall}
            setPage={setPageWrapped}
            setDetailWall={handleSetDetailAndNav}
          />
        )}
        {page === "category" && (
          <CategoryPage
            genre={catGenre}
            onPreview={setLightboxWall}
            setPage={setPageWrapped}
            setDetailWall={handleSetDetailAndNav}
          />
        )}
        {page === "premium" && <PremiumPage />}
        {page === "about" && <AboutPage setPage={setPageWrapped} />}
      </main>

      <Footer setPage={setPageWrapped} />

      {lightboxWall && <Lightbox wall={lightboxWall} onClose={() => setLightboxWall(null)} />}
    </div>
  );
}
