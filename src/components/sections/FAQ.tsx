"use client";

import React, { useState } from "react";
import { useFunnelVersion } from "@/hooks/useFunnelVersion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isV3 } = useFunnelVersion();

  const FAQ_ITEMS = [
    {
      question: "Como funciona o teste grátis?",
      answer: isV3 
        ? "Ao clicar em 'Começar Teste Grátis', sua conta é criada na hora e você tem acesso imediato, sem cartão de crédito, por 14 dias com todas as funcionalidades liberadas."
        : "Ao clicar em 'Começar Teste Grátis', você será direcionado ao nosso time comercial pelo WhatsApp. Em poucos minutos, ativamos sua conta com acesso completo a todas as funcionalidades, sem limitações.",
    },
    {
      question: "Precisa de cartão de crédito?",
      answer: "Não. O teste é 100% gratuito e sem compromisso. Você não precisa cadastrar nenhum método de pagamento para começar.",
    },
    {
      question: "Quanto tempo leva para implementar?",
      answer: "A ativação leva menos de 2 minutos. Você pode configurar seus primeiros OKRs e metas no mesmo dia. Nosso time ajuda na configuração inicial se necessário.",
    },
    {
      question: "Funciona para empresas de qual tamanho?",
      answer: "A Atingi é ideal para empresas de qualquer tamanho. Independente se você tem 10 ou 5000 colaboradores, a plataforma se adapta perfeitamente à estrutura de departamentos e times da sua empresa.",
    },
    {
      question: "Integra com as ferramentas que já usamos?",
      answer: "Sim. A Atingi se integra com as principais ferramentas do mercado. Você pode centralizar metas, OKRs e KPIs sem precisar abandonar as ferramentas que sua equipe já usa.",
    },
  ];

  return (
    <section id="faq" className="relative py-14 md:py-24 bg-[#f2f2f5]">
      <div className="max-w-[720px] mx-auto px-5">
        {/* ── Header — centered, same pattern ── */}
        <div className="reveal text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[12px]">💬</span>
            <span className="text-[12px] font-bold text-slate-600">Dúvidas frequentes</span>
          </div>

          <h2 className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold text-[#0c111d] leading-[1.15] tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        {/* ── Accordion — white cards, same border/shadow pattern ── */}
        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="reveal-scale bg-white rounded-2xl border overflow-hidden transition-all duration-300 group"
                style={{
                  boxShadow: isOpen ? "0 4px 20px rgba(2,206,55,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
                  borderColor: isOpen ? "rgba(2,206,55,0.2)" : "rgba(226,232,240,0.8)",
                  transitionDelay: `${i * 50}ms`
                }}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full text-left px-5 py-4 sm:px-6 sm:py-5 cursor-pointer"
                >
                  <span className={`text-[14px] sm:text-[15px] font-semibold leading-tight transition-colors duration-300 ${isOpen ? "text-[#02CE37]" : "text-[#0c111d] group-hover:text-[#02CE37]"}`}>
                    {item.question}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300"
                    style={{ 
                      backgroundColor: isOpen ? "rgba(2,206,55,0.1)" : "rgba(241,245,249,1)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  >
                    <svg
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                      stroke={isOpen ? "#02CE37" : "#64748b"} strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </button>

                {/* Answer — CSS Grid Trick for smooth expand */}
                <div 
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <div className="w-full h-px bg-slate-100 mb-4" />
                      <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
