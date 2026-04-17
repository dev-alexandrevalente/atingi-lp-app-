# Referência de MCPs — Ecossistema de Agentes

## Visão Geral

O ecossistema de agentes utiliza **9 MCPs** organizados por função. Este documento serve como referência central para todas as skills e workflows.

---

## MCPs Ativos

### 1. Supabase (Remoto)
- **Tipo**: ServerUrl (Streamable HTTP)
- **Função**: Backend principal — queries, RLS, migrations, edge functions
- **Política**: `BACKEND-AWARE`
- **Usado por**: Todos os workflows que tocam backend
- **Config**: `"serverUrl": "https://mcp.supabase.com/mcp?project_ref=..."`

### 2. supabase-mcp-server (Local)
- **Tipo**: npx (stdio)
- **Função**: Operações locais — DDL, tabelas, migrations, tipos TypeScript, edge functions
- **Política**: `BACKEND-AWARE`
- **Usado por**: `arquitetura`, `deploy`, `diagnostico-conversao`
- **Config**: `npx -y @supabase/mcp-server-supabase@latest --access-token TOKEN`

### 3. n8n-mcp
- **Tipo**: npx (stdio)
- **Função**: Automação — criar/ler/validar workflows n8n
- **Política**: `AUTOMATION-AWARE` + `N8N-PRODUCTION-SHIELD`
- **Usado por**: `n8n-architect`
- **Config**: `npx -y n8n-mcp` com envs N8N_API_URL, N8N_API_KEY
- **⚠️ REGRA SUPREMA**: Produção é intocável. Leitura primeiro. Nunca editar workflows ativos.

### 4. Context7
- **Tipo**: npx (stdio)
- **Função**: Documentação atualizada de libs e frameworks
- **Política**: `DOCS-FIRST`
- **Usado por**: `motion-lab`, `novo-funil`, `diagnostico-conversao`, `auditoria-completa`, `deploy`, `motion-systems-architect`, `frontend-design`
- **Config**: `npx -y @upstash/context7-mcp`
- **Quando usar**: SEMPRE antes de implementar qualquer lib (Motion, GSAP, Next.js, etc.)
- **Fallback**: Buscar docs manualmente

### 5. shadcn
- **Tipo**: npx (stdio)
- **Função**: Registry de componentes UI — buscar antes de criar do zero
- **Política**: `UI-FROM-REGISTRY-FIRST`
- **Usado por**: `novo-funil`, `diagnostico-conversao`, `motion-lab`, `motion-systems-architect`, `design-system`, `frontend-design`, `ux-designer`
- **Config**: `npx -y shadcn@latest mcp`
- **Quando usar**: SEMPRE antes de criar Button, Dialog, Input, Tabs, Select, etc.
- **Fallback**: Criar custom com padrão cva + Radix

### 6. Vercel
- **Tipo**: npx + proxy (Streamable HTTP)
- **Função**: Deploy, logs, rollback, preview
- **Política**: `DEPLOY-WITH-OBSERVABILITY`
- **Usado por**: `deploy`, `diagnostico-conversao`, `auditoria-completa`, `novo-funil`
- **Config**: `npx -y mcp-proxy https://mcp.vercel.com`
- **Autenticação**: OAuth na primeira execução
- **Nota**: Vercel NÃO é o deploy padrão (VPS/Ubuntu/Nginx é). Usar apenas quando projeto estiver na Vercel.
- **Fallback**: `vercel` CLI

### 7. Convex (Opcional/Experimental)
- **Tipo**: npx (stdio)
- **Função**: Schema, functions, queries/mutations para projetos que usam Convex
- **Política**: `BACKEND-AWARE` (secundário)
- **Usado por**: Projetos que explicitamente definem Convex como backend
- **Config**: `npx -y convex@latest mcp start`
- **⚠️ NOTA**: Supabase é o backend padrão. Convex só entra se explicitamente escolhido.
- **Fallback**: Convex Dashboard / CLI

### 8. TestSprite
- **Tipo**: npx (stdio)
- **Função**: Validação automatizada de fluxos pré-deploy
- **Política**: `VALIDATE-BEFORE-DEPLOY`
- **Usado por**: `deploy`, `novo-funil`, `diagnostico-conversao`, `auditoria-completa`
- **Config**: `npx -y @testsprite/testsprite-mcp@latest` com env API_KEY
- **Requer**: Node.js v22+, conta TestSprite, API key
- **Fallback**: Playwright E2E ou testes manuais

### 9. Playwright (Bônus)
- **Tipo**: npx (stdio)
- **Função**: Automação de browser determinística — testes, scraping, validação
- **Política**: Fallback para Browser e TestSprite
- **Usado por**: Disponível como capacidade auxiliar
- **Config**: `npx -y @playwright/mcp@latest`
- **Quando usar**: Quando TestSprite não está disponível ou para testes determinísticos via accessibility tree

---

## Mapeamento: Política → MCP

| Política | MCP Principal | Fallback |
|----------|--------------|----------|
| `DOCS-FIRST` | Context7 | Buscar docs manualmente |
| `UI-FROM-REGISTRY-FIRST` | shadcn | cva + Radix custom |
| `VALIDATE-BEFORE-DEPLOY` | TestSprite | Playwright / testes manuais |
| `DEPLOY-WITH-OBSERVABILITY` | Vercel | `vercel` CLI / VPS deploy |
| `BACKEND-AWARE` | Supabase (padrão) | Convex (se explícito) |
| `AUTOMATION-AWARE` | n8n-mcp | JSON Blueprint offline |
| `N8N-PRODUCTION-SHIELD` | n8n-mcp (read-only) | — |

---

## Fluxo Típico de MCPs por Workflow

```
/novo-funil:
  Context7 → shadcn → Supabase → TestSprite → Vercel
  (docs)     (UI)     (backend)  (validar)    (deploy)

/deploy:
  TestSprite → Supabase → Vercel (preview) → Playwright → Vercel (prod)
  (validar)    (backend)  (preview)           (tracking)   (produção)

/diagnostico-conversao:
  Supabase → Vercel → Context7 → shadcn → TestSprite
  (dados)    (logs)   (docs)     (UI fix)  (validar)

/motion-lab:
  Context7 → shadcn
  (docs)     (UI base)

/auditoria-completa:
  Playwright → Vercel → Context7 → TestSprite → Supabase
  (navegar)    (logs)   (docs)     (validar)    (schema)
```

---

## Credenciais Necessárias

| MCP | Credencial | Onde obter |
|-----|-----------|------------|
| Supabase (remoto) | project_ref | Dashboard Supabase |
| supabase-mcp-server | access-token | Dashboard Supabase → Settings → Access Tokens |
| n8n-mcp | API key + URL | n8n → Settings → API |
| Context7 | API key (opcional) | [context7.com/dashboard](https://context7.com/dashboard) |
| shadcn | — | Nenhuma |
| Vercel | OAuth | Autenticação automática na 1ª execução |
| Convex | Login Convex | `npx convex login` |
| TestSprite | API key | [testsprite.com](https://testsprite.com) → Settings → API Keys |
| Playwright | — | Nenhuma |
