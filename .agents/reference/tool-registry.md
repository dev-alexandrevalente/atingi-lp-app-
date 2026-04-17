# 🔧 Tool Registry — Antigravity

> Mapa oficial de tools e MCPs autorizados. Alinhado com `mcp-registry.md` e `stack-oficial.md`.

---

## MCP Tools (Servidores Externos)

| Tool | Categoria | Finalidade | Skills Autorizadas | Workflows | Risco | Fallback | Obs |
|------|----------|-----------|-------------------|-----------|-------|----------|-----|
| `context7` | 🔴 MCP Core | Docs atualizadas de libs/frameworks | Todas as skills técnicas | Todos com implementação | Nenhum | search_web + docs oficiais | **SEMPRE consultar antes de implementar lib** |
| `shadcn-mcp` | 🔴 MCP Core | Navegar/instalar componentes UI | design-system, frontend-design, ux-designer, motion-architect | /novo-funil | Baixo | `npx shadcn@latest add` | **SEMPRE buscar antes de criar UI do zero** |
| `vercel-mcp` | 🔴 MCP Core | Deploy, logs, debug, rollback, env vars | arquitetura, validacao, debugging, tracking-implementation, frontend-design | /deploy, /auditoria-completa | Alto | `vercel` CLI ou Dashboard | Deploy prod requer confirmação |
| `testsprite` | 🟠 MCP High | Testes automatizados em linguagem natural | validacao, tdd, debugging, frontend-design | /deploy, /auditoria-completa, /diagnostico-conversao | Baixo | Playwright, testes manuais | **Validar antes de deploy** |
| `convex-mcp` | 🟠 MCP High | Backend reativo: dados, functions, jobs | arquitetura, frontend-design, analytics-strategist, tracking, funnel-architect, debugging | /novo-funil, /diagnostico-conversao, /auditoria-completa | Alto | Convex CLI ou Dashboard | **Backend padrão para projetos novos** |
| `github` | 🟠 MCP High | Branches, PRs, issues | criar-pr, documentacao, debugging, arquitetura, validacao | /deploy | Médio | `git` CLI | PR obrigatório para prod |
| `browser` | 🟠 MCP High | Pesquisa web, scraping, screenshots | product-intelligence, analytics-strategist, creative-director, cro-optimizer, tracking-implementation | /novo-produto, /auditoria-completa | Baixo | Pesquisa manual | Somente leitura |
| `supabase-mcp` | ⚪ MCP Legacy | BaaS PostgreSQL (projetos existentes) | arquitetura, analytics-strategist, tracking, funnel-architect, frontend-design | Projetos legados | Alto | Supabase CLI/Dashboard | **Apenas projetos existentes** |
| `figma` | 🟡 MCP Optional | Leitura de designs e tokens | design-system, frontend-design, ux-designer | /novo-funil (se Figma) | Baixo | Export manual | Read-only |
| `notion` | 🟡 MCP Optional | Documentação externa | documentacao, product-intelligence | /novo-produto | Baixo | Notion web UI | — |

---

## Dev Tools (Package/Runtime)

| Tool | Categoria | Finalidade | Skills Autorizadas | Workflows | Risco | Fallback |
|------|----------|-----------|-------------------|-----------|-------|----------|
| `pnpm` | Package Manager | Instalar/gerenciar dependências | arquitetura, frontend-design, tdd | /deploy | Baixo | npm |
| `next` | Framework | Dev server, build, SSR/SSG | frontend-design, arquitetura | /deploy, /novo-funil | Baixo | — |
| `convex` | CLI | Backend dev, deploy functions | arquitetura, frontend-design | /deploy, /novo-funil | Médio | Dashboard |
| `eslint` | Linting | Análise estática JS/TS | validacao | /deploy | Baixo | — |
| `prettier` | Formatter | Formatação de código | validacao | /deploy | Baixo | — |
| `typescript` | Type Check | Verificação de tipos | validacao, tdd | /deploy | Baixo | — |
| `vitest` | Testing | Testes unitários/integração | tdd | /deploy | Baixo | jest |
| `playwright` | E2E Testing | Testes de browser | tdd, validacao | /deploy | Baixo | cypress |

