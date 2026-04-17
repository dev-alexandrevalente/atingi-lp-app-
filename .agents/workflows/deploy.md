---
description: "Build e deploy do funil para produção"
---

# Workflow: Deploy

## Objetivo
Deploy seguro e verificável de aplicação para produção, com validação automatizada e observabilidade.

## Gatilho
- Código pronto para publicar
- Preview aprovado
- Hotfix urgente

## Skills Envolvidas
- `validacao` (lint, types, testes)
- `tracking-implementation` (verificação de tags)
- `tdd` (testes automatizados)

---

## Sequência Completa (10 Fases)

### Fase 1 — Pré-Checks
```
MCPs: Filesystem
// turbo
```
```bash
git status
git diff --stat main
```
```
□ Git status limpo (sem uncommitted changes)
□ Branch correta (main ou release/*)
□ Merge conflicts resolvidos
□ .env.local tem todas as variáveis necessárias
```

### Fase 2 — Lint e Type Check
```
// turbo
```
```bash
pnpm lint
pnpm typecheck
```
Se erros → corrigir antes de prosseguir.

### Fase 3 — Testes Unitários
```
// turbo
```
```bash
pnpm test
```
Se falhas → corrigir antes de prosseguir.

### Fase 4 — Testes Automatizados (MCP)
```
MCPs: TestSprite (VALIDATE-BEFORE-DEPLOY)
```
```
TestSprite → validate_flow("formulário de captura")
TestSprite → validate_flow("quiz completo")
TestSprite → validate_flow("checkout")
TestSprite → check_responsiveness("mobile + desktop")
```
Se falhas → corrigir antes de prosseguir.
**Fallback:** Playwright E2E ou testes manuais.

### Fase 5 — Build
```
// turbo
```
```bash
pnpm build
```
Se falhar → investigar → corrigir → voltar à Fase 2.

### Fase 6 — Deploy Backend (se aplicável)
```
MCPs: Supabase MCP (BACKEND-AWARE) — ou Convex MCP se projeto usar Convex
```
```
SE projeto usa Supabase (padrão):
  → supabase db push
  → Verificar migrations e edge functions

SE projeto usa Convex (experimental):
  → npx convex deploy
  → Verificar functions deployed
```

### Fase 7 — Preview Deploy
```
MCPs: Vercel MCP (DEPLOY-WITH-OBSERVABILITY)
```
```
Vercel MCP → deploy (preview)
```
Verificar no URL de preview:
```
□ Página carrega sem erros no console
□ Todas as rotas funcionam
□ Layout responsivo (mobile + desktop)
□ Imagens e assets carregam
□ Formulários funcionam
□ Links externos abrem
□ Dark mode funciona (se aplicável)
```

### Fase 8 — Checklist de Tracking (Pré-Produção)
```
MCPs: Browser (verificar tags em preview)
```
```
□ GTM container carrega
□ GA4 recebe pageview
□ Meta Pixel dispara PageView
□ Eventos custom disparam nos momentos corretos
□ Data layer popula corretamente
□ Sem tags duplicadas
□ Sem erros no GTM Preview
```

### Fase 9 — Deploy Produção
```
MCPs: Vercel MCP (DEPLOY-WITH-OBSERVABILITY)
⚠️ Requer confirmação humana
```
```
Vercel MCP → deploy (production)
```

### Fase 10 — Verificação Pós-Deploy
```
MCPs: Vercel MCP → get_deployment_logs
```
```
□ URL de produção carrega
□ HTTPS ativo
□ Redirecionamentos funcionam
□ Meta tags (título, descrição, OG) corretos
□ Tracking funciona em produção (GA4 real-time)
□ Sitemap acessível (se aplicável)
□ Zero erros nos deployment logs
```

---

## Fluxo MCP

```
TestSprite ──→ Supabase ──→ Vercel (preview) ──→ Browser ──→ Vercel (prod) ──→ Vercel (logs)
(validar)     (backend)    (preview)           (tracking)   (produção)        (observar)
```

---

## Rollback

```
SE algo quebrar em produção:
1. Vercel MCP → get_deployment_logs (identificar erro)
2. Vercel MCP → rollback (reverter imediatamente)
3. Investigar causa raiz em branch separada
4. Corrigir → voltar à Fase 1
5. Registrar em memory/learnings/
```

## Se Houver Falha — Registrar

```
REGISTRAR EM memory/learnings/:

# Learning: Deploy Failure [YYYY-MM-DD]
- **Tipo**: deploy
- **Fase da falha**: [número]
- **Erro**: [mensagem]
- **Causa raiz**: [identificada ou "em investigação"]
- **Fix**: [o que resolveu]
- **Prevenção**: [o que fazer para não repetir]
```

---

## Comandos Rápidos

```bash
# Dev
pnpm dev

# Build local
pnpm build && pnpm start

# Backend (Convex)
npx convex dev       # dev
npx convex deploy    # prod

# Preview deploy
vercel

# Production deploy
vercel --prod

# Rollback
vercel rollback

# Logs
vercel logs [url]
```

## Riscos e Fallbacks

| Risco | Fallback |
|-------|----------|
| TestSprite indisponível | Playwright + testes manuais |
| Vercel MCP indisponível | `vercel` CLI |
| Supabase MCP indisponível | `supabase` CLI |
| Convex MCP indisponível | `npx convex` CLI (se projeto usar Convex) |
| Build falha | Debug local antes de retry |
| Tracking não dispara em prod | Abrir GTM preview em prod URL |
