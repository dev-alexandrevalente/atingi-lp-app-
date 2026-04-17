# 📦 Biblioteca de Componentes — Antigravity

> Catálogo oficial de componentes reutilizáveis por categoria.
> Stack base: Next.js + TailwindCSS + shadcn/ui + Motion

---

## Estrutura de Diretórios

```
src/components/
├── ui/              ← shadcn/ui primitivos (não editar diretamente)
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   └── ...
├── layout/          ← Estrutura de página
│   ├── header.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   ├── container.tsx
│   └── page-wrapper.tsx
├── sections/        ← Blocos de página (landing page / funil)
│   ├── hero/
│   ├── features/
│   ├── pricing/
│   ├── proof/
│   ├── faq/
│   ├── cta/
│   ├── comparison/
│   └── how-it-works/
├── blocks/          ← Elementos visuais reutilizáveis
│   ├── card.tsx
│   ├── badge.tsx
│   ├── alert.tsx
│   ├── modal.tsx
│   ├── toast.tsx
│   ├── counter.tsx
│   └── stat.tsx
├── forms/           ← Input e multi-step
│   ├── step-form.tsx
│   ├── quiz-step.tsx
│   ├── select-card.tsx
│   └── progress-bar.tsx
├── motion/          ← Componentes animados
│   ├── fade-in.tsx
│   ├── slide-up.tsx
│   ├── stagger.tsx
│   ├── parallax.tsx
│   ├── counter-animation.tsx
│   └── scroll-reveal.tsx
├── gamification/    ← Elementos de gamificação
│   ├── xp-bar.tsx
│   ├── badge-display.tsx
│   ├── streak-counter.tsx
│   ├── level-indicator.tsx
│   └── reward-reveal.tsx
├── feedback/        ← Estados de feedback
│   ├── loading-skeleton.tsx
│   ├── empty-state.tsx
│   ├── error-state.tsx
│   ├── success-state.tsx
│   └── spinner.tsx
└── navigation/      ← Navegação
    ├── navbar.tsx
    ├── mobile-menu.tsx
    ├── breadcrumb.tsx
    ├── floating-cta.tsx
    └── scroll-progress.tsx
```

---

## Catálogo por Grupo

### 🏠 Sections (Blocos de Página)

| Componente | Função | Quando Usar | Complexidade | Dependências |
|-----------|--------|------------|-------------|-------------|
| `hero/hero-centered` | Hero com título centralizado + CTA | Landing pages, páginas de produto | Média | Motion, Lenis (se parallax) |
| `hero/hero-split` | Hero com texto esquerda + visual direita | SaaS, apps | Média | Motion |
| `hero/hero-cinematic` | Hero com animação GSAP timeline | Páginas premium WOW | Alta | GSAP, Lenis, opcionalmente R3F |
| `hero/hero-video` | Hero com vídeo em background ou inline | VSL, páginas de venda | Média | Player de vídeo |
| `features/feature-grid` | Grid de features com ícones | SaaS, produto | Baixa | Lucide icons |
| `features/feature-bento` | Bento grid assimétrico | Landing pages premium | Média | — |
| `features/feature-tabs` | Features alternadas por tab/click | SaaS com muitas features | Média | Radix Tabs, Motion |
| `pricing/pricing-cards` | 2-3 cards de planos com destaque | Checkout, SaaS | Média | shadcn Card |
| `pricing/pricing-comparison` | Tabela comparativa de planos | SaaS com múltiplos tiers | Alta | TanStack Table |
| `pricing/pricing-single` | Preço único com stack de valor | Infoprodutos, ofertas | Média | — |
| `proof/testimonials-grid` | Grid de depoimentos (texto) | Prova social | Baixa | — |
| `proof/testimonials-carousel` | Carrossel de depoimentos | Prova social compacta | Média | Motion |
| `proof/logo-bar` | Barra de logos de clientes | B2B, autoridade | Baixa | — |
| `proof/stats-counter` | Contadores animados (1000+) | Impacto numérico | Média | Motion, useInView |
| `proof/case-study` | Card de case study expandível | B2B, resultados | Média | — |
| `faq/faq-accordion` | FAQ com accordion | Toda página de venda | Baixa | Radix Accordion |
| `cta/cta-banner` | Faixa de CTA com urgência | Meio/final de página | Baixa | — |
| `cta/cta-floating` | Botão flutuante que aparece ao scrollar | Conversão persistente | Média | scroll observer |
| `cta/cta-sticky-bar` | Barra fixa no bottom com CTA | Mobile conversão | Baixa | — |
| `comparison/before-after` | Comparação visual antes/depois | Transformação | Média | — |
| `comparison/vs-table` | Tabela nós vs concorrentes | Diferenciação | Média | — |
| `how-it-works/steps-vertical` | Steps verticais numerados | Explicar processo | Baixa | — |
| `how-it-works/steps-horizontal` | Steps horizontais com ícones | Onboarding, guia | Baixa | — |

