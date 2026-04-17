"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Target, RefreshCw, BarChart, Map, Trophy,
  Search, Bell, MoreVertical, Wand2, Plus, LayoutGrid,
  List, Columns3, TrendingUp, TrendingDown, CheckCircle2,
  Clock, Menu, Home, Activity, FolderOpen, CheckSquare,
  ListTodo, Star, Gift, Medal, History, User, BookOpen,
  Users, MessageSquare, Calendar, Filter, ArrowUpDown, DollarSign, Zap, ChevronDown, MoreHorizontal, Settings2, ChevronUp, ArrowLeftRight
} from "lucide-react";

//================================================
// 1. MOCK DATA E ANIMAÇÕES COMUNS
//================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

//================================================
// 2. ABA 1: METAS DASHBOARD MOCK
//================================================

const mockMetas = [
  { id: 1, title: "Aumentar em 4.500 o volume de MQLs...", status: "Em Aberto", meta: "1º Trimestre 2026", team: "Marketing", progressType: "crescimento", progressLabel: "2.500 / 4.500", percentage: 56, avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara Campos", timeAgo: "há 2 minutos", statusBadge: "em dia" },
  { id: 2, title: "Aumentar a Automação de...", status: "Em Aberto", meta: "Ano 2026", team: "", progressType: "crescimento", progressLabel: "4,0% / 30,0%", percentage: 0, avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara Campos", timeAgo: "cerca de 19 horas", statusBadge: "em dia" },
  { id: 3, title: "Aumentar receita por colaborador e...", status: "Em Aberto", meta: "Ano 2026", team: "", progressType: "crescimento", progressLabel: "R$ 4.350,00 / R$ 15.500,00", percentage: 0, avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara Campos", timeAgo: "cerca de 19 horas", statusBadge: "em dia" },
  { id: 4, title: "Atingir eNPS ≥ 75", status: "Em Aberto", meta: "Ano 2026", team: "", progressType: "crescimento", progressLabel: "70,0% / 75,0%", percentage: 81, avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara Campos", timeAgo: "há 3 minutos", statusBadge: "em dia" },
  { id: 5, title: "Reduzir turnover voluntário em 15%", status: "Em Aberto", meta: "Ano 2026", team: "", progressType: "reducao", progressLabel: "25,0% / 15,0%", percentage: 17, progressColor: "bg-amber-400", avatar: "https://i.pravatar.cc/100?img=11", assignee: "Roberto Cordeiro", timeAgo: "há 3 minutos", statusBadge: "em dia" },
  { id: 6, title: "Reduzir o CAC para R$ 1.400,00", status: "Em Aberto", meta: "Ano 2026", team: "", progressType: "reducao", progressLabel: "R$ 2.600,00 / R$ 1.400,00", percentage: 0, avatar: "https://i.pravatar.cc/100?img=9", assignee: "Alice Castro", timeAgo: "há 3 minutos", statusBadge: "em dia" },
];

function MetasDashboardMock() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col md:flex-row h-full w-full bg-[#f9fafb] text-left antialiased font-sans"
    >
      <motion.div variants={itemVariants} className="hidden md:flex w-[240px] bg-white border-r border-gray-100 flex-col h-full shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-gray-50 bg-white sticky top-0 shrink-0">
          <div className="flex items-center gap-2 font-bold text-[#111827]">
            <div className="w-6 h-6 bg-[#02CE37] rounded flex items-center justify-center text-white text-xs">
              <Star className="w-3 h-3" />
            </div>
            <span>Atingi</span>
            <span className="text-gray-400 text-[10px] ml-1">▼</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <div className="flex items-center gap-3 px-2 py-1.5 mb-6 hover:bg-gray-50 rounded-md cursor-pointer">
            <img src="https://i.pravatar.cc/100?img=3" alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
            <div className="flex-1 whitespace-nowrap">
              <div className="text-[13px] font-semibold text-gray-800">Meu Painel</div>
            </div>
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-6">
            <div>
              <div className="px-2 text-[10px] font-bold text-gray-400 tracking-wider mb-2">VISÃO GERAL</div>
              <div className="space-y-0.5">
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-600 font-medium hover:bg-gray-50 rounded-md"><Home className="w-4 h-4 text-gray-400" /> Dashboard</button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-600 font-medium hover:bg-gray-50 rounded-md"><Activity className="w-4 h-4 text-gray-400" /> Atividades</button>
              </div>
            </div>
            <div>
              <div className="px-2 text-[10px] font-bold text-gray-400 tracking-wider mb-2">MINHAS METAS</div>
              <div className="space-y-0.5">
                <button className="w-full flex items-center justify-between px-2 py-1.5 text-[13px] text-gray-600 font-medium hover:bg-gray-50 rounded-md"><span className="flex items-center gap-3"><FolderOpen className="w-4 h-4 text-gray-400" /> Em Aberto</span></button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-600 font-medium hover:bg-gray-50 rounded-md"><CheckSquare className="w-4 h-4 text-gray-400" /> Finalizadas</button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-[#02CE37] font-semibold bg-[#E8F8EE] rounded-md"><ListTodo className="w-4 h-4 text-[#02CE37]" /> Todos</button>
              </div>
            </div>
            <div>
              <div className="px-2 text-[10px] font-bold text-gray-400 tracking-wider mb-2">MINHAS PREMIAÇÕES</div>
              <div className="space-y-0.5">
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-500 font-medium hover:bg-gray-50 rounded-md"><Star className="w-4 h-4 text-gray-400" /> Pontuação</button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-500 font-medium hover:bg-gray-50 rounded-md"><Gift className="w-4 h-4 text-gray-400" /> Recompensas</button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-500 font-medium hover:bg-gray-50 rounded-md"><Medal className="w-4 h-4 text-gray-400" /> Conquistas</button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-500 font-medium hover:bg-gray-50 rounded-md"><Trophy className="w-4 h-4 text-gray-400" /> Ranking</button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-500 font-medium hover:bg-gray-50 rounded-md"><History className="w-4 h-4 text-gray-400" /> Histórico</button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-100 bg-white space-y-1 shrink-0">
          <button className="w-full flex items-center justify-between px-2 py-2 text-[13px] text-gray-600 font-medium hover:bg-gray-50 rounded-md">
            Check-ins Pendentes
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </button>
          <button className="w-full flex items-center gap-2 mt-2 px-3 py-2 text-[12px] font-semibold text-[#02CE37] bg-[#E8F8EE] rounded-md justify-center border border-[#02CE37]/20 transition-colors">
            <Clock className="w-3 h-3" /> Teste grátis: 12 dias
          </button>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col min-w-0 bg-white relative h-full">
        <motion.header variants={itemVariants} className="h-14 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 bg-white sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-gray-400 md:hidden" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center relative w-48 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input type="text" placeholder="Buscar metas, objetivos..." className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-[13px] focus:outline-none" />
            </div>
            <div className="w-px h-5 bg-gray-200 hidden sm:block"></div>
            <button className="text-gray-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute 0 right-0 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
            </button>
            <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-7 h-7 rounded-full border border-gray-200" />
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          <div className="max-w-[1200px] mx-auto space-y-6">
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3 mb-2 md:mb-4">
                  <h1 className="text-[24px] md:text-[28px] font-extrabold text-[#111827] tracking-tight">Metas</h1>
                  <span className="text-gray-400 text-sm font-medium">Ano 2026</span>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-sm font-semibold text-gray-800">17 <span className="text-gray-400 font-medium">Total</span></div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#02CE37]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#02CE37]"></div>
                    17 <span className="text-gray-400 font-medium">Em Aberto</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-md text-[13px] hover:bg-gray-50 shadow-sm transition-colors"><Wand2 className="w-4 h-4 text-[#02CE37]" /> Gerar com IA</button>
                <div className="flex flex-1 sm:flex-none">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-[#02CE37] text-white font-bold rounded-l-md text-[13px] hover:bg-[#01A82D] transition-colors shadow-sm"><Plus className="w-4 h-4" /> Nova Meta</button>
                  <button className="px-2 py-2 bg-[#02CE37] text-white rounded-r-md border-l border-[#01A82D] hover:bg-[#01A82D] transition-colors shadow-sm">▼</button>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <div className="flex justify-end mb-1">
                <span className="text-[13px] font-bold text-gray-800">0% <span className="text-gray-500 font-medium">concluído</span></span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[2%]"></div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="px-1 border-b border-gray-200 overflow-x-auto whitespace-nowrap custom-scrollbar">
              <div className="flex gap-6 text-[14px] font-semibold min-w-max">
                <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 transition-colors"><List className="w-4 h-4" /> Lista</button>
                <button className="flex items-center gap-2 pb-3 text-[#02CE37] border-b-2 border-[#02CE37]"><LayoutGrid className="w-4 h-4" /> Cards</button>
                <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 transition-colors"><Columns3 className="w-4 h-4" /> Board</button>
              </div>
            </motion.div>
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {mockMetas.map((card) => (
                <motion.div key={card.id} variants={itemVariants} className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-[#111827] text-[14px] md:text-[15px] leading-snug pr-6">{card.title}</h3>
                    <button className="text-gray-400 hover:text-gray-600 absolute right-4 top-4"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold"><Clock className="w-3 h-3" /> {card.status}</span>
                  </div>
                  <div className="text-[12px] text-gray-500 mb-5 font-medium truncate">
                    {card.meta} {card.team && <span className="text-gray-400">· {card.team}</span>}
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                       <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-gray-500 truncate">
                         {card.progressType === "crescimento" ? <TrendingUp className="w-3.5 h-3.5 text-blue-500 shrink-0" /> : <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                         <span className="uppercase tracking-wider">{card.progressType === "crescimento" ? "Cresc" : "Reduc"}</span>
                         <span className="text-gray-800 ml-1 truncate">{card.progressLabel}</span>
                       </div>
                       <span className="text-[14px] font-extrabold text-[#111827] pl-2">{card.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className={`h-full rounded-full ${card.progressColor || (card.percentage > 0 ? "bg-blue-500" : "bg-transparent")}`} style={{ width: `${Math.max(card.percentage, 0)}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
                    <div className="flex items-center gap-2">
                      <img src={card.avatar} alt={card.assignee} className="w-6 h-6 rounded-full border border-gray-200 shrink-0" />
                      <div className="text-[10px] md:text-[11px] truncate">
                        <span className="font-semibold text-gray-700">{card.assignee}</span>
                        <span className="text-gray-400 ml-1 hidden sm:inline">{card.timeAgo}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F8EE] border border-[#02CE37]/20 text-[#02CE37] text-[10px] font-bold uppercase tracking-wider shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> {card.statusBadge}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-center pt-2 pb-8">
              <button className="text-[13px] font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1"><BarChart className="w-4 h-4" /> Ver Analytics <span className="text-[10px]">▼</span></button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

//================================================
// 3. ABA 2: OBJETIVOS DASHBOARD MOCK
//================================================

const mockObjetivos = [
  { id: 1, title: "Aumentar a Receita para 20 Milhões no ano", iconType: "dollar", progress: 0, metas: 4, priority: "Alta", status: "Em Aberto", date: "Ano 2026", avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara" },
  { id: 2, title: "Gerar demanda qualificada com eficiência crescente", iconType: "trend", progress: 0, metas: 1, priority: "Média", status: "Em Aberto", date: "1º Trimestre 2026", avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara" },
  { id: 3, title: "Aumentar Capacidade Operacional", iconType: "lightning", progress: 0, metas: 2, priority: "Média", status: "Em Aberto", date: "Ano 2026", avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara" },
  { id: 4, title: "Construir uma organização de alta performance e engajamento", iconType: "lightning", progress: 0, metas: 2, priority: "Média", status: "Em Aberto", date: "Ano 2026", avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara" },
  { id: 5, title: "Aumentar a lucratividade", iconType: "dollar", progress: 0, metas: 2, priority: "Média", status: "Em Aberto", date: "Ano 2026", avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara" },
  { id: 6, title: "Atingir 2.000 clientes", iconType: "chart", progress: 0, metas: 4, priority: "Média", status: "Em Aberto", date: "Ano 2026", avatar: "https://i.pravatar.cc/100?img=5", assignee: "Lara" },
];

function ObjetivosDashboardMock() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col h-full w-full bg-[#f9fafb] text-left antialiased font-sans"
    >
      {/* Global Top Bar */}
      <motion.header variants={itemVariants} className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-2 font-bold text-[#111827]">
          <div className="w-6 h-6 bg-[#02CE37] rounded flex items-center justify-center text-white text-[10px] font-black">a</div>
          <span className="text-[14px]">Atingi</span>
          <span className="text-gray-400 text-[8px] ml-0.5">▼</span>
        </div>
        <div className="flex-1 flex justify-center px-4">
          <div className="hidden sm:flex items-center relative w-full max-w-lg">
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <input type="text" placeholder="Buscar metas, objetivos..." className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-8 py-1.5 text-[13px] focus:outline-none" />
            <div className="absolute right-2 flex items-center gap-1">
              <span className="text-[10px] bg-white border border-gray-200 text-gray-400 font-mono px-1 rounded shadow-sm">⌘</span>
              <span className="text-[10px] bg-white border border-gray-200 text-gray-400 font-mono px-1 rounded shadow-sm">K</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute 0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-7 h-7 rounded-full object-cover" />
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* Thin Left Sidebar */}
        <motion.div variants={itemVariants} className="hidden md:flex w-[60px] bg-[#f9fafb] border-r border-gray-200 flex-col items-center py-4 shrink-0 justify-between">
          <div className="space-y-3 w-full flex flex-col items-center">
            <button className="w-9 h-9 rounded-full text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"><User className="w-5 h-5" /></button>
            <button className="w-9 h-9 rounded-lg bg-[#02CE37] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(2,206,55,0.3)] transition-colors"><BookOpen className="w-5 h-5" /></button>
            <button className="w-9 h-9 rounded-full text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"><LayoutGrid className="w-5 h-5" /></button>
            <button className="w-9 h-9 rounded-full text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"><Users className="w-5 h-5" /></button>
            <button className="w-9 h-9 rounded-full text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"><MessageSquare className="w-5 h-5" /></button>
          </div>
          <div className="px-2 w-full mt-auto">
             <div className="text-[10px] text-[#02CE37] text-center font-bold bg-[#E8F8EE] rounded py-1.5 border border-[#02CE37]/20 flex flex-col items-center justify-center hover:bg-[#dcf4e5] cursor-pointer transition-colors shadow-sm">
               <Clock className="w-3.5 h-3.5 mb-0.5" />
               12 d
             </div>
          </div>
        </motion.div>

        {/* Secondary Sidebar */}
        <motion.div variants={itemVariants} className="hidden lg:flex w-[240px] bg-white border-r border-gray-100 flex-col shrink-0 relative">
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50 h-14 shrink-0">
             <div className="flex items-center gap-2 font-bold text-[#111827] text-[14px]">
               <div className="w-6 h-6 bg-[#C4F1D4] text-[#02CE37] rounded flex items-center justify-center"><Target className="w-3.5 h-3.5" /></div>
               Estratégico
             </div>
             <div className="flex gap-2 text-gray-400 font-mono">
               <span className="text-[14px] cursor-pointer hover:text-gray-800 leading-none">+-</span>
               <span className="text-[14px] cursor-pointer hover:text-gray-800 leading-none">«</span>
             </div>
          </div>
          <div className="flex-1 overflow-y-auto py-5 custom-scrollbar">
            {/* VISÃO GERAL */}
            <div className="mb-7">
              <div className="px-5 text-[10px] font-bold text-gray-400 tracking-wider mb-2">VISÃO GERAL</div>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><LayoutGrid className="w-4 h-4"/> Dashboard</button>
            </div>
            {/* PLANO ESTRATÉGICO */}
            <div className="mb-7">
              <div className="px-5 text-[10px] font-bold text-gray-400 tracking-wider mb-2">PLANO ESTRATÉGICO</div>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><Map className="w-4 h-4"/> Mapa Estratégico</button>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-[#02CE37] font-semibold bg-[#E8F8EE] border-l-[3px] border-[#02CE37]"><Target className="w-4 h-4"/> Objetivos da Empresa</button>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><RefreshCw className="w-4 h-4"/> Alinhamento</button>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><Calendar className="w-4 h-4"/> Cronograma</button>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><BarChart className="w-4 h-4"/> Indicadores</button>
            </div>
            {/* EXECUÇÃO */}
            <div>
              <div className="px-5 text-[10px] font-bold text-gray-400 tracking-wider mb-2">EXECUÇÃO</div>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><LayoutGrid className="w-4 h-4"/> Visão das Áreas</button>
              <button className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-gray-500 font-medium hover:bg-gray-50"><Users className="w-4 h-4"/> Pessoas</button>
            </div>
          </div>
          <div className="p-4 border-t border-gray-50 bg-white">
             <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] font-semibold text-[#02CE37] bg-[#E8F8EE] rounded-md justify-center border border-[#02CE37]/20 transition-colors hover:bg-[#dcf4e5]">
               <Clock className="w-3.5 h-3.5" /> Teste gratis: 12 dia...
             </button>
          </div>
        </motion.div>

        {/* Main Content Dashboard */}
        <div className="flex-1 overflow-y-auto bg-white p-4 md:p-8 custom-scrollbar relative">
          <div className="max-w-[1100px] mx-auto space-y-6">
            
            {/* Header Title */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-2">
              <div>
                <h1 className="text-[26px] md:text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Portfolio de Objetivos</h1>
                <p className="text-gray-500 text-[14px] mt-1">Gerencie seus Objetivos e Metas</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                  Todos os cicl <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#02CE37] text-white rounded-md text-[13px] font-bold shadow-[0_2px_8px_rgba(2,206,55,0.25)] hover:bg-[#01A82D] transition-colors w-full sm:w-auto">
                  <Plus className="w-4 h-4"/> Novo Objetivo
                </button>
              </div>
            </motion.div>

            {/* View Toggles */}
            <motion.div variants={itemVariants} className="border-b border-gray-100 flex items-center justify-start w-full">
              <div className="flex gap-6 text-[14px] font-semibold">
                 <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 border-b-2 border-transparent transition-colors"><List className="w-4 h-4"/> Lista</button>
                 <button className="flex items-center gap-2 pb-3 text-[#02CE37] border-b-[3px] border-[#02CE37]"><LayoutGrid className="w-4 h-4"/> Cards</button>
                 <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 border-b-2 border-transparent transition-colors"><FolderOpen className="w-4 h-4"/> Cascata</button>
              </div>
            </motion.div>

            {/* Secondary Search & Filter Bar */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-[360px]">
                 <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="Buscar objetivos..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-[#02CE37] hover:border-gray-300 transition-colors shadow-sm" />
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                 <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"><Filter className="w-4 h-4"/> Filtrar</button>
                 <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"><ArrowUpDown className="w-4 h-4"/> Ordenar</button>
                 <span className="text-gray-400 text-[13px] font-medium hidden sm:block ml-1">7 itens</span>
              </div>
            </motion.div>

            {/* Cards Grid Objetivos */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {mockObjetivos.map((obj) => (
                <motion.div key={obj.id} variants={itemVariants} className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative grid grid-rows-[auto_1fr_auto]">
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-md shadow-sm flex items-center justify-center shrink-0 ${
                      obj.iconType === "dollar" ? "bg-[#E8F8EE] text-[#02CE37]" :
                      obj.iconType === "trend" ? "bg-blue-50 text-blue-500" :
                      obj.iconType === "chart" ? "bg-blue-50 text-blue-500" :
                      "bg-amber-50 text-amber-500"
                    }`}>
                      {obj.iconType === "dollar" && <DollarSign className="w-5 h-5" />}
                      {obj.iconType === "trend" && <TrendingUp className="w-5 h-5" />}
                      {obj.iconType === "lightning" && <Zap className="w-5 h-5" />}
                      {obj.iconType === "chart" && <Activity className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] text-[15px] leading-snug">{obj.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold">{obj.status}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          obj.priority === "Alta" ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
                        }`}>{obj.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-[12px] font-medium text-gray-500">{obj.metas} metas</span>
                       <span className="text-[13px] font-extrabold text-[#111827]">{obj.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8F8EE] rounded-full overflow-hidden relative">
                       {/* Efeito visual da barra */}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <img src={obj.avatar} alt={obj.assignee} className="w-5 h-5 rounded-full" />
                      <span className="text-[12px] font-medium text-gray-600">{obj.assignee}</span>
                    </div>
                    <div className="text-[11px] font-medium text-gray-400">
                      {obj.date}
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-center pt-2 pb-8">
              <button className="text-[13px] font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1">
                 Ver mais 1 itens <ChevronDown className="w-3 h-3" />
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-[13px] font-bold text-gray-800 flex items-center gap-1 pt-4">
               ▸ Analytics
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

//================================================
// 3. ABA 3: CICLOS DASHBOARD MOCK
//================================================

const mockCiclos = [
  { id: 1, title: "Ano 2026", desc: "Ciclo anual para planejamento estratégico de longo prazo", type: "Personalizado", typeBg: "bg-gray-100 text-gray-600 border border-gray-200", period: "mar 2026 - mar 2027", progress: 0, metas: 5 },
  { id: 2, title: "Mensal", desc: "Ciclo mensal para acompanhamento de metas", type: "Mensal", typeBg: "bg-cyan-50 text-cyan-500 border border-cyan-100", period: "fev - mar 2026", progress: 0, metas: 4 },
  { id: 3, title: "Semestre 1 2026", desc: "Ciclo semestral para projetos de médio prazo", type: "Semestral", typeBg: "bg-green-50 text-green-500 border border-green-100", period: "fev - ago 2026", progress: 0, metas: 12 },
  { id: 4, title: "Bimestre 1 2026", desc: "Ciclo bimestral para projetos de curto-médio prazo", type: "Bimestral", typeBg: "bg-teal-50 text-teal-500 border border-teal-100", period: "fev - abr 2026", progress: 0, metas: 1 },
  { id: 5, title: "Semana 7 2026", desc: "Ciclo semanal para sprints e entregas rápidas", type: "Semanal", typeBg: "bg-blue-50 text-blue-500 border border-blue-100", period: "fev - fev 2026", progress: 0, metas: 4 },
  { id: 6, title: "Trimestral", desc: "Sem descrição", type: "Trimestral", typeBg: "bg-cyan-50 text-cyan-500 border border-cyan-100", period: "jan - abr 2026", progress: 0, metas: 0 },
];

function CiclosDashboardMock() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col h-full w-full bg-white text-left antialiased font-sans"
    >
      <div className="flex-1 overflow-y-auto px-4 md:px-8 custom-scrollbar">
        <div className="max-w-[1100px] mx-auto py-6 md:py-8 space-y-6">
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-[26px] md:text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Ciclos</h1>
              <p className="text-gray-500 text-[14px]">Gerencie os ciclos da plataforma</p>
            </div>
            <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#02CE37] text-white rounded-md text-[13px] font-bold shadow-[0_2px_8px_rgba(2,206,55,0.25)] hover:bg-[#01A82D] transition-colors w-full sm:w-auto">
              <Plus className="w-4 h-4"/> Novo Ciclo
            </button>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {/* Total */}
             <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
               <span className="text-[12px] font-semibold text-gray-500 mb-2">Total de Ciclos</span>
               <div className="flex justify-between items-end mt-1">
                 <div>
                   <div className="text-[28px] font-extrabold text-black leading-none">7</div>
                   <div className="text-[12px] text-gray-500 mt-2 font-medium">+7 este ano</div>
                 </div>
                 <div className="w-10 h-10 rounded-xl border border-gray-100 text-gray-600 flex items-center justify-center"><Calendar className="w-5 h-5"/></div>
               </div>
             </motion.div>
             {/* Ativos */}
             <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
               <span className="text-[12px] font-semibold text-gray-500 mb-2">Ciclos Ativos</span>
               <div className="flex justify-between items-end mt-1">
                 <div>
                   <div className="text-[28px] font-extrabold text-black leading-none">7</div>
                   <div className="text-[12px] text-gray-500 mt-2 font-medium">Em andamento</div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] text-[#02CE37] flex items-center justify-center"><TrendingUp className="w-5 h-5"/></div>
               </div>
             </motion.div>
             {/* Metas */}
             <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
               <span className="text-[12px] font-semibold text-gray-500 mb-2">Metas Vinculadas</span>
               <div className="flex justify-between items-end mt-1">
                 <div>
                   <div className="text-[28px] font-extrabold text-black leading-none">32</div>
                   <div className="text-[12px] text-gray-500 mt-2 font-medium">32 ativas</div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><Target className="w-5 h-5"/></div>
               </div>
             </motion.div>
             {/* Conclusão */}
             <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
               <span className="text-[12px] font-semibold text-gray-500 mb-2">Taxa de Conclusão</span>
               <div className="flex justify-between items-end mt-1">
                 <div>
                   <div className="text-[28px] font-extrabold text-black leading-none">0%</div>
                   <div className="text-[12px] text-gray-500 mt-2 font-medium">0/7 concluídos</div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-400 flex items-center justify-center"><CheckCircle2 className="w-5 h-5"/></div>
               </div>
             </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6">
            <div className="border-b border-gray-100 px-5 pt-3 flex items-center gap-6 overflow-x-auto whitespace-nowrap custom-scrollbar">
              <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 text-[13px] font-semibold transition-colors"><List className="w-4 h-4"/> Lista</button>
              <button className="flex items-center gap-2 pb-3 text-[#02CE37] border-b-[3px] border-[#02CE37] text-[13px] font-semibold"><LayoutGrid className="w-4 h-4"/> Cards</button>
              <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 text-[13px] font-semibold border-b-[3px] border-transparent transition-colors"><Columns3 className="w-4 h-4"/> Board</button>
              <button className="flex items-center gap-2 pb-3 text-gray-400 hover:text-gray-600 text-[13px] font-semibold border-b-[3px] border-transparent transition-colors"><Menu className="w-4 h-4"/> Timeline</button>
            </div>
            <div className="p-4 md:px-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-gray-50/30">
              <div className="relative w-full sm:w-[320px]">
                 <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="Buscar ciclos..." className="w-full pl-9 pr-3 py-2 border border-gray-200 bg-white rounded-full text-[13px] hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#02CE37]" />
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                 <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-[13px] font-semibold transition-colors"><Filter className="w-3.5 h-3.5"/> Filtrar</button>
                 <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-[13px] font-semibold transition-colors"><ArrowUpDown className="w-3.5 h-3.5"/> Ordenar</button>
                 <span className="flex items-center text-gray-400 text-[13px] ml-1 font-medium">7 itens</span>
              </div>
            </div>
            
            <div className="p-4 md:p-5">
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {mockCiclos.map(ciclo => (
                  <motion.div key={ciclo.id} variants={itemVariants} className="bg-[#fbfcff] border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow relative">
                     <div className="flex items-center gap-2 mb-4">
                       <span className="px-2 py-0.5 rounded border border-gray-200 bg-white text-[11px] font-bold text-gray-700 shadow-sm">Em Andamento</span>
                       <span className={`px-2 py-0.5 rounded text-[11px] font-bold shadow-sm ${ciclo.typeBg}`}>{ciclo.type}</span>
                     </div>
                     <h3 className="text-[15px] font-bold text-black mb-1">{ciclo.title}</h3>
                     <p className="text-[12px] font-medium text-gray-500 mb-5 leading-relaxed pr-2 h-[36px]">{ciclo.desc}</p>
                     
                     <div className="flex justify-between items-center text-[12px] mb-2 font-medium">
                       <span className="text-gray-400">Período:</span>
                       <span className="text-[#111827]">{ciclo.period}</span>
                     </div>
                     <div className="flex justify-between items-center text-[12px] mb-1.5 font-medium">
                       <span className="text-gray-400">Progresso</span>
                       <span className="text-black font-extrabold">{ciclo.progress}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-200 rounded-full mb-4"></div>
                     
                     <div className="flex items-center gap-2 text-[12px] text-gray-600 font-semibold border-t border-gray-100 pt-3">
                       <Target className="w-4 h-4 text-gray-400"/> {ciclo.metas} metas
                     </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

//================================================
// 4. ABA 4: KPIS DASHBOARD MOCK
//================================================

const mockKpis = [
  { id: 1, nome: "Clientes", unidade: "Quantidade", status: "Ativo", uso: 6, data: "19 mar 2026", icon: Users },
  { id: 2, nome: "Receita", unidade: "Moeda (R$)", status: "Ativo", uso: 5, data: "19 mar 2026", icon: DollarSign },
  { id: 3, nome: "NPS (Net Promoter Score)", unidade: "Quantidade", status: "Ativo", uso: 2, data: "19 mar 2026", icon: Star },
  { id: 4, nome: "Tempo Médio Resposta", unidade: "Quantidade", status: "Ativo", uso: 2, data: "19 mar 2026", icon: Clock },
  { id: 5, nome: "Margem EBITDA", unidade: "Percentual", status: "Ativo", uso: 1, data: "19 mar 2026", icon: TrendingUp },
  { id: 6, nome: "CAC (Custo de Aquisição de Cliente)", unidade: "Moeda (R$)", status: "Ativo", uso: 1, data: "19 mar 2026", icon: Target },
  { id: 7, nome: "Taxa de Turnover", unidade: "Percentual", status: "Ativo", uso: 1, data: "19 mar 2026", icon: Users },
  { id: 8, nome: "eNPS", unidade: "Percentual", status: "Ativo", uso: 1, data: "19 mar 2026", icon: Activity },
  { id: 9, nome: "Receita por Colaborador", unidade: "Moeda (R$)", status: "Ativo", uso: 1, data: "19 mar 2026", icon: DollarSign },
  { id: 10, nome: "Taxa de Processamento", unidade: "Percentual", status: "Ativo", uso: 1, data: "19 mar 2026", icon: Zap },
];

function KpisDashboardMock() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col h-full w-full bg-white text-left antialiased font-sans"
    >
      <div className="flex-1 overflow-y-auto px-4 md:px-8 custom-scrollbar">
        <div className="max-w-[1100px] mx-auto py-6 md:py-8 space-y-6">
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-[26px] md:text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">Biblioteca de Indicadores</h1>
              <p className="text-gray-500 text-[14px]">Gerencie indicadores de performance reutilizáveis</p>
            </div>
            <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#02CE37] text-white rounded-md text-[13px] font-bold shadow-[0_2px_8px_rgba(2,206,55,0.25)] hover:bg-[#01A82D] transition-colors w-full sm:w-auto">
              <Plus className="w-4 h-4"/> Novo Indicador
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 border-b border-gray-100">
            <button className="pb-3 px-1 text-[#02CE37] border-b-[3px] border-[#02CE37] text-[14px] font-bold transition-colors">Meus Indicadores</button>
            <button className="pb-3 px-1 text-gray-400 hover:text-gray-600 font-semibold text-[14px] transition-colors border-b-[3px] border-transparent">Templates</button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-1">
             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-[280px]">
                   <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                   <input type="text" placeholder="Buscar indicadores..." className="w-full pl-9 pr-3 py-2 border border-gray-200 bg-white rounded-md text-[13px] hover:border-gray-300 focus:outline-none transition-colors" />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto [scrollbar-width:none]">
                   <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-[13px] font-semibold text-gray-700 transition-colors"><Filter className="w-3.5 h-3.5"/> Filtrar</button>
                   <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-[13px] font-semibold text-gray-700 transition-colors"><ArrowUpDown className="w-3.5 h-3.5"/> Ordenar</button>
                   <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-[13px] font-semibold text-gray-700 transition-colors"><LayoutGrid className="w-3.5 h-3.5"/> Agrupar</button>
                   <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-[13px] font-semibold text-gray-700 transition-colors"><Settings2 className="w-3.5 h-3.5"/> Opções</button>
                </div>
             </div>
             <span className="text-gray-400 text-[13px] font-medium shrink-0">11 indicadores</span>
          </motion.div>

          <motion.div variants={containerVariants} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mt-4">
             <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-left min-w-[900px]">
                 <thead>
                   <tr className="border-b border-gray-100 bg-[#fafbfc]">
                     <th className="py-3.5 px-5 text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[40%]">Nome</th>
                     <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Unidade</th>
                     <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                     <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Uso</th>
                     <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Criação</th>
                     <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[60px]"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {mockKpis.map((kpi, idx) => (
                     <motion.tr variants={itemVariants} key={kpi.id} className={`group hover:bg-gray-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#fafbfc]/30'}`}>
                       <td className="py-3.5 px-5">
                         <div className="flex items-center gap-3">
                           <div className="w-7 h-7 rounded-full bg-[#E8F8EE] text-[#02CE37] flex items-center justify-center shrink-0">
                             <kpi.icon className="w-3.5 h-3.5 opacity-80" />
                           </div>
                           <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#02CE37] transition-colors">{kpi.nome}</span>
                         </div>
                       </td>
                       <td className="py-3.5 px-4">
                         <span className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-md shadow-sm">{kpi.unidade}</span>
                       </td>
                       <td className="py-3.5 px-4">
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F8EE]/70 text-[#02CE37] text-[11px] font-bold">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#02CE37]"></span> {kpi.status}
                         </span>
                       </td>
                       <td className="py-3.5 px-4 text-[13px] font-semibold text-gray-600 flex items-center gap-1">
                         <span className="text-gray-400 font-medium">@</span> {kpi.uso}
                       </td>
                       <td className="py-3.5 px-4 text-[12px] font-medium text-gray-500">
                         {kpi.data}
                       </td>
                       <td className="py-3.5 px-4 text-right">
                         <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                           <MoreHorizontal className="w-4 h-4" />
                         </button>
                       </td>
                     </motion.tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

//================================================
// 5. ABA 5: MAPA DASHBOARD MOCK
//================================================

function TreeConnection({ w, delay1 = "0s", delay2 = "2s", height = 48 }: { w: number, delay1?: string, delay2?: string, height?: number }) {
   return (
     <div className="relative w-full flex justify-center z-0" style={{ height }}>
        <svg className="absolute overflow-visible pointer-events-none drop-shadow-sm" style={{ width: w, height }} viewBox={`0 0 ${w} ${height}`}>
           <path d={`M ${w/2} 0 L ${w/2} ${height/2} L 0 ${height/2} L 0 ${height}`} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinejoin="round" />
           <path d={`M ${w/2} 0 L ${w/2} ${height/2} L ${w} ${height/2} L ${w} ${height}`} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinejoin="round" />
           
           <circle r="4" fill="#02CE37" className="drop-shadow-[0_0_6px_rgba(2,206,55,0.8)]">
             <animateMotion dur="4s" repeatCount="indefinite" begin={delay1} path={`M ${w/2} 0 L ${w/2} ${height/2} L 0 ${height/2} L 0 ${height}`} />
           </circle>
           <circle r="4" fill="#02CE37" className="drop-shadow-[0_0_6px_rgba(2,206,55,0.8)]">
             <animateMotion dur="4s" repeatCount="indefinite" begin={delay2} path={`M ${w/2} 0 L ${w/2} ${height/2} L ${w} ${height/2} L ${w} ${height}`} />
           </circle>
        </svg>
     </div>
   )
}

function MapaDashboardMock() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col h-full w-full bg-white text-left antialiased font-sans relative"
    >
      {/* Background Canvas Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none bg-[#FAFAFA]" style={{ backgroundImage: 'radial-gradient(#94A3B8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Header Fixo Interno */}
      <motion.div variants={itemVariants} className="w-full flex justify-between items-center sticky left-0 right-0 top-0 max-w-full bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 shadow-sm z-30">
        <div>
          <h1 className="text-[20px] font-extrabold text-[#111827]">Mapa Estratégico</h1>
        </div>
        <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center justify-center px-4 py-1.5 border border-gray-200 bg-white rounded-lg text-[13px] font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors gap-2"><List className="w-4 h-4 text-gray-500"/> Todos os ciclos</button>
            <div className="hidden sm:block h-6 w-[1px] bg-gray-200 mx-1"></div>
            <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-200 transition-colors">Expandir</button>
        </div>
      </motion.div>

      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar relative z-10 scroll-smooth cursor-grab active:cursor-grabbing pb-12 pt-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        <div className="w-max mx-auto px-12 md:px-24 pb-8 flex flex-col items-center">
             
            {/* L1: ESTRATÉGICO */}
            <motion.div variants={itemVariants} className="bg-white border-[3px] border-purple-100 rounded-2xl p-6 shadow-xl shadow-purple-900/5 w-[340px] z-10 flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform">
               <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[12px] font-black uppercase tracking-widest mb-4 shadow-sm">Estratégico</div>
               <h3 className="text-[18px] font-extrabold text-gray-900 mb-6 drop-shadow-sm">Dominar Mercado SaaS Latam 2026</h3>
               <div className="w-full h-2 bg-gray-100 rounded-full mb-2 overflow-hidden shadow-inner relative">
                   <motion.div initial={{ width: 0 }} animate={{ width: '56%' }} transition={{ duration: 1, delay: 0.2 }} className="absolute left-0 h-full bg-purple-500 rounded-full"></motion.div>
               </div>
               <div className="text-[15px] font-black text-purple-600 mb-4">56%</div>
               <div className="pt-4 border-t border-gray-50 flex justify-center -space-x-2 w-full">
                    <img src="https://i.pravatar.cc/150?u=a" alt="" className="w-8 h-8 rounded-full border-2 border-white shadow-md"/>
                    <img src="https://i.pravatar.cc/150?u=b" alt="" className="w-8 h-8 rounded-full border-2 border-white shadow-md"/>
                    <img src="https://i.pravatar.cc/150?u=c" alt="" className="w-8 h-8 rounded-full border-2 border-white shadow-md"/>
               </div>
            </motion.div>
            
            {/* Conection L1 -> L2 */}
            {/* Distância entre os centros dos Táticos: Tático = 260px. Metas = 200px.
                Um branch = 200+24+200 = 424px.
                Dois Branches gap = 64px.
                Total width L2 = 424 + 64 + 424 = 912px.
                Centro L: 212. Centro R: 424+64+212 = 700. Dist: 700-212 = 488px.
             */}
            <TreeConnection w={488} height={64} delay1="0s" delay2="2s" />

            <div className="flex gap-[64px] z-10">
               
               {/* L2 BRANCH 1 */}
               <div className="flex flex-col items-center">
                  <motion.div variants={itemVariants} className="bg-white border-[2px] border-blue-100 hover:border-blue-300 rounded-xl p-5 shadow-lg shadow-blue-900/5 w-[260px] z-10 flex flex-col items-start transition-colors cursor-pointer">
                     <div className="flex w-full justify-between items-center mb-4">
                       <div className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-extrabold uppercase tracking-widest shadow-sm">Tático</div>
                       <img src="https://i.pravatar.cc/150?u=d" alt="" className="w-6 h-6 rounded-full border border-gray-100 drop-shadow-sm"/>
                     </div>
                     <h3 className="text-[14px] font-bold text-gray-800 mb-5 h-[42px] leading-snug">Multiplicar Receita de Novos Canais em 3x</h3>
                     <div className="w-full flex items-center gap-3">
                         <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                             <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 1, delay: 0.4 }} className="absolute left-0 h-full bg-blue-500 rounded-full"></motion.div>
                         </div>
                         <div className="text-[12px] font-black text-blue-600">40%</div>
                     </div>
                  </motion.div>

                  {/* Conection L2 -> L3 (W = center of left meta to right meta = 200/2 + 24 + 200/2 = 224px) */}
                  <TreeConnection w={224} height={48} delay1="0.5s" delay2="2.5s" />

                  <div className="flex gap-[24px] z-10">
                     <motion.div variants={itemVariants} className="bg-white border border-green-100 hover:border-green-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-[200px] z-10 flex flex-col items-start cursor-pointer group">
                        <div className="flex w-full justify-between items-center mb-3">
                          <div className="px-1.5 py-0.5 bg-[#E8F8EE] text-[#02CE37] rounded text-[9px] font-black uppercase flex items-center gap-1"><Target className="w-2.5 h-2.5"/> Meta</div>
                          <img src="https://i.pravatar.cc/150?u=e" alt="" className="w-5 h-5 rounded-full border border-gray-100"/>
                        </div>
                        <h3 className="text-[12px] font-bold text-gray-700 leading-snug mb-3 h-[36px] group-hover:text-[#02CE37] transition-colors">Fechar 5 contratos acima de R$ 100k/mês</h3>
                        <div className="w-full">
                          <div className="text-[13px] font-black text-gray-900 mb-1.5">3 / 5 pts</div>
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden relative">
                              <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.6 }} className="absolute left-0 h-full bg-[#02CE37] rounded-full"></motion.div>
                          </div>
                        </div>
                     </motion.div>

                     <motion.div variants={itemVariants} className="bg-white border border-red-100 hover:border-red-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-[200px] z-10 flex flex-col items-start cursor-pointer group">
                        <div className="flex w-full justify-between items-center mb-3">
                          <div className="px-1.5 py-0.5 bg-[#E8F8EE] text-[#02CE37] rounded text-[9px] font-black uppercase flex items-center gap-1"><Target className="w-2.5 h-2.5"/> Meta</div>
                          <img src="https://i.pravatar.cc/150?u=f" alt="" className="w-5 h-5 rounded-full border border-gray-100"/>
                        </div>
                        <h3 className="text-[12px] font-bold text-gray-700 leading-snug mb-3 h-[36px] group-hover:text-red-500 transition-colors">Reduzir CAC para menos de R$ 1.5K</h3>
                        <div className="w-full">
                          <div className="text-[13px] font-black text-gray-900 mb-1.5">R$ 2.4K / R$ 1.5K</div>
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden relative">
                              <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} transition={{ duration: 1, delay: 0.7 }} className="absolute left-0 h-full bg-red-500 rounded-full"></motion.div>
                          </div>
                        </div>
                     </motion.div>
                  </div>
               </div>

               {/* L2 BRANCH 2 */}
               <div className="flex flex-col items-center">
                  <motion.div variants={itemVariants} className="bg-white border-[2px] border-blue-100 hover:border-blue-300 rounded-xl p-5 shadow-lg shadow-blue-900/5 w-[260px] z-10 flex flex-col items-start transition-colors cursor-pointer">
                     <div className="flex w-full justify-between items-center mb-4">
                       <div className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-extrabold uppercase tracking-widest shadow-sm">Tático</div>
                       <img src="https://i.pravatar.cc/150?u=g" alt="" className="w-6 h-6 rounded-full border border-gray-100 drop-shadow-sm"/>
                     </div>
                     <h3 className="text-[14px] font-bold text-gray-800 mb-5 h-[42px] leading-snug">Construir um Time de Altíssima Performance</h3>
                     <div className="w-full flex items-center gap-3">
                         <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                             <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1, delay: 0.5 }} className="absolute left-0 h-full bg-blue-500 rounded-full"></motion.div>
                         </div>
                         <div className="text-[12px] font-black text-blue-600">72%</div>
                     </div>
                  </motion.div>

                  <TreeConnection w={224} height={48} delay1="1s" delay2="3s" />

                  <div className="flex gap-[24px] z-10">
                     <motion.div variants={itemVariants} className="bg-white border border-amber-100 hover:border-amber-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-[200px] z-10 flex flex-col items-start cursor-pointer group">
                        <div className="flex w-full justify-between items-center mb-3">
                          <div className="px-1.5 py-0.5 bg-[#E8F8EE] text-[#02CE37] rounded text-[9px] font-black uppercase flex items-center gap-1"><Target className="w-2.5 h-2.5"/> Meta</div>
                          <img src="https://i.pravatar.cc/150?u=h" alt="" className="w-5 h-5 rounded-full border border-gray-100"/>
                        </div>
                        <h3 className="text-[12px] font-bold text-gray-700 leading-snug mb-3 h-[36px] group-hover:text-amber-500 transition-colors">Atingir Score de eNPS superior a 80</h3>
                        <div className="w-full">
                          <div className="text-[13px] font-black text-gray-900 mb-1.5">72 / 80 pts</div>
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden relative">
                              <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ duration: 1, delay: 0.8 }} className="absolute left-0 h-full bg-amber-500 rounded-full"></motion.div>
                          </div>
                        </div>
                     </motion.div>

                     <motion.div variants={itemVariants} className="bg-white border border-green-100 hover:border-green-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-[200px] z-10 flex flex-col items-start cursor-pointer group">
                        <div className="flex w-full justify-between items-center mb-3">
                          <div className="px-1.5 py-0.5 bg-[#E8F8EE] text-[#02CE37] rounded text-[9px] font-black uppercase flex items-center gap-1"><Target className="w-2.5 h-2.5"/> Meta</div>
                          <img src="https://i.pravatar.cc/150?u=i" alt="" className="w-5 h-5 rounded-full border border-gray-100"/>
                        </div>
                        <h3 className="text-[12px] font-bold text-gray-700 leading-snug mb-3 h-[36px] group-hover:text-[#02CE37] transition-colors">Reduzir Turnover para menos de 5%</h3>
                        <div className="w-full">
                          <div className="text-[13px] font-black text-gray-900 mb-1.5">3.2% / 5.0%</div>
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden relative">
                              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.9 }} className="absolute left-0 h-full bg-[#02CE37] rounded-full"></motion.div>
                          </div>
                        </div>
                     </motion.div>
                  </div>
               </div>

            </div>

        </div>

      </div>

      {/* Floating Footer Hint */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur border border-gray-200 shadow-xl px-4 py-2 rounded-full flex items-center gap-2 text-[12px] font-bold text-gray-600 animate-bounce">
              <ArrowLeftRight className="w-4 h-4 text-[#02CE37]"/> Arraste para visualizar o mapa completo
          </div>
      </div>
    </motion.div>
  );
}

//================================================
// 6. ABA 6: GAMIFICAÇÃO DASHBOARD MOCK
//================================================

const mockRanking = [
  { id: 1, name: "André Luiz", role: "Vendas", points: "5.420", avatar: "https://i.pravatar.cc/100?img=11", trend: "up", position: 1 },
  { id: 2, name: "Silvana M.", role: "Marketing", points: "4.850", avatar: "https://i.pravatar.cc/100?img=5", trend: "up", position: 2 },
  { id: 3, name: "Roberto C.", role: "Operações", points: "4.100", avatar: "https://i.pravatar.cc/100?img=8", trend: "down", position: 3 },
  { id: 4, name: "Lara Campos", role: "Atendimento", points: "3.900", avatar: "https://i.pravatar.cc/100?img=9", trend: "up", position: 4 },
];

const mockBadges = [
  { id: 1, title: "Meta Batedor", desc: "Atingiu 100% da meta no trimestre", icon: Trophy, bg: "bg-amber-100", text: "text-amber-600" },
  { id: 2, title: "Colaborador Master", desc: "Ajudou em 5 OKRs de outros times", icon: Star, bg: "bg-purple-100", text: "text-purple-600" },
  { id: 3, title: "Velocista", desc: "Check-in em menos de 24h", icon: Zap, bg: "bg-blue-100", text: "text-blue-600" },
];

function GamificacaoDashboardMock() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col h-full w-full bg-[#f9fafb] text-left antialiased font-sans relative overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto px-4 md:px-8 custom-scrollbar">
        <div className="max-w-[1100px] mx-auto py-6 md:py-8 space-y-8">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-amber-50 to-transparent pointer-events-none"></div>
            <div>
              <h1 className="text-[26px] md:text-[28px] font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
                Minhas Conquistas <span className="text-amber-400" style={{fontFamily: 'emoji'}}>🏆</span>
              </h1>
              <p className="text-gray-500 text-[14px]">Acompanhe seu desempenho e troque pontos por prêmios reais.</p>
            </div>
            <div className="flex items-center gap-4 bg-amber-50 px-5 py-3 rounded-xl border border-amber-100 relative z-10">
               <div>
                 <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">Saldo Atual</div>
                 <div className="text-[24px] font-black text-amber-500 leading-none">4.850 <span className="text-[14px] text-amber-600/60 font-bold">pts</span></div>
               </div>
               <button className="bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-lg shadow-md transition-colors">
                 <Gift className="w-5 h-5"/>
               </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Coluna 1: Ranking */}
            <motion.div variants={itemVariants} className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2"><Medal className="w-5 h-5 text-purple-500"/> Top Performers</h3>
                 <span className="text-[12px] font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">Esta Semana</span>
               </div>
               
               <div className="space-y-4 flex-1">
                 {mockRanking.map((user, idx) => (
                   <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                     <div className="flex items-center gap-3">
                       <div className={`w-6 text-center text-[14px] font-black ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-700' : 'text-gray-300'}`}>
                         #{user.position}
                       </div>
                       <div className="relative">
                         <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm"/>
                         {idx === 0 && <div className="absolute -top-2 -right-1 text-[16px] animate-bounce" style={{fontFamily: 'emoji'}}>👑</div>}
                       </div>
                       <div>
                         <div className="text-[13px] font-bold text-gray-900">{user.name}</div>
                         <div className="text-[11px] font-medium text-gray-500">{user.role}</div>
                       </div>
                     </div>
                     <div className="text-right flex items-center">
                       <div className="text-[14px] font-black text-gray-900">{user.points}</div>
                       {user.trend === "up" ? <TrendingUp className="w-3.5 h-3.5 text-[#02CE37] ml-1"/> : <TrendingDown className="w-3.5 h-3.5 text-red-500 ml-1"/>}
                     </div>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-4 py-2 text-[12px] font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">Ver Ranking Completo</button>
            </motion.div>

            {/* Coluna 2: Badges / Níveis */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
               
               {/* Nível Progress */}
               <div className="bg-[#111827] rounded-2xl p-6 shadow-lg relative overflow-hidden">
                 <div className="absolute right-0 top-0 opacity-10 pointer-events-none w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#02CE37] via-transparent to-transparent"></div>
                 <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="shrink-0 relative">
                       <div className="w-24 h-24 rounded-full border-[4px] border-gray-800 flex items-center justify-center relative z-10 bg-gray-900 shadow-[0_0_20px_rgba(2,206,55,0.15)]">
                          <div className="text-center">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Nível</div>
                            <div className="text-[32px] font-black text-white leading-none mt-1">42</div>
                          </div>
                          {/* Circular Progress Overlay Mock */}
                          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                             <circle cx="50" cy="50" r="46" fill="none" stroke="#02CE37" strokeWidth="6" strokeDasharray="289" strokeDashoffset="60" strokeLinecap="round" />
                          </svg>
                       </div>
                    </div>
                    <div className="flex-1 w-full relative z-10 text-center sm:text-left">
                       <h3 className="text-[20px] font-extrabold text-white mb-2">Quase lá, Silvana! 🔥</h3>
                       <p className="text-[13px] text-gray-400 font-medium mb-4">Você está a apenas 150 pontos de atingir o Nível 43 e desbloquear uma recompensa exclusiva.</p>
                       <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-gradient-to-r from-[#01A82D] to-[#02CE37] rounded-full"></motion.div>
                       </div>
                       <div className="flex justify-between text-[11px] font-bold text-gray-500 mt-2">
                         <span>8.500 XP</span>
                         <span>10.000 XP</span>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Últimas Conquistas */}
               <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500"/> Últimas Medalhas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {mockBadges.map((badge) => (
                      <div key={badge.id} className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer bg-gray-50/50 hover:bg-white relative overflow-hidden group">
                         <div className={`w-12 h-12 rounded-full ${badge.bg} ${badge.text} flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform shadow-sm`}>
                           <badge.icon className="w-6 h-6"/>
                         </div>
                         <h4 className="text-[13px] font-bold text-gray-900 mb-1 leading-snug">{badge.title}</h4>
                         <p className="text-[11px] font-medium text-gray-500 leading-snug">{badge.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Secao Recompensas e Marcas */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Recompensa Destacada Fake Hover */}
                 <div className="bg-gradient-to-br from-[#E8F8EE] to-white border border-[#02CE37]/20 rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col justify-center items-center text-center group">
                    <div className="text-[12px] font-bold text-[#02CE37] uppercase tracking-wider mb-2">Recompensa Desbloqueada</div>
                    <div className="text-[20px] font-extrabold text-gray-900 mb-6 leading-tight">Gift Card R$ 200<br/><span className="text-[14px] text-gray-500 font-medium">Livre Escolha</span></div>
                    
                    <div className="relative perspective-[1000px]">
                      <div className="absolute -inset-1 bg-[#02CE37] blur-[10px] opacity-30 rounded-full"></div>
                      <button className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#02CE37] text-white px-5 py-2.5 text-[14px] font-bold shadow-md hover:bg-[#01A82D] transition-transform transform scale-[1.02]">
                        <Gift className="w-4 h-4"/> Resgatar Recompensa
                      </button>
                      
                      {/* Fake Mouse Pointer */}
                      <motion.div 
                        initial={{ x: 30, y: 30 }}
                        animate={{ x: [30, -5, 30], y: [30, -5, 30], scale: [1, 0.9, 1] }} 
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-[-15px] bottom-[-20px] z-20 pointer-events-none"
                      >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#111827] w-6 h-6 drop-shadow-md">
                           <path d="M5.5 3.5L19.5 10.5L12.5 13.5L9.5 20.5L5.5 3.5Z" fill="currentColor" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                         </svg>
                      </motion.div>
                    </div>

                    <div className="text-[11px] font-medium text-amber-500 mt-4 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current"/> +50XP de bônus na troca!
                    </div>
                 </div>

                 {/* Carrossel/Grid de Marcas Parceiras */}
                 <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col justify-center">
                    <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-5 text-center">Conferir recompensas em...</h3>
                    <div className="grid grid-cols-3 gap-y-7 gap-x-4 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" className="h-4 object-contain grayscale hover:grayscale-0 transition-all"/>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="Shopee" className="h-5 object-contain grayscale hover:grayscale-0 transition-all"/>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" className="h-6 object-contain grayscale hover:grayscale-0 transition-all"/>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-5 object-contain grayscale hover:grayscale-0 transition-all"/>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Mercado_Livre_logo.png" alt="Mercado Livre" className="h-5 object-contain grayscale hover:grayscale-0 transition-all"/>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" alt="Shopify" className="h-5 object-contain grayscale hover:grayscale-0 transition-all"/>
                    </div>
                 </div>
               </div>

            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

//================================================
// 7. COMPONENTE PRINCIPAL: TAB ROOT
//================================================

const TABS = [
  { id: "metas", label: "METAS", emojiCode: "1f525", isPlaceholder: false },
  { id: "objetivos", label: "GESTÃO DE OBJETIVOS", emojiCode: "1f3af", isPlaceholder: false },
  { id: "ciclos", label: "CICLOS ESTRATÉGICOS", emojiCode: "1f504", isPlaceholder: false },
  { id: "kpis", label: "PAINEL DE KPIS", emojiCode: "1f4ca", isPlaceholder: false },
  { id: "mapa", label: "MAPA ESTRATÉGICO", emojiCode: "1f5fa", isPlaceholder: false },
  { id: "gamificacao", label: "GAMIFICAÇÃO", emojiCode: "1f3c6", isPlaceholder: false },
];

export function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState("objetivos"); // Inicia com a aba objetivos aberta para teste

  return (
    <section className="w-full bg-[#F9FAFB] py-16 lg:py-24 font-sans overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* Container das Tabs sem a Barra Cinza */}
        <div className="w-full mx-auto mb-10 px-0 sm:px-4">
          <div className="w-full py-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
             <div className="flex w-max mx-auto items-center gap-2 md:gap-3 px-4 sm:px-0">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[11px] md:text-[13px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                      isActive 
                        ? "bg-[#E8F8EE] text-[#02CE37] border-[#E8F8EE]" 
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-1 -right-0.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#02CE37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#02CE37] border-2 border-white"></span>
                      </span>
                    )}
                    <img 
                      src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${tab.emojiCode}.svg`} 
                      alt=""
                      className="w-4 h-4 md:w-[18px] md:h-[18px] shrink-0" 
                      style={{ filter: isActive ? "none" : "grayscale(80%) opacity(70%)", transition: "filter 0.3s" }} 
                    />
                    <span className="mt-[1px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Content Container (Mockup Device Frame) */}
        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="rounded-2xl lg:rounded-[32px] p-2 md:p-4 lg:p-6 bg-[#C4F1D4]">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl w-full h-[600px] md:h-[740px] overflow-hidden flex flex-col relative">
              <AnimatePresence mode="wait">
                
                {activeTab === "metas" && (
                  <motion.div key="metas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <MetasDashboardMock />
                  </motion.div>
                )}

                {activeTab === "objetivos" && (
                  <motion.div key="objetivos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <ObjetivosDashboardMock />
                  </motion.div>
                )}

                {activeTab === "ciclos" && (
                  <motion.div key="ciclos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <CiclosDashboardMock />
                  </motion.div>
                )}
                
                {activeTab === "kpis" && (
                  <motion.div key="kpis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <KpisDashboardMock />
                  </motion.div>
                )}
                
                {activeTab === "mapa" && (
                  <motion.div key="mapa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <MapaDashboardMock />
                  </motion.div>
                )}
                
                {activeTab === "gamificacao" && (
                  <motion.div key="gamificacao" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <GamificacaoDashboardMock />
                  </motion.div>
                )}
                
                {activeTab !== "metas" && activeTab !== "objetivos" && activeTab !== "ciclos" && activeTab !== "kpis" && activeTab !== "mapa" && activeTab !== "gamificacao" && (
                  <motion.div key={"placeholder-" + activeTab} variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50">
                    <motion.div variants={itemVariants} className="w-16 h-16 bg-[#02CE37]/10 text-[#02CE37] rounded-full flex items-center justify-center mb-4"><Clock className="w-8 h-8" /></motion.div>
                    <motion.h3 variants={itemVariants} className="text-xl font-bold text-gray-800 mb-2">Tela de {TABS.find(t => t.id === activeTab)?.label}</motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-500 max-w-sm">Aguardando o envio da imagem de referência... (Selecione Metas, Objetivos, Ciclos, KPIs ou Mapa para ver a magia).</motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Global Bottom CTA da Seção com Shine e Seta */}
        <div className="mt-16 flex justify-center">
            <div className="relative group perspective-[1000px]">
              <div className="absolute -inset-1 bg-[#02CE37] blur-[24px] opacity-40 group-hover:opacity-60 transition duration-500 rounded-full"></div>
              <button className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#02CE37] text-white px-[24px] py-[14px] md:px-[32px] md:py-[16px] text-[16px] md:text-[18px] font-bold transition-all duration-300 transform group-hover:bg-[#01A82D] group-hover:-translate-y-[2px] active:bg-[#018A24] shadow-[0_8px_24px_rgba(2,206,55,0.3)] focus:outline-none w-full sm:w-auto">
                Sim, quero testar gratuitamente!
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform shrink-0">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Shine Animation */}
                <motion.div animate={{ left: ["-100%", "200%"] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
              </button>
            </div>
        </div>

      </div>
    </section>
  );
}


