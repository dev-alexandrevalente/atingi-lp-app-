---
description: "Workflow de diagnóstico e correção de queda de conversão em funil existente."
---

# Workflow: Diagnóstico de Conversão

## Objetivo
Identificar e corrigir a causa de queda de conversão em funil existente.

## Gatilho
- Conversão caiu
- Funil não está performando
- Métricas fora do esperado

---

## Sequência (5 Fases)

### Fase 1 — Coleta de Dados
```
Skills: analytics-strategist
MCPs:
  1. Supabase MCP (padrão) ou Convex MCP → consultar dados de conversão, events, quiz_responses
  2. Browser → verificar tracking em produção (GA4 real-time, GTM preview)
Output: Dashboard de métricas atuais vs históricas
Memory Read: memory/learnings/ (problemas anteriores)
```

### Fase 2 — Diagnóstico de Tracking
```
Skills: tracking-implementation
MCPs:
  1. Vercel MCP → get_deployment_logs (verificar erros de runtime)
  2. Browser → inspecionar data layer, GTM, pixel firing
  3. Context7 → docs de GA4/GTM se necessário (DOCS-FIRST)
Output: Relatório de tracking — OK ou problemas encontrados
```

### Fase 3 — Diagnóstico Comportamental
```
Skills: behavioral-intelligence → cro-optimizer
MCPs:
  1. Browser → analisar funil como usuário (screenshots, fluxo)
Output: Diagnóstico de fricção, carga cognitiva, motivação
Memory Read: memory/personas/, memory/patterns/
```

### Fase 4 — Correção
```
Skills: frontend-design, copywriting-engine (conforme problema)
MCPs:
  1. Context7 → docs se correção envolve lib (DOCS-FIRST)
  2. shadcn MCP → se componente de UI precisa ser substituído (UI-FROM-REGISTRY)
  3. Supabase MCP (padrão) ou Convex MCP → se correção envolve backend
Output: Correção implementada
```

### Fase 5 — Validação e Deploy
```
Skills: validacao
MCPs:
  1. TestSprite → validate_flow("fluxo corrigido") (VALIDATE-BEFORE-DEPLOY)
  2. Vercel MCP → deploy preview → verificar → deploy prod (DEPLOY-WITH-OBSERVABILITY)
Output: Correção em produção
Memory Write: memory/learnings/ (diagnóstico + solução)
```

---

## Riscos e Fallbacks

| Risco | Fallback |
|-------|----------|
| Dados insuficientes no backend | Pedir ao usuário GA4/Clarity screenshots |
| Tracking quebrado | Reconstruir data layer manualmente |
| Causa raiz é copy, não técnica | Rotear para copywriting-engine |
| Múltiplas causas simultâneas | Priorizar por impacto (analytics-strategist) |
