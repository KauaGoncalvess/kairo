"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { gsap, Reveal, TiltCard, Magnetic, Counter, usePRM, EASE_DRAMA } from "@/lib/fx";
import { services, processo, metricas, stack, wa, site, type Service } from "@/config/site";

/* ───────── Micro-cenas 3D por serviço — "vídeos" gerados em código ───────── */
function MicroScene({ s, className = "", style }: { s: Service; className?: string; style?: React.CSSProperties }) {
  const c = s.accent;
  let scene: ReactNode;
  switch (s.id) {
    case "software": // cubo 3D girando
      scene = (
        <span className="cube" style={{ color: c }}>
          {["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(270deg)", "rotateX(90deg)", "rotateX(-90deg)"].map((t) => (
            <i key={t} style={{ transform: `${t} translateZ(17px)` }} />
          ))}
        </span>
      );
      break;
    case "saas": // camadas da plataforma flutuando
      scene = (
        <span className="relative block h-14 w-14" style={{ color: c }}>
          {[0, 1, 2].map((i) => (
            <i key={i} className="absolute left-0 right-0 block h-3 rounded border border-current"
              style={{ top: `${i * 17}px`, background: "color-mix(in oklab, currentColor 15%, transparent)", animation: `floaty 3s ${i * 0.35}s ease-in-out infinite` }} />
          ))}
        </span>
      );
      break;
    case "ia": // rede neural pulsando
      scene = (
        <span className="relative block h-16 w-16" style={{ color: c }}>
          <svg className="absolute inset-0" viewBox="0 0 64 64" stroke={c} strokeWidth="1" opacity="0.35">
            <path d="M12 12L32 32M52 10L32 32M10 54L32 32M54 52L32 32" fill="none" />
          </svg>
          {[[8, 8], [46, 6], [27, 27], [6, 48], [48, 46]].map(([x, y], i) => (
            <i key={i} className="absolute block h-2.5 w-2.5 rounded-full bg-current"
              style={{ left: x, top: y, boxShadow: `0 0 10px ${c}`, animation: `breathe 2.2s ${i * 0.3}s ease-in-out infinite` }} />
          ))}
        </span>
      );
      break;
    case "automacoes": // engrenagem girando
      scene = (
        <svg viewBox="0 0 48 48" className="h-14 w-14 animate-[orbit_6s_linear_infinite]" style={{ color: c }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="24" cy="24" r="9" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={24 + Math.cos(a) * 13} y1={24 + Math.sin(a) * 13} x2={24 + Math.cos(a) * 19} y2={24 + Math.sin(a) * 19} />;
          })}
        </svg>
      );
      break;
    case "whatsapp": // conversa viva
      scene = (
        <span className="relative block h-16 w-20" style={{ color: c }}>
          <i className="absolute left-0 top-1 block h-5 w-12 rounded-lg rounded-bl-none border border-current"
            style={{ background: "color-mix(in oklab, currentColor 12%, transparent)", animation: "chat 4s 0s ease-in-out infinite" }} />
          <i className="absolute right-0 top-9 block h-5 w-14 rounded-lg rounded-br-none bg-current"
            style={{ animation: "chat 4s 1.6s ease-in-out infinite", boxShadow: `0 0 12px ${c}` }} />
        </span>
      );
      break;
    case "apps": // celular com tela viva
      scene = (
        <span className="relative block h-16 w-10 rounded-lg border-2 border-current p-1" style={{ color: c }}>
          <i className="block h-full w-full rounded"
            style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${c} 45%, transparent), transparent)`, animation: "breathe 2.6s ease-in-out infinite" }} />
        </span>
      );
      break;
    case "dados": // gráfico crescendo
      scene = (
        <span className="flex h-14 items-end gap-1.5" style={{ color: c }}>
          {[34, 20, 44, 28, 52].map((h, i) => (
            <i key={i} className="block w-2.5 origin-bottom rounded-t bg-current"
              style={{ height: h, animation: `rise 2.4s ${i * 0.18}s ease-in-out infinite`, boxShadow: `0 0 8px ${c}` }} />
          ))}
        </span>
      );
      break;
    default: // consultoria: radar varrendo
      scene = (
        <span className="relative block h-16 w-16 rounded-full border border-current" style={{ color: c }}>
          <i className="absolute inset-0 block rounded-full animate-[orbit_3.5s_linear_infinite]"
            style={{ background: `conic-gradient(from 0deg, color-mix(in oklab, ${c} 45%, transparent), transparent 70deg)` }} />
          <i className="absolute inset-[30%] block rounded-full border border-current opacity-50" />
          <i className="absolute right-2.5 top-3 block h-1.5 w-1.5 rounded-full bg-current" style={{ animation: "breathe 1.4s ease-in-out infinite" }} />
        </span>
      );
  }
  return <span aria-hidden className={`flex items-center [perspective:400px] ${className}`} style={style}>{scene}</span>;
}

/* ───────── Manifesto: texto revelado palavra a palavra ───────── */
const MANIFESTO =
  "Acreditamos que tecnologia boa é invisível: ela simplesmente funciona, no momento exato em que você precisa. Por isso construímos cada produto como se fosse o nosso — com engenharia séria, design obsessivo e a pressa certa de quem sabe que timing é tudo.";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const prm = usePRM();
  useEffect(() => {
    const el = ref.current;
    if (!el || prm) return;
    const words = el.querySelectorAll("[data-w]");
    const tween = gsap.fromTo(words, { opacity: 0.12 }, {
      opacity: 1, stagger: 0.6, ease: "none",
      scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 55%", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [prm]);
  return (
    <section id="manifesto" ref={ref} className="relative mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <p className="mono mb-8 text-xs uppercase tracking-[0.45em]" style={{ color: "var(--accent-2)" }}>manifesto</p>
      <p className="display text-3xl font-medium leading-snug md:text-5xl">
        {MANIFESTO.split(" ").map((w, i) => (
          <span key={i} data-w className={prm ? "" : "opacity-[0.12]"}>{w} </span>
        ))}
      </p>
    </section>
  );
}

/* ───────── Ecossistema de serviços (orbital) ───────── */
function ServicePanel({ s, onClose }: { s: Service; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const prm = usePRM();

  useEffect(() => {
    // a interface inteira assume a identidade do serviço
    const root = document.documentElement;
    root.style.setProperty("--accent", s.accent);
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    if (!prm && ref.current) {
      gsap.fromTo(ref.current, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(120% at 50% 50%)", duration: 0.9, ease: EASE_DRAMA });
      gsap.fromTo(ref.current.querySelectorAll("[data-in]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.45, ease: "power3.out" });
    }
    return () => {
      root.style.removeProperty("--accent");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [s, onClose, prm]);

  return (
    <div ref={ref} role="dialog" aria-modal aria-label={s.name}
      className="fixed inset-0 z-[95] overflow-y-auto"
      style={{ background: `linear-gradient(160deg, color-mix(in oklab, ${s.accent} 14%, var(--bg-0)), var(--bg-0) 55%)` }}>
      <button onClick={onClose} aria-label="Fechar"
        className="glass fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:rotate-90"
        style={{ transitionDuration: "var(--t-base)" }}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center gap-12 px-6 py-24 md:flex-row md:items-center md:px-10">
        <div className="flex-1">
          <p data-in className="mono mb-4 text-xs uppercase tracking-[0.45em]" style={{ color: s.accent }}>{site.name} · serviço</p>
          <h3 data-in className="display text-5xl font-bold leading-tight md:text-7xl">{s.name}</h3>
          <p data-in className="mt-4 text-xl md:text-2xl" style={{ color: s.accent }}>{s.tagline}</p>
          <p data-in className="mt-6 max-w-lg leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
          <ul data-in className="mt-8 space-y-3">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent, boxShadow: `0 0 12px ${s.accent}` }} />
                {b}
              </li>
            ))}
          </ul>
          <div data-in className="mt-10">
            <Magnetic>
              <a href={wa(`Olá! Quero falar sobre ${s.name} com a KAIRO.`)} target="_blank" rel="noopener noreferrer"
                className="btn font-semibold" style={{ background: s.accent, color: "#0a0a12", boxShadow: `0 0 30px color-mix(in oklab, ${s.accent} 50%, transparent)` }}>
                Quero isso no meu negócio
              </a>
            </Magnetic>
          </div>
        </div>
        {/* microcena exclusiva do serviço */}
        <div data-in aria-hidden className="relative mx-auto h-64 w-64 shrink-0 md:h-80 md:w-80">
          {[0, 1, 2].map((i) => (
            <span key={i} className="absolute inset-0 rounded-full border"
              style={{ borderColor: `color-mix(in oklab, ${s.accent} 40%, transparent)`, animation: `pulse-ring 2.6s ${i * 0.85}s ease-out infinite` }} />
          ))}
          <span className="absolute inset-0 animate-[orbit_9s_linear_infinite]">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full" style={{ background: s.accent, boxShadow: `0 0 18px ${s.accent}` }} />
          </span>
          <span className="absolute inset-[22%] rounded-full animate-[breathe_4s_ease-in-out_infinite]"
            style={{ background: `radial-gradient(circle, color-mix(in oklab, ${s.accent} 55%, transparent), transparent 70%)` }} />
          <span className="absolute inset-0 flex scale-[1.7] items-center justify-center">
            <MicroScene s={s} className="justify-center" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [open, setOpen] = useState<Service | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const R = 300; // raio da órbita (desktop)

  return (
    <section id="servicos" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mono mb-4 text-xs uppercase tracking-[0.45em]" style={{ color: "var(--accent-2)" }}>ecossistema</p>
          <h2 className="display max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
            Um sistema completo <span className="text-gradient">orbitando o seu negócio.</span>
          </h2>
          <p className="mt-4 max-w-xl" style={{ color: "var(--muted)" }}>
            Toque em um serviço para entrar no universo dele — a interface inteira muda.
          </p>
        </Reveal>

        {/* Desktop: sistema orbital */}
        <div className="orbit-zone relative mx-auto mt-10 hidden aspect-square max-w-[760px] md:block">
          {/* núcleo */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="glass glow flex h-28 w-28 items-center justify-center rounded-full animate-[breathe_5s_ease-in-out_infinite]">
              <span className="display text-lg font-bold text-gradient">{site.name}</span>
            </div>
          </div>
          {/* anéis-guia */}
          {[0.55, 0.82].map((k) => (
            <div key={k} aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{ width: `${k * 100}%`, height: `${k * 100}%`, borderColor: "var(--line)" }} />
          ))}
          {/* órbita de cards */}
          <div className="orbit-ring absolute inset-0">
            {services.map((s, i) => {
              const ang = (i / services.length) * 360;
              return (
                <div key={s.id} className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${ang}deg) translateX(${R}px) rotate(${-ang}deg)` }}>
                  <div className="orbit-item -translate-x-1/2 -translate-y-1/2">
                    <TiltCard>
                      <button onClick={() => setOpen(s)}
                        className="glass group w-40 cursor-pointer rounded-2xl p-4 text-left transition-shadow duration-500"
                        style={{ boxShadow: `0 0 0 transparent` }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 30px color-mix(in oklab, ${s.accent} 35%, transparent)`)}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 transparent")}>
                        <MicroScene s={s} className="mb-3 h-14 scale-75 justify-start [transform-origin:left_center]" />
                        <span className="display block text-sm font-semibold leading-tight">{s.name}</span>
                        <span className="mono mt-2 block text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: s.accent }}>
                          explorar →
                        </span>
                      </button>
                    </TiltCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/tablet: trilho com snap */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden" style={{ scrollbarWidth: "none" }}>
          {services.map((s) => (
            <button key={s.id} onClick={() => setOpen(s)}
              className="glass w-64 shrink-0 snap-center rounded-2xl p-6 text-left">
              <MicroScene s={s} className="mb-5 h-20 justify-center rounded-xl border py-2"
                style={{ borderColor: "var(--line)", background: `radial-gradient(120px 60px at 50% 100%, color-mix(in oklab, ${s.accent} 14%, transparent), transparent)` }} />
              <span className="display block text-lg font-semibold">{s.name}</span>
              <span className="mt-2 block text-sm" style={{ color: "var(--muted)" }}>{s.tagline}</span>
              <span className="mono mt-4 block text-[10px] uppercase tracking-widest" style={{ color: s.accent }}>explorar →</span>
            </button>
          ))}
        </div>
      </div>
      {open && <ServicePanel s={open} onClose={close} />}
    </section>
  );
}

/* ───────── Processo: linha do tempo pinada ───────── */
export function Processo() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prm = usePRM();
  useEffect(() => {
    if (prm || !wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const t = track.current!;
      const tween = gsap.to(t, {
        x: () => -(t.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${t.scrollWidth - window.innerWidth}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });
    return () => mm.revert();
  }, [prm]);

  return (
    <section id="processo" ref={wrap} className="relative overflow-hidden">
      <div className="px-6 pt-20 md:px-10 md:pt-24">
        <Reveal className="mx-auto max-w-6xl">
          <p className="mono mb-4 text-xs uppercase tracking-[0.45em]" style={{ color: "var(--accent-2)" }}>método</p>
          <h2 className="display text-4xl font-bold md:text-6xl">Do caos à <span className="text-gradient">clareza</span>, em cinco atos.</h2>
        </Reveal>
      </div>
      <div ref={track} className="mt-10 flex flex-col gap-6 px-6 pb-20 md:mt-16 md:w-max md:flex-row md:gap-10 md:px-[12vw]">
        {processo.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.05}>
            <TiltCard className="glass h-full rounded-3xl p-8 md:h-[46vh] md:w-[34rem] md:p-10">
              <span className="display text-6xl font-bold md:text-7xl" style={{ WebkitTextStroke: "1.5px var(--accent)", color: "transparent" }}>{p.n}</span>
              <h3 className="display mt-6 text-2xl font-semibold md:text-3xl">{p.t}</h3>
              <p className="mt-4 max-w-md leading-relaxed" style={{ color: "var(--muted)" }}>{p.d}</p>
              <div aria-hidden className="mt-8 h-[2px] w-24 rounded-full"
                style={{ background: `linear-gradient(90deg, var(--accent), var(--accent-2))`, boxShadow: "0 0 12px var(--accent)" }} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── Métricas + stack ───────── */
export function Prova() {
  return (
    <section className="border-y px-6 py-16 md:px-10 md:py-20" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {metricas.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <div>
              <span className="display text-5xl font-bold md:text-6xl text-gradient">
                <Counter to={m.v} suffix={m.suffix} />
              </span>
              <p className="mono mt-2 text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>{m.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
        <div className="animate-marquee flex w-max gap-10">
          {[...stack, ...stack].map((t, i) => (
            <span key={i} className="mono text-sm uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[var(--accent-2)]" style={{ color: "var(--muted)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Contato ───────── */
export function Contato() {
  const ref = useRef<HTMLElement>(null);
  const prm = usePRM();
  useEffect(() => {
    const el = ref.current;
    if (!el || prm) return;
    const light = el.querySelector("[data-light]");
    const tween = gsap.fromTo(light, { scale: 0.4, opacity: 0.2 }, {
      scale: 1, opacity: 1, ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "center 55%", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [prm]);
  return (
    <section id="contato" ref={ref} className="relative overflow-hidden px-6 py-24 text-center md:px-10 md:py-36">
      <div data-light aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 22%, transparent), transparent 62%)" }} />
      <Reveal>
        <p className="mono mb-6 text-xs uppercase tracking-[0.45em]" style={{ color: "var(--accent-2)" }}>o próximo passo</p>
        <h2 className="display mx-auto max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Vamos construir o <span className="text-gradient">seu momento?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md" style={{ color: "var(--muted)" }}>
          Conte a sua ideia. Em até um dia útil você recebe um caminho técnico claro — sem juridiquês, sem enrolação.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow text-lg">
              Chamar no WhatsApp
            </a>
          </Magnetic>
          <a href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Projeto com a KAIRO")}`} className="btn btn-ghost">
            {site.contact.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
