"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitLeadAndRedirect } from "@/utils/tracking";
import { trackStep, trackInteraction, updateLiveLead } from "@/utils/analytics";

// Phone mask function
function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

interface DirectLeadFormProps {
  onBack: () => void;
}

type Step = "role" | "team_size" | "segment" | "maturity" | "lead";
const STEP_ORDER: Step[] = ["role", "team_size", "segment", "maturity", "lead"];

// Map step names to analytics step indices (V4: 1-5, hero is 0)
const STEP_INDEX_MAP: Record<Step, number> = {
  role: 1,
  team_size: 2,
  segment: 3,
  maturity: 4,
  lead: 5,
};

const ROLES = [
  { label: "CEO / Dono", value: "ceo", icon: "👑" },
  { label: "Diretor", value: "diretor", icon: "🎯" },
  { label: "Head / Gerente", value: "head", icon: "📊" },
  { label: "Coordenador", value: "coordenador", icon: "📋" },
];

const TEAM_SIZES = [
  { label: "1–5", value: "1-5", desc: "Startup" },
  { label: "6–10", value: "6-10", desc: "Pequena" },
  { label: "11–20", value: "11-20", desc: "Crescimento" },
  { label: "21–50", value: "21-50", desc: "Média" },
  { label: "51–80", value: "51-80", desc: "Grande" },
  { label: "81+", value: "81+", desc: "Enterprise" },
];

const SEGMENTOS = [
  { label: "Tecnologia", value: "tecnologia", icon: "💻" },
  { label: "Agência", value: "agencia", icon: "🎨" },
  { label: "Serviços B2B", value: "servicos-b2b", icon: "🤝" },
  { label: "Educação", value: "educacao", icon: "📚" },
  { label: "Varejo", value: "varejo", icon: "🏪" },
  { label: "Saúde", value: "saude", icon: "🏥" },
];

const TEMPO_EMPRESA = [
  { label: "Menos de 1 ano", value: "menos-1", desc: "Nascendo" },
  { label: "1–3 anos", value: "1-3", desc: "Validando" },
  { label: "3–7 anos", value: "3-7", desc: "Crescendo" },
  { label: "7–15 anos", value: "7-15", desc: "Consolidada" },
  { label: "15+ anos", value: "15+", desc: "Madura" },
];

