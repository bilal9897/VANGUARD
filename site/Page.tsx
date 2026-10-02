import ClockLoader from "./components/ClockLoader";
import GlassNav from "./components/GlassNav";
import FrameHero from "@/components/patterns/FrameHero";
import CollectionCase from "./components/CollectionCase";
import MaskReveal from "./components/MaskReveal";
import BeforeAfter from "./components/BeforeAfter";
import Specsheet from "./components/Specsheet";
import PrivilegeBento from "./components/PrivilegeBento";
import Boutiques from "./components/Boutiques";
import CareFaq from "./components/CareFaq";
import MeridianFooter from "./components/MeridianFooter";
import { FRAMES, nav, hero } from "./content";

const LOADER_FRAMES = [FRAMES]; // preloaded behind the frozen loader with &at=

const ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#1d1a16"/><text x="16" y="22" font-family="serif" font-size="20" font-style="italic" fill="#c89a74" text-anchor="middle">L</text></svg>'
)}`;

/** Meridian: a printed horology catalogue. Plan + reasons: site/DESIGN.md. */
export default function Page() {
  return (
    <>
      {/* ?record=1: hide the mouse arrow from the very first frame (before React and RecordMode load) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `if(/[?&]record/.test(location.search)){var s=document.createElement("style");s.textContent="*,*::before,*::after{cursor:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";document.head.appendChild(s)}`,
        }}
      />
      {/* Site icon (React hoists it into <head>): a small bronze clock */}
      <link rel="icon" type="image/svg+xml" href={ICON} />
      <GlassNav {...nav} />
      <main>
        <FrameHero
          first
          s={{
            type: "frameHero",
            frames: FRAMES,
            title: hero.title,
            eyebrow: hero.eyebrow,
            subtitle: hero.text,
            buttons: hero.buttons,
            featured: hero.featured,
            length: 4,
            captions: [
              { 
                eyebrow: "01 // THE DINING ROOM",
                title: "Made to Gather", 
                text: "Warm materials and considered details create a space meant to be shared.", 
                at: 0.16, 
                duration: 0.1566, 
                position: "left" 
              },
              { 
                eyebrow: "01 // THE BEDROOM",
                title: "Rest, Refined", 
                text: "A serene private space where material, light, and comfort come together.", 
                at: 0.3333, 
                duration: 0.1389, 
                position: "left",
              },
              { 
                eyebrow: "03 // THE BATHROOM",
                title: "A Private Escape", 
                text: "Natural materials, soft light, and refined details create a space for quiet restoration.", 
                at: 0.5222, 
                duration: 0.0833, 
                position: "right" 
              },
              {
                eyebrow: "04 // THE POOL",
                title: "A Moment of Escape",
                text: "Still water, soft light, and seamless architecture create a private retreat.",
                at: 0.6389,
                duration: 0.1,
                position: "center",
                button: { label: "SCHEDULE CONSULTATION", href: "#contact" }
              }
            ],
          }}
        />
        <CollectionCase />
        <MaskReveal />
        <BeforeAfter />
        <Specsheet />
        <PrivilegeBento />
        <Boutiques />
        <CareFaq />
      </main>
      <MeridianFooter />
    </>
  );
}
