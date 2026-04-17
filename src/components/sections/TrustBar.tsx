/**
 * TrustBar — RSC (ZERO framer-motion, ZERO use-client)
 * Animações via CSS transitions + IntersectionObserver (via global ScrollObserver).
 * FomoMarquee: CSS @keyframes marquee (já definido em globals.css).
 */

/* ═══ Aspirational company logos (SVG) — companies that use OKRs ═══ */
function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M.045 18.02c.072-.116.187-.124.348-.064 2.729 1.391 5.706 2.092 8.93 2.092s6.168-.688 8.815-2.064c.183-.083.344-.048.48.105l.048.092c.12.193.052.36-.192.504a18.71 18.71 0 0 1-4.356 1.664c-1.583.396-3.163.594-4.735.594-1.572 0-3.152-.198-4.735-.594a18.71 18.71 0 0 1-4.356-1.664c-.192-.12-.27-.264-.247-.432v-.233z" fill="#FF9900"/>
      <path d="M6.295 14.43c0-.768.187-1.464.56-2.088a3.78 3.78 0 0 1 1.508-1.44c.636-.36 1.356-.612 2.16-.756.804-.144 1.644-.216 2.52-.216.696 0 1.44.06 2.232.18v-.432c0-.54-.12-.972-.36-1.296-.24-.324-.66-.504-1.26-.576l-.192-.012c-.54 0-1.14.06-1.8.18-.66.12-1.26.3-1.8.54-.156.06-.276.072-.36.036a.301.301 0 0 1-.18-.168l-.384-.816a.409.409 0 0 1-.024-.252c.024-.084.084-.156.18-.216 1.08-.66 2.52-.996 4.32-.996.72 0 1.344.072 1.872.216.528.144.972.36 1.332.648.36.288.624.66.792 1.116.168.456.252 1.008.252 1.656v4.608c0 .228.084.348.252.36h.036c.072 0 .18-.036.324-.108l.252.612c-.432.444-1.044.672-1.836.684-.504 0-.888-.108-1.152-.324a1.514 1.514 0 0 1-.504-.756 4.687 4.687 0 0 1-1.476 1.02c-.564.24-1.188.36-1.872.36-.9 0-1.62-.264-2.16-.792-.54-.528-.792-1.2-.792-2.016zm3.324.252c0 .432.12.768.36 1.008.24.24.576.36 1.008.36.72 0 1.368-.36 1.944-1.08v-1.68c-.48-.12-.972-.18-1.476-.18-.54 0-1.02.108-1.44.324-.276.18-.396.564-.396 1.068v.18z" fill="#FFF"/>
    </svg>
  );
}

function SpotifyLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.56 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.021 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function NubankLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#820AD1">
      <path d="M8.004 0C4.954 0 2.742.672 1.476 1.928.576 2.828 0 4.108 0 5.812v12.376C0 19.892.576 21.172 1.476 22.072 2.742 23.328 4.954 24 8.004 24h7.992c3.05 0 5.262-.672 6.528-1.928.9-.9 1.476-2.18 1.476-3.884V5.812c0-1.704-.576-2.984-1.476-3.884C21.258.672 19.046 0 15.996 0H8.004zm6.024 5.88c1.488 0 2.664.42 3.516 1.26.852.84 1.296 2.016 1.296 3.528v2.664c0 1.512-.444 2.688-1.296 3.528-.852.84-2.028 1.26-3.516 1.26s-2.664-.42-3.516-1.26c-.852-.84-1.296-2.016-1.296-3.528v-2.664c0-1.512.444-2.688 1.296-3.528.852-.84 2.028-1.26 3.516-1.26z"/>
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const FOMO_LOGOS = [
  { name: "Google", Logo: GoogleLogo },
  { name: "Amazon", Logo: AmazonLogo },
  { name: "Spotify", Logo: SpotifyLogo },
  { name: "Nubank", Logo: NubankLogo },
  { name: "LinkedIn", Logo: LinkedInLogo },
];

