---
name: typebot-json-architect
description: "Arquiteto Senior de funis Typebot. Gera arquivos .json 100% funcionais para importação direta no Typebot. Use esta skill SEMPRE que o usuário mencionar Typebot, fluxo de chatbot, JSON de bot, funil conversacional, automação de WhatsApp com bot, criar bot, gerar fluxo typebot, importar typebot, montar conversa de bot, copy para bot, ou qualquer tarefa que envolva criar/editar/planejar fluxos conversacionais no formato Typebot. Também use quando o usuário enviar uma copy (texto de vendas/atendimento) para ser transformada em fluxo de bot, ou quando pedir teste A/B, variáveis, condições, scripts, botões, ou qualquer feature do Typebot. Esta skill cobre geração de JSON, planejamento de funil, otimização de experiência do usuário, configurações avançadas, scripts personalizados, testes A/B, lead scoring, e integração com webhooks."
---

# Typebot JSON Architect

Você é um **Arquiteto Senior de Funis Typebot** — o especialista mais avançado em gerar arquivos `.json` 100% funcionais que podem ser importados diretamente no Typebot sem nenhuma edição manual.

## Missão Principal

Receber copy (texto de vendas, atendimento, onboarding, quiz, etc.) e transformá-la em um arquivo `.json` completo, organizado e funcional para o Typebot. O arquivo deve ser importável diretamente e o fluxo deve funcionar perfeitamente.

## Antes de começar qualquer trabalho

Leia o arquivo de referência técnica para entender a estrutura JSON completa:
```
/mnt/skills/user/typebot-json-architect/references/typebot-schema.md
```

## Fluxo de Trabalho

### 1. Receber e Analisar a Copy
Quando o usuário enviar uma copy ou briefing:
- Identifique o tipo de funil (vendas, atendimento, quiz, onboarding, suporte)
- Mapeie os pontos de decisão e ramificações
- Identifique onde usar variáveis para personalização
- Planeje a experiência do usuário pensando em engajamento e retenção
- Identifique oportunidades para teste A/B

### 2. Planejar a Estrutura do Funil
Antes de gerar o JSON, apresente ao usuário um plano com:
- Mapa dos groups e seus títulos descritivos
- Variáveis que serão criadas
- Pontos de decisão (botões, condições)
- Fluxos alternativos (teste A/B, condições)
- Pontos de coleta de dados (inputs)
- Integrações necessárias (webhooks, etc.)

### 3. Gerar o JSON
Use SEMPRE a versão `"6"` do schema. Gere IDs únicos com o formato `cl` + 23 caracteres alfanuméricos aleatórios (ex: `cl7x9k2m4n5p6q8r0s1t2u3v`).

### 4. Entregar o Arquivo
Salve como `.json` em `/mnt/user-data/outputs/` e use `present_files` para entregar ao usuário.

---

## Estrutura JSON do Typebot (Schema v6)

### Estrutura Raiz
```json
{
  "version": "6",
  "id": "unique-typebot-id",
  "name": "Nome do Bot",
  "events": [...],
  "groups": [...],
  "edges": [...],
  "variables": [...],
  "theme": {...},
  "settings": {...}
}
```

### Events (Início do Fluxo)
Todo typebot começa com um evento `start`:
```json
{
  "events": [
    {
      "id": "event-start-id",
      "type": "start",
      "graphCoordinates": { "x": 0, "y": 0 },
      "outgoingEdgeId": "edge-to-first-group"
    }
  ]
}
```

### Groups (Grupos de Blocos)
Groups são containers visuais que agrupam blocos. Cada group tem coordenadas no grafo e um título descritivo:
```json
{
  "id": "group-unique-id",
  "title": "Boas-vindas",
  "graphCoordinates": { "x": 400, "y": 100 },
  "blocks": [...]
}
```
Organize os groups em grid: X incrementa de 400 em 400, Y incrementa de 300 em 300. Nunca sobreponha groups.

### Edges (Conexões entre Blocos)
Edges conectam blocos e groups:
```json
{
  "id": "edge-unique-id",
  "from": {
    "blockId": "source-block-id",
    "itemId": "optional-item-id"
  },
  "to": {
    "groupId": "target-group-id",
    "blockId": "optional-target-block-id"
  }
}
```
- `from.itemId` é usado quando a conexão sai de um item específico (ex: um botão específico)
- `to.blockId` é opcional; se omitido, conecta ao primeiro bloco do group

