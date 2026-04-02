export interface Car {
  id: number;
  name: string;
  type: "SUV" | "Sedan" | "Luxury" | "Van" | "4x4";
  description: string;
  capacity: number;
  pricePerDay: number;
  destination: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  features: string[];
  available: boolean;
  featured: boolean;
  color: string;
  phone: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Land Cruiser",
    type: "4x4",
    description:
      "The legendary Land Cruiser — built for the toughest terrains. Perfect for mountain expeditions and off-road adventures across rugged landscapes.",
    capacity: 7,
    pricePerDay: 9999,
    destination: "Mountain Roads",
    imageUrl:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    rating: 4.9,
    reviewCount: 214,
    features: ["4WD", "GPS Navigation", "Roof Rack", "AC", "Bluetooth", "Spare Tyre"],
    available: true,
    featured: true,
    color: "White",
    phone: "+91-8200909915",
  },
  {
    id: 2,
    name: "Mercedes S-Class",
    type: "Luxury",
    description:
      "Travel in ultimate luxury. The Mercedes S-Class offers a first-class cabin experience, perfect for business trips and VIP transfers.",
    capacity: 4,
    pricePerDay: 20999,
    destination: "City & Airport",
    imageUrl:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    rating: 5.0,
    reviewCount: 98,
    features: ["Leather Seats", "Chauffeur Option", "WiFi", "Climate Control", "Champagne Bar"],
    available: true,
    featured: true,
    color: "Black",
    phone: "+91-8200909915",
  },
  {
    id: 3,
    name: "Ford Explorer",
    type: "SUV",
    description:
      "Spacious and powerful SUV ideal for family road trips. Plenty of cargo space, advanced safety features and a smooth highway ride.",
    capacity: 6,
    pricePerDay: 7999,
    destination: "Highway & Coastal",
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    rating: 4.7,
    reviewCount: 167,
    features: ["Panoramic Roof", "Apple CarPlay", "Heated Seats", "Backup Camera", "3rd Row"],
    available: true,
    featured: true,
    color: "Blue",
    phone: "+91-8200909915",
  },
  {
    id: 4,
    name: "Toyota Camry",
    type: "Sedan",
    description:
      "Reliable, fuel-efficient sedan perfect for city commutes and long highway drives. Comfortable, affordable and easy to drive.",
    capacity: 5,
    pricePerDay: 4599,
    destination: "City & Inter-city",
    imageUrl:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
    rating: 4.5,
    reviewCount: 302,
    features: ["Fuel Efficient", "Bluetooth", "Backup Camera", "Cruise Control", "AC"],
    available: true,
    featured: false,
    color: "Silver",
    phone: "+91-8200909915",
  },
  {
    id: 5,
    name: "VW Transporter",
    type: "Van",
    description:
      "The go-to van for group travel. Fits up to 9 passengers with generous luggage space. Great for tours, events and group transfers.",
    capacity: 9,
    pricePerDay: 11699,
    destination: "Group Tours",
    imageUrl:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    rating: 4.6,
    reviewCount: 89,
    features: ["9 Seats", "Luggage Space", "GPS", "AC", "USB Ports", "Tinted Windows"],
    available: true,
    featured: false,
    color: "Grey",
    phone: "+91-8200909915",
  },
  {
    id: 6,
    name: "Jeep Wrangler",
    type: "4x4",
    description:
      "The iconic off-roader. Take the top off and feel the wind on desert trails, forest tracks and coastal cliffs. Adventure awaits.",
    capacity: 4,
    pricePerDay: 8799,
    destination: "Desert & Off-Road",
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    rating: 4.8,
    reviewCount: 153,
    features: ["Removable Top", "4WD", "Rock Rails", "GPS", "Roll Cage", "LED Lights"],
    available: true,
    featured: true,
    color: "Orange",
    phone: "+91-8200909915",
  },
  {
    id: 7,
    name: "BMW 5 Series",
    type: "Luxury",
    description:
      "Sporty luxury meets refined elegance. The BMW 5 Series delivers an exhilarating drive with premium comfort for every journey.",
    capacity: 5,
    pricePerDay: 15499,
    destination: "Business Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80",
    rating: 4.8,
    reviewCount: 77,
    features: ["Sport Mode", "Heated Seats", "Premium Sound", "Lane Assist", "Wireless Charging"],
    available: false,
    featured: false,
    color: "Dark Blue",
    phone: "+91-8200909915",
  },
  {
    id: 8,
    name: "Honda CR-V",
    type: "SUV",
    description:
      "The perfect balance of comfort, efficiency and space. The CR-V is ideal for families and weekend getaways.",
    capacity: 5,
    pricePerDay: 6299,
    destination: "Family Trips",
    imageUrl:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80",
    rating: 4.6,
    reviewCount: 198,
    features: ["Sunroof", "Honda Sensing", "Apple CarPlay", "Rear Camera", "Keyless Entry"],
    available: true,
    featured: false,
    color: "Red",
    phone: "+91-8200909915",
  },
];

export const destinations = [
  "All Destinations",
  "Mountain Roads",
  "City & Airport",
  "Highway & Coastal",
  "Desert & Off-Road",
  "Group Tours",
  "Business Travel",
  "Family Trips",
];

export const carTypes = ["All Types", "SUV", "Sedan", "Luxury", "Van", "4x4"];
