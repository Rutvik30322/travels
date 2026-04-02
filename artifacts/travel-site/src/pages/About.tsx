import { useRef, useEffect } from "react";
import { Link } from "wouter";
import {
  Target, Heart, Globe, Award, Users, Shield,
  Phone, MapPin, Compass, ArrowRight, Star, Zap, TrendingUp
} from "lucide-react";

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
    <div ref={ref} className={className} style={{ opacity: 0, transform: "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", avatar: "A", color: "from-orange-500 to-amber-500", quote: "Every journey deserves a great car." },
  { name: "Maya Chen", role: "Head of Fleet", avatar: "M", color: "from-blue-500 to-cyan-500", quote: "We hand-pick every vehicle in our fleet." },
  { name: "Jordan Smith", role: "Customer Experience", avatar: "J", color: "from-violet-500 to-purple-500", quote: "Our agents are your road-trip companions." },
  { name: "Priya Patel", role: "Operations Director", avatar: "P", color: "from-emerald-500 to-teal-500", quote: "Smooth logistics so you focus on the drive." },
];

const values = [
  { icon: <Heart className="w-6 h-6" />, title: "Passion for Travel", desc: "We're travelers ourselves. Every decision we make starts with the question: would this make our own trip better?", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: <Shield className="w-6 h-6" />, title: "Safety First", desc: "Every car is fully inspected, maintained, and insured before it ever leaves our lot. No shortcuts.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: <Target className="w-6 h-6" />, title: "Customer Focus", desc: "Our success is measured by one thing — whether you had an amazing trip. We obsess over your experience.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: <Globe className="w-6 h-6" />, title: "Built to Scale", desc: "From mountain trails to coastal highways, our fleet covers destinations across the entire country.", color: "text-emerald-500", bg: "bg-emerald-50" },
];

const milestones = [
  { year: "2018", title: "Founded in SF", desc: "Started with 5 cars and a simple idea: make car travel feel premium again." },
  { year: "2020", title: "500 Bookings", desc: "Reached our first major milestone during a challenging year — customers loved the call-to-book experience." },
  { year: "2022", title: "Nationwide", desc: "Expanded to 50+ destinations across the US, partnering with local operators coast to coast." },
  { year: "2024", title: "10k+ Trips", desc: "Over 10,000 road trips completed. Our fleet grew to 500+ premium vehicles." },
  { year: "2026", title: "Growing Strong", desc: "Continuing to expand, innovate, and deliver the best road trip experience on the market." },
];

export default function About() {
  return (
    <div className="min-h-screen">

      {/* ─── HERO ──────────────────────────────────── */}
      <section className="hero-gradient pt-20 sm:pt-28 md:pt-32 pb-14 sm:pb-20 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 mesh-orb-1 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 mesh-orb-2 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm text-orange-300 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 mb-6 sm:mb-8">
            <Compass className="w-4 h-4" /> Our Story
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-4 sm:mb-6">
            We Live for the<br /><span className="gradient-text">Open Road</span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            DIVYAKSHI TRAVELS was built by travelers who were tired of complicated rental experiences. We made it simple: find your car, call us, drive away happy.
          </p>
        </div>
      </section>


      {/* ─── MISSION ───────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Making Great Car Travel <span className="gradient-text">Accessible</span> to Everyone
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              We believe every road trip should be memorable — not memorable because something went wrong, but because every detail was perfectly right. The right car, the right price, the right service.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              That's why we built a booking system that actually works the way people think: browse online, confirm over a quick call, and drive. No lengthy forms, no hidden fees, no surprises.
            </p>
            <div className="flex gap-4">
              <Link href="/cars">
                <button className="btn-shine flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 hover:scale-105 transition-all duration-200">
                  Browse Cars <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a href="tel:+918200909915">
                <button className="flex items-center gap-2 border-2 border-orange-200 text-orange-600 font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-50 transition-colors">
                  <Phone className="w-4 h-4" /> Call Us
                </button>
              </a>
            </div>
          </RevealSection>

          <RevealSection delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <TrendingUp className="w-8 h-8" />, value: "10k+", label: "Happy Travelers", color: "from-orange-500 to-amber-500" },
                { icon: <Globe className="w-8 h-8" />, value: "50+", label: "Destinations", color: "from-blue-500 to-cyan-500" },
                { icon: <Award className="w-8 h-8" />, value: "4.9★", label: "Avg Rating", color: "from-violet-500 to-purple-500" },
                { icon: <Zap className="w-8 h-8" />, value: "15min", label: "Avg Confirm Time", color: "from-emerald-500 to-teal-500" },
              ].map((s, i) => (
                <div key={s.label} className={`rounded-3xl p-6 bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                  <div className="mb-3">{s.icon}</div>
                  <div className="text-3xl font-black mb-1">{s.value}</div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── VALUES ────────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <RevealSection key={v.title} delay={i * 100}>
                <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 ${v.bg} ${v.color} rounded-2xl flex items-center justify-center mb-5 icon-bounce`}>
                    {v.icon}
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ──────────────────────────────── */}
      <section className="py-24 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-orange-500 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <RevealSection className="text-center mb-16">
            <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              From Dream to <span className="gradient-text">Reality</span>
            </h2>
          </RevealSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-blue-500 to-emerald-500 opacity-30" />

            {milestones.map((m, i) => (
              <RevealSection key={m.year} delay={i * 100} className={`relative flex items-start gap-8 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Year bubble */}
                <div className="flex-1 hidden md:block" />
                <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-gray-950 shadow-lg shadow-orange-500/30 z-10" />
                <div className="flex-1 ml-16 md:ml-0">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-orange-500/20 transition-all duration-300">
                    <span className="text-orange-400 font-black text-sm">{m.year}</span>
                    <h3 className="text-white font-black text-lg mt-1 mb-2">{m.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">The People</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Road trip enthusiasts, car lovers, and hospitality professionals — all united by one mission.</p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <RevealSection key={member.name} delay={i * 100}>
                <div className="text-center group cursor-default">
                  <div className="relative inline-block mb-5">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-2xl shadow-xl mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {member.avatar}
                    </div>
                    <div className="pulse-ring absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">{member.name}</h3>
                  <p className="text-orange-500 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-400 text-xs italic">"{member.quote}"</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────── */}
      <section className="py-24 px-4 bg-orange-50">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> Trusted by 10,000+ travelers
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ready to Start Your <span className="gradient-text">Adventure?</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10">Browse our premium fleet and book your next road trip in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <button className="btn-shine bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black px-12 py-5 rounded-2xl shadow-xl shadow-orange-500/25 hover:scale-105 transition-all duration-200 text-lg">
                Browse Cars
              </button>
            </Link>
            <a href="tel:+918200909915">
              <button className="flex items-center justify-center gap-2 bg-white border-2 border-orange-200 text-orange-600 font-bold px-12 py-5 rounded-2xl hover:bg-orange-50 transition-colors text-lg shadow-sm">
                <Phone className="w-5 h-5" /> Call Us Now
              </button>
            </a>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-8 px-4 text-center text-sm">
        <p>© 2026 DIVYAKSHI TRAVELS. All rights reserved. Built with passion for the open road.</p>
      </footer>
    </div>
  );
}
