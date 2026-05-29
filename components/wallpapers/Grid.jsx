export default function Grid({ children }) {
  return <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>{children}</div>;
}
