---
name: criar-pr
description: "Crie pull requests limpos e bem documentados. Use quando quiser empacotar seu trabalho em um PR pronto para revisão."
---

# Criar Pull Request

## Quando Usar
- Finalizando uma feature ou correção
- Empacotando mudanças para revisão de código
- Preparando merge para a branch principal

## Processo

### 1. Preparação
- Verifique que todos os testes passam
- Rode lint e type-check
- Revise o diff completo

### 2. Organize os Commits
- Commits atômicos e descritivos
- Um commit = uma mudança lógica
- Mensagens no formato: `tipo(escopo): descrição`
  - `feat(analytics): adicionar captura de UTM do Meta Ads`
  - `fix(tracking): corrigir sessão que não expirava`
  - `refactor(ui): reorganizar tabela de criativos`

### 3. Escreva a Descrição do PR
```markdown
## O que mudou
[Resumo das mudanças em 2-3 frases]

## Por quê
[Motivação e contexto]

## Como testar
1. [Passo 1]
2. [Passo 2]
3. [Resultado esperado]

## Screenshots (se aplicável)
[Antes/Depois]

## Checklist
- [ ] Testes passando
- [ ] Lint limpo
- [ ] Documentação atualizada
- [ ] Revisão de segurança (se aplicável)
```

### 4. Comandos
```bash
# Criar branch
git checkout -b feat/nome-da-feature

# Commitar
git add -A
git commit -m "feat(escopo): descrição"

# Push
git push origin feat/nome-da-feature
```

## Regra
PRs devem ser pequenos e focados. Se tem mais de 500 linhas de diff, considere dividir.
