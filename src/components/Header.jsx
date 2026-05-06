export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-violet-900 to-fuchsia-800 py-6 px-10 shadow-lg mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200 tracking-tight">
            CRUD App
          </h1>
        </div>
        <nav className="hidden md:flex gap-6 text-white/90 font-medium">
          <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-pink-300 pb-1">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-pink-300 pb-1">Contacts</a>
          <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-pink-300 pb-1">Settings</a>
        </nav>
        <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all backdrop-blur-sm shadow-md hover:shadow-lg">
          Get Started
        </button>
      </div>
    </header>
  );
}