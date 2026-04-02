import { useState } from "react";
import { useParams, Link } from "wouter";
import { cars } from "../data/cars";
import { useBookings } from "../context/BookingContext";
import { inr } from "../utils/currency";
import { Star, Users, MapPin, Phone, ChevronLeft, CheckCircle } from "lucide-react";

export default function CarDetail() {
  const params = useParams<{ id: string }>();
  const car = cars.find((c) => c.id === Number(params.id));
  const { addBooking } = useBookings();

  const [step, setStep] = useState<"detail" | "success">("detail");
  const [loading, setLoading] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Car not found</h2>
        <Link href="/cars" className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
          Browse Cars
        </Link>
      </div>
    );
  }

  const handleBook = async () => {
    if (!car.available || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    addBooking({
      car,
      customerName: "Guest",
      customerPhone: car.phone,
      customerEmail: "",
      pickupDate: "",
      returnDate: "",
      pickupLocation: car.destination,
      destination: car.destination,
      notes: "",
      totalPrice: car.pricePerDay,
    });
    setLoading(false);
    setStep("success");
    // Trigger the call directly
    window.open(`tel:${car.phone}`, "_self");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Booking Requested!</h2>
          <p className="text-gray-500 text-lg">
            Our agent will call you at <strong>{car.phone}</strong> within 15 minutes to confirm your{" "}
            <strong>{car.name}</strong> booking.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Car</span>
              <span className="font-semibold text-gray-900">{car.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Type</span>
              <span className="font-semibold text-gray-900">{car.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Destination</span>
              <span className="font-semibold text-gray-900">{car.destination}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-orange-200 pt-3">
              <span className="text-gray-500 font-semibold">Rate</span>
              <span className="font-extrabold text-orange-600 text-lg">{inr(car.pricePerDay)}/day</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/bookings" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-center">
              My Bookings
            </Link>
            <Link href="/cars" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-center">
              Browse More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <Link href="/cars" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 text-sm font-medium transition-colors w-fit">
          <ChevronLeft className="w-4 h-4" /> Back to Cars
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Car Info */}
        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg relative">
            <img src={car.imageUrl} alt={car.name} className="w-full h-64 sm:h-80 object-cover" />
            {!car.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-xl bg-gray-800/80 px-6 py-3 rounded-2xl">Currently Unavailable</span>
              </div>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">{car.type}</span>
              {car.featured && <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1.5 rounded-full">Top Pick</span>}
            </div>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{car.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-orange-400" />{car.destination}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-orange-400" />{car.capacity} seats</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-500">{inr(car.pricePerDay)}</div>
                <div className="text-gray-400 text-sm">per day</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(car.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
              </div>
              <span className="font-semibold text-gray-700">{car.rating}</span>
              <span className="text-gray-400 text-sm">({car.reviewCount} reviews)</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{car.description}</p>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((f) => (
                  <span key={f} className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-100">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Call Direct */}
          <div className="bg-orange-500 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-orange-100 text-sm font-medium">Prefer to book directly?</p>
              <p className="text-white font-bold text-base sm:text-lg mt-1">{car.phone}</p>
            </div>
            <a href={`tel:${car.phone}`} className="shrink-0 bg-white text-orange-600 font-bold px-4 sm:px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-50 transition-colors shadow-md text-sm sm:text-base">
              <Phone className="w-5 h-5" /> Call Now
            </a>
          </div>
        </div>

        {/* Right - Instant Book Panel */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Book This Car</h2>
            <p className="text-gray-500 text-sm mb-6">
              One tap — our agent calls you within 15 minutes to confirm.
            </p>

            {/* Car summary */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-4 border border-gray-100">
              <img src={car.imageUrl} alt={car.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 truncate">{car.name}</p>
                <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-400" />{car.destination}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-orange-500 text-lg">{inr(car.pricePerDay)}</p>
                <p className="text-gray-400 text-xs">per day</p>
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-3 mb-8">
              {[
                { step: "1", text: "Tap the button below to request your booking" },
                { step: "2", text: "Our agent calls you within 15 minutes" },
                { step: "3", text: "Confirm details & enjoy your road trip!" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Instant book button */}
            <button
              onClick={handleBook}
              disabled={!car.available || loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Connecting...</>
              ) : !car.available ? (
                "Car Unavailable"
              ) : (
                <><Phone className="w-5 h-5" /> Request Call Booking</>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              Our agent will call you to confirm within 15 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
