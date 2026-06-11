import MedavaHeroLogo from "../components/MedavaHeroLogo";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-brand-light via-white to-white py-16 md:py-24 lg:py-28 overflow-hidden relative">
      
      {/* 🌬️ SLOWER DYNAMIC BLEED ANIMATION (Increased from 18s to 40s) */}
      <style>{`
        @keyframes float-bleed {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(-120px, -20px) scale(1.05);
          }
          66% {
            transform: translate(40px, 20px) scale(0.98);
          }
        }
        .animate-float-bleed {
          animation: float-bleed 40s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 relative z-10">
            <div className="space-y-4 flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight drop-shadow-sm">
                Il Marketplace B2B dei{" "}
                <span className="text-brand-green">Dispositivi Medici</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed max-w-lg">
                Noleggia dispositivi professionali da medici e cliniche.
              </p>

              <div className="space-y-1 text-gray-600">
                <p className="text-lg md:text-xl leading-relaxed max-w-lg">
                  Nessun leasing.
                </p>
                <p className="text-lg md:text-xl leading-relaxed max-w-lg">
                  Nessun contratto a lungo termine.
                </p>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                { icon: "🏥", text: "Dispositivi Certificati" },
                { icon: "✅", text: "Professionisti Verificati" },
                { icon: "⚡", text: "Prenotazioni rapide" },
                { icon: "🛡️", text: "Protezione Medava" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-soft hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="font-semibold text-gray-800">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full lg:w-auto">
              <button className="px-8 py-3 bg-brand-green text-white font-semibold rounded-full shadow-lg shadow-brand-green/30 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Tutti i dispositivi
              </button>

              <button className="px-8 py-3 bg-white border-2 border-brand-green text-brand-green font-semibold rounded-full hover:bg-brand-light transition-colors w-full sm:w-auto">
                Pubblica il tuo dispositivo
              </button>
            </div>
          </div>

          {/* Right Side - Animated Logo */}
          <div className="hidden lg:flex items-center justify-start relative overflow-visible z-0">

            {/* BIGGER GLOW */}
            <div className="absolute w-[750px] h-[750px] rounded-full bg-brand-green/15 blur-[150px] animate-float-bleed mix-blend-multiply pointer-events-none" />

            {/* LOGO CONTAINER */}
            <div className="relative w-[900px] h-[900px] -ml-40 animate-float-bleed pointer-events-none">
              <MedavaHeroLogo />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}