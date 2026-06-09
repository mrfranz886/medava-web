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
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}