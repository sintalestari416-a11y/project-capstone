import React from 'react';

const ViolationsTable = () => {
  return (
    <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
        <h2 className="font-headline font-bold text-lg">Recent Violations</h2>
        <button className="text-xs text-primary hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-md outline outline-1 outline-outline-variant/30">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-on-surface-variant uppercase tracking-wider bg-surface-container-lowest/50">
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Entity Name</th>
              <th className="px-6 py-4 font-medium">District</th>
              <th className="px-6 py-4 font-medium">Proximity Rule</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-outline-variant/10">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-number text-on-surface-variant">#V-8821</td>
              <td className="px-6 py-4 font-medium text-on-surface">Indomaret Point</td>
              <td className="px-6 py-4 text-on-surface-variant">Cilandak</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  <span className="font-number">&lt; 400m from Pasar</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-error-container text-error outline outline-1 outline-error/20">Critical</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-number text-on-surface-variant">#V-8820</td>
              <td className="px-6 py-4 font-medium text-on-surface">Alfamart Express</td>
              <td className="px-6 py-4 text-on-surface-variant">Tebet</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  <span className="font-number">&lt; 400m from Pasar</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-error-container text-error outline outline-1 outline-error/20">Critical</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-number text-on-surface-variant">#V-8819</td>
              <td className="px-6 py-4 font-medium text-on-surface">Lawson</td>
              <td className="px-6 py-4 text-on-surface-variant">Kebayoran Baru</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  <span className="font-number">&lt; 100m from Minimarket</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-tertiary-container/30 text-tertiary outline outline-1 outline-tertiary/20">Warning</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-number text-on-surface-variant">#V-8818</td>
              <td className="px-6 py-4 font-medium text-on-surface">FamilyMart</td>
              <td className="px-6 py-4 text-on-surface-variant">Setiabudi</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  <span className="font-number">Zone Capacity Exceeded</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-tertiary-container/30 text-tertiary outline outline-1 outline-tertiary/20">Warning</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-number text-on-surface-variant">#V-8817</td>
              <td className="px-6 py-4 font-medium text-on-surface">Circle K</td>
              <td className="px-6 py-4 text-on-surface-variant">Pancoran</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span className="font-number">Resolved Post-Audit</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-secondary-container text-on-surface outline outline-1 outline-outline-variant/30">Resolved</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViolationsTable;
