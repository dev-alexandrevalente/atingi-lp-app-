"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LeadModalContextType {
  isOpen: boolean;
  source: string;
  openModal: (source: string) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType>({
  isOpen: false,
  source: "",
  openModal: () => {},
  closeModal: () => {},
});

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");

  const openModal = useCallback((src: string) => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadModalContext.Provider value={{ isOpen, source, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}
