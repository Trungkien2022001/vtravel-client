import { useState } from 'react';

const tabItems = ['Hotels', 'Flights', 'Tours', 'Vehicles', 'Tour Guide', 'Insurances'];

export default function RoomTabs() {
  const [activeTab, setActiveTab] = useState('Hotels');

  return (
    <div className="mt-2">
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6 justify-between">
          {tabItems.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 w-full ${activeTab === tab ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === 'Rooms' && <p>Here are the room options...</p>}
        {activeTab === 'Amenities' && <p>Here are the amenities...</p>}
        {activeTab === 'About' && <p>About the hotel...</p>}
        {activeTab === 'General Policy' && <p>General policy details...</p>}
        {activeTab === 'Location' && <p>Hotel location info...</p>}
      </div>
    </div>
  );
}
