"use client";
import HotelList from '@/components/hotel-list/HotelList'
import HotelPage from '@/components/product/info';
import RoomTabs from '@/components/product/rooms';
import Tour from '@/components/tour/tour';
import Vehicle from '@/components/vehicle/vehicle';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react'
const tabItems = ['Hotels', 'Flights', 'Tours', 'Vehicles', 'Tour Guide', 'Insurances'];
const Page = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Flights');
  const region_id = searchParams.get('property_id');
  const propertyId = searchParams.get('property_id');
  const propertyType = searchParams.get('property_type');
  const region_name_full = searchParams.get('region_name_full');
  const departureAirport = searchParams.get('departure_airport');
  const arrivalAirport = searchParams.get('arrival_airport');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const rooms = JSON.parse(searchParams.get('rooms') || '{}');
  const currency = searchParams.get('currency');
  const [hotels, setHotels] = useState([])
  const [tours, setTours] = useState([])
  const [flights, setFlights] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [filters, setFilters] = useState({
    stars: [],
    budget: '',
    location: [],
  });

  const searchHotels = async () => {
    try {
      const data: any = {
        rooms,
        checkin,
        checkout,
        currency
      }
      let searchType = ''
      switch (propertyType) {
        case 'region':
          data.region_id = propertyId
          searchType = 'region'
          break;

        case 'hotel':
          data.hotel_ids = [propertyId]
          searchType = 'hotel-ids'
          break;

        case 'airport':
          data.airport_code = propertyId
          searchType = 'airport-code'
          break;

        default:
          break;
      }
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/hotel/search/${searchType}`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI5NDMxNDEzLCJleHAiOjE4MTU4MzE0MTN9.Td4LHircGbJxDfepwE4oMkQfM-tbXqOgPf9o7DLhEsQ", // Add your access token
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
      // console.log(res.data);
      setHotels(res.data)
      return res.data // Handle the response (e.g., update the UI or state)
    } catch (error) {
      console.error("Error searching hotels:", error);
    }
  };

  const getToursByRegion = async () => {
    try {
      const data = {
        checkin,
        duration: 1,
        adult: rooms.reduce((s, r) => r.adult + s, 0),
        children: rooms.reduce((s, r) => r.children + s, 0),
        infant: rooms.reduce((s, r) => r.infant + s, 0),
        currency: "USD",
        region_id: "1428"
      };

      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/tour/search/region`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI4OTY4MTQ5LCJleHAiOjE3Mjk4MzIxNDl9.gQCd3T4gl48gyh6slUQ2Y0VrmjXtgMq58SJ2tUK5JvQ", // Add your access token
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
      setTours(res.data)
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  };

  const getFlights = async () => {
    try {
      const data = {
        departure_date: checkin,  // Replace with your dynamic date
        return_date: checkout,      // Replace with your dynamic date
        is_round_trip: true,
        cabin_class: "Economy",
        adult: rooms.reduce((s, r) => r.adult + s, 0),
        children: rooms.reduce((s, r) => r.children + s, 0),
        infant: rooms.reduce((s, r) => r.infant + s, 0),                   // Replace with your dynamic infant count
        currency: "USD",
        departure_airport_code: departureAirport,  // Replace with your dynamic departure code
        arrival_airport_code: arrivalAirport      // Replace with your dynamic arrival code
      };

      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/flight/available`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add your x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI5NTE3OTYyLCJleHAiOjE3MzAzODE5NjJ9.0OUoZjnmvGW5L7aqMWqWA-OUT_fNzVl14nHEDmvLYlw", // Add your access token
            "Content-Type": "application/json", // Make sure you're sending JSON
          },
          body: JSON.stringify(data),
          cache: "no-cache", // Avoid caching the response
        }
      );

      if (!_res.ok) {
        throw new Error("Failed to fetch flights");
      }

      const res = await _res.json();
      // console.log(res.data); // Handle the response (e.g., update the UI or state)
      setFlights(res.data); // Assuming you have a state setter for flights
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  // const router = useRouter(); 
  const handleGetRooms = () => {
    // const params = new URLSearchParams({
    //   hotel_id: hotel.hotel_id,
    //   checkin: conditional.checkin,
    //   checkout: conditional.checkout,
    //   rooms: JSON.stringify(conditional.rooms), // Assuming rooms is an object or array
    //   currency: 'USD'
    // }).toString();
    // // router.replace(`/products?${params}`);
    // router.push(`/products?${params}`);
  }

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const getTransferByRegion = async () => {
    try {
      const data = {
        checkin,
        duration: 1,
        adult: rooms.reduce((s, r) => r.adult + s, 0),
        children: rooms.reduce((s, r) => r.children + s, 0),
        infant: rooms.reduce((s, r) => r.infant + s, 0),
        currency: "USD",
        region_id: "1428"
      };

      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/vehicle/search/region`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI4OTY4MTQ5LCJleHAiOjE3Mjk4MzIxNDl9.gQCd3T4gl48gyh6slUQ2Y0VrmjXtgMq58SJ2tUK5JvQ", // Add your access token
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
      setVehicles(res.data)
    } catch (error) {
      console.error("Error searching transfers:", error);
    }
  };
  const getData = async () => {
    const task = [

      searchHotels(),
      getFlights(),
      getToursByRegion(),
      getTransferByRegion(),
    ]
    await Promise.all(task)

  }
  useEffect(() => {
    getData()
  }, [])
  // console.log(tours, hotels, vehicles)

  const FlightCard = (flight) => {
    const airlineName = flight.flight_id.substring(0, 2)
    return (

      <div className="flex border rounded-lg shadow-sm p-4 mb-4 bg-white" style={{width: "850px"}}>
        {/* Left side with flight details */}
        <div className="flex flex-col w-3/4">
          {/* Outbound Flight */}
          <div className="border-b mb-1">
            {flight.outbound.map((leg, index) => (
             <div key={index} className="flex items-center mb-4">
             <img src={airlineName} alt={airlineName} className="w-16 h-16 rounded-md mr-4" />
             <div key={index} className="flex flex-col items-center mb-4">
             {/* Row for time */}
             <div className="flex justify-between items-center w-96 text-sm text-gray-600">
               {/* Departure time */}
               <p>{leg.departure_date_time}</p>

               <div className="relative w-full mx-4">
                 <hr className="border-gray-300" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="bg-white px-2 text-orange-500">
                     {"4h20"} {/* Example: 10h 35m */}
                   </span>
                   <div className='relative'>
                    <img src="/path-to-plane-icon.svg" alt="plane icon" className="w-4 h-4 ml-2" />
                      <p className="absolute text-teal-500 mt-2">{leg.flight_no}</p>
                   </div>
                 </div>
               </div>

               <p>{leg.arrival_date_time}</p>
             </div>

             <div className="flex justify-between items-center w-full text-sm text-gray-500 mt-2">
               <p>{leg.departure_airport_code}</p>
               <p>{leg.arrival_airport_code}</p>
             </div>
           </div>
           </div>
            ))}
          </div>

          {/* Inbound Flight */}
          <div>
            {flight.inbound.map((leg, index) => (
              <div key={index} className="flex items-center mb-4">
                <img src={airlineName} alt={airlineName} className="w-16 h-16 rounded-md mr-4" />
                <div key={index} className="flex flex-col items-center mb-4">
                {/* Row for time */}
                <div className="flex justify-between items-center w-96 text-sm text-gray-600">
                  {/* Departure time */}
                  <p>{leg.departure_date_time}</p>

                  <div className="relative w-full mx-4">
                    <hr className="border-gray-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-orange-500">
                        {leg.duration} {/* Example: 10h 35m */}
                      </span>
                      <img src="/path-to-plane-icon.svg" alt="plane icon" className="w-4 h-4 ml-2" />
                    </div>
                  </div>

                  <p>{leg.arrival_date_time}</p>
                </div>

                <div className="flex justify-between items-center w-full text-sm text-gray-500 mt-2">
                  <p>{leg.departure_airport_code} (and vicinity)</p>
                  <p className="text-orange-500">Via {leg.layover_airport_code}</p>
                  <p>{leg.arrival_airport_code}</p>
                </div>
                <p className="text-teal-500 mt-2">{leg.flight_no}</p>
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side with price and actions */}
        <div className="bg-orange-500 text-white rounded-lg p-4 text-center w-64 flex flex-col justify-center">
          <p className="text-lg">PRICE</p>
          <p className="text-2xl font-bold">{flight.fares[0].total_fare}</p>
          <p className="text-sm">Round Trip</p>
          <button className="bg-white text-orange-500 rounded-lg py-2 px-6 mt-4 hover:bg-gray-200">
            Select
          </button>
          <p className="text-xs mt-2 underline cursor-pointer">Price Breakdown</p>
        </div>
      </div>

    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-100 p-8 mx">
        <h1 className=" mx-28 text-2xl font-bold">Your stay in {region_name_full}</h1>
        <div className='mx-28 flex w-full'>

          <div className="product ">
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
                {activeTab === 'Hotels' && <>
                  <div className='text-center font-bold text-2xl'>We find {hotels?.length} hotels!</div>
                  <div className="flex">
                    <div className="w-1/4">
                      <div className="w-64 bg-white border p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Filters</h2>

                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Stars</h3>
                          <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <label key={star} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  name="stars"
                                  value={star}
                                  onChange={handleFilterChange}
                                  className="form-checkbox"
                                />
                                <span>{star} Stars</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Budget</h3>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="budget"
                                value="0-100"
                                onChange={handleFilterChange}
                                className="form-radio"
                              />
                              <span>Less than SR 100</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="budget"
                                value="100-500"
                                onChange={handleFilterChange}
                                className="form-radio"
                              />
                              <span>SR 100 - SR 500</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="budget"
                                value="500-1000"
                                onChange={handleFilterChange}
                                className="form-radio"
                              />
                              <span>SR 500 - SR 1000</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Nearby Locations</h3>
                          <div className="space-y-2">
                            {['Central Fish Market', 'Shorbanty House', 'Fakieh Aquarium'].map(
                              (location) => (
                                <label key={location} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    name="location"
                                    value={location}
                                    onChange={handleFilterChange}
                                    className="form-checkbox"
                                  />
                                  <span>{location}</span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-3/4 pl-8">
                      {hotels?.length > 0 ? (
                        hotels?.slice(0, 10).map((hotel, index) => (
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
                        ))
                      ) : (
                        <p>No hotels match your criteria.</p>
                      )}
                    </div>
                  </div>
                </>}
                {activeTab === 'Flights' &&
                  <div className="min-h-screen bg-gray-100 flex">
                    <div className="w-1/4 p-8">
                      <div className="w-64 bg-white border p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Filters</h2>

                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Stars</h3>
                          <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <label key={star} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  name="stars"
                                  value={star}
                                  onChange={handleFilterChange}
                                  className="form-checkbox"
                                />
                                <span>{star} Stars</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Budget</h3>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="budget"
                                value="0-100"
                                onChange={handleFilterChange}
                                className="form-radio"
                              />
                              <span>Less than SR 100</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="budget"
                                value="100-500"
                                onChange={handleFilterChange}
                                className="form-radio"
                              />
                              <span>SR 100 - SR 500</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="budget"
                                value="500-1000"
                                onChange={handleFilterChange}
                                className="form-radio"
                              />
                              <span>SR 500 - SR 1000</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Nearby Locations</h3>
                          <div className="space-y-2">
                            {['Central Fish Market', 'Shorbanty House', 'Fakieh Aquarium'].map(
                              (location) => (
                                <label key={location} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    name="location"
                                    value={location}
                                    onChange={handleFilterChange}
                                    className="form-checkbox"
                                  />
                                  <span>{location}</span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-3/4 p-8'>

                      {
                        flights.map((flightData) => (<FlightCard {...flightData} />))
                      }
                    </div>

                  </div>}
                {activeTab === 'Tours' && <Tour tours={tours} />}
                {activeTab === 'Vehicles' &&  <Vehicle vehicles={vehicles} />}
                {activeTab === 'Tour Guide' && <p>Tour Guide</p>}
                {activeTab === 'Insurances' && <p>Insurances</p>}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-96 mx-5 mt-15">
            <h2 className="text-xl font-bold mb-4">Prices</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h4M8 3h4M8 16h4M9.5 21l-1.75-2M9.5 3L7.75 5M9.5 16L7.75 18M15.5 21l1.75-2M15.5 3L17.25 5M15.5 16l1.75 2" />
                  </svg>
                  <span>DOH - JED - DOH</span>
                </div>
                <span>SR 1,072.40</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20h12M6 8h12M6 4h12M6 12h12" />
                  </svg>
                  <span>Dara Hamra</span>
                </div>
                <span>SR 743.25</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M6 16h12" />
                  </svg>
                  <span>Airline Taxes And Fees</span>
                </div>
                <span>SR 1,123.47</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>SR 2,939.12</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-teal-500 text-white py-3 rounded-lg font-bold">
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Page