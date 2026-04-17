# 🎨 Design System — SaaS Interface (Next.js + Tailwind)

**Stack alvo:** Next.js 14+ (App Router) · TailwindCSS · TypeScript  
**Objetivo:** Padrão único de UI/UX para construção de interfaces SaaS consistentes, limpas e profissionais.  
**Regra de ouro:** Fidelidade visual > criatividade. Siga este documento como fonte única de verdade.

**Versão:** 1.0  
**Última atualização:** 2026-04-16  
**Mantenedor:** Alexandre

---

## 📌 Princípios de Design

1. **Layout limpo** — zero poluição visual, componentes respiram.
2. **Muito espaço em branco** — whitespace é feature, não bug.
3. **Hierarquia clara** — tamanhos, pesos e cores guiam o olhar.
4. **Uso mínimo de cor** — verde (#16C47F) APENAS para destaque e ação.
5. **Legibilidade acima de tudo** — contraste AA mínimo, fontes generosas.
6. **Consistência total** — nunca invente cores, tamanhos ou estilos fora do padrão.
7. **Mobile-first** — toda interface começa no mobile e escala.
8. **Acessibilidade nativa** — focus states, aria-labels, contraste e navegação por teclado.

---

## 🎨 Paleta de Cores

### Primary (Verde — ação/destaque)

| Token            | HEX       | Uso                           |
| ---------------- | --------- | ----------------------------- |
| `primary`        | `#16C47F` | Base — CTAs, links, destaques |
| `primary-hover`  | `#13A96D` | Hover em botões primários     |
| `primary-active` | `#0F8A59` | Estado pressionado            |
| `primary-soft`   | `#E6F9F1` | Backgrounds suaves, tags      |

### Texto

| Token            | HEX       | Uso                                  |
| ---------------- | --------- | ------------------------------------ |
| `text-primary`   | `#1C1C1C` | Títulos e texto principal            |
| `text-secondary` | `#6B7280` | Subtítulos, descrições               |
| `text-muted`     | `#9CA3AF` | Texto leve, placeholders             |
| `text-inverse`   | `#FFFFFF` | Texto sobre fundos escuros/coloridos |

### Background

| Token        | HEX       | Uso                                     |
| ------------ | --------- | --------------------------------------- |
| `bg-base`    | `#F9FAFB` | Fundo principal da aplicação            |
| `bg-surface` | `#FFFFFF` | Seções, cards, modais                   |
| `bg-soft`    | `#F3F4F6` | Áreas secundárias, inputs desabilitados |
| `bg-dark`    | `#111827` | Seções premium/contraste                |

### Bordas

| Token           | HEX       | Uso              |
| --------------- | --------- | ---------------- |
| `border-base`   | `#E5E7EB` | Cards, divisores |
| `border-input`  | `#D1D5DB` | Inputs, selects  |
| `border-strong` | `#9CA3AF` | Hover em bordas  |

### Status

| Token     | HEX       | Uso                  |
| --------- | --------- | -------------------- |
| `success` | `#22C55E` | Sucesso, confirmação |
| `warning` | `#F59E0B` | Alertas, atenção     |
| `danger`  | `#EF4444` | Erro, destrutivo     |
| `info`    | `#3B82F6` | Informação neutra    |

### Accent

| Token         | HEX       | Uso                                     |
| ------------- | --------- | --------------------------------------- |
| `accent`      | `#7C3AED` | Destaque secundário (ex: premium, novo) |
| `accent-soft` | `#EDE9FE` | Background de badges accent             |

---

## 🔤 Tipografia

### Fonte

- **Família primária:** `Poppins`, sans-serif
- **Fallback:** `-apple-system`, `system-ui`, `Segoe UI`, `Roboto`, sans-serif
- **Pesos disponíveis:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Escala Tipográfica

| Token     | Tamanho | Peso | Line-height | Uso                  |
| --------- | ------- | ---- | ----------- | -------------------- |
| `h1`      | 48px    | 600  | 120%        | Headlines principais |
| `h2`      | 36px    | 600  | 125%        | Títulos de seção     |
| `h3`      | 28px    | 600  | 130%        | Subtítulos           |
| `h4`      | 20px    | 600  | 140%        | Títulos de cards     |
| `body-lg` | 18px    | 500  | 150%        | Texto destaque       |
| `body`    | 16px    | 400  | 150%        | Texto padrão         |
| `body-sm` | 14px    | 400  | 150%        | Texto auxiliar       |
| `label`   | 12px    | 500  | 140%        | Labels, tags         |

### Regras Tipográficas

- Nunca use tamanhos fora da escala.
- Títulos sempre com `tracking-tight` (`letter-spacing: -0.02em`).
- Parágrafos sempre com `max-width` entre `60ch` e `75ch` para legibilidade.

---

## 📏 Espaçamento

**Base:** 8px  
**Escala:** `4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128`

### Tailwind Mapping

| Valor | Tailwind |
| ----- | -------- |
| 4px   | `1`      |
| 8px   | `2`      |
| 16px  | `4`      |
| 24px  | `6`      |
| 32px  | `8`      |
| 48px  | `12`     |
| 64px  | `16`     |
| 96px  | `24`     |
| 128px | `32`     |

### Seções

- **Padding top/bottom:** `80px` (desktop) / `48px` (mobile)
- **Gap entre blocos:** `32px` a `48px`

### Container

- **Max-width:** `1200px`
- **Padding lateral:** `24px` (mobile) / `32px` (desktop)
- **Centralização:** `mx-auto`

---

## 🔘 Botões

### Primary

```css
background: #16C47F
color: #FFFFFF
padding: 14px 24px
border-radius: 8px
font-weight: 600
font-size: 16px
transition: all 200ms ease
hover: #13A96D + shadow-md
active: #0F8A59
focus: ring-2 ring-primary/40
```

### CTA (hero/destaque)

```css
padding: 16px 28px
font-size: 18px
font-weight: 600
/* Demais regras: iguais ao Primary */
```

### Secondary

```css
background: transparent
border: 1px solid #E5E7EB
color: #1C1C1C
padding: 14px 24px
border-radius: 8px
hover: border-color #16C47F + color #16C47F
```

### Ghost

```css
background: transparent
color: #6B7280
padding: 10px 16px
hover: bg #F3F4F6
```

### Danger

```css
background: #EF4444
color: #FFFFFF
hover: #DC2626
```

### Estados Obrigatórios

- `default` · `hover` · `active` · `focus` · `disabled` (opacity 50%, cursor not-allowed) · `loading` (spinner + texto)

---

## 🗂️ Cards

### Base

```css
background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 12px
padding: 24px
box-shadow: 0 10px 30px rgba(0,0,0,0.05)
transition: all 200ms ease
```

### Variações

- **Interactive:** hover com `translate-y-[-2px]` + `shadow-lg`.
- **Outlined:** sem sombra, apenas borda.
- **Elevated:** `shadow-xl`, sem borda.
- **Flat:** `bg-bg-soft`, sem borda e sem sombra.

### Estrutura Recomendada

```
Card
├── CardHeader (ícone + título)
├── CardBody (conteúdo)
└── CardFooter (ações, opcional)
```

---

## 📝 Inputs & Forms

### Input Base

```css
height: 48px
padding: 12px 16px
border: 1px solid #D1D5DB
border-radius: 8px
background: #FFFFFF
font-size: 16px
color: #1C1C1C
placeholder: #9CA3AF
transition: border-color 150ms ease
focus: border #16C47F + ring 3px rgba(22,196,127,0.15)
error: border #EF4444
disabled: bg #F3F4F6, cursor not-allowed
```

### Label

- 14px / 500 / cor `#1C1C1C`
- Margem inferior: `8px`
- Obrigatório marcar campos required com `*` em `#EF4444`

### Helper Text

- 12px / 400 / cor `#6B7280`
- Margem superior: `6px`

### Estados

- `default` · `hover` · `focus` · `filled` · `error` (mensagem em `#EF4444`) · `success` · `disabled`

---

## 🎯 Ícones

- **Estilo:** Outline (recomendado: `lucide-react` ou `heroicons/outline`)
- **Tamanhos:** 16px (`w-4 h-4`) / 20px (`w-5 h-5`) / 24px (`w-6 h-6`) / 32px (`w-8 h-8`)
- **Cor padrão:** `#6B7280`
- **Cor ativa/destaque:** `#16C47F`
- **Stroke-width:** 1.5 (padrão) / 2 (destaque)
- **Acessibilidade:** sempre `aria-label` quando ícone for interativo isolado.

---

## 🌀 Bordas, Sombras e Raios

### Border-radius

| Token  | Valor  | Uso                  |
| ------ | ------ | -------------------- |
| `sm`   | 4px    | Tags, chips          |
| `md`   | 8px    | Botões, inputs       |
| `lg`   | 12px   | Cards                |
| `xl`   | 16px   | Modais               |
| `2xl`  | 24px   | Containers especiais |
| `full` | 9999px | Avatars, pills       |

### Sombras

| Token          | Valor                              |
| -------------- | ---------------------------------- |
| `shadow-sm`    | `0 1px 2px rgba(0,0,0,0.04)`       |
| `shadow-md`    | `0 4px 12px rgba(0,0,0,0.06)`      |
| `shadow-lg`    | `0 10px 30px rgba(0,0,0,0.05)`     |
| `shadow-xl`    | `0 20px 50px rgba(0,0,0,0.08)`     |
| `shadow-green` | `0 8px 24px rgba(22,196,127,0.25)` |
| `shadow-none`  | `none`                             |

---

## ⚡ Animações e Transições

- **Duração padrão:** `200ms`
- **Easing padrão:** `cubic-bezier(0.4, 0, 0.2, 1)` (`ease-in-out`)
- **Hover em cards:** `translate-y-[-2px]` + sombra mais forte
- **Fade-in de seções:** `opacity 0 → 1` em `400ms` com `IntersectionObserver`
- **Respeitar `prefers-reduced-motion`:** sempre!
- **Evitar:** animações longas (>400ms), bounce excessivo, parallax agressivo.

---

## 📱 Breakpoints (Tailwind Padrão)

| Token | Largura | Dispositivo      |
| ----- | ------- | ---------------- |
| `sm`  | 640px   | Mobile landscape |
| `md`  | 768px   | Tablet           |
| `lg`  | 1024px  | Desktop          |
| `xl`  | 1280px  | Desktop grande   |
| `2xl` | 1536px  | Monitor ultra    |

**Regra:** Mobile-first sempre. Escreva o estilo base para mobile e adicione `md:` / `lg:` conforme necessário.

---

## 🧩 Grid & Layout

### Container Padrão

```tsx
<div className="mx-auto max-w-[1200px] px-6 lg:px-8">{/* conteúdo */}</div>
```

### Grid Padrão para Features

- **Mobile:** `grid-cols-1`
- **Tablet:** `md:grid-cols-2`
- **Desktop:** `lg:grid-cols-3` ou `lg:grid-cols-4`
- **Gap:** `gap-6` (24px) ou `gap-8` (32px)

### Flex Patterns

- `flex items-center justify-between` para headers
- `flex flex-col gap-4` para stacks verticais

---

## ⚙️ Configuração Tailwind

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16C47F",
          hover: "#13A96D",
          active: "#0F8A59",
          soft: "#E6F9F1",
        },
        text: {
          primary: "#1C1C1C",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          inverse: "#FFFFFF",
        },
        bg: {
          base: "#F9FAFB",
          surface: "#FFFFFF",
          soft: "#F3F4F6",
          dark: "#111827",
        },
        border: {
          base: "#E5E7EB",
          input: "#D1D5DB",
          strong: "#9CA3AF",
        },
        status: {
          success: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#3B82F6",
        },
        accent: {
          DEFAULT: "#7C3AED",
          soft: "#EDE9FE",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Poppins",
          "sans-serif",
        ],
      },
      fontSize: {
        h1: [
          "48px",
          { lineHeight: "120%", fontWeight: "600", letterSpacing: "-0.02em" },
        ],
        h2: [
          "36px",
          { lineHeight: "125%", fontWeight: "600", letterSpacing: "-0.02em" },
        ],
        h3: [
          "28px",
          { lineHeight: "130%", fontWeight: "600", letterSpacing: "-0.02em" },
        ],
        h4: [
          "20px",
          { lineHeight: "140%", fontWeight: "600", letterSpacing: "-0.02em" },
        ],
        "body-lg": ["18px", { lineHeight: "150%", fontWeight: "500" }],
        body: ["16px", { lineHeight: "150%", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "150%", fontWeight: "400" }],
        label: ["12px", { lineHeight: "140%", fontWeight: "500" }],
      },
      maxWidth: {
        container: "1200px",
      },
      width: {
        icon: "1rem",
        "icon-md": "1.25rem",
        "icon-lg": "1.5rem",
      },
      height: {
        icon: "1rem",
        "icon-md": "1.25rem",
        "icon-lg": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 12px rgba(0,0,0,0.06)",
        lg: "0 10px 30px rgba(0,0,0,0.05)",
        xl: "0 20px 50px rgba(0,0,0,0.08)",
        green: "0 8px 24px rgba(22,196,127,0.25)",
        none: "none",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
```

### `app/layout.tsx` (Carregar Poppins)

```typescript
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-sans bg-bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
```

### `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family:
      var(--font-poppins),
      -apple-system,
      system-ui,
      sans-serif;
  }

  h1,
  h2,
  h3,
  h4 {
    letter-spacing: -0.02em;
  }
}

