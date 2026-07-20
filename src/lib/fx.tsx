"use client";

// Motion System — primitivos reutilizáveis de animação.
// Durações/easings vêm dos tokens em globals.css; GSAP usa os equivalentes abaixo.

import { useEffect, useRef, useSyncExternalStore, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const EASE = "power4.out";
export const EASE_DRAMA = "expo.inOut";

const prmQuery = "(prefers-reduced-motion: reduce)";
function subscribePRM(cb: () => void) {
  const mq = window.matchMedia(prmQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function usePRM() {
  return useSyncExternalStore(subscribePRM, () => window.matchMedia(prmQuery).matches, () => false);
}

/** Revela o conteúdo (fade + rise) quando entra na viewport. */
export function Reveal({ children, delay = 0, y = 40, className = "" }: {
  children: ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prm = usePRM();
  useEffect(() => {
    if (prm || !ref.current) return;
    const tween = gsap.fromTo(ref.current,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration: 1.1, delay, ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 88%" } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [prm, delay, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Elemento que gravita em direção ao cursor (hover magnético). */
export function Magnetic({ children, strength = 0.35, className = "" }: {
  children: ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prm = usePRM();
  useEffect(() => {
    const el = ref.current;
    if (prm || !el || window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 0.4, ease: EASE,
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [prm, strength]);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Card com profundidade: tilt 3D seguindo o mouse + reflexo de luz. */
export function TiltCard({ children, className = "", style }: {
  children: ReactNode; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prm = usePRM();
  useEffect(() => {
    const el = ref.current;
    if (prm || !el || window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 14, rotateX: -py * 14, transformPerspective: 700, duration: 0.5, ease: EASE });
      el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    };
    const leave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [prm]);
  return (
    <div ref={ref} className={`relative ${className}`} style={{ transformStyle: "preserve-3d", ...style }}>
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.09), transparent 45%)" }} />
    </div>
  );
}

/** Contador animado disparado por scroll. */
export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prm = usePRM();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prm) { el.textContent = `${to}${suffix}`; return; }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => { el.textContent = `${Math.round(obj.v)}${suffix}`; },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [prm, to, suffix]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}
