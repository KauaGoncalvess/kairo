"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, Magnetic, usePRM } from "@/lib/fx";
import { site, wa } from "@/config/site";

const Scene = dynamic(() => import("./scene"), { ssr: false });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prm = usePRM();

  useEffect(() => {
    const el = ref.current;
    if (!el || prm) return;
    const lines = el.querySelectorAll(".line-mask > span");
    const tl = gsap.timeline({ delay: 1.9 }); // após o preloader
    tl.to(lines, { y: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" })
      .fromTo(el.querySelectorAll("[data-fade]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");
    // headline recua sutilmente conforme o scroll
    const st = gsap.to(el.querySelector("[data-head]"), {
      yPercent: 18, opacity: 0.15, ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
    return () => { tl.kill(); st.scrollTrigger?.kill(); st.kill(); };
  }, [prm]);

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-svh items-center overflow-hidden">
      {!prm && <Scene />}
      {prm && (
        <div aria-hidden className="absolute inset-0"
          style={{ background: "radial-gradient(800px 500px at 50% 40%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)" }} />
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <p data-fade className="mono mb-6 text-xs uppercase tracking-[0.45em] opacity-0" style={{ color: "var(--accent-2)" }}>
          estúdio de engenharia digital
        </p>
        <h1 data-head className="display text-[13vw] font-bold leading-[0.95] md:text-[7.5rem]">
          <span className="line-mask"><span>Software no</span></span>
          <span className="line-mask"><span className="text-gradient">tempo certo.</span></span>
        </h1>
        <p data-fade className="mt-8 max-w-xl text-base leading-relaxed opacity-0 md:text-lg" style={{ color: "var(--muted)" }}>
          {site.description}
        </p>
        <div data-fade className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
          <Magnetic>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow">
              Iniciar projeto
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </Magnetic>
          <a href="#servicos" className="btn btn-ghost">Explorar o ecossistema</a>
        </div>
      </div>
      <div data-fade aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="h-12 w-[1px] overflow-hidden" style={{ background: "var(--line)" }}>
          <div className="h-4 w-full animate-[floaty_1.6s_ease-in-out_infinite]" style={{ background: "var(--accent-2)" }} />
        </div>
      </div>
    </section>
  );
}
