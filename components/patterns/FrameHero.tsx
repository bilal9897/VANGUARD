"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onSiteReady } from "@/lib/loading";
import type { Caption, FrameHeroSection } from "./types";
import { useFramePlayer } from "@/components/engine/useFramePlayer";
import Button from "@/components/ui/Button";

const captionPos: Record<NonNullable<Caption["position"]>, string> = {
  left: "left-[clamp(20px,5vw,80px)] top-[65%] md:top-1/2 -translate-y-1/2 text-left max-w-xl",
  right: "right-[clamp(20px,5vw,80px)] top-[65%] md:top-[35%] -translate-y-1/2 text-right max-w-xl",
  center: "left-1/2 top-[65%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-3xl",
  bottom: "left-1/2 bottom-[14vh] -translate-x-1/2 text-center max-w-3xl",
};

/**
 * THE SIGNATURE SECTION: a video that plays as you scroll.
 * The screen stays pinned while the frames advance; captions fade in and out.
 */
export default function FrameHero({ s, first = false }: { s: FrameHeroSection; first?: boolean }) {
  const outer = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const player = useFramePlayer(s.frames, canvas, { blockLoader: first });
  const length = s.length ?? 4;
  const align = s.align ?? "left";
  const [showReelBtn, setShowReelBtn] = useState(false);

  useEffect(() => {
    const handleSecret = () => setShowReelBtn(prev => !prev);
    window.addEventListener('secret-reel-btn', handleSecret);
    return () => window.removeEventListener('secret-reel-btn', handleSecret);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Intro text animation (runs immediately now that ClockLoader is removed)
    const ctx = gsap.context(() => {
      const lines = intro.current?.querySelectorAll(".hero-line > span");
      const rest = intro.current?.querySelectorAll("[data-hero-fade]");
      if (lines) gsap.from(lines, { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12 });
      if (rest) gsap.from(rest, { opacity: 0, y: 24, duration: 1, delay: 0.45, stagger: 0.12, ease: "power3.out" });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => player.current.seek(self.progress),
        },
      });
      tl.to({}, { duration: 1 }); // timeline length = 1 so captions use 0–1
      tl.to(intro.current, { opacity: 0, y: -60, duration: 0.1, ease: "none" }, 0.04);
      tl.to(hint.current, { opacity: 0, duration: 0.04 }, 0.01);

      (s.captions ?? []).forEach((c, i) => {
        const el = outer.current!.querySelector(`[data-caption="${i}"]`);
        const d = c.duration ?? 0.18;
        tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: d * 0.3, ease: "power2.out" }, c.at);
        tl.to(el, { opacity: 0, y: -30, duration: d * 0.25, ease: "power2.in" }, c.at + d * 0.75);
      });
    }, outer);

    return () => ctx.revert();
  }, [s.captions, player]);

  const overlay = s.overlay ?? 0.45;

  return (
    <section ref={outer} id={s.id} className="relative" style={{ height: `${length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden text-[var(--hero-text)]">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              align === "left"
                ? `linear-gradient(90deg, rgba(0,0,0,${overlay + 0.15}) 0%, rgba(0,0,0,${overlay * 0.4}) 55%, transparent 80%)`
                : `radial-gradient(ellipse at center, rgba(0,0,0,${overlay * 0.6}), rgba(0,0,0,${overlay}))`,
          }}
        />

        {/* Intro overlay elements */}
        <div
          ref={intro}
          className={`absolute left-6 md:left-12 bottom-[8vh] ${align === "center" ? "text-center flex justify-center w-full left-0" : "pr-6 md:pr-12"}`}
        >
          <div className="w-full max-w-2xl">
            {s.eyebrow && (
              <p className="eyebrow mb-6 text-white/80" data-hero-fade>
                {s.eyebrow}
              </p>
            )}
            <h1 className="font-display text-[clamp(48px,8vw,108px)] text-white leading-[0.9]">
              {s.title.map((line, i) => (
                <span key={i} className="hero-line block overflow-hidden pb-[0.06em] lg:whitespace-nowrap">
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>
            {s.subtitle && (
              <p
                data-hero-fade
                className={`mt-6 max-w-[32rem] text-[clamp(14px,1vw,16px)] leading-relaxed text-white/90 ${align === "center" ? "mx-auto" : ""}`}
              >
                {s.subtitle}
              </p>
            )}
            {s.buttons && (
              <div data-hero-fade className={`mt-8 flex gap-3 sm:gap-4 ${align === "center" ? "justify-center" : ""}`}>
                {s.buttons.map((b) => (
                  <a
                    key={b.label}
                    href={b.href}
                    className={`inline-flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap rounded-full px-5 sm:px-8 py-3 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] transition-colors ${
                      b.style === "light"
                        ? "bg-white text-black hover:bg-white/90"
                        : "border border-white/20 bg-black/20 text-white hover:bg-white hover:text-black backdrop-blur-md"
                    }`}
                  >
                    {b.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Card */}
        {s.featured && (
          <div
            data-hero-fade
            className="absolute bottom-8 right-8 hidden md:block w-full max-w-sm rounded-[24px] border border-white/10 bg-black/40 p-8 backdrop-blur-md text-white"
          >
            <p className="mb-4 text-[10px] tracking-[0.2em] text-white/60 uppercase">{s.featured.eyebrow}</p>
            <h3 className="mb-6 font-display text-2xl">{s.featured.title}</h3>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="mb-1 text-[9px] tracking-[0.15em] text-white/50 uppercase">LOCATION</p>
                <p className="text-sm font-medium">{s.featured.location}</p>
              </div>
              <div>
                <p className="mb-1 text-[9px] tracking-[0.15em] text-white/50 uppercase">AREA</p>
                <p className="text-sm font-medium">{s.featured.area}</p>
              </div>
              <div>
                <p className="mb-1 text-[9px] tracking-[0.15em] text-white/50 uppercase">COMPLETION</p>
                <p className="text-sm font-medium">{s.featured.completion}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase">FEATURED PROJECT</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors">
                →
              </button>
            </div>
          </div>
        )}

        {/* Bottom Left Bar */}
        <div data-hero-fade className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/60 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>RESIDENCE SCENE 1 / 5 // INTRO</span>
        </div>

        {/* Play Reel Button */}
        {showReelBtn && (
          <div data-hero-fade className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              const el = outer.current;
              if (!el) return;
              const endY = el.offsetTop + el.offsetHeight - window.innerHeight;
              const startY = window.scrollY;
              const dist = endY - startY;
              if (dist <= 0) return;
              const duration = 12000;
              let start = 0;
              let req = 0;
              const cancel = () => cancelAnimationFrame(req);
              window.addEventListener('wheel', cancel, { once: true });
              window.addEventListener('touchstart', cancel, { once: true });
              const step = (t: number) => {
                if (!start) start = t;
                const p = Math.min((t - start) / duration, 1);
                window.scrollTo(0, startY + dist * p);
                if (p < 1) {
                  req = requestAnimationFrame(step);
                } else {
                  window.removeEventListener('wheel', cancel);
                  window.removeEventListener('touchstart', cancel);
                }
              };
              req = requestAnimationFrame(step);
            }}
            className="flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            PLAY AUTO REEL
          </button>
        </div>
        )}

        {/* Captions that appear during the scroll */}
        {(s.captions ?? []).map((c, i) => (
          <div key={i} data-caption={i} className={`absolute opacity-0 ${captionPos[c.position ?? "left"]}`}>
            {c.eyebrow && <p className="mb-4 text-[10px] tracking-[0.2em] text-white/60 uppercase">{c.eyebrow}</p>}
            <h2 className="font-display text-[clamp(40px,5vw,88px)] text-white">{c.title}</h2>
            {c.text && <p className={`mt-5 max-w-xl text-[clamp(15px,1.1vw,18px)] leading-relaxed text-white/85 hidden md:block ${(c.position === "center" || c.position === "bottom") ? "mx-auto" : ""}`}>{c.text}</p>}
            
            {c.stats && (
              <div className="mt-8 grid grid-cols-4 gap-3">
                {c.stats.map((stat, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-3 text-center text-white flex flex-col justify-center">
                    <p className="font-display text-lg md:text-xl mb-1">{stat.value}</p>
                    <p className="text-[8px] tracking-[0.1em] text-white/60 uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {c.button && (
              <div className="mt-8 flex justify-center">
                <a
                  href={c.button.href}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-8 py-3 text-[11px] font-bold tracking-[0.15em] text-black transition-transform hover:scale-105"
                >
                  {c.button.label}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
