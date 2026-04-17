---
description: "Workflow para definir um produto novo: persona, oferta, mecanismo e posicionamento."
---

# Workflow: Novo Produto

## Objetivo
Definir um produto novo do zero — persona, dores, mecanismo único, oferta e posicionamento.

## Gatilho
- Produto novo
- Pivot de produto existente
- Nova vertical de mercado

---

## Sequência (4 Fases)

### Fase 1 — Pesquisa de Mercado
```
Skills: product-intelligence
MCPs:
  1. Browser → pesquisar mercado, concorrentes, tendências, dores
Output: Mapa de mercado, oportunidades, insights
```

### Fase 2 — Definição de Persona
```
Skills: product-intelligence
MCPs: —
Output: Persona detalhada (dores, desejos, objeções, linguagem)
Memory Write: memory/personas/
```

### Fase 3 — Mecanismo e Oferta
```
Skills: product-intelligence → offer-architect
MCPs: —
Output: Mecanismo único + oferta irresistível
Memory Write: memory/mechanisms/, memory/product-briefs/
```

### Fase 4 — Posicionamento
```
Skills: estrategista-vendas → copywriting-engine
MCPs: —
Output: Posicionamento, tagline, promessa principal
Memory Write: memory/product-briefs/ (atualizar)
```

---

## Fluxo MCP

```
Browser → (pesquisa de mercado, somente Fase 1)
```

Workflow majoritariamente estratégico — MCPs técnicos não se aplicam.

## Riscos e Fallbacks

| Risco | Fallback |
|-------|----------|
| Mercado pouco documentado online | Pedir dados do usuário diretamente |
| Persona genérica demais | Refinar com behavioral-intelligence |
