/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProductList.js
import { useState } from 'react';
import ProductCard from './product-card';

export default function ProductList({rooms}) {
  const [selectedRoom , setSelectedRoom] = useState();

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Room Selection</h2>
      {rooms.map((room) => (
        <ProductCard
          key={room.id}
          room={room}
          selectedRoom={selectedRoom}
          onSelect={handleSelectRoom}
        />
      ))}
      {selectedRoom && (
        <div className="mt-4">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-md w-full font-semibold hover:bg-orange-600">
            Book {(selectedRoom as any).type} for {(selectedRoom as any).price}
          </button>
        </div>
      )}
    </div>
  );
}
