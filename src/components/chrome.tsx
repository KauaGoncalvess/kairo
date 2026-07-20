"use client";

// "Chrome" da experiência: preloader cinematográfico, navbar transparente,
// dock flutuante com scroll-spy, cursor de luz e smooth scroll (Lenis).

import { useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, Magnetic, usePRM } from "@/lib/fx";
import { site, wa } from "@/config/site";

/* ───────── Logo ───────── */
export function Logo({ className = "h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 28" fill="none" className={className} aria-label={site.name} role="img">
      <text x="0" y="21" className="display" fontSize="24" fontWeight="700" letterSpacing="2" fill="currentColor">
        KAIR
      </text>
      <circle cx="86" cy="14" r="9" stroke="url(#lg)" strokeWidth="2.5" fill="none" />
      <circle cx="86" cy="5" r="2.4" fill="var(--accent-2)" />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────── Smooth scroll (Lenis + GSAP) ───────── */
export function SmoothScroll() {
  const prm = usePRM();
  useEffect(() => {
    if (prm) return;
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [prm]);
  return null;
}

/* ───────── Preloader ───────── */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.to(el.querySelectorAll("[data-draw]"), { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" })
      .fromTo(el.querySelector("[data-tag]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
      .to(el, { yPercent: -100, duration: 0.8, ease: "expo.inOut", delay: 0.25 });
    return () => { tl.kill(); };
  }, []);
  if (done) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg-0)" }}>
      <svg viewBox="0 0 200 60" className="w-56" fill="none" aria-hidden>
        <text x="8" y="44" className="display" fontSize="44" fontWeight="700" letterSpacing="4"
          stroke="url(#plg)" strokeWidth="1.2" fill="none" data-draw
          strokeDasharray="600" strokeDashoffset="600">
          KAIR
        </text>
        <circle cx="164" cy="30" r="17" stroke="url(#plg)" strokeWidth="2" fill="none" data-draw
          strokeDasharray="110" strokeDashoffset="110" />
        <defs>
          <linearGradient id="plg" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#7c6cff" />
            <stop offset="1" stopColor="#4adede" />
          </linearGradient>
        </defs>
      </svg>
      <p data-tag className="mono text-xs tracking-[0.4em] uppercase" style={{ color: "var(--muted)" }}>
        software no tempo certo
      </p>
    </div>
  );
}

/* ───────── Navbar transparente ───────── */
export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        gsap.to(el, { opacity: self.direction === 1 ? 0 : 1, pointerEvents: self.direction === 1 ? "none" : "auto", duration: 0.35 });
      },
    });
    return () => st.kill();
  }, []);
  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <a href="#inicio" aria-label="Início"><Logo /></a>
      <Magnetic>
        <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost glass !py-2.5 !px-5 text-sm">
          Falar com a {site.name}
        </a>
      </Magnetic>
    </header>
  );
}

/* ───────── Dock flutuante com scroll-spy ───────── */
const DOCK = [
  { id: "inicio", label: "Início", d: "M3 12l9-8 9 8v8a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
  { id: "manifesto", label: "Manifesto", d: "M4 5h16M4 12h16M4 19h10" },
  { id: "servicos", label: "Serviços", d: "M12 3a9 9 0 109 9M12 8a4 4 0 104 4M12 12h.01" },
  { id: "processo", label: "Processo", d: "M4 12h4l2-7 4 14 2-7h4" },
  { id: "contato", label: "Contato", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
];

export function Dock() {
  const [active, setActive] = useState("inicio");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    DOCK.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <nav
      aria-label="Seções"
      className="fixed bottom-4 left-1/2 z-50 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: `translateX(-50%) translateY(${visible ? 0 : 24}px)`, transitionTimingFunction: "var(--ease)" }}
    >
      <div className="glass flex items-center gap-1 rounded-full px-2 py-2">
        {DOCK.map(({ id, label, d }) => (
          <Magnetic key={id} strength={0.25}>
            <a
              href={`#${id}`}
              aria-label={label}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300"
              style={{ background: active === id ? "color-mix(in oklab, var(--accent) 25%, transparent)" : "transparent" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={active === id ? "var(--accent-2)" : "var(--muted)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
              <span className="mono pointer-events-none absolute -top-9 whitespace-nowrap rounded-md px-2 py-1 text-[10px] uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100 glass">
                {label}
              </span>
            </a>
          </Magnetic>
        ))}
      </div>
    </nav>
  );
}

/* ───────── Cursor de luz ───────── */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const prm = usePRM();
  useEffect(() => {
    const el = ref.current;
    if (prm || !el || window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) =>
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [prm]);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ transform: "translate(-100px,-100px)" }}>
      <div className="h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)", mixBlendMode: "screen" }} />
    </div>
  );
}

/* ───────── Footer ───────── */
export function Footer() {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const tick = () => setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <footer className="relative overflow-hidden border-t px-6 pb-28 pt-16 md:px-10" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo className="h-8" />
          <p className="mt-3 max-w-xs text-sm" style={{ color: "var(--muted)" }}>{site.tagline} Produtos digitais construídos com obsessão por detalhe.</p>
        </div>
        <div className="mono flex flex-col gap-2 text-xs" style={{ color: "var(--muted)" }}>
          <span suppressHydrationWarning>Brasil · {hora}</span>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent-2)]">github.com/KauaGoncalvess</a>
          <span>© {new Date().getFullYear()} {site.name}. Feito com precisão.</span>
        </div>
      </div>
      <div aria-hidden className="display pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none text-[26vw] font-bold leading-none opacity-[0.035]">
        {site.name}
      </div>
    </footer>
  );
}

export function Chrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <CursorGlow />
      <Navbar />
      <Dock />
      {children}
      <Footer />
    </>
  );
}
