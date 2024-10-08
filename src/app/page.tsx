"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/layout/footer";
import PictureGrid from "@/components/picture/picture";
import { useState } from "react";

const destinations = [
  'Jeddah, Makkah Province, Saudi Arabia',
  'Durrat Al-Arous, Jeddah, Makkah Province, Saudi Arabia',
  'Al Riyadh, Jeddah, Makkah Province, Saudi Arabia',
  'Ṣumaymah, Jeddah, Makkah Province, Saudi Arabia',
  'Banī Mālik, Jeddah, Makkah Province, Saudi Arabia',
  'Al-Hamadaniyah, Jeddah, Makkah Province, Saudi Arabia',
  'Thuwal, Jeddah, Makkah Province, Saudi Arabia',
  'Dhahban, Jeddah, Makkah Province, Saudi Arabia',
  'Obhur Al-Shamaliyah, Jeddah, Makkah Province, Saudi Arabia',
  'Obhur Al-Janoubiyah, Jeddah, Makkah Province, Saudi Arabia',
  'Ali Salamah, Jeddah, Makkah Province, Saudi Arabia',
  'Jeddah Cloud, Al Barak, Jeddah, Makkah Province, Saudi Arabia',
  'Aerotel Jeddah - Transit Hotel in Terminal 1',
  'Holiday Inn Jeddah Corniche, an IHG Hotel',
  'Laten Suites Al Salim Plaza, Jeddah',
];

export default function Home() {
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [roomCount, setRoomCount] = useState(1);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
  const [query, setQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFilteredDestinations(
      destinations.filter((destination) =>
        destination.toLowerCase().includes(value)
      )
    );
  };


  const addRoom = () => {
    if (rooms.length < 3) { // Limit to a maximum of 3 rooms
      setRooms([...rooms, { adults: 1, children: 0, infants: 0 }]);
    }
  };

  const removeRoom = (index) => {
    const newRooms = rooms.filter((_, roomIndex) => roomIndex !== index);
    setRooms(newRooms);
  };
  const toggleTravellerDropdown = () => {
    setShowTravellerDropdown(!showTravellerDropdown);
  };

  const handleDateChange = (event) => {
    setDepartureDate(event.target.value);
  };
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-white border-b shadow min-h-screen">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Destination Input */}
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search destination"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {query && (
              <ul className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setQuery(destination)}
                    >
                      {destination}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No destinations found</li>
                )}
              </ul>
            )}
          </div>

          {/* Departure Date Picker */}
          <div className="flex items-center border rounded-md mr-4">
            <span className="p-2 text-gray-500">📅</span>
            <input
              type="date"
              value={departureDate}
              onChange={handleDateChange}
              className="p-2 outline-none rounded-md"
            />
          </div>

          {/* Traveller Dropdown */}
          <div className="relative">
            <div
              className="flex items-center border rounded-md cursor-pointer p-2"
              onClick={toggleTravellerDropdown}
            >
              <span className="text-gray-500">
                Traveller: {rooms.length} Rooms, {rooms.reduce((acc, room) => acc + room.adults, 0)} Adults
              </span>
            </div>
            {showTravellerDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-64 bg-white border rounded-md shadow-lg">
                <div className="p-4">
                  {rooms.map((room, index) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <h3 className="font-bold">Room {index + 1}</h3>
                      <div className="flex justify-between items-center">
                        <span>Adults (18 or above)</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (room.adults > 0) {
                                const newRooms = [...rooms];
                                newRooms[index].adults--;
                                setRooms(newRooms);
                              }
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            -
                          </button>
                          <span>{room.adults}</span>
                          <button
                            onClick={() => {
                              const newRooms = [...rooms];
                              newRooms[index].adults++;
                              setRooms(newRooms);
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span>Children (Ages 2-17)</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (room.children > 0) {
                                const newRooms = [...rooms];
                                newRooms[index].children--;
                                setRooms(newRooms);
                              }
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            -
                          </button>
                          <span>{room.children}</span>
                          <button
                            onClick={() => {
                              const newRooms = [...rooms];
                              newRooms[index].children++;
                              setRooms(newRooms);
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span>Infants (Under 2)</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (room.infants > 0) {
                                const newRooms = [...rooms];
                                newRooms[index].infants--;
                                setRooms(newRooms);
                              }
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            -
                          </button>
                          <span>{room.infants}</span>
                          <button
                            onClick={() => {
                              const newRooms = [...rooms];
                              newRooms[index].infants++;
                              setRooms(newRooms);
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-red-500 mt-2"
                        onClick={() => removeRoom(index)}
                      >
                        Remove Room
                      </button>
                    </div>
                  ))}
                  <div className="mt-4 text-orange-500 cursor-pointer" onClick={addRoom}>
                    + Add Room
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum room is 3 per booking. Age of children/infants should be considered from the date of departure.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="bg-orange-500 text-white rounded px-4 py-2">SEARCH NOW</button>
        </div>
      </div>
      <PictureGrid/>
      <Footer />
    </div>
  );
}
