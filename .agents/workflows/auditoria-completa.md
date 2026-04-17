---
description: "Workflow de auditoria sistêmica completa de funil, criativos, analytics e pós-compra."
---

# Workflow: Auditoria Completa

## Objetivo
Auditoria sistêmica de todo o ecossistema de um produto/funil — tracking, UX, copy, arquitetura, segurança, performance.

## Gatilho
- Revisão periódica
- Antes de escalar
- Após reestruturação
- Suspeita de problemas sistêmicos

---

## Sequência (6 Fases)

### Fase 1 — Auditoria de Tracking
```
Skills: tracking-implementation → analytics-strategist
MCPs:
  1. Browser → abrir funil como usuário, verificar data layer, GTM, pixel
  2. Vercel MCP → get_deployment_logs (erros de runtime)
  3. Context7 → docs de GA4/GTM se necessário (DOCS-FIRST)
Output: Relatório de tracking — cobertura, gaps, duplicatas
```

### Fase 2 — Auditoria de UX e Conversão
```
Skills: cro-optimizer → behavioral-intelligence → ux-designer
MCPs:
  1. Browser → percorrer funil como usuário em mobile e desktop
Output: Relatório de fricção, UX, acessibilidade
Memory Read: memory/personas/, memory/patterns/
```

### Fase 3 — Auditoria de Copy
```
Skills: copywriting-engine
MCPs: —
Output: Relatório de copy — headline, CTA, proof, urgência
```

### Fase 4 — Auditoria Técnica
```
Skills: validacao → auditoria-seguranca → arquitetura
MCPs:
  1. Vercel MCP → get_project_info, check_deployment_status
  2. TestSprite → validate_flow("fluxo crítico") (VALIDATE-BEFORE-DEPLOY)
  3. Supabase MCP (padrão) ou Convex MCP → verificar schema, indexes, auth, RLS
  4. Context7 → verificar versões de dependências (DOCS-FIRST)
Output: Relatório técnico — performance, segurança, arquitetura
```

### Fase 5 — Auditoria de Criativos
```
Skills: creative-director
MCPs:
  1. Browser → verificar anúncios ativos, landing pages de concorrentes
Output: Relatório criativo — performance de ads, visual, hooks
```

### Fase 6 — Consolidação
```
Skills: orquestrador (consolida)
Output: Relatório executivo com:
  - Score por área (tracking, UX, copy, técnica, criativos)
  - Gaps prioritários
  - Plano de correção
Memory Write:
  - memory/learnings/ (diagnósticos)
  - memory/patterns/ (padrões encontrados)
```

---

## Riscos e Fallbacks

| Risco | Fallback |
|-------|----------|
| TestSprite indisponível | Testes manuais |
| Tracking quebrado impede análise | Reconstruir tracking antes de auditar |
| Funil muito grande para auditar tudo | Priorizar fluxo principal (lead → conversão) |
