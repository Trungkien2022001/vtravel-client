"use client";
import HotelList from '@/components/hotel-list/HotelList'
import HotelPage from '@/components/product/info';
import ProductList from '@/components/product/product-list';
import RoomTabs from '@/components/product/rooms';
import Tour from '@/components/tour/tour';
import Vehicle from '@/components/vehicle/vehicle';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import FlightIcon from '@mui/icons-material/Flight';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import Guilder from '../guider/page';
const tabItems = ['Hotels', 'Flights', 'Tours', 'Vehicles', 'Tour Guide', 'Insurances'];
const Page = () => {
  const popupHotelDetailRef = useRef(null);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Tour Guide');
  const [hotelId, setHotelId] = useState('');
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
  const [isHotelDetailOpen, setHotelDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    stars: [],
    budget: '',
    location: [],
  });

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupHotelDetailRef.current && !popupHotelDetailRef.current.contains(event.target)) {
  //       setHotelDetailOpen(false);
  //       console.log("Kiennnnn")
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isHotelDetailOpen]);

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
      const data: any = {
        checkin,
        duration: 1,
        adult: rooms.reduce((s, r) => r.adult + s, 0),
        children: rooms.reduce((s, r) => r.children + s, 0),
        infant: rooms.reduce((s, r) => r.infant + s, 0),
        currency: "USD",
      };

      let searchType = ''
      switch (propertyType) {
        case 'region':
          data.region_id = propertyId
          searchType = 'region'
          break;

        case 'airport':
          data.airport_code = propertyId
          searchType = 'airport-code'
          break;

        default:
          break;
      }

      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/tour/search/${searchType}`,
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
  const handleGetRooms = (hotel_id) => {
    // const params = new URLSearchParams({
    //   hotel_id: hotel.hotel_id,
    //   checkin: conditional.checkin,
    //   checkout: conditional.checkout,
    //   rooms: JSON.stringify(conditional.rooms), // Assuming rooms is an object or array
    //   currency: 'USD'
    // }).toString();
    // // router.replace(`/products?${params}`);
    // router.push(`/products?${params}`);
    setHotelDetailOpen(true);
    setHotelId(hotel_id)
  }

  const Hotel = () => {
    const searchParams = useSearchParams();
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const rooms = JSON.parse(searchParams.get('rooms') || '{}');
    const currency = searchParams.get('currency');
    const [hotel, setHotel] = useState({} as any)
    const searchHotelsByRegion = async () => {
      try {
        const data = {
          rooms,
          checkin,
          checkout,
          hotel_id: hotelId,
          currency
        }
        const _res = await fetch(
          `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/hotel/detail`,
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
        setHotel(res.data)
        return res.data // Handle the response (e.g., update the UI or state)
      } catch (error) {
        console.error("Error searching hotels:", error);
      }
    };
    const getData = async () => {

      await searchHotelsByRegion()
    }
    useEffect(() => {
      getData()
    }, [])
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {hotel.id ?
          <div className="max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto mb-5 bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Hotel Name and Star Rating */}
              <div className="px-6 py-4">
                <h1 className="text-2xl font-semibold text-teal-500">{hotel.name}</h1>
                <div className="flex items-center mt-1">
                  {/* Placeholder for star rating (replace with dynamic star rating if available) */}
                  <span className="text-yellow-500 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2">
                  <img
                    src={hotel.images[0].urls[2].url}
                    alt={hotel.name}
                    width={480}
                    height={480}
                    className="w-full max-h-[480px] object-contain rounded-lg"
                  />
                </div>

                <div className="w-1/2 grid grid-cols-3 gap-3 pl-3 overflow-y-scroll" style={{ height: "500px" }}>
                  {hotel.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image.urls[0].url}
                      alt={`Image ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="px-6 py-4">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm font-medium">Address</span>
                  <p className="ml-2 text-gray-800">{hotel.address}</p>
                </div>
              </div>
            </div>

            <ProductList rooms={hotel.rooms} />

            <HotelPage />
          </div>
          : <></>}

      </Suspense>
    );
  }

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  function calculateDuration(leg) {
    const departureTime = moment(leg.departure_date_time);
    const arrivalTime = moment(leg.arrival_date_time);

    // Tính sự khác biệt về phút
    const totalMinutes = arrivalTime.diff(departureTime, 'minutes');

    // Tính giờ và phút
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Tạo chuỗi kết quả dạng "xx hours, xx minutes"
    return `${hours}h${minutes}m`;
  }


  // Function to close the popup
  const handleClose = () => {
    setHotelDetailOpen(false);
  };

  const getTransferByRegion = async () => {
    try {
      const data: any = {
        checkin,
        duration: 1,
        adult: rooms.reduce((s, r) => r.adult + s, 0),
        children: rooms.reduce((s, r) => r.children + s, 0),
        infant: rooms.reduce((s, r) => r.infant + s, 0),
        currency: "USD",
      };

      let searchType = ''
      switch (propertyType) {
        case 'region':
          data.region_id = propertyId
          searchType = 'region'
          break;

        case 'airport':
          data.airport_code = propertyId
          searchType = 'airport-code'
          break;

        default:
          break;
      }
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/vehicle/search/${searchType}`,
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

      <div className="flex border rounded-lg shadow-sm p-4 mb-4 bg-white">
        {/* Left side with flight details */}
        <div className="flex flex-col w-full justify-center">
          {/* Outbound Flight */}
          <div className="border-b pb-2 mb-2">
            {flight.outbound.map((leg, index) => (
              <div key={index} className="flex items-center mb-1">
                <div className="w-14 h-14 mr-5 rounded-3xl bg-teal-500 text-white flex items-center justify-center text-xl font-bold">
                  {airlineName}
                </div>
                <div key={index} className="flex flex-grow flex-col items-center">
                  {/* Row for time */}
                  <div className="flex justify-between items-center w-full text-sm text-teal-500 px-8 py-1">
                    {/* Departure time */}
                    <p>{leg.departure_airport_code}</p>

                    <div className="relative w-full mx-4 ">
                      <hr className="border-gray-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white px-2">
                          {leg.flight_no}
                        </span>
                        <div className='relative'>


                        </div>
                      </div>
                    </div>

                    <p>{leg.arrival_airport_code}</p>
                  </div>

                  <div className="flex justify-between items-center w-full text-sm text-gray-500 ">
                    <p>{moment(leg.departure_date_time).format('HH:mm DD/MM/YY')}</p>
                    <p>{calculateDuration(leg)}</p>
                    <p>{moment(leg.arrival_date_time).format('HH:mm DD/MM/YY')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inbound Flight */}
          <div>
            {flight.inbound.map((leg, index) => (
              <div key={index} className="flex items-center mb-1">
                <div className="w-14 h-14 mr-5 rounded-3xl bg-teal-500 text-white flex items-center justify-center text-xl font-bold">
                  {airlineName}
                </div>
                <div key={index} className="flex flex-grow flex-col items-center">
                  {/* Row for time */}
                  <div className="flex justify-between items-center w-full text-sm text-teal-500 px-8 py-1">
                    {/* Departure time */}
                    <p>{leg.departure_airport_code}</p>

                    <div className="relative w-full mx-4 ">
                      <hr className="border-gray-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white px-2">
                          {leg.flight_no}
                        </span>
                        <div className='relative'>


                        </div>
                      </div>
                    </div>

                    <p>{leg.arrival_airport_code}</p>
                  </div>

                  <div className="flex justify-between items-center w-full text-sm text-gray-500 ">
                    <p>{moment(leg.departure_date_time).format('HH:mm DD/MM/YY')}</p>
                    <p>{calculateDuration(leg)}</p>
                    <p>{moment(leg.arrival_date_time).format('HH:mm DD/MM/YY')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side with price and actions */}
        <div className="ml-5 bg-white border border-teal-500 text-teal-500 rounded-lg p-4 text-center w-64 flex flex-col">
          <p className="text-lg">PRICE</p>
          <p className="text-2xl font-bold">{flight.fares[0].total_fare} {flight.fares[0].currency}</p>
          <p className="text-sm">Round Trip</p>
          <button className="bg-teal-500 text-white rounded-lg py-2 px-6 mt-4 hover:bg-teal-800">
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
        <h1 className=" mx-12 text-2xl font-bold">Your trip in {region_name_full}</h1>
        <div className='mx-12 flex'>
          <div className="product w-full">
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
                  <div className='text-center font-bold text-xl text-teal-500'>Total: {hotels?.length} hotels!</div>
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
                    <div className="w-3/4">
                      {hotels?.length > 0 ? (
                        hotels?.slice(0, 250).map((hotel, index) => (
                          <div key={index} className="flex border rounded-lg shadow-sm p-4 mb-4 bg-white">
                            <img
                              src={hotel.images?.[0]?.url}
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
                              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600" onClick={() => handleGetRooms(hotel.hotel_id)}>
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
                  <div className="min-h-screen bg-gray-100">
                    <div className='text-center font-bold text-xl text-teal-500'>Total: {flights?.length} flights!</div>
                    <div className='flex'>
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
                      <div className='w-3/4'>

                        {
                          flights.map((flightData) => (<FlightCard {...flightData} />))
                        }
                      </div>
                    </div>

                  </div>}
                {activeTab === 'Tours' && <Tour tours={tours} />}
                {activeTab === 'Vehicles' && <Vehicle vehicles={vehicles} />}
                {activeTab === 'Tour Guide' && <Guilder />}
                {activeTab === 'Insurances' && <div className=' px-24 text-center font-bold text-2xl text-teal-500'>
                  Currently, we offer only one insurance service: You can enjoy your travel experience with peace of mind.
                  If anything differs from what we have described, please call our customer service center.
                  If what you report is correct, you will receive a full refund of your travel expenses.!</div>}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-[450px] mx-5 mt-15">
            <h2 className="text-xl font-bold mb-4">Prices</h2>
            <hr className="mb-5" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FlightIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    VJ197-VJ194-VJ197-VJ194-VJ197-VJ194
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 1101.01</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <HotelOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    Free Airport Misaki Hotel by VOOH
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 1101.01</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <TourOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    Free Airport Misaki Hotel by VOOH
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 1101.01</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <DirectionsCarFilledOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    Free Airport Misaki Hotel by VOOH
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 1101.01</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <SupportAgentOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    Free Airport Misaki Hotel by VOOH
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 1101.01</span>
              </div>
              <hr className="" />
            </div>

            <button className="mt-6 w-full bg-teal-500 text-white py-2 rounded-lg font-bold flex flex-col items-center">
              <span className='text-lg'>CONTINUE</span>
              <span className="text-sm mt-1">1200 USD</span>
            </button>
            <hr className='mt-16 mb-5' />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <HealthAndSafetyOutlinedIcon className='text-teal-500' />
                <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                  Travel Insurance
                </span>
              </div>
              <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 1101.01</span>
            </div>
            <hr className="mt-5" />

            <button className="mt-6 w-full bg-teal-500 text-white py-2 rounded-lg font-bold flex flex-col items-center">
              <span className='text-lg'>CONTINUE WITH INSURANCES</span>
              <span className="text-sm mt-1">1200 USD</span>
            </button>

            <div className='text-sm text-teal-500 mt-2'>Adding travel insurance ensures your safety and protects your rights during unexpected events on your journey.</div>
          </div>

          {isHotelDetailOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-100 w-full max-w-7xl h-full max-h-[95vh] p-6 relative rounded-lg overflow-auto">
                {/* Close button */}
                <button
                  className="absolute top-0 right-0 text-red-400 text-6xl font-bold bg-gray-500 rounded-full w-16 h-16"
                  onClick={handleClose}
                >
                  &times;
                </button>
                {/* Hotel Detail Content */}
                <Hotel />
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default Page