// components/ProductCard.js

export default function ProductCard({ room, selectedRoom, onSelect }) {
    const isSelected = selectedRoom?.id === room.id;
  
    return (
      <div className={`p-4 mb-4 border rounded-lg ${isSelected ? 'border-orange-500' : 'border-gray-200'} bg-white shadow-sm`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{room.type}</h3>
            <p className="text-sm text-gray-500">{room.description}</p>
          </div>
          <p className="text-xl font-semibold text-orange-500">{room.price}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <p>{room.cancellationPolicy}</p>
          </div>
          <button
            className={`px-4 py-2 rounded-md ${isSelected ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            onClick={() => onSelect(room)}
          >
            {isSelected ? 'Selected' : 'Select & Book'}
          </button>
        </div>
      </div>
    );
  }
  