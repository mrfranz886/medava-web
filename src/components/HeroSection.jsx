export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-brand-light via-white to-white py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Il Marketplace B2B dei{" "}
                <span className="text-brand-green">Dispositivi Medici</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Noleggia dispositivi professionali da medici e cliniche.
              </p>  
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">  
                Nessun leasing. Nessun contratto a lungo termine.
              </p>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                { icon: "🏥", text: "100+ Dispositivi" },
                { icon: "✅", text: "Professionisti Verificati" },
                { icon: "⚡", text: "Prenotazioni rapide" },
                { icon: "🛡️", text: "Protezione Medava" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-soft"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="font-semibold text-gray-800">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-brand-green text-white font-semibold rounded-full hover:shadow-soft-lg transition-shadow">
                Tutti i dispositivi
              </button>
              <button className="px-8 py-3 border-2 border-brand-green text-brand-green font-semibold rounded-full hover:bg-brand-light transition-colors">
                Pubblica il tuo dispositivo
              </button>
            </div>
          </div>

          {/* Right Side - Illustration Space */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/5 rounded-3xl h-96 flex items-center justify-center border-2 border-brand-green/20">
              <div className="text-center space-y-4">
                <div className="text-6xl">🏥</div>
                <p className="text-gray-500 font-medium">Premium Medical Equipment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
