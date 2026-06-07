import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Tag } from "lucide-react";
import mockEquipment from "../data/mockEquipment";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import logo from "../assets/medava_logo.svg";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default function Listing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = mockEquipment.find((eq) => eq.id === Number(id));
  const images = item?.images ?? [item?.image];
  const minimumRentalDays = item?.minimumRentalDays ?? 1;
  const unavailableDates = item?.unavailableDates ?? [];

  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const catRef = useRef(null);
  const categories = ["All", ...new Set(mockEquipment.map((item) => item.category))];

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [selectedRange, setSelectedRange] = useState();
  const [bookingSubtotal, setBookingSubtotal] = useState(0);
  const [bookingCommission, setBookingCommission] = useState(0);
  const [bookingTotal, setBookingTotal] = useState(0);
  const commissionRate = 0.12;

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-20 text-center">
          <p className="text-xl font-semibold text-gray-700">Listing non trovato</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full border border-brand-green bg-white px-5 py-3 text-brand-green font-semibold hover:bg-brand-green/10"
          >
            Torna alla home
          </button>
        </div>
      </div>
    );
  }

  const pricePerDay = item.pricePerDay ?? Number(item.price?.replace(/[^0-9]/g, "") || 0);
  const selectedDays =
    selectedRange?.from && selectedRange?.to
      ? Math.round((selectedRange.to - selectedRange.from) / MS_PER_DAY) + 1
      : 0;

  useEffect(() => {
    if (!selectedRange?.from || !selectedRange?.to) {
      setBookingSubtotal(0);
      setBookingCommission(0);
      setBookingTotal(0);
      return;
    }
    const subtotal = selectedDays * pricePerDay;
    const commission = subtotal * commissionRate;
    const total = subtotal + commission;
    setBookingSubtotal(subtotal);
    setBookingCommission(commission);
    setBookingTotal(total);
  }, [selectedRange, selectedDays, pricePerDay]);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (!range?.from || !range?.to) return;

    const days = Math.round((range.to - range.from) / MS_PER_DAY) + 1;
    if (days < minimumRentalDays) {
      alert(`Minimum rental is ${minimumRentalDays} days`);
    }
  };

  const formatDate = (date) =>
    date?.toLocaleDateString("it-IT", { day: "numeric", month: "short" });

  const formatEUR = (num) =>
    Number(num || 0).toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const path = category === "All" ? "/#listing-anchor" : `/?category=${encodeURIComponent(category)}#listing-anchor`;
    navigate(path);
  };

  const handleSearch = () => {
    const path = searchInput.trim()
      ? `/?q=${encodeURIComponent(searchInput.trim())}#listing-anchor`
      : "/#listing-anchor";
    navigate(path);
  };

  const equipment = mockEquipment.find(
  (item) => item.id === Number(id)
  );

  useEffect(() => {
    if (!categoriesOpen) return;
    const onClickOutside = (e) => {
      if (!catRef.current) return;
      if (!catRef.current.contains(e.target)) setCategoriesOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
    };
  }, [categoriesOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        searchValue={searchInput}
        onSearchValueChange={setSearchInput}
        onSearch={handleSearch}
      />

      <div ref={catRef} className="sticky top-[72px] z-40 bg-slate-50 border-b border-gray-200">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            categoriesOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <CategoryBar
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => {
              handleCategoryChange(category);
              setCategoriesOpen(false);
            }}
            categories={categories}
          />
        </div>

        {!categoriesOpen && (
          <div className="flex justify-center border-t border-gray-200 bg-slate-50 py-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setCategoriesOpen(true);
              }}
              className="flex items-center justify-center rounded-full bg-white border border-gray-200 p-3 text-brand-green shadow-sm hover:bg-gray-50"
              aria-label="Open categories"
            >
              <Tag className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="mt-2 grid gap-8 lg:grid-cols-[1.9fr_1fr] items-start">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green/80"
          >
            ← Torna ai risultati
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.9fr_1fr]">
          <section className="space-y-6">
              <div
                id="photos"
                className="relative rounded-[28px] overflow-hidden bg-white shadow-soft"
              >
                {images.length === 1 ? (
                  <div className="h-[520px] bg-white flex items-center justify-center rounded-[28px] overflow-hidden">
                    <img
                      src={images[0]}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain p-4"
                      onClick={() => {
                        setActiveImage(0);
                        setLightboxOpen(true);
                      }}
                    />
                  </div>
                ) : images.length === 2 ? (
                  <div className="grid grid-cols-2 gap-2 p-2 h-[520px]">
                    {images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        className="w-full h-full object-cover rounded-3xl cursor-pointer"
                        onClick={() => {
                          setActiveImage(i);
                          setLightboxOpen(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-4 grid-rows-2 gap-2 p-2 h-[520px]">
                    {/* Main Image */}
                    <div className="col-span-2 row-span-2 overflow-hidden rounded-3xl">
                      <img
                        src={images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition hover:scale-[1.02] transition"
                        onClick={() => {
                          setActiveImage(0);
                          setLightboxOpen(true);
                        }}
                      />
                    </div>

                    {/* Secondary Images */}
                    {images.slice(1, 5).map((src, index) => (
                      <div key={index} className="overflow-hidden rounded-3xl">
                        <img
                          src={src}
                          alt={`${item.title} ${index + 2}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition hover:scale-[1.02] transition"
                          onClick={() => {
                            setActiveImage(index + 1);
                            setLightboxOpen(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
               {/* Open Gallery Button */}
                <button
                 onClick={() => {
                   setActiveImage(0);
                   setLightboxOpen(true);
                 }}
                 className="absolute bottom-6 right-6 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-lg border border-gray-200 hover:bg-gray-50"
                >
                 📷 Mostra tutte le foto
                </button>
              </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                onClick={() => setLightboxOpen(false)}
              >
                <div
                  className="relative max-w-5xl w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute right-3 top-3 z-50 rounded-full bg-white p-2 shadow"
                    onClick={() => setLightboxOpen(false)}
                    aria-label="Close">
                    ✕
                  </button>

                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-2xl text-gray-900 shadow-soft hover:bg-white z-50"
                    onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-2xl text-gray-900 shadow-soft hover:bg-white z-50"
                    onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  >
                    ›
                  </button>

                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={images[activeImage]}
                      alt={`${item.title} full ${activeImage + 1}`}
                      className="w-full max-h-[80vh] object-contain bg-black"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[28px] bg-white p-8 shadow-soft">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold text-gray-900">{item.title}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500">
                      ★ {item.rating} · {item.reviews} recensioni
                    </span>

                    {item.medavaPro && (
                      <div className="inline-flex items-center gap-2 bg-brand-green text-white px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                        <img
                          src={logo}
                          alt="Medava logo"
                          className="w-3.5 h-3.5 brightness-0 invert"
                        />
                        <span className="text-[11px] font-semibold tracking-wider">
                          MEDAVA PRO
                        </span>
                      </div>
                    )}

                    <span className="text-sm text-gray-500">
                      {item.city}
                    </span>
                  </div>
                </div>
                <div className="rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-green">
                  Medava Shield Protection
                </div>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">{item.description}</p>

              {/* Features */}
              <h2 className="mt-8 text-xl font-semibold text-gray-900">
                Caratteristiche
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {item.features?.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-3xl border border-gray-200 bg-slate-50 p-4"
                  >
                    <span className="text-brand-green">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Included */}
              <h2 className="mt-8 text-xl font-semibold text-gray-900">
                Cos'è incluso
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {item.included?.map((included) => (
                  <div
                    key={included}
                    className="flex items-start gap-3 rounded-3xl border border-gray-200 bg-slate-50 p-4"
                  >
                    <span className="text-brand-green">✓</span>
                    <span className="text-sm text-gray-700">{included}</span>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <h2 className="mt-8 text-xl font-semibold text-gray-900">
                Certificazioni
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {item.certifications?.map((certification) => (
                  <div
                    key={certification}
                    className="flex items-start gap-3 rounded-3xl border border-gray-200 bg-slate-50 p-4"
                  >
                    <span className="text-brand-green">✓</span>
                    <span className="text-sm text-gray-700">{certification}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-gray-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-gray-900">Politica di cancellazione</h2>
                <p className="mt-3 text-sm text-gray-600">
                  Cancellazione gratuita fino a 48 ore prima. Rimborso garantito da Medava Shield se la strumentazione non corrisponde alla descrizione.
                </p>
              </div>

              <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-3xl bg-slate-50 p-3">
                    <span className="text-2xl">👩‍⚕️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pubblicato da</p>
                    <p className="font-semibold text-gray-900">Dott.ssa Elena Ferretti</p>
                    <p className="text-sm text-gray-500">Professionista Verificato</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Contatta
                  </button>
                  <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Salva
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="hidden lg:block self-start lg:sticky lg:top-32">
            <div className="sticky top-28 space-y-6">
              
              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-soft">
                
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">A partire da</p>
                    <p className="text-3xl font-bold text-gray-900">€{pricePerDay}</p>
                    <p className="text-sm text-gray-500">al giorno</p>
                  </div>

                  <div className="rounded-full bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-green">
                    ★ {item.rating}
                  </div>
                </div>

                <button
                  onClick={() => setCalendarOpen((open) => !open)}
                  className="mt-6 w-full rounded-3xl border border-gray-200 bg-white px-4 py-4 text-left text-sm font-semibold text-gray-900 hover:border-brand-green"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Scegli date
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <span>{selectedRange?.from ? formatDate(selectedRange.from) : "Data inizio"}</span>
                    <span>{selectedRange?.to ? formatDate(selectedRange.to) : "Data fine"}</span>
                  </div>
                </button>

                {calendarOpen && (
                  <div className="mt-5 rounded-3xl border border-gray-200 bg-slate-50 p-4">
                    <DayPicker
                      mode="range"
                      numberOfMonths={2}
                      selected={selectedRange}
                      onSelect={handleRangeSelect}
                      disabled={unavailableDates}
                    />
                  </div>
                )}

                <div className="mt-6 rounded-3xl border border-gray-200 bg-slate-50 p-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Giorni</span>
                    <span>{selectedDays || minimumRentalDays} giorni</span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm text-gray-600">
                    <span>Commissione Medava</span>
                    <span>
                      {bookingCommission > 0
                        ? `€${formatEUR(bookingCommission)} (${Math.round(commissionRate * 100)}%)`
                        : `${Math.round(commissionRate * 100)}%`}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between text-xl font-semibold text-gray-900">
                    <span>Totale</span>
                    <span>€{formatEUR(bookingTotal || pricePerDay)}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Richiesta di prenotazione inviata (mock).")}
                  className="mt-5 w-full rounded-3xl bg-brand-green px-5 py-4 text-sm font-semibold text-white hover:bg-brand-green/90"
                >
                  Richiedi prenotazione
                </button>

              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}