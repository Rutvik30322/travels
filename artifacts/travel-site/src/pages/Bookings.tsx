import { Link } from "wouter";
import { useBookings } from "../context/BookingContext";
import { inr } from "../utils/currency";
import { Car, Calendar, MapPin, Phone, Star, Clock, ArrowRight } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons: Record<string, string> = {
  pending: "⏳",
  confirmed: "✅",
  completed: "🏁",
  cancelled: "❌",
};

export default function Bookings() {
  const { bookings } = useBookings();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">Your Dashboard</p>
          <h1 className="text-4xl font-black text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-2">Track all your car bookings and their current status.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
              <Car className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Browse our premium fleet, pick your favourite car, and place a booking request.</p>
            <Link href="/cars">
              <button className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:scale-105 transition-all duration-200">
                Browse Cars <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row">
                  {/* Car Image */}
                  <div className="md:w-56 h-48 md:h-auto shrink-0">
                    <img src={booking.car.imageUrl} alt={booking.car.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-gray-900">{booking.car.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                          <span className="tag-badge text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{booking.car.type}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{booking.car.rating}
                          </span>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border shrink-0 ${statusColors[booking.status]}`}>
                        {statusIcons[booking.status]} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Pickup</p>
                          <p className="font-bold text-gray-800">{booking.pickupDate}</p>
                        </div>
                      </div>
                      {booking.returnDate && (
                        <div className="flex items-center gap-2.5 text-sm text-gray-600">
                          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Return</p>
                            <p className="font-bold text-gray-800">{booking.returnDate}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Location</p>
                          <p className="font-bold text-gray-800">{booking.pickupLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Contact</p>
                          <p className="font-bold text-gray-800">{booking.customerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Booked</p>
                          <p className="font-bold text-gray-800">{new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <p className="text-sm text-gray-500 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                        <strong className="text-gray-700">Notes:</strong> {booking.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-400 font-mono">ID: {booking.id}</div>
                      <div className="text-xl font-black text-orange-500">{inr(booking.totalPrice)}</div>
                    </div>
                  </div>
                </div>

                {booking.status === "pending" && (
                  <div className="bg-amber-50 border-t border-amber-200 px-6 py-3 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-700">
                      Our agent will call <strong>{booking.customerPhone}</strong> within 15 minutes to confirm this booking.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/cars">
            <button className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:scale-105 transition-all duration-200">
              Book Another Car <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
