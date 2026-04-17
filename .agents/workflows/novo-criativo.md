---
description: "Workflow para criar criativos de performance (ads) para qualquer canal."
---

# Workflow: Novo Criativo

## Objetivo
Criar peças criativas (anúncios) otimizadas para conversão em tráfego pago ou orgânico.

## Gatilho de Uso
- Nova campanha de tráfego pago
- Fadiga criativa — criativos existentes perderam performance
- Novo ângulo ou posicionamento a testar
- Expansão para nova plataforma

## Skills Envolvidas
1. `product-intelligence` (se brief não existir)
2. `creative-director`
3. `copywriting-engine`
4. `vsl-architect` (se vídeo)

## Sequência de Handoff

### Fase 1 — Estratégia
```
Verificar: existe Product Brief em memory/product-briefs/?
  → Se não: product-intelligence primeiro

creative-director → Definir ângulos (3-5) + formato + plataforma
  ↓ output: ângulos priorizados + formato escolhido
```

### Fase 2 — Criação
```
creative-director → Hooks (3-5 variações) + corpo + CTA
  ↓ output: peças completas com visual + copy

SE formato = vídeo:
  vsl-architect → Micro-VSL script (15-30s)
  
SE formato = carrossel/estático:
  copywriting-engine → Copy de legenda
```

### Fase 3 — Teste
```
creative-director → Estrutura de teste criativo (ângulo → hook → formato)
  ↓ output: plano de teste com hipóteses + métricas
```

## Output Esperado
- [ ] 3-5 ângulos mapeados
- [ ] 3-5 variações de hook
- [ ] Peças criativas completas (visual + copy + CTA)
- [ ] Legendas por plataforma
- [ ] Plano de teste com hipóteses claras
