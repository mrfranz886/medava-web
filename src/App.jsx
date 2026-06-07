import { BrowserRouter, Routes, Route } from "react-router-dom";
import Share from "./pages/Share";
import Listing from "./pages/Listing";
import LandingPage from "./pages/LandingPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share" element={<Share />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}