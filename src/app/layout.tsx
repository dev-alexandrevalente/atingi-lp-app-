import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atingi — Inteligência de Execução para Empresas em Crescimento",
  description:
    "Sua empresa tem metas. Mas quantas estão sendo executadas? O Atingi transforma gestão de metas em execução real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSans.variable}`} suppressHydrationWarning>
      <head>
        {/* 🔒 CRITICAL: Capture raw UTM params BEFORE anything else (GTM, React, Cloudflare) can modify them */}
        <Script id="utm-guard" strategy="beforeInteractive">{`
          (function() {
            var qs = window.location.search;
            var params = {};
            var keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck','fbclid','gclid','ttclid'];
            if (qs) {
              var sp = new URLSearchParams(qs);
              keys.forEach(function(k) {
                var v = sp.get(k);
                if (v) {
                  params[k] = v;
                  try { sessionStorage.setItem('atingi_track_' + k, v); } catch(e) {}
                }
              });
            }
            window.__RAW_ENTRY_PARAMS__ = params;
            if (Object.keys(params).length > 0) {
              console.log('[UTM-GUARD] Captured ORIGINAL params from URL before GTM/React:', params);
            }
          })();
        `}</Script>

        {/* Initialize dataLayer BEFORE GTM loads */}
        <Script id="datalayer-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
        `}</Script>

        {/* Performance preloads */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRFLBL7T"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* Google Tag Manager — afterInteractive ensures GTM is ready before any lead event fires */}
        <Script id="gtm-load" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MRFLBL7T');
        `}</Script>
      </body>
    </html>
  );
}
