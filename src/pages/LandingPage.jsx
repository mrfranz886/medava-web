import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import mockEquipment from "../data/mockEquipment";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      <Hero navigate={navigate} />
      <Problem />
      <HowItWorks />
      <MarketplaceCTA navigate={navigate} />
      <WhyMedava />
      <Shield />
      <Waitlist />
      <FAQ />
      <FinalCTA navigate={navigate} />
    </div>
  );
}

function Hero({ navigate }) {
  return (
    <section className="bg-white py-24 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
        Noleggia dispositivi medici tra professionisti
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        Medava è il marketplace che permette ai professionisti sanitari di condividere e noleggiare dispositivi medici in modo semplice e sicuro.
      </p>

      <div className="mt-8 flex gap-4 justify-center flex-wrap">
        <button
          onClick={() => navigate("/share")}
          className="rounded-full bg-brand-green text-white px-6 py-3 font-semibold"
        >
          Esplora il marketplace
        </button>

        <button className="rounded-full border border-gray-300 px-6 py-3 font-semibold">
          Pubblica un dispositivo
        </button>
      </div>

      <div className="mt-10 text-sm text-gray-500 flex justify-center gap-6 flex-wrap">
        <span>✔ Professionisti verificati</span>
        <span>✔ Dispositivi certificati</span>
        <span>✔ Protezione Medava Shield</span>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    {
      title: "Costi elevati",
      text: "Acquistare dispositivi usati raramente non è efficiente.",
    },
    {
      title: "Strumenti inutilizzati",
      text: "Molti dispositivi restano fermi per mesi.",
    },
    {
      title: "Mancanza di fiducia",
      text: "Il mercato attuale è poco trasparente.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800">Il problema</h2>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i.title} className="bg-white p-6 rounded-3xl border">
            <h3 className="font-semibold text-lg">{i.title}</h3>
            <p className="text-gray-600 mt-2">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "📋", title: "Cerca o pubblica" },
    { icon: "🔒", title: "Verifica professionisti" },
    { icon: "🤝", title: "Noleggia in sicurezza" },
  ];

  return (
    <section className="py-20 bg-white px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Come funziona</h2>

      <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
        {steps.map((s) => (
          <div key={s.title} className="p-6 bg-slate-50 rounded-3xl border">
            <div className="text-3xl">{s.icon}</div>
            <p className="mt-3 font-semibold">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketplaceCTA({ navigate }) {
  return (
    <section className="py-20 px-6 text-center bg-white">
      <h2 className="text-3xl font-bold text-gray-800">
        Il marketplace è già attivo
      </h2>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Stiamo costruendo la rete di professionisti e dispositivi. Puoi già esplorare la piattaforma e vedere i primi annunci reali.
      </p>

      <div className="mt-8 flex gap-4 justify-center flex-wrap">
        <button
          onClick={() => navigate("/share")}
          className="bg-brand-green text-white px-6 py-3 rounded-full font-semibold"
        >
          Vai al marketplace
        </button>

      </div>
    </section>
  );
}

function WhyMedava() {
  const items = [
    { title: "Accesso flessibile", text: "Usa dispositivi quando servono." },
    { title: "Nuove entrate", text: "Monetizza strumenti inutilizzati." },
    { title: "Community verificata", text: "Solo professionisti sanitari." },
    { title: "Sicurezza", text: "Verifiche e protezione integrata." },
  ];

  return (
    <section className="py-20 bg-slate-50 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Perché Medava</h2>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {items.map((i) => (
          <div key={i.title} className="bg-white p-6 rounded-3xl border">
            <h3 className="font-semibold">{i.title}</h3>
            <p className="text-gray-600 mt-2">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Shield() {
  return (
    <section className="py-20 bg-brand-green/5 text-center px-6">
      <h2 className="text-3xl font-bold text-gray-800">Medava Shield</h2>
      <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
        Protezione integrata per ogni noleggio: verifiche, supporto e sicurezza.
      </p>
    </section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-gray-800">Accesso anticipato Medava</h2>

      <p className="mt-3 text-gray-600">
        Entra nella prima versione del marketplace
      </p>

      <div className="mt-6 flex justify-center gap-2">
        <input
          className="border rounded-full px-5 py-3 w-80"
          placeholder="email@studio-medico.it"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-brand-green text-white px-6 py-3 rounded-full font-semibold">
          Unisciti
        </button>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Chi può usare Medava?", a: "Solo professionisti sanitari verificati." },
    { q: "Come funziona la verifica?", a: "Controlli documentali e professionali." },
    { q: "Cos’è Medava Shield?", a: "Protezione per ogni transazione." },
  ];

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center">FAQ</h2>

      <div className="mt-10 space-y-6">
        {items.map((f) => (
          <div key={f.q} className="border-b pb-4">
            <p className="font-semibold">{f.q}</p>
            <p className="text-gray-600 mt-2">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({ navigate }) {
  return (
    <section className="py-24 bg-gray-900 text-white text-center px-6">
      <h2 className="text-3xl font-bold">
        Inizia a usare il valore delle tue attrezzature
      </h2>

      <button
        onClick={() => navigate("/share")}
        className="mt-8 bg-brand-green px-6 py-3 rounded-full font-semibold"
      >
        Esplora il marketplace
      </button>
    </section>
  );
}