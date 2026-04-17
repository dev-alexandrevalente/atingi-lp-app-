# Manual Operacional — Ecossistema Slim Core

## O Que Você Tem

Um sistema de 29 skills especializadas + 8 workflows + 6 diretórios de memória, tudo operacional e invocável.

## Como Funciona

### Regra #1: Use o Orquestrador
Quando não souber por onde começar, use `/orquestrador`. Ele interpreta sua intenção e roteia para o workflow ou skill correta.

### Regra #2: Skills São Especialistas
Cada skill faz uma coisa e faz bem. Não peça para uma skill fazer o trabalho de outra.

### Regra #3: Workflows São Receitas
Workflows são sequências pré-definidas de skills. Use-os para tarefas complexas que envolvem múltiplas especialidades.

### Regra #4: Memory É Contexto
O sistema `memory/` preserva conhecimento entre conversas. Personas, briefings e aprendizados ficam disponíveis para todas as skills.

## Cenários Comuns

| Quero... | Use |
|---------|-----|
| Criar produto novo | `/novo-produto` |
| Criar funil do zero | `/novo-funil` |
| Criar anúncios | `/novo-criativo` |
| Diagnosticar queda | `/diagnostico-conversao` |
| Recuperar leads | `/recovery-campanha` |
| Escalar o que funciona | `/escalar-funil` |
| Auditoria geral | `/auditoria-completa` |
| Não sei por onde começar | `/orquestrador` |

## Hierarquia

```
Usuário
  └── /orquestrador (interpreta e roteia)
       ├── Workflows (sequências de skills)
       │    ├── /novo-produto
       │    ├── /novo-funil
       │    ├── /diagnostico-conversao
       │    ├── /novo-criativo
       │    ├── /recovery-campanha
       │    ├── /escalar-funil
       │    ├── /auditoria-completa
       │    └── /deploy
       ├── Skills (29 especialistas)
       └── Memory (contexto persistente)
```

## Referência Legada
Agents anteriores estão em `reference/archive/` para consulta. Não são operacionais.
