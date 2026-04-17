# 🔌 MCP Registry — Antigravity

> Registro oficial de MCP servers. Última atualização: 2026-03-25.

---

## Arquitetura MCP

```
┌──────────────────────────────────────────────────────┐
│                   /orquestrador                       │
│    (estrategista + coordenador + diretor de build)   │
├──────────────────────────────────────────────────────┤
│                  Skills Layer                         │
│       (cada skill declara MCPs autorizados)          │
├──────────────────────────────────────────────────────┤
│                  MCP Router                           │
│    (roteia + aplica políticas de segurança)           │
├───────┬────────┬──────────┬─────────┬────────────────┤
│Context│ shadcn │Supabase  │TestSprite│   Browser     │
│  7    │  MCP   │  MCP     │  MCP    │   Research    │
├───────┼────────┼──────────┼─────────┼────────────────┤
│  FS   │ GitHub │ Vercel   │ Convex  │ Figma/Notion  │
└───────┴────────┴──────────┴─────────┴────────────────┘
```

---

## Tiers de Prioridade

| Tier | Significado | MCPs |
|------|------------|------|
| **🔴 Core** | Obrigatório em todo projeto. Ativar por padrão. | Context7, shadcn MCP, Supabase MCP, Filesystem |
| **🟠 High** | Altamente recomendado. Ativar conforme projeto. | TestSprite, GitHub, Browser |
| **🟡 Optional** | Útil quando aplicável. Ativar sob demanda. | Vercel MCP, Convex MCP, Figma, Notion |

> **Ambiente de produção:** VPS / Ubuntu / Nginx + Supabase.
> Vercel e Convex estão disponíveis como alternativas, mas não são o deploy/backend padrão.

---

## Registry de MCP Servers

### 🔴 CORE — Context7 MCP

```yaml
name: context7
categoria: Documentação Inteligente
prioridade: CORE
descrição: >
  Acesso a documentação atualizada e version-specific de frameworks,
  bibliotecas e ferramentas. Previne implementação com APIs
  desatualizadas ou deprecated.

quando_usar:
  - SEMPRE antes de implementar qualquer lib/framework externo
  - Ao atualizar dependências
  - Quando surgir dúvida sobre API de biblioteca
  - Quando documentação oficial puder estar desatualizada

quando_NAO_usar:
  - Código interno do projeto (sem lib externa)
  - Copy, estratégia, oferta (skills não-técnicas)

capabilities:
  - resolve: Buscar bibliotecas por nome
  - get_library_docs: Obter documentação version-specific

skills_autorizadas:
  - frontend-design
  - design-system
  - motion-architect
  - tracking-implementation
  - analytics-strategist
  - arquitetura
  - tdd
  - validacao
  - debugging
  - QUALQUER skill que implemente com lib externa

workflows:
  - /novo-funil (toda fase de implementação)
  - /deploy (verificar compatibilidade)
  - /auditoria-completa (verificar versões)

risco: NENHUM (somente leitura de docs)
fallback: Busca web manual de documentação
segurança: Nenhuma restrição — leitura pública
```

**Política docs-first:**
```
REGRA OBRIGATÓRIA:
Antes de usar qualquer lib/framework, executar:
1. context7 → resolve("[nome-da-lib]")
2. context7 → get_library_docs("[lib-id]", topic="[o que precisa]")
3. Só então implementar com a API correta e atualizada

VIOLAÇÃO: Implementar sem consultar Context7 quando a lib é
externa = risco de código deprecated ou breaking changes.
```

---

### 🔴 CORE — shadcn MCP

```yaml
name: shadcn
categoria: Component Registry
prioridade: CORE
descrição: >
  Acesso ao registry oficial do shadcn/ui e registries
  terceirizados. Navegar, buscar, inspecionar e instalar
  componentes UI acessíveis e customizáveis.

quando_usar:
  - Antes de criar qualquer componente UI do zero
  - Ao inicializar design system de projeto novo
  - Quando precisar de componente acessível
  - Ao buscar variantes de componentes existentes

quando_NAO_usar:
  - Componentes 100% custom sem paralelo no registry
  - Animações e motion (usar motion-architect)
  - Componentes de gamificação custom

capabilities:
  - list_registries: Listar registries disponíveis
  - search_components: Buscar componentes por nome/função
  - get_component_details: Ver código, props, variantes
  - install_component: Instalar no projeto via CLI

skills_autorizadas:
  - design-system
  - frontend-design
  - ux-designer
  - motion-architect (quando componente base é shadcn)

workflows:
  - /novo-funil (fase 4 — design e implementação)

risco: BAIXO (instala código no projeto, não binários)
fallback: shadcn CLI manual (npx shadcn@latest add [component])
segurança:
  - Verificar que componente vem de registry oficial ou trusted
  - Revisar código instalado antes de commit
```

