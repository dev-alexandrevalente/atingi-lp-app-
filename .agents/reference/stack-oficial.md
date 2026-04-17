# 🏗️ Stack Oficial do Antigravity

> Referência canônica de tecnologia. Todas as skills técnicas devem seguir este documento.

---

## 1. Framework Principal

### Decisão por Tipo de Projeto

| Cenário | Framework | Justificativa |
|---------|----------|--------------|
| **Landing pages, funis, VSL pages** | **Next.js (App Router)** | SSR/SSG para SEO, Image Optimization, performance, rota padrão |
| **SaaS B2B, dashboards, apps** | **Next.js (App Router)** | Full-stack, API routes, middleware, auth |
| **Site estático com conteúdo** | **Astro** | Zero JS por default, performance máxima, content-first |
| **Projeto ultra-leve / demo** | **Vite + React** | Rápido de iniciar, sem overhead de framework |
| **Protótipo rápido** | **HTML + CSS + JS** | Zero setup, máxima simplicidade |

### Configuração Next.js Padrão
```
Framework: Next.js 15+ (App Router)
Runtime: Node.js
Linguagem: TypeScript
Estilo: TailwindCSS v4
Componentes: shadcn/ui + Radix UI
Package Manager: pnpm
Linting: ESLint + Prettier
Deploy: Vercel (primário) | Docker (alternativo)
```

### Quando NÃO usar Next.js
- Sites puramente estáticos (blog, docs) → Astro
- Quando SEO e SSR são irrelevantes → Vite + React
- Protótipos de 1 página → HTML puro

---

## 2. UI / Design System

### Stack UI Oficial

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Utility CSS** | TailwindCSS v4 | Estilização primária, tokens via CSS variables |
| **Componentes base** | shadcn/ui | Componentes acessíveis, personalizáveis, sem lock-in |
| **Primitives** | Radix UI | Headless primitives (Dialog, Dropdown, etc.) |
| **Icons** | Lucide React | Ícones consistentes, tree-shakeable |
| **Tipografia** | Google Fonts (Inter, Outfit) | Carregamento via `next/font` |
| **Tokens** | CSS Custom Properties | Paleta, espaçamento, raios, sombras |
| **Dark Mode** | `class` strategy (TailwindCSS) | Toggle via atributo `data-theme` |

### Hierarquia de Decisão de Estilo
```
1. Token do design-system existe? → Usar token
2. shadcn/ui tem componente? → Usar shadcn
3. Precisa de primitivo headless? → Usar Radix
4. É estilo one-off? → Usar TailwindCSS utility
5. É animação? → Ver stack de motion
```

### Convenções
```
ESTRUTURA DE COMPONENTE:
src/
  components/
    ui/        ← shadcn/ui (não editar diretamente)
    layout/    ← Header, Footer, Sidebar, Container
    sections/  ← Hero, Features, Pricing, FAQ, Proof
    blocks/    ← Cards, Modais, Alerts, Badges
    forms/     ← Inputs, Selects, Steps
    motion/    ← Componentes animados

REGRAS:
- Cada componente = 1 arquivo (exceto se >200 linhas)
- Props tipadas com TypeScript interface
- Variantes via cva() (class-variance-authority)
- Composição > herança
- Responsividade mobile-first
```

---

## 3. Motion / Animação / Cinematografia

### Stack de Motion (Decisão por Complexidade)

| Nível | Tecnologia | Quando Usar | Exemplos |
|-------|-----------|------------|---------|
| **Nível 1 — Micro** | CSS Transitions + TailwindCSS `animate-*` | Hover, focus, feedback básico | Botão hover, input focus, fade-in |
| **Nível 2 — UI** | **Motion (Framer Motion)** | AnimatePresence, layout animations, gestures | Modais, tabs, accordions, page transitions |
| **Nível 3 — Scroll** | Motion + **Lenis** | Scroll-linked, parallax, reveal | Hero parallax, section reveals, progress bars |
| **Nível 4 — Cinematic** | **GSAP** (GreenSock) | Timelines complexas, choreography, sequências | Hero animations, product demos, storytelling |
| **Nível 5 — Immersive** | **React Three Fiber** + GSAP | 3D, shaders, experiências imersivas | Hero 3D, product viewer, backgrounds |

### Detalhamento

