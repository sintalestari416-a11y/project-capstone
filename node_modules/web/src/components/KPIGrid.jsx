import React from 'react';

const KPIGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-primary/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Total Pasar Tradisional</span>
          <span className="material-symbols-outlined text-primary/70">storefront</span>
        </div>
        <div className="font-number text-4xl font-bold text-on-surface">142</div>
        <div className="mt-2 text-xs text-tertiary flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">trending_down</span>
          -2% from last quarter
        </div>
      </div>
      
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-primary/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Total Minimarket</span>
          <span className="material-symbols-outlined text-primary/70">local_convenience_store</span>
        </div>
        <div className="font-number text-4xl font-bold text-on-surface">876</div>
        <div className="mt-2 text-xs text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">trending_up</span>
          +12% from last quarter
        </div>
      </div>
      
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-error/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-error/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Violations detected</span>
          <span className="material-symbols-outlined text-error/70">warning</span>
        </div>
        <div className="font-number text-4xl font-bold text-error">47</div>
        <div className="mt-2 text-xs text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">priority_high</span>
          Critical action required
        </div>
      </div>
      
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-tertiary/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-tertiary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Over-saturated Zones</span>
          <span className="material-symbols-outlined text-tertiary/70">layers</span>
        </div>
        <div className="font-number text-4xl font-bold text-tertiary">12</div>
        <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1">
          Across 5 districts
        </div>
      </div>
    </div>
  );
};

export default KPIGrid;
