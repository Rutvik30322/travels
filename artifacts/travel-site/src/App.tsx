import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import About from "./pages/About";
import Bookings from "./pages/Bookings";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6 font-black text-orange-500 opacity-20">404</div>
      <h1 className="text-4xl font-black text-gray-900 mb-3">Wrong Turn!</h1>
      <p className="text-gray-500 mb-8 text-lg">This road doesn't lead anywhere. Let's get you back on track.</p>
      <a href="/">
        <button className="btn-shine bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
          Back to Home
        </button>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/cars" component={Cars} />
            <Route path="/cars/:id" component={CarDetail} />
            <Route path="/about" component={About} />
            <Route path="/bookings" component={Bookings} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
      </BookingProvider>
    </QueryClientProvider>
  );
}
