---
name: design-api
description: "Princípios de design de APIs REST e GraphQL. Crie APIs intuitivas, escaláveis e fáceis de manter. Use ao projetar ou revisar APIs."
---

# Princípios de Design de API

Domine princípios de design REST e GraphQL para construir APIs intuitivas, escaláveis e que encantam desenvolvedores.

## Quando Usar
- Projetando novas APIs REST ou GraphQL
- Refatorando APIs existentes para melhor usabilidade
- Estabelecendo padrões de API para sua equipe
- Revisando especificações de API antes da implementação
- Criando documentação de API amigável ao desenvolvedor

## Quando NÃO Usar
- Você só precisa de implementação para um framework específico
- Trabalho apenas de infraestrutura sem contratos de API

## Processo

### 1. Defina Consumidores e Casos de Uso
- Quem vai consumir esta API? Frontend? Mobile? Parceiros?
- Quais são os casos de uso principais?
- Quais são as restrições (rate limits, autenticação)?

### 2. Escolha o Estilo e Modele Recursos
- REST: Recursos como substantivos, verbos HTTP como ações
- GraphQL: Types e Queries como contratos
- Nomenclatura consistente (camelCase vs snake_case)

### 3. Especifique Detalhes
- **Erros**: Formato padronizado com códigos e mensagens
- **Versionamento**: URL path (`/v1/`) vs header
- **Paginação**: Cursor vs offset
- **Autenticação**: API key, OAuth, JWT

### 4. Valide com Exemplos
- Escreva exemplos de request/response para cada endpoint
- Revise consistência entre endpoints
- Verifique se a nomenclatura é intuitiva

## Checklist de Design
- [ ] Recursos nomeados como substantivos no plural
- [ ] Verbos HTTP corretos (GET, POST, PUT, DELETE)
- [ ] Respostas de erro padronizadas
- [ ] Paginação em listas
- [ ] Versionamento definido
- [ ] Autenticação especificada
- [ ] Rate limiting documentado
- [ ] Exemplos para cada endpoint
