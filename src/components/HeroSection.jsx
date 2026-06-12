import MedavaHeroLogo from "../components/MedavaHeroLogo";

export default function HeroSection() {
  return (
    <div
      className="relative w-full pt-0 px-8 pb-8 md:px-16 md:pb-16 lg:px-24 lg:pb-24"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative overflow-hidden bg-white border-black border-x-[10px] border-b-[10px] border-t-0 py-5 lg:py-6 shadow-2xl rounded-b-lg">
        
        <style>{`
          @keyframes float-bleed {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-60px, -5px) scale(1.02); }
            66% { transform: translate(10px, 5px) scale(0.98); }
          }
          .animate-float-bleed { animation: float-bleed 40s ease-in-out infinite; }
        `}</style>

        {/* 🌀 CURVED GRADIENT SHAPE */}
        {/* We anchor this to the top-right and use a massive bottom-left radius to create the curve */}
        <div 
          className="absolute top-0 right-0 w-[60%] h-full pointer-events-none z-0"
          style={{
            background: 'linear-gradient(135deg, #6b8f73 0%, transparent 80%)',
            borderBottomLeftRadius: '100% 100%',
          }}
        />

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">

            <div className="space-y-6 relative z-10">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
                  Il Marketplace B2B dei{" "}
                  <span className="text-brand-green">Dispositivi Medici</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-800 font-medium max-w-md mx-auto lg:mx-0">
                  Noleggia apparecchiature professionali in totale sicurezza tra cliniche e medici verificati.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📄", text: "Contratti" },
                  { icon: "🛡️", text: "Assicurazione" },
                  { icon: "💳", text: "Pagamenti" },
                  { icon: "🚚", text: "Logistica" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="font-semibold text-sm text-gray-900">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-brand-green text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
                  Esplora dispositivi
                </button>
                <button className="px-8 py-3 bg-white border-2 border-brand-green text-brand-green font-semibold rounded-full hover:bg-brand-light transition-colors">
                  Pubblica dispositivo
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-end relative overflow-visible z-0">
              <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-green/10 blur-[90px] animate-float-bleed mix-blend-multiply pointer-events-none" />
              <div className="relative w-[480px] h-[480px] -mr-16 animate-float-bleed pointer-events-none">
                <MedavaHeroLogo />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}