**Política UI-from-registry-first:**
```
REGRA OBRIGATÓRIA:
Antes de criar um componente UI:
1. shadcn MCP → search_components("[tipo]")
2. Se existir → instalar e customizar
3. Se NÃO existir → criar custom seguindo padrões shadcn (cva, Radix)

NUNCA: Reinventar Button, Dialog, Input, Select, Tabs, Accordion,
etc. — use shadcn/Radix como base.
```

---

### 🔴 CORE — Vercel MCP

```yaml
name: vercel
categoria: Deploy, Observabilidade, Infraestrutura
prioridade: CORE
descrição: >
  Plataforma central de deploy, debug, logs, observabilidade,
  domínios, env vars, rollback e investigação pós-deploy.
  Não é apenas "deploy tool" — é o centro nervoso de
  infraestrutura do Antigravity.

quando_usar:
  - Deploy (preview e produção)
  - Investigação de erros em produção
  - Leitura de logs de runtime
  - Debug de builds que falham
  - Verificação pós-deploy
  - Rollback de emergência
  - Gestão de environment variables
  - Gestão de domínios

quando_NAO_usar:
  - Desenvolvimento local (usar dev server)
  - Tarefas de código sem relação com infra

capabilities:
  - deploy: Deploy para preview ou produção
  - list_deployments: Listar deploys recentes
  - get_deployment_logs: Ler logs do deployment
  - manage_env_vars: Criar/editar/deletar env vars
  - manage_domains: Configurar domínios custom
  - rollback: Reverter para deploy anterior
  - get_project_info: Informações do projeto
  - check_deployment_status: Status de build/deploy

skills_autorizadas:
  - arquitetura (configuração de projeto)
  - validacao (pré-deploy checks)
  - debugging (investigação pós-deploy)
  - tracking-implementation (verificar se tracking carrega em prod)
  - frontend-design (verificar deploy visual)

workflows:
  - /deploy (CENTRAL — todas as fases)
  - /auditoria-completa (verificação de infra)
  - /diagnostico-conversao (investigar se problema é de deploy)

risco: ALTO (pode afetar produção)
fallback: Vercel CLI (vercel) ou Dashboard web
segurança:
  - Preview deploys primeiro (NUNCA deploy direto em prod sem preview)
  - Env vars separadas por ambiente (dev/preview/prod)
  - Rollback sempre disponível
  - Log de todos os deploys
  - Confirmação humana para deploy em produção
```

**Política deploy-with-observability:**
```
REGRA OBRIGATÓRIA:
1. vercel MCP → deploy (preview) → verificar visualmente
2. Confirmar tracking funciona no preview
3. Confirmar UX checklist no preview
4. vercel MCP → deploy (production) → APENAS após validação
5. vercel MCP → get_deployment_logs → verificar erros pós-deploy
6. Se erro → vercel MCP → rollback → investigar → corrigir
```

---

### 🔴 CORE — Filesystem

```yaml
name: filesystem
categoria: Infraestrutura Local
prioridade: CORE
descrição: Leitura e escrita de arquivos no workspace do projeto.

capabilities:
  - read_file, write_file, list_directory, search_files, move_file, delete_file

skills_autorizadas: TODAS
workflows: TODOS
risco: MÉDIO
fallback: Edição manual pelo usuário
segurança:
  - Restringir a diretório do projeto
  - Nunca acessar fora de workspace
  - Log de operações destrutivas
```

---

### 🟠 HIGH — TestSprite MCP

