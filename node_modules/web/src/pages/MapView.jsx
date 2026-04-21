import React from 'react';

const MapView = () => {
  return (
    <div className="bg-surface text-on-surface font-body overflow-hidden h-screen flex w-full">
      <main className="flex-1 ml-64 relative flex flex-col w-[calc(100%-16rem)]">
        <header className="flex items-center justify-between px-8 py-3 w-full sticky top-0 z-30 bg-[#0b1326]/60 backdrop-blur-md h-16 shadow-none border-b border-white/5">
          <div className="flex items-center w-96">
            <div className="relative w-full focus-within:ring-1 focus-within:ring-[#7C3AED]/50 rounded-lg">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full bg-surface-container-lowest text-on-surface border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-0 focus:outline-none placeholder-slate-500 font-body" placeholder="Search coordinates or entities..." type="text"/>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white hover:bg-white/5 rounded-lg p-2 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-slate-400 hover:text-white hover:bg-white/5 rounded-lg p-2 transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <img alt="Administrator Profile" className="w-8 h-8 rounded-full ml-2 border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqWy1mpP8toj_v8e07qYePkCFh1hzAKpU5DG4mvBVEgbHgO47_yUQb4bwnBRfHmyPDvug_rASqcNp86DG4KodC23mA1yjpgWgCcMyS1HYVJFemb3tsBMz25qUS-JMqC8Pi52-eT1a8LrHbu-g1ilA8kOPfYJMH0XR3NOxZV6CaWz5IVgeEaJ4hq6SFnk2nHA7vVPe4lkZCupYx2u0CszgqDMeeoPBJn8wOE3mxvib8SkGWdebp-LSGVA9zlochnYVjIZ9JOV6ln1eY"/>
          </div>
        </header>

        {/* Map Container */}
        <div className="flex-1 relative bg-surface-dim overflow-hidden">
          <div className="absolute inset-0 map-bg"></div>
          <div className="absolute inset-0 map-overlay"></div>

          {/* Map HUD Elements */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
            <div className="glass-panel rounded-lg p-2 flex flex-col gap-2">
              <button className="p-2 bg-primary-container/20 text-primary rounded-md hover:bg-primary-container/40 transition-colors tooltip-trigger relative group">
                <span className="material-symbols-outlined">layers</span>
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 glass-panel px-3 py-1 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity">Base Layers</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-white/5 rounded-md transition-colors relative group">
                <span className="material-symbols-outlined">radar</span>
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 glass-panel px-3 py-1 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity">Zoning Radar</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-white/5 rounded-md transition-colors relative group">
                <span className="material-symbols-outlined">horizontal_rule</span>
              </button>
            </div>
            <div className="glass-panel rounded-lg p-2 mt-4 flex flex-col gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-white/5 rounded-md transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-white/5 rounded-md transition-colors">
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>
          </div>

          <div className="absolute top-6 left-6 bottom-6 w-80 z-20 flex flex-col gap-6">
            <div className="glass-panel rounded-xl h-full flex flex-col overflow-hidden">
              <div className="p-5 border-b border-outline-variant/20">
                <h2 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">filter_alt</span>
                  Audit Parameters
                </h2>
              </div>
              <div className="p-5 flex-1 overflow-y-auto space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Districts</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input defaultChecked className="form-checkbox bg-surface-container-lowest border-outline-variant rounded text-primary focus:ring-primary focus:ring-offset-surface" type="checkbox"/>
                      <span className="text-sm">Kebayoran Baru</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input defaultChecked className="form-checkbox bg-surface-container-lowest border-outline-variant rounded text-primary focus:ring-primary focus:ring-offset-surface" type="checkbox"/>
                      <span className="text-sm">Mampang Prapatan</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input className="form-checkbox bg-surface-container-lowest border-outline-variant rounded text-primary focus:ring-primary focus:ring-offset-surface" type="checkbox"/>
                      <span className="text-sm">Cilandak</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Entity Types</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-full hover:border-primary/50 transition-colors flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pasar
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-primary-container/20 border border-primary/50 text-primary rounded-full hover:border-primary transition-colors flex items-center gap-1 glow-active">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span> Minimarket
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-full hover:border-primary/50 transition-colors">
                      Supermarket
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Violation Status</label>
                  <div className="bg-surface-container-lowest rounded-lg p-1 flex">
                    <button className="flex-1 py-1.5 text-xs text-center rounded-md bg-transparent text-slate-400 hover:text-white">All</button>
                    <button className="flex-1 py-1.5 text-xs text-center rounded-md bg-surface-variant text-white shadow-sm border border-outline-variant/20">Flagged</button>
                    <button className="flex-1 py-1.5 text-xs text-center rounded-md bg-transparent text-slate-400 hover:text-white">Compliant</button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between">
                    <span>Buffer Zone Radius</span>
                    <span className="font-numbers text-primary">500m</span>
                  </label>
                  <input className="w-full h-1 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary" max="1000" min="100" type="range" defaultValue="500"/>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary/40 bg-primary/5 pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative w-8 h-8 bg-surface-container-highest rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] z-10">
              <span className="material-symbols-outlined text-emerald-500 text-sm">storefront</span>
            </div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-panel px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Pasar Santa
            </div>
          </div>

          <div className="absolute top-[30%] left-[45%] z-10 group cursor-pointer">
            <div className="relative w-6 h-6 bg-error-container rounded-full border-2 border-error flex items-center justify-center shadow-[0_0_15px_rgba(255,180,171,0.5)] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.3 }}>
            <line stroke="#ffb4ab" strokeDasharray="4" strokeWidth="1" x1="50%" x2="45%" y1="33%" y2="30%"></line>
            <text fill="#ffb4ab" fontFamily="Outfit" fontSize="10" x="47%" y="31%">320m</text>
          </svg>

          <div className="absolute top-[40%] left-[53%] z-10 group cursor-pointer">
            <div className="relative w-6 h-6 bg-error-container rounded-full border-2 border-error flex items-center justify-center shadow-[0_0_15px_rgba(255,180,171,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 left-96 ml-12 z-20">
            <div className="glass-panel rounded-xl p-6 flex items-start gap-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-error-container text-error">Priority Audit</span>
                  <span className="text-xs text-slate-400 font-numbers">ID: #MZ-9921-X</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-white mb-1">Indomaret Jl. Senopati</h3>
                <p className="text-sm text-slate-400 mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  Kebayoran Baru, Jakarta Selatan
                </p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Distance to Pasar</p>
                    <p className="font-numbers text-xl text-error font-semibold">320m <span className="text-xs text-slate-400 font-body font-normal">(&lt; 500m Limit)</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Permit Status</p>
                    <p className="text-sm text-white font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-tertiary text-[16px]">warning</span>
                      Under Review
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-48 bg-surface-container-lowest/50 rounded-lg p-4 border border-outline-variant/20 flex flex-col items-center justify-center text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">AI Compliance Score</p>
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2d3449" strokeWidth="3"></path>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ffb4ab" strokeDasharray="24, 100" strokeWidth="3"></path>
                  </svg>
                  <span className="absolute font-numbers text-lg font-bold text-error">24</span>
                </div>
                <button className="w-full py-1.5 bg-surface-variant hover:bg-surface-bright text-xs font-medium rounded transition-colors text-white border border-outline-variant/30">
                  View Full Dossier
                </button>
              </div>
              <button className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-[340px] z-10 glass-panel px-3 py-1.5 rounded text-[10px] font-numbers text-slate-400 flex items-center gap-4">
            <span>LAT: -6.2345°</span>
            <span>LNG: 106.8123°</span>
            <span className="text-primary">ZOOM: 16z</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;