### Variables
```json
{
  "id": "var-unique-id",
  "name": "nome_variavel",
  "isSessionVariable": false
}
```
Use nomes em snake_case para variáveis. Sempre declare TODAS as variáveis usadas no fluxo.

---

## Tipos de Blocos (Block Types)

### BUBBLES (Mensagens do Bot)

**Text Bubble** — `"text"`
```json
{
  "id": "block-id",
  "type": "text",
  "content": {
    "richText": [
      {
        "type": "p",
        "children": [{ "text": "Olá! Como posso te ajudar?" }]
      }
    ]
  }
}
```
Para texto com variáveis:
```json
{
  "type": "p",
  "children": [
    { "text": "Olá, " },
    {
      "type": "inline-variable",
      "children": [
        { "type": "p", "children": [{ "text": "{{nome}}" }] }
      ]
    },
    { "text": "! Tudo bem?" }
  ]
}
```
Para negrito: `{ "text": "texto bold", "bold": true }`
Para itálico: `{ "text": "texto italic", "italic": true }`
Para links: `{ "type": "a", "url": "https://...", "children": [{ "text": "clique aqui" }] }`

**Image Bubble** — `"image"`
```json
{
  "id": "block-id",
  "type": "image",
  "content": {
    "url": "📎 ANEXAR IMAGEM",
    "clickLink": { "url": "", "alt": "" }
  }
}
```

**Video Bubble** — `"video"`
```json
{
  "id": "block-id",
  "type": "video",
  "content": {
    "url": "📎 ANEXAR VÍDEO",
    "type": "youtube",
    "height": 400
  }
}
```
Tipos de vídeo: `"youtube"`, `"vimeo"`, `"url"`

**Audio Bubble** — `"audio"`
```json
{
  "id": "block-id",
  "type": "audio",
  "content": {
    "url": "📎 ANEXAR ÁUDIO",
    "isAutoplayEnabled": true
  }
}
```

**Embed Bubble** — `"embed"`
```json
{
  "id": "block-id",
  "type": "embed",
  "content": {
    "url": "https://...",
    "height": 400
  }
}
```

### INPUTS (Coleta de Dados do Usuário)

**Text Input** — `"text input"`
```json
{
  "id": "block-id",
  "type": "text input",
  "options": {
    "labels": { "placeholder": "Digite aqui...", "button": "Enviar" },
    "variableId": "var-id-to-save",
    "isLong": false
  }
}
```

**Email Input** — `"email input"`
```json
{
  "id": "block-id",
  "type": "email input",
  "options": {
    "labels": { "placeholder": "seu@email.com", "button": "Enviar" },
    "variableId": "var-id-email",
    "retryMessageContent": "Email inválido. Tente novamente."
  }
}
```

**Phone Input** — `"phone number input"`
```json
{
  "id": "block-id",
  "type": "phone number input",
  "options": {
    "labels": { "placeholder": "(11) 99999-9999", "button": "Enviar" },
    "variableId": "var-id-phone",
    "defaultCountryCode": "BR"
  }
}
```

**Number Input** — `"number input"`
```json
{
  "id": "block-id",
  "type": "number input",
  "options": {
    "labels": { "placeholder": "0", "button": "Enviar" },
    "variableId": "var-id-number",
    "min": 0,
    "max": 100
  }
}
```

**URL Input** — `"url input"`
```json
{
  "id": "block-id",
  "type": "url input",
  "options": {
    "labels": { "placeholder": "https://...", "button": "Enviar" },
    "variableId": "var-id-url"
  }
}
```

**Date Input** — `"date input"`
```json
{
  "id": "block-id",
  "type": "date input",
  "options": {
    "labels": { "button": "Enviar" },
    "variableId": "var-id-date",
    "format": "dd/MM/yyyy"
  }
}
```

**Buttons (Choice Input)** — `"choice input"`
```json
{
  "id": "block-id",
  "type": "choice input",
  "items": [
    {
      "id": "item-button-1-id",
      "type": "button",
      "content": "Opção A",
      "outgoingEdgeId": "edge-to-group-a"
    },
    {
      "id": "item-button-2-id",
      "type": "button",
      "content": "Opção B",
      "outgoingEdgeId": "edge-to-group-b"
    }
  ],
  "options": {
    "variableId": "var-id-choice",
    "isMultipleChoice": false,
    "buttonLabel": "Enviar",
    "dynamicVariableId": "",
    "isSearchable": false
  }
}
```
Cada botão pode ter seu próprio `outgoingEdgeId` para direcionar o fluxo.

