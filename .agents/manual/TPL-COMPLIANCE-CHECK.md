---
description: Protocolo de Decisão e Checklists de Auditoria da Trust & Persuasion Layer
---

# TPL Compliance & Audit Protocol

A Trust & Persuasion Layer (TPL) opera transversalmente em 3 modos de execução integrados ao roteamento do `/orquestrador`. Nenhuma skill atua ignorando essas validações.

## 3 Modos Operacionais da TPL

### Modo 1 — Preventivo (Inicialização)
Ativo *antes* da geração de copy, oferta, criativo ou wireframe do funil.
- **Acionamento:** `/orquestrador` aciona `product-intelligence` e `behavioral-intelligence`.
- **Objetivo:** Definir o mecanismo único, o Status Quo do avatar (crenças nativas) e blindar a arquitetura da urgência falsa. O "Briefing TPL" é anexado à ordem de serviço das outras skills.

### Modo 2 — Auditor (Sintaxe e Promessa)
Ativo *revisando* os outputs das skills criativas (como `copywriting-engine` ou `funnel-architect`) antes de aprovar o deploy ou o script final.
- **Acionamento:** O Orquestrador chama o TPL Compliance Check usando o SOP Inegociável (Hard Blocks & Soft Warnings).
- **Objetivo:** Barrar claims que parecem desproporcionais, jargões artificiais ("Acelere seu negócio"), design com aspecto fraudulento. Se falhar, manda reescrever com os alertas embutidos.

### Modo 3 — Corretivo (Diagnóstico in-vivo)
Ativo quando os números pioram, utilizando as engrenagens do `cro-optimizer` e `analytics-strategist`.
- **Acionamento:** O usuário pede "/diagnostico-conversao" ou acusa baixo LTV/Bounce Alto.
- **Objetivo (Analytics & CRO integrados):**
    - Se CTR é alto no Meta mas LP é fraca: Curiosidade sem confiança transferida.
    - Baixo clique em Ads + Bounce rápido: Scam-vibe ou criativo muito agressivo vs Landing Page pacífica.
    - Excesso de scroll na página com pouca saída de abandono: Existe interesse, mas não há "Prova Social Categórica" para legitimar a transação final. Correção via Trust-Signals.

## Checklist de TPL-Compliance (Rápido)

[ ] O Copy ataca ou contrapõe grosseiramente a crença base do lead nos primeiros 2 minutos? (Se sim, REJEITE. Refaça com Pacing Prévio).
[ ] O formato do produto (Planner/E-book/Mentoria) foi vendido em vez da transformação (Remoção da Ansiedade)? (Se sim, volte e coloque o Mecanismo Único em voga).
[ ] O ticket é "low" com claim "milionário"? (Corrija para: Ticket baixo com small-win crível).
[ ] A transparência operou? Ex: Explicou honestamente por que é barato evitar ceticismo?
[ ] Há FOMO artificial ou Timers irrealistas? (Se sim, REMOVA, aplique Escassez Causal Verídica).

---

## Checklist Doutrinário Expandido (Persuasão Humana)

[ ] O hook usa Efeito Barnum + Pacing nos primeiros 15s/linhas? (Se não, REFAÇA validando a Caverna do lead com `reference/tpl/belief-validation-playbook.md`).
[ ] Existe Inimigo Comum identificado e a culpa foi transferida para o sistema/indústria (nunca para pessoa)? (Se não, ative `reference/playbooks/playbook-transferencia-culpa.md`).
[ ] O criativo/anúncio passaria no SOP de Meta Ads Compliance? (Rode checklist completo em `manual/SOP-META-ADS-COMPLIANCE.md` antes de publicar).
[ ] Os bônus geram pertencimento/identidade ou são filler genérico? (Se filler, redesenhe com Ostracismo Benigno — `reference/tpl/tribalism-and-belonging.md`).
[ ] A copy usa abordagem "Frentista Consultivo" no CTA? (Se usa tom de guru agressivo, REFAÇA com `reference/tpl/frameworks-narrativos.md` Framework 3).
[ ] Os mecanismos do Iceberg Psicológico foram selecionados conscientemente? (Consultar `reference/tpl/iceberg-psicologico-completo.md` para seleção).
[ ] O Lollapalooza Orchestration foi aplicado em peças completas (VSL, LP)? (Em peças curtas, ao menos 2 mecanismos empilhados).
[ ] O texto passa no teste: "Um ser humano falaria isso numa mesa de bar?" (Se não, purgar jargões IA).

---

## Referências Obrigatórias
- Iceberg Psicológico: `reference/tpl/iceberg-psicologico-completo.md`
- Frameworks Narrativos: `reference/tpl/frameworks-narrativos.md`
- Erros Fatais: `reference/tpl/erros-fatais-antipatterns.md`
- SOPs Inegociáveis: `manual/SOPS-INEGOCIAVEIS.md`
