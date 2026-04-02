import { createContext, useContext, useState, ReactNode } from "react";
import type { Car } from "../data/cars";

export interface Booking {
  id: string;
  car: Car;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  destination: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id" | "status" | "createdAt">) => Booking;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (b: Omit<Booking, "id" | "status" | "createdAt">): Booking => {
    const booking: Booking = {
      ...b,
      id: `BK${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [booking, ...prev]);
    return booking;
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within BookingProvider");
  return ctx;
}
