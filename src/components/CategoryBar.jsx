import { useRef } from "react";
import {
  Zap,
  PieChart,
  Heart,
  Smile,
  Lightbulb,
  Eye,
  Wind,
  SquareStack,
} from "lucide-react";

const categoryIcons = {
  All: SquareStack,
  Ultrasound: Zap,
  MRI: PieChart,
  Cardiology: Heart,
  Dermatology: Smile,
  Dentistry: Lightbulb,
  Ophthalmology: Eye,
  Pulmonology: Wind,
};

export default function CategoryBar({ selectedCategory, onCategoryChange, categories }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const getPageX = (e) => {
    if (e.touches) return e.touches[0].pageX;
    return e.pageX;
  };

  const handleDragStart = (e) => {
    if (e.type === "mousedown" && e.button !== 0) return;
    isDragging.current = true;
    startX.current = getPageX(e);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = getPageX(e);
    const walk = startX.current - x;
    scrollRef.current.scrollLeft = scrollLeft.current + walk;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="sticky top-[72px] z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-4 py-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onTouchCancel={handleDragEnd}
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Zap;
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-green text-white shadow-soft"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
