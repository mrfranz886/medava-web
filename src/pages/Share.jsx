import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import HeroSection from "../components/HeroSection";
import FeaturedCarousel from "../components/FeaturedCarousel";
import ListingsGrid from "../components/ListingsGrid";
import mockEquipment from "../data/mockEquipment";
import PreviewBanner from "../components/PreviewBanner";

export default function Home() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const listingsRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    const query = searchParams.get("q") || "";
    setSearchInput(query);
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    if (location.hash === "#listing-anchor") {
      const timeout = setTimeout(() => {
        listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [location.hash]);

  const categories = ["All", ...new Set(mockEquipment.map((item) => item.category))];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredEquipment = mockEquipment.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ? true : item.category === selectedCategory;
    const matchesSearch =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.city.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
    scrollToListings();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    scrollToListings();
  };

  return (
    <div className="min-h-screen bg-white">
      <PreviewBanner />
      
      <Navbar
        searchValue={searchInput}
        onSearchValueChange={setSearchInput}
        onSearch={handleSearch}
      />

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      <HeroSection />
      <FeaturedCarousel />

      <div ref={listingsRef} id="listing-anchor" className="scroll-mt-28" />

      <ListingsGrid equipment={filteredEquipment} city="Naples" count={8} />

      {/* Footer CTA */}
      <div className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Pronto a condividere i tuoi dispositivi medici?
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unisciti a migliaia di professionisti medici verificati
            che condividono i loro dispositivi su medava Share
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-8 py-3 bg-brand-green text-white font-semibold rounded-full hover:shadow-soft-lg transition-shadow">
              Inizia a Condividere
            </button>
            <button className="px-8 py-3 border-2 border-brand-green text-brand-green font-semibold rounded-full hover:bg-white transition-colors">
              Come funziona
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}