export default function Lightbox({ wall, onClose }) {
  if (!wall) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <div className="max-w-4xl w-full rounded-3xl overflow-hidden bg-[#0b1220]" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-2xl font-black text-white mb-3">{wall.title}</h2>
          <p className="text-gray-400">{wall.game}</p>
        </div>
      </div>
    </div>
  );
}
