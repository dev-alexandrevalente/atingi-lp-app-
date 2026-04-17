# Tabela-Mestra Operacional dos 400 Agents

Esta é a organização principal de operação do ecossistema de inteligência, definindo como os agentes interagem, quando são chamados e para quem passam o bastão.

## Como ler a tabela

As colunas seguem esta lógica:
* **Agent** → nome do agent
* **Camada** → onde ele vive na arquitetura
* **Função** → papel principal
* **Quando usar** → gatilho operacional
* **Quem chama** → agents que normalmente o acionam
* **Handoff para** → quem normalmente recebe a saída
* **Prioridade** → A, B ou C
* **Frequência** → diária, recorrente, pontual, sob demanda

### Legenda rápida
* **A** = núcleo crítico
* **B** = importante
* **C** = complementar / contextual

---

## CAMADA 0 — COMANDO E GOVERNANÇA

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Orquestrador Supremo | 0 | Coordenação total do sistema | Sempre que houver projeto, diagnóstico ou execução complexa | Usuário / Planejador Mestre | Meta-Agent de Roteamento / Sintetizador Executivo Supremo | A | Diária |
| Meta-Agent de Roteamento | 0 | Encaminhar tarefas ao agent certo | Quando houver dúvida sobre qual agent usar | Orquestrador Supremo | Agent especialista correto | A | Diária |
| Coordenador de Encadeamento entre Agents | 0 | Costurar outputs e inputs | Quando há fluxo multiagent em série | Orquestrador Supremo | Próximo agent do fluxo | A | Diária |
| Resolvedor de Conflitos entre Agents | 0 | Resolver divergências entre outputs | Quando 2+ agents entram em conflito | Orquestrador Supremo / Auditor de Coerência | Sintetizador Executivo Supremo | A | Sob demanda |
| Arquiteto de Memória Estratégica | 0 | Guardar aprendizados duradouros | Quando algo merece virar regra, padrão ou ativo | Orquestrador Supremo / Coordenador de Ciclos | Curador de Inteligência Reutilizável | A | Recorrente |
| Gestor de Memória Operacional | 0 | Preservar estado atual da operação | Quando há múltiplas frentes ativas | Orquestrador Supremo | Secretário Executivo do Sistema | A | Diária |
| Sintetizador Executivo Supremo | 0 | Consolidar outputs em direção executiva | Após análises extensas ou múltiplos agents | Orquestrador Supremo | Gestor de Prioridades Mestras / Usuário | A | Diária |
| Planejador Mestre do Sistema | 0 | Criar plano macro do ecossistema | No início de ciclos grandes | Orquestrador Supremo | Gestor de Prioridades Mestras / Arquiteto de Camadas | A | Recorrente |
| Arquiteto de Governança Multiagent | 0 | Definir regras e governança | Ao estruturar ou revisar o sistema | Planejador Mestre / Guardião de Integridade | Auditor Supremo | A | Pontual |
| Estrategista de Padrões do Sistema | 0 | Criar padrões recorrentes | Quando há repetição de outputs e fluxos | Governança / Orquestrador Supremo | Agents operacionais | B | Recorrente |
| Auditor de Coerência entre Agents | 0 | Verificar alinhamento entre outputs | Em fluxos grandes com múltiplas especializações | Orquestrador Supremo | Resolvedor de Conflitos / Sintetizador | A | Recorrente |
| Gestor de Prioridades Mestras | 0 | Definir foco principal do ciclo | Quando há muitas frentes disputando atenção | Planejador Mestre / Sintetizador | Priorizador de Experimentos / Planejador Semanal | A | Diária |
| Coordenador de Ciclos de Aprendizado | 0 | Fechar loops de hipótese→teste→aprendizado | Depois de testes, revisões e iterações | Orquestrador / Revisor de Aprendizados | Memória Estratégica / Playbook | A | Recorrente |
| Meta-Agent de Escolha de Modo | 0 | Definir modo do sistema: explorar, otimizar, escalar etc. | Ao entrar em novo ciclo ou problema | Orquestrador Supremo | Planejador Mestre / Roteamento | B | Recorrente |
| Curador de Inteligência Reutilizável | 0 | Transformar outputs em ativos reutilizáveis | Quando há materiais, padrões ou aprendizados fortes | Memória Estratégica / Playbook | Biblioteca interna / Agents operacionais | B | Recorrente |
| Arquiteto de Camadas do Sistema | 0 | Organizar arquitetura por níveis | Ao desenhar ou revisar a árvore mestra | Planejador Mestre | Governança / Comunicação Interna | B | Pontual |
| Secretário Executivo do Sistema | 0 | Registrar decisões e próximos passos | Ao fim de ciclos, reuniões lógicas ou sínteses | Sintetizador / Gestor de Memória Operacional | Orquestrador / Planejador Semanal | B | Diária |
| Estrategista de Comunicação Interna do Sistema | 0 | Definir como a informação circula | Quando há ruído ou perda de contexto | Governança / Orquestrador | Gestor de Handoff / Secretário Executivo | B | Recorrente |
| Guardião de Integridade do Sistema | 0 | Vigiar degradação estrutural | Em crescimento, expansão ou desordem silenciosa | Orquestrador / Auditor Supremo | Governança / Auditor de Coerência | A | Recorrente |
| Auditor Supremo do Sistema Multiagent | 0 | Revisão final do ecossistema inteiro | Em checkpoints estratégicos grandes | Usuário / Orquestrador Supremo | Planejador Mestre / Governança | A | Pontual |

---

## CAMADA 1 — INTELIGÊNCIA DE MERCADO

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pesquisador Avançado de Mercado | 1 | Ler estrutura do mercado | Sempre que for criar ou reposicionar | Orquestrador / Planejador Mestre | Big Idea / Oferta / Posicionamento | A | Recorrente |
| Analista de Biblioteca de Anúncios | 1 | Mapear padrões criativos do mercado | Antes de criar criativos ou avaliar saturação | Pesquisador de Mercado | Criativo Estático / Saturação de Mensagem | A | Recorrente |
| Minerador de Reviews | 1 | Extrair dores e desejos de reviews | Antes de copy, oferta ou VSL | Pesquisador / Oferta | Linguagem de Nicho / Copywriters | A | Recorrente |
| Pesquisador de Comunidades | 1 | Ler conversas espontâneas do público | Ao buscar linguagem real e dores vivas | Pesquisador de Mercado | Crenças de Mercado / Linguagem de Nicho | A | Recorrente |
| Analista de Tendências de Mercado | 1 | Detectar movimentos emergentes | Antes de reposicionar ou inovar | Pesquisador / Planejador Mestre | Oportunidades / Posicionamento | B | Recorrente |
| Analista de Sinais Culturais | 1 | Ler códigos e sensibilidade cultural | Antes de ajustar tom, estética e narrativa | Pesquisador | Criativos / Posicionamento | B | Recorrente |
| Analista de Linguagem de Nicho | 1 | Mapear vocabulário natural do público | Antes de copy, scripts e páginas | Reviews / Comunidades | Copy / VSL / Criativos | A | Recorrente |
| Analista de Saturação de Mensagem | 1 | Detectar promessas gastas | Quando o mercado parece repetitivo | Biblioteca de Anúncios / Discurso Promocional | Big Idea / Ângulo / Hooks | A | Recorrente |
| Analista de Inteligência Competitiva Profunda | 1 | Entender a máquina dos concorrentes | Antes de atacar mercado competitivo | Pesquisador / Planejador Mestre | Lacunas Competitivas / Oportunidades | A | Recorrente |
| Mapeador de Oportunidades de Mercado | 1 | Priorizar espaços de ataque | Depois de pesquisa ampla | Pesquisador / Inteligência Competitiva | Oferta / Ângulo / Planejamento | A | Recorrente |
| Analista de Narrativas Dominantes do Mercado | 1 | Mapear histórias e molduras do nicho | Antes de reframe e posicionamento | Pesquisador | Big Idea / Reframe / Pré-Frame | B | Recorrente |
| Analista de Códigos Semânticos do Nicho | 1 | Identificar termos que carregam significado | Antes de naming e copy | Linguagem de Nicho | Nomeação / Copy / Oferta | B | Recorrente |
| Detector de Sinais Fracos | 1 | Perceber mudanças incipientes | Em pesquisa estratégica contínua | Tendências / Pesquisador | Oportunidades / Planejador Mestre | C | Recorrente |
| Analista de Experimentos do Mercado | 1 | Ler o que concorrentes estão testando | Quando mercado está mudando rápido | Biblioteca / Inteligência Competitiva | Criativos / Oferta / Posicionamento | B | Recorrente |
| Analista de Subnichos e Micromercados | 1 | Encontrar segmentos menores e mais aderentes | Ao nichar oferta ou criativo | Pesquisador / Oportunidades | Oferta / Segmentação | B | Recorrente |
| Analista de Discurso Promocional do Mercado | 1 | Entender como o nicho vende | Antes de copy e advertorial | Biblioteca / Pesquisador | Copywriters / Big Idea / Saturação | A | Recorrente |
| Analista de Lacunas Competitivas | 1 | Ver o que ninguém cobre direito | Depois da leitura competitiva | Inteligência Competitiva | Oportunidades / Oferta | A | Recorrente |
| Analista de Crenças de Mercado | 1 | Mapear crenças coletivas do nicho | Antes de mecanismo, prova e objeção | Comunidades / Reviews | Reframe / Prova / VSL | A | Recorrente |
| Estrategista de Ponto de Entrada de Pesquisa | 1 | Definir por onde começar uma investigação | Quando a pesquisa está ampla demais | Orquestrador / Pesquisador | Pesquisador de Mercado | B | Sob demanda |
| Arquiteto de Mapa de Mercado | 1 | Organizar panorama competitivo | Em planejamento estratégico | Planejador Mestre / Pesquisador | Oferta / Posicionamento / Oportunidades | B | Pontual |