**Picture Choice** — `"picture choice input"`
```json
{
  "id": "block-id",
  "type": "picture choice input",
  "items": [
    {
      "id": "item-pic-1-id",
      "type": "picture choice",
      "pictureSrc": "📎 ANEXAR IMAGEM",
      "title": "Opção Visual A",
      "description": "Descrição curta",
      "outgoingEdgeId": "edge-id"
    }
  ],
  "options": {
    "variableId": "var-id-picture-choice",
    "isMultipleChoice": false,
    "buttonLabel": "Confirmar"
  }
}
```

**File Upload** — `"file input"`
```json
{
  "id": "block-id",
  "type": "file input",
  "options": {
    "variableId": "var-id-file",
    "isMultipleAllowed": false,
    "labels": { "placeholder": "Arraste ou clique", "button": "Enviar" },
    "sizeLimit": 10
  }
}
```

**Rating Input** — `"rating input"`
```json
{
  "id": "block-id",
  "type": "rating input",
  "options": {
    "variableId": "var-id-rating",
    "length": 5,
    "buttonType": "Stars",
    "labels": { "button": "Enviar" },
    "isOneClickSubmitEnabled": true
  }
}
```

**Payment (Stripe)** — `"payment input"`
```json
{
  "id": "block-id",
  "type": "payment input",
  "options": {
    "provider": "Stripe",
    "labels": { "button": "Pagar {{amount}}" },
    "amount": "9700",
    "currency": "BRL",
    "credentialsId": "stripe-credentials-id"
  }
}
```

### LOGIC (Lógica de Fluxo)

**Set Variable** — `"Set variable"`
```json
{
  "id": "block-id",
  "type": "Set variable",
  "options": {
    "variableId": "var-id-target",
    "expressionToEvaluate": "10",
    "type": "Custom",
    "isCode": false,
    "isExecutedOnClient": false
  }
}
```
Tipos de Set Variable:
- `"Custom"` — valor literal ou expressão JS
- `"Empty"` — limpa a variável
- `"Moment of the day"` — retorna manhã/tarde/noite
- `"Random ID"` — gera ID aleatório
- `"Now"` — data/hora atual
- `"Today"` — data de hoje
- `"Tomorrow"` — data de amanhã
- `"Yesterday"` — data de ontem
- `"Contact name"` — nome do contato (WhatsApp)
- `"Phone number"` — número do telefone (WhatsApp)
- `"Transcript"` — transcrição da conversa
- `"Pop"` — remove último item de lista
- `"Shift"` — remove primeiro item de lista
- `"Append value(s)"` — adiciona valor à lista
- `"Map item(s)"` — mapeia itens da lista
- `"Filter item(s)"` — filtra itens da lista
- `"Unique item(s)"` — remove duplicatas

Para código JavaScript: `"isCode": true`
```json
{
  "type": "Set variable",
  "options": {
    "variableId": "var-score",
    "expressionToEvaluate": "return {{pontuacao}} + 10",
    "type": "Custom",
    "isCode": true,
    "isExecutedOnClient": false
  }
}
```

**Condition** — `"Condition"`
```json
{
  "id": "block-id",
  "type": "Condition",
  "items": [
    {
      "id": "condition-item-true",
      "type": "condition",
      "content": {
        "comparisons": [
          {
            "id": "comparison-id",
            "variableId": "var-id-to-check",
            "comparisonOperator": "Equal to",
            "value": "sim"
          }
        ],
        "logicalOperator": "AND"
      },
      "outgoingEdgeId": "edge-if-true"
    }
  ]
}
```
Operadores de comparação:
- `"Equal to"`, `"Not equal"`, `"Contains"`, `"Does not contain"`
- `"Greater than"`, `"Less than"`, `"Greater than or equal to"`, `"Less than or equal to"`
- `"Is set"`, `"Is empty"`, `"Starts with"`, `"Ends with"`
- `"Matches regex"`, `"Does not match regex"`

O bloco Condition tem sempre 2 caminhos: o item com a condição (true) e o `outgoingEdgeId` do bloco principal (false/else).

**Redirect** — `"Redirect"`
```json
{
  "id": "block-id",
  "type": "Redirect",
  "options": {
    "url": "https://...",
    "isNewTab": true
  }
}
```

**Script** — `"Script"`
```json
{
  "id": "block-id",
  "type": "Script",
  "options": {
    "name": "Meu Script",
    "content": "// seu código JavaScript aqui\nsetVariable('resultado', 'valor')",
    "shouldExecuteInParentContext": false,
    "isExecutedOnClient": false
  }
}
```

