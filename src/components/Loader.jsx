import React from 'react';

const Loader = ({ isLoading }) => {
  return (
    <div className={`loader-overlay${isLoading ? '' : ' hidden'}`}>
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-gold-500/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-gold-500 animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">📺</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <div className="text-gold-500 font-bold text-xl tracking-widest font-heading mb-1">
            PRIYA RAJAN
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="live-badge">LOADING</div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-yellow-300 rounded-full"
            style={{ animation: 'loadProgress 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loadProgress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
