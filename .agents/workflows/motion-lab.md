---
description: "Workflow oficial para analisar, decompor, planejar e implementar animações, efeitos visuais e sistemas de motion premium. Use /motion-lab para criar hero animations, scroll effects, parallax, SVG motion, backgrounds animados, glow, gradients e experiências visuais de alto impacto."
---

# /motion-lab — Laboratório de Motion Premium

## Objetivo
Transformar referências visuais e intenções de motion em:
- lógica de movimento
- arquitetura de implementação
- plano técnico
- direção visual
- especificação pronta para execução

## Quando Usar
- Recriar ou adaptar motion de uma referência
- Criar animações premium em landing pages ou apps
- Analisar sites com animações avançadas
- Criar hero animations
- Criar fundos animados (gradients, particles, glow, mesh)
- Criar blocos com profundidade, loops, SVG, storytelling visual
- Elevar o nível de motion de interface existente
- Scroll-driven effects, parallax, sticky storytelling
- Component motion (cards, dashboards, pricing, onboarding)

---

## Skills

| Papel | Skill | Quando |
|-------|-------|--------|
| **Principal** | `motion-systems-architect` | Sempre |
| Apoio | `design-system` | Se definir tokens de motion |
| Apoio | `frontend-design` | Se implementar UI junto |
| Apoio | `ux-designer` | Se avaliar impacto em UX |
| Apoio | `behavioral-intelligence` | Se motion faz parte de mecanismo de conversão |
| Apoio | `product-intelligence` | Se precisar entender público/contexto antes |
| Apoio | `copywriting-engine` | Se copy integrar com motion (hero, CTA) |
| Apoio | `arquitetura` | Se houver complexidade técnica alta |

---

## Políticas MCP

### DOCS-FIRST (Context7)
Se usar Motion, GSAP, Lenis, SVG techniques, CSS avançado, shaders ou qualquer lib:
→ Context7 antes de implementar

### UI-FROM-REGISTRY-FIRST (shadcn MCP)
Se o bloco animado usar componentes base de UI:
→ shadcn MCP antes de criar do zero

### PERFORMANCE-FIRST
Sempre avaliar:
- custo de renderização
- impacto no mobile
- excesso de camadas
- necessidade real de GSAP (se Motion resolve, usar Motion)
- necessidade real de canvas/webgl (se CSS resolve, usar CSS)

### UX-FIRST
Sempre considerar:
- clareza da interface
- excesso de animação
- distração indevida
- reduced motion obrigatório
- ritmo da leitura
- função estratégica do efeito

---

# Método — 6 Etapas

## Etapa 1 — Entender Referência ou Objetivo

Interpretar:
- o que o usuário quer criar
- se existe referência visual (URL, screenshot, descrição)
- em qual contexto a animação será usada
- qual é o objetivo do efeito
- qual o nível de sofisticação esperado
- tipo: hero, background, section, card, CTA, dashboard, onboarding

Perguntas internas:
```txt
Que tipo de animação está sendo buscado?
Onde vai existir? [hero | seção | background | dashboard | onboarding | CTA | app]
Qual o objetivo do efeito?
É referência visual externa ou ideia original?
Qual o papel da animação na experiência?
```

Se referência visual existir:
```
→ Browser → abrir URL
→ Analisar: camadas, timing, triggers, profundidade, composição
→ Registrar: tipo de efeito, stack provável, complexidade
```

---

## Etapa 2 — Decompor o Efeito

Usando o método de 5 camadas do `motion-systems-architect`:

```
CAMADA 1 — TIPO: [entrada | loop | hover | scroll | parallax | ...] 
CAMADA 2 — FUNÇÃO: [atenção | premium | explicar | guiar | atmosfera | ...]
CAMADA 3 — ESTRATÉGIA: [público | contexto | funil | objetivo | conversão]
CAMADA 4 — ARQUITETURA: [stack | componentes | triggers | timing | easing]
CAMADA 5 — PERFORMANCE: [mobile | reduced-motion | GPU | LCP | CLS]
```

Quebrar em layers:
```
Layer 1 — Background: [o que acontece atrás]
Layer 2 — Content: [o que é o conteúdo principal]
Layer 3 — Overlay/Glow: [efeitos de sobreposição]
Layer 4 — Interactive: [o que responde ao usuário]
```

---

## Etapa 3 — Decidir Stack de Implementação

Seguir hierarquia do `motion-systems-architect`:

```
1. Motion (Framer Motion) → UI, gestures, layout, presence
2. SVG nativo → path, morphing, stroke, draw
3. TailwindCSS → transitions, transforms, delays
4. CSS custom → keyframes, gradients, masks, blur, glow
5. GSAP → APENAS coreografia avançada (ScrollTrigger, SplitText)
6. Shaders/Canvas/WebGL → APENAS quando necessário
```

**MCP obrigatório nesta etapa:**
→ Context7 para docs de toda lib escolhida

---

## Etapa 4 — Gerar Plano de Implementação

Entregar estrutura:

```
COMPONENTE: [nome]
STACK: [tecnologias]
ESTRUTURA:
  components/
    └── [ComponentName]/
        ├── index.tsx
        ├── motion-config.ts
        └── styles.css (se necessário)

ORDEM DE CONSTRUÇÃO:
  1. [Base estática do componente]
  2. [Layer de background/atmosfera]
  3. [Layer de conteúdo + animação de entrada]
  4. [Layer de interação (hover, scroll, click)]
  5. [Ajuste mobile + reduced motion]
  6. [Performance check]
```

---

## Etapa 5 — Validar Performance e UX

Checklist obrigatório:

```
□ Somente transform + opacity em animações frequentes
□ will-change aplicado apenas durante animação
□ Mobile adaptado (simplificado ou desabilitado)
□ prefers-reduced-motion implementado
□ LCP protegido (skeleton/fallback para hero)
□ CLS prevenido (espaço reservado)
□ Bundle otimizado (dynamic import para GSAP/R3F)
□ Target 60fps verificado
□ Animação tem função clara (não é decoração)
□ Não distrai do CTA ou objetivo principal
```

---

## Etapa 6 — Entregar Direção

Formato de saída:

### Bloco 1 — Diagnóstico
```
REFERÊNCIA: [URL ou descrição]
TIPO: [classificação]
FUNÇÃO: [propósito estratégico]
CONTEXTO: [público, funil, objetivo]
NÍVEL: [micro | ui | cinematic | system]
```

### Bloco 2 — Decomposição
```
LAYERS: [lista de camadas com técnica de cada]
TRIGGERS: [load | scroll | hover | click | viewport]
TIMING: [duração, delay, stagger]
EASING: [curvas]
DEPS: [libs necessárias]
```

### Bloco 3 — Plano Técnico
```
STACK: [com justificativa]
ESTRUTURA: [componentes]
ORDEM: [passos]
```

### Bloco 4 — Regras UX/Performance
```
MOBILE: [adaptação]
REDUCED-MOTION: [fallback]
PERFORMANCE: [cuidados]
LIMITES: [o que NÃO fazer]
```

### Bloco 5 — Saída
- Plano pronto para implementar
- OU código implementado
- OU especificação técnica para handoff

---

## Riscos e Fallbacks

| Risco | Fallback |
|-------|----------|
| Context7 indisponível | Buscar docs manualmente |
| GSAP muito pesado | Substituir por Motion + CSS |
| Efeito complexo demais para mobile | Versão estática + fade-in para mobile |
| Performance abaixo de 30fps | Simplificar camadas, remover particle/3D |
| Referência impossível de replicar | Adaptar o princípio visual, não a cópia exata |
| LCP impactado por hero animation | Skeleton + preload + lazy motion |

---

## Fluxo MCP

```
Context7 ─── shadcn MCP
   │              │
   ▼              ▼
[ DOCS ]    [ UI BASE ]
   │              │
   ▼              ▼
motion-systems-architect
   │
   ▼
[ DECOMPOR → PLANEJAR → IMPLEMENTAR ]
   │
   ▼
[ PERFORMANCE CHECK ]
   │
   ▼
[ ENTREGA ]
```

---

# Modo: Engenharia Reversa de Referência Visual

> Ativar quando o usuário fornecer uma referência externa (URL, screenshot, vídeo, descrição) e quiser entender, decompor e reconstruir o sistema de motion.

## Princípios

```
1. Não descrever só "o que parece" — explicar a LÓGICA do efeito.
2. Nunca copiar cegamente — reconstruir a linguagem e a mecânica.
3. Sempre identificar a função estratégica de cada animação.
4. Sempre considerar performance, mobile e reduced motion.
5. Sempre separar efeito principal de detalhe de apoio.
6. Sempre estimar nível de complexidade.
7. Sempre sugerir a stack mínima necessária.
8. Sempre pensar em sistema reutilizável.
```