---

## CAMADA 2 — OFERTA, POSICIONAMENTO E MENSAGEM

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Estrategista de Oferta de Entrada | 2 | Definir a primeira oferta da jornada | Ao desenhar front-end | Oportunidades / Planejador Mestre | Checkout / Criativos / Funil | A | Recorrente |
| Estrategista de Oferta Intermediária | 2 | Criar degrau entre entrada e valor maior | Ao aumentar AOV ou escada | Escada de Valor | Upsell / Continuidade | B | Recorrente |
| Estrategista de Oferta de Continuidade | 2 | Estruturar recorrência e retenção de oferta | Para aumentar LTV | Escada de Valor / Pós-compra | Pós-Compra para LTV | B | Recorrente |
| Arquiteto de Escada de Valor | 2 | Organizar toda a ladder comercial | Ao montar ecossistema de monetização | Planejador Mestre / Oferta | Entrada / Intermediária / Continuidade | A | Recorrente |
| Gerador de Big Idea | 2 | Criar ideia central da comunicação | Antes de copy, VSL e criativos | Pesquisa de Mercado | Mecanismo / Ângulo / Lead | A | Recorrente |
| Especialista em Mecanismo Único | 2 | Dar explicação diferenciadora à oferta | Após Big Idea e pesquisa | Big Idea / Crenças | Copywriter de Mecanismo / Prova | A | Recorrente |
| Estrategista de Lead | 2 | Definir a melhor abertura conceitual | Em qualquer peça de venda | Big Idea / Ângulo | Abertura / Script / Página | A | Recorrente |
| Estrategista de Abertura | 2 | Desenhar primeiro contato da peça | Em anúncios, páginas, VSL e emails | Lead | Criativos / VSL / Página | A | Recorrente |
| Estrategista de Comparação | 2 | Estruturar contrastes de valor | Quando precisa comparar caminhos | Oferta / Framing de Preço | Página / Pitch / Call | B | Recorrente |
| Estruturador de FAQ Persuasivo | 2 | Criar FAQ que avança a decisão | Em páginas, checkouts e ofertas | Oferta / Objeções | Página / Checkout | B | Recorrente |
| Estruturador de FAQ de Objeções | 2 | Responder resistências críticas | Em contextos de venda mais friccionados | Objeções / Prova | Página / Call / Checkout | A | Recorrente |
| Copywriter de Prova Avançada | 2 | Escrever prova mais sofisticada | Quando prova simples não basta | Mecanismo / Crenças / Reviews | Página / VSL / Call | A | Recorrente |
| Estrategista de Framing de Preço | 2 | Dar contexto ao preço | Antes de checkout, pitch ou call | Oferta / Stack | Checkout / Pitch / Call | A | Recorrente |
| Estruturador de Stack de Oferta | 2 | Organizar componentes da oferta | Em páginas e pitch | Oferta / Bônus | Framing de Preço / Página | A | Recorrente |
| Arquiteto de Bônus | 2 | Definir bônus que amplificam valor | Ao enriquecer oferta | Stack / Objeções | Página / Checkout / Pitch | B | Recorrente |
| Estrategista de Urgência | 2 | Criar tração temporal plausível | Em lançamentos, retomadas, pitch | Oferta / Janela de Conversão | Página / Emails / WhatsApp | A | Recorrente |
| Estrategista de Escassez Contextual | 2 | Dar limitação plausível | Quando há oportunidade finita | Urgência / Oferta | Página / Recovery / Pitch | B | Recorrente |
| Estrategista de Demonstração | 2 | Tornar valor tangível | Em prova, VSL e páginas | Mecanismo / Prova | Página / VSL / Criativos | B | Recorrente |
| Estrategista de Before-After | 2 | Mostrar transformação | Em criativos, páginas, VSL | Desejo / Prova | Criativos / Página / VSL | B | Recorrente |
| Estrategista de Caso de Uso | 2 | Traduzir solução em cenas reais | Quando oferta parece abstrata | Oferta / Mecanismo | Página / Pitch / VSL | B | Recorrente |
| Copywriter de Mecanismo | 2 | Escrever o "como funciona" | Depois que mecanismo foi definido | Especialista em Mecanismo | Página / VSL / Emails | A | Recorrente |
| Estrategista de Nomeação de Oferta | 2 | Criar nome estratégico | Ao lançar ou reposicionar | Códigos Semânticos / Oferta | Página / Criativos / Call | B | Pontual |
| Estrategista de Ângulo | 2 | Escolher a perspectiva da mensagem | Antes de criativos e campanhas | Big Idea / Pesquisa | Criativos / VSL / Email | A | Recorrente |
| Estrategista de Reframe | 2 | Mudar interpretação do problema | Quando crença atual trava venda | Crenças / Narrativas | Página / VSL / Call | A | Recorrente |
| Analista de Nível de Consciência | 2 | Estimar awareness do público | Antes de mensagem e funil | Pesquisa / Oferta | Pré-Frame / Provas / Lead | A | Recorrente |
| Analista de Intenção de Compra | 2 | Medir prontidão comercial | Antes de CTA forte ou call | Analytics / Pesquisa | Segmentação / CTA / Booking | A | Recorrente |
| Estrategista de Pré-Frame | 2 | Preparar interpretação da próxima peça | Antes de páginas, VSL, call | Consciência / Crenças | VSL / Página / Email | A | Recorrente |
| Diagnostista de Hero | 2 | Auditar primeira dobra | Quando hero converte mal | Analytics / Funil | Página / Criativos | A | Sob demanda |
| Diagnostista de Pitch | 2 | Auditar momento da oferta | Quando o pitch não fecha | Analytics / VSL / Página | Pitch em Vídeo / Bloco de CTA | A | Sob demanda |
| Diagnostista de Checkout | 2 | Auditar etapa final | Quando há abandono final alto | Analytics | Checkout Avançado / Framing de Preço | A | Sob demanda |
| Estrategista de Bloco de Prova | 2 | Posicionar provas ao longo da jornada | Em páginas e VSL | Prova Avançada | Página / VSL | A | Recorrente |
| Estrategista de Bloco de CTA | 2 | Posicionar CTAs com contexto | Em páginas e fluxos longos | Intenção / Página | CTA ao Longo da Página / Checkout | A | Recorrente |
| Analista de Gargalo de Jornada | 2 | Localizar principal trava do percurso | Em diagnósticos sistêmicos | Analytics / Orquestrador | Priorizador / Ajustes estruturais | A | Sob demanda |
| Analista de Gargalo de Conversão | 2 | Achar ponto de perda comercial | Em problemas de taxa final | Analytics | Ajustes em oferta, CTA ou checkout | A | Sob demanda |
| Estrategista de Pontos de Fricção | 2 | Mapear atritos que travam avanço | Em qualquer etapa com esforço excessivo | Diagnósticos / UX | Página / Checkout / Onboarding | B | Sob demanda |
| Analista de Microabandonos | 2 | Ver pequenos vazamentos antes da saída | Quando há sensação de vazamento invisível | Analytics | Ritmo / Leitura / Etapas | B | Sob demanda |
| Estrategista de Reforço de Desejo | 2 | Intensificar vontade de ter o resultado | Em páginas, VSL e recovery | Oferta / Before-After | Página / VSL / Recovery | A | Recorrente |
| Estrategista de Reforço de Legitimidade | 2 | Aumentar sensação de seriedade | Em funis sensíveis ou tickets altos | Oferta / Prova | Página / Call / Checkout | A | Recorrente |
| Estrategista de Segmentação por Intenção | 2 | Separar usuário por calor comercial | Em funis com caminhos diferentes | Intenção de Compra | Caminhos / Call / Recovery | A | Recorrente |
| Arquiteto de Progressão de Consciência | 2 | Desenhar evolução mental da jornada | Ao montar funil completo | Consciência / Planejador Mestre | Página / VSL / Emails | A | Recorrente |

