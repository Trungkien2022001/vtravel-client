// components/ProductList.js
import { useState } from 'react';
import ProductCard from './product-card';

const rooms = [
  {
    id: 1,
    type: 'TWIN DELUXE ROOM CITY VIEW',
    description: 'Contemporary decor, bright room, city view, balcony, data port, in-room safe, 42-inch LED TV.',
    price: 'SR 914.16',
    cancellationPolicy: 'Non-Refundable',
  },
  {
    id: 2,
    type: 'KING DELUXE ROOM CITY VIEW',
    description: 'Contemporary decor, bright room, city view, balcony, data port, in-room safe, 42-inch LED TV.',
    price: 'SR 914.16',
    cancellationPolicy: 'Non-Refundable',
  },
  {
    id: 3,
    type: 'KING DELUXE CITY VIEW',
    description: 'Bright room with city view and modern amenities. Data port, in-room safe, 42-inch LED TV.',
    price: 'SR 922.42',
    cancellationPolicy: 'Non-Refundable',
  },
];

export default function ProductList() {
  const [selectedRoom, setSelectedRoom] = useState(null);

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
            Book {selectedRoom.type} for {selectedRoom.price}
          </button>
        </div>
      )}
    </div>
  );
}
