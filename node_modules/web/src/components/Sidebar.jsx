import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const baseLinkClass = "flex items-center gap-3 px-6 py-4 transition-all duration-300 scale-95 duration-150 ease-in-out ";
  const inactiveLinkClass = baseLinkClass + "text-slate-400 hover:bg-white/5 hover:text-white";
  const activeLinkClass = baseLinkClass + "text-[#7C3AED] bg-gradient-to-r from-[#7C3AED]/10 to-transparent border-r-4 border-[#7C3AED]";

  return (
    <nav className="flex flex-col h-full fixed left-0 top-0 z-40 bg-[#171f33] dark:bg-[#171f33] w-64 border-r border-white/5 shadow-[10px_0_30px_rgba(0,0,0,0.3)]">
      {/* Brand/Header */}
      <div className="px-6 py-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <span className="material-symbols-outlined text-white text-xl">satellite_alt</span>
          </div>
          <span className="font-headline text-2xl font-black tracking-tighter text-white uppercase">Zonify</span>
        </div>
        <span className="text-xs text-on-surface-variant tracking-wider uppercase pl-11">Jakarta Selatan</span>
      </div>
      
      {/* Navigation Links */}
      <div className="flex flex-col mt-4 flex-1">
        <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} end>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium text-sm">Dashboard</span>
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
          <span className="material-symbols-outlined">map</span>
          <span className="font-medium text-sm">Map</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-medium text-sm">Analytics</span>
        </NavLink>
        <NavLink to="/rankings" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-medium text-sm">Rankings</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
          <span className="material-symbols-outlined">settings</span>
          <span className="font-medium text-sm">Settings</span>
        </NavLink>
      </div>
      
      {/* CTA */}
      <div className="p-6 mt-auto">
        <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-container to-[#5a00c6] text-white font-bold text-xs tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          New Audit
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