---

## CAMADA 3 — CRIATIVOS, AQUISIÇÃO E ENTRADA

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Estrategista de Criativo Estático | 3 | Desenhar criativos estáticos de performance | Em campanhas frias e remarketing | Ângulo / Big Idea | Designer / Match Criativo-Página | A | Recorrente |
| Estrategista de Carrossel | 3 | Estruturar carrosséis com progressão | Quando o formato pede sequência | Ângulo / Oferta | Designer de Carrossel | B | Recorrente |
| Estrategista de Thumbnail | 3 | Criar miniatura que para o scroll | Em vídeos e AVSL | Gancho / Abertura | Visual UGC / Motion | B | Recorrente |
| Estrategista de Visual UGC | 3 | Direcionar estética UGC nativa | Em peças humanizadas | Ângulo / Oferta | Roteirista / Motion | A | Recorrente |
| Diretor de Motion de Conversão | 3 | Definir movimento que retém | Em vídeo ads e AVSL | Criativos / VSL | Reativação de Atenção em Vídeo | B | Recorrente |
| Roteirista de Anúncios | 3 | Escrever roteiros de ads | Em vídeo ads e UGC | Ângulo / Lead | Visual UGC / Primeiro Frame | A | Recorrente |
| Estrategista de Primeiro Frame | 3 | Decidir primeiro segundo do vídeo | Em criativos em vídeo | Roteirista / Hook | Gancho de Vídeo / Thumbnail | A | Recorrente |
| Analista de Match Criativo-Página | 3 | Ver se promessa do anúncio encaixa na página | Quando há clique mas pouca progressão | Analytics / Criativos | Hero / Oferta / Página | A | Sob demanda |
| Analista de Qualificação no Anúncio | 3 | Medir se o ad atrai lead certo | Em campanhas com curiosidade excessiva | Analytics / Criativos | Ajuste de Ângulo / Oferta | A | Recorrente |
| Estrategista de Pattern Interrupt | 3 | Criar quebra de padrão útil | Em feeds saturados | Criativos / Hooks | Primeiro Frame / Thumbnail | B | Recorrente |
| Analista de CTR Criativo | 3 | Interpretar taxa de clique com contexto | Ao avaliar performance criativa | Analytics | Refresh Visual / Hook | A | Recorrente |
| Analista de Gancho de Vídeo | 3 | Diagnosticar força dos primeiros segundos | Em vídeo com retenção fraca | Analytics / Criativos | Hook / Primeiro Frame / Roteiro | A | Recorrente |
| Estrategista de Refresh Visual | 3 | Renovar criativo sem perder o que funciona | Em fadiga criativa | CTR / Biblioteca de Anúncios | Teste Criativo | B | Recorrente |
| Arquiteto de Teste Criativo | 3 | Organizar hipótese e variação criativa | Em ciclos de teste | Priorizador / Criativos | Analytics / Refresh | A | Recorrente |
| Estrategista de Iteração de Hook | 3 | Evoluir ganchos com método | Após dados de retenção/CTR | Gancho de Vídeo / CTR | Roteirista / Primeiro Frame | A | Recorrente |
| Analista de Densidade de Mensagem | 3 | Calibrar peso informacional do criativo | Quando anúncio está confuso ou raso | Criativos / CTR | Legenda / Roteiro | B | Recorrente |
| Estrategista de Legenda de Criativo | 3 | Escrever legenda que complementa a peça | Em Instagram, Facebook, TikTok ads | Criativo / Oferta | Recovery / Página | B | Recorrente |
| Designer de Carrossel de Conversão | 3 | Traduzir lógica do carrossel em layout | Quando carrossel é escolhido | Estrategista de Carrossel | Feed Native / CTR | B | Recorrente |
| Estrategista de Feed Native | 3 | Fazer anúncio parecer natural no feed | Em campanhas sociais | Visual UGC / Criativos | CTR / Qualificação no Anúncio | A | Recorrente |
| Auditor de Criativo de Performance | 3 | Revisar criativo como peça de negócio | Quando criativo performa mal ou precisa escala | Analytics / Orquestrador | Refresh / Teste Criativo | A | Sob demanda |

---