export default function DirectLeadForm({ onBack }: DirectLeadFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>("role");
  const [direction, setDirection] = useState(1);
  const [quizData, setQuizData] = useState({
    role: "",
    team_size: "",
    segment: "",
    maturity: ""
  });
  
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const screenIndex = STEP_ORDER.indexOf(currentStep);

  // ─── Analytics: Track form start on mount ───
  useEffect(() => {
    trackInteraction('v4_form_start', 'v4_direct_lead_form', 'V4 DirectLeadForm opened');
    trackInteraction('v4_step_view', 'v4_step_role', 'View step role');
    trackStep(1, 'enter', { v4_step: 'role' });
  }, []);

  // ─── Analytics: Track step abandonment on unmount ───
  useEffect(() => {
    return () => {
      const stepIdx = STEP_INDEX_MAP[currentStep];
      trackInteraction('v4_step_dropoff', `v4_step_${currentStep}`, `Abandon at step ${currentStep}`, {
        step_index: stepIdx,
        step_name: currentStep,
        quiz_data_collected: quizData,
      });
      trackInteraction('v4_form_abandon', 'v4_form', 'V4 Funnel abandoned');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = (stepName: Step) => {
    const prevStepIdx = STEP_INDEX_MAP[currentStep];
    const nextStepIdx = STEP_INDEX_MAP[stepName];
    
    // Track exit of current step
    trackInteraction('v4_step_advance', `v4_advance_to_${stepName}`, `Advance to ${stepName}`);
    trackStep(prevStepIdx, 'exit', { v4_step: currentStep });
    
    setDirection(1);
    setCurrentStep(stepName);
    
    // Track enter of next step
    trackInteraction('v4_step_view', `v4_step_${stepName}`, `View step ${stepName}`);
    trackStep(nextStepIdx, 'enter', { v4_step: stepName });
  };

  const goBackStep = () => {
    if (screenIndex > 0) {
      const prevStepIdx = STEP_INDEX_MAP[currentStep];
      trackStep(prevStepIdx, 'exit', { v4_step: currentStep, action: 'back' });
      
      setDirection(-1);
      const prevStep = STEP_ORDER[screenIndex - 1];
      setCurrentStep(prevStep);
      
      trackStep(STEP_INDEX_MAP[prevStep], 'enter', { v4_step: prevStep, action: 'back' });
    } else {
      // Exiting the form entirely
      trackInteraction('form_abandon', 'v4_form_back_to_hero', 'Back to hero from first step');
      onBack();
    }
  };

  const handleSelect = (key: keyof typeof quizData, value: string) => {
    setQuizData(prev => ({ ...prev, [key]: value }));
    
    // Track the answer interaction
    trackInteraction('v4_step_answer', `v4_answer_${key}`, `${key}: ${value}`, {
      step: key,
      value,
    });
    
    // Update live lead with quiz data mapping
    const liveLeadMap: Record<string, Record<string, string>> = {
      role: { quiz_role: value },
      team_size: { quiz_team_size: value },
      segment: { quiz_segment: value },
      maturity: { quiz_time_company: value },
    };
    if (liveLeadMap[key]) {
      updateLiveLead(liveLeadMap[key] as any);
    }
    
    // Advance to next step after brief delay
    if (key === "role") setTimeout(() => goNext("team_size"), 300);
    if (key === "team_size") setTimeout(() => goNext("segment"), 300);
    if (key === "segment") setTimeout(() => goNext("maturity"), 300);
    if (key === "maturity") setTimeout(() => goNext("lead"), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim().length < 2) {
      setError("Por favor, insira um nome válido.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    if (formData.phone.replace(/\D/g, "").length < 10) {
      setError("Por favor, insira um WhatsApp válido.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // ─── Analytics: Track form submission ───
    trackInteraction('v4_form_submit', 'v4_lead_form', 'V4 lead form submitted', {
      has_name: !!formData.name,
      has_email: !!formData.email,
      has_phone: !!formData.phone,
    });

    // Track step 5 exit (contact_form) and step 6 enter (converted)
    trackStep(5, 'exit', { v4_step: 'lead', action: 'submit' });
    trackStep(6, 'enter', { v4_step: 'converted' });

    // Update live lead with contact info
    await updateLiveLead({
      lead_name: formData.name.trim(),
      lead_email: formData.email.trim().toLowerCase(),
      lead_phone: formData.phone.replace(/\D/g, ''),
      is_converted: true,
    });

    // Track conversion intent
    trackInteraction('v4_lead_generated', 'v4_lead_generated', 'V4 lead generated', {
      quiz_role: quizData.role,
      quiz_team_size: quizData.team_size,
      quiz_segment: quizData.segment,
      quiz_maturity: quizData.maturity,
    });
    
    trackInteraction('v4_conversion_intent', 'v4_conversion_intent', 'V4 conversion intent complete');

    // Track WhatsApp redirect
    trackInteraction('v4_whatsapp_redirect', 'v4_whatsapp_exit', 'Redirecting to WhatsApp from V4');

    // Build quiz data payload compatible with existing tracking system
    const syntheticQuizData = {
      role: quizData.role,
      score: 100,
      answers: {
        "nivel": quizData.role,
        "tamanho": quizData.team_size,
        "segmento": quizData.segment,
        "tempo_empresa": quizData.maturity,
        "origem": "V4 - Direct Lead Form"
      },
      frustrations: [],
    };

    // ─── SUBMIT & REDIRECT TO WHATSAPP (identical to V1/V2) ───
    submitLeadAndRedirect(formData, "v4_direct_lead", syntheticQuizData);
  };

  const inputClass = (field: string) => `w-full h-[54px] pl-11 pr-4 rounded-xl text-[14px] text-slate-800 bg-white/90 border outline-none transition-all placeholder:text-slate-300 shadow-sm ${
    focusedField === field
      ? "border-[#02CE37]/50 ring-2 ring-[#02CE37]/10 shadow-[0_0_0_3px_rgba(2,206,55,0.06)]"
      : "border-slate-200/80"
  }`;

  const fields = [
    { key: "name", type: "text", value: formData.name, set: (val: string) => setFormData(prev => ({ ...prev, name: val })), placeholder: "João Silva", autoComplete: "name",
      icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
    { key: "email", type: "email", value: formData.email, set: (val: string) => setFormData(prev => ({ ...prev, email: val })), placeholder: "joao@empresa.com.br", autoComplete: "email",
      icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></> },
    { key: "phone", type: "tel", value: formData.phone, set: (val: string) => setFormData(prev => ({ ...prev, phone: formatPhone(val) })), placeholder: "(11) 99999-9999", autoComplete: "tel",
      icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
      key={currentStep}
      className="w-full max-w-[420px] mx-auto bg-white border border-slate-200/80 p-8 rounded-[24px] shadow-xl relative"
    >
      <button 
        onClick={goBackStep}
        className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 transition p-1"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-center gap-1.5 mt-2 mb-8">
         {STEP_ORDER.map((s, i) => (
            <div key={s} className="w-8 h-[4px] rounded-full bg-slate-100 overflow-hidden">
               <motion.div className="h-full bg-[#02CE37]" initial={{ width: "0%" }} animate={{ width: i <= screenIndex ? "100%" : "0%" }} transition={{ duration: 0.3 }} />
            </div>
         ))}
      </div>

      {currentStep === "role" && (
        <div className="flex flex-col items-center">
          <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-2 text-center">Qual o seu papel na empresa?</h2>
          <p className="text-[13px] text-slate-500 text-center mb-6 max-w-[300px]">Isso ajuda a preparar a demonstração correta para a sua visão tática ou estratégica.</p>
          <div className="w-full space-y-3">
            {ROLES.map((r) => (
               <button key={r.value} onClick={() => handleSelect("role", r.value)} className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-left cursor-pointer transition-all border ${quizData.role === r.value ? "bg-[#02CE37]/[0.06] border-[#02CE37] shadow-sm" : "bg-white border-slate-200 hover:border-[#02CE37]/30 hover:shadow-sm"}`}>
                 <span className="text-[20px]">{r.icon}</span>
                 <span className="text-[15px] font-semibold text-slate-800">{r.label}</span>
               </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "team_size" && (
        <div className="flex flex-col items-center">
          <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-2 text-center">Tamanho da Equipe</h2>
          <p className="text-[13px] text-slate-500 text-center mb-6 max-w-[300px]">Quantas pessoas vão usar a plataforma simultaneamente?</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {TEAM_SIZES.map((t) => (
               <button key={t.value} onClick={() => handleSelect("team_size", t.value)} className={`flex flex-col items-center justify-center py-4 rounded-xl cursor-pointer transition-all border ${quizData.team_size === t.value ? "bg-[#02CE37]/[0.06] border-[#02CE37] shadow-sm" : "bg-white border-slate-200 hover:border-[#02CE37]/30"}`}>
                 <span className="text-[18px] font-bold text-slate-800">{t.label}</span>
                 <span className="text-[11px] text-slate-400 font-medium">{t.desc}</span>
               </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "segment" && (
        <div className="flex flex-col items-center">
          <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-2 text-center">Segmento</h2>
          <p className="text-[13px] text-slate-500 text-center mb-6 max-w-[300px]">Em qual setor a sua empresa atua principalmente?</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {SEGMENTOS.map((s) => (
               <button key={s.value} onClick={() => handleSelect("segment", s.value)} className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl cursor-pointer transition-all border ${quizData.segment === s.value ? "bg-[#02CE37]/[0.06] border-[#02CE37] shadow-sm" : "bg-white border-slate-200 hover:border-[#02CE37]/30"}`}>
                 <span className="text-[18px]">{s.icon}</span>
                 <span className="text-[13px] font-semibold text-slate-800">{s.label}</span>
               </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "maturity" && (
        <div className="flex flex-col items-center">
          <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-2 text-center">Tempo de Operação</h2>
          <p className="text-[13px] text-slate-500 text-center mb-6 max-w-[300px]">Maturidade da empresa impacta no onboarding e integração.</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {TEMPO_EMPRESA.map((t) => (
               <button key={t.value} onClick={() => handleSelect("maturity", t.value)} className={`flex flex-col items-center justify-center py-4 rounded-xl cursor-pointer transition-all border ${quizData.maturity === t.value ? "bg-[#02CE37]/[0.06] border-[#02CE37] shadow-sm" : "bg-white border-slate-200 hover:border-[#02CE37]/30"}`}>
                 <span className="text-[18px] font-bold text-slate-800">{t.label}</span>
                 <span className="text-[11px] text-slate-400 font-medium">{t.desc}</span>
               </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "lead" && (
        <div className="flex flex-col items-center">
          <motion.div className="mb-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 250, damping: 15 }}>
            <svg width="40" height="40" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="24" fill="none" stroke="#02CE37" strokeWidth="2" />
              <path d="M15 26L22.5 33.5L37 18" fill="none" stroke="#02CE37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-2 text-center">Agende sua Demonstração</h2>
          <p className="text-[13px] text-slate-500 text-center leading-relaxed mb-4 max-w-[300px]">Preencha seus dados de contato direto para a liberação final.</p>

          <form onSubmit={handleSubmit} className="space-y-3 w-full">
            {fields.map((field, i) => (
              <motion.div key={field.key} className="relative" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, type: "spring", stiffness: 150 }}>
                <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === field.key ? "text-[#02CE37]" : "text-slate-300"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {field.icon}
                  </svg>
                </div>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  onFocus={() => {
                    setFocusedField(field.key);
                    trackInteraction('form_focus', `v4_field_${field.key}`, `Focus on ${field.key}`);
                  }}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  className={inputClass(field.key)}
                  autoFocus={i === 0}
                  autoComplete={field.autoComplete}
                />
              </motion.div>
            ))}
            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[12px] font-medium text-center pt-1">{error}</motion.p>}
            <motion.div className="relative pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <button type="submit" disabled={isSubmitting} className="group relative w-full inline-flex items-center justify-center px-8 py-[18px] bg-[#02CE37] text-white rounded-xl font-bold text-[15px] overflow-hidden shadow-[0_6px_20px_rgba(2,206,55,0.25)] transition-all hover:shadow-[0_8px_25px_rgba(2,206,55,0.35)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0">
                <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/50 transition-colors duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Confirmar Agendamento <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>}
                </span>
              </button>
            </motion.div>
          </form>
          
          <motion.div className="flex items-center justify-center gap-2 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#02CE37" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="7" width="10" height="7" rx="2" /><path d="M5 7V5a3 3 0 016 0v2" />
            </svg>
            <span className="text-[11px] text-slate-400 font-medium">Seus dados estão seguros. Sem spam.</span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
