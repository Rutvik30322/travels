import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cars } from "../data/cars";
import { inr } from "../utils/currency";
import {
  MapPin, Star, Users, ArrowRight, Shield, Clock,
  Headphones, Search, ChevronRight, Phone, Zap, Globe,
  Award, TrendingUp, Car, Navigation, Compass
} from "lucide-react";

const featured = cars.filter((c) => c.featured);

const steps = [
  {
    icon: <Search className="w-7 h-7" />,
    title: "Browse & Choose",
    desc: "Explore our curated fleet of premium vehicles filtered by type, destination, and budget.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: <Phone className="w-7 h-7" />,
    title: "Book on Call",
    desc: "Fill your details and our dedicated agent calls you within 15 minutes to confirm.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: <Navigation className="w-7 h-7" />,
    title: "Hit the Road",
    desc: "Pick up your car at the agreed spot and start the journey you've been dreaming of.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

const testimonials = [
  { name: "Sarah M.", location: "Los Angeles", rating: 5, avatar: "S", color: "bg-rose-500", text: "Booked a Land Cruiser for a desert trip. The call agent was super helpful and the car was in perfect condition!" },
  { name: "James K.", location: "New York", rating: 5, avatar: "J", color: "bg-blue-500", text: "The Mercedes S-Class was absolutely stunning. Perfect for my client meeting. Highly recommend DIVYAKSHI TRAVELS." },
  { name: "Priya S.", location: "Chicago", rating: 5, avatar: "P", color: "bg-violet-500", text: "Took the Ford Explorer for a family road trip. Spacious, comfortable, everything worked perfectly!" },
];

const stats = [
  { value: "500+", label: "Premium Cars", icon: <Car className="w-5 h-5" /> },
  { value: "50+", label: "Destinations", icon: <Globe className="w-5 h-5" /> },
  { value: "10k+", label: "Happy Travelers", icon: <TrendingUp className="w-5 h-5" /> },
  { value: "24/7", label: "Live Support", icon: <Headphones className="w-5 h-5" /> },
];

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(32px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const types = ["All", "SUV", "Luxury", "4x4", "Sedan", "Van"];
  const displayCars = activeType === "All" ? featured : cars.filter((c) => c.type === activeType).slice(0, 4);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ─── HERO ──────────────────────────────────── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        {/* Animated mesh orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] mesh-orb-1 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] mesh-orb-2 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] mesh-orb-3 rounded-full blur-3xl pointer-events-none" />

        {/* Road lines */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden opacity-20">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="absolute h-0.5 w-32 bg-white road-line" style={{ animationDelay: `${i * 0.75}s`, top: `${i * 8}px` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm text-orange-300 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                Premium Travel Cars — Book on Call
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Drive Your<br />
                <span className="gradient-text">Dream Car</span><br />
                Anywhere
              </h1>

              <p className="text-lg text-white/65 max-w-md leading-relaxed">
                Premium vehicles for every journey. Browse, call to book, and hit the open road — faster than you think.
              </p>

              {/* Search bar */}
              <div className="flex gap-3 max-w-lg">
                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center gap-3 px-5 hover:bg-white/15 transition-colors">
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Where are you going?"
                    className="flex-1 py-4 text-sm text-white placeholder-white/40 outline-none bg-transparent"
                    onKeyDown={(e) => { if (e.key === "Enter") navigate(`/cars`); }}
                  />
                </div>
                <button
                  onClick={() => navigate("/cars")}
                  className="btn-shine bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-7 py-4 rounded-2xl shadow-xl shadow-orange-900/40 hover:scale-105 transition-all duration-200"
                >
                  Search
                </button>
              </div>

              {/* Quick type filters */}
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setActiveType(t); const el = document.getElementById("fleet"); el?.scrollIntoView({ behavior: "smooth" }); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      activeType === t
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — featured car cards stack */}
            <div className="relative hidden lg:block h-[480px]">
              {featured.slice(0, 3).map((car, i) => (
                <div
                  key={car.id}
                  className="absolute w-72 rounded-3xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer hover:z-10 transition-all duration-300 hover:scale-105"
                  style={{
                    top: `${i * 55}px`,
                    right: `${i * 60}px`,
                    zIndex: 3 - i,
                    transform: `rotate(${[-2, 1, -1][i]}deg)`,
                  }}
                  onClick={() => navigate(`/cars/${car.id}`)}
                >
                  <img src={car.imageUrl} alt={car.name} className="w-full h-44 object-cover" />
                  <div className="bg-white/10 backdrop-blur-xl p-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold text-sm">{car.name}</p>
                        <p className="text-white/50 text-xs">{car.destination}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-black">{inr(car.pricePerDay)}</p>
                        <p className="text-white/40 text-xs">/day</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-5 text-center hover:bg-white/12 transition-colors">
                <div className="flex justify-center mb-2 text-orange-400">{s.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-white/50 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FLEET ─────────────────────────────────── */}
      <section id="fleet" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Our Fleet</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Choose Your <span className="gradient-text">Ride</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every car is hand-selected, fully insured, and ready to take you wherever the road leads.</p>
          </RevealSection>

          {/* Type tabs */}
          <RevealSection className="flex flex-wrap justify-center gap-2 mb-10" delay={100}>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeType === t
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayCars.length ? displayCars : featured).map((car, i) => (
              <RevealSection key={car.id} delay={i * 80}>
                <Link href={`/cars/${car.id}`}>
                  <div className="card-hover cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group h-full">
                    <div className="relative h-52 overflow-hidden">
                      <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="tag-badge text-white text-xs font-bold px-3 py-1 rounded-full">{car.type}</span>
                        {car.featured && <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">Top Pick</span>}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-gray-800">{car.rating}</span>
                      </div>
                      {!car.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold bg-gray-800/80 px-4 py-2 rounded-full text-sm">Unavailable</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-gray-900 text-base mb-1.5">{car.name}</h3>
                      <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{car.destination}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{car.capacity} seats</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-2xl font-black text-orange-500">{inr(car.pricePerDay)}</span>
                          <span className="text-gray-400 text-xs"> /day</span>
                        </div>
                        {car.available && (
                          <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
                            Book <ChevronRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12" delay={200}>
            <Link href="/cars">
              <button className="btn-shine inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/25 hover:scale-105 transition-all duration-200 text-lg">
                View All Cars <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────── */}
      <section className="py-24 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <RevealSection className="text-center mb-16">
            <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-white/50 max-w-lg mx-auto">From browsing to driving — it takes less than 20 minutes.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-emerald-500/30" />

            {steps.map((step, i) => (
              <RevealSection key={step.title} delay={i * 150}>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/8 hover:border-white/20 transition-all duration-300 group">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gray-900 border-2 border-white/20 flex items-center justify-center text-white font-black text-sm">
                    {i + 1}
                  </div>
                  <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.iconColor} flex items-center justify-center mx-auto mb-5 mt-2 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <h3 className="text-white font-black text-xl mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Travelers <span className="gradient-text">Love Us</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <RevealSection key={t.name} delay={i * 100}>
                <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group h-full">
                  {/* Quote icon */}
                  <div className="text-4xl text-orange-200 font-serif leading-none mb-4">"</div>
                  <div className="flex mb-4 gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">{t.text}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-black text-sm`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ────────────────────────────────── */}
      <section className="py-24 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Why DIVYAKSHI TRAVELS</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Built for Real <span className="gradient-text">Travelers</span></h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Fully Insured", desc: "Every car comprehensively insured.", color: "text-orange-500", bg: "bg-orange-100" },
              { icon: <Zap className="w-6 h-6" />, title: "Fast Booking", desc: "Confirmed in under 20 minutes.", color: "text-blue-500", bg: "bg-blue-100" },
              { icon: <Clock className="w-6 h-6" />, title: "24-Hour Pickup", desc: "Flexible hours to fit your schedule.", color: "text-violet-500", bg: "bg-violet-100" },
              { icon: <Award className="w-6 h-6" />, title: "Premium Fleet", desc: "Hand-selected top-rated vehicles.", color: "text-emerald-500", bg: "bg-emerald-100" },
            ].map((item, i) => (
              <RevealSection key={item.title} delay={i * 80}>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center h-full">
                  <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 icon-bounce`}>
                    {item.icon}
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────── */}
      <section className="py-24 px-4 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 mesh-orb-1 rounded-full blur-3xl" />
        </div>
        <RevealSection className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to <span className="gradient-text">Explore?</span>
          </h2>
          <p className="text-white/60 text-xl mb-10">Browse our full fleet and book with a quick call — no apps, no hassle.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <button className="btn-shine bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black px-12 py-5 rounded-2xl shadow-2xl shadow-orange-900/40 hover:scale-105 transition-all duration-200 text-lg">
                Browse All Cars
              </button>
            </Link>
            <Link href="/about">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-12 py-5 rounded-2xl hover:bg-white/20 transition-all duration-200 text-lg">
                About Us
              </button>
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* ─── FOOTER ────────────────────────────────── */}
      <footer className="bg-gray-950 text-gray-400 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-white font-black text-xl">DIVYAKSHI <span className="gradient-text">TRAVELS</span></span>
                  <div className="text-gray-500 text-xs">Travel & Cars</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Your trusted partner for premium car travel. Book on call, hit the road, and explore the world in style.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Navigation</h4>
              <ul className="space-y-2 text-sm">
                {[["Home", "/"], ["Cars", "/cars"], ["About Us", "/about"], ["My Bookings", "/bookings"]].map(([label, href]) => (
                  <li key={label}><Link href={href} className="text-gray-500 hover:text-orange-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500" />+91-8200909915</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" />San Francisco, CA</li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@roadtrip.travel
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">© 2026 DIVYAKSHI TRAVELS. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
