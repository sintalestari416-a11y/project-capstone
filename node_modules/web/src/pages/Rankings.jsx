import React from 'react';
import Header from '../components/Header';

const Rankings = () => {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen antialiased">
      <Header />
      <main className="ml-64 p-8 flex flex-col xl:flex-row gap-8 items-start relative z-10">
        <section className="flex-1 flex flex-col gap-6 w-full xl:max-w-[calc(100%-26rem)]">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline text-3xl font-bold text-white tracking-tight">District Saturation</h2>
              <p className="text-sm text-on-surface-variant mt-1">Real-time ranking based on commercial zoning violations.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-medium border border-outline-variant/20 transition-all">
                <span className="material-symbols-outlined text-sm">download</span>
                CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-medium border border-outline-variant/20 transition-all">
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                PDF Report
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-xl overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant/20">
                  <th className="py-4 px-6 font-headline text-xs text-on-surface-variant uppercase tracking-widest w-16">Pos</th>
                  <th className="py-4 px-6 font-headline text-xs text-on-surface-variant uppercase tracking-widest">District Name</th>
                  <th className="py-4 px-6 font-headline text-xs text-on-surface-variant uppercase tracking-widest text-right">Violations</th>
                  <th className="py-4 px-6 font-headline text-xs text-on-surface-variant uppercase tracking-widest text-right">Saturation %</th>
                  <th className="py-4 px-6 font-headline text-xs text-on-surface-variant uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                <tr className="bg-surface-container-highest/40 hover:bg-surface-container-highest/60 transition-colors cursor-pointer relative">
                  <td className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></td>
                  <td className="py-4 px-6 font-mono text-primary font-medium">01</td>
                  <td className="py-4 px-6 font-medium text-white">Tebet</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">1,245</td>
                  <td className="py-4 px-6 font-mono text-right text-error">92.4%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-error-container/30 text-error text-xs font-bold uppercase tracking-wider border border-error/20">
                      Critical
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono text-on-surface-variant">02</td>
                  <td className="py-4 px-6 font-medium text-white">Kebayoran Baru</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">890</td>
                  <td className="py-4 px-6 font-mono text-right text-error">85.1%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-error-container/30 text-error text-xs font-bold uppercase tracking-wider border border-error/20">
                      Critical
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono text-on-surface-variant">03</td>
                  <td className="py-4 px-6 font-medium text-white">Mampang Prapatan</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">612</td>
                  <td className="py-4 px-6 font-mono text-right text-tertiary">76.8%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-tertiary-container/20 text-tertiary text-xs font-bold uppercase tracking-wider border border-tertiary/20">
                      Warning
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono text-on-surface-variant">04</td>
                  <td className="py-4 px-6 font-medium text-white">Cilandak</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">540</td>
                  <td className="py-4 px-6 font-mono text-right text-tertiary">68.2%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-tertiary-container/20 text-tertiary text-xs font-bold uppercase tracking-wider border border-tertiary/20">
                      Warning
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono text-on-surface-variant">05</td>
                  <td className="py-4 px-6 font-medium text-white">Pancoran</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">320</td>
                  <td className="py-4 px-6 font-mono text-right text-tertiary">51.0%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-tertiary-container/20 text-tertiary text-xs font-bold uppercase tracking-wider border border-tertiary/20">
                      Warning
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono text-on-surface-variant">06</td>
                  <td className="py-4 px-6 font-medium text-white">Pesanggrahan</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">180</td>
                  <td className="py-4 px-6 font-mono text-right text-secondary">42.5%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-on-secondary-container/10 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/20">
                      Safe
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono text-on-surface-variant">07</td>
                  <td className="py-4 px-6 font-medium text-white">Jagakarsa</td>
                  <td className="py-4 px-6 font-mono text-right text-on-surface">112</td>
                  <td className="py-4 px-6 font-mono text-right text-secondary">28.3%</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-on-secondary-container/10 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/20">
                      Safe
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside className="w-full xl:w-[24rem] glass-panel rounded-xl p-6 flex flex-col gap-6 sticky top-24 xl:mt-14 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-t border-l border-white/5">
          <div className="flex items-start justify-between border-b border-outline-variant/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                <span className="text-xs font-headline tracking-widest text-error uppercase">Live Inspection</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white">Tebet</h3>
              <p className="font-mono text-sm text-on-surface-variant mt-1">ID: JKT-S-TBT-01</p>
            </div>
            <button className="text-outline hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-container-lowest">
            <img alt="Satellite view map of district" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYIUNqRx5_L-uHtEB3p61SAzuP-mg2mmxwWloU563iOI3bVw8PO7yUAntgSkkZMN_JFcVGiUHhI9wMXm7R-ziwh1Q41SWujdgGvFexIXA12IEKwnYKaATLOTz0hHgrjrBrgZ1u_bEOdNWDc6Kck9CwfeNqgYzpKsaqaHo5S_dXrkgZ9MXTTr46l9vdK2Kr113IdxZPLO3cwMz4o0ybB7Cq3i6M1JyL8MXCXiiBBqe235U-dXa0IVro3YGUVII1ZYXk7TGRO0TOSIfi"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
              <div className="bg-surface-container-high/80 backdrop-blur text-xs px-2 py-1 rounded font-mono text-primary border border-primary/20">
                -6.2297° S, 106.8530° E
              </div>
              <button className="w-8 h-8 rounded bg-surface-variant/80 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-sm text-white">open_in_full</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider">Flagged Clusters</h4>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/10 flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error text-lg">storefront</span>
                  <div>
                    <p className="text-sm font-medium text-on-surface">Jl. Tebet Utara Dalam</p>
                    <p className="text-xs text-on-surface-variant font-mono mt-0.5">42 unzoned commercial</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm">chevron_right</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/10 flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-lg">restaurant</span>
                  <div>
                    <p className="text-sm font-medium text-on-surface">Tebet Raya Strip</p>
                    <p className="text-xs text-on-surface-variant font-mono mt-0.5">18 density violations</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm">chevron_right</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              <h4 className="font-headline text-xs font-bold text-primary uppercase tracking-wider">System Recommendation</h4>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Saturation has exceeded critical threshold (80%). Recommended action: <strong className="text-white font-medium">Initiate immediate moratorium</strong> on new commercial permits in Zone A and deploy field inspectors to unzoned clusters.
            </p>
            <button className="w-full mt-4 py-2.5 rounded bg-primary-container/20 hover:bg-primary-container text-primary hover:text-white font-bold text-sm tracking-wide transition-all border border-primary/30 hover:border-primary glow-accent">
              Generate Enforcement Order
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Rankings;