## CAMADA 4 — PÁGINAS, FUNIS, QUIZZES E EXPERIÊNCIA

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de Estrutura de Conteúdo de Conversão | 4 | Organizar blocos de página ou peça | Ao criar estrutura macro | Oferta / Big Idea | Sequência de Blocos / Página Longa | A | Recorrente |
| Arquiteto de Advertorial Avançado | 4 | Estruturar advertoriais que aquecem | Em funis editoriais | Big Idea / Prova | Página Longa / CTA / VSL | B | Recorrente |
| Arquiteto de Páginas Longas | 4 | Desenhar long pages | Em sales pages extensas | Estrutura de Conteúdo | Ritmo / Escaneabilidade / CTA | A | Recorrente |
| Estrategista de Sequência de Blocos | 4 | Ordenar função dos blocos | Ao montar páginas e advertoriais | Estrutura de Conteúdo | Transições / Provas / CTA | A | Recorrente |
| Arquiteto de Provas em Camadas | 4 | Distribuir provas ao longo da jornada | Em páginas longas e VSL | Prova / Legitimidade | Bloco de Prova / Página | A | Recorrente |
| Estrategista de Ritmo de Página | 4 | Ajustar cadência entre densidade e respiro | Em páginas com queda de scroll | Analytics / Página Longa | Escalonamento / Reativação | A | Recorrente |
| Arquiteto de Consumo Mobile | 4 | Adaptar estrutura para mobile | Em qualquer landing ou quiz | Página / Funil | Dobra / Leitura Fragmentada | A | Recorrente |
| Estrategista de Dobra | 4 | Definir acima e logo abaixo da dobra | Na primeira tela da página | Hero / Mobile | CTA / Scroll | A | Recorrente |
| Analista de Scroll de Página Longa | 4 | Ler profundidade e quedas | Em páginas com muito abandono | Analytics | Ritmo / Blocos / Reativação | A | Recorrente |
| Arquiteto de Leitura Persuasiva | 4 | Desenhar como o usuário escaneia e aprofunda | Em páginas e advertoriais | Estrutura / Escaneabilidade | CTA / Progressão para Ação | A | Recorrente |
| Estrategista de Escalonamento de Densidade | 4 | Distribuir peso informacional | Em páginas com fadiga | Ritmo / Carga Cognitiva | Página / VSL | B | Recorrente |
| Estrategista de Transição entre Blocos | 4 | Costurar passagem de seção para seção | Em páginas modulares | Sequência de Blocos | Leitura Persuasiva | B | Recorrente |
| Analista de Leitura Mobile Fragmentada | 4 | Ajustar leitura interrompida em mobile | Em funis mobile-first | Mobile / Analytics | Escaneabilidade / Dobra | B | Recorrente |
| Estrategista de Arquitetura de Escaneabilidade | 4 | Fazer scan capturar a mensagem principal | Em páginas onde poucos leem tudo | Leitura Persuasiva | CTA / Page Audit | A | Recorrente |
| Analista de Carga Cognitiva de Página | 4 | Medir esforço mental exigido | Em páginas densas ou confusas | Analytics / Página | Densidade / Ritmo / Simplificação | A | Recorrente |
| Estrategista de CTA ao Longo da Página | 4 | Distribuir CTAs pela jornada | Em páginas longas | Bloco de CTA / Intenção | Checkout / Booking | A | Recorrente |
| Estrategista de Reativação de Interesse na Página | 4 | Renovar atenção no meio da leitura | Em páginas com quedas no meio | Scroll / Ritmo | Página / CTA | B | Recorrente |
| Arquiteto de Progressão de Leitura para Ação | 4 | Fazer leitura terminar em prontidão | Em pages e advertoriais | Leitura Persuasiva | CTA / Checkout | A | Recorrente |
| Estrategista de Modularidade de Conteúdo | 4 | Criar blocos reaproveitáveis | Em sistemas de páginas e testes | Estrutura / Playbook | Página / Advertorial / Email | C | Recorrente |
| Auditor de Arquitetura de Página | 4 | Revisão estrutural geral da página | Em diagnósticos ou pré-lançamento | Orquestrador / Analytics | Ajustes de Estrutura | A | Sob demanda |
| Arquiteto de Funis Interativos | 4 | Criar jornadas interativas adaptativas | Em quizzes, gamificados, diagnósticos | Planejador Mestre / Oferta | Quizzes / Segmentação / Resultado | A | Recorrente |
| Arquiteto de Quizzes Avançados | 4 | Estruturar quiz profundo e útil | Em captação diagnóstica | Funis Interativos | Interpretação / Segmentação | A | Recorrente |
| Estrategista de Lógicas Condicionais | 4 | Desenhar bifurcações do fluxo | Em funis com caminhos múltiplos | Funis Interativos | Caminhos Adaptativos | A | Recorrente |
| Arquiteto de Diagnóstico Personalizado | 4 | Criar sensação de leitura individual | Em quizzes e diagnósticos | Quizzes / Interpretação | Resultado Interativo / Oferta | A | Recorrente |
| Estrategista de Segmentação Dinâmica | 4 | Atualizar perfil ao longo da jornada | Em fluxos adaptativos | Diagnóstico / Intenção | Caminhos / Recovery / Call | A | Recorrente |
| Arquiteto de Gamificação Profunda | 4 | Criar progressão com recompensa psicológica | Em funis gamificados | Funis Interativos | Feedback / Retenção | B | Recorrente |
| Estrategista de Feedback Progressivo | 4 | Dar retorno útil a cada passo | Em quizzes e jornadas guiadas | Gamificação / Etapas | Retenção / Resultado | B | Recorrente |
| Arquiteto de Caminhos Adaptativos | 4 | Organizar múltiplas rotas | Em funis com personalização real | Segmentação / Lógicas Condicionais | Resultado / Offer Paths | A | Recorrente |
| Estrategista de Orientação do Usuário | 4 | Mostrar onde ele está e o que vem | Em experiências interativas longas | Funis Interativos | Etapas / Show-up do fluxo | B | Recorrente |
| Estrategista de Interpretação de Respostas | 4 | Extrair significado das respostas | Em quiz e aplicação | Quiz / Aplicação | Diagnóstico / Segmentação | A | Recorrente |
| Designer de Etapas Interativas | 4 | Melhorar cada tela do fluxo | Ao desenhar passos individuais | Funis Interativos | Retenção / Feedback | B | Recorrente |
| Estrategista de Retenção em Fluxos Interativos | 4 | Evitar abandono no meio do fluxo | Em quizzes longos | Analytics / Funis Interativos | Etapas / Feedback / Reativação | A | Recorrente |
| Estrategista de Autoidentificação Guiada | 4 | Fazer o usuário se reconhecer no problema | Em diagnósticos e quizzes | Diagnóstico / Crenças | Oferta / Resultado | A | Recorrente |
| Analista de Completude de Fluxo | 4 | Medir taxa de conclusão do fluxo | Em quizzes e jornadas guiadas | Analytics | Retenção / Complexidade | A | Recorrente |
| Estrategista de Progressão de Valor Percebido | 4 | Fazer o fluxo parecer cada vez mais valioso | Em funis interativos e onboarding | Gamificação / Funil | Resultado / Oferta | B | Recorrente |
| Estrategista de Redirecionamento de Caminho | 4 | Mudar o usuário de rota com inteligência | Em baixa aderência ao caminho atual | Segmentação / Analytics | Caminhos Adaptativos | B | Sob demanda |
| Arquiteto de Resultado Interativo | 4 | Construir payoff final do quiz/diagnóstico | Ao final do fluxo | Diagnóstico / Autoidentificação | Oferta / Booking / Checkout | A | Recorrente |
| Estrategista de Memória de Jornada | 4 | Reusar respostas e contexto | Em fluxos longos e personalizados | Funis Interativos | Caminhos / Resultado / Recovery | B | Recorrente |
| Analista de Complexidade Interativa | 4 | Detectar fluxo pesado demais | Quando completude é baixa | Analytics / Auditoria | Simplificação / Etapas | A | Recorrente |
| Auditor de Arquitetura Interativa | 4 | Revisar o sistema interativo como um todo | Em revisão estrutural | Orquestrador / Analytics | Ajustes de fluxo | A | Sob demanda |

---

