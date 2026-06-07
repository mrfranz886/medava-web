import ecg1 from "../assets/listings/ecg-1.jpg";
import ecg2 from "../assets/listings/ecg-2.jpg";
import ecg3 from "../assets/listings/ecg-3.jpg";
import us1 from "../assets/listings/ultrasound-1.jpg";
import us2 from "../assets/listings/ultrasound-2.jpg";
import us3 from "../assets/listings/ultrasound-3.jpg";
import us4 from "../assets/listings/ultrasound-4.jpg";
import mo1 from "../assets/listings/Morpheus/Morpheus-8.png";
import mo2 from "../assets/listings/Morpheus/Morpheus-8_2.jpg";
import mo3 from "../assets/listings/Morpheus/Morpheus8_3.avif";
import mo4 from "../assets/listings/Morpheus/Morpheus-8_4.jpg";

const mockEquipment = [
  {
    id: 1,
    title: "inmode Morpheus8",
    category: "Skin",
    city: "Napoli",
    rating: 4.8,
    reviews: 24,
    pricePerDay: 500,
    images: [mo1, mo2, mo3, mo4],
    distance: "2.3 km da te",
    verified: true,
    medavaPro: true,
    description: "Morpheus8 è una piattaforma minimamente invasiva Modulare a RF frazionata per il rimodellamento dell’adipe sottocutaneo del viso e del corpo.",
    features: [
      "Tecnologia Combinata: Sfrutta il danno controllato dei microaghi per il microneedling, unito all'energia termica della radiofrequenza, che riscalda gli strati più profondi (sottocutanei)",
      "Profondità Programmabile: I manipoli possono raggiungere profondità precise e variabili da 2 mm a 8 mm, rendendolo adatto sia per il viso che per il corpo",
      "Rimodellamento Adiposo: Oltre al rassodamento cutaneo, agisce come SARD (Rimodellamento Adiposo Sottocutaneo), riducendo il grasso localizzato nelle aree più piccole (es. doppio mento)",
      "Aree Trattabili: Viso, collo, décolleté, braccia, addome, glutei e interno cosce",
      "Indicazioni: Tratta rughe profonde, lassità cutanea, cicatrici da acne, smagliature e irregolarità della texture"
    ],
    included: [
      "Manipolo sterile e monouso: Testina dotata di micro-aghi (variabili a seconda della zona)",
      "Case di trasporto",
      "Manuale d'uso"
    ],
    certifications: [
      "Marchio CE",
      "Libretto manutenzione"
    ]
  },
  
  {
    id: 2,
    title: "inmode Morpheus8",
    category: "Skin",
    city: "Napoli",
    rating: 4.8,
    reviews: 24,
    pricePerDay: 500,
    images: [mo1, mo2, mo3, mo4],
    distance: "2.3 km da te",
    verified: true,
    medavaPro: false,
    description: "Morpheus8 è una piattaforma minimamente invasiva Modulare a RF frazionata per il rimodellamento dell’adipe sottocutaneo del viso e del corpo.",
    features: [
      "Tecnologia Combinata: Sfrutta il danno controllato dei microaghi per il microneedling, unito all'energia termica della radiofrequenza, che riscalda gli strati più profondi (sottocutanei)",
      "Profondità Programmabile: I manipoli possono raggiungere profondità precise e variabili da 2 mm a 8 mm, rendendolo adatto sia per il viso che per il corpo",
      "Rimodellamento Adiposo: Oltre al rassodamento cutaneo, agisce come SARD (Rimodellamento Adiposo Sottocutaneo), riducendo il grasso localizzato nelle aree più piccole (es. doppio mento)",
      "Aree Trattabili: Viso, collo, décolleté, braccia, addome, glutei e interno cosce",
      "Indicazioni: Tratta rughe profonde, lassità cutanea, cicatrici da acne, smagliature e irregolarità della texture"
    ],
    included: [
      "Manipolo sterile e monouso: Testina dotata di micro-aghi (variabili a seconda della zona)",
      "Case di trasporto",
      "Manuale d'uso"
    ],
    certifications: [
      "Marchio CE",
      "Libretto manutenzione"
    ]
  },
  {
    id: 3,
    title: "inmode Morpheus8",
    category: "Skin",
    city: "Napoli",
    rating: 4.8,
    reviews: 24,
    pricePerDay: 500,
    images: [mo1, mo2, mo3, mo4],
    distance: "2.3 km da te",
    verified: true,
    medavaPro: true,
    description: "Morpheus8 è una piattaforma minimamente invasiva Modulare a RF frazionata per il rimodellamento dell’adipe sottocutaneo del viso e del corpo.",
    features: [
      "Tecnologia Combinata: Sfrutta il danno controllato dei microaghi per il microneedling, unito all'energia termica della radiofrequenza, che riscalda gli strati più profondi (sottocutanei)",
      "Profondità Programmabile: I manipoli possono raggiungere profondità precise e variabili da 2 mm a 8 mm, rendendolo adatto sia per il viso che per il corpo",
      "Rimodellamento Adiposo: Oltre al rassodamento cutaneo, agisce come SARD (Rimodellamento Adiposo Sottocutaneo), riducendo il grasso localizzato nelle aree più piccole (es. doppio mento)",
      "Aree Trattabili: Viso, collo, décolleté, braccia, addome, glutei e interno cosce",
      "Indicazioni: Tratta rughe profonde, lassità cutanea, cicatrici da acne, smagliature e irregolarità della texture"
    ],
    included: [
      "Manipolo sterile e monouso: Testina dotata di micro-aghi (variabili a seconda della zona)",
      "Case di trasporto",
      "Manuale d'uso"
    ],
    certifications: [
      "Marchio CE",
      "Libretto manutenzione"
    ]
  },
  {
    id: 4,
    title: "Nd:YAG Dermatology Laser",
    category: "Dermatology",
    city: "Naples",
    rating: 4.6,
    reviews: 14,
    pricePerDay: 200,
    images: [us3, us1],
    distance: "2.9 km from center",
    verified: true,
    medavaPro: false,
    description: "Professional laser for skin treatments and tattoo removal.",
    maintenance: "Certified, quarterly maintenance",
  },
  {
    id: 5,
    title: "Kavo Estetica Dental Unit",
    category: "Dentistry",
    city: "Naples",
    rating: 4.8,
    reviews: 27,
    pricePerDay: 150,
    images: [ecg3, ecg1],
    distance: "1.5 km from center",
    verified: true,
    medavaPro: true,
    description: "Complete dental unit with ergonomic design.",
    maintenance: "Certified, serviced monthly",
  },
  {
    id: 6,
    title: "Zeiss Optometry Station",
    category: "Ophthalmology",
    city: "Naples",
    rating: 4.7,
    reviews: 19,
    pricePerDay: 110,
    images: [us2, us1],
    distance: "2.6 km from center",
    verified: true,
    medavaPro: false,
    description: "Advanced refraction system for eye exams.",
    maintenance: "Certified, aligned weekly",
  },
  {
    id: 7,
    title: "Zoll AED Plus Defibrillator",
    category: "Pulmonology",
    city: "Naples",
    rating: 4.9,
    reviews: 35,
    pricePerDay: 90,
    images: [ecg2, ecg3],
    distance: "0.8 km from center",
    verified: true,
    medavaPro: true,
    description: "Portable defibrillator with real-time CPR feedback.",
    maintenance: "Certified, battery tested monthly",
  },
  {
    id: 8,
    title: "Philips IntelliVue Monitor",
    category: "Cardiology",
    city: "Naples",
    rating: 4.8,
    reviews: 22,
    pricePerDay: 130,
    images: [us4, us3],
    distance: "2.2 km from center",
    verified: true,
    medavaPro: true,
    description: "Patient monitoring system for ICU and general wards.",
    maintenance: "Certified, serviced bi-weekly",
  },
  {
    id: 9,
    title: "Canon EOS R5 Surgical Microscope",
    category: "Dermatology",
    city: "Naples",
    rating: 4.6,
    reviews: 11,
    pricePerDay: 160,
    images: [us1, us4],
    distance: "3.4 km from center",
    verified: true,
    medavaPro: false,
    description: "High-precision surgical microscope with imaging.",
    maintenance: "Certified, optics cleaned regularly",
  },
  {
    id: 10,
    title: "Ultrasound Doppler System",
    category: "TEST",
    city: "Naples",
    rating: 4.7,
    reviews: 16,
    pricePerDay: 140,
    images: [us2, us3],
    distance: "2.7 km from center",
    verified: true,
    medavaPro: false,
    description: "Vascular ultrasound with advanced Doppler capabilities.",
    maintenance: "Certified, validated monthly",
  },
  {
    id: 11,
    title: "Spirometry System GE Healthcare",
    category: "Pulmonology",
    city: "Naples",
    rating: 4.8,
    reviews: 20,
    pricePerDay: 85,
    images: [ecg1, us1],
    distance: "1.9 km from center",
    verified: true,
    medavaPro: true,
    description: "Complete pulmonary function testing equipment.",
    maintenance: "Certified, calibrated weekly",
  },
  {
    id: 12,
    title: "Alcon LenSx Femtosecond Laser",
    category: "Ophthalmology",
    city: "Naples",
    rating: 4.9,
    reviews: 28,
    pricePerDay: 300,
    images: [us4, ecg2],
    distance: "2.1 km from center",
    verified: true,
    medavaPro: true,
    description: "Premium cataract surgery laser system.",
    maintenance: "Certified, serviced monthly",
  },
];

export default mockEquipment;