#### CSS / TailwindCSS (Nível 1)
```
USAR PARA: hover, focus, active, transitions de cor/opacity/transform
NÃO USAR PARA: sequências, choreography, scroll-linked

CÓDIGO:
- TailwindCSS: transition-all duration-300 ease-out
- Custom: @keyframes com variáveis de timing do design-system
```

#### Motion / Framer Motion (Nível 2-3)
```
USAR PARA:
- AnimatePresence (montar/desmontar com animação)
- Layout animations (reflow animado)
- Scroll-triggered (useScroll, useTransform)
- Drag gestures
- Variants e stagger

NÃO USAR PARA:
- Timelines de 10+ segundos (usar GSAP)
- Animações 3D complexas (usar R3F)

PADRÕES:
- motion.div com initial/animate/exit
- Variants para estados
- useInView para scroll triggers
```

#### Lenis (Scroll)
```
USAR PARA:
- Smooth scroll nativo
- Scroll-linked animations
- Parallax
- Scroll progress

INTEGRAÇÃO:
- Lenis + Motion useScroll
- Lenis + GSAP ScrollTrigger (para cinematográficas)
```

#### GSAP (Nível 4)
```
USAR PARA:
- Timelines com 5+ elementos coordenados
- ScrollTrigger com choreography complexa
- Animações de texto (SplitText)
- Hero cinematográficas (20+ segundos)
- Sequências narrativas

NÃO USAR PARA:
- Interações simples de UI (Motion é suficiente)
- Hover/focus (CSS é suficiente)

PLUGINS AUTORIZADOS:
- ScrollTrigger (scroll-based)
- SplitText (animação de texto)
- DrawSVG (traçado de SVG)
- MorphSVG (morphing de formas)
- MotionPath (animação ao longo de path)
```

#### React Three Fiber (Nível 5)
```
USAR PARA:
- Hero sections com item 3D
- Product viewers / configuradores
- Backgrounds imersivos
- Experiências WebGL

NÃO USAR PARA:
- Funis simples (peso excessivo)
- Mobile-first com baixa largura de banda
- Quando performance é prioridade #1

BIBLIOTECAS AUXILIARES:
- @react-three/drei (helpers)
- @react-three/postprocessing (efeitos)
- leva (debug GUI)
- three.js (core)

REGRA DE PERFORMANCE:
- Sempre lazy load (<Suspense>)
- Canvas com frameloop="demand" se possível
- LOD (Level of Detail) para modelos
- Desabilitar em mobile <768px (fallback estático)
```

#### Rive (Alternativa)
```
USAR PARA:
- Ícones animados
- Ilustrações interativas
- Micro-animações de estado
- Quando designer entrega arquivo .riv

NÃO USAR PARA:
- Layout animations (Motion é melhor)
- Scroll-linked (GSAP/Motion são melhores)
```

---

## 4. 3D / Imersão

### Quando Entrar com 3D

| Cenário | 3D? | Justificativa |
|---------|-----|--------------|
| Hero de landing page premium | ✅ Se houver asset 3D | Impacto visual imediato |
| Product viewer (SaaS/físico) | ✅ | Interatividade diferenciada |
| Background imersivo | ✅ Com moderação | Apenas se não comprometer performance |
| Funil gamificado | ⚠️ Opcional | Depende do asset e do público |
| Dashboard | ❌ | Peso > valor |
| Mobile-first | ❌ Por default | Performance compromete UX |

### Stack 3D
```
React Three Fiber (R3F) → Three.js react-friendly
@react-three/drei → Helpers (OrbitControls, Environment, Text3D...)
@react-three/postprocessing → Bloom, Vignette, ChromaticAberration
Leva → Debug controls (dev only)
GLTF → Formato de modelo preferido (compacto)
```

---

## 5. Conteúdo / Edição / Colaboração

### Stack de Editor Rico

| Tecnologia | Quando Usar |
|-----------|------------|
| **Tiptap** | Editor rico in-app (SaaS, CMS, docs internos) |
| **MDX** | Conteúdo estático com componentes React (docs, blogs) |
| **Contentlayer / MDX** | Gestão de conteúdo em repo (docs, changelogs) |

