import { ChevronDown } from "lucide-react";
import { useState } from "react";
import EquipmentCard from "./EquipmentCard";

export default function ListingsGrid({ equipment, city = "Naples", count = 8 }) {
  const [sortBy, setSortBy] = useState("relevant");

  const sortedEquipment = [...equipment].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerDay - b.pricePerDay;
      case "price-high":
        return b.pricePerDay - a.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      case "relevant":
      default:
        return 0;
    }
  });

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Tutti i dispositivi
            </h2>
            <p className="text-gray-600">
              {equipment.length} Dispositivi disponibili a {city}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-56">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="relevant">Più rilevanti</option>
              <option value="price-low">Prezzo più basso</option>
              <option value="price-high">Prezzo più alto</option>
              <option value="rating">Valutazione più alta</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Equipment Grid */}
        {equipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedEquipment.map((item) => (
              <EquipmentCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.images?.[0] ?? item.image}
                city={item.city}
                distance={item.distance}
                rating={item.rating}
                reviews={item.reviews}
                pricePerDay={item.pricePerDay}
                medavaPro={item.medavaPro}
                verified={item.verified}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">
              Nessun dispositivo trovato. Prova a cambiare il filtro della tua ricerca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