### 🧱 Blocks (Elementos Visuais)

| Componente | Função | Complexidade |
|-----------|--------|-------------|
| `card` | Card universal com variantes (flat, elevated, glass) | Baixa |
| `badge` | Labels de status, tags, categorias | Baixa |
| `alert` | Mensagens de contexto (info, success, warning, error) | Baixa |
| `modal` | Dialog modal com AnimatePresence | Média |
| `toast` | Notificações temporárias | Média |
| `counter` | Número animado (contagem até alvo) | Média |
| `stat` | Métrica com label + valor + indicador | Baixa |

### 📝 Forms

| Componente | Função | Complexidade |
|-----------|--------|-------------|
| `step-form` | Formulário multi-step com progresso | Alta |
| `quiz-step` | Step de quiz com opções selecionáveis | Média |
| `select-card` | Card clicável para seleção (quiz estilo) | Média |
| `progress-bar` | Barra de progresso animada | Baixa |

### 🎬 Motion

| Componente | Função | Complexidade |
|-----------|--------|-------------|
| `fade-in` | Wrapper que faz fade-in ao entrar no viewport | Baixa |
| `slide-up` | Wrapper que desliza de baixo ao entrar | Baixa |
| `stagger` | Container que anima children com delay sequencial | Média |
| `parallax` | Elemento com parallax no scroll | Média |
| `counter-animation` | Número que conta de 0 até N | Média |
| `scroll-reveal` | Reveal progressivo de seção | Média |

### 🎮 Gamification

| Componente | Função | Complexidade |
|-----------|--------|-------------|
| `xp-bar` | Barra de XP com nível atual/próximo | Média |
| `badge-display` | Grid de badges conquistados | Baixa |
| `streak-counter` | Contador de sequência com flame emoji | Média |
| `level-indicator` | Indicador visual de nível com progresso | Média |
| `reward-reveal` | Revelação de recompensa com animação | Alta |

### 💬 Feedback

| Componente | Função | Complexidade |
|-----------|--------|-------------|
| `loading-skeleton` | Placeholder animado durante loading | Baixa |
| `empty-state` | Estado vazio com motivação e CTA | Baixa |
| `error-state` | Tela de erro com ação de recovery | Baixa |
| `success-state` | Confirmação com celebração (confetti) | Média |
| `spinner` | Spinner genérico com variantes de tamanho | Baixa |

### 🧭 Navigation

| Componente | Função | Complexidade |
|-----------|--------|-------------|
| `navbar` | Navbar responsiva com collapse mobile | Média |
| `mobile-menu` | Menu fullscreen mobile com animação | Média |
| `breadcrumb` | Breadcrumb com ícones | Baixa |
| `floating-cta` | CTA que aparece após scroll threshold | Média |
| `scroll-progress` | Barra de progresso do scroll | Baixa |

---

## Regras de Desenvolvimento

```
1. CADA COMPONENTE:
   - Props tipadas com TypeScript interface
   - Variantes via cva() (class-variance-authority)
   - Composição via slot pattern (asChild quando aplicável)
   - Suporte a className customizado
   - Responsive por default (mobile-first)
   - Acessível por default (aria, roles, keyboard)

2. NOMES:
   - Arquivo: kebab-case.tsx
   - Export: PascalCase
   - Props: ComponentNameProps

3. DEPENDÊNCIAS:
   - Minimizar dependências por componente
   - Sempre documentar dependências no header do arquivo
   - Preferir composição a props complexas
```
