import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  );
}