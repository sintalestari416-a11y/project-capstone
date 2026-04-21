import React from 'react';
import Header from '../components/Header';

const Settings = () => {
  return (
    <div className="bg-surface-dim text-on-surface font-body antialiased min-h-screen">
      <Header />
      <main className="ml-64 flex flex-col min-h-screen">
        <div className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Configuration &amp; Preferences</h2>
            <p className="text-on-surface-variant text-sm mt-2 max-w-2xl leading-relaxed">Manage system parameters, notification logic, and geospatial rendering preferences for the active auditing environment.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-surface-container-high/70 backdrop-blur-[12px] border border-outline-variant/20 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-surface-container rounded-lg border border-outline-variant/10">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                  </div>
                  <h3 className="font-headline text-xl font-semibold text-on-surface">Geospatial Engine</h3>
                </div>
                <div className="space-y-8 relative z-10">
                  <div>
                    <label className="block font-label text-sm font-medium text-on-surface-variant mb-2">Default Basemap Rendering</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-4 pr-10 py-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer">
                        <option value="satellite-high-res">Satellite (High Resolution Multi-Spectral)</option>
                        <option value="dark-matter">Dark Matter Vector (Low Distraction)</option>
                        <option value="topographical">Topographical Contour Map</option>
                        <option value="infrared">Infrared Overlay</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-label text-sm font-medium text-on-surface-variant">Initial Telemetry Zoom Level</label>
                      <span className="font-number text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded">Z-14</span>
                    </div>
                    <input className="w-full h-1.5 bg-surface-container-lowest rounded-full appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/30" max="20" min="1" type="range" defaultValue="14"/>
                    <div className="flex justify-between text-xs text-on-surface-variant/50 mt-2 font-number">
                      <span>Global (Z-1)</span>
                      <span>Street Level (Z-20)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-container-lowest/50 rounded-xl border border-outline-variant/10">
                    <div>
                      <p className="font-label text-sm font-medium text-on-surface">Audit Radius Rings</p>
                      <p className="text-xs text-on-surface-variant mt-1">Render 500m proximity rings around active audit coordinates by default.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" value=""/>
                      <div className="w-11 h-6 bg-surface-container peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <section className="bg-surface-container-high/70 backdrop-blur-[12px] border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-surface-container rounded-lg border border-outline-variant/10">
                    <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-on-surface">Alert Protocols</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-label text-sm text-on-surface-variant cursor-pointer select-none">Critical Violations</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" value=""/>
                      <div className="w-9 h-5 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-error"></div>
                    </label>
                  </div>
                  <hr className="border-outline-variant/10"/>
                  <div className="flex items-center justify-between">
                    <label className="font-label text-sm text-on-surface-variant cursor-pointer select-none">Audit Sync Completion</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" value=""/>
                      <div className="w-9 h-5 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                  <hr className="border-outline-variant/10"/>
                  <div className="flex items-center justify-between">
                    <label className="font-label text-sm text-on-surface-variant cursor-pointer select-none">Engine Updates</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only peer" type="checkbox" value=""/>
                      <div className="w-9 h-5 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface-variant after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                </div>
              </section>

              <section className="bg-surface-container-high/70 backdrop-blur-[12px] border border-outline-variant/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-surface-container rounded-lg border border-outline-variant/10">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-on-surface">System State</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">Force a manual synchronization with the FastAPI backend to pull the latest spatial geometries.</p>
                    <button className="w-full py-2.5 px-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-label text-sm font-medium rounded-lg hover:bg-surface-container hover:border-primary/50 transition-all flex items-center justify-center gap-2 group">
                      <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">sync</span>
                      Sync Spatial Data
                    </button>
                    <p className="text-[10px] text-on-surface-variant/40 mt-2 text-right font-number">Last sync: 04:12:09 UTC</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/10">
                    <div className="flex items-center justify-between">
                      <span className="font-label text-sm text-on-surface">Interface Theme</span>
                      <div className="flex bg-surface-container-lowest rounded-lg p-1 border border-outline-variant/20">
                        <button className="px-3 py-1 rounded text-xs font-medium text-on-surface-variant hover:text-white transition-colors">Light</button>
                        <button className="px-3 py-1 rounded text-xs font-medium bg-surface-variant text-primary shadow-[0_0_10px_rgba(124,58,237,0.1)]">Dark</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
