# KAIRO — Software no tempo certo.

Experiência digital premium da **KAIRO**, estúdio de engenharia digital: software sob medida, SaaS, IA, automações, bots de WhatsApp, aplicativos, dashboards, APIs e consultoria.

**Site: https://kairo-kappa-liard.vercel.app**

Uma página cinematográfica: cena WebGL de partículas no hero, ecossistema de serviços orbitando um núcleo (cada serviço recolore a interface inteira ao ser explorado), scroll coreografado, dock flutuante em glassmorphism e motion system próprio.

**Stack**: Next.js 16 (App Router, export estático) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Three.js + React Three Fiber.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export estático em ./out
```

## Publicar (Vercel)

O site roda na Vercel como export estático (projeto `kairo`). Para publicar novas versões automaticamente, conecte este repositório ao projeto na Vercel (Dashboard → Project → Settings → Git) — cada push em `main` vira deploy. Os cabeçalhos de segurança são aplicados via `vercel.json`.

## Segurança

Site 100% estático — sem backend, banco, cookies, sessões ou entrada de usuário renderizada, o que elimina as classes de ataque de servidor (SQLi, RCE, CSRF, session hijacking). Sobre o que resta:

- **CSP** restritiva (`default-src 'self'`, sem `unsafe-eval`, `object-src 'none'`, `frame-ancestors 'none'`), HSTS com preload, `nosniff`, `X-Frame-Options: DENY` (anti-clickjacking), `Referrer-Policy`, `Permissions-Policy` negando câmera/microfone/geolocalização, COOP/CORP — tudo em `vercel.json`.
- **Zero recursos de terceiros**: fontes self-hosted via `next/font`, nenhum CDN, analytics ou script externo — sem supply chain de runtime.
- **Links externos** (`wa.me`) com `rel="noopener noreferrer"` (anti reverse-tabnabbing) e parâmetros via `encodeURIComponent`.
- **`.well-known/security.txt`** para reporte responsável de vulnerabilidades.
- **Dependências**: `npm audit` limpo em runtime; único apontamento é o `postcss` embutido no Next.js (moderado, ferramenta de build — não roda em produção; risco aceito até correção upstream).

Reporte de vulnerabilidades: abra uma issue em https://github.com/KauaGoncalvess/kairo/issues.

## Contatos e conteúdo

O WhatsApp real já está configurado em `src/config/site.ts`, junto com a mensagem pronta que o visitante envia ao clicar. O **e-mail ainda é placeholder** — troque `contato@kairo.exemplo` pelo real no mesmo arquivo.

Todo o conteúdo editável (serviços, processo, métricas, stack, mensagens de WhatsApp) vive em `src/config/site.ts`.

## Documentação

Design system, motion guidelines, estrutura, manutenção e roadmap: [`docs/GUIA.md`](docs/GUIA.md).
