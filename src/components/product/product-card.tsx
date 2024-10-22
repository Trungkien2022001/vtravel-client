// components/ProductCard.js

import Image from 'next/image';

export default function ProductCard({ room, selectedRoom, onSelect }) {
  const roomLength = room.rate.length;
  const idx = Math.floor(Math.random() * roomLength);
  const rate = room.rate[idx];

  const isSelected = selectedRoom?.id === room.id;
  // console.log(room.images[0].urls[0].url)

  return (
    <div className={`p-4 mb-4 border rounded-lg ${isSelected ? 'border-teal-500' : 'border-gray-200'} bg-white shadow-sm`}>
    {/* Room Image and Title */}
    <div className="flex justify-between items-start">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{rate.rate_name}</h3>
        {room.images && room.images.length > 0 && room.images[0].urls.length > 0 ? (
          <div className="relative w-full h-40 mb-4">
            <Image
              src={room.images[0].urls[0].url}
              alt={`Image of ${room.name}`}
              width={300}
              height={200}
              className="rounded-md"
            />
          </div>
        ) : (
          <p>No image available</p>
        )}
      </div>
  
      {/* Rate and Price */}
      <div className="ml-4 text-right">
        <p className="text-xl font-semibold text-teal-500">{rate.full_rate} {rate.currency}</p>
        <p className="text-sm text-gray-500">Taxes and fees included</p>
      </div>
    </div>
  
    {/* Breakfast and Other Info */}
    <div className="mt-4 grid mt-10 grid-cols-2 gap-4">
      <div>
        <h4 className="font-medium text-gray-800">Breakfast</h4>
        <ul className="text-sm text-gray-500 list-none space-y-1">
          <li>{rate.isRefundable ? 'Refundable' : 'Non-Refundable'}</li>
          <li>{rate.breakfastIncluded ? 'Daily Breakfast Included' : 'No Breakfast'}</li>
        </ul>
      </div>
    </div>
  
    {/* Select Button */}
    <div className="mt-4 flex justify-end">
      <button
        className={`px-4 py-2 rounded-md ${isSelected ? 'bg-green-500 text-white' : 'bg-teal-500 text-white hover:bg-orange-600'}`}
        onClick={() => onSelect(room)}
      >
        {isSelected ? 'Selected' : 'Select & Book'}
      </button>
    </div>
  </div>
  
  );
}

  