/* ═══ CSS-only infinite scroll marquee ═══ */
function FomoMarquee() {
  const allLogos = [...FOMO_LOGOS, ...FOMO_LOGOS, ...FOMO_LOGOS];

  return (
    <div className="flex items-center gap-10 animate-marquee">
      {allLogos.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white/5 p-1.5 rounded-md backdrop-blur-sm shadow-sm border border-white/10">
            <item.Logo />
          </div>
          <span className="text-[14px] md:text-[15px] font-bold text-white tracking-wide">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="relative py-0 bg-[#f2f2f5]">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* ═══ DESKTOP VERSION ═══ */}
        <div
          className="reveal relative overflow-hidden rounded-3xl hidden md:block"
          style={{
            backgroundColor: "#0c111d",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.15)"
          }}
        >
          {/* Animated glow effects — pure CSS keyframes blur */}
          <div
            className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#02CE37]/15 rounded-full blur-[100px] pointer-events-none"
            style={{ animation: "orb-pulse 6s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-[-100px] left-0 w-[300px] h-[200px] bg-[#02CE37]/10 rounded-full blur-[80px] pointer-events-none"
            style={{ animation: "orb-pulse 8s ease-in-out infinite 1s" }}
          />

          <div className="relative z-10 flex flex-row items-center gap-0 px-14 py-10">
            {/* Left: FOMO headline */}
            <div className="reveal reveal-d1 flex-shrink-0 w-[45%] text-left">
              <p className="text-[22px] text-white leading-tight mb-4 tracking-tight">
                Gerencie metas e OKRs como as <br className="hidden md:block" />
                <span className="font-extrabold text-[#02CE37]">maiores empresas do mundo</span>
              </p>

              <div className="reveal reveal-d2 flex items-center gap-7 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm w-fit">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[24px] font-black text-white">500+</span>
                  <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest leading-tight">clientes</span>
                </div>
                <div className="w-px h-8 bg-white/15" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[24px] font-black text-white">12k+</span>
                  <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest leading-tight">metas</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-10 flex-shrink-0" />

            {/* Right: Aspirational logos marquee */}
            <div className="reveal reveal-d2 flex-1 overflow-hidden w-full">
              <div className="flex items-center gap-3 mb-5 justify-start">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">Frameworks base</span>
                <div className="w-8 h-px bg-white/20" />
              </div>
              <div className="overflow-hidden relative">
                {/* Gradient masks */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0c111d] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0c111d] to-transparent z-10" />
                <FomoMarquee />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE VERSION ═══ */}
        <div
          className="reveal relative overflow-hidden rounded-2xl md:hidden"
          style={{
            backgroundColor: "#0c111d",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 16px 60px rgba(0,0,0,0.15)"
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#02CE37]/15 rounded-full blur-[80px] pointer-events-none"
            style={{ animation: "orb-pulse 6s ease-in-out infinite" }}
          />

          <div className="relative z-10 px-6 py-7 flex flex-col items-center text-center">
            {/* Headline */}
            <p className="reveal text-[18px] text-white leading-snug mb-5 tracking-tight">
              Gerencie metas e OKRs como as <br className="hidden md:block" />
              <span className="font-extrabold text-[#02CE37]">maiores empresas do mundo</span>
            </p>

            {/* Stats row */}
            <div className="reveal reveal-d1 flex items-center gap-5 bg-white/5 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-sm mb-6">
              <div className="text-center">
                <span className="block text-[22px] font-black text-white leading-none">500+</span>
                <span className="block text-[10px] font-semibold text-white/50 uppercase tracking-wider mt-0.5">clientes</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <span className="block text-[22px] font-black text-white leading-none">12k+</span>
                <span className="block text-[10px] font-semibold text-white/50 uppercase tracking-wider mt-0.5">metas</span>
              </div>
            </div>

            {/* Logo marquee */}
            <div className="reveal reveal-d2 w-[calc(100%+3rem)] -mx-6 relative">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <div className="w-6 h-px bg-white/20" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Frameworks base</span>
                <div className="w-6 h-px bg-white/20" />
              </div>
              <div className="overflow-hidden relative w-full">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0c111d] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0c111d] to-transparent z-10 pointer-events-none" />
                <FomoMarquee />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
