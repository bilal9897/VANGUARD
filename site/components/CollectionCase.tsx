"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { collection } from "../content";

const GROW_BIG = 1.45; // flex-grow of the big card (small cards = 1), so the row always fills the same width
const WATCH_H = 360; // watch height on the big card; small cards scale it down
const SMALL_SCALE = 210 / WATCH_H;
const AUTO_MS = 1600;
const EASE = "cubic-bezier(.65,0,.35,1)";

/**
 * ProductGrid "pop", restyled as an accordion row (laptop): one big card at a time.
 * Hover grows a card; with no mouse over the row it advances by itself every ~1.6 s (always in ?record=1).
 * Below 1024px: the stacked cards with the first one big, no hover.
 */
export default function CollectionCase() {
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(false); // ≥1024px: accordion row
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const recording = useRef(false);
  const row = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStill(prefersReducedMotion());
    recording.current = new URLSearchParams(window.location.search).has(
      "record",
    );
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => setWide(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(row.current!);
    return () => {
      mq.removeEventListener("change", onMq);
      io.disconnect();
    };
  }, []);

  // ?record=1: the section timeline holds here; step M-01 → M-04 across the hold, like hovering
  useEffect(() => {
    const el = stage.current!;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const onHold = (e: Event) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const step =
        ((e as CustomEvent<{ duration: number }>).detail.duration * 1000) /
        collection.items.length;
      timers.forEach(clearTimeout);
      setActive(0);
      timers = collection.items
        .slice(1)
        .map((_, k) => setTimeout(() => setActive(k + 1), step * (k + 1)));
    };
    el.addEventListener("record:hold", onHold);
    return () => {
      el.removeEventListener("record:hold", onHold);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Auto-advance while on screen and not hovered (in ?record=1 the timeline hold drives it instead)
  useEffect(() => {
    if (still || !wide || !visible || hovering || recording.current) return;
    const t = setInterval(
      () => setActive((n) => (n + 1) % collection.items.length),
      AUTO_MS,
    );
    return () => clearInterval(t);
  }, [still, wide, visible, hovering]);

  const hoverable = wide && !still;
  const onRow = (inside: boolean) => {
    if (hoverable && !recording.current) setHovering(inside);
  };
  const onCard = (i: number) => {
    if (hoverable && !recording.current) setActive(i);
  };
  const motion = still ? "none" : `0.7s ${EASE}`;

  return (
    <section id="collection" className="section-y">
      <div className="container-x">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-8 border-b border-line pb-8"
        >
          <div>
            <p className="eyebrow mb-5">{collection.eyebrow}</p>
            <h2 className="font-display text-[clamp(44px,5vw,88px)]">
              {collection.heading}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {collection.filters.map((f, i) => (
              <span
                key={f}
                className={`rounded-full border px-4 py-2 text-[12px] font-semibold tracking-[0.14em] uppercase ${
                  i === 0 ? "border-fg bg-fg text-bg" : "border-line text-muted"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div ref={stage} className="relative">
          {/* ?record=1 stop: big watch + cards centred below the nav (laptop), first card on phones */}
          <div
            aria-hidden
            data-record-label="Collection (hold)"
            data-record-time="1.5"
            data-record-hold="5"
            data-record-hold-mobile="2"
            data-record-align="center"
            data-record-offset="-36"
            data-record-align-mobile="top"
            data-record-offset-mobile="-64"
            className="pointer-events-none absolute inset-0"
          />
          <div
            ref={row}
            data-reveal="stagger"
            onMouseEnter={() => onRow(true)}
            onMouseLeave={() => onRow(false)}
            className="mt-12 flex snap-x snap-mandatory overflow-x-auto gap-x-5 pb-8 lg:mt-[120px] lg:overflow-visible lg:pb-0 lg:snap-none hide-scrollbar"
          >
            {collection.items.map((w, i) => {
              const big = wide ? active === i : i === 0;
              return (
                <a
                  key={w.ref}
                  href="#"
                  data-cursor="View"
                  onMouseEnter={() => onCard(i)}
                  className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[24px] md:rounded-[32px] w-[85vw] shrink-0 snap-center sm:w-[45vw] lg:w-auto h-[480px] md:h-[600px] ${
                    big ? "shadow-2xl" : "shadow-md"
                  }`}
                  style={{
                    flex: wide ? `${big ? GROW_BIG : 1} 1 0%` : undefined,
                    transition: `flex-grow ${motion}, box-shadow ${motion}`,
                  }}
                >
                  <img
                    src={w.image}
                    alt={w.name}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(.65,0,.35,1)] filter ${big ? "grayscale-0 brightness-100" : "grayscale-[50%] brightness-90"} group-hover:grayscale-0 group-hover:brightness-100`}
                    style={{
                      transform: `scale(${big ? 1.05 : 1.15})`,
                      transition: `transform ${motion}`,
                    }}
                  />
                  {/* Glassy card at the bottom */}
                  <div 
                    className="absolute left-3 bottom-3 w-[calc(100%-24px)] md:left-5 md:bottom-5 md:w-[calc(100%-40px)] md:max-w-[340px] flex flex-col p-5 md:p-6 rounded-[16px] md:rounded-[24px] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 shadow-sm transition-all duration-700"
                  >
                    <div className="flex items-center justify-between gap-3 text-black">
                      <span className="ref whitespace-nowrap text-[10px] tracking-widest uppercase">Ref. {w.ref}</span>
                      {w.tag && (
                        <span className="text-[10px] font-bold tracking-[0.2em] whitespace-nowrap text-stone-800 uppercase">
                          {w.tag}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-display mt-3 truncate pb-[0.08em] text-black ${big ? "text-[clamp(24px,2vw,36px)]" : "text-[clamp(20px,1.5vw,24px)]"}`}
                      style={{ transition: `font-size ${motion}` }}
                    >
                      {w.name}
                    </h3>
                    <p
                      className="mt-1 truncate text-[13px] text-black/70"
                      title={w.specs}
                    >
                      {w.specs}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
                      <span className="tnum text-[13px] font-semibold whitespace-nowrap text-black/80">
                        {w.price}
                      </span>
                      <span className="text-[11px] font-bold tracking-[0.15em] whitespace-nowrap uppercase text-black">
                        View Details →
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div data-reveal className="mt-14 flex justify-center">
          <a
            href="#"
            className="link-underline pb-0.5 text-[12px] font-semibold tracking-[0.16em] uppercase"
          >
            View all fourteen references →
          </a>
        </div>
      </div>
    </section>
  );
}
