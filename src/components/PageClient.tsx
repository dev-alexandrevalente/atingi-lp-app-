"use client";

import React, { useEffect, useState, useMemo } from "react";
// ScrollProgress effect has been removed for mobile performance (reduced global layout shifts and calculation on scroll)
import { persistTrackingParams, submitLeadAndRedirect, trackPageView } from "@/utils/tracking";
import { initSession, trackStep, trackInteraction } from "@/utils/analytics";
import { QuizProvider, useQuiz } from "@/context/QuizContext";
import dynamic from "next/dynamic";
import QuizFunnel from "@/components/quiz/QuizFunnel";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/Navbar";
import { useFunnelVersion } from "@/hooks/useFunnelVersion";
import Footer from "@/components/sections/Footer";
import ScrollObserver from "@/components/ui/ScrollObserver";
import LazySection from "@/components/ui/LazySection";

import QuizModal from "@/components/quiz/QuizModal";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import MobileApp from "@/components/sections/MobileApp";
import Ranking from "@/components/sections/Ranking";
import Rewards from "@/components/sections/Rewards";
import OfferBlock from "@/components/sections/OfferBlock";
import FAQ from "@/components/sections/FAQ";
import SplitRoutingHero from "@/components/v4/SplitRoutingHero";

function PageContent() {
  const { isHydrated, quizCompleted, quizData, leadData } = useQuiz();
  const [showQuizModal, setShowQuizModal] = useState(false);

  const { isV1, isV2, isV3, isV4 } = useFunnelVersion();

  // Persist UTM/tracking params on first load
  useEffect(() => {
    persistTrackingParams();
  }, []);

  // Fire Pageview event for GTM/Pixel once hydrated (ensures reliable param capture)
  // And initialize the internal Supabase session (Visitor tracking)
  useEffect(() => {
    if (isHydrated) {
      const version = isV4 ? 'v4' : isV3 ? 'v3' : isV2 ? 'v2' : 'v1';
      
      // 1. External Analytics (GTM/Meta)
      trackPageView(version);
      
      // 2. Internal Analytics (Supabase Visitors)
      initSession(version).then(() => {
        // Se for v2 ou v3, iniciamos o step 0 (hero) direto na landing page.
        // A v1 vai delegar isso para o QuizFunnel.
        if (!isV1) {
          trackStep(0, 'enter');
        }
      });
    }
  }, [isHydrated, isV1, isV2, isV3, isV4]);

  // V2/V3/V4: Monitora encerramento da janela (bounce tracking)
  useEffect(() => {
    if (!isV1 && isHydrated) {
      const handleUnload = () => {
        import('@/utils/analytics').then(m => m.endSessionBeacon(0));
      };
      window.addEventListener('beforeunload', handleUnload);
      return () => window.removeEventListener('beforeunload', handleUnload);
    }
  }, [isV1, isHydrated]);

  // V1: WhatsApp CTA handler (after quiz gate)
  const handleWhatsAppCTA = (source: string) => {
    if (!leadData) return;
    submitLeadAndRedirect(leadData, source, quizData);
  };

  // V2: CTA opens quiz modal
  const handleV2CTA = (_source: string) => {
    setShowQuizModal(true);
  };

  // Wait for client-side sessionStorage hydration
  // Em vez de retornar null para o SSR da V1, retornamos a tela inicial do Quiz, garantindo que o Hero chegue pré-renderizado no HTML puro, derrubando o LCP.
  if (isV1 && !isHydrated) return <QuizFunnel mode="gate" />;
  if (isV1) {
    if (!quizCompleted) {
      return <QuizFunnel mode="gate" />;
    }

    return (
      <>
        <Navbar onCTA={handleWhatsAppCTA} />
        <main className="relative z-10">
          <Hero onCTA={handleWhatsAppCTA} />
          <div className="flex flex-col">
            <Features onCTA={handleWhatsAppCTA} />
            <TrustBar />
            <Problem />
            <MobileApp onCTA={handleWhatsAppCTA} />
            <Ranking onCTA={handleWhatsAppCTA} />
            <Rewards onCTA={handleWhatsAppCTA} />
            <OfferBlock onCTA={handleWhatsAppCTA} />
            <FAQ />
          </div>
        </main>
        <Footer onCTA={handleWhatsAppCTA} />
      </>
    );
  }

  // ── V4: Acrobits Softphone Demo Clone ──
  if (isV4) {
    return (
      <main className="relative z-10 flex flex-col min-h-screen">
        <SplitRoutingHero />
      </main>
    );
  }

  // ── V2 & V3: Landing Page → CTA opens Quiz Modal → WhatsApp / Trial ──
  return (
    <>
      <Navbar onCTA={handleV2CTA} />
      <main className="relative z-10">
        <Hero onCTA={handleV2CTA} />
          <div className="flex flex-col">
            <Features onCTA={handleV2CTA} />
            <TrustBar />
            <Problem />
            <MobileApp onCTA={handleV2CTA} />
            <Ranking onCTA={handleV2CTA} />
            <Rewards onCTA={handleV2CTA} />
            <OfferBlock onCTA={handleV2CTA} />
            <FAQ />
          </div>
      </main>
      <Footer onCTA={handleV2CTA} />

      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
      />
    </>
  );
}

export default function PageClient() {
  return (
    <QuizProvider>
      <ScrollObserver />
      <PageContent />
    </QuizProvider>
  );
}
