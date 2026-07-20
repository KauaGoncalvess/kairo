# KAIRO — Software no tempo certo.

Experiência digital premium da **KAIRO**, estúdio de engenharia digital: software sob medida, SaaS, IA, automações, bots de WhatsApp, aplicativos, dashboards, APIs e consultoria.

Uma página cinematográfica: cena WebGL de partículas no hero, ecossistema de serviços orbitando um núcleo (cada serviço recolore a interface inteira ao ser explorado), scroll coreografado, dock flutuante em glassmorphism e motion system próprio.

**Stack**: Next.js 16 (App Router, export estático) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Three.js + React Three Fiber.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export estático em ./out
```

## Publicar (GitHub Pages)

1. Uma vez só: em **Settings → Pages**, defina **Source: GitHub Actions**.
2. Todo push em `main` roda `.github/workflows/deploy.yml` (lint → build → deploy).
3. URL: `https://kauagoncalvess.github.io/kairo/`

## Contatos e conteúdo

O WhatsApp real já está configurado em `src/config/site.ts`, junto com a mensagem pronta que o visitante envia ao clicar. O **e-mail ainda é placeholder** — troque `contato@kairo.exemplo` pelo real no mesmo arquivo.

Todo o conteúdo editável (serviços, processo, métricas, stack, mensagens de WhatsApp) vive em `src/config/site.ts`.

## Documentação

Design system, motion guidelines, estrutura, manutenção e roadmap: [`docs/GUIA.md`](docs/GUIA.md).
