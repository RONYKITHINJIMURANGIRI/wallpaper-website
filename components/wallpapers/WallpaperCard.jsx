export default function WallpaperCard({ wallpaper }) {
  return (
    <div className="rounded-3xl overflow-hidden bg-[#111827] shadow-xl shadow-black/20">
      <div className="h-56 bg-gray-800" />
      <div className="p-4">
        <h3 className="text-white font-bold text-lg">{wallpaper?.title || 'Wallpaper Title'}</h3>
        <p className="text-gray-400 text-sm mt-1">{wallpaper?.game || 'Game Name'}</p>
      </div>
    </div>
  );
}