## Método — 9 Etapas

### Etapa 1 — Diagnóstico da Referência

Analisar e classificar:

```
REFERÊNCIA: [URL, screenshot, descrição]
TIPO: [landing page | hero | bloco | app | dashboard | template | experiência]
ESTILO: [minimal | brutalist | glassmorphism | gradient-rich | 3D | editorial | ...]
SENSAÇÃO: [premium | tech | clean | bold | playful | corporate | ...]
SOFISTICAÇÃO: [básica | intermediária | avançada | cinematográfica]
ATMOSFERA: [depth | glow | grid | particles | gradient | blur | noise | ...]
```

### Etapa 2 — Função Estratégica

Para cada efeito identificado, responder:

```
POR QUE esse motion existe?
O QUE ele faz pela percepção da interface?
COMO ele contribui para: [experiência | branding | conversão | retenção | CTA]?
```

| Função | Exemplos Identificáveis |
|--------|------------------------|
| Atrair atenção | Hero entrance, badge float, counter up |
| Criar premium feel | Card hover glow, gradient shift, smooth transitions |
| Reforçar tecnologia | Grid perspective, data viz motion, orbit, glow |
| Explicar produto | Step reveal, feature animation, demo motion |
| Guiar leitura | Stagger sequences, scroll reveals, section transitions |
| Aumentar retenção | Loops, tickers, floating elements, micro-motions |
| Reforçar CTA | Pulse, glow, floating arrow, hover lift |
| Criar atmosfera | Background gradients, particles, noise, depth |
| Storytelling visual | Sticky sections, scroll-linked narrative, parallax |

### Etapa 3 — Decomposição em Camadas

Separar a referência em layers técnicos:

```
LAYER 0 — BASE/VIEWPORT: [cor de fundo, layout geral, overflow]
LAYER 1 — BACKGROUND: [gradients, mesh, noise, grid, particles]
LAYER 2 — ATMOSFERA: [glow orbs, blur zones, light effects]
LAYER 3 — UI BLOCKS: [cards, sections, containers, badges]
LAYER 4 — CONTEÚDO: [text, images, icons, illustrations, SVGs]
LAYER 5 — FOREGROUND: [floating elements, overlays, cursors]
LAYER 6 — INTERACTIVE: [hover states, click feedback, drag, scroll response]
LAYER 7 — FEEDBACK: [loading, success, error, transition states]
```

Para cada layer: identificar se é estático, animado (loop), triggered, ou linked.

### Etapa 4 — Tipos de Motion Identificados

Classificar cada motion encontrado:

| Tipo | O que observar |
|------|---------------|
| **Entrada** | Fade, slide, scale, clip-reveal, blur-in |
| **Loop** | Float, pulse, orbit, rotate, breathing |
| **Reveal** | Curtain, mask, clip-path transition, text split |
| **Hover** | Scale, lift, glow, underline draw, color shift |
| **Parallax** | Multi-layer speed differential, depth |
| **Scroll Trigger** | Reveal on viewport entry, counter, stagger |
| **Scroll Linked** | Progress bar, morph, pin+scrub, parallax |
| **Sticky** | Pinned section with scroll-driven content change |
| **Microinteração** | Button feedback, toggle, nav, tooltip |
| **SVG Motion** | Path draw, morph, stroke animation |
| **Dashboard Motion** | Chart entrance, metric counter, real-time pulse |
| **Background** | Gradient animation, particle field, mesh shift |

### Etapa 5 — Mecânica Técnica Provável

Inferir a implementação mais provável:

```
TRANSFORMS: translate, scale, rotate, skew
OPACITY: fade in/out, crossfade
LAYOUT: width/height (com cuidado), position changes
MASKS: mask-image, clip-path, overflow hidden
GRADIENTS: background animation, hue-rotate, color transition
SVG: path animation (stroke-dasharray), morphing, viewBox
SCROLL: IntersectionObserver, scroll event, ScrollTrigger
STICKY: position sticky + scroll progress
PSEUDO: ::before/::after para glow, borders, overlays
DEPTH: z-index layering, perspective, translateZ
BLUR/GLOW: filter blur, box-shadow, radial-gradient overlay
```

Para cada efeito, apontar:
- técnica CSS provável
- se precisa de JS (Motion/GSAP)
- se pode ser CSS-only
- complexidade estimada: [baixa | média | alta | muito alta]

