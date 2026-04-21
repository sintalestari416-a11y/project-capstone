import React from 'react';
import Header from '../components/Header';
import KPIGrid from '../components/KPIGrid';
import MapSection from '../components/MapSection';
import TopDistrictsChart from '../components/TopDistrictsChart';
import ViolationsTable from '../components/ViolationsTable';

const Dashboard = () => {
  return (
    <div className="bg-surface-dim text-on-surface font-body antialiased selection:bg-primary-container/30 selection:text-primary-fixed min-h-screen">
      <Header />
      <main className="ml-64 p-8 min-h-screen">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-on-surface-variant text-sm mt-1">Real-time geospatial zoning analysis.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg outline outline-1 outline-outline-variant/20">
            <span className="material-symbols-outlined text-xs text-success">sync</span>
            Live Sync Active
          </div>
        </div>
        
        <KPIGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <MapSection />
          <TopDistrictsChart />
        </div>
        
        <ViolationsTable />
      </main>
    </div>
  );
};

export default Dashboard;
