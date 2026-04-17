"use client";

import { useMemo } from "react";

export function useFunnelVersion() {
  const isV2 = useMemo(() => {
    if (process.env.NEXT_PUBLIC_FUNNEL_VERSION === 'v2') return true;
    if (typeof window !== 'undefined' && window.location.pathname.includes('mads-v2')) return true;
    return false;
  }, []);

  const isV3 = useMemo(() => {
    if (process.env.NEXT_PUBLIC_FUNNEL_VERSION === 'v3') return true;
    if (typeof window !== 'undefined' && window.location.pathname.includes('atingi-fnofd-0001-demo-mads-v3')) return true;
    return false;
  }, []);

  const isV4 = useMemo(() => {
    if (process.env.NEXT_PUBLIC_FUNNEL_VERSION === 'v4') return true;
    if (typeof window !== 'undefined' && window.location.pathname.includes('atingi-fnofd-0001-demo-mads-v4')) return true;
    return false;
  }, []);

  return { isV1: !isV2 && !isV3 && !isV4, isV2, isV3, isV4 };
}
