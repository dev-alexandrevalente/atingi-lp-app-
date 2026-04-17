---
description: "Workflow completo para criar um funil do zero, da pesquisa ao deploy."
---

# Workflow: Novo Funil

## Objetivo
Criar um funil completo do zero — da pesquisa de mercado ao deploy em produção.

## Gatilho
- Usuário pede para criar um funil novo
- Produto já tem brief ou precisa de pesquisa

## Backend Padrão
- **Supabase** (padrão do ecossistema)
- Convex apenas se explicitamente definido

---

## Sequência (7 Fases)

### Fase 1 — Pesquisa e Estratégia
```
Skills: product-intelligence → offer-architect
MCPs: Browser (pesquisa de mercado)
Output: Product Brief + Persona + Mecanismo + Oferta
Memory Write: memory/product-briefs/, memory/personas/, memory/mechanisms/
```

### Fase 2 — Arquitetura do Funil
```
Skills: funnel-architect → behavioral-intelligence
MCPs: Supabase MCP (definir schema, tables, RLS) — ou Convex MCP se projeto usar Convex
Output: Mapa de funil + steps + lógica de progressão
Memory Read: memory/product-briefs/, memory/personas/
```

### Fase 3 — Copy e Conteúdo
```
Skills: copywriting-engine (+ vsl-architect se VSL)
MCPs: —
Output: Copy de todas as telas do funil
Memory Read: memory/product-briefs/, memory/mechanisms/
```

### Fase 4 — Design e Implementação
```
Skills: design-system → frontend-design → motion-architect
MCPs (obrigatórios nesta fase):
  1. Context7 → docs de Next.js, TailwindCSS, Motion, GSAP (DOCS-FIRST)
  2. shadcn MCP → buscar componentes antes de criar (UI-FROM-REGISTRY)
  3. Supabase MCP → implementar queries/RLS/edge functions (BACKEND-AWARE)
Output: Funil implementado em código
Memory Read: memory/stack-recommendations/, reference/stack-oficial.md
```

### Fase 5 — Tracking
```
Skills: tracking-implementation
MCPs:
  1. Context7 → docs de GTM, GA4, Meta Pixel (DOCS-FIRST)
Output: Data layer + GTM + eventos configurados
```

### Fase 6 — Validação
```
Skills: validacao → tdd
MCPs (obrigatórios nesta fase):
  1. TestSprite → validate_flow("quiz completo"), validate_flow("checkout") (VALIDATE-BEFORE-DEPLOY)
Output: Testes passando, fluxos validados
```

### Fase 7 — Deploy
```
Skills: (workflow /deploy)
MCPs (obrigatórios nesta fase):
  1. Vercel MCP → deploy preview → verificar → deploy prod (DEPLOY-WITH-OBSERVABILITY)
  2. Vercel MCP → get_deployment_logs → verificar erros
Output: Funil em produção
Memory Write: memory/learnings/ (se houve problemas), memory/stack-recommendations/
```

---

## Fluxo MCP

```
Browser ──→ Supabase ──→ Context7 ──→ shadcn ──→ TestSprite ──→ Vercel
(pesquisa)  (schema)     (docs)      (UI)       (validar)     (deploy)
```

## Riscos e Fallbacks

| Risco | Fallback |
|-------|----------|
| Context7 indisponível | Buscar docs manualmente |
| shadcn sem componente | Criar custom com padrão cva + Radix |
| TestSprite falha | Testes manuais + Playwright |
| Vercel MCP indisponível | `vercel` CLI |
| Supabase MCP indisponível | Supabase Dashboard |
| Convex MCP indisponível | Convex Dashboard (se projeto usar Convex) |
