// components/HotelCard.js

import { useRouter } from "next/navigation";


export default function HotelCard({ hotel, conditional }) {
  // console.log(hotel)
  const router = useRouter(); 
  const handleGetRooms = () => {
    const params = new URLSearchParams({
      hotel_id: hotel.hotel_id,
      checkin: conditional.checkin,
      checkout: conditional.checkout,
      rooms: JSON.stringify(conditional.rooms), // Assuming rooms is an object or array
      currency: 'USD'
    }).toString();
    // router.replace(`/products?${params}`);
    router.push(`/products?${params}`);
  }
    return (
      <div className="flex border rounded-lg shadow-sm p-4 mb-4 bg-white">
        <img
          src={hotel.images?.[1]?.url}
          alt={hotel.name}
          className="w-32 h-32 object-cover rounded-md"
        />
        <div className="ml-4 flex-grow">
          <h3 className="text-lg font-bold">{hotel.name}</h3>
          <p className="text-sm text-gray-500">{hotel.address}</p>
          <div className="flex items-center mt-2">
            {Array.from({ length: hotel.rating }, (_, i) => (
              <span key={i} className="text-yellow-400">&#9733;</span>
            ))}
            {Array.from({ length: 5 - hotel.rating }, (_, i) => (
              <span key={i} className="text-gray-300">&#9733;</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-teal-500 text-xl font-semibold">
            {hotel.total_price} {hotel.price_currency} <span className="text-sm">per night</span>
          </p>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600" onClick={handleGetRooms}>
            Select
          </button>
          <button className="mt-2 text-blue-500 hover:underline">
            View on Map
          </button>
        </div>
      </div>
    );
  }
  