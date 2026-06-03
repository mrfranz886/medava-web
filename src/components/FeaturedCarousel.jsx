import { ChevronRight } from "lucide-react";
import { useRef } from "react";
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
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {medavaProEquipment.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-soft-lg transition-shadow duration-200 cursor-pointer group"
                onClick={() => navigate(`/listing/${item.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/listing/${item.id}`);
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={item.images?.[0] ?? item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
                    In Evidenza
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.city}</span>
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
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">
                      €{item.pricePerDay}
                      <span className="text-xs font-normal text-gray-600">/day</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-brand-green font-semibold">
                      <img src={logo} alt="Medava logo" className="w-4 h-4" />
                      medava Verified
                    </span>
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
