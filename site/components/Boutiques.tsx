"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { boutiques } from "../content";

/** Split + Cta, restyled: interactive city list that updates the floating main image. */
export default function Boutiques() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="boutiques" className="section-y" data-record-label="Locations" data-record-time="2.5" data-record-align="center">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div data-reveal className="relative aspect-[4/5] max-h-[80vh] w-full overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl border border-line">
          {boutiques.cities.map((c, i) => (
            <img 
              key={c.city} 
              src={c.image} 
              alt={c.city} 
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(.65,0,.35,1)] ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`} 
            />
          ))}
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-1000" />
        </div>
        
        <div>
          <p data-reveal className="eyebrow mb-5 text-accent">
            {boutiques.eyebrow}
          </p>
          <h2 data-reveal className="font-display text-[clamp(44px,5vw,72px)] leading-[1.05]">
            {boutiques.heading}
          </h2>
          <p data-reveal className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
            {boutiques.text}
          </p>
          <ul data-reveal="stagger" className="mt-12 border-b border-line">
            {boutiques.cities.map((c, i) => (
              <li 
                key={c.city} 
                onMouseEnter={() => setActiveIndex(i)}
                className={`group flex items-baseline justify-between border-t border-line py-6 cursor-pointer transition-colors duration-500 ${activeIndex === i ? 'text-black dark:text-white' : 'text-muted hover:text-black dark:hover:text-white'}`}
              >
                <span className={`font-display text-[clamp(28px,2.5vw,40px)] transition-transform duration-500 ${activeIndex === i ? 'translate-x-4' : 'group-hover:translate-x-2'}`}>
                  {c.city}
                </span>
                <span className={`ref transition-all duration-500 ${activeIndex === i ? 'opacity-100 translate-x-0' : 'opacity-50 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-80'}`}>
                  {c.note} →
                </span>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-8">
            <Button href="#contact" label={boutiques.cta} />
            <a href="#collection" className="link-underline pb-0.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-muted hover:text-black dark:hover:text-white transition-colors duration-300">
              Explore Portfolio instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
