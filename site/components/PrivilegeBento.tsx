import { privileges } from "../content";

type Tile = { image: string; title: string; text: string };

function Photo({ t, className = "" }: { t: Tile; className?: string }) {
  return (
    <a href="#" data-cursor="View" className={`group relative min-h-[300px] w-[85vw] shrink-0 snap-center md:w-auto overflow-hidden rounded-[24px] md:rounded-[32px] border border-line shadow-sm bg-surface ${className}`}>
      <img src={t.image} alt={t.title} className="absolute inset-0 h-full w-full object-cover filter grayscale-[40%] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-[cubic-bezier(.65,0,.35,1)] group-hover:scale-[1.05]" />

      <div className="absolute left-3 bottom-3 right-3 md:left-4 md:bottom-4 md:right-auto md:max-w-[320px] md:min-w-[220px] flex flex-col p-4 md:p-5 rounded-[16px] md:rounded-[20px] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 shadow-sm transition-all duration-700 group-hover:bg-white/80 dark:group-hover:bg-black/60">
        <p className="font-display text-[clamp(20px,1.8vw,28px)] text-black leading-[1.1]">{t.title}</p>
        <p className="mt-1.5 text-[12px] md:text-[13px] text-black/75">{t.text}</p>
      </div>
    </a>
  );
}

const Perk = ({ p }: { p: { mark: string; title: string; text: string } }) => (
  <div className="group relative flex min-h-[220px] w-[85vw] shrink-0 snap-center md:w-auto flex-col justify-between rounded-[24px] md:rounded-[32px] border border-line bg-surface p-7 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-black/20 hover:-translate-y-1">
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
      <span className="font-display text-[120px] leading-none italic text-black">{p.mark}</span>
    </div>
    <span className="font-display text-[44px] leading-none text-accent italic relative z-10">{p.mark}</span>
    <div className="relative z-10">
      <p className="text-[16px] font-semibold">{p.title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.text}</p>
    </div>
  </div>
);

/** Bento, restyled: dark photo plates mixed with ivory privilege tiles, all rounded panels. */
export default function PrivilegeBento() {
  const { tourbillon, wrist, back, extra1, extra2 } = privileges.tiles;
  return (
    <section id="process" className="section-y !pt-0" data-record-label="Look closer" data-record-time="2.5" data-record-align="center">
      <div className="container-x">
        <div data-reveal className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="eyebrow mb-5">{privileges.eyebrow}</p>
            <h2 className="font-display text-[clamp(44px,5vw,88px)]">{privileges.heading}</h2>
          </div>
        </div>
        <div data-reveal="stagger" className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar gap-4 pb-8 md:grid md:grid-cols-4 md:auto-rows-[clamp(220px,19vw,300px)] md:snap-none md:overflow-visible md:pb-0">
          <Photo t={tourbillon} className="md:col-span-2" />
          <Photo t={wrist} className="md:row-span-2" />
          <Photo t={extra1} />
          <Photo t={back} className="md:col-span-2" />
          <Photo t={extra2} />
        </div>
      </div>
    </section>
  );
}
