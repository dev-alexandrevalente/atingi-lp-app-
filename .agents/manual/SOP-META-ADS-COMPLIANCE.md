---
description: SOP obrigatório de compliance para criativos que serão publicados no Meta Ads. Nenhum criativo sai do ecossistema sem passar por esta verificação.
---

# SOP — Meta Ads Compliance (Pré-Publicação Obrigatória)

> **Status:** OBRIGATÓRIO. Todo criativo (imagem, vídeo, carrossel) produzido pelo ecossistema que será veiculado no Meta Ads (Facebook/Instagram) DEVE ser verificado contra este checklist ANTES da publicação.

> **Acionamento:** O `/orquestrador` aciona este SOP automaticamente quando detecta que o output é para Meta Ads. O `creative-director` também deve auto-verificar.

---

## Checklist de 12 Itens

### BLOCO A — Anti-Clickbait e Anti-Golpe

- [ ] **A1. Sem promessas esdrúxulas:** O criativo NÃO contém claims impossíveis ("emagreça 10kg em 7 dias", "monjaro caseiro", "fique milionário dormindo", "ganhe R$ 5.000/dia no automático").
- [ ] **A2. Sem Before/After de corpo:** O criativo NÃO usa antes/depois explícito de corpo físico ou financeiro. Redirecionou para estado emocional ou gráfico indireto de progresso.
- [ ] **A3. Sem setas gigantes de "Clique Aqui":** O design é nativo (simula TikTok/Reels/Stories orgânicos). O anúncio se disfarça no feed.
- [ ] **A4. Sem pop-ups ou elementos invasivos na LP de destino:** A landing page oferece experiência positiva de navegação.

### BLOCO B — Qualidade de Tráfego (Pixel Positivo)

- [ ] **B1. CTA qualificador presente:** O CTA filtra curiosos. Existe alguma forma de pré-qualificação ("Se você tem X e quer Y, clique"). Não atrai clicadores compulsivos.
- [ ] **B2. Consistência semântica hook→ad→LP→VSL:** As palavras do hook do vídeo, a copy do anúncio, o heading da LP e o pitch da VSL seguem um fio mestre idêntico. Sem quebra de contexto.
- [ ] **B3. Retenção positiva na LP:** A landing page de destino retém por conteúdo (não por pop-ups, delays ou tricks). Bounce rate projetado < 60%.

### BLOCO C — Anti-IA e Humanização

- [ ] **C1. Teste da mesa de bar:** O texto do criativo soa como algo que um humano falaria numa conversa casual? Se parece "gerado por ChatGPT", REJEITADO.
- [ ] **C2. Sem jargões proibidos:** O criativo NÃO contém: "Revolucionário", "Mergulhe fundo", "Descubra como", "No cenário atual em constante evolução", "Otimize sua vida", "Desbloqueie seu potencial."
- [ ] **C3. Vulnerabilidade presente:** O criativo (se em vídeo/story) contém algum elemento de humanização, imperfeição ou vulnerabilidade do criador/marca.

### BLOCO D — Ética e Compliance

- [ ] **D1. Sem urgência falsa:** O criativo NÃO usa timers falsos, escassez inventada ou "restam 2 vagas" em produto digital infinito. Toda urgência é causal e verificável.
- [ ] **D2. Tribalismo calibrado:** Se há discurso "nós contra eles", o alvo é o MÉTODO/SISTEMA/INDÚSTRIA (nunca uma pessoa). O tom não é radical a ponto de gerar denúncias.

---

## Protocolo de Classificação de Qualidade

### Monitoramento Diário (Pós-Publicação):
1. Verificar a coluna "Classificação de Qualidade" no Gerenciador de Anúncios
2. Se a classificação estiver "Abaixo da Média":
   - Pausar o anúncio imediatamente
   - Diagnosticar qual bloco do checklist falhou
   - Refazer o criativo corrigindo o item específico
3. Se estiver "Acima da Média":
   - Documentar o padrão em `memory/learnings/`
   - Usar como referência para próximos criativos

### Métricas de Alerta:
| Métrica | Alerta Vermelho | Ação |
|---------|----------------|------|
| CTR alto + Bounce alto na LP | Curiosidade sem confiança | Revisar LP para alinhar com promessa do ad |
| CPL baixíssimo + CPA alto | Pixel atraindo curiosos | Revisar criativo para filtrar melhor |
| Muitas ocultações/denúncias | Experiência negativa | Pausar. Revisar D1 e D2 |
| Quality Score "Below Average" | Criativo/LP reprovados pela Meta | Pausar. Refazer com base no checklist |

---

## Decisão Final

| Resultado do Checklist | Ação |
|-----------------------|------|
| 12/12 ✅ | **APROVADO** — Pode publicar |
| 10-11/12 ⚠️ | **APROVADO COM ALERTA** — Publicar mas monitorar item falho em 24h |
| < 10/12 ❌ | **REJEITADO** — Devolver para `creative-director` com lista dos itens falhos |

---

## Referências
- Princípios de proteção: `reference/tpl/meta-quality-protection.md`
- SOPs gerais: `manual/SOPS-INEGOCIAVEIS.md`
- Antipatterns a evitar: `reference/tpl/erros-fatais-antipatterns.md`
