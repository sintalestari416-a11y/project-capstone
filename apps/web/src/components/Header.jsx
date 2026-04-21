import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-3 ml-64 w-[calc(100%-16rem)] sticky top-0 z-30 bg-[#0b1326]/60 backdrop-blur-md h-16 border-b border-white/5 shadow-none">
      {/* Search Bar */}
      <div className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg outline outline-1 outline-outline-variant/30 focus-within:outline-primary/50 focus-within:shadow-[0_4px_20px_rgba(124,58,237,0.15)] transition-all duration-300 w-96">
        <span className="material-symbols-outlined text-on-surface-variant mr-3 text-sm">search</span>
        <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full placeholder:text-on-surface-variant/50" placeholder="Search coordinates, districts..." type="text" />
      </div>
      
      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(210,187,255,0.8)]"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>
        <button className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-lg transition-colors">
          <img alt="Administrator Profile" className="w-8 h-8 rounded-md object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Gdn6nE9_qIpBPyYGtSBMGuPjCu9gJOkYt59GaV4Gqy9ToDFNxxDKowdTvYBo8T85Ke-EoyojlScLsM-e8JXvf9-68s6IG6CTSzGWU6JWDseHcW0QyTPLFX1M7aO8_-kGpV8bAeGlkGcsk7zh406hBjSx_e0m4APEo5hCyuh4JRmbegvDIUYH7tX2fel54LFtIy1dDiPyyQzbdLxJx8L2X7XRo9dbXJzVYxbDuPa6UHKbVpc-AuC-wr_sS2yDHi7OBns-0soOPfpj" />
          <span className="text-sm font-medium">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
