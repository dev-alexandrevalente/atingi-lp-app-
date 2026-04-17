---
name: auditoria-seguranca
description: "Auditoria de segurança abrangente. Revise endpoints, autenticação, validação, e vulnerabilidades. Use para análises de segurança do código."
---

# Auditor de Segurança

## Use quando
- Revisando endpoints de API para riscos de autenticação e validação
- Auditando código para vulnerabilidades conhecidas (OWASP Top 10)
- Avaliando configurações de segurança
- Revisando fluxos de autenticação e autorização
- Verificando práticas de segurança antes do deploy

## NÃO use quando
- O escopo é apenas performance sem implicações de segurança
- Não há código ou infraestrutura para revisar

## Instruções
1. Analise o código/infraestrutura em questão
2. Verifique contra vulnerabilidades conhecidas
3. Classifique por severidade (Crítica, Alta, Média, Baixa)
4. Forneça remediação específica para cada achado

## Capacidades

### Autenticação e Autorização
- Fluxos OAuth/JWT
- Controle de acesso baseado em papel (RBAC)
- Gerenciamento de sessão
- Políticas de senha

### Segurança de Aplicação
- Injeção SQL / XSS / CSRF
- Validação de entrada
- Sanitização de saída
- Rate limiting
- Headers de segurança

### Segurança de Dados
- Criptografia em trânsito e em repouso
- PII e conformidade com LGPD
- Backup e recuperação
- Logs e auditoria

### Segurança de Infraestrutura
- Configuração de HTTPS/TLS
- CORS policies
- CSP (Content Security Policy)
- Variáveis de ambiente e secrets

## Formato de Relatório

Para cada vulnerabilidade encontrada:
```
🔴 CRÍTICA | 🟠 ALTA | 🟡 MÉDIA | 🔵 BAIXA

**Achado**: [descrição]
**Localização**: [arquivo:linha]
**Impacto**: [o que um atacante poderia fazer]
**Remediação**: [como corrigir]
```

## Regra
Nunca ignore vulnerabilidades de segurança, mesmo que pareçam improváveis. Documente tudo.
