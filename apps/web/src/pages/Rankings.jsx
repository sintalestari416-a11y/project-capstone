import React from 'react';
import Header from '../components/Header';

const Rankings = () => {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen antialiased">
      <Header />

      {/* 🔥 FIX: hapus xl:flex-row */}
      <main className="ml-64 p-8 flex flex-col gap-8 items-start relative z-10">

        {/* 🔥 FIX: hapus max-width karena tidak ada aside */}
        <section className="flex-1 flex flex-col gap-6 w-full">

          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline text-3xl font-bold text-white tracking-tight">
                District Saturation
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Real-time ranking based on commercial zoning violations.
              </p>
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

          {/* TABLE */}
          <div className="glass-panel rounded-xl overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant/20">
                  <th className="py-4 px-6 text-xs text-on-surface-variant uppercase">Pos</th>
                  <th className="py-4 px-6 text-xs text-on-surface-variant uppercase">District</th>
                  <th className="py-4 px-6 text-xs text-on-surface-variant uppercase text-right">Violations</th>
                  <th className="py-4 px-6 text-xs text-on-surface-variant uppercase text-right">Saturation %</th>
                  <th className="py-4 px-6 text-xs text-on-surface-variant uppercase text-center">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-outline-variant/10 text-sm">

                <tr className="bg-surface-container-highest/40">
                  <td className="py-4 px-6 text-primary font-medium">01</td>
                  <td className="py-4 px-6 text-white">Tebet</td>
                  <td className="py-4 px-6 text-right">1,245</td>
                  <td className="py-4 px-6 text-right text-error">92.4%</td>
                  <td className="py-4 px-6 text-center text-error">Critical</td>
                </tr>

                <tr>
                  <td className="py-4 px-6">02</td>
                  <td className="py-4 px-6 text-white">Kebayoran Baru</td>
                  <td className="py-4 px-6 text-right">890</td>
                  <td className="py-4 px-6 text-right text-error">85.1%</td>
                  <td className="py-4 px-6 text-center text-error">Critical</td>
                </tr>

                <tr>
                  <td className="py-4 px-6">03</td>
                  <td className="py-4 px-6 text-white">Mampang</td>
                  <td className="py-4 px-6 text-right">612</td>
                  <td className="py-4 px-6 text-right text-tertiary">76.8%</td>
                  <td className="py-4 px-6 text-center text-tertiary">Warning</td>
                </tr>

                <tr>
                  <td className="py-4 px-6">04</td>
                  <td className="py-4 px-6 text-white">Cilandak</td>
                  <td className="py-4 px-6 text-right">540</td>
                  <td className="py-4 px-6 text-right text-tertiary">68.2%</td>
                  <td className="py-4 px-6 text-center text-tertiary">Warning</td>
                </tr>

                <tr>
                  <td className="py-4 px-6">05</td>
                  <td className="py-4 px-6 text-white">Pancoran</td>
                  <td className="py-4 px-6 text-right">320</td>
                  <td className="py-4 px-6 text-right text-tertiary">51.0%</td>
                  <td className="py-4 px-6 text-center text-tertiary">Warning</td>
                </tr>

                <tr>
                  <td className="py-4 px-6">06</td>
                  <td className="py-4 px-6 text-white">Pesanggrahan</td>
                  <td className="py-4 px-6 text-right">180</td>
                  <td className="py-4 px-6 text-right text-green-400">42.5%</td>
                  <td className="py-4 px-6 text-center text-green-400">Safe</td>
                </tr>

              </tbody>
            </table>
          </div>

        </section>

        {/* ❌ LIVE INSPECTION SUDAH DIHAPUS TOTAL */}

      </main>
    </div>
  );
};

export default Rankings;