import React from 'react';

const TopDistrictsChart = () => {
  return (
    <div className="lg:col-span-4 bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl p-6 flex flex-col h-full">
      <h2 className="font-headline font-bold text-lg mb-6">Top Saturated Districts</h2>
      <div className="flex flex-col gap-5 flex-1 justify-center">
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-on-surface">Cilandak</span>
            <span className="font-number text-tertiary font-bold">98%</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-tertiary-container to-tertiary w-[98%] rounded-full relative">
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-on-surface">Tebet</span>
            <span className="font-number text-error font-bold">92%</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-error-container to-error w-[92%] rounded-full relative"></div>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-on-surface">Kebayoran Baru</span>
            <span className="font-number text-primary font-bold">85%</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-container to-primary w-[85%] rounded-full relative"></div>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-on-surface">Pancoran</span>
            <span className="font-number text-primary-fixed-dim font-bold">78%</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-container/50 to-primary/80 w-[78%] rounded-full relative"></div>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-on-surface">Setiabudi</span>
            <span className="font-number text-on-surface-variant font-bold">65%</span>
          </div>
          <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div className="h-full bg-surface-variant w-[65%] rounded-full relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDistrictsChart;