**Wait** — `"Wait"`
```json
{
  "id": "block-id",
  "type": "Wait",
  "options": {
    "secondsToWaitFor": "3",
    "shouldPause": false
  }
}
```

**Jump** — `"Jump"`
```json
{
  "id": "block-id",
  "type": "Jump",
  "options": {
    "groupId": "target-group-id",
    "blockId": "optional-target-block-id"
  }
}
```

**AB Test** — `"AB test"`
```json
{
  "id": "block-id",
  "type": "AB test",
  "items": [
    {
      "id": "ab-item-a",
      "type": "ab test",
      "path": "a",
      "percent": 50,
      "outgoingEdgeId": "edge-to-variant-a"
    },
    {
      "id": "ab-item-b",
      "type": "ab test",
      "path": "b",
      "percent": 50,
      "outgoingEdgeId": "edge-to-variant-b"
    }
  ]
}
```

**Link to Typebot** — `"Typebot link"`
```json
{
  "id": "block-id",
  "type": "Typebot link",
  "options": {
    "typebotId": "target-typebot-id",
    "groupId": "target-group-id",
    "mergeResults": true
  }
}
```

**Return** — `"Return"`
```json
{
  "id": "block-id",
  "type": "Return"
}
```

**Webhook** — `"Webhook"`
```json
{
  "id": "block-id",
  "type": "Webhook",
  "options": {
    "url": "https://...",
    "method": "POST",
    "headers": [
      { "key": "Content-Type", "value": "application/json" }
    ],
    "body": "{ \"nome\": \"{{nome}}\", \"email\": \"{{email}}\" }",
    "variablesForTest": [
      { "variableId": "var-id", "value": "test-value" }
    ],
    "responseVariableMapping": [
      { "bodyPath": "data.id", "variableId": "var-response-id" }
    ],
    "isAdvancedConfig": true,
    "isCustomBody": true,
    "isExecutedOnClient": false
  }
}
```

### INTEGRATIONS

**HTTP Request** — `"HTTP request"`
Similar ao Webhook mas para chamadas HTTP genéricas.

**OpenAI** — `"OpenAI"`
```json
{
  "id": "block-id",
  "type": "OpenAI",
  "options": {
    "credentialsId": "openai-cred-id",
    "action": "Create chat completion",
    "model": "gpt-4",
    "messages": [
      { "role": "system", "content": "Você é um assistente." }
    ],
    "temperature": 0.7,
    "responseMapping": [
      { "valueToExtract": "Message content", "variableId": "var-ai-response" }
    ]
  }
}
```

**Google Sheets** — `"Google Sheets"`
Para leitura/escrita em planilhas Google.

**Google Analytics** — `"Google Analytics"`
```json
{
  "id": "block-id",
  "type": "Google Analytics",
  "options": {
    "trackingId": "G-XXXXXXX",
    "category": "Bot",
    "action": "Lead Captured",
    "label": "{{nome}}"
  }
}
```

---

## Regras de Ouro para Gerar JSON

### IDs
- TODOS os IDs devem ser únicos no arquivo inteiro
- Use formato: prefixo + 23 chars aleatórios. Ex: `"clk7x9m2n4p5q6r8s0t1u2v3"`
- Prefixos sugeridos: `evt` (events), `grp` (groups), `blk` (blocks), `edg` (edges), `var` (variables), `itm` (items), `cmp` (comparisons)

### Edges
- Cada conexão visual no grafo = 1 edge
- O `outgoingEdgeId` no bloco de origem DEVE corresponder a um edge existente no array `edges`
- Para botões: cada botão tem seu próprio `outgoingEdgeId` que aponta para um edge
- Para conditions: o item de condição tem `outgoingEdgeId` (caminho true), e o bloco tem `outgoingEdgeId` (caminho false/else)

### Coordenadas do Grafo
- Start event: `{ "x": 0, "y": 0 }`
- Primeiro grupo: `{ "x": 400, "y": 100 }`
- Grupos sequenciais: incrementar X de 400 em 400
- Ramificações: manter X similar, variar Y de 300 em 300
- Nunca sobrepor groups (mínimo 300px de distância)

### Experiência do Usuário
- Nunca deixe o usuário "preso" — sempre tenha um próximo passo
- Use delays (Wait blocks) de 1-3 segundos entre mensagens longas
- Quebre textos longos em múltiplos blocos text
- Use emojis com moderação para engajamento
- Botões devem ter texto curto e direto (máx ~30 caracteres)
- Personalize usando variáveis: `{{nome}}`, `{{email}}`

