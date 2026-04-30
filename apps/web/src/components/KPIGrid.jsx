import React from 'react';
import { useStats } from "../hooks/useStats";

const KPIGrid = () => {
  const stats = useStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

      {/* 🟡 TOTAL PASAR */}
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-primary/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Total Pasar Tradisional</span>
          <span className="material-symbols-outlined text-primary/70">storefront</span>
        </div>
        <div className="font-number text-4xl font-bold text-on-surface">
          {/* kalau nanti mau real → tinggal bikin stats.pasar */}
          142
        </div>
        <div className="mt-2 text-xs text-tertiary flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">trending_down</span>
          -2% from last quarter
        </div>
      </div>

      {/* 🔵 TOTAL MINIMARKET */}
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-primary/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Total Minimarket</span>
          <span className="material-symbols-outlined text-primary/70">local_convenience_store</span>
        </div>
        <div className="font-number text-4xl font-bold text-on-surface">
          {stats.total}
        </div>
        <div className="mt-2 text-xs text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">trending_up</span>
          Data real-time
        </div>
      </div>

      {/* 🔴 VIOLATIONS */}
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-error/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-error/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Violations detected</span>
          <span className="material-symbols-outlined text-error/70">warning</span>
        </div>
        <div className="font-number text-4xl font-bold text-error">
          {stats.violations}
        </div>
        <div className="mt-2 text-xs text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">priority_high</span>
          Critical based on distance
        </div>
      </div>

      {/* 🟣 COMPLIANCE RATE */}
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-tertiary/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-tertiary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Compliance Rate</span>
          <span className="material-symbols-outlined text-tertiary/70">verified</span>
        </div>
        <div className="font-number text-4xl font-bold text-tertiary">
          {stats.compliance}%
        </div>
        <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1">
          Safe locations ratio
        </div>
      </div>

      {/* 🟢 SAFE LOCATIONS */}
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 relative overflow-hidden group hover:outline-green-500/30 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-green-500/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-on-surface-variant font-medium">Safe Locations</span>
          <span className="material-symbols-outlined text-green-400">verified</span>
        </div>

        <div className="font-number text-4xl font-bold text-green-500">
          {stats.safe}
        </div>

        <div className="mt-2 text-xs text-on-surface-variant">
          Locations with no violation
        </div>
      </div>

    </div>
  );
};

export default KPIGrid;