```yaml
name: testsprite
categoria: Testes Automatizados
prioridade: HIGH
descrição: >
  Validação automatizada de projetos usando linguagem natural.
  Gera e executa testes sem escrever código de teste manualmente.
  Reduz dependência de QA manual.

quando_usar:
  - Antes de deploy (validação automatizada)
  - Após implementar feature nova
  - Em fluxos críticos (checkout, quiz, formulários)
  - Em auditorias de qualidade
  - Quando TDD humano é insuficiente ou demorado

quando_NAO_usar:
  - Testes unitários de lógica pura (usar vitest)
  - Quando o projeto não tem UI (APIs puras)

capabilities:
  - run_tests: Executar testes em linguagem natural
  - validate_flow: Validar fluxo de usuário completo
  - check_accessibility: Verificar acessibilidade
  - check_responsiveness: Verificar responsividade

skills_autorizadas:
  - validacao (core user)
  - tdd (complemento a testes unitários)
  - debugging (reproduzir bugs)
  - frontend-design (validar implementação)

workflows:
  - /deploy (Fase 3 — testes)
  - /auditoria-completa (validação automatizada)
  - /diagnostico-conversao (testar fluxos problemáticos)

risco: BAIXO (somente leitura + execução de testes)
fallback: Testes manuais pelo usuário + Playwright
segurança:
  - Executar em ambiente de preview/dev (nunca produção)
  - Não persistir dados de teste
```

**Política validate-before-deploy:**
```
REGRA RECOMENDADA:
Antes de deploy em produção:
1. testsprite → validate_flow("fluxo crítico principal")
2. Se falhar → corrigir antes de deploy
3. Se passar → prosseguir com deploy

FLUXOS CRÍTICOS PARA VALIDAR:
- Formulário de captura (lead → submit → redirect)
- Quiz completo (início → seleção → resultado)
- Checkout (produto → pagamento → confirmação)
- Onboarding (step 1 → step N → conclusão)
```

---

### 🟡 OPTIONAL — Convex MCP

```yaml
name: convex
categoria: Backend Reativo
prioridade: OPTIONAL
descrição: >
  Backend-as-a-Service reativo com banco de dados transacional,
  functions serverless, real-time nativo, scheduling, file
  storage e auth. O agente ganha acesso direto ao deployment
  Convex para ler, otimizar e operar o backend.

quando_usar:
  - Projetos NOVOS que precisam de backend reativo
  - Apps com real-time nativo (chat, live dashboards, collab)
  - SaaS com complexidade de backend crescente
  - Projetos agentic-ready (AI + backend integrado)
  - Quando usar ACID transactions é importante

quando_NAO_usar:
  - Projetos legados já em Supabase (manter Supabase)
  - Projetos sem backend (landing pages estáticas)
  - Quando apenas SQL direto resolve

capabilities:
  - query_data: Consultar dados
  - mutate_data: Inserir/atualizar dados
  - list_functions: Listar functions do deployment
  - read_function_source: Ler código de uma function
  - deploy_functions: Deploy de functions
  - manage_scheduled_jobs: Agendar jobs
  - manage_storage: Gestão de arquivos

skills_autorizadas:
  - arquitetura (schema, functions, trade-offs)
  - frontend-design (data fetching com useQuery)
  - analytics-strategist (consultas de dados)
  - tracking-implementation (events server-side)
  - funnel-architect (quiz, leads, scores)
  - debugging (investigar dados/functions)

workflows:
  - /novo-funil (setup de backend)
  - /diagnostico-conversao (leitura de dados)
  - /auditoria-completa (métricas)

risco: ALTO (acesso a dados de produção)
fallback: Convex Dashboard (web UI) ou CLI
segurança:
  - Separar deployments: dev / prod
  - Revisar mutations antes de executar em prod
  - Nunca expor admin keys no frontend
  - Validator schemas SEMPRE definidos
  - Confirmação humana para mutations em prod
```

---

### 🟠 HIGH — GitHub

```yaml
name: github
categoria: Version Control
prioridade: HIGH
descrição: Gestão de repositórios, branches, PRs, issues.

capabilities:
  - create_branch, create_pull_request, list_issues
  - read_file_from_repo, push_commits, search_code

skills_autorizadas:
  - criar-pr, documentacao, debugging, arquitetura, validacao

workflows: /deploy
risco: MÉDIO
fallback: Git CLI
segurança:
  - Token com scope limitado (repo only)
  - Nunca push direto em main
  - PR obrigatório para produção
```

---

### 🟠 HIGH — Browser / Research

```yaml
name: browser
categoria: Pesquisa e Verificação
prioridade: HIGH
descrição: Navegação web, scraping, pesquisa, captura de tela.

capabilities:
  - navigate_url, read_page_content, take_screenshot
  - search_web, extract_structured_data

skills_autorizadas:
  - product-intelligence, analytics-strategist, creative-director
  - cro-optimizer, tracking-implementation

workflows: /novo-produto, /auditoria-completa
risco: BAIXO (somente leitura)
fallback: Pesquisa manual
segurança: Apenas leitura pública, respeitar robots.txt
```

---

### 🟡 OPTIONAL — Figma

```yaml
name: figma
categoria: Design Source
prioridade: OPTIONAL
descrição: Leitura de designs, extração de tokens e assets.

capabilities:
  - read_file_design, extract_tokens, list_components, export_assets

skills_autorizadas: design-system, frontend-design, ux-designer
workflows: /novo-funil (se design em Figma)
risco: BAIXO (somente leitura)
fallback: Exportação manual
segurança: Token read-only
```

---

### 🟡 OPTIONAL — Notion

```yaml
name: notion
categoria: Documentação Externa
prioridade: OPTIONAL
descrição: Leitura e escrita de documentação e bases de dados Notion.

capabilities:
  - read_page, create_page, update_page, query_database

skills_autorizadas: documentacao, product-intelligence
workflows: /novo-produto
risco: BAIXO-MÉDIO
fallback: Notion web UI
segurança: Token com acesso granular
```

---

### 🔴 CORE — Supabase MCP

```yaml
name: supabase
categoria: Backend Principal
prioridade: CORE
descrição: >
  Backend principal do Antigravity. PostgreSQL, auth, storage,
  edge functions, RLS. Rodando em produção no ambiente real
  (VPS / Ubuntu / Nginx).

quando_usar:
  - Projetos EXISTENTES que já usam Supabase
  - Quando SQL direto/PostgreSQL é requisito estrito
  - Quando RLS (Row Level Security) granular é crítico

quando_NAO_usar:
  - Projetos novos (avaliar Convex primeiro)
  - Quando real-time nativo é prioridade (Convex é melhor)

capabilities:
  - query_database, insert_data, update_data, manage_tables
  - manage_rls_policies, deploy_edge_function
  - manage_storage, manage_auth_users

skills_autorizadas:
  - arquitetura, analytics-strategist, tracking-implementation
  - funnel-architect, frontend-design

workflows: /novo-funil (se projeto Supabase), /diagnostico-conversao
risco: ALTO (dados de produção)
fallback: Supabase Dashboard
segurança:
  - Service role key NUNCA no frontend
  - Anon key com RLS sempre ativado
```

---

## Routing Rules

```
REGRA 1 — DOCS-FIRST
  Antes de implementar com lib externa:
  Context7 → resolve + get_library_docs → ENTÃO implementar

REGRA 2 — UI-FROM-REGISTRY-FIRST
  Antes de criar componente UI:
  shadcn MCP → search → Se existe: instalar → Se não: criar custom

REGRA 3 — VALIDATE-BEFORE-DEPLOY
  Antes de deploy em produção:
  TestSprite → validate_flow(fluxo crítico) → Se passa: deploy

REGRA 4 — DEPLOY-WITH-OBSERVABILITY
  Após deploy:
  Vercel MCP → get_deployment_logs → verificar erros
  Se erro → Vercel MCP → rollback

REGRA 5 — BACKEND-AWARE
  Em projetos com backend:
  Convex MCP (para projetos novos) ou Supabase MCP (para legado)
  Agente pode ler/otimizar backend diretamente

REGRA 6 — CONFIRMAÇÃO HUMANA
  Operações com risco ALTO ou CRÍTICO:
  Deploy prod, delete, database mutation → SEMPRE confirmar

REGRA 7 — FALLBACK GRACEFUL
  Se MCP indisponível → notificar + sugerir ação manual + continuar
  Se MCP retornar erro → retry 1x → se falhar → fallback manual

REGRA 8 — SEPARAÇÃO DE AMBIENTES
  Nunca misturar MCPs de produção e desenvolvimento
  Deploy preview ANTES de deploy prod
  Backend dev SEPARADO de backend prod
```

---

## Security Policy

### Classificação de Risco

| Nível | Operações | Política |
|-------|----------|---------|
| **NENHUM** | Context7 (ler docs), Browser (ler web) | Auto-executar |
| **BAIXO** | shadcn (instalar componente), Filesystem (ler), Figma (ler) | Auto-executar com log |
| **MÉDIO** | Filesystem (escrever), GitHub (branch/PR), Notion (escrever) | Executar com log |
| **ALTO** | Vercel (deploy), Convex (mutate), Supabase (mutate), GitHub (push) | Confirmar com usuário |
| **CRÍTICO** | Deploy em produção, delete dados, rollback, push em main | Dupla confirmação |

### Gestão de Tokens