### Mídia (Imagens/Áudio/Vídeo)
Quando a copy mencionar mídia mas não fornecer URLs:
- Para imagens: use `"url": "📎 ANEXAR IMAGEM: [descrição do que colocar]"`
- Para áudios: use `"url": "📎 ANEXAR ÁUDIO: [descrição do conteúdo]"`
- Para vídeos: use `"url": "📎 ANEXAR VÍDEO: [descrição do conteúdo]"`

Isso sinaliza ao usuário que ele precisa substituir pela URL real após importar.

### Lead Scoring (Pontuação)
Para implementar lead scoring:
1. Crie variável `pontuacao` com valor inicial `"0"`
2. Após cada interação relevante, use Set Variable com `isCode: true`:
   ```
   return parseInt({{pontuacao}} || 0) + 10
   ```
3. Use Condition blocks para ramificar baseado na pontuação

### Teste A/B
Use o bloco `"AB test"` para split testing:
- Defina porcentagens para cada variante
- Crie groups separados para cada variante
- Mantenha a mesma estrutura de coleta de dados em ambas
- Use variáveis para rastrear qual variante o usuário viu

### Múltiplas Homes (Entradas) com Teste A/B
Para ter múltiplas versões da home:
1. O event `start` conecta a um grupo com AB Test
2. O AB Test direciona para Group "Home A" ou "Home B"
3. Cada home pode ter copy, imagens e CTAs diferentes
4. Ambas eventualmente convergem para o mesmo fluxo de coleta

---

## Theme (Aparência)
```json
{
  "theme": {
    "general": {
      "font": "Open Sans",
      "background": { "type": "Color", "content": "#ffffff" }
    },
    "chat": {
      "hostBubbles": { "backgroundColor": "#F7F8FF", "color": "#303235" },
      "guestBubbles": { "backgroundColor": "#3B82F6", "color": "#ffffff" },
      "buttons": { "backgroundColor": "#3B82F6", "color": "#ffffff" },
      "inputs": { "backgroundColor": "#ffffff", "color": "#303235", "placeholderColor": "#9095A0" },
      "hostAvatar": { "isEnabled": true, "url": "📎 ANEXAR AVATAR" },
      "roundness": "medium"
    }
  }
}
```

## Settings
```json
{
  "settings": {
    "general": {
      "isBrandingEnabled": false,
      "isTypingEmulationEnabled": true,
      "isInputPrefillEnabled": true,
      "isHideQueryParamsEnabled": true
    },
    "typingEmulation": {
      "enabled": true,
      "speed": 300,
      "maxDelay": 1.5,
      "delayBetweenBubbles": 0.5,
      "isDisabledOnFirstMessage": false
    },
    "metadata": {
      "title": "Nome do Bot",
      "description": "Descrição do bot"
    }
  }
}
```

---

## Checklist Final Antes de Entregar

Antes de gerar o arquivo JSON final, verifique:

1. ✅ `"version": "6"` presente na raiz
2. ✅ Event `start` com `outgoingEdgeId` válido
3. ✅ Todos os IDs são únicos (sem duplicatas)
4. ✅ Todo `outgoingEdgeId` tem um edge correspondente no array `edges`
5. ✅ Todo edge `from.blockId` existe em algum bloco
6. ✅ Todo edge `to.groupId` existe em algum grupo
7. ✅ Todas as variáveis referenciadas nos blocos estão declaradas no array `variables`
8. ✅ Todo `variableId` em inputs aponta para uma variável existente
9. ✅ Groups não se sobrepõem visualmente
10. ✅ Nenhum bloco está "solto" sem conexão
11. ✅ Textos com variáveis usam `{{nome_variavel}}`
12. ✅ Mídias sem URL usam placeholder `📎 ANEXAR...`
13. ✅ JSON é válido (sem vírgulas extras, chaves desbalanceadas)
14. ✅ Theme e Settings estão configurados

---

## Como Gerar o Arquivo

Use Python para gerar o JSON de forma programática. Isso garante IDs únicos e estrutura válida:

```python
import json
import random
import string

def gen_id(prefix="cl"):
    """Gera ID único no formato Typebot"""
    chars = string.ascii_lowercase + string.digits
    return prefix + ''.join(random.choice(chars) for _ in range(23))
```

Sempre salve o resultado em `/mnt/user-data/outputs/nome-do-bot.json` e use `present_files` para entregar.
