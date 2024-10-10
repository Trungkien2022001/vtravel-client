import { useState } from 'react';

const tabItems = ['Rooms', 'Amenities', 'About', 'General Policy', 'Location'];

export default function RoomTabs({rooms}) {
  const [activeTab, setActiveTab] = useState('Rooms');

  return (
    <div className="mt-6">
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-4">
          {tabItems.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600 hover:text-gray-800'}`}
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