### Tiptap — Quando Implementar
```
CASOS DE USO:
- Editor de copy dentro de SaaS
- Área de notas/comentários
- Builder de email/newsletter
- Documentação colaborativa

EXTENSÕES RECOMENDADAS:
- StarterKit (básico)
- Placeholder
- Highlight
- TaskList
- Link
- Image
- Typography
- Collaboration (Yjs para real-time)
```

---

## 6. Analytics / Tracking / Experimentação

### Stack de Mensuração

| Camada | Ferramenta | Função |
|--------|-----------|--------|
| **Tag Management** | GTM (Google Tag Manager) | Container central de tags |
| **Web Analytics** | GA4 (Google Analytics 4) | Tráfego, comportamento, conversão |
| **Ads Tracking** | Meta Pixel, Google Ads Tag | Atribuição de conversão |
| **Data Layer** | Custom (via skill tracking-implementation) | Eventos padronizados |
| **Heatmaps** | Microsoft Clarity (gratuito) | Heatmaps, session recordings |
| **Experimentação** | GrowthBook (open-source) ou Google Optimize successor | Feature flags, A/B tests |
| **Dashboards** | Supabase + dashboard custom | KPIs operacionais |

### Protocolo de Tracking
```
IMPLEMENTAÇÃO:
1. Data layer PRIMEIRO (via tracking-implementation)
2. GTM SEGUNDO (lê o data layer)
3. GA4 + Pixels VIA GTM (nunca diretamente no código)
4. Clarity tag VIA GTM
5. Eventos custom via dataLayer.push()

REGRA: Código JavaScript da aplicação NUNCA chama
ga(), fbq(), ou gtag() diretamente.
Tudo passa pelo data layer → GTM → plataformas.
```

---

## 7. Backend / Dados / Automação

### Decisão de Backend

| Cenário | Backend | Justificativa |
|---------|---------|---------------|
| **Produção (padrão)** | **Supabase (PostgreSQL)** | Backend real em produção. VPS / Ubuntu / Nginx. |
| **Quando precisar de real-time zero-config** | **Convex** (alternativa) | Para projetos específicos que justifiquem |
| **Quando precisar de SQL direto** | **Supabase** | PostgreSQL completo |
| **Quando precisar de RLS granular** | **Supabase** | RLS nativo do PostgreSQL |

### Stack Backend Oficial

| Camada | Primário | Alternativo | Quando Alternar |
|--------|---------|------------|----------------|
| **BaaS** | **Supabase** | Convex | Se real-time nativo for crítico |
| **Banco de dados** | PostgreSQL (via Supabase) | Convex (document-relational) | Projetos específicos |
| **Auth** | Supabase Auth | NextAuth.js / Clerk | Se não usar Supabase |
| **Storage** | Supabase Storage | Cloudflare R2 | Para CDN global |
| **Serverless functions** | Supabase Edge Functions | Next.js Route Handlers | Para lógica client-side |
| **Webhooks** | Supabase Edge Functions | n8n (self-hosted) | Para automações complexas |
| **Real-time** | Supabase Realtime | Convex (nativo) | Se zero-config real-time |
| **Email transacional** | Resend | SendGrid | Se precisar de templates visuais |
| **Pagamento** | Stripe | Hotmart API / Kiwify | Para infoprodutos BR |
| **Deploy** | **VPS (Ubuntu + Nginx)** | Vercel / Docker | Quando VPS não fizer sentido |

### Configuração Supabase Padrão
```
TABELAS CORE:
- profiles (extensão de auth.users)
- leads (captura de funil)
- events (tracking custom server-side)
- orders (checkout/pagamento)
- quiz_responses (funis gamificados)
- ab_tests (configuração de testes)
- ab_results (resultados)

RLS (Row Level Security): SEMPRE ativado
Realtime: Ativar apenas em tabelas que precisam
Edge Functions: Para webhooks e automações
```

### Convex — Quando Considerar
```
USAR CONVEX QUANDO:
- Projeto novo que precisa de real-time nativo
- App agentic-ready
- SaaS com ACID transactions críticas

NÃO USAR CONVEX QUANDO:
- Já está em Supabase (não migrar)
- SQL direto é requisito
- RLS granular é crítico
- Deploy é em VPS (Convex é cloud-only)
```

---

## Stack por Tipo de Projeto

### 1. Landing Page Premium