## CAMADA 5 — VSL, NARRAÇÃO, ÁUDIO E RETENÇÃO AUDIOVISUAL

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de VSL Avançada | 5 | Estruturar jornada completa da VSL | Ao criar VSL do zero | Oferta / Big Idea / Prova | Script Falado / Narração / Pitch | A | Recorrente |
| Estrategista de Narração | 5 | Definir postura de voz da peça | Ao planejar entrega verbal | VSL / Script | Voz Persuasiva / Ritmo de Áudio | A | Recorrente |
| Arquiteto de Voz Persuasiva | 5 | Escolher a identidade vocal | Ao selecionar locução ou IA de voz | Narração | Autoridade Sonora / Plausibilidade | A | Recorrente |
| Estrategista de Trilha Sonora | 5 | Definir música de fundo | Em VSL, AVSL e vídeos de venda | VSL / Sincronização Emocional | Dinâmica de Trilha | B | Recorrente |
| Estrategista de Ritmo de Áudio | 5 | Controlar velocidade e pausas | Em scripts longos e falados | Narração / Script | Pausas e Ênfase / Clareza Auditiva | A | Recorrente |
| Copywriter de Script Falado | 5 | Escrever texto para ser ouvido | Ao transformar estratégia em fala | VSL / Ângulo / Mecanismo | Narração / Clareza Auditiva | A | Recorrente |
| Estrategista de Sincronização Emocional | 5 | Alinhar voz, trilha e visual | Em vídeos com emoção coordenada | VSL / Trilha / Narração | Escalada Emocional / Retenção | A | Recorrente |
| Estrategista de Abertura de Vídeo | 5 | Definir primeiros segundos da VSL | No início do vídeo | Lead / Gancho | Retenção Audiovisual / Primeiro Frame | A | Recorrente |
| Estrategista de Pitch em Vídeo | 5 | Estruturar a entrada da oferta na VSL | Na parte de fechamento | VSL / Oferta | Checkout / CTA / Call | A | Recorrente |
| Estrategista de Retenção Audiovisual | 5 | Sustentar permanência ao longo do vídeo | Em VSL com quedas ou pré-planejamento | Analytics / VSL | Reativação de Atenção / Ritmo | A | Recorrente |
| Arquiteto de Dinâmica de Trilha | 5 | Fazer trilha evoluir por fases | Em vídeos longos | Trilha Sonora | Sincronização Emocional | B | Recorrente |
| Estrategista de Pausas e Ênfase | 5 | Marcar palavras e silêncios | Em ajustes finos de fala | Ritmo de Áudio / Script | Narração / Clareza | B | Recorrente |
| Estrategista de Plausibilidade Falada | 5 | Evitar fala artificial ou forçada | Em peças que soam hype demais | Script / Narração | Voz / Clareza / Autoridade | A | Recorrente |
| Analista de Clareza Auditiva | 5 | Ver se a fala está fácil de entender | Em locução, VSL ou áudio longo | Script / Narração | Densidade Falada / Ritmo | A | Recorrente |
| Estrategista de Escalada Emocional em Vídeo | 5 | Construir curva emocional do vídeo | Em VSL e AVSL | Sincronização Emocional | Pitch / Retenção | B | Recorrente |
| Estrategista de Reativação de Atenção em Vídeo | 5 | Recuperar foco ao longo do vídeo | Em quedas no meio da VSL | Retenção Audiovisual | Motion / Dinâmica de Trilha | B | Recorrente |
| Arquiteto de Blocos de Áudio | 5 | Modular a peça falada em unidades | Em produção de VSL e áudios | VSL / Script | Narração / Edição | B | Recorrente |
| Estrategista de Autoridade Sonora | 5 | Fazer a voz soar confiável | Em VSL, call recordings e áudios de venda | Voz Persuasiva / Narração | Plausibilidade / Script | A | Recorrente |
| Analista de Densidade Falada | 5 | Medir peso auditivo da fala | Em VSLs densas ou cansativas | Analytics / Clareza Auditiva | Ritmo / Script | B | Recorrente |
| Auditor de Arquitetura Audiovisual | 5 | Revisar VSL como sistema completo | Em lançamentos ou baixa performance | Orquestrador / Analytics | Ajustes em voz, script, ritmo e pitch | A | Sob demanda |

---

## CAMADA 6 — CHECKOUT, PÓS-COMPRA, HIGH TICKET E CONVERSÃO ASSISTIDA

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de Checkout Avançado | 6 | Estruturar checkout de alta conclusão | Em qualquer oferta com abandono final | Oferta / Diagnostista de Checkout | Order Bump / Thank You | A | Recorrente |
| Estrategista de Order Bump Avançado | 6 | Criar add-on de baixa fricção | Em checkouts com espaço para AOV | Checkout / Stack de Oferta | Upsell / Pós-compra | B | Recorrente |
| Arquiteto de Upsell Imediato | 6 | Criar upsell logo após compra | Em funis com momentum pós-compra | Checkout / Escada de Valor | Downsell / Obrigado | A | Recorrente |
| Arquiteto de Downsell Imediato | 6 | Recuperar valor se upsell falha | Quando upsell não converte | Upsell Imediato | Obrigado / Continuidade | B | Recorrente |
| Arquiteto de Página de Obrigado | 6 | Organizar pós-compra imediato | Depois do checkout | Checkout / Upsell | Onboarding / Continuidade | A | Recorrente |
| Estrategista de Refund Prevention | 6 | Reduzir risco de arrependimento | Em produtos com refund sensível | Obrigado / Onboarding | Estado Mental Pós-Compra | A | Recorrente |
| Arquiteto de Onboarding Inicial | 6 | Guiar primeiros passos | Em qualquer pós-compra | Obrigado / Oferta→Onboarding | Ativação / Valor Imediato | A | Recorrente |
| Estrategista de Continuidade Imediata | 6 | Manter momentum após compra | Após confirmação de pagamento | Obrigado / Onboarding | Ativação / LTV | A | Recorrente |
| Estrategista de Reforço de Acerto da Compra | 6 | Consolidar a sensação de decisão correta | No pós-compra imediato | Obrigado / Refund Prevention | Estado Mental / Copy Pós-Compra | A | Recorrente |
| Estrategista de Entrega de Valor Imediato | 6 | Fazer o cliente sentir ganho rápido | Nos primeiros minutos/horas | Onboarding / Continuidade | LTV / Retenção | A | Recorrente |
| Arquiteto de Pacote Pós-Compra | 6 | Organizar tudo que o comprador recebe | Ao desenhar experiência inicial completa | Obrigado / Onboarding | Copy Pós-Compra / Rota Pós-Compra | B | Recorrente |
| Estrategista de Estado Mental Pós-Compra | 6 | Ler e conduzir psicologia após compra | Em ofertas sensíveis ou tickets maiores | Refund Prevention / Obrigado | Copy Pós-Compra / Acerto da Compra | A | Recorrente |
| Estrategista de Transição Checkout → Onboarding | 6 | Costurar compra e uso | Quando pós-compra esfria | Checkout / Onboarding | Ativação / Obrigado | A | Recorrente |
| Estrategista de Ativação Pós-Compra | 6 | Levar à primeira ação importante | Em onboarding e member area | Onboarding / Valor Imediato | Retenção / LTV | A | Recorrente |
| Estrategista de Pós-Compra para LTV | 6 | Semear retenção e monetização futura | Quando já existe base de compradores | Escada de Valor / Continuidade | Recovery / Upsell futuro | B | Recorrente |
| Copywriter de Pós-Compra Imediato | 6 | Escrever mensagens pós-venda | Em obrigado, email, WhatsApp pós-compra | Onboarding / Estado Mental | Ativação / Refund Prevention | B | Recorrente |
| Estrategista de Rota de Pós-Compra | 6 | Separar caminhos diferentes após compra | Em ecossistemas com múltiplos perfis | Pacote Pós-Compra / Segmentação | Onboarding / LTV / Recovery | B | Recorrente |
| Analista de Risco de Arrependimento | 6 | Ver fontes prováveis de refund | Em diagnósticos de cancelamento | Analytics / Refund Prevention | Ajustes em oferta, onboarding, copy | A | Sob demanda |
| Estrategista de Encaixe Oferta → Onboarding | 6 | Alinhar promessa e entrega inicial | Quando há quebra de expectativa | Oferta / Onboarding | Refund Prevention / Acerto da Compra | A | Recorrente |
| Auditor de Arquitetura Pós-Compra | 6 | Revisão completa do pós-conversão | Em baixa ativação, refund ou LTV | Orquestrador / Analytics | Ajustes no pós-compra inteiro | A | Sob demanda |
| Estrategista de Oferta Premium | 6 | Elevar percepção de valor para premium | Em produtos mais sofisticados | Pesquisa / Posicionamento | High Ticket / Página Premium | A | Recorrente |
| Arquiteto de High Ticket | 6 | Estruturar venda de ticket alto | Em modelos assistidos ou premium | Oferta Premium / Planejador Mestre | Aplicação / Booking / Call | A | Recorrente |
| Arquiteto de Aplicação Comercial | 6 | Criar aplicação que filtra e aquece | Em high ticket ou calls qualificadas | High Ticket / Qualificação | Booking / Pré-Call | A | Recorrente |
| Estrategista de Qualificação Comercial | 6 | Definir critérios de lead bom | Antes de calls e esforços comerciais | High Ticket / Aplicação | Pré-Booking / Booking | A | Recorrente |
| Arquiteto de Call Booking | 6 | Maximizar marcação qualificada | Em funis com agendamento | Qualificação / Aplicação | Pré-Call / Show-up | A | Recorrente |
| Estrategista de Pré-Call | 6 | Preparar lead antes da reunião | Entre booking e call | Booking | Show-up / Preparação para Call | A | Recorrente |
| Estrategista de Show-up | 6 | Aumentar comparecimento | Em calls com no-show alto | Pré-Call / Booking | Fechamento Consultivo | A | Recorrente |
| Arquiteto de Fechamento Consultivo | 6 | Estruturar venda em call | Em high ticket e conversão assistida | Pré-Call / Oferta para Call | Conversão Assistida / Ticket Ascension | A | Recorrente |
| Estrategista de Ascensão de Ticket | 6 | Elevar lead/cliente para ticket maior | Em ladders e ofertas premium | Escada de Valor / Pós-compra LTV | High Ticket / Call | B | Recorrente |
| Estrategista de Conversão Assistida | 6 | Integrar automação e humano | Quando venda precisa apoio humano | High Ticket / Orquestrador | Booking / Pré-Call / Fechamento | A | Recorrente |
| Analista de Fit para High Ticket | 6 | Ver se modelo premium faz sentido | Antes de montar high ticket | Oferta Premium / Pesquisa | High Ticket / Aplicação | A | Pontual |
| Estrategista de Preparação para Call de Vendas | 6 | Melhorar contexto do lead na call | Em calls frias ou pouco produtivas | Pré-Call / Show-up | Fechamento Consultivo | B | Recorrente |
| Estrategista de Qualificação Pré-Booking | 6 | Filtrar antes do calendário | Quando booking ruim polui agenda | Qualificação Comercial | Booking | A | Recorrente |
| Arquiteto de Página de Aplicação Premium | 6 | Fazer aplicação parecer séria e valiosa | Em ofertas premium/high ticket | High Ticket / Oferta Premium | Aplicação Comercial / Booking | B | Recorrente |
| Analista de No-Show Comercial | 6 | Diagnosticar ausência em calls | Quando comparecimento é baixo | Analytics / Show-up | Ajustes em booking e pré-call | A | Sob demanda |
| Estrategista de Oferta para Call | 6 | Adaptar framing da oferta ao vivo | Em vendas consultivas | Fechamento Consultivo | Call / Follow-up pós-call | A | Recorrente |
| Estrategista de Redução de Resistência em Call | 6 | Baixar defesas mentais na conversa | Em calls com muita objeção silenciosa | Fechamento Consultivo | Oferta para Call / Follow-up | A | Recorrente |
| Estrategista de Otimização de Booking → Fechamento | 6 | Melhorar pipeline de call até venda | Em funis assistidos | Analytics / High Ticket | Ajustes em booking, show-up, call | A | Recorrente |
| Copywriter de Pré-Call e Call Booking | 6 | Escrever copy de agendamento e lembretes | Em páginas e mensagens de booking | Booking / Pré-Call | Show-up / Preparação | B | Recorrente |
| Auditor de Arquitetura High Ticket | 6 | Revisão completa da venda premium | Em escala ou baixa eficiência consultiva | Orquestrador / Analytics | Ajustes estruturais de high ticket | A | Sob demanda |

