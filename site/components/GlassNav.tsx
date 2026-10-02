"use client";

import Link from "next/link";

export default function GlassNav({
  logo,
  links,
  cta,
}: {
  logo: string;
  links: { label: string; href: string }[];
  cta: string;
}) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between rounded-full bg-black/40 backdrop-blur-md px-2 py-2 border border-white/10 shadow-xl">
        <Link href="/" className="pl-6 text-[11px] font-bold tracking-[0.2em] text-white flex items-center">
          {logo}
          <span 
            className="text-[#c89a74] cursor-pointer px-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('secret-reel-btn'));
            }}
          >.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.15em] font-medium text-white/80">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="#contact"
          className="rounded-full border border-white/20 px-6 py-2.5 text-[10px] tracking-[0.15em] text-white hover:bg-white hover:text-black transition-colors"
        >
          {cta}
        </Link>
      </nav>
    </div>
  );
}
