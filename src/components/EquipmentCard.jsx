import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/medava_logo.svg";

export default function EquipmentCard({
  id,
  title,
  image,
  city,
  distance,
  rating,
  reviews,
  pricePerDay,
  medavaPro,
  verified,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-soft-lg transition-all duration-200 group cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/listing/${id}#photos`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/listing/${id}#photos`);
      }}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-soft hover:shadow-soft-lg transition-all"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Medava Pro Badge */}
        {medavaPro && (
          <div className="absolute bottom-3 left-3 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
            🏅 Medava Pro
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-gray-900 line-clamp-2 text-base">
          {title}
        </h3>

        {/* Metadata */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">{city}</p>
          <p className="text-gray-500 text-xs">{distance}</p>
          {verified && (
            <p className="inline-flex items-center gap-1 text-brand-green text-xs font-semibold">
              <img src={logo} alt="Medava logo" className="w-4 h-4" />
              Medava Verified
            </p>
          )}
        </div>

        {/* Bottom Section - Rating & Price */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="font-semibold text-gray-900">{rating}</span>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900">
              €{pricePerDay}
              <span className="text-xs font-normal text-gray-600">/giorno</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
