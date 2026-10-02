"use client";

import { useState, useRef } from "react";

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <section id="transformation" className="section-y" data-record-label="Transformation" data-record-time="3" data-record-align="center">
      <div className="container-x">
        <div data-reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="eyebrow mb-5">The Transformation</p>
            <h2 className="font-display text-[clamp(44px,5vw,88px)]">From Blueprint to Reality.</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted">
            Witness the meticulous process behind our architectural marvels. Slide to reveal the journey from raw construction to the finished masterpiece.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[60vh] md:h-[80vh] rounded-[24px] md:rounded-[32px] overflow-hidden cursor-ew-resize group shadow-2xl border border-line"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* After (Bottom Layer) */}
          <img 
            src="/images/livspace/premium_resort.jpg" 
            alt="Completed Resort" 
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
          />
          
          {/* Before (Top Layer with Clip Path) */}
          <div 
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img 
              src="/images/livspace/resort_construction.jpg" 
              alt="Resort Under Construction" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%]" 
            />
            {/* Overlay label */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
              Build Time
            </div>
          </div>
          
          {/* Overlay label After */}
          <div className="absolute top-6 right-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/40 text-black text-xs font-bold tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            Completed
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-black/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black w-5 h-5">
                <path d="M15 18l-6-6 6-6" />
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
