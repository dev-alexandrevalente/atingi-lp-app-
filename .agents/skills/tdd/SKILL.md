---
name: tdd
description: "Desenvolvimento guiado por testes (TDD). Ciclo Red-Green-Refactor. Use para implementar features com cobertura de testes desde o início."
---

# Desenvolvimento Guiado por Testes (TDD)

## Visão Geral
TDD garante que cada funcionalidade tem teste ANTES da implementação. O resultado: código mais confiável, menos bugs em produção.

## Quando Usar
- Implementando novas funcionalidades
- Corrigindo bugs (escreva o teste que reproduz primeiro)
- Refatorando código existente

## A Lei de Ferro
**Nunca escreva código de produção sem um teste que falhe primeiro.**

## Ciclo Red-Green-Refactor

### 🔴 RED — Escreva o Teste que Falha
1. Escreva UM teste que descreve o comportamento desejado
2. O teste DEVE falhar (se não falhar, algo está errado)
3. O teste deve ser específico e claro

### ✅ GREEN — Código Mínimo
1. Escreva o MÍNIMO de código para o teste passar
2. Não otimize, não embeleze
3. O objetivo é SÓ fazer o teste passar

### 🔄 REFACTOR — Limpe
1. Melhore o código sem mudar o comportamento
2. Todos os testes devem continuar passando
3. Remova duplicação, melhore nomes, simplifique

### 🔁 Repita
Volte ao passo RED para a próxima funcionalidade.

## Bons Testes
- Testam **comportamento**, não implementação
- São **independentes** uns dos outros
- Rodam **rápido**
- Têm **nomes descritivos** que explicam o cenário
- Seguem o padrão **Arrange-Act-Assert**

## Sinais de Alerta — PARE e Recomece
- ❌ Teste verde sem escrever código novo
- ❌ Múltiplos testes escritos de uma vez
- ❌ Refatorando enquanto testes estão vermelhos
- ❌ Testes que dependem de ordem de execução

## Anti-Padrões de Teste
- ❌ Testar detalhes de implementação
- ❌ Testes frágeis que quebram com refatoração
- ❌ Mocks excessivos
- ❌ Testes sem assertions

## Regra Final
Se não tem teste, não está pronto. Sem exceções.
