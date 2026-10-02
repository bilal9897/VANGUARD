// All text + data for Vanguard. Prices are samples (concept site).

export const STUDIO = "Bilal Salmani (bilalsalmani600@gmail.com)";
export const FRAMES = "/hero";

export const nav = {
  logo: "VANGUARD",
  links: [
    { label: "PORTFOLIO", href: "#collection" },
    { label: "THE VISION", href: "#atelier" },
    { label: "TRANSFORMATION", href: "#transformation" },
    { label: "PROCESS", href: "#process" },
    { label: "LOCATIONS", href: "#boutiques" },
  ],
  cta: "CONSULTATION →"
};

export const hero = {
  eyebrow: "HOME TOUR",
  title: ["Modern", "Sanctuary"],
  text: "Take a cinematic tour of our latest residential masterpiece, where natural light and premium materials converge.",
  buttons: [
    { label: "START TOUR →", href: "#projects", style: "light" as const },
    { label: "VIEW DETAILS", href: "#contact", style: "dark" as const }
  ],
  featured: {
    eyebrow: "FEATURED RESIDENCE",
    title: "Private Villa Collection",
    location: "Malibu, CA",
    area: "8,200 sq ft",
    completion: "2026"
  }
};

export const anatomy = {
  eyebrow: "The blueprint",
  heading: "Five layers of luxury living.",
  // x = position across the video (0–1) where the part ends up; at = video progress when it separates
  parts: [
    { n: "01", name: "Natural Light", text: "Floor-to-ceiling windows for perfect illumination.", x: 0.05, at: 0.24, side: "top" },
    { n: "02", name: "Premium Materials", text: "Sourced globally, placed locally.", x: 0.21, at: 0.4, side: "bottom" },
    { n: "03", name: "Custom Millwork", text: "Handcrafted cabinetry and details.", x: 0.45, at: 0.56, side: "top" },
    { n: "04", name: "Smart Integration", text: "Invisible, seamless technology.", x: 0.67, at: 0.7, side: "bottom" },
    { n: "05", name: "Bespoke Furnishings", text: "Curated to match the space exactly.", x: 0.88, at: 0.84, side: "top" },
  ],
};

export const heartbeat = {
  eyebrow: "Design Philosophy",
  text: "Every detail considered. *One cohesive vision.*",
};

export type Watch = {
  ref: string;
  name: string;
  image: string;
  specs: string;
  price: string;
  tag?: string;
};

export const collection = {
  eyebrow: "The Portfolio",
  heading: "Four signature spaces.",
  filters: ["All", "Modernist", "Coastal", "Heritage"],
  items: [
    { ref: "LIV-01", name: "Villa Azure", image: "/images/livspace/prop_villa_azure_1790886309541.jpg", specs: "8,200 sq ft · Malibu, CA · Coastal", price: "Completed 2026", tag: "Featured" },
    { ref: "LIV-02", name: "The Glass House", image: "/images/livspace/prop_glass_house_1790886322658.jpg", specs: "4,500 sq ft · Aspen, CO · Modernist", price: "Completed 2025" },
    { ref: "LIV-03", name: "Oakwood Estate", image: "/images/livspace/prop_oakwood_1790886334509.jpg", specs: "12,000 sq ft · London, UK · Heritage", price: "Completed 2024" },
    { ref: "LIV-04", name: "Penthouse 42", image: "/images/livspace/prop_penthouse_1790886346153.jpg", specs: "6,000 sq ft · New York, NY · Modernist", price: "Completed 2026", tag: "New" },
  ] satisfies Watch[],
};

export type Build = {
  dial: string;
  dialColor: string;
  strap: string;
  strapColor: string;
  caseMetal: string;
  image: string;
  ref: string;
  price: string;
};

export const studio = {
  eyebrow: "Configure",
  heading: "Texture and *tone.*",
  text: "Select your foundational materials. We source the finest marble, wood, and metals to craft your sanctuary.",
  builds: [
    { dial: "Calacatta Marble", dialColor: "#e6e6e6", strap: "Light grey vein", strapColor: "#b3b3b3", caseMetal: "Italian sourced", image: "/images/livspace/mat_marble_1790886369667.jpg", ref: "MAT-01", price: "Premium" },
    { dial: "Smoked Oak", dialColor: "#3e2723", strap: "Dark grain", strapColor: "#261a15", caseMetal: "European sourced", image: "/images/livspace/mat_wood_1790886384913.jpg", ref: "MAT-02", price: "Standard" },
    { dial: "Brushed Brass", dialColor: "#cda434", strap: "Warm metallic", strapColor: "#a67c00", caseMetal: "Hand finished", image: "/images/livspace/mat_brass_1790886396557.jpg", ref: "MAT-03", price: "Accent" },
    { dial: "Travertine", dialColor: "#d2b48c", strap: "Earthy beige", strapColor: "#b59b72", caseMetal: "Turkish sourced", image: "/images/livspace/mat_travertine_1790886407037.jpg", ref: "MAT-04", price: "Premium" },
  ] satisfies Build[],
  interval: 1800,
};