## UI/Design Tools

| Tool | Categoria | Finalidade | Skills Autorizadas | Risco | Fallback |
|------|----------|-----------|-------------------|-------|----------|
| `tailwindcss` | CSS | Utility-first styles | design-system, frontend-design | Baixo | CSS manual |
| `shadcn` | CLI | Instalar componentes UI | design-system, frontend-design | Baixo | Copiar de repo |
| `cva` | Variants | Variantes de componentes | frontend-design, design-system | Baixo | className manual |
| `lucide-react` | Icons | Ícones consistentes | frontend-design | Baixo | SVG manual |

## Motion/3D Tools

| Tool | Categoria | Finalidade | Skills Autorizadas | Risco | Fallback |
|------|----------|-----------|-------------------|-------|----------|
| `gsap` | Motion L4 | Timelines cinematográficas | motion-architect, frontend-design | Baixo | CSS animations |
| `motion` | Motion L2 | UI animations, gestures | motion-architect, frontend-design | Baixo | CSS transitions |
| `lenis` | Scroll L3 | Smooth scroll, parallax | motion-architect, frontend-design | Baixo | CSS scroll |
| `three` | 3D L5 | WebGL rendering | frontend-design | Baixo | Imagem estática |
| `@react-three/fiber` | 3D React | Three.js em React | frontend-design | Baixo | Three.js vanilla |

## Data/State Tools

| Tool | Categoria | Finalidade | Skills Autorizadas | Risco | Fallback |
|------|----------|-----------|-------------------|-------|----------|
| `convex` | Backend | Banco + functions + real-time | frontend-design, arquitetura | Médio | Supabase |
| `zustand` | State | Client state management | frontend-design, funnel-architect | Baixo | React Context |
| `@tanstack/query` | Data Fetching | Server state + cache | frontend-design, arquitetura | Baixo | SWR |
| `@tanstack/table` | Tables | Tabelas reativas | frontend-design | Baixo | HTML table |
| `recharts` | Charts | Gráficos para dashboards | frontend-design | Baixo | chart.js |

## Business/Service Tools

| Tool | Categoria | Finalidade | Skills Autorizadas | Risco | Fallback |
|------|----------|-----------|-------------------|-------|----------|
| `stripe` | Payment | Checkout, subscriptions | funnel-architect | Alto | Hotmart/Kiwify |
| `resend` | Email | Email transacional | recovery-architect | Médio | SendGrid |
| `growthbook` | Experiment | A/B testing, feature flags | cro-optimizer, analytics-strategist | Médio | Manual A/B |
| `clarity` | Analytics | Heatmaps, session replay | analytics-strategist, cro-optimizer | Baixo | Hotjar |
| `tiptap` | Editor | Rich text editor | frontend-design | Baixo | textarea |

---

## Regras de Uso

```
1. Toda tool deve estar no package.json (nada global exceto pnpm)
2. Versões fixas em produção (^version em dev)
3. Tool com risco ALTO → exige aprovação antes de executar
4. Tool sem uso há 30 dias → avaliar remoção
5. Nunca usar 2 tools para o mesmo propósito no mesmo projeto
6. Preferir tools com bundle size menor quando houver equivalência
7. MCPs Core devem estar configurados em todo projeto novo
8. MCPs High devem ser configurados conforme necessidade do projeto
```

## MCP-First Workflow

```
ANTES DE IMPLEMENTAR:
1. Context7 → buscar docs da lib
2. shadcn MCP → buscar componente existente

ANTES DE DEPLOY:
3. TestSprite → validar fluxos críticos
4. Vercel MCP → preview deploy

DURANTE OPERAÇÃO:
5. Convex/Supabase MCP → backend-aware operations
6. Browser → verificação de tracking e UX

APÓS DEPLOY:
7. Vercel MCP → logs e observabilidade
```
