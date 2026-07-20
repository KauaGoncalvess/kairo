# KAIRO — Guia do projeto

Experiência digital premium da KAIRO: estúdio de engenharia digital (software sob medida, SaaS, IA, automações, bots de WhatsApp, apps, dashboards, APIs e consultoria).

## Estrutura (sitemap)

Página única cinematográfica com seções ancoradas, navegáveis pelo dock flutuante:

| Âncora | Seção | Comportamento |
|---|---|---|
| `#inicio` | Hero | Cena WebGL de partículas (mouse + scroll), headline com reveal por linha |
| `#manifesto` | Manifesto | Texto revelado palavra a palavra conforme o scroll |
| `#servicos` | Ecossistema | 8 serviços orbitando um núcleo; clique abre painel imersivo que muda a identidade de toda a interface |
| `#processo` | Método | Linha do tempo horizontal pinada (desktop) / vertical (mobile) |
| — | Prova | Contadores animados + marquee de tecnologias |
| `#contato` | Contato | Luz converge para os CTAs de WhatsApp e e-mail |

## Design System

Tokens em `src/app/globals.css` (`:root`), consumidos por todo o site:

- **Cores**: `--bg-0 #05060a`, `--bg-1 #0b0d14`, `--fg #f5f6f8`, `--muted #9aa1b2`, `--line`
- **Acento dinâmico**: `--accent` (#7c6cff) e `--accent-2` (#4adede). O painel de serviço sobrescreve `--accent` no `<html>`, recolorindo o site inteiro; cada serviço define seu matiz em `src/config/site.ts`.
- **Tipografia**: Space Grotesk (display, `--font-display`), Inter (texto), Geist Mono (detalhes técnicos). Servidas via `next/font` (self-hosted no build).
- **Utilitários**: `.glass` (glassmorphism), `.glow`, `.text-gradient`, `.btn-primary/.btn-ghost`, `.display`, `.mono`.
- **Logo**: componente `Logo` em `src/components/chrome.tsx` — wordmark "KAIR" + "O" orbital em SVG.

## Motion Guidelines

Tokens: `--t-fast 150ms`, `--t-base 400ms`, `--t-cine 900ms`; easings `--ease` e `--ease-drama` (o equivalente GSAP está em `src/lib/fx.tsx`: `EASE`, `EASE_DRAMA`).

Primitivos reutilizáveis (`src/lib/fx.tsx`): `<Reveal>` (fade+rise no scroll), `<Magnetic>` (gravita ao cursor), `<TiltCard>` (profundidade 3D + reflexo), `<Counter>` (números animados), `usePRM()` (prefere-se movimento reduzido).

Regras:
1. Nada anima sem propósito; scroll conta a história (ScrollTrigger com `scrub`).
2. `prefers-reduced-motion` desliga cena 3D, smooth scroll e reveals — o conteúdo permanece íntegro.
3. Hover só em dispositivos com ponteiro (`(hover: none)` é respeitado).
4. Devices modestos (< 768px ou `deviceMemory ≤ 4`) recebem menos partículas.

## Manutenção

- **Contatos**: troque os placeholders de WhatsApp/e-mail em `src/config/site.ts` (comentários `PLACEHOLDER`).
- **Conteúdo**: serviços, processo, métricas e stack também vivem em `src/config/site.ts` — o site inteiro reage.
- **Rodar local**: `npm install && npm run dev` (http://localhost:3000). Build: `npm run build` → `out/`.
- **Deploy**: Vercel (projeto `kairo`, export estático). Headers de segurança em `vercel.json`. Conecte o repositório na Vercel para deploy automático a cada push em `main`.

## Evolução futura

Roadmap sugerido: casos/portfólio com páginas próprias, blog (MDX), i18n (en), formulário com backend (Resend/API), Storybook + testes visuais, protótipo Figma sincronizado, analytics (Plausible), domínio próprio (ajustar `basePath` e `site.url`).
