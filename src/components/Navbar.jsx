import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, Menu, User } from "lucide-react";
import logo from "../assets/medava_logo.svg";

export default function Navbar({ searchValue = "", onSearchValueChange, onSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Left Section - Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src={logo} alt="Medava logo" className="w-11 h-11" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-gray-900 lowercase">medava</span>
              <span className="px-2 py-1 text-[0.65rem] font-semibold tracking-[0.24em] uppercase text-brand-green bg-brand-green/10 rounded-full">
                share
              </span>
            </div>
          </Link>

          {/* Center Section - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <form onSubmit={handleSubmit} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchValueChange?.(e.target.value)}
                placeholder="Cerca dispositivi medici, città, categoria..."
                className="w-full pr-24 pl-10 py-2.5 rounded-full border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green/90"
              >
                Cerca
              </button>
            </form>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2 font-semibold text-brand-green border border-brand-green rounded-full hover:bg-brand-light transition-colors">
              + Aggiungi dispositivo
            </button>
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-5 h-5" />
            </button>
            <button className="hidden md:flex p-2 items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchValueChange?.(e.target.value)}
              placeholder="Cerca dispositivi medici, città, categoria..."
              className="w-full pr-24 pl-10 py-2.5 rounded-full border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green/90"
            >
              Cerca
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}