---
name: debugging
description: "Estratégias sistemáticas de debugging. Análise de causa raiz, profiling, e resolução de problemas. Use ao investigar bugs ou problemas de performance."
---

# Estratégias de Debugging

Transforme debugging de adivinhação frustrante em resolução sistemática de problemas.

## Use quando
- Rastreando bugs difíceis de encontrar
- Investigando problemas de performance
- Debugando incidentes em produção
- Analisando stack traces ou crash dumps
- Debugando sistemas distribuídos

## NÃO use quando
- Não há issue reproduzível ou sintoma observável
- A tarefa é puramente desenvolvimento de features
- Você não tem acesso a logs, traces, ou sinais de runtime

## Instruções

### 1. Reproduzir o Problema
- Capture logs, traces e detalhes do ambiente
- Documente os passos exatos para reprodução
- Identifique se é consistente ou intermitente

### 2. Formar Hipóteses
- Liste as causas possíveis
- Ordene por probabilidade
- Projete experimentos controlados para validar/invalidar

### 3. Busca Binária
- Estreite o escopo progressivamente
- Use instrumentação direcionada
- Isole variáveis uma por uma

### 4. Documentar e Verificar
- Documente a causa raiz encontrada
- Implemente o fix
- Verifique que o fix resolve o problema
- Verifique que não introduz novos problemas

## Técnicas-Chave

### Console/Log Debugging
```javascript
console.log('[Debug] Estado:', { variavel, contexto });
console.time('operacao'); // ... 
console.timeEnd('operacao');
```

### Debugging por Eliminação
1. O bug existe no frontend ou backend?
2. É um problema de dados ou de lógica?
3. É específico de um browser/dispositivo?
4. Acontece com todos os usuários ou só alguns?

### Checklist de Performance
- [ ] Network waterfall analisado
- [ ] Render blocking resources identificados
- [ ] Memory leaks verificados
- [ ] Re-renders desnecessários checados

## Regra Final
Nunca assuma — sempre verifique. Dados > intuição.