| Item | Stack |
|------|-------|
| **Framework** | Next.js (App Router, SSG) |
| **UI** | TailwindCSS + shadcn/ui |
| **Motion** | Motion (L1-L2) + GSAP (L4 para hero) + Lenis (scroll) |
| **3D** | R3F se houver asset 3D para hero |
| **Analytics** | GTM + GA4 + Meta Pixel + Clarity |
| **Backend** | Supabase (leads, quiz) |
| **Deploy** | Vercel |
| **Alternativa** | Astro (se performance pura for prioridade) |
| **Risco** | GSAP + R3F pode pesar em mobile |
| **Mitigação** | Desabilitar 3D em mobile, lazy load GSAP |

### 2. Funil Gamificado

| Item | Stack |
|------|-------|
| **Framework** | Next.js (App Router) |
| **UI** | TailwindCSS + shadcn/ui + custom gamification components |
| **Motion** | Motion (transitions, progress) + CSS (microinteractions) |
| **Gamificação** | Custom React hooks (XP, streaks, badges) |
| **Analytics** | GTM + GA4 + Supabase events (server-side) |
| **Backend** | Supabase (quiz, progress, leads, scores) |
| **Deploy** | VPS (Ubuntu + Nginx) |
| **Risco** | Complexidade de estado (múltiplos steps, branches) |
| **Mitigação** | Zustand para client state, Supabase para server state |

### 3. VSL / Páginas de Venda

| Item | Stack |
|------|-------|
| **Framework** | Next.js (SSG/ISR) |
| **UI** | TailwindCSS + custom sections |
| **Motion** | CSS (L1) + Motion (L2 para testimonials, counters) |
| **Vídeo** | Embed nativo (Vimeo/YouTube) ou player custom |
| **Analytics** | GTM + GA4 + Meta Pixel + video progress events |
| **Backend** | Supabase (leads) + Stripe/Hotmart (checkout) |
| **Deploy** | Vercel |
| **Alternativa** | HTML puro estático (para performance máxima) |
| **Risco** | Vídeo pesado impacta LCP |
| **Mitigação** | Lazy load video, poster image, preconnect cdn |

### 4. SaaS B2B

| Item | Stack |
|------|-------|
| **Framework** | Next.js (App Router, SSR) |
| **UI** | TailwindCSS + shadcn/ui + Radix UI |
| **Dados** | TanStack Query (fetching), Zustand (client state) |
| **Editor** | Tiptap (se precisar de rich text) |
| **Auth** | Supabase Auth (magic link + OAuth) |
| **Backend** | Supabase (PostgreSQL + RLS + Edge Functions) |
| **Pagamento** | Stripe (subscription) |
| **Deploy** | VPS (Ubuntu + Nginx) |
| **Risco** | Complexidade cresce rápido sem arquitetura |
| **Mitigação** | Feature-based folder structure, testes TDD |

### 5. Dashboard Interno

| Item | Stack |
|------|-------|
| **Framework** | Next.js (App Router) |
| **UI** | shadcn/ui + TailwindCSS |
| **Charts** | Recharts (React) ou Tremor (shadcn-like) |
| **Dados** | TanStack Query + Supabase real-time |
| **Tabelas** | TanStack Table |
| **Auth** | Supabase Auth |
| **Deploy** | VPS (Ubuntu + Nginx) |

### 6. Onboarding Mobile-First

| Item | Stack |
|------|-------|
| **Framework** | Next.js (PWA config) |
| **UI** | TailwindCSS + custom step components |
| **Motion** | Motion (page transitions, progress) |
| **Touch** | use-gesture (swipe, drag) |
| **State** | Zustand (client) + Supabase (server persistence) |
| **Backend** | Supabase (user progress) |
| **Risco** | Performance em devices low-end |
| **Mitigação** | SSG, minimal JS, lazy load |

### 7. App com Motion Premium

| Item | Stack |
|------|-------|
| **Framework** | Next.js |
| **Motion** | Lenis + GSAP + Motion (full stack de motion) |
| **Scroll** | ScrollTrigger (GSAP) + Lenis |
| **Text** | SplitText (GSAP) |
| **3D** | R3F (opcional, hero only) |
| **Risco** | Bundle size, performance |
| **Mitigação** | Dynamic imports, code splitting por rota |

### 8. Hero Cinematográfica

