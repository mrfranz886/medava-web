import { ChevronRight, MapPin } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mockEquipment from "../data/mockEquipment";
import logo from "../assets/medava_logo.svg";

export default function FeaturedCarousel() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const medavaProEquipment = mockEquipment.filter((item) => item.medavaPro);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;
    if (!container) return;

    // Pause auto-scrolling while user-triggered scroll happens
    pauseAutoScrollTemporarily(1200);

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const resumeTimeout = useRef(null);
  const movedDuringDrag = useRef(false);
  const pointerDownTargetId = useRef(null);

  const pauseAutoScrollTemporarily = (ms = 1000) => {
    isPaused.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      isPaused.current = false;
      resumeTimeout.current = null;
    }, ms);
  };

  useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;

  const speed = 0.7; // adjust speed here

  let animationFrame;

  const animate = () => {
    if (!isPaused.current) {
      container.scrollLeft += speed;

      const halfWidth = container.scrollWidth / 2;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      }
    }

    animationFrame = requestAnimationFrame(animate);
  };

  animationFrame = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrame);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };
}, []);
  
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ⭐ Dispositivi in Evidenza
            </h2>
            <p className="text-gray-600">
              Dispositivi di alta qualità da professionisti medici verificati
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all">
            Vedi Tutti <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ touchAction: "pan-y" }}
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
          onPointerDown={(e) => {
            const container = scrollRef.current;
            if (!container) return;
            isDragging.current = true;
            dragStartX.current = e.clientX;
            dragStartScroll.current = container.scrollLeft;
            movedDuringDrag.current = false;
            pointerDownTargetId.current = e.target.closest?.("[data-listing-id]")?.dataset?.listingId ?? null;
            container.setPointerCapture?.(e.pointerId);
            pauseAutoScrollTemporarily(2000);
          }}
          onPointerMove={(e) => {
            const container = scrollRef.current;
            if (!container || !isDragging.current) return;
            const dx = e.clientX - dragStartX.current;
            if (Math.abs(dx) > 6) movedDuringDrag.current = true;
            container.scrollLeft = dragStartScroll.current - dx;
          }}
          onPointerUp={(e) => {
            const container = scrollRef.current;
            if (!container) return;
            // If pointer did not move significantly, treat as a click/tap
            const targetId = pointerDownTargetId.current;
            if (!movedDuringDrag.current && targetId) {
              navigate(`/listing/${targetId}`);
            }

            isDragging.current = false;
            pointerDownTargetId.current = null;
            container.releasePointerCapture?.(e.pointerId);
            pauseAutoScrollTemporarily(1200);
          }}
          onPointerCancel={(e) => {
            const container = scrollRef.current;
            if (!container) return;
            isDragging.current = false;
            container.releasePointerCapture?.(e.pointerId);
            pauseAutoScrollTemporarily(1200);
          }}
          onPointerLeave={(e) => {
            // If pointer leaves while dragging, end drag
            if (!isDragging.current) return;
            const container = scrollRef.current;
            isDragging.current = false;
            container?.releasePointerCapture?.(e.pointerId);
            pauseAutoScrollTemporarily(1200);
          }}
        >
            {[...medavaProEquipment, ...medavaProEquipment].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                data-listing-id={item.id}
                className="relative flex-shrink-0 w-[355px] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
              <div className="relative h-80 overflow-hidden bg-gray-200">
                <img
                  src={item.images?.[0] ?? item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* MEDAVA PRO badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-full border border-white/20 shadow-lg">
                  <img src={logo} className="w-4 h-4 brightness-0 invert" />
                  <span className="text-xs font-semibold tracking-wide">
                    medava PRO
                  </span>
                </div>

                {/* PRICE */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">
                    €{item.pricePerDay}
                  </div>
                  <div className="text-xs text-white/80">
                    al giorno
                  </div>
                </div>
              </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {item.city}
                    </span>

                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-900">
                        {item.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>

                  {/* VERIFIED BADGE (FIXED POSITION) */}
                  <div className="flex items-center gap-1 text-xs text-brand-green font-semibold">
                    <img src={logo} alt="Medava logo" className="w-4 h-4" />
                    Medava Verified
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-300 rounded-full hover:shadow-soft hover:border-gray-400 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-300 rounded-full hover:shadow-soft hover:border-gray-400 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
