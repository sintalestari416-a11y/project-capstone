import React from 'react';
import Header from '../components/Header';

const Analytics = () => {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen antialiased overflow-x-hidden">
      <Header />
      <main className="ml-64 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-white mb-1">Analytics Intelligence</h2>
            <p className="text-sm text-on-surface-variant max-w-xl">Deep geospatial analysis of saturation levels and violation frequencies across monitored districts.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-on-surface-variant font-medium">Timeframe:</span>
            <button className="glass-panel px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/5 transition-colors">
              Last 30 Days
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>
        </div>
        
        {/* KPI Summary Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container rounded-lg border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Total Audits</p>
            <p className="font-number text-3xl font-bold text-white">1,248</p>
          </div>

          <div className="glass-panel p-6 rounded-xl relative overflow-hidden group glow-danger border-error-container/40">
            <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-error-container/30 rounded-lg border border-error/20">
                <span className="material-symbols-outlined text-error text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <span className="text-xs font-medium text-error bg-error/10 px-2 py-1 rounded-full">+4%</span>
            </div>
            <p className="text-xs text-error font-medium uppercase tracking-wider mb-1">Over-Saturated Zones</p>
            <p className="font-number text-3xl font-bold text-white">34</p>
          </div>

          <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-tertiary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-tertiary-container/30 rounded-lg border border-tertiary/20">
                <span className="material-symbols-outlined text-tertiary text-[20px]">policy</span>
              </div>
              <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">-2%</span>
            </div>
            <p className="text-xs text-tertiary font-medium uppercase tracking-wider mb-1">Active Violations</p>
            <p className="font-number text-3xl font-bold text-white">182</p>
          </div>

          <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-success/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-success/10 rounded-lg border border-success/20">
                <span className="material-symbols-outlined text-success text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">+1.5%</span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Avg Compliance</p>
            <p className="font-number text-3xl font-bold text-white">89.4<span className="text-lg text-on-surface-variant/70">%</span></p>
          </div>
        </div>

        {/* Charts Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="glass-panel p-6 rounded-xl h-[340px] flex flex-col relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-lg font-bold">Over-Saturation Score by District</h3>
                <button className="text-on-surface-variant hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex-1 flex items-end gap-3 px-2">
                <div className="flex flex-col justify-between h-full text-xs font-number text-on-surface-variant/50 pb-6 pr-4 border-r border-outline-variant/20">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                <div className="flex-1 flex justify-between items-end h-[85%] pb-1">
                  <div className="w-10 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[60%] relative group transition-all">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-xs font-number opacity-0 group-hover:opacity-100 transition-opacity">60</div>
                  </div>
                  <div className="w-10 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[45%] relative group transition-all"></div>
                  <div className="w-10 bg-error/60 glow-danger rounded-t-sm h-[92%] relative group transition-all">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-xs font-number text-error border border-error/20 opacity-0 group-hover:opacity-100 transition-opacity">92</div>
                  </div>
                  <div className="w-10 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[30%] relative group transition-all"></div>
                  <div className="w-10 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[75%] relative group transition-all"></div>
                  <div className="w-10 bg-tertiary/50 rounded-t-sm h-[82%] relative group transition-all"></div>
                  <div className="w-10 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[50%] relative group transition-all"></div>
                </div>
              </div>
              <div className="flex justify-between pl-12 pr-4 mt-3 text-[10px] text-on-surface-variant/70 uppercase font-medium">
                <span>Kby. Baru</span>
                <span>Cilandak</span>
                <span>Tebet</span>
                <span>Pancoran</span>
                <span>Mg. Dua</span>
                <span>Jagakarsa</span>
                <span>Ps. Minggu</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl h-[280px] flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(124,58,237,0.3) 0%, transparent 60%)' }}></div>
              <div className="flex justify-between items-center mb-6 z-10">
                <h3 className="font-headline text-lg font-bold">Violation Trend Line</h3>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Commercial</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tertiary"></div> Residential</div>
                </div>
              </div>
              <div className="flex-1 relative z-10 border-l border-b border-outline-variant/20 ml-6 mb-4">
                <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="border-t border-outline-variant/10 w-full"></div>
                  <div className="border-t border-outline-variant/10 w-full"></div>
                  <div className="border-t border-outline-variant/10 w-full"></div>
                  <div className="border-t border-outline-variant/10 w-full"></div>
                </div>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q20,60 40,70 T80,40 T100,20" fill="none" stroke="#7C3AED" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                  <path d="M0,80 Q20,60 40,70 T80,40 T100,20 L100,100 L0,100 Z" fill="url(#grad1)" opacity="0.2"></path>
                  <defs>
                    <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="1"></stop>
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,90 Q30,85 50,60 T90,50 T100,70" fill="none" stroke="#ffb784" strokeDasharray="4" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
              <div className="flex justify-between pl-6 text-[10px] text-on-surface-variant/50">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl flex flex-col relative">
            <h3 className="font-headline text-lg font-bold mb-8">District Comparison</h3>
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative w-64 h-64">
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                  <polygon fill="none" points="50,10 90,38 75,85 25,85 10,38" stroke="#958da1" strokeWidth="0.5"></polygon>
                  <polygon fill="none" points="50,25 75,43 65,75 35,75 25,43" stroke="#958da1" strokeWidth="0.5"></polygon>
                  <polygon fill="none" points="50,40 60,50 55,65 45,65 40,50" stroke="#958da1" strokeWidth="0.5"></polygon>
                  <line stroke="#958da1" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="10"></line>
                  <line stroke="#958da1" strokeWidth="0.5" x1="50" x2="90" y1="50" y2="38"></line>
                  <line stroke="#958da1" strokeWidth="0.5" x1="50" x2="75" y1="50" y2="85"></line>
                  <line stroke="#958da1" strokeWidth="0.5" x1="50" x2="25" y1="50" y2="85"></line>
                  <line stroke="#958da1" strokeWidth="0.5" x1="50" x2="10" y1="50" y2="38"></line>
                  <polygon fill="rgba(124, 58, 237, 0.4)" points="50,20 70,40 60,75 35,65 20,40" stroke="#7C3AED" strokeWidth="1.5" style={{ backdropFilter: 'blur(4px)' }}></polygon>
                  <polygon fill="none" points="50,30 80,45 50,80 30,70 15,45" stroke="#ffb784" strokeDasharray="2" strokeWidth="1.5"></polygon>
                </svg>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-variant uppercase font-medium">Density</span>
                <span className="absolute top-8 -right-8 text-[10px] text-on-surface-variant uppercase font-medium">Permits</span>
                <span className="absolute bottom-4 -right-6 text-[10px] text-on-surface-variant uppercase font-medium">Complaints</span>
                <span className="absolute bottom-4 -left-6 text-[10px] text-on-surface-variant uppercase font-medium">Violations</span>
                <span className="absolute top-8 -left-8 text-[10px] text-on-surface-variant uppercase font-medium">Zoning Area</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary"></div>
                  <span>Tebet</span>
                </div>
                <span className="font-number">Idx: 74.2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border border-tertiary bg-transparent"></div>
                  <span>Cilandak</span>
                </div>
                <span className="font-number">Idx: 62.8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="glass-panel p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline text-lg font-bold">District Ranking Matrix</h3>
            <button className="flex items-center gap-2 text-sm text-primary hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant/20">
                  <th className="pb-3 px-4 font-medium">Rank</th>
                  <th className="pb-3 px-4 font-medium">District</th>
                  <th className="pb-3 px-4 font-medium text-right">Violation Count</th>
                  <th className="pb-3 px-4 font-medium text-right">Saturation %</th>
                  <th className="pb-3 px-4 font-medium text-center">Status Flag</th>
                  <th className="pb-3 px-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 font-number text-white">01</td>
                  <td className="py-4 px-4 font-medium text-white">Tebet</td>
                  <td className="py-4 px-4 font-number text-right">84</td>
                  <td className="py-4 px-4 font-number text-right text-error">92.4%</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded bg-error-container text-on-error text-xs font-bold uppercase tracking-wider animate-pulse">Critical</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-on-surface-variant group-hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 font-number text-on-surface-variant">02</td>
                  <td className="py-4 px-4 font-medium text-white">Kebayoran Baru</td>
                  <td className="py-4 px-4 font-number text-right">56</td>
                  <td className="py-4 px-4 font-number text-right text-tertiary">82.1%</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded bg-tertiary-container/30 border border-tertiary/30 text-tertiary text-xs font-bold uppercase tracking-wider">Warning</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-on-surface-variant group-hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 font-number text-on-surface-variant">03</td>
                  <td className="py-4 px-4 font-medium text-white">Cilandak</td>
                  <td className="py-4 px-4 font-number text-right">31</td>
                  <td className="py-4 px-4 font-number text-right">64.5%</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant text-xs font-bold uppercase tracking-wider">Elevated</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-on-surface-variant group-hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 font-number text-on-surface-variant">04</td>
                  <td className="py-4 px-4 font-medium text-white">Pasar Minggu</td>
                  <td className="py-4 px-4 font-number text-right">12</td>
                  <td className="py-4 px-4 font-number text-right text-success">41.2%</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded bg-success/10 text-success text-xs font-bold uppercase tracking-wider">Stable</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-on-surface-variant group-hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