---

## CAMADA 7 — RECUPERAÇÃO, FOLLOW-UP E REATIVAÇÃO

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de Email Avançado | 7 | Estruturar sistema de email | Em nurture, recovery e retenção | Orquestrador / Lifecycle | Copy Email / Timing / Recovery | A | Recorrente |
| Arquiteto de WhatsApp Avançado | 7 | Estruturar continuidade via WhatsApp | Em canais quentes e íntimos | Lifecycle / Recovery | Copy WhatsApp / Reentrada | A | Recorrente |
| Arquiteto de Recuperação Multi-Canal | 7 | Orquestrar retomada cruzando canais | Em abandonos importantes | Recovery / Pós-compra / High Ticket | Timing / Canal / Copy | A | Recorrente |
| Estrategista de Reativação Avançada | 7 | Reacender lead frio ou inativo | Quando a base esfriou | Recovery Multi-Canal | Novo Gancho / Copy | A | Recorrente |
| Arquiteto de Sequências de Follow-up | 7 | Organizar contatos sucessivos | Em calls, abandonment, vendas e pós-call | Recovery / Sales | Timing / Escalada | A | Recorrente |
| Analista de Janela de Conversão | 7 | Entender momento ideal de resposta | Em cadência de recovery | Analytics / Recovery | Timing de Mensagem | B | Recorrente |
| Estrategista de Timing de Mensagem | 7 | Definir quando mandar cada contato | Em qualquer sequência | Janela de Conversão / Follow-up | Email / WhatsApp / Multi-Canal | A | Recorrente |
| Estrategista de Continuidade Conversacional | 7 | Fazer a conversa parecer contínua | Em WhatsApp e follow-ups humanos | WhatsApp / Email / Follow-up | Reentrada / Memória de Contato | A | Recorrente |
| Estrategista de Pressão de Retorno sem Fadiga | 7 | Calibrar insistência saudável | Em recovery e follow-up persistente | Follow-up / Recovery | Escalada / Fadiga de Contato | A | Recorrente |
| Copywriter de Email de Recuperação | 7 | Escrever emails de retomada | Em abandono e reativação | Email Avançado / Recovery | Timing / Métricas | A | Recorrente |
| Copywriter de WhatsApp de Recuperação | 7 | Escrever WhatsApps de retomada | Em abandono, no-show e lead frio | WhatsApp / Recovery | Timing / Resposta | A | Recorrente |
| Arquiteto de Reativação por WhatsApp | 7 | Desenhar fluxo completo de reativação no WhatsApp | Em listas mornas e leads abandonados | Recovery / WhatsApp | Copy WhatsApp / Timing | B | Recorrente |
| Estrategista de Novo Gancho de Retorno | 7 | Criar nova entrada para quem ignorou | Em sequências saturadas | Reativação Avançada | Email / WhatsApp / Ads | A | Recorrente |
| Analista de Resposta por Canal | 7 | Entender papel de cada canal | Em recuperação multi-touch | Analytics / Recovery | Recovery Multi-Canal | B | Recorrente |
| Estrategista de Reentrada Conversacional | 7 | Retomar conversa sem estranhamento | Em WhatsApp e DM | Continuidade Conversacional | Copy WhatsApp / Follow-up | B | Recorrente |
| Estrategista de Escalada de Follow-up | 7 | Aumentar intensidade com método | Em sequências longas | Follow-up / Pressão sem Fadiga | Copy / Timing | B | Recorrente |
| Analista de Fadiga de Contato | 7 | Detectar saturação e irritação | Em cadências longas | Analytics / Recovery | Timing / Pressão / Pausas | A | Recorrente |
| Estrategista de Memória de Contato | 7 | Manter histórico vivo entre mensagens | Em canais conversacionais | Continuidade Conversacional | Reentrada / Copy | B | Recorrente |
| Estrategista de Prioridade de Retomada | 7 | Decidir quem recuperar primeiro | Em bases grandes ou budget limitado | Recovery / Analytics | Multi-Canal / Follow-up | A | Recorrente |
| Auditor de Arquitetura de Recuperação | 7 | Revisar sistema completo de retomada | Em baixa retomada ou muita fadiga | Orquestrador / Analytics | Ajustes em recovery inteiro | A | Sob demanda |