### Etapa 6 — Stack Recomendada para Reconstrução

Traduzir para o stack real:

```
STACK REAL:
- React + TypeScript
- TailwindCSS
- Motion (Framer Motion)
- SVG nativo
- CSS custom (quando Tailwind não resolve)
- GSAP (apenas se coreografia avançada justificar)

DECISÃO POR EFEITO:
- Entrada/loop/hover simples → Motion
-Scroll reveal (viewport entry) → Motion useInView
- SVG path animation → SVG nativo + CSS ou Motion
- Gradient animado → CSS @keyframes
- Glow/blur → CSS (radial-gradient, filter, box-shadow)
- Parallax → Motion useScroll + useTransform
- Sticky storytelling → GSAP ScrollTrigger + pin
- Text split → GSAP SplitText (ou Motion com split manual)
- 3D/particles → Avaliar necessidade real (geralmente evitar)
```

### Etapa 7 — Plano de Reconstrução

```
COMPONENTES NECESSÁRIOS:
1. [ComponentName] → [o que faz] → [stack]
2. [ComponentName] → [o que faz] → [stack]
...

ORDEM DE IMPLEMENTAÇÃO:
1. Base estática (layout, cores, tipografia)
2. Background/atmosfera
3. Conteúdo + animações de entrada
4. Interações (hover, scroll)
5. Detalhes (micro-animações, loops)
6. Mobile adaptation
7. Reduced motion fallback
8. Performance check

DIVISÃO DESKTOP / MOBILE:
- Desktop: [efeito completo]
- Mobile: [versão simplificada — ex: sem parallax, sem particles]
```

### Etapa 8 — Cuidados de UX e Performance

```
RISCOS DE EXAGERO: [onde pode ser demais]
CUSTO DE RENDERIZAÇÃO: [efeitos mais pesados identificados]
POLUIÇÃO VISUAL: [onde simplificar]
REDUCED MOTION: [fallback para cada efeito: estático + fade-in]
MOBILE: [o que desabilitar ou simplificar]
LCP: [se hero tem motion, skeleton obrigatório]
CLS: [reservar espaço para animações de layout]
FPS TARGET: 60fps. Se <30fps → simplificar
BUNDLE: [dynamic import para GSAP/R3F se usados]
```

### Etapa 9 — Sistema Reutilizável

Avaliar se a referência pode gerar:

| Tipo | Quando virar sistema |
|------|---------------------|
| **Componente reutilizável** | Se o efeito aparece em múltiplos contextos |
| **Hero system** | Se a hero tem padrão replicável (entrance + background + content) |
| **Background system** | Se o fundo animado serve para múltiplas páginas |
| **Motion pattern** | Se o timing/easing/trigger pode ser tokenizado |
| **Bloco de biblioteca** | Se o componente animado cabe no catálogo de componentes |
| **Scroll system** | Se o scroll behavior é reutilizável (reveal, parallax, pin) |

Se sim → definir nome, props, variantes, e onde salvar em `src/components/`.

---

## Formato Obrigatório de Saída (Engenharia Reversa)

Sempre entregar as 9 seções:

```
### 1. Diagnóstico da Referência
### 2. Função Estratégica
### 3. Decomposição em Camadas
### 4. Tipos de Motion Identificados
### 5. Mecânica Técnica Provável
### 6. Stack Recomendada
### 7. Plano de Reconstrução
### 8. Cuidados de UX e Performance
### 9. Possível Transformação em Sistema Reutilizável
```

## Regras de Análise

```
1. Não descreva só "o que parece" — explique a lógica.
2. Vá além da estética — explique a mecânica.
3. Não copie — reconstrua linguagem e lógica.
4. Identifique função estratégica de cada animation.
5. Considere performance e mobile sempre.
6. Considere reduced motion sempre.
7. Separe efeito principal de detalhe de apoio.
8. Estime nível de complexidade.
9. Sugira stack mínima necessária.
10. Pense em sistema reutilizável quando possível.
```

---

# Modo: Especificação Direta para Implementação

> Ativar quando o usuário quiser transformar uma referência, ideia ou objetivo de motion em uma **especificação pronta para construção real** no stack do projeto.

## Stack Padrão

