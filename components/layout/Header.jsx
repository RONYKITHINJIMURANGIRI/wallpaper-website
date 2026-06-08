export default function Header({ page }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#030712]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <div className="font-black text-white tracking-tight text-lg">VersaceHub</div>
        <nav className="hidden md:flex gap-3 text-sm text-gray-300">
          <a href="/" className={page === 'home' ? 'text-white' : ''}>Home</a>
          <a href="/search" className={page === 'search' ? 'text-white' : ''}>Search</a>
          <a href="/premium" className={page === 'premium' ? 'text-white' : ''}>Premium</a>
          <a href="/about" className={page === 'about' ? 'text-white' : ''}>About</a>
          <a href="/signup" className={page === 'signup' ? 'text-white' : 'text-cyan-200 hover:text-white'}>Sign Up</a>
        </nav>
      </div>
    </header>
  );
}
