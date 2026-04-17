"use client";

import React from "react";
import { 
  Target, 
  Users, 
  Award, 
  BarChart, 
  Cpu, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function NovaLandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-[#02CE37] selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/Marca_Principal.png" alt="Atingi Logo" className="h-6 md:h-8 object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#solucao" className="hover:text-[#02CE37] transition">Solução</a>
            <a href="#modulos" className="hover:text-[#02CE37] transition">Módulos</a>
            <a href="#planos" className="hover:text-[#02CE37] transition">Planos</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hidden md:block">Entrar</a>
            <a href="#planos" className="px-6 py-2.5 bg-[#111827] text-white text-sm font-semibold rounded-full hover:bg-black transition shadow-sm">Assinar</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-6 max-w-[1280px] mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-[80px] font-extrabold tracking-[-0.04em] text-[#111827] leading-[1.05] mb-8">
            Equipes engajadas <br/> com <span className="text-[#02CE37] relative inline-block">
              metas claras
              <span className="absolute bottom-2 left-0 w-full h-[25%] bg-[#BDF9B8] -z-10 rounded-full opacity-50"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Centralize o planejamento estratégico da sua empresa, acompanhe objetivos sem planilhas e engaje colaboradores com resultados e reconhecimento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#planos" className="px-8 py-4 bg-[#02CE37] hover:bg-[#02b330] text-white font-bold rounded-full text-lg transition flex items-center gap-3 shadow-xl shadow-[#02CE37]/20 hover:shadow-[#02CE37]/40 hover:-translate-y-0.5">
              Ver Planos e Valores <ArrowRight size={20} />
            </a>
            <a href="#solucao" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-full text-lg transition border border-gray-200 shadow-sm">
              Conheça a Plataforma
            </a>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-2">
            <div className="flex text-[#F59E0B] text-xl">★★★★★</div>
            <span className="text-sm text-gray-500 font-medium">4.9/5.0 de satisfação em centenas de empresas</span>
          </div>
        </motion.div>

        {/* HERO REAL MOCKUP - PRINT READY */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 max-w-6xl mx-auto relative group"
        >
          {/* Subtle Glow Behind Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#02CE37]/10 to-[#BDF9B8]/20 blur-3xl transform scale-90 -z-10"></div>
          
          <div className="relative rounded-[20px] md:rounded-[32px] overflow-hidden border border-gray-200/80 shadow-[0_30px_80px_rgba(0,0,0,0.08)] bg-white p-2 md:p-3">
              {/* O Dashboard Real do Atingi */}
              <img 
                src="/atingi-hero-dashboard.png" 
                alt="Dashboard Atingi" 
                className="w-full h-auto rounded-[12px] md:rounded-[20px] border border-gray-100" 
              />
          </div>
        </motion.div>
      </section>

      {/* SOCIAL PROOF - MARCAS REAIS */}
      <section className="py-16 md:py-20 border-b border-gray-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
           <p className="text-xs font-bold text-gray-400 mb-10 uppercase tracking-[0.2em]">Escalando resultados nas maiores empresas do Brasil</p>
           <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <img src="/marcas/ifood_logo_1.webp" alt="iFood" className="h-6 md:h-8 object-contain" />
             <img src="/marcas/mercado_livre_logo_1_2x-1-300x76.webp" alt="Mercado Livre" className="h-6 md:h-8 object-contain" />
             <img src="/marcas/spotify_logo_1_2x-1-300x90.webp" alt="Spotify" className="h-6 md:h-8 object-contain" />
             <img src="/marcas/airbnb_brasil_logo_1_2x-1-300x94.webp" alt="Airbnb" className="h-6 md:h-8 object-contain hidden sm:block" />
             <img src="/marcas/uber_2_1_2x-1.webp" alt="Uber" className="h-6 md:h-9 object-contain" />
             <img src="/marcas/shein_1_1_2x-1-300x62.webp" alt="Shein" className="h-5 md:h-7 object-contain hidden lg:block" />
           </div>
        </div>
      </section>

      {/* DIAGNÓSTICO E HUMANIZAÇÃO */}
      <section id="solucao" className="py-24 md:py-32 bg-[#FDFDFD]">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-[#02CE37] text-sm font-bold rounded-full mb-6 border border-green-100 tracking-wide">
               <Target size={16} /> O Paradigma Atingi
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6 tracking-tight leading-tight">
               O fim das planilhas <br/><span className="text-[#02CE37]">desconexas.</span>
             </h2>
             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
               Acabe com a confusão corporativa. O Atingi centraliza suas <strong className="text-gray-900 font-semibold">metas e indicadores</strong> em uma plataforma visual e poderosa. Pare de caçar informações e garanta alinhamento de 100% do time.
             </p>
             <ul className="space-y-5">
                {[
                  "Acabe com o desalinhamento operacional",
                  "Acompanhe o progresso sem cobrar ninguém",
                  "Reconheça a equipe com base em dados reais",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-800 font-semibold">
                    <CheckCircle2 className="text-[#02CE37] shrink-0" size={24}/>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
             </ul>
           </div>
           <div className="relative">
              <div className="aspect-[4/5] md:aspect-square bg-gray-50 rounded-[32px] overflow-hidden border border-gray-200 relative p-4 shadow-xl">
                 <img src="/mobile-user-hero.png" alt="Gestor Atingi" className="w-full h-full object-cover rounded-[24px]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[32px]"></div>
              </div>
           </div>
        </div>
      </section>

      {/* BENTO GRID - MÓDULOS REAIS */}
      <section id="modulos" className="py-32 bg-[#F9FAFB] border-y border-gray-100">
         <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-[56px] font-extrabold text-gray-900 mb-6 tracking-tight leading-none">Tudo integrado. <br/>Da meta ao prêmio.</h2>
              <p className="text-xl text-gray-600">Um ecossistema modular GitBook-style que converge a estratégia fria com a motivação pura da sua equipe.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               
               {/* 1. GAMIFICAÇÃO */}
               <div className="col-span-1 lg:col-span-2 bg-white rounded-[32px] border border-gray-200 p-8 pt-10 hover:shadow-[0_20px_40px_rgba(2,206,55,0.06)] transition-all duration-300 flex flex-col overflow-hidden group">
                  <div className="z-10 relative flex-1">
                    <div className="w-14 h-14 bg-green-50 text-[#02CE37] rounded-xl flex items-center justify-center mb-6 border border-green-100">
                      <Award size={28} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Gamificação com Metas</h3>
                    <p className="text-gray-500 text-lg max-w-xl mb-12 leading-relaxed">Ninguém quer perseguir um número vazio. Transforme o atingimento em um jogo onde todos ganham pontos e trocam por prêmios no seu catálogo.</p>
                  </div>
                  {/* High Fidelity Feature Webp */}
                  <div className="mx-auto w-full max-w-3xl translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                     <img src="/assets/feature-gamificacao.png" alt="Gamificação UI" className="w-full h-auto border border-gray-200 rounded-t-xl shadow-2xl object-cover object-top" />
                  </div>
               </div>

               {/* 2. GESTÃO DE OBJETIVOS */}
               <div className="bg-white rounded-[32px] border border-gray-200 p-8 pt-10 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col overflow-hidden group">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl flex items-center justify-center mb-6">
                     <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Gestão de Objetivos</h3>
                  <p className="text-gray-500 leading-relaxed mb-10">Conecte a liderança à última ponta operacional, criando cascatas visíveis.</p>
                  
                  <div className="mt-auto -mx-8 -mb-10 text-center flex justify-center group-hover:-translate-y-2 transition-transform duration-300">
                     <img src="/assets/feature-metas.png" alt="Metas UI" className="w-full object-cover max-h-48 border-t border-gray-100" />
                  </div>
               </div>

               {/* 3. CICLOS (Check-ins) */}
               <div className="bg-white rounded-[32px] border border-gray-200 p-8 pt-10 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col overflow-hidden group">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Ciclos Estratégicos</h3>
                  <p className="text-gray-500 leading-relaxed mb-10">Defina períodos bem delimitados para analisar o que deu certo na organização.</p>
                  
                  <div className="mt-auto -mx-8 -mb-10 text-center flex justify-center group-hover:-translate-y-2 transition-transform duration-300">
                     <img src="/assets/feature-checkins.png" alt="Checkins UI" className="w-full object-cover max-h-48 border-t border-gray-100" />
                  </div>
               </div>

               {/* 4. KPIs (Dashboard) */}
               <div className="bg-white rounded-[32px] border border-gray-200 p-8 pt-10 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col overflow-hidden group">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl flex items-center justify-center mb-6">
                     <BarChart size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Painel de KPIs</h3>
                  <p className="text-gray-500 leading-relaxed mb-10">Assuma a régua de dezenas de indicadores em gráficos exatos.</p>
                  
                  <div className="mt-auto -mx-8 -mb-10 text-center flex justify-center group-hover:-translate-y-2 transition-transform duration-300">
                     <img src="/assets/feature-dashboard.png" alt="Painel KPIs UI" className="w-full object-cover max-h-48 border-t border-gray-100" />
                  </div>
               </div>

               {/* 5 E 6: MAPA + IA */}
               <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* MAPA */}
                 <div className="bg-white rounded-[32px] border border-gray-200 p-8 pt-10 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl flex items-center justify-center mb-6">
                       <Users size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Mapa Estratégico</h3>
                    <p className="text-gray-500 leading-relaxed mb-10">Visualização completa sobre dependências e árvore de liderança inteira.</p>
                    
                    <div className="mt-auto -mx-4 -mb-10 flex justify-center group-hover:scale-105 transition-transform duration-500">
                       <img src="/assets/feature-okrs.png" alt="Árvore UI" className="w-[120%] max-w-none max-h-56 object-cover border-t border-gray-100 rounded-t-xl" />
                    </div>
                 </div>

                 {/* IA PREDICTIVE */}
                 <div className="bg-[#111827] rounded-[32px] p-8 pt-10 hover:shadow-2xl transition-all duration-300 text-white relative flex flex-col border border-gray-800 overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#02CE37] blur-[90px] opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                    <div className="w-12 h-12 bg-white/5 text-[#02CE37] rounded-xl flex items-center justify-center mb-6 border border-white/10 relative z-10">
                       <Cpu size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 relative z-10 tracking-tight">
                      Co-piloto IA 
                      <span className="bg-[#02CE37] text-[10px] font-extrabold px-2 py-0.5 rounded text-white tracking-widest uppercase">Inteligente</span>
                    </h3>
                    <p className="text-gray-400 mb-8 leading-relaxed relative z-10">Inteligência artificial capaz de sugerir métricas calibradas e identificar padrões de risco preventivamente.</p>
                    
                    {/* Alertas Mock UI */}
                    <div className="mt-auto relative z-10 w-full group-hover:-translate-y-2 transition-transform duration-500">
                       <img src="/assets/feature-alertas.png" alt="Alertas UI" className="w-full h-auto border border-gray-700/50 rounded-xl shadow-2xl opacity-90" />
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Escolha como acelerar</h2>
              <p className="text-xl text-gray-500">Comece alinhando sua equipe hoje mesmo com uma assinatura que escala junto com os seus lucros.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Inicial", desc: "Para times operacionais diretos.", users: 10, depto: 1 },
                { name: "Avançado", desc: "Aceleração total com a gamificação.", users: 15, depto: 2, popular: true },
                { name: "Global", desc: "Controle hierárquico avançado.", users: 20, depto: 5 }
              ].map((plan, i) => (
                 <div key={i} className={`p-8 md:p-10 rounded-[32px] border ${plan.popular ? 'border-[#02CE37] ring-4 ring-[#02CE37]/10 bg-white shadow-2xl relative md:-translate-y-4' : 'border-gray-200 bg-gray-50'} flex flex-col`}>
                    {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#02CE37] text-white text-xs font-extrabold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">O Mais Assinado</span>}
                    <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">{plan.name}</h3>
                    <p className="text-[15px] text-gray-500 mb-8 font-medium h-10">{plan.desc}</p>
                    <div className="h-px bg-gray-200 w-full mb-8"></div>
                    <ul className="space-y-5 mb-10 flex-1">
                       <li className="flex items-center gap-3 text-[16px] font-bold text-gray-800"><CheckCircle2 size={20} className="text-[#02CE37]" /> {plan.users} usuários</li>
                       <li className="flex items-center gap-3 text-[16px] font-bold text-gray-800"><CheckCircle2 size={20} className="text-[#02CE37]" /> {plan.depto} departamento</li>
                       <li className="flex items-center gap-3 text-[16px] font-medium text-gray-500"><CheckCircle2 size={20} className="text-gray-300" /> Objetivos Ilimitados</li>
                       <li className="flex items-center gap-3 text-[16px] font-medium text-gray-500"><CheckCircle2 size={20} className="text-gray-300" /> Mapas e Resgates</li>
                    </ul>
                    <button className={`w-full py-4 rounded-[16px] font-bold transition-all text-[16px] ${plan.popular ? 'bg-[#02CE37] text-white hover:bg-[#02b330] shadow-xl shadow-[#02CE37]/20 hover:scale-[1.02]' : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'}`}>Começar Teste</button>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <img src="/Marca_Principal.png" alt="Atingi Logo" className="h-6 grayscale opacity-80" />
           <p className="text-sm font-semibold text-gray-500">© 2026 Atingi. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
