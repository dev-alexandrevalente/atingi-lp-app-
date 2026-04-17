# Infraestrutura e Setup: Servidor `n8n-mcp`

Este documento é estritamente operacional e de configuração técnica. Ele rege as mecânicas de setup entre o nosso ambiente (Claude Code, Cursor, AI agents) e o n8n, utilizando a infraestrutura criada originalmente pelo projeto `czlonkowski/n8n-mcp`.

A utilização do servidor MCP do n8n deve ser configurada pelo human/usuário seguindo os caminhos abaixo. O Arquiteto (`n8n-architect`) tem permissão de usar as tools exportadas se elas estiverem providas ativamente na sessão pelo orquestrador MCP.

## O Que a Camada n8n-mcp Fornece?

Quando você registra esse servidor no arquivo de configuração Desktop ou de Settings da sua ferramenta de AI, as seguintes competências técnicas são "destravadas" live para os agentes:
* **Node Discovery**: O agente acessa detalhes dos 1,396 nodes do n8n offline sem errar a sintaxe de chaves.
* **Validation Engine**: O agente bate o código dele contra um validador `runtime` garantindo que o json do fluxo suba imaculado.
* **Orquestração Live**: Se as chaves N8N_API_URL entrarem no jogo, o agente vai ler e re-escrever suas automações no seu n8n.

---

## Opções de Instalação (Como Plugar a Infraestrutura)

Para você usar a Rota de Integração Live, aplique UMA das duas escolhas no seu cliente MCP (Claude Desktop ou Cursor):

### 1. Via Pacote Node Local Rápido (`npx` Mode)

Sem instalar dependências rígidas na máquina, o npx provê o banco SQLite dos docs nativo imediatamente. Edite o `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "http://SEU_IP_VPS_OU_LOCALHOST:5678",
        "N8N_API_KEY": "sua-chave-gerada-do-n8n-aqui"
      }
    }
  }
}
```

> **Atenção Windows Users**: Npx exige rodar sem bloqueios de terminal. É importante ter o NodeJS Lts na máquina. O parametro `MCP_MODE: "stdio"` é o principal responsável por evitar json err errors no parse da ponte local.

### 2. Máxima Isolação via Docker (Recomendado)

Sendo você um usuário com ambiente de deploy, esta via ignora incompatibilidades locais na máquina.
Certifique-se que o Docker está up na sua máquina desktop.

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--init",
        "-e", "MCP_MODE=stdio",
        "-e", "LOG_LEVEL=error",
        "-e", "DISABLE_CONSOLE_OUTPUT=true",
        "-e", "N8N_API_URL=http://SEU_IP_VPS_OU_LOCALHOST:5678",
        "-e", "N8N_API_KEY=sua-chave-gerada-do-n8n-aqui",
        "ghcr.io/czlonkowski/n8n-mcp:latest"
      ]
    }
  }
}
```

### Credenciais (A Chave Invisível)

- Você gera a `N8N_API_KEY` dentro do painel do n8n em: Canto Esquerdo Inferior > Settings > Módulo N8N API > Create API Key. Essa key permitirá que a inteligência consiga executar `n8n_update_partial_workflow`.
- Se as chaves API *não* forem postas no env, as ferramentas de criação estarão desativadas, mas TODA A CAPACIDADE ESCRITA e DOCUMENTAL permanecem ativas! (A função Read-Only + JSON offline fica intacta).

---

## Diagnósticos Rápidos para o Humano

Se a camada der erro (`Tool invocation failed` ou `Timeout` de conexão RPC no Claude), verifique na hora:
1. Docker App não estava aberto e você configurou modo `-e docker`.
2. A porta definida na URL do `.env` é HTTPS mas seu N8n real por trás do Nginx local roda em HTTP forçado sem certs.
3. Se estiver bloqueado por webhooks de localhost no n8n que rodam na mesa maquina (Localhost loopback). Caso rode o docker nativo ali mesmo, inject o config `WEBHOOK_SECURITY_MODE=moderate` na lista de args.
