# 🚀 Guia de Uso — Ecossistema Antigravity

> Este guia explica de forma simples como usar o sistema de agents, workflows, skills e MCPs do Antigravity.

---

## O que é isso tudo?

Imagine que você tem uma **equipe inteira de especialistas** trabalhando dentro do seu editor de código. Cada especialista sabe fazer uma coisa muito bem. O sistema do Antigravity organiza esses especialistas para que você consiga:

- Criar landing pages premium
- Construir funis de venda
- Fazer animações avançadas
- Diagnosticar problemas
- Criar ofertas, copy, criativos
- E muito mais

Você não precisa saber quem faz o quê. Basta pedir — e o sistema roteia para o especialista certo.

---

## Como Começar

### A forma mais simples: usar o `/orquestrador`

O `/orquestrador` é o **comandante geral** do sistema. Ele entende o que você quer, escolhe os especialistas certos e coordena tudo.

**Para usar**, basta digitar no chat:

```
/orquestrador [o que você quer fazer]
```

**Exemplos:**

```
/orquestrador Quero criar uma landing page premium para um SaaS de gestão

/orquestrador Preciso de um funil gamificado para um curso online

/orquestrador A conversão do meu funil caiu, precisa diagnosticar

/orquestrador Quero criar uma hero animada estilo Apple para minha landing page

/orquestrador Preciso de um dashboard de analytics
```

O `/orquestrador` vai:
1. Entender o que você quer
2. Verificar se já tem informações sobre o produto/público
3. Escolher o melhor caminho (workflow ou skill)
4. Coordenar a execução
5. Entregar o resultado

**Você não precisa saber qual skill usar.** Só falar o objetivo.

---

## Workflows — Os Caminhos Prontos

Workflows são **roteiros completos** para tarefas comuns. Cada um tem etapas definidas.

| Comando | O que faz | Quando usar |
|---------|----------|------------|
| `/novo-funil` | Cria um funil do zero (pesquisa → design → código → deploy) | Quando quiser um funil novo |
| `/novo-produto` | Define produto, persona, oferta e posicionamento | Quando estiver começando do zero |
| `/novo-criativo` | Cria peças de anúncio (ad, carrossel, vídeo) | Quando precisar de criativos |
| `/deploy` | Publica o projeto em produção | Quando o código estiver pronto |
| `/diagnostico-conversao` | Investiga por que a conversão caiu | Quando as métricas piorarem |
| `/auditoria-completa` | Revisão total (tracking, UX, copy, técnica, criativos) | Antes de escalar ou periodicamente |
| `/escalar-funil` | Otimiza um funil que já está convertendo | Quando quiser escalar |
| `/recovery-campanha` | Recupera leads que abandonaram o funil | Quando quiser reativar leads |
| `/motion-lab` | Cria animações e efeitos visuais premium | Quando quiser motion avançado |

**Para usar**, digite o comando diretamente:

```
/novo-funil para um produto de emagrecimento

/motion-lab quero criar uma hero animada com gradients e glow

/deploy
```

---

## Skills — Os Especialistas

Skills são especialistas individuais. Normalmente o `/orquestrador` escolhe automaticamente, mas você pode chamar diretamente se souber o que precisa.

### 📋 Tabela Rápida

| Área | Skills | O que fazem |
|------|--------|------------|
| **Estratégia** | product-intelligence, offer-architect, estrategista-vendas, behavioral-intelligence | Pesquisar mercado, criar ofertas, entender público |
| **Funil** | funnel-architect, high-ticket-architect, post-purchase-architect, typebot-json-architect | Projetar funis, onboarding, chatbots |
| **Copy** | copywriting-engine, vsl-architect | Escrever textos de venda, roteiros de vídeo |
| **Design** | design-system, frontend-design, ux-designer, motion-architect, motion-systems-architect | Criar interfaces, animações, design premium |
| **Analytics** | analytics-strategist, tracking-implementation, cro-optimizer, growth-engine | Tracking, métricas, otimização |
| **Recovery** | recovery-architect | Recuperar leads |
| **Criativos** | creative-director | Criar anúncios e peças |
| **Técnico** | arquitetura, debugging, tdd, validacao, auditoria-seguranca, design-api, documentacao, criar-pr | Código, testes, segurança, deploy |
| **Ideação** | brainstorming | Validar ideias antes de implementar |

---

## MCPs — As Ferramentas Externas

MCPs são **conexões com ferramentas externas** que o sistema usa automaticamente. Você não precisa gerenciá-los manualmente.

### O que está ativo