@layer components {
  .container-page {
    @apply mx-auto max-w-container px-6 lg:px-8;
  }

  .section {
    @apply py-12 md:py-20;
  }

  .prose {
    @apply max-w-[70ch];
  }

  /* Buttons */
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-hover active:bg-primary-active focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40;
  }

  .btn-cta {
    @apply inline-flex items-center justify-center rounded-md bg-primary px-7 py-4 text-body-lg font-semibold text-white shadow-green transition-all duration-200 hover:bg-primary-hover active:bg-primary-active focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center rounded-md border border-border-base bg-transparent px-6 py-3.5 text-base font-semibold text-text-primary transition-all duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2.5 text-base font-medium text-text-secondary transition-all duration-200 hover:bg-bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40;
  }

  .btn-danger {
    @apply inline-flex items-center justify-center rounded-md bg-status-danger px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40;
  }

  /* Cards */
  .card {
    @apply rounded-lg border border-border-base bg-bg-surface p-6 shadow-lg transition-all duration-200;
  }

  .card-hover {
    @apply hover:-translate-y-0.5 hover:shadow-xl;
  }

  .card-outlined {
    @apply rounded-lg border border-border-base bg-bg-surface p-6;
  }

  .card-flat {
    @apply rounded-lg bg-bg-soft p-6;
  }

  /* Forms */
  .input-base {
    @apply h-12 w-full rounded-md border border-border-input bg-white px-4 text-base text-text-primary placeholder:text-text-muted transition-colors duration-150 focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15;
  }

  .input-error {
    @apply border-status-danger focus-visible:ring-red-100;
  }

  .input-success {
    @apply border-status-success focus-visible:ring-green-100;
  }

  .label-base {
    @apply mb-2 block text-label font-medium text-text-primary;
  }

  .helper-text {
    @apply mt-1.5 text-xs text-text-secondary;
  }

  .error-text {
    @apply mt-1.5 text-xs text-status-danger;
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

---

## 🧱 Estrutura de Pastas (Next.js)

```
app/
├── (marketing)/
│   ├── page.tsx              → Landing page
│   └── layout.tsx
├── (app)/
│   └── dashboard/
├── layout.tsx
└── globals.css

components/
├── ui/                       → Primitivos (Button, Card, Input)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Icon.tsx
├── sections/                 → Seções da landing
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Solution.tsx
│   ├── Features.tsx
│   ├── Cycle.tsx
│   ├── Benefits.tsx
│   ├── UIPreview.tsx
│   └── FinalCTA.tsx
└── layout/
    ├── Navbar.tsx
    └── Footer.tsx

lib/
├── utils.ts                  → cn(), helpers
└── constants.ts

public/
└── assets/
```

---

## 🧪 Componentes Base (React + TypeScript)

### `components/ui/Button.tsx`

```typescript
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "cta";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",
  secondary: "border border-border-base text-text-primary hover:border-primary hover:text-primary",
  ghost: "text-text-secondary hover:bg-bg-soft",
  danger: "bg-status-danger text-white hover:bg-red-600",
  cta: "bg-primary text-white shadow-green hover:bg-primary-hover text-body-lg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-7 text-body-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={loading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {loading ? "Carregando..." : children}
    </button>
  )
);

Button.displayName = "Button";
```

### `components/ui/Card.tsx`

```typescript
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type Variant = "default" | "outlined" | "elevated" | "flat";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hover?: boolean;
}

export function Card({ className, variant = "default", hover, ...props }: CardProps) {
  const variants: Record<Variant, string> = {
    default: "bg-bg-surface border border-border-base shadow-lg",
    outlined: "bg-bg-surface border border-border-base",
    elevated: "bg-bg-surface shadow-xl",
    flat: "bg-bg-soft",
  };

  return (
    <div
      className={cn(
        "rounded-lg p-6 transition-all duration-200",
        variants[variant],
        hover && "hover:-translate-y-0.5 hover:shadow-xl cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title?: string;
}

export function CardHeader({ icon, title, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-4", className)} {...props}>
      {icon && <span className="text-primary text-icon-lg">{icon}</span>}
      {title && <h4 className="text-h4">{title}</h4>}
    </div>
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex gap-3 pt-4 border-t border-border-base", className)} {...props} />;
}
```

### `components/ui/Input.tsx`

```typescript
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, success, className, id, ...props }, ref) => {
    const errorState = error ? "border-status-danger focus-visible:ring-red-100" : "";
    const successState = success && !error ? "border-status-success focus-visible:ring-green-100" : "";
    const defaultState = !error && !success ? "border-border-input focus-visible:ring-primary/15" : "";

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="label-base">
            {label}
            {props.required && <span className="text-status-danger">*</span>}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "h-12 w-full rounded-md border bg-white px-4 text-base text-text-primary placeholder:text-text-muted",
            "transition-colors duration-150 focus:outline-none focus-visible:ring-4",
            errorState || successState || defaultState,
            className
          )}
          {...props}
        />
        {error && <p className="error-text">{error}</p>}
        {success && !error && <p className="helper-text">✓ Preenchimento correto</p>}
        {helper && !error && !success && <p className="helper-text">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
```

### `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

---

## 🗺️ Padrões de Seções (Landing)

### 1. Hero Section

- Headline H1 + subheadline body-lg + CTA primary + visual à direita.
- `grid lg:grid-cols-2` com `gap-12 items-center`.
- Badge superior opcional (ex: "Novo · versão 2.0").

### 2. Seção de Problema

- H2 centralizado + grid de cards listando dores.
- Ícones em `#EF4444` ou `#F59E0B` para reforçar pain points.

### 3. Seção de Solução

- H2 + parágrafo explicativo + visual/diagrama lateral.
- Layout `grid lg:grid-cols-2`.

### 4. Seção de Funcionalidades

- H2 + subheadline + grid 3 ou 4 colunas de cards.
- Cada card: ícone (verde), título H4, descrição body-sm.

### 5. Seção de Ciclo

- Steps horizontais conectados por linha ou circular.
- Padrão: Planejar → Executar → Monitorar → Fechar → Ajustar.
- Cada step: número, ícone, título, descrição curta.

### 6. Seção de Benefícios

- Foco em resultados, não features.
- Layout em 2 colunas (texto + mockup) ou lista de benefícios com ícones verdes.

### 7. UI Preview / Prova Social

- Cards simulando o sistema real (dashboards, métricas, listas).
- Sombras médias/grandes para dar sensação de profundidade.

### 8. CTA Final

- Background em `bg-primary` ou `bg-dark`.
- H2 branco + subtexto + botão contrastante.
- Padding vertical generoso (`py-20` a `py-24`).

---

## ♿ Acessibilidade (Obrigatório)

- **Contraste:** mínimo AA (4.5:1 para texto normal, 3:1 para títulos).
- **Focus states:** sempre `focus-visible` em elementos interativos.
- **Aria-labels:** em botões com apenas ícone e elementos não-óbvios.
- **Imagens:** sempre com `alt` descritivo.
- **Ordem de tabulação:** lógica e com `tabindex` quando necessário.
- **Respeitar preferências:** `prefers-reduced-motion` em animações longas.
- **Semântica HTML:** usar `<button>`, `<a>`, `<header>`, `<nav>`, `<section>` corretamente.

---

## 🚫 Anti-padrões (NÃO FAZER)

- ❌ Usar cores fora da paleta definida.
- ❌ Misturar fontes além de Poppins.
- ❌ Tamanhos arbitrários (ex: `text-[17px]`, `p-[13px]`).
- ❌ Estilos inline (`style={{}}`) exceto para valores dinâmicos reais.
- ❌ Sombras agressivas (`shadow-2xl` sem motivo).
- ❌ Gradientes chamativos — design system é flat/clean.
- ❌ Muitos pesos de fonte na mesma tela (máximo 3).
- ❌ Animações longas ou distrativas.
- ❌ Ícones filled misturados com outline.
- ❌ Bordas espessas (>1px) como padrão.
- ❌ Usar `focus` sem `focus-visible` — sempre prefira keyboard-friendly.

---

## ✅ Checklist Antes de Entregar Qualquer Interface

- [ ] Todas as cores vieram do design system?
- [ ] Tipografia respeita a escala?
- [ ] Espaçamentos seguem a base 8px?
- [ ] Botões têm todos os estados (hover, active, focus, disabled)?
- [ ] Cards respeitam o padrão (radius 12px, shadow-lg, border)?
- [ ] Inputs têm label, helper e estado de erro?
- [ ] Layout é responsivo (mobile/tablet/desktop)?
- [ ] `focus-visible` funciona em todos os elementos interativos?
- [ ] Contraste mínimo AA garantido?
- [ ] Imagens com alt text?
- [ ] Sem estilos arbitrários (`text-[17px]`, `bg-[#123]`)?
- [ ] Componentes reutilizáveis e sem duplicação?
- [ ] `prefers-reduced-motion` respeitado?
- [ ] Sem inline styles?
- [ ] Estrutura semântica HTML correta?

---

## 📦 Dependências Recomendadas

### Essenciais

```bash
pnpm add clsx tailwind-merge lucide-react
pnpm add -D tailwindcss postcss autoprefixer @types/node
```

### Opcionais de Qualidade

```bash
pnpm add class-variance-authority  # variants tipadas
pnpm add framer-motion             # animações controladas
pnpm add @radix-ui/react-*         # primitivos acessíveis
pnpm add zod                        # validação de forms
```

---

## 🎯 Prompt para IAs (Use com Claude)

> Você é um especialista em UI/UX e desenvolvimento front-end focado em SaaS. Construa a interface solicitada usando **Next.js 14 (App Router) + TailwindCSS + TypeScript**, seguindo **exatamente** o Design System fornecido.
>
> **Regras inegociáveis:**
>
> - Nunca invente cores, tamanhos, espaçamentos ou estilos fora do sistema.
> - Use apenas tokens, classes utilitárias Tailwind e componentes base definidos.
> - Priorize **fidelidade visual** sobre criatividade.
> - Código limpo, organizado, responsivo (mobile-first) e acessível.
> - Use `cn()` para merge de classes e `lucide-react` para ícones.
> - Estrutura de pastas conforme definido.
>
> **Entregáveis esperados:**
>
> - Código completo e funcional.
> - Componentes reutilizáveis.
> - Responsividade em mobile, tablet e desktop.
> - Sem explicações extras — apenas código + breve comentário quando essencial.

---

## 📝 Histórico de Versões

| Versão | Data       | Alterações                                                                                                    |
| ------ | ---------- | ------------------------------------------------------------------------------------------------------------- |
| 1.0    | 2026-04-16 | Versão inicial — Design System completo com cores, tipografia, componentes, grid, acessibilidade e checklist. |

---

**Mantenedor:** Alexandre  
**Contato:** devappsprojetos@gmail.com  
**Licença:** Uso interno — não compartilhar publicamente sem permissão.
