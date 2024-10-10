/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/layout/footer";
import PictureGrid from "@/components/picture/picture";
import { SetStateAction, useEffect, useState } from "react";
import moment from 'moment';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [checkinDate, setCheckinDate] = useState(moment().format('YYYY-MM-DD'));
  const [checkoutDate, setCheckoutDate] =  useState(moment().add(1, 'day').format('YYYY-MM-DD'));
  
  const handleCheckinChange = (event) => {
    setCheckinDate(event.target.value);
  };
  
  const handleCheckoutChange = (event) => {
    setCheckoutDate(event.target.value);
  };
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [roomCount, setRoomCount] = useState(1);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [rooms, setRooms] = useState([{ adult: 1, children: 0, infant: 0 }]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [region, setRegion] = useState({})
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };
  const getSuggested = async (text: string) => {
    try {
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/hotel-placeholder-suggested`,
        {
          method: "POST", // Specify the HTTP method
          headers: {
            "x-key": "superkey", // Add your x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI4MDk4MzI2LCJleHAiOjE3Mjg5NjIzMjZ9.ALI-BMgkrugKtcwaHULP3UDBtlJZYZF-pjNjjFLTlBs", // Add your token
            "Content-Type": "application/json", // Ensure the request sends JSON
          },
          body: JSON.stringify({
            text, // The text to be sent in the body
          }),
          cache: "no-cache", // Prevents caching
        }
      );
  
      // Check if the response is OK
      if (!_res.ok) {
        throw new Error("Failed to fetch suggestions");
      }
  
      const res = await _res.json();
      const hotels: any[] = res.data.hotels.map(h=>({
        ...h,
        text: h.name,
        type: 'hotel'
      }))
      const regions: any[] = res.data.regions.map(h=>({
        ...h,
        text: h.region_name_full,
        type: 'region'
      }))
      // console.log(hotels, regions)
      const list =  [...regions, ...hotels].filter((destination) =>
        destination.text.toLowerCase().includes(query)
      )
      // console.log(list)
      setFilteredDestinations(list as SetStateAction<never[]>)
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Debounce the query input (delay of 0.5s)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Update the debounced query after 0.5s
    }, 500); // 500ms delay

    // Cleanup function to clear the timeout if query changes before 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Effect to call the API whenever the debounced query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery) {
        await getSuggested(debouncedQuery); // Ensure this is in an async function
      }
    };

    fetchSuggestions(); // Call the async function
  }, [debouncedQuery]);
  

  const handleSubmit = async () => {
    const task = [

      searchHotelsByRegion(),
      getToursByRegion(),
      getTransferByRegion(),
    ]
    // const result = await Promise.all(task)
    const params = new URLSearchParams({
      region_id: (region as any).region_id,
      checkin: checkinDate,
      checkout: checkoutDate,
      rooms: JSON.stringify(rooms), // Assuming rooms is an object or array
      region_name_full: region.region_name_full,
      currency: 'USD'
    }).toString();
    router.push(`/shopping?${params}`);
    // console.log(result)
  }

  const searchHotelsByRegion = async () => {
    try {
      const region_id = (region as any).region_id
      const data = {
        rooms,
        checkin: checkinDate,
        checkout: checkoutDate,
        region_id,
        currency: "SGD"
      }
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/hotel/search/region`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI4MDk4MzI2LCJleHAiOjE3Mjg5NjIzMjZ9.ALI-BMgkrugKtcwaHULP3UDBtlJZYZF-pjNjjFLTlBs", // Add your access token
            "Content-Type": "application/json", // Make sure you're sending JSON
          },
          body: JSON.stringify(data),
          cache: "no-cache", // Avoid caching the response
        }
      );
  
      if (!_res.ok) {
        throw new Error("Failed to search hotels");
      }
  
      const res = await _res.json();
      // console.log(res.data); // Handle the response (e.g., update the UI or state)
    } catch (error) {
      console.error("Error searching hotels:", error);
    }
  };

  const getToursByRegion = async () => {
    try {
      const region_id = (region as any).region_id;
      const data = {
        checkin: checkinDate,
        duration: 1,
        adult: rooms.reduce((s, r)=> r.adult + s, 0),
        children: rooms.reduce((s, r)=> r.children + s, 0),
        infant: rooms.reduce((s, r)=> r.infant + s, 0),
        currency: "VND",
        region_id
      };
  
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/tour/search/region`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI4MDk4MzI2LCJleHAiOjE3Mjg5NjIzMjZ9.ALI-BMgkrugKtcwaHULP3UDBtlJZYZF-pjNjjFLTlBs", // Add your access token
            "Content-Type": "application/json", // Make sure you're sending JSON
          },
          body: JSON.stringify(data),
          cache: "no-cache", // Avoid caching the response
        }
      );
  
      if (!_res.ok) {
        throw new Error("Failed to search tours");
      }
  
      const res = await _res.json();
      // console.log(res.data); // Handle the response (e.g., update the UI or state)
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  };

  const getTransferByRegion = async () => {
    try {
      const region_id = (region as any).region_id;
      const data = {
        checkin: checkinDate,
        duration: 1,
        adult: rooms.reduce((s, r)=> r.adult + s, 0),
        children: rooms.reduce((s, r)=> r.children + s, 0),
        infant: rooms.reduce((s, r)=> r.infant + s, 0),
        currency: "VND",
        region_id
      };
  
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/vehicle/search/region`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI4MDk4MzI2LCJleHAiOjE3Mjg5NjIzMjZ9.ALI-BMgkrugKtcwaHULP3UDBtlJZYZF-pjNjjFLTlBs", // Add your access token
            "Content-Type": "application/json", // Ensure the request sends JSON
          },
          body: JSON.stringify(data),
          cache: "no-cache", // Prevent caching
        }
      );
  
      if (!_res.ok) {
        throw new Error("Failed to search transfers");
      }
  
      const res = await _res.json();
      // console.log(res.data); // Handle the response (e.g., update the UI or state)
    } catch (error) {
      console.error("Error searching transfers:", error);
    }
  };
  
  
  


  const addRoom = () => {
    if (rooms.length < 5) { // Limit to a maximum of 3 rooms
      setRooms([...rooms, { adult: 1, children: 0, infant: 0 }]);
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
              <ul className="absolute left-0 right-0 mt-2 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination: any, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {setRegion(destination)}}
                    >
                      {destination.text}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No destinations found</li>
                )}
              </ul>
            )}
          </div>

          {/* Departure Date Picker */}
          {/* <div className="flex items-center border rounded-md mr-4">
            <span className="p-2 text-gray-500">📅</span>
            <input
              type="date"
              value={departureDate}
              onChange={handleDateChange}
              className="p-2 outline-none rounded-md"
            />
          </div> */}
           <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Check-in */}
      <div className="flex items-center border rounded-md">
        {/* <span className="p-2 text-gray-500">📅 Check-in</span> */}
        <input
          type="date"
          value={checkinDate}
          onChange={handleCheckinChange}
          className="p-2 outline-none rounded-md"
        />
      </div>

      {/* Check-out */}
      <div className="flex items-center border rounded-md">
        {/* <span className="p-2 text-gray-500">📅 Check-out</span> */}
        <input
          type="date"
          value={checkoutDate}
          onChange={handleCheckoutChange}
          className="p-2 outline-none rounded-md"
        />
      </div>
    </div>

          {/* Traveller Dropdown */}
          <div className="relative">
            <div
              className="flex items-center border rounded-md cursor-pointer p-2"
              onClick={toggleTravellerDropdown}
            >
              <span className="text-gray-500">
                Traveller: {rooms.length} Rooms, {rooms.reduce((acc, room) => acc + room.adult, 0)} adult
              </span>
            </div>
            {showTravellerDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-64 bg-white border rounded-md shadow-lg">
                <div className="p-4">
                  {rooms.map((room, index) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <h3 className="font-bold">Room {index + 1}</h3>
                      <div className="flex justify-between items-center">
                        <span>adult (18 or above)</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (room.adult > 0) {
                                const newRooms = [...rooms];
                                newRooms[index].adult--;
                                setRooms(newRooms);
                              }
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            -
                          </button>
                          <span>{room.adult}</span>
                          <button
                            onClick={() => {
                              const newRooms = [...rooms];
                              newRooms[index].adult++;
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
                        <span>infant (Under 2)</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (room.infant > 0) {
                                const newRooms = [...rooms];
                                newRooms[index].infant--;
                                setRooms(newRooms);
                              }
                            }}
                            className="bg-gray-200 p-1 rounded"
                          >
                            -
                          </button>
                          <span>{room.infant}</span>
                          <button
                            onClick={() => {
                              const newRooms = [...rooms];
                              newRooms[index].infant++;
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
                    Maximum room is 5 per booking. Age of children/infant should be considered from the date of departure.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="bg-orange-500 text-white rounded px-4 py-2" onClick={handleSubmit}>SEARCH NOW</button>
        </div>
      </div>
      <PictureGrid/>
      <Footer />
    </div>
  );
}