---

## CAMADA 8 — ANALYTICS, MÉTRICAS E DECISÃO

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de Analytics Avançado | 8 | Desenhar sistema analítico | No início ou refatoração de tracking | Orquestrador / Planejador Mestre | Instrumentação / Funil Analítico | A | Recorrente |
| Estrategista de Instrumentação | 8 | Definir eventos e propriedades | Ao implementar tracking | Analytics Avançado | Taxonomia / Qualidade de Dados | A | Recorrente |
| Arquiteto de Eventos Analíticos | 8 | Organizar malha de eventos da jornada | Em sistemas complexos | Analytics / Instrumentação | Funil Analítico / Dashboard | A | Recorrente |
| Estrategista de Atribuição | 8 | Definir lógica de crédito entre canais | Em aquisição multi-touch | Analytics / Mídia | Decisão Baseada em Dados | B | Recorrente |
| Diagnostista de Métricas | 8 | Interpretar números com contexto | Em qualquer análise de performance | Analytics / Orquestrador | Priorizador / Diagnósticos | A | Diária |
| Analista de Cohorts | 8 | Comparar grupos ao longo do tempo | Em aquisição, retenção e qualidade | Analytics | Retenção / Decisão | A | Recorrente |
| Analista de Curvas de Retenção | 8 | Ler erosão e estabilização | Em produtos, funnels e pós-compra | Analytics / Cohorts | Onboarding / LTV / Recovery | A | Recorrente |
| Arquiteto de Funil Analítico | 8 | Definir etapas mensuráveis do funil | Ao modelar jornada | Analytics Avançado | Conversão por Etapa / Dashboard | A | Recorrente |
| Estrategista de Decisão Baseada em Dados | 8 | Converter análise em ação clara | Após diagnósticos e leituras | Diagnostista / Cohorts / Funnels | Priorizador / Planejador | A | Diária |
| Analista de Qualidade de Dados | 8 | Ver se tracking e números são confiáveis | Em discrepâncias ou setup novo | Instrumentação / Dashboard | Correções técnicas / Auditoria | A | Recorrente |
| Estrategista de Taxonomia de Eventos | 8 | Padronizar nomenclatura de tracking | Ao criar ou revisar analytics | Instrumentação | Qualidade de Dados / Dashboard | B | Pontual |
| Analista de Conversão por Etapa | 8 | Medir passagem entre passos do funil | Em diagnósticos de queda | Funil Analítico | Gargalos / Priorizador | A | Diária |
| Analista de Sinais Precursores | 8 | Encontrar indicadores antecipadores | Em gestão ágil e predição | Analytics / Decisão | Priorizador / Planejador | B | Recorrente |
| Estrategista de Janelas Analíticas | 8 | Escolher janela temporal certa | Em leituras com latência variável | Diagnostista / Analytics | Dashboard / Decisão | B | Recorrente |
| Estrategista de KPIs de Decisão | 8 | Definir KPIs realmente úteis | Ao montar dashboard e governança | Analytics Avançado / Planejador Mestre | Dashboard Estratégico | A | Pontual |
| Analista de Discrepâncias Analíticas | 8 | Resolver números que não batem | Em conflitos entre fontes | Qualidade de Dados / Diagnostista | Correção de tracking / decisão prudente | B | Sob demanda |
| Estrategista de Leitura de Jornada Completa | 8 | Unir topo, meio, fundo e pós-compra | Em análises sistêmicas | Analytics / Orquestrador | Decisão Baseada em Dados | A | Recorrente |
| Arquiteto de Dashboard Estratégico | 8 | Organizar painel decisório | Ao construir visão gerencial | KPIs / Analytics | Liderança / Diagnósticos | B | Pontual |
| Analista de Loops de Comportamento | 8 | Ler retornos, hábitos e recorrências | Em retenção, reengajamento e produto | Cohorts / Retenção | LTV / Recovery / Onboarding | B | Recorrente |
| Auditor de Arquitetura Analítica | 8 | Revisar sistema completo de medição | Em maturidade, problemas ou scale-up | Orquestrador / Analytics | Ajustes de tracking e dashboards | A | Sob demanda |

---

## CAMADA 9 — OPERAÇÃO, PRIORIZAÇÃO E ESCALA

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Priorizador de Experimentos | 9 | Decidir o que testar primeiro | Em backlog cheio de hipóteses | Decisão Baseada em Dados / Orquestrador | Planejador Semanal / Teste Criativo | A | Diária |
| Gestor de Backlog de Otimização | 9 | Organizar oportunidades e correções | Em operações contínuas | Priorizador / Planejador | Sprint / Roadmap | A | Diária |
| Planejador de Roadmap de Growth | 9 | Organizar horizonte de iniciativas | Em ciclos mensais/trimestrais | Planejador Mestre / Dados | Prioridades Mestras / Backlog | A | Recorrente |
| Decisor sob Incerteza | 9 | Escolher mesmo com dados imperfeitos | Em cenários ambíguos | Orquestrador / Sintetizador | Planejador / Priorizador | A | Sob demanda |
| Estrategista de Gestão de Hipóteses | 9 | Formular hipóteses fortes | Antes de testes estruturados | Priorizador / Analytics | Sprint / Revisor de Aprendizados | A | Recorrente |
| Orquestrador de Sprint de Funil | 9 | Coordenar ciclo curto de execução | Em sprint semanal/quizenal | Planejador / Prioridades | Handoffs / Revisor | B | Recorrente |
| Planejador Semanal do Lab | 9 | Organizar a semana operacional | No início de cada semana | Prioridades Mestras / Backlog | Sprint / Capacidade Operacional | A | Semanal |
| Gestor de Handoff entre Agents | 9 | Garantir passagem limpa entre etapas | Em processos com vários agents | Orquestrador / Comunicação Interna | Próximo agent do fluxo | A | Diária |
| Consolidador Estratégico | 9 | Unir várias análises em direção única | Após diagnósticos grandes | Orquestrador / Analytics | Sintetizador / Planejador | A | Recorrente |
| Arquiteto de Playbook | 9 | Codificar padrões vencedores | Após aprendizados repetidos | Revisor de Aprendizados / Memória | Curador de Inteligência Reutilizável | B | Recorrente |
| Gestor de Decisões | 9 | Registrar racional e escolha feita | Em decisões estratégicas | Sintetizador / Secretário Executivo | Memória Operacional | B | Diária |
| Revisor de Aprendizados | 9 | Extrair lições robustas | Após testes, sprints e campanhas | Analytics / Sprint | Playbook / Memória Estratégica | A | Recorrente |
| Estrategista de Capacidade Operacional | 9 | Medir quanto cabe no ciclo | Em semanas, sprints e escalas | Planejador Semanal / Roadmap | Priorização / Sequência de Implementação | A | Recorrente |
| Gestor de Cadência de Testes | 9 | Regular ritmo de experimentação | Em operações de otimização contínua | Priorizador / Sprint | Analytics / Revisor | B | Recorrente |
| Planejador de Janelas de Escala | 9 | Escolher quando escalar | Em campanhas ou funis promissores | Analytics / Roadmap | Processo de Escala / Budget | A | Recorrente |
| Analista de Risco Operacional | 9 | Ver fragilidades de execução | Em crescimento ou complexidade alta | Planejador / Governança | Processo de Escala / Prioridades | B | Recorrente |
| Estrategista de Sequência de Implementação | 9 | Ordenar mudanças da forma certa | Em projetos com dependências | Roadmap / Handoff | Execução / Sprint | A | Recorrente |
| Auditor de Prioridade | 9 | Ver se foco atual faz sentido | Em excesso de urgências | Prioridades Mestras / Orquestrador | Planejador / Backlog | B | Sob demanda |
| Gestor de Dependências | 9 | Mapear pré-requisitos e bloqueios | Em projetos complexos | Planejador / Sequência | Execução / Sprint | A | Recorrente |
| Arquiteto de Processo de Escala | 9 | Estruturar operação para crescer sem caos | Em momento de scale-up | Planejador de Janelas / Governança | Processo / Governança / Capacidade | A | Recorrente |