```
ARMAZENAMENTO: .env.local (NUNCA em código-fonte)
ROTAÇÃO: A cada 90 dias
PRINCÍPIO: Menor privilégio possível
SEPARAÇÃO: Tokens diferentes para dev/staging/prod
AUDITORIA: Verificar tokens ativos a cada deploy
```

---

## Fallback Policy

| MCP | Se Indisponível | Fallback |
|-----|----------------|---------|
| Context7 | Busca web manual | Documentação oficial + search_web |
| shadcn MCP | CLI manual | `npx shadcn@latest add [component]` |
| Vercel MCP | CLI manual | `vercel deploy` / Dashboard web |
| TestSprite | Testes manuais | Playwright / testes humanos |
| Convex MCP | CLI manual | `npx convex` / Dashboard web |
| Supabase MCP | CLI manual | `supabase` CLI / Dashboard web |
| GitHub | CLI manual | `git` commands |
| Browser | Pesquisa manual | Usuário pesquisa e cola |
| Figma | Export manual | Usuário exporta do Figma |
| Notion | UI manual | Usuário usa Notion web |
| Filesystem | Editor manual | Usuário edita arquivo |

---

## Matriz: Skills × MCPs

| Skill | Context7 | shadcn | Vercel | TestSprite | Convex | Supabase | GitHub | Browser | FS |
|-------|---------|--------|--------|-----------|--------|---------|--------|---------|-----|
| `frontend-design` | ✅ | ✅ | ✅ | ✅ | ✅ | ⚪ | — | — | ✅ |
| `design-system` | ✅ | ✅ | — | — | — | — | — | — | ✅ |
| `motion-architect` | ✅ | ✅ | — | — | — | — | — | — | ✅ |
| `tracking-implementation` | ✅ | — | ✅ | — | ✅ | ⚪ | — | ✅ | ✅ |
| `analytics-strategist` | ✅ | — | — | — | ✅ | ⚪ | — | ✅ | ✅ |
| `arquitetura` | ✅ | — | ✅ | — | ✅ | ⚪ | ✅ | — | ✅ |
| `validacao` | ✅ | — | ✅ | ✅ | — | — | ✅ | — | ✅ |
| `tdd` | ✅ | — | — | ✅ | — | — | — | — | ✅ |
| `debugging` | ✅ | — | ✅ | ✅ | ✅ | ⚪ | ✅ | — | ✅ |
| `criar-pr` | — | — | — | — | — | — | ✅ | — | ✅ |
| `documentacao` | — | — | — | — | — | — | ✅ | — | ✅ |
| `ux-designer` | — | ✅ | — | — | — | — | — | — | ✅ |
| `funnel-architect` | — | — | — | — | ✅ | ⚪ | — | — | ✅ |
| `product-intelligence` | — | — | — | — | — | — | — | ✅ | ✅ |
| `creative-director` | — | — | — | — | — | — | — | ✅ | ✅ |
| `cro-optimizer` | — | — | — | — | — | — | — | ✅ | ✅ |
| `auditoria-seguranca` | ✅ | — | — | — | — | — | — | — | ✅ |

✅ = Autorizado | ⚪ = Apenas em projetos legacy Supabase | — = Não aplicável

---

## Matriz: Workflows × MCPs

| Workflow | MCPs Usados | Ordem | Risco | Fallback |
|----------|------------|-------|-------|----------|
| `/deploy` | Vercel (deploy), TestSprite (validate), GitHub (push) | TestSprite → GitHub → Vercel | ALTO | CLI manual |
| `/novo-funil` | Context7 (docs), shadcn (UI), Convex/Supabase (backend), Vercel (deploy) | Context7 → shadcn → Convex → Vercel | MÉDIO | Implementação manual |
| `/diagnostico-conversao` | Browser (verificar), Convex/Supabase (dados), Vercel (logs) | Browser → Backend → Vercel | BAIXO | Dashboard + análise manual |
| `/auditoria-completa` | Browser (verificar tracking), Vercel (logs), TestSprite (validar) | Browser → Vercel → TestSprite | BAIXO | Auditoria manual |
| `/novo-produto` | Browser (pesquisa) | Browser | NENHUM | Pesquisa manual |
| `/novo-criativo` | Browser (referências) | Browser | NENHUM | Pesquisa manual |
| `/recovery-campanha` | Convex/Supabase (dados de abandono) | Backend | BAIXO | Dashboard |
| `/escalar-funil` | Convex/Supabase (analytics), Vercel (deploy) | Backend → Vercel | MÉDIO | Dashboard + CLI |
