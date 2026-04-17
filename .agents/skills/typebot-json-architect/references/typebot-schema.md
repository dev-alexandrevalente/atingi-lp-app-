# Typebot JSON Schema — Referência Técnica Completa

## Índice
1. [Estrutura Raiz Completa](#estrutura-raiz)
2. [Geração de IDs](#geracao-ids)
3. [Exemplo Completo Minimal](#exemplo-minimal)
4. [Exemplo Avançado com AB Test e Scoring](#exemplo-avancado)
5. [Padrões de Fluxo Comuns](#padroes-fluxo)
6. [Troubleshooting](#troubleshooting)

---

## 1. Estrutura Raiz Completa {#estrutura-raiz}

```json
{
  "version": "6",
  "id": "typebot-id",
  "name": "Meu Bot",
  "events": [
    {
      "id": "evt-id",
      "type": "start",
      "graphCoordinates": { "x": 0, "y": 0 },
      "outgoingEdgeId": "edge-start-to-first"
    }
  ],
  "groups": [],
  "edges": [],
  "variables": [],
  "theme": {
    "general": {
      "font": "Open Sans",
      "background": { "type": "Color", "content": "#ffffff" },
      "progressBar": { "isEnabled": false }
    },
    "chat": {
      "hostBubbles": {
        "backgroundColor": "#F7F8FF",
        "color": "#303235"
      },
      "guestBubbles": {
        "backgroundColor": "#3B82F6",
        "color": "#ffffff"
      },
      "buttons": {
        "backgroundColor": "#3B82F6",
        "color": "#ffffff"
      },
      "inputs": {
        "backgroundColor": "#ffffff",
        "color": "#303235",
        "placeholderColor": "#9095A0"
      },
      "roundness": "medium"
    }
  },
  "settings": {
    "general": {
      "isBrandingEnabled": false,
      "isTypingEmulationEnabled": true,
      "isInputPrefillEnabled": true,
      "isHideQueryParamsEnabled": true,
      "isNewResultOnRefreshEnabled": false
    },
    "typingEmulation": {
      "enabled": true,
      "speed": 300,
      "maxDelay": 1.5,
      "delayBetweenBubbles": 0.5,
      "isDisabledOnFirstMessage": false
    },
    "metadata": {
      "title": "",
      "description": "",
      "imageUrl": "",
      "favIconUrl": ""
    }
  }
}
```

---

## 2. Geração de IDs {#geracao-ids}

Script Python para gerar o JSON programaticamente:

```python
import json
import random
import string
from datetime import datetime

class TypebotBuilder:
    def __init__(self, name):
        self.name = name
        self.events = []
        self.groups = []
        self.edges = []
        self.variables = []
        self.used_ids = set()
    
    def gen_id(self, prefix="cl"):
        while True:
            chars = string.ascii_lowercase + string.digits
            new_id = prefix + ''.join(random.choice(chars) for _ in range(23))
            if new_id not in self.used_ids:
                self.used_ids.add(new_id)
                return new_id
    
    def add_variable(self, name, value=None, is_session=False):
        var_id = self.gen_id("var")
        var = {
            "id": var_id,
            "name": name,
            "isSessionVariable": is_session
        }
        if value is not None:
            var["value"] = str(value)
        self.variables.append(var)
        return var_id
    
    def add_edge(self, from_block_id, to_group_id, from_item_id=None, to_block_id=None):
        edge_id = self.gen_id("edg")
        edge = {
            "id": edge_id,
            "from": {"blockId": from_block_id},
            "to": {"groupId": to_group_id}
        }
        if from_item_id:
            edge["from"]["itemId"] = from_item_id
        if to_block_id:
            edge["to"]["blockId"] = to_block_id
        self.edges.append(edge)
        return edge_id
    
    def create_text_block(self, text, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        paragraphs = text.split("\n")
        rich_text = []
        for p in paragraphs:
            rich_text.append({
                "type": "p",
                "children": [{"text": p}]
            })
        return {
            "id": block_id,
            "type": "text",
            "content": {"richText": rich_text}
        }
    
    def create_button_block(self, buttons_text, variable_name=None, block_id=None):
        """buttons_text = list of button label strings"""
        if not block_id:
            block_id = self.gen_id("blk")
        var_id = None
        if variable_name:
            # find existing or create
            for v in self.variables:
                if v["name"] == variable_name:
                    var_id = v["id"]
                    break
            if not var_id:
                var_id = self.add_variable(variable_name)
        
        items = []
        for label in buttons_text:
            items.append({
                "id": self.gen_id("itm"),
                "type": "button",
                "content": label
            })
        
        block = {
            "id": block_id,
            "type": "choice input",
            "items": items,
            "options": {
                "isMultipleChoice": False,
                "buttonLabel": "Enviar",
                "isSearchable": False
            }
        }
        if var_id:
            block["options"]["variableId"] = var_id
        return block
    
    def create_condition_block(self, variable_name, operator, value, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        var_id = None
        for v in self.variables:
            if v["name"] == variable_name:
                var_id = v["id"]
                break
        
        cond_item_id = self.gen_id("itm")
        return {
            "id": block_id,
            "type": "Condition",
            "items": [
                {
                    "id": cond_item_id,
                    "type": "condition",
                    "content": {
                        "comparisons": [
                            {
                                "id": self.gen_id("cmp"),
                                "variableId": var_id,
                                "comparisonOperator": operator,
                                "value": value
                            }
                        ],
                        "logicalOperator": "AND"
                    }
                }
            ]
        }, cond_item_id
    
    def create_set_variable_block(self, variable_name, expression, is_code=False, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        var_id = None
        for v in self.variables:
            if v["name"] == variable_name:
                var_id = v["id"]
                break
        if not var_id:
            var_id = self.add_variable(variable_name)
        
        return {
            "id": block_id,
            "type": "Set variable",
            "options": {
                "variableId": var_id,
                "expressionToEvaluate": expression,
                "type": "Custom",
                "isCode": is_code,
                "isExecutedOnClient": False
            }
        }
    
    def create_ab_test_block(self, percentages, block_id=None):
        """percentages = dict like {"a": 50, "b": 50}"""
        if not block_id:
            block_id = self.gen_id("blk")
        items = []
        for path, percent in percentages.items():
            items.append({
                "id": self.gen_id("itm"),
                "type": "ab test",
                "path": path,
                "percent": percent
            })
        return {
            "id": block_id,
            "type": "AB test",
            "items": items
        }
    
    def create_wait_block(self, seconds, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        return {
            "id": block_id,
            "type": "Wait",
            "options": {
                "secondsToWaitFor": str(seconds),
                "shouldPause": False
            }
        }
    
    def create_script_block(self, code, name="Script", execute_on_client=False, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        return {
            "id": block_id,
            "type": "Script",
            "options": {
                "name": name,
                "content": code,
                "shouldExecuteInParentContext": False,
                "isExecutedOnClient": execute_on_client
            }
        }
    
    def create_webhook_block(self, url, method="POST", body=None, headers=None, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        block = {
            "id": block_id,
            "type": "Webhook",
            "options": {
                "url": url,
                "method": method,
                "isAdvancedConfig": True,
                "isCustomBody": body is not None,
                "isExecutedOnClient": False
            }
        }
        if body:
            block["options"]["body"] = body
        if headers:
            block["options"]["headers"] = [{"key": k, "value": v} for k, v in headers.items()]
        return block
    
    def create_image_block(self, url_or_placeholder, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        return {
            "id": block_id,
            "type": "image",
            "content": {
                "url": url_or_placeholder
            }
        }
    
    def create_audio_block(self, url_or_placeholder, autoplay=True, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        return {
            "id": block_id,
            "type": "audio",
            "content": {
                "url": url_or_placeholder,
                "isAutoplayEnabled": autoplay
            }
        }
    
    def create_video_block(self, url_or_placeholder, video_type="youtube", block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        return {
            "id": block_id,
            "type": "video",
            "content": {
                "url": url_or_placeholder,
                "type": video_type,
                "height": 400
            }
        }
    
    def create_redirect_block(self, url, new_tab=True, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        return {
            "id": block_id,
            "type": "Redirect",
            "options": {
                "url": url,
                "isNewTab": new_tab
            }
        }
    
    def create_input_block(self, input_type, variable_name, placeholder="", block_id=None):
        """input_type: 'text input', 'email input', 'phone number input', 'number input', 'url input', 'date input'"""
        if not block_id:
            block_id = self.gen_id("blk")
        var_id = None
        for v in self.variables:
            if v["name"] == variable_name:
                var_id = v["id"]
                break
        if not var_id:
            var_id = self.add_variable(variable_name)
        
        block = {
            "id": block_id,
            "type": input_type,
            "options": {
                "labels": {
                    "placeholder": placeholder,
                    "button": "Enviar"
                },
                "variableId": var_id
            }
        }
        if input_type == "phone number input":
            block["options"]["defaultCountryCode"] = "BR"
        if input_type == "date input":
            block["options"]["format"] = "dd/MM/yyyy"
        return block
    
    def create_jump_block(self, group_id, block_id_target=None, block_id=None):
        if not block_id:
            block_id = self.gen_id("blk")
        opts = {"groupId": group_id}
        if block_id_target:
            opts["blockId"] = block_id_target
        return {
            "id": block_id,
            "type": "Jump",
            "options": opts
        }
    
    def add_group(self, title, blocks, x, y):
        group_id = self.gen_id("grp")
        self.groups.append({
            "id": group_id,
            "title": title,
            "graphCoordinates": {"x": x, "y": y},
            "blocks": blocks
        })
        return group_id
    
    def build(self):
        # Create start event
        start_id = self.gen_id("evt")
        start_edge_id = None
        if self.groups:
            start_edge_id = self.gen_id("edg")
            self.edges.insert(0, {
                "id": start_edge_id,
                "from": {"blockId": start_id},
                "to": {"groupId": self.groups[0]["id"]}
            })
        
        self.events = [{
            "id": start_id,
            "type": "start",
            "graphCoordinates": {"x": 0, "y": 0},
            "outgoingEdgeId": start_edge_id
        }]
        
        return {
            "version": "6",
            "id": self.gen_id("typ"),
            "name": self.name,
            "events": self.events,
            "groups": self.groups,
            "edges": self.edges,
            "variables": self.variables,
            "theme": {
                "general": {
                    "font": "Open Sans",
                    "background": {"type": "Color", "content": "#ffffff"},
                    "progressBar": {"isEnabled": False}
                },
                "chat": {
                    "hostBubbles": {"backgroundColor": "#F7F8FF", "color": "#303235"},
                    "guestBubbles": {"backgroundColor": "#3B82F6", "color": "#ffffff"},
                    "buttons": {"backgroundColor": "#3B82F6", "color": "#ffffff"},
                    "inputs": {"backgroundColor": "#ffffff", "color": "#303235", "placeholderColor": "#9095A0"},
                    "roundness": "medium"
                }
            },
            "settings": {
                "general": {
                    "isBrandingEnabled": False,
                    "isTypingEmulationEnabled": True,
                    "isInputPrefillEnabled": True,
                    "isHideQueryParamsEnabled": True,
                    "isNewResultOnRefreshEnabled": False
                },
                "typingEmulation": {
                    "enabled": True,
                    "speed": 300,
                    "maxDelay": 1.5,
                    "delayBetweenBubbles": 0.5,
                    "isDisabledOnFirstMessage": False
                },
                "metadata": {
                    "title": self.name,
                    "description": ""
                }
            }
        }
```

---

## 3. Exemplo Completo Minimal {#exemplo-minimal}

Um bot simples que coleta nome e email:

```python
builder = TypebotBuilder("Captura de Leads")

# Variáveis
var_nome = builder.add_variable("nome")
var_email = builder.add_variable("email")

# Group 1: Boas-vindas
blk1 = builder.create_text_block("👋 Olá! Seja bem-vindo!")
blk2 = builder.create_text_block("Qual é o seu nome?")
blk3 = builder.create_input_block("text input", "nome", "Digite seu nome")
grp1 = builder.add_group("Boas-vindas", [blk1, blk2, blk3], 400, 100)

# Group 2: Email
blk4 = builder.create_text_block("Prazer, {{nome}}! 😊")
blk5 = builder.create_text_block("Qual seu melhor email?")
blk6 = builder.create_input_block("email input", "email", "seu@email.com")
grp2 = builder.add_group("Coleta Email", [blk4, blk5, blk6], 800, 100)

# Group 3: Agradecimento
blk7 = builder.create_text_block("Perfeito! Obrigado, {{nome}}!")
blk8 = builder.create_text_block("Em breve entraremos em contato pelo email {{email}}. 🚀")
grp3 = builder.add_group("Agradecimento", [blk7, blk8], 1200, 100)

# Edges
edge1 = builder.add_edge(blk3["id"], grp2)
blk3["outgoingEdgeId"] = edge1
edge2 = builder.add_edge(blk6["id"], grp3)
blk6["outgoingEdgeId"] = edge2

# Build
typebot = builder.build()
```

---

## 4. Padrões de Fluxo Comuns {#padroes-fluxo}

### Loop (Voltar para um grupo anterior)
Use um bloco Jump ou um edge que aponta para um grupo anterior:
```python
# After invalid input, jump back
jump_blk = builder.create_jump_block(grp1)  # volta para grupo 1
```

### Conditional Branching
```python
cond_blk, cond_item_id = builder.create_condition_block("pontuacao", "Greater than", "50")
# Edge do item (true) para grupo de alta pontuação
edge_true = builder.add_edge(cond_blk["id"], grp_high, from_item_id=cond_item_id)
cond_blk["items"][0]["outgoingEdgeId"] = edge_true
# Edge do bloco (false/else) para grupo de baixa pontuação
edge_false = builder.add_edge(cond_blk["id"], grp_low)
cond_blk["outgoingEdgeId"] = edge_false
```

### Lead Scoring Pattern
```python
# Incrementar pontuação quando usuário faz algo positivo
score_blk = builder.create_set_variable_block(
    "pontuacao",
    "return parseInt({{pontuacao}} || 0) + 10",
    is_code=True
)
```

### AB Test com 2 Variantes
```python
ab_blk = builder.create_ab_test_block({"a": 50, "b": 50})
# Edge para variante A
edge_a = builder.add_edge(ab_blk["id"], grp_variant_a, from_item_id=ab_blk["items"][0]["id"])
ab_blk["items"][0]["outgoingEdgeId"] = edge_a
# Edge para variante B
edge_b = builder.add_edge(ab_blk["id"], grp_variant_b, from_item_id=ab_blk["items"][1]["id"])
ab_blk["items"][1]["outgoingEdgeId"] = edge_b
```

### Webhook para integração externa
```python
webhook_blk = builder.create_webhook_block(
    url="https://hooks.zapier.com/hooks/catch/xxx/yyy",
    method="POST",
    body=json.dumps({
        "nome": "{{nome}}",
        "email": "{{email}}",
        "pontuacao": "{{pontuacao}}"
    }),
    headers={"Content-Type": "application/json"}
)
```

---

## 5. Troubleshooting {#troubleshooting}

### Problemas comuns ao importar JSON

**Erro: "Invalid typebot"**
- Verifique se `"version": "6"` está presente
- Verifique se todos os arrays obrigatórios existem: events, groups, edges, variables

**Fluxo não avança após botão**
- Verifique se o botão tem `outgoingEdgeId`
- Verifique se o edge correspondente existe e aponta para um group válido

**Variável não é preenchida**
- Verifique se o `variableId` no input aponta para o ID correto da variável
- Verifique se a variável está declarada no array `variables`

**Blocos aparecem desconectados visualmente**
- Verifique as coordenadas dos groups (não podem se sobrepor)
- Verifique se todos os edges têm `from` e `to` válidos

**Script não executa**
- Se `isExecutedOnClient: false`, não use `window`, `document`, `localStorage`
- Se `isExecutedOnClient: true`, não use `setVariable()`
- `fetch` no servidor retorna string diretamente, não Response object

**Condition não funciona**
- Verifique o `comparisonOperator` — deve ser exatamente como listado
- Para comparações numéricas, o valor na variável deve ser conversível a número
- `"logicalOperator"` deve ser `"AND"` ou `"OR"`