| MCP | O que faz | Quando entra |
|-----|----------|-------------|
| **Context7** | Busca documentação atualizada de libs | Antes de usar qualquer biblioteca |
| **shadcn MCP** | Busca componentes UI prontos | Antes de criar botão, modal, input etc. |
| **Supabase** | Acessa seu banco de dados | Quando o projeto precisa de backend |
| **TestSprite** | Testa fluxos automaticamente | Antes de deploy |
| **Filesystem** | Lê e escreve arquivos | Sempre |
| **Browser** | Pesquisa na web | Quando precisa de referências |

### O que está disponível como opção

| MCP | O que faz | Quando usar |
|-----|----------|------------|
| **Vercel** | Deploy e logs | Se o projeto usar Vercel |
| **Convex** | Backend reativo | Se o projeto usar Convex |
| **GitHub** | Branches, PRs | Se usar GitHub |
| **Figma** | Lê designs | Se tiver designs no Figma |

**Você não precisa chamar MCPs manualmente.** O sistema usa automaticamente quando necessário.

---

## Memory — O que o Sistema Lembra

O sistema guarda informações em pastas de memória para não perder contexto entre conversas:

| Pasta | O que guarda |
|-------|-------------|
| `memory/product-briefs/` | Descrição dos seus produtos |
| `memory/personas/` | Perfil do público-alvo |
| `memory/mechanisms/` | Mecanismos de venda |
| `memory/learnings/` | Lições aprendidas em projetos |
| `memory/patterns/` | Padrões que funcionaram |
| `memory/stack-recommendations/` | Stack usada em cada projeto |

**Dica:** Se o sistema perguntar sobre seu produto ou público, vale responder com detalhes. Ele vai salvar e usar nas próximas vezes.

---

## Sua Stack Real

O sistema sabe que o seu ambiente de produção é:

```
VPS própria + Ubuntu + Nginx + Supabase
```

Isso significa que:
- Deploy vai para sua VPS (não Vercel)
- Backend é Supabase (não Convex)
- Tudo é otimizado para esse ambiente

---

## Exemplos do Dia a Dia

### "Quero criar uma landing page"
```
/orquestrador Quero criar uma landing page premium para [meu produto]
```
O sistema vai: pesquisar → definir persona → criar copy → projetar UI → implementar → deploy.

### "Quero uma animação incrível na hero"
```
/motion-lab Quero uma hero com gradients animados, glow e entrada cinematográfica
```
O sistema vai: analisar o pedido → decompor em camadas → definir stack → gerar spec → implementar.

### "Minha conversão caiu"
```
/diagnostico-conversao Meu funil estava em 3% e caiu para 1.2%
```
O sistema vai: checar tracking → analisar dados → verificar UX → diagnosticar → corrigir.

### "Quero recriar uma animação que vi num site"
```
/motion-lab modo engenharia reversa — referência: [URL do site]
```
O sistema vai: abrir e analisar → decompor efeitos → identificar técnicas → traduzir para seu stack.

### "Preciso de um funil gamificado"
```
/novo-funil gamificado para [produto], com quiz de 7 etapas e XP system
```
O sistema vai: definir persona → projetar mapa de quiz → escrever copy → criar UI → backend → tracking → deploy.

---

## Regras de Ouro

1. **Sempre comece pelo `/orquestrador`** se não tiver certeza do que usar
2. **Seja específico no pedido** — quanto mais contexto, melhor o resultado
3. **Informe seu público e produto** — ajuda o sistema a tomar decisões estratégicas
4. **Não se preocupe com o que acontece por trás** — o sistema cuida do roteamento
5. **Se algo não ficou bom, peça para ajustar** — o sistema mantém o contexto

---

## Onde Fica Cada Coisa

```
.agents/
├── workflows/          ← Roteiros prontos (/novo-funil, /deploy, /motion-lab etc.)
│   └── orquestrador.md ← O comandante geral
├── skills/             ← Os especialistas (29 skills)
├── memory/             ← Memória do sistema (personas, briefs, learnings)
└── reference/          ← Documentação técnica (stack, MCPs, tools, componentes)
```

---

## Resumo

| Se você quer... | Use... |
|----------------|--------|
| Fazer qualquer coisa complexa | `/orquestrador` |
| Criar funil do zero | `/novo-funil` |
| Criar animações premium | `/motion-lab` |
| Publicar em produção | `/deploy` |
| Diagnosticar problema | `/diagnostico-conversao` |
| Analisar tudo | `/auditoria-completa` |
| Recuperar leads | `/recovery-campanha` |
| Criar produto novo | `/novo-produto` |
| Criar anúncios | `/novo-criativo` |
| Escalar algo que funciona | `/escalar-funil` |
