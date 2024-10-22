// pages/hotel.js
"use client";

import FlightCard from "@/components/flight/flight";

export default function Home() {
  const flightDatas = [
   {
    airline: { name: "ITA Airways", logo: "/logos/ita-airways.png" },
    departure: { time: "01:50", location: "Dubai (and vicinity)" },
    arrival: { time: "16:10", location: "London (LCY-London City)" },
    price: "SR4,013.85",
    stops: { location: "FCO" },
    flightDetails: { duration: "18h 20m" },
    baggage: "Baggage: No free baggage",
  },
   {
    airline: { name: "ITA Airways", logo: "/logos/ita-airways.png" },
    departure: { time: "01:50", location: "Dubai (and vicinity)" },
    arrival: { time: "16:10", location: "London (LCY-London City)" },
    price: "SR4,013.85",
    stops: { location: "FCO" },
    flightDetails: { duration: "18h 20m" },
    baggage: "Baggage: No free baggage",
  },
   {
    airline: { name: "ITA Airways", logo: "/logos/ita-airways.png" },
    departure: { time: "01:50", location: "Dubai (and vicinity)" },
    arrival: { time: "16:10", location: "London (LCY-London City)" },
    price: "SR4,013.85",
    stops: { location: "FCO" },
    flightDetails: { duration: "18h 20m" },
    baggage: "Baggage: No free baggage",
  }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {
        flightDatas.map((flightData)=>(<FlightCard {...flightData} />))
      }
      
    </div>
  );
}
