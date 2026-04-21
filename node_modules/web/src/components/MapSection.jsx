import React from 'react';

const MapSection = () => {
  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl overflow-hidden h-[400px] flex flex-col relative">
        <div className="p-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-highest/50 absolute top-0 w-full z-10 backdrop-blur-sm">
          <h2 className="font-headline font-bold text-lg">Jakarta Selatan Heatmap</h2>
          <button className="text-xs text-primary hover:text-primary-fixed transition-colors flex items-center gap-1">
            Expand Map <span className="material-symbols-outlined text-[14px]">open_in_full</span>
          </button>
        </div>
        
        <div className="flex-1 bg-surface-container-lowest relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #171f33 0%, #0b1326 100%)' }}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%234a4455' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")` }}></div>
          
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-error-container/40 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary/20 rounded-full blur-[40px]"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-tertiary/30 rounded-full blur-[30px]"></div>
          
          <div className="absolute top-1/3 left-1/4 flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-3 h-3 bg-error rounded-full shadow-[0_0_10px_rgba(255,180,171,0.8)] border-2 border-surface-dim"></div>
            <div className="bg-surface-variant/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-number outline outline-1 outline-outline-variant/30">Cilandak: 98% Sat</div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/3 flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(210,187,255,0.8)] border-2 border-surface-dim"></div>
            <div className="bg-surface-variant/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-number outline outline-1 outline-outline-variant/30">Kebayoran: 82% Sat</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-surface-container-high/90 to-surface-container-low/90 backdrop-blur-md outline outline-1 outline-primary/20 rounded-xl p-6 shadow-[0_10px_30px_rgba(124,58,237,0.05)] relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-primary-container/20 rounded-lg text-primary">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg mb-1">AI Saturation Forecast</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Predictive models indicate a <span className="text-error font-medium">92% probability</span> of critical over-saturation in the <strong>Tebet</strong> district within 6 months if current minimarket approval rates hold. Recommend initiating zoning freeze review.
            </p>
            <button className="mt-3 text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1">
              View Full Analysis <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
