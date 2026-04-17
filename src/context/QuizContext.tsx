"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export interface QuizData {
  role: string;
  answers: Record<string, string>;
  frustrations: string[];
  score: number;
}

interface QuizContextType {
  /* State */
  isHydrated: boolean;
  quizCompleted: boolean;
  quizData: QuizData;
  leadData: LeadData | null;
  /* Actions */
  setAnswer: (questionId: string, value: string) => void;
  setFrustrations: (values: string[]) => void;
  setRole: (role: string) => void;
  setLeadInfo: (data: LeadData) => void;
  setScore: (score: number) => void;
  completeQuiz: () => void;
}

const defaultQuizData: QuizData = {
  role: "",
  answers: {},
  frustrations: [],
  score: 0,
};

const QuizContext = createContext<QuizContextType>({
  isHydrated: false,
  quizCompleted: false,
  quizData: defaultQuizData,
  leadData: null,
  setAnswer: () => {},
  setFrustrations: () => {},
  setRole: () => {},
  setLeadInfo: () => {},
  setScore: () => {},
  completeQuiz: () => {},
});

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  // Start with defaults (matches SSR output — no hydration mismatch)
  const [isHydrated, setIsHydrated] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>(defaultQuizData);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  // After hydration, restore from sessionStorage (runs client-side only)
  useEffect(() => {
    try {
      const savedCompleted = sessionStorage.getItem("atingi_quiz_completed");
      if (savedCompleted === "true") setQuizCompleted(true);

      const savedQuiz = sessionStorage.getItem("atingi_quiz_data");
      if (savedQuiz) setQuizData(JSON.parse(savedQuiz));

      const savedLead = sessionStorage.getItem("atingi_lead_data");
      if (savedLead) setLeadData(JSON.parse(savedLead));
    } catch {
      // sessionStorage unavailable (private browsing, etc.)
    }
    setIsHydrated(true);
  }, []);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setQuizData((prev) => {
      const next = { ...prev, answers: { ...prev.answers, [questionId]: value } };
      try { sessionStorage.setItem("atingi_quiz_data", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setFrustrations = useCallback((values: string[]) => {
    setQuizData((prev) => {
      const next = { ...prev, frustrations: values };
      try { sessionStorage.setItem("atingi_quiz_data", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setRole = useCallback((role: string) => {
    setQuizData((prev) => {
      const next = { ...prev, role };
      try { sessionStorage.setItem("atingi_quiz_data", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setLeadInfo = useCallback((data: LeadData) => {
    setLeadData(data);
    try { sessionStorage.setItem("atingi_lead_data", JSON.stringify(data)); } catch {}
  }, []);

  const setScore = useCallback((score: number) => {
    setQuizData((prev) => {
      const next = { ...prev, score };
      try { sessionStorage.setItem("atingi_quiz_data", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const completeQuiz = useCallback(() => {
    setQuizCompleted(true);
    try { sessionStorage.setItem("atingi_quiz_completed", "true"); } catch {}
  }, []);

  return (
    <QuizContext.Provider
      value={{
        isHydrated,
        quizCompleted,
        quizData,
        leadData,
        setAnswer,
        setFrustrations,
        setRole,
        setLeadInfo,
        setScore,
        completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
