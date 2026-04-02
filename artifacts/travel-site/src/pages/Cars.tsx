import { useState, useMemo } from "react";
import { Link } from "wouter";
import { cars } from "../data/cars";
import { inr } from "../utils/currency";
import {
  Star, Users, MapPin, Search, X, Phone,
  Mountain, Building, Waves, Compass,
  Bus, Zap, Car
} from "lucide-react";

const PHONE = "+918200909915";
const PHONE_DISPLAY = "+91-8200909915";

const TYPES = [
  { label: "All", icon: <Car className="w-4 h-4" />, color: "from-gray-700 to-gray-900" },
  { label: "SUV", icon: <Mountain className="w-4 h-4" />, color: "from-blue-500 to-blue-700" },
  { label: "Luxury", icon: <Zap className="w-4 h-4" />, color: "from-violet-500 to-violet-700" },
  { label: "4x4", icon: <Compass className="w-4 h-4" />, color: "from-orange-500 to-orange-700" },
  { label: "Sedan", icon: <Building className="w-4 h-4" />, color: "from-emerald-500 to-emerald-700" },
  { label: "Van", icon: <Bus className="w-4 h-4" />, color: "from-rose-500 to-rose-700" },
];

export default function Cars() {
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      const matchType = activeType === "All" || c.type === activeType;
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.destination.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [activeType, search]);

  const typeCount = (label: string) =>
    label === "All" ? cars.length : cars.filter(c => c.type === label).length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO HEADER ─────────────────────────── */}
      <div className="hero-gradient pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 mesh-orb-1 rounded-full blur-3xl pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-orange-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-1.5">Our Fleet</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1.5 leading-tight">
            Find Your <span className="gradient-text">Perfect Car</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base mb-5 sm:mb-8">
            Choose from {cars.length} premium vehicles — book instantly on call.
          </p>

          {/* Search */}
          <div className="w-full max-w-xl flex gap-3 mb-5 sm:mb-8">
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center gap-3 px-4 hover:bg-white/15 transition-colors">
              <Search className="w-4 h-4 text-orange-400 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search cars, destination..."
                className="flex-1 py-3 sm:py-3.5 text-sm text-white placeholder-white/40 bg-transparent outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")}><X className="w-4 h-4 text-white/40 hover:text-white" /></button>
              )}
            </div>
          </div>

          {/* Type tabs — horizontal scroll on mobile */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {TYPES.map(t => (
              <button
                key={t.label}
                onClick={() => setActiveType(t.label)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeType === t.label
                    ? `bg-gradient-to-r ${t.color} text-white shadow-xl scale-105`
                    : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white"
                }`}
              >
                {t.icon}
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${
                  activeType === t.label ? "bg-white/20" : "bg-white/10"
                }`}>{typeCount(t.label)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm font-semibold">
            <span className="text-gray-900 font-black">{filtered.length}</span> Cars
          </p>
          {(search || activeType !== "All") && (
            <button onClick={() => { setSearch(""); setActiveType("All"); }}
              className="text-orange-500 text-xs font-bold hover:text-orange-600 flex items-center gap-1">
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-black text-gray-800 mb-2">No cars found</h3>
            <p className="text-gray-500 mb-6">Try a different type or clear your search</p>
            <button onClick={() => { setSearch(""); setActiveType("All"); }}
              className="btn-shine bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg">
              Show All Cars
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((car) => (
              <div key={car.id} className="card-hover bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group flex flex-col">
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={car.imageUrl} alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="tag-badge text-white text-xs font-bold px-2.5 py-1 rounded-full">{car.type}</span>
                    {car.featured && (
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">⭐ Top Pick</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-black text-gray-800">{car.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-black text-xl">{inr(car.pricePerDay)}</span>
                    <span className="text-white/60 text-xs"> /day</span>
                  </div>

                  {!car.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold bg-gray-900/80 px-4 py-2 rounded-full text-sm">Unavailable</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-black text-gray-900 text-base mb-1">{car.name}</h3>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-orange-400" />{car.destination}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-orange-400" />{car.capacity} seats</span>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{car.description}</p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {car.features.slice(0, 3).map(f => (
                      <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">{f}</span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="text-xs bg-orange-50 text-orange-500 px-2.5 py-1 rounded-lg font-bold">+{car.features.length - 3}</span>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4 text-xs text-gray-400">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-3 h-3 ${i <= Math.floor(car.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-700">{car.rating}</span>
                    <span>({car.reviewCount})</span>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto flex gap-2">
                    <Link href={`/cars/${car.id}`}
                      className="flex-1 text-center text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl transition-colors">
                      Details
                    </Link>
                    {car.available ? (
                      <a
                        href={`tel:${PHONE}`}
                        className="flex-1 btn-shine text-xs font-black text-white bg-gradient-to-r from-orange-500 to-orange-600 py-3 rounded-xl shadow-md shadow-orange-500/20 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call & Book
                      </a>
                    ) : (
                      <span className="flex-1 text-center text-xs font-bold text-gray-400 bg-gray-100 py-3 rounded-xl">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call strip */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-white font-black text-xl sm:text-2xl mb-1">Need help choosing?</h3>
            <p className="text-orange-100 text-sm">Our team is ready to find the perfect car for your trip.</p>
          </div>
          <a href={`tel:${PHONE}`}
            className="bg-white text-orange-600 font-black px-6 sm:px-8 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-orange-50 transition-colors shadow-xl whitespace-nowrap text-sm sm:text-base">
            <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
