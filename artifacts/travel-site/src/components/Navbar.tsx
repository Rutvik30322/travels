import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Compass } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About Us" },
  { href: "/bookings", label: "My Bookings" },
];

const DARK_HERO_PAGES = ["/", "/about"];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hasDarkHero = DARK_HERO_PAGES.includes(location);
  const useDarkStyle = !hasDarkHero || scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setScrolled(false);
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkStyle
          ? "nav-glass shadow-md shadow-black/5 border-b border-gray-200/70"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-105">
                <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${useDarkStyle ? "text-gray-900" : "text-white"}`}>
                DIVYAKSHI <span className="gradient-text">TRAVELS</span>
              </span>
              <div className={`text-xs font-medium leading-none transition-colors duration-300 ${useDarkStyle ? "text-gray-400" : "text-white/50"}`}>
                Premium Car Rentals
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location === link.href
                    ? useDarkStyle
                      ? "text-orange-500 bg-orange-50"
                      : "text-orange-400 bg-white/10"
                    : useDarkStyle
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918200909915"
              className={`flex items-center gap-2 text-sm font-semibold transition-all duration-200 ${
                useDarkStyle ? "text-gray-700 hover:text-orange-500" : "text-white/80 hover:text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              +91-8200909915
            </a>
            <Link href="/cars">
              <button className="btn-shine bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              useDarkStyle ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="nav-glass border-t border-gray-200/60 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                location === link.href
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link href="/cars" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