```
PRINCIPAL:
- React + TypeScript
- TailwindCSS (estrutura e styling)
- Motion / Framer Motion (engine de animação)
- SVG nativo (paths, formas, overlays, motion vetorial)
- CSS custom (blur, glow, mask, gradients, depth, pseudo-elements)

APENAS SE NECESSÁRIO:
- GSAP (coreografia avançada, ScrollTrigger, SplitText)
- Canvas/WebGL/Shaders (indispensável apenas)

MCPs:
- Context7 → antes de usar qualquer lib externa
- shadcn MCP → antes de criar UI base do zero
```

## Método — 10 Blocos

### Bloco 1 — Objetivo do Bloco Animado

```
O QUE É: [tipo de bloco — hero, section, card, background, CTA, dashboard]
ONDE VIVE: [posição na interface — above-fold, seção N, footer, overlay]
OBJETIVO VISUAL: [que sensação transmitir — premium, tech, clean, bold]
OBJETIVO ESTRATÉGICO: [atenção | premium | explicar | guiar | atmosfera | CTA]
FUNÇÃO DA ANIMAÇÃO: [por que animar e não deixar estático]
```

### Bloco 2 — Função Estratégica

Responder:
- Por que esse motion existe nesse contexto específico?
- Para quem? (público, temperatura do tráfego)
- Em que estágio do funil? (topo, meio, fundo, pós-compra)
- O que ele faz pela conversão?
- O que acontece se o efeito não existir? (se a resposta for "nada", repensar)

### Bloco 3 — Estrutura em Camadas

```
WRAPPER: [container principal, overflow, position]
├── LAYER 0 — BASE: [cor, layout, viewport constraints]
├── LAYER 1 — BACKGROUND: [gradients, mesh, noise, grid]
├── LAYER 2 — ATMOSFERA: [glow orbs, blur, light effects, depth]
├── LAYER 3 — TEXTURA: [grid overlay, dot pattern, noise, grain]
├── LAYER 4 — CONTEÚDO: [text, images, cards, UI blocks]
├── LAYER 5 — OVERLAY: [masks, fades, gradient edges]
├── LAYER 6 — FOREGROUND: [floating elements, badges, particles]
└── LAYER 7 — INTERACTIVE: [hover zones, scroll triggers, click areas]
```

Para cada layer: estático | animado (loop) | triggered | scroll-linked

### Bloco 4 — Componentes Necessários

```
COMPONENTES:
1. [ComponentName]
   - função: [o que faz]
   - reutilizável: [sim/não]
   - props: [principais props]
   - stack: [Motion | CSS | SVG | GSAP]

2. [ComponentName]
   - função: [...]
   ...

COMPONENTES INTERNOS (não exportados):
- [nome] → [função]

COMPONENTES REUTILIZÁVEIS (exportar):
- [nome] → [onde reutilizar]
```

### Bloco 5 — Stack de Implementação

Para cada parte do efeito, definir a tecnologia:

```
[Efeito/Parte]          → [Tecnologia]      → [Justificativa]
Background gradient     → CSS @keyframes     → Leve, sem JS
Glow orbs flutuantes    → Motion animate     → Loop suave com spring
Entrada de conteúdo     → Motion variants    → Stagger + fade + slide
SVG connector lines     → SVG nativo + CSS   → stroke-dasharray
Card hover              → Motion whileHover   → Scale + glow
Scroll reveal           → Motion useInView   → Trigger no viewport
Parallax                → Motion useScroll   → Transform vinculado
Sticky storytelling     → GSAP ScrollTrigger → Pin + scrub (Motion não resolve)
Text split              → GSAP SplitText     → Ou split manual + Motion
```

Sempre justificar quando GSAP for escolhido em vez de Motion.

### Bloco 6 — Lógica da Animação

```
ESTADOS:
- hidden: [estado inicial antes de entrar]
- visible: [estado final após entrada]
- hover: [estado durante hover]
- scroll: [estado vinculado ao scroll progress]
- loop: [estado contínuo, repetição infinita]

ELEMENTOS QUE ENTRAM:
- [elemento] → [tipo: fade | slide | scale | clip] → [delay: Xms]

ELEMENTOS EM LOOP:
- [elemento] → [tipo: float | pulse | rotate | orbit] → [duração: Xs]

ELEMENTOS SCROLL-TRIGGERED:
- [elemento] → [trigger: viewport entry] → [animação]

ELEMENTOS SCROLL-LINKED:
- [elemento] → [vínculo: scroll 0-1] → [transform]

ELEMENTOS HOVER:
- [elemento] → [efeito: scale | glow | lift] → [duração: Xms]

ORQUESTRAÇÃO:
- [ordem de aparição dos elementos]
- [stagger entre grupos]
- [delays relativos]
```

