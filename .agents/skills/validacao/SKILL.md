---
name: validacao
description: "Controle de qualidade automático, linting e análise estática. Use após cada modificação de código para garantir sintaxe e padrões do projeto."
---

# Validação e Lint

> **OBRIGATÓRIO:** Rode ferramentas de validação após CADA mudança de código. Não finalize uma tarefa até o código estar livre de erros.

## Procedimentos por Ecossistema

### Node.js / TypeScript
1. **Lint/Fix:** `npm run lint` ou `npx eslint "caminho" --fix`
2. **Tipos:** `npx tsc --noEmit`
3. **Segurança:** `npm audit --audit-level=high`

### Python
1. **Linter (Ruff):** `ruff check "caminho" --fix`
2. **Segurança (Bandit):** `bandit -r "caminho" -ll`
3. **Tipos (MyPy):** `mypy "caminho"`

## O Loop de Qualidade
1. **Escreva/Edite código**
2. **Rode auditoria:** `npm run lint && npx tsc --noEmit`
3. **Analise relatório:** Verifique erros encontrados
4. **Corrija e repita:** Submeter código com falhas NÃO é permitido

## Tratamento de Erros
- Se `lint` falhar: Corrija problemas de estilo/sintaxe imediatamente
- Se `tsc` falhar: Corrija incompatibilidades de tipo antes de prosseguir
- Se nenhuma ferramenta configurada: Verifique `.eslintrc`, `tsconfig.json`, `pyproject.toml` na raiz

---
**Regra Estrita:** Nenhum código deve ser commitado ou reportado como "pronto" sem passar nestas verificações.
