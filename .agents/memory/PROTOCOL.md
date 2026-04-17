# 🧠 Memory Automation Protocol

> Protocolo operacional para leitura e escrita automática no sistema de memória.

---

## Princípio

**Memory não é opcional — é infraestrutura.** Toda skill que gera output reutilizável DEVE escrever em memory/. Toda skill que precisa de contexto DEVE ler memory/ antes de executar.

---

## Gatilhos de Escrita (Automática)

### Quem escreve o quê

| Gatilho | Dado | Destino | Formato |
|---------|------|---------|---------|
| product-intelligence completa framework de descoberta | Persona completa | `memory/personas/` | `persona_[nome]_[produto].md` |
| product-intelligence gera briefing | Product Brief | `memory/product-briefs/` | `brief_[produto].md` |
| product-intelligence ou offer-architect define mecanismo | Mecanismo único | `memory/mechanisms/` | `mechanism_[produto].md` |
| analytics-strategist ou cro-optimizer conclui análise | Aprendizado | `memory/learnings/` | `learning_[YYYY-MM-DD]_[tema].md` |
| creative-director conclui ciclo de criativos | Aprendizado | `memory/learnings/` | `learning_[YYYY-MM-DD]_[tema].md` |
| Qualquer skill identifica padrão recorrente (2+ vezes) | Padrão validado | `memory/patterns/` | `pattern_[domínio]_[nome].md` |
| arquitetura ou design-system define stack | Stack | `memory/stack-recommendations/` | `stack_[projeto].md` |
| tracking-implementation configura stack analytics | Stack | `memory/stack-recommendations/` | `stack_[projeto].md` |
| debugging resolve bug não-trivial | Aprendizado | `memory/learnings/` | `learning_[YYYY-MM-DD]_[tema].md` |

### Regra de Ouro
```
SE a skill gerou output que outro skill pode reusar
→ ESCREVER em memory/
→ formato padronizado conforme README do diretório
→ incluir metadados (data, skill origem, produto)
```

---

## Gatilhos de Leitura (Automática)

### Antes de executar qualquer tarefa

```
PASSO 1: Verificar memory/product-briefs/
  → SE existe brief do produto em questão: USAR como contexto
  → SE não existe: ACIONAR product-intelligence primeiro

PASSO 2: Verificar memory/personas/
  → SE existe persona relevante: USAR como contexto
  → SE não existe: ACIONAR product-intelligence primeiro

PASSO 3: Verificar memory/learnings/
  → SE existem learnings relevantes ao tema: CONSIDERAR
  → Buscar por tags ou palavras-chave

PASSO 4: Verificar memory/patterns/
  → SE existe padrão validado para o tipo de task: SEGUIR
  → SE não existe: Criar se identificar durante execução

PASSO 5: Verificar memory/mechanisms/
  → SE a task envolve copy/VSL/criativo: LER mecanismo
  → SE não existe: Seguir sem

PASSO 6: Verificar memory/stack-recommendations/
  → SE a task é técnica: LER stack recomendada
  → SE não existe: Consultar reference/stack-oficial.md
```

---

## Política de Atualização

| Tipo | Quando Atualizar | Quem Atualiza |
|------|-----------------|--------------|
| Product Brief | Reposicionamento, pivô, nova oferta | product-intelligence |
| Persona | Nova validação com dados reais | product-intelligence |
| Mecanismo | Refinamento de oferta | offer-architect |
| Learnings | NUNCA atualizar — criar novo | Qualquer skill |
| Patterns | Quando pattern evolui com nova evidência | Qualquer skill |
| Stack | Quando muda escolha tecnológica | arquitetura, design-system |

---

## Política de Obsolescência

```
LEARNINGS:
- Nunca deletar (são registros históricos)
- Marcar como "[SUPERSEDED by learning_YYYY-MM-DD_...]" se invalidado

BRIEFS:
- Versionar: incrementar "Versão: N" no header
- Manter apenas a versão atual ativa
- Renomear antiga para brief_[produto]_v[N-1].md se quiser preservar

PERSONAS:
- Merge quando houver dados novos (não criar duplicata)
- Adicionar "Atualizado em: [data]" no header

PATTERNS:
- Se padrão deixou de funcionar: mover para memory/learnings/ como learning

STACK:
- Atualizar quando stack mudar
- Não versionar — sempre sobrescrever com estado atual
```

---

## Templates Base

### Template: Learning
```markdown
# Learning: [Título]
- **Data**: YYYY-MM-DD
- **Projeto**: [nome]
- **Skill origem**: [skill]
- **Tipo**: [teste A/B | diagnóstico | campanha | sprint | bug]

## Contexto
[1-3 linhas]

## Hipótese
[o que esperávamos]

## Resultado
[o que aconteceu — com dados se possível]

## Lição
[frase clara do aprendizado]

## Ação Futura
[o que fazer diferente]

## Tags
#tag1 #tag2 #tag3
```

### Template: Pattern
```markdown
# Pattern: [Nome]
- **Domínio**: [copy | funil | criativo | analytics | etc.]
- **Validado em**: [N vezes/projetos]
- **Confiança**: [alta | média]

## Descrição
[2-3 linhas]

## Quando Usar
[situações]

## Estrutura
[passo a passo]

## Exemplos
[1-2 exemplos]

## Contra-indicações
[quando NÃO usar]
```

---

## Checklist de Verificação

```
APÓS CADA WORKFLOW COMPLETO:
□ Product Brief salvo/atualizado?
□ Persona salva/atualizada?
□ Mecanismo salvo (se definido)?
□ Learnings registrados (se houve teste/diagnóstico)?
□ Patterns identificados (se houve padrão recorrente)?
□ Stack salva (se houve decisão técnica)?

SE ALGUM NÃO FOI SALVO:
→ Orquestrador deve lembrar ao final do fluxo
→ "Antes de encerrar: salvei [X] em memory/. Falta salvar [Y]?"
```
