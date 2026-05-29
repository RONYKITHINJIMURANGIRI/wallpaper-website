export default function AdSlot({ label = 'Advertisement' }) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 py-8 text-center text-gray-400 text-sm">
      {label}
    </div>
  );
}