---

## NÚCLEO ABSOLUTO DE OPERAÇÃO

Se você quiser usar a tabela-mestra sem se perder, estes são os **15 agents base** para operar quase tudo:

| Agent | Papel |
| --- | --- |
| Orquestrador Supremo | coordena o sistema inteiro |
| Meta-Agent de Roteamento | decide quem entra |
| Pesquisador Avançado de Mercado | encontra verdade de mercado |
| Gerador de Big Idea | define a ideia central |
| Especialista em Mecanismo Único | cria diferenciação plausível |
| Estrategista de Oferta de Entrada | define o front-end |
| Estrategista de Criativo Estático | constrói aquisição |
| Roteirista de Anúncios | cria ads em vídeo |
| Arquiteto de Estrutura de Conteúdo de Conversão | organiza página/funil |
| Arquiteto de VSL Avançada | estrutura VSL |
| Arquiteto de Checkout Avançado | fecha conversão |
| Arquiteto de Analytics Avançado | mede com inteligência |
| Diagnostista de Métricas | interpreta os números |
| Priorizador de Experimentos | decide o que mexer primeiro |
| Auditor Supremo do Sistema Multiagent | revisa o todo |

---

## COMO USAR A TABELA-MESTRA

### Se você vai criar um funil novo

Use nesta ordem:
1. Pesquisador Avançado de Mercado
2. Analista de Crenças de Mercado
3. Gerador de Big Idea
4. Especialista em Mecanismo Único
5. Estrategista de Oferta de Entrada
6. Estrategista de Ângulo
7. Estrategista de Criativo Estático / Roteirista de Anúncios
8. Arquiteto de Estrutura de Conteúdo de Conversão
9. Arquiteto de VSL Avançada
10. Arquiteto de Checkout Avançado
11. Arquiteto de Analytics Avançado
12. Priorizador de Experimentos

### Se você vai diagnosticar queda de conversão

Use nesta ordem:
1. Auditor de Arquitetura Analítica
2. Diagnostista de Métricas
3. Analista de Conversão por Etapa
4. Diagnostista de Hero / Pitch / Checkout
5. Analista de Match Criativo-Página
6. Analista de Qualificação no Anúncio
7. Analista de Carga Cognitiva de Página
8. Priorizador de Experimentos

### Se você vai escalar

Use nesta ordem:
1. Analista de Cohorts
2. Analista de Curvas de Retenção
3. Planejador de Janelas de Escala
4. Estrategista de Refresh Visual
5. Arquiteto de Upsell Imediato
6. Estrategista de Pós-Compra para LTV
7. Arquiteto de Processo de Escala

---

## CAMADA 14 — AQUISIÇÃO SAAS B2B

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de Aquisição SaaS | 14 | Orquestrar sistema completo de aquisição B2B SaaS | Ao planejar ou diagnosticar aquisição | Orquestrador Supremo / Planejador Mestre | Sub-agentes da Camada 14 | A | Diária |
| Estrategista de Funil SaaS B2B | 14 | Definir modelo e jornada de aquisição | Ao criar ou refatorar funil de aquisição | Arquiteto de Aquisição SaaS | PLG / Trial / Landing Page | A | Recorrente |
| Estrategista de Product-Led Growth | 14 | Projetar crescimento via produto | Quando modelo é PLG ou hybrid | Funil SaaS B2B | Trial/Freemium / Onboarding B2B (C13) | A | Recorrente |
| Arquiteto de Trial/Freemium | 14 | Projetar experiência de trial | Ao lançar ou otimizar trial | PLG / Funil SaaS B2B | Onboarding B2B (C13) / Analytics (C8) | A | Recorrente |
| Estrategista de Paid Acquisition B2B | 14 | Alocar budget e canais pagos | Ao planejar mídia paga B2B | Arquiteto de Aquisição SaaS | LinkedIn Ads / Google Ads / Retargeting | A | Recorrente |
| Estrategista de LinkedIn Ads B2B | 14 | Executar campanhas LinkedIn | Em aquisição paga B2B | Paid B2B | Landing Page SaaS / Lead Scoring | A | Recorrente |
| Estrategista de Google Ads B2B | 14 | Executar campanhas Google B2B | Em aquisição paga B2B | Paid B2B | Landing Page SaaS / Lead Scoring | A | Recorrente |
| Estrategista de Retargeting B2B | 14 | Orquestrar retargeting cross-canal | Em nurturing pago de leads quentes | Paid B2B / ABM | Demo Booking / Landing Page | A | Recorrente |
| Arquiteto de Funil de Conteúdo SaaS | 14 | Criar máquina de conteúdo | Ao construir inbound orgânico | Arquiteto de Aquisição SaaS | Inbound B2B (C13) / Lead Scoring | B | Recorrente |
| Estrategista de Webinar Funnel B2B | 14 | Criar funil de webinar | Em eventos de geração de demanda | Arquiteto de Aquisição SaaS | Demo Booking / Vendas Consultivas (C13) | B | Recorrente |
| Estrategista de ABM | 14 | Executar Account-Based Marketing | Em enterprise ou named accounts | Arquiteto de Aquisição SaaS | Outbound B2B (C13) / Retargeting | A | Recorrente |
| Arquiteto de Landing Page SaaS | 14 | Projetar landing pages B2B SaaS | Ao criar/otimizar páginas | Funil SaaS B2B / Paid B2B | Demo Booking / Trial / Lead Scoring | A | Recorrente |
| Estrategista de Demo Booking Funnel | 14 | Otimizar funil até a demo | Em vendas consultivas com booking | Landing Page SaaS | Vendas Consultivas B2B (C13) / Show-up (C6) | A | Recorrente |
| Estrategista de Lead Scoring B2B | 14 | Qualificar e rotear leads | Em qualquer modelo de aquisição | Todos os canais da C14 | Vendas Consultivas (C13) / Nurturing | A | Diária |
| Estrategista de Nurturing Multi-touch B2B | 14 | Orquestrar nurturing multi-canal | Em leads que não convertem imediatamente | Lead Scoring / Retargeting | Demo Booking / Vendas Consultivas (C13) | A | Recorrente |

---

## CAMADA 15 — ENGENHARIA DE PRODUTO SAAS

| Agent | Camada | Função | Quando usar | Quem chama | Handoff para | Prioridade | Frequência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arquiteto de SaaS | 15 | Definir arquitetura técnica do produto | Ao criar/refatorar produto SaaS | Orquestrador Supremo / Planejador Mestre | Full Stack / UX Designer | A | Recorrente |
| UX Designer de SaaS | 15 | Projetar interfaces e experiência do produto | Ao criar/melhorar UI/UX do produto | Arquiteto de SaaS / PLG (C14) | Full Stack / Onboarding B2B (C13) | A | Recorrente |
| Programador Full Stack de SaaS | 15 | Implementar código frontend e backend | Ao executar decisões de arquitetura e design | Arquiteto de SaaS / UX Designer | Analytics (C8) / Deploy | A | Diária |
