// ⭐ Fonte única de verdade: marca, contatos (PLACEHOLDERS) e serviços.
// Troque os contatos abaixo pelos reais — nada mais precisa mudar no site.

export const site = {
  name: "KAIRO",
  tagline: "Software no tempo certo.",
  description:
    "A KAIRO projeta e constrói produtos digitais — SaaS, IA, automações e sistemas sob medida — com a precisão de quem sabe que detalhes decidem tudo.",
  url: "https://kairo-kappa-liard.vercel.app",
  github: "https://github.com/KauaGoncalvess/kairo",
  ogImage: "https://raw.githubusercontent.com/KauaGoncalvess/kairo/main/public/og.jpg",
  contact: {
    whatsapp: "5531995816540",
    /** PLACEHOLDER — e-mail de contato real */
    email: "contato@kairo.exemplo",
  },
};

export const wa = (
  msg = "Olá! Vim pelo site da KAIRO 👋 Tenho interesse nos serviços de vocês (software sob medida, SaaS, IA, automações, bots de WhatsApp, apps…) e queria entender como podemos tirar meu projeto do papel. Podemos conversar?"
) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export type Service = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  desc: string;
  accent: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "software",
    name: "Software sob medida",
    short: "Sob medida",
    tagline: "Sistemas que vestem o seu negócio como pele.",
    desc: "Do zero ao deploy: arquitetura enterprise, código limpo e um produto que faz exatamente o que a sua operação precisa — nada a menos, nada sobrando.",
    accent: "#7c6cff",
    bullets: ["Arquitetura escalável", "Integração com o seu stack", "Evolução contínua"],
  },
  {
    id: "saas",
    name: "SaaS",
    short: "SaaS",
    tagline: "Do MVP ao produto que cobra sozinho.",
    desc: "Planejamos, construímos e lançamos plataformas de assinatura completas: billing, multi-tenant, onboarding e métricas desde o primeiro dia.",
    accent: "#4adede",
    bullets: ["MVP em semanas", "Billing e assinaturas", "Métricas de produto"],
  },
  {
    id: "ia",
    name: "Inteligência Artificial",
    short: "IA",
    tagline: "IA aplicada onde gera resultado, não hype.",
    desc: "Agentes, copilotos, RAG e análise de dados com LLMs — integrados aos seus processos reais, com segurança e custo sob controle.",
    accent: "#ff6ad5",
    bullets: ["Agentes e copilotos", "RAG com seus dados", "Custo previsível"],
  },
  {
    id: "automacoes",
    name: "Automações & Bots",
    short: "Automações",
    tagline: "O trabalho repetitivo morre aqui.",
    desc: "Robôs e fluxos que eliminam tarefas manuais: integrações, rotinas, notificações e operações inteiras rodando enquanto você dorme.",
    accent: "#ffb454",
    bullets: ["Fluxos ponta a ponta", "Integrações entre sistemas", "Operação 24/7"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    short: "WhatsApp",
    tagline: "Seu melhor vendedor atende em segundos.",
    desc: "Bots oficiais de WhatsApp com IA: atendimento, qualificação, agendamento e vendas — no canal onde o Brasil inteiro já está.",
    accent: "#4ade80",
    bullets: ["API oficial", "IA conversacional", "Funil de vendas no chat"],
  },
  {
    id: "apps",
    name: "Aplicativos",
    short: "Apps",
    tagline: "Experiências nativas que as pessoas guardam.",
    desc: "Apps iOS e Android com interface impecável e performance real — do conceito à loja, com analytics e atualização contínua.",
    accent: "#60a5fa",
    bullets: ["iOS + Android", "UI de primeira classe", "Publicação nas lojas"],
  },
  {
    id: "dados",
    name: "Dashboards & APIs",
    short: "Dados",
    tagline: "Seus dados, finalmente falando a sua língua.",
    desc: "Painéis em tempo real, APIs sólidas e integrações que transformam dados espalhados em decisão — com landing pages que convertem na frente.",
    accent: "#fb7185",
    bullets: ["Dashboards em tempo real", "APIs documentadas", "Landing pages de alta conversão"],
  },
  {
    id: "consultoria",
    name: "Consultoria",
    short: "Consultoria",
    tagline: "Clareza técnica antes de gastar um real.",
    desc: "Auditoria de arquitetura, roadmap de produto e destravamento de times: a visão de engenharia sênior no momento em que ela mais vale.",
    accent: "#e2c044",
    bullets: ["Auditoria de código e arquitetura", "Roadmap técnico", "Apoio ao seu time"],
  },
];

export const processo = [
  { n: "01", t: "Descoberta", d: "Imersão no problema, no usuário e no negócio. Saímos com escopo claro e prioridades certas." },
  { n: "02", t: "Design", d: "Protótipos navegáveis e identidade da solução. Você vê e sente o produto antes da primeira linha de código." },
  { n: "03", t: "Engenharia", d: "Sprints curtos, entregas semanais, código revisado e testado. Progresso que você acompanha ao vivo." },
  { n: "04", t: "Lançamento", d: "Deploy sem drama: infraestrutura, observabilidade e performance auditada antes de ir ao ar." },
  { n: "05", t: "Evolução", d: "Produto vivo: métricas, melhorias contínuas e novas frentes — o lançamento é o começo." },
];

// Compromissos assumidos com cada cliente — não estatísticas históricas.
export const metricas = [
  { v: 24, suffix: "h", label: "resposta garantida" },
  { v: 100, suffix: "%", label: "código sob medida" },
  { v: 1, suffix: "", label: "ponto de contato direto" },
  { v: 7, suffix: "d", label: "para a primeira prévia" },
];

export const stack = [
  "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL",
  "AWS", "Docker", "Kubernetes", "OpenAI", "Anthropic", "WhatsApp API",
  "React Native", "Three.js", "Stripe", "Supabase",
];
