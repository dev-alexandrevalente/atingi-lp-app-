---
name: arquitetura
description: "Framework de decisão arquitetural. Análise de requisitos, avaliação de trade-offs, documentação ADR. Use ao tomar decisões de arquitetura."
---

# Framework de Decisão Arquitetural

> "Requisitos guiam a arquitetura. Trade-offs informam decisões. ADRs capturam o raciocínio."

## Princípio Central
**"Simplicidade é a sofisticação definitiva."**

- Comece simples
- Adicione complexidade APENAS quando comprovadamente necessário
- Você sempre pode adicionar padrões depois
- Remover complexidade é MUITO mais difícil que adicionar

## Quando Usar
- Tomando decisões de arquitetura de sistema
- Analisando design de componentes
- Escolhendo entre diferentes abordagens técnicas
- Documentando decisões para referência futura

## Quando NÃO Usar
- Mudanças simples de código que não afetam a arquitetura
- Correções de bugs sem impacto estrutural

## Processo

### 1. Descoberta de Contexto
- Quais são os requisitos funcionais?
- Quem são os usuários e qual a escala esperada?
- Quais são as restrições (tempo, equipe, infraestrutura)?
- Existem decisões anteriores que limitam as opções?

### 2. Análise de Trade-offs
Para cada decisão arquitetural:
- Identifique **2-3 alternativas**
- Compare: complexidade, escalabilidade, manutenção, risco
- Documente o raciocínio da escolha

### 3. Registro de Decisão (ADR)
Para cada decisão significativa, documente:
- **Contexto**: Por que essa decisão é necessária?
- **Decisão**: O que foi decidido?
- **Consequências**: O que muda com essa decisão?
- **Alternativas**: O que foi descartado e por quê?

## Checklist de Validação

- [ ] Requisitos claramente entendidos
- [ ] Restrições identificadas
- [ ] Cada decisão tem análise de trade-off
- [ ] Alternativas mais simples consideradas
- [ ] ADRs escritos para decisões significativas
- [ ] Expertise da equipe compatível com padrões escolhidos

## Skills Relacionadas
- `@brainstorming` para planejamento antes da implementação
- `@api-design-principles` para design de APIs
- `@frontend-design` para qualidade de UI/UX