| Item | Stack |
|------|-------|
| **Framework** | Next.js |
| **Motion** | GSAP Timeline (core) + SplitText + DrawSVG |
| **Scroll** | Lenis + ScrollTrigger |
| **3D** | R3F com @react-three/postprocessing (se 3D) |
| **Vídeo** | MP4/WebM autoplay inline (se video-based) |
| **Risco** | LCP alto, TTI alto |
| **Mitigação** | Preload crítico, skeleton hero, above-fold critical CSS |

### 9. Projeto Leve (Performance)

| Item | Stack |
|------|-------|
| **Framework** | **Astro** (zero JS default) |
| **UI** | TailwindCSS (sem framework de componentes) |
| **Motion** | CSS only (L1) |
| **Interatividade** | Astro Islands (React parcial, lazy) |
| **Deploy** | Vercel ou Cloudflare Pages |
| **Ideal para** | Blog, docs, sites institucionais, SEO-focused |

### 10. Experiência Interativa Diferenciada

| Item | Stack |
|------|-------|
| **Framework** | Next.js |
| **Motion** | GSAP + Motion + Lenis (full stack) |
| **3D** | R3F + custom shaders |
| **Touch** | use-gesture |
| **Audio** | Howler.js ou Web Audio API |
| **Canvas** | HTML Canvas (para efeitos 2D custom) |
| **Ideal para** | Experiências tipo Apple.com, product launches, storytelling |
| **Risco** | Acessibilidade, performance mobile |
| **Mitigação** | Fallback estático, prefers-reduced-motion, mobile detection |

---

## Decisão Rápida

```
Preciso de... → Use...
Landing page simples → Next.js + Tailwind + Motion
Landing page WOW → Next.js + Tailwind + GSAP + Lenis + R3F
Funil com quiz → Next.js + Tailwind + shadcn + Supabase
SaaS → Next.js + Tailwind + shadcn + Supabase + Stripe
Dashboard → Next.js + shadcn + Recharts + Supabase
Blog/docs → Astro + Tailwind + MDX
Protótipo rápido → Vite + React + Tailwind
Hero cinematográfica → GSAP Timeline + Lenis + R3F (opcional)
Mobile-first → Next.js + Tailwind + Motion + PWA config
Deploy padrão → VPS + Ubuntu + Nginx
```

---

## MCP-First Development Workflow

> Fluxo oficial do Antigravity para desenvolvimento assistido por MCP.

### Fase 1 — Antes de Implementar (DOCS + UI)

```
1. CONTEXT7 → resolve("[nome-da-lib]")
   → Buscar documentação atualizada da lib/framework
   → OBRIGATÓRIO para toda lib externa

2. SHADCN MCP → search_components("[tipo]")
   → Verificar se componente existe no registry
   → Se existe: instalar e customizar
   → Se não: criar custom seguindo padrão shadcn (cva + Radix)
```

### Fase 2 — Durante Implementação (BACKEND + CODE)

```
3. SUPABASE MCP (padrão) ou Convex MCP (se projeto Convex)
   → Ler schema, tabelas e dados
   → Otimizar queries e RLS
   → Criar functions/edge functions
   → Debugging de dados

4. FILESYSTEM
   → Leitura/escrita de código
   → Gestão de arquivos de projeto
```

### Fase 3 — Antes de Deploy (VALIDATE)

```
5. TESTSPRITE → validate_flow("fluxo crítico")
   → Executar antes de qualquer deploy relevante
   → Validar formulários, quiz, checkout, onboarding
   → Se falhar: corrigir antes de prosseguir
```

### Fase 4 — Deploy (VPS)

```
6. Build local → pnpm build
7. Deploy para VPS via SSH/rsync/CI
8. Nginx reload se necessário
9. Verificar em produção
10. Registrar em memory/learnings/ se houver problemas
```

### Diagrama

```
 Context7 ─── shadcn MCP
    │              │
    ▼              ▼
[ PESQUISAR ] [ MONTAR UI ]
    │              │
    ▼              ▼
 Supabase/FS ── Implementar
    │              │
    ▼              ▼
 TestSprite ─── Validar
    │              │
    ▼              ▼
  Build ───── VPS (produção)
    │              │
    ▼              ▼
 Verificar ── memory/learnings/
```