export const craft = {
  words: ["THE", "VISION"],
  image: "/images/livspace/premium_resort.jpg",
  eyebrow: "The studio",
  heading: "Where vision becomes reality.",
  text: "Our architects and designers collaborate in our downtown studio, bringing every blueprint to life with exact precision.",
};

export const figures = {
  eyebrow: "In figures",
  heading: "Measured, not *guessed.*",
  rows: [
    { n: "i.", value: 250, suffix: "+", label: "Completed homes", note: "Across 12 countries globally." },
    { n: "ii.", value: 45, suffix: "", label: "Designers & Architects", note: "A team dedicated to perfection." },
    { n: "iii.", value: 12, suffix: "m", label: "Average timeline", note: "12-18 months from sketch to handover." },
    { n: "iv.", value: 100, suffix: "%", label: "Custom tailored", note: "No two Vanguard homes are alike." },
  ],
};

export const privileges = {
  eyebrow: "Our Process",
  heading: "Look closer.",
  tiles: {
    tourbillon: { image: "/images/livspace/prop_villa_azure_1790886309541.jpg", title: "The Vision", text: "Conceptual sketches to final blueprints." },
    wrist: { image: "/images/livspace/mat_marble_1790886369667.jpg", title: "The Materials", text: "Sourced from the finest artisans." },
    back: { image: "/images/livspace/prop_oakwood_1790886334509.jpg", title: "The Execution", text: "Flawless construction and styling." },
    extra1: { image: "/images/livspace/prop_glass_house_1790886322658.jpg", title: "The Details", text: "Custom millwork and lighting." },
    extra2: { image: "/images/livspace/premium_resort.jpg", title: "The Handover", text: "Your sanctuary, complete." },
  },
  perks: [
    { mark: "Aa", title: "Dedicated Manager", text: "One point of contact throughout." },
    { mark: "5", title: "Five-year warranty", text: "On all structural and custom millwork." },
    { mark: "◎", title: "Private viewing", text: "VR walkthroughs before construction begins." },
  ],
};

export const boutiques = {
  image: "/images/livspace/prop_penthouse_1790886346153.jpg",
  eyebrow: "Consultation",
  heading: "Let's build your dream.",
  text: "Meet with our lead architects and interior designers in one of our global studios.",
  cities: [
    { city: "Los Angeles", note: "Headquarters", image: "/images/livspace/prop_glass_house_1790886322658.jpg" },
    { city: "New York", note: "Design Studio", image: "/images/livspace/prop_penthouse_1790886346153.jpg" },
    { city: "London", note: "Design Studio", image: "/images/livspace/prop_oakwood_1790886334509.jpg" },
    { city: "Dubai", note: "Design Studio", image: "/images/livspace/premium_resort.jpg" },
  ],
  cta: "Book a consultation",
};

export const faq = {
  eyebrow: "Process",
  heading: "Questions, answered.",
  items: [
    { q: "How long does a typical project take?", a: "Depending on the scope, an entire home redesign takes between 12 to 18 months from initial sketches to final handover." },
    { q: "Do you handle the construction as well?", a: "Yes, we offer an end-to-end service. We partner with the finest contractors and oversee the entire build process." },
    { q: "Can I source my own furniture?", a: "Absolutely. While we curate bespoke pieces, we can integrate your personal collection seamlessly into the new design." },
    { q: "Where are your studios located?", a: "We have physical studios in LA, NY, London, and Dubai, but we take on select projects globally." },
  ],
};

export const footer = {
  name: "Vanguard",
  logo: "VANGUARD",
  letter: "Letters from the studio",
  columns: [
    { title: "Portfolio", links: ["Villa Azure", "The Glass House", "Oakwood Estate", "Penthouse 42"] },
    { title: "Studio", links: ["Process", "Materials", "Journal"] },
    { title: "Connect", links: ["Consultation", "Careers", "Contact"] },
  ],
  note: `Concept website by ${STUDIO}.`,
};