### Bloco 7 — Comportamento Responsivo

```
DESKTOP (≥1024px):
- [efeito completo conforme spec]

TABLET (768–1023px):
- [o que manter]
- [o que simplificar]

MOBILE (<768px):
- [o que manter] (entradas, fades)
- [o que remover] (parallax, particles, 3D, blur pesado)
- [o que substituir] (parallax → scroll reveal simples)
- [como preservar impacto] (gradients, glow leve, timing)
```

### Bloco 8 — Cuidados de UX e Acessibilidade

```
REDUCED MOTION:
- prefers-reduced-motion → [fallback: estático + opacity transition]
- Hook: useReducedMotion() → desabilitar transforms, manter fades

LEGIBILIDADE:
- [riscos de contraste com backgrounds animados]
- [garantir text-shadow ou backdrop-blur se necessário]

DISTRAÇÃO:
- [risco de overload — onde limitar]
- [hierarquia: motion principal vs apoio]

CARGA VISUAL:
- [máximo de elementos animados simultâneos: 3-5]
- [loops devem ser sutis, não agressivos]
```

### Bloco 9 — Cuidados de Performance

```
GPU: transform + opacity ONLY para animações frequentes
WILL-CHANGE: aplicar durante animação, remover depois
REFLOW: NUNCA animar width, height, top, left, margin, padding
BLUR: máx 1-2 blur layers simultâneos (filter blur é caro)
LAYERS: máx 5-7 layers compostas (mais = GPU overload)
BUNDLE: dynamic import para GSAP/R3F (code splitting)
LCP: skeleton/fallback para hero (animação NÃO bloqueia LCP)
CLS: reservar espaço para elementos animados
FPS: target 60fps. Se <30fps → simplificar
LAZY: intersection observer para montar animações off-screen
```

### Bloco 10 — Ordem de Implementação

```
FASE 1 — ESTRUTURA:
  1. Criar componente wrapper com layout estático
  2. Definir layers (background, content, overlay)
  3. Aplicar Tailwind para spacing, colors, typography

FASE 2 — BACKGROUND/ATMOSFERA:
  4. Implementar background system (gradient, glow, grid)
  5. Adicionar atmosfera (orbs, blur, noise)

FASE 3 — CONTEÚDO + ENTRADA:
  6. Implementar Motion variants (hidden → visible)
  7. Configurar stagger e delays
  8. Adicionar SVG se necessário (paths, connectors)

FASE 4 — INTERAÇÃO:
  9. Implementar hover effects
  10. Implementar scroll triggers / scroll-linked
  11. Implementar loops sutis

FASE 5 — RESPONSIVO:
  12. Adaptar mobile (simplificar layers)
  13. Implementar reduced motion fallback

FASE 6 — POLISH:
  14. Performance check (DevTools → Performance tab)
  15. Ajuste fino de timing, easing, delays
  16. Revisar contraste e legibilidade
```

---

## Formato Obrigatório de Saída (Especificação Direta)

Sempre entregar os 10 blocos + spec final:

```
### 1. Objetivo do Bloco
### 2. Função Estratégica
### 3. Estrutura em Camadas
### 4. Componentes Necessários
### 5. Stack de Implementação
### 6. Lógica da Animação
### 7. Comportamento Responsivo
### 8. Cuidados de UX e Acessibilidade
### 9. Cuidados de Performance
### 10. Ordem de Implementação
### 11. Especificação Final Pronta para Execução
```

O Bloco 11 (Especificação Final) deve ser um resumo executivo que pode ser:
- usado como prompt técnico para construir o bloco
- passado para um agent executor (frontend-design, motion-architect)
- transformado em task implementável
- convertido em componente da biblioteca

## Regras

```
1. Não responder apenas com descrição visual — entregar arquitetura.
2. Transformar toda referência em spec implementável.
3. Nunca exagerar na stack se o efeito puder ser mais simples.
4. Priorizar clareza, manutenção e performance.
5. Sempre considerar mobile.
6. Sempre considerar reduced motion.
7. Sempre considerar função estratégica.
8. Não copiar — reconstruir lógica.
9. Pensar em reutilização.
10. Entregar instruções práticas.
```
