"use client";
import ProductList from '@/components/product/product-list';
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
import Guilder from '../../../../dev/guider/page';
import { FaStar } from "react-icons/fa";

const tabItems = ['Hotels', 'Flights', 'Tours', 'Vehicles', 'Tour Guide', 'Insurances'];
const Page = () => {
  const popupHotelDetailRef = useRef(null);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Hotels');
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
  const [regionDetail, setRegionDetail] = useState()
  const [rating, setRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState({
    hotel: {},
    tour: {},
    flight: {},
    vehicle: {},
    insurance: {},
    guilder: {}
  })

  console.log(regionDetail)

  const [selectedRoom, setSelectedRoom] = useState();

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };
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
      setHotels(res.data || [])
      setPackages(prev => ({
        ...prev,
        hotel: res.data?.[0] || []
      }))
      return res.data // Handle the response (e.g., update the UI or state)
    } catch (error) {
      console.error("Error searching hotels:", error);
    }
  };

  const searchRegionDetail = async () => {
    if (propertyType !== 'region') {
      return
    }
    try {
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/region/detail`,
        {
          method: "POST", // HTTP method
          headers: {
            "x-key": "superkey", // Add x-key header
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid29ya3NwYWNlIjoiYWdlbnQsIiwiaWF0IjoxNzI5NDMxNDEzLCJleHAiOjE4MTU4MzE0MTN9.Td4LHircGbJxDfepwE4oMkQfM-tbXqOgPf9o7DLhEsQ", // Add your access token
            "Content-Type": "application/json", // Make sure you're sending JSON
          },
          body: JSON.stringify({
            region_id: propertyId
          }),
          cache: "no-cache", // Avoid caching the response
        }
      );

      if (!_res.ok) {
        throw new Error("Failed to search hotels");
      }

      const res = await _res.json();
      // console.log(res.data);
      setRegionDetail(res.data)
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
      setPackages(prev => ({
        ...prev,
        tour: res.data?.[0] || []
      }))
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  };

  const getFlights = async () => {
    if (!departureAirport || !arrivalAirport || arrivalAirport === departureAirport) {
      return;
    }
    try {
      const data = {
        departure_date: moment().format('YYYY-MM-DD') ===  checkin ? checkin : moment(checkin).subtract(1, 'day').format('YYYY-MM-DD'),  // Replace with your dynamic date
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
      setFlights(Array.isArray(res.data) ? res.data : []); // Assuming you have a state setter for flights
      setPackages(prev => ({
        ...prev,
        flight: res.data?.[0] || []
      }))
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
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
      setPackages(prev => ({
        ...prev,
        transfer: res.data?.[0] || []
      }))
    } catch (error) {
      console.error("Error searching transfers:", error);
    }
  };

  const handleGetRooms = (hotel_id) => {
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

            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-500 ml-5">Room Selection</h2>
              {hotel.rooms.map((room) => (
                <ProductCard
                  key={room.id}
                  room={room}
                  selectedRoom={selectedRoom}
                  onSelect={handleSelectRoom}
                />
              ))}
              {selectedRoom && (
                <div className="mt-4">
                  <button className="bg-teal-500 text-white px-6 py-3 rounded-md w-full font-semibold hover:bg-orange-600">
                    Book {(selectedRoom as any).type} for {(selectedRoom as any).price}
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50">
              {/* About Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Check-in Instruction</h3>
                    <ul className="list-disc list-inside mb-4">
                      <li>Extra-person charges may apply...</li>
                      <li>Government-issued photo ID and credit card required...</li>
                      <li>Cashless transactions are available.</li>
                      {/* Add the remaining bullet points similarly */}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Check-in / Checkout Times</h3>
                    <p>Check-in: 2:00 PM</p>
                    <p>Checkout: 12:00 PM</p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Location</h3>
                    <p>With a stay at Jeddah Hilton, you&apos;ll be centrally located...</p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Attractions</h3>
                    <ul className="list-disc list-inside">
                      <li>Hera Street: 0.3 km / 0.2 mi</li>
                      <li>King Abdul Aziz Road: 1.4 km / 0.9 mi</li>
                      {/* Add the remaining attractions */}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Rooms Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Rooms</h3>
                <p>Make yourself at home in one of the 388 individually decorated guestrooms...</p>
                {/* Add more details if necessary */}
              </section>

              {/* Amenities Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <p>Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials...</p>
                {/* Add more details */}
              </section>

              {/* Business Amenities Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Business Amenities</h3>
                <p>Featured amenities include a 24-hour business center, limo/town car service...</p>
                {/* Add more details */}
              </section>

              {/* Dining Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Dining</h3>
                <p>Enjoy international cuisine at Al Safinah Restaurant, one of the hotel's 3 restaurants...</p>
              </section>

              {/* General Policy Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">General Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="list-disc list-inside">
                    <li>No alcohol served onsite</li>
                    <li>Property is cleaned with disinfectant</li>
                    {/* Add more policy points */}
                  </ul>
                  <ul className="list-disc list-inside">
                    <li>Guests are provided with hand sanitizer</li>
                    <li>Bed sheets and towels are washed at high temperatures</li>
                    {/* Add more policy points */}
                  </ul>
                </div>
              </section>

              {/* Location Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <ul className="list-disc list-inside">
                  <li>Hera Street: 0.3 km / 0.2 mi</li>
                  <li>King Abdul Aziz Road: 1.4 km / 0.9 mi</li>
                  {/* Add more location points */}
                </ul>
                <p>The preferred airport is King Abdulaziz Intl. Airport...</p>
              </section>
            </div>
          </div>
          : <></>}

      </Suspense>
    );
  }

  const ProductCard = ({ room, selectedRoom, onSelect }) => {
    const roomLength = room.rate.length;
    const idx = Math.floor(Math.random() * roomLength);

    const isSelected = selectedRoom?.id === room.id;
    // console.log(room.images[0].urls[0].url)

    return (
      <div className={` h-auto p-4 mb-4 border rounded-lg ${isSelected ? 'border-teal-500' : 'border-gray-200'} bg-white shadow-sm`}>
        {/* Room Image and Title */}
        <div className="flex">
          <div className="">
            {/* Images chiếm 1/4 */}
            {room.images && room.images.length > 0 && room.images[0].urls.length > 0 ? (
              <div className="relative ">
                <img
                  src={room.images[0].urls[3] ? room.images[0].urls[3].url : room.images[0].urls[0].url}
                  alt={`Image of ${room.name}`}
                  width={520}
                  height={450}
                  className="rounded-md"
                />
              </div>
            ) : (
              <p>No image available</p>
            )}

            {/* Amenities chiếm 2/4 và sử dụng flex wrap */}
          </div>
          <div className='px-4' dangerouslySetInnerHTML={{ __html: room.overview }} />
        </div>
        <div className='flex border-t-2 mt-2 pt-2'>
          <div className="w-full flex flex-wrap  px-2">
            {room.amenities.map((a, index) => (
              <div key={index} className="flex-none w-1/5 py-1 pr-1 flex items-center">
                {/* Dấu tích xanh */}
                <span className="text-green-500 mr-1">&#10003;</span> {/* Ký hiệu dấu tích */}
                {a.name}
              </div>
            ))}
          </div>

          {/* Book chiếm 1/4 */}
        </div>
        <div className='border-t-2 pt-2 mt-2 overflow-y-scroll' style={{ height: "440px" }}>

          {
            room.rate.map(rate => (
              <div className=" ml-2 h-16 bg-white border border-teal-500 mb-2 text-teal-500 rounded-lg p-4 flex items-center">
                {/* rate_name chiếm 5 phần */}
                <div className="flex-basis-5/8 flex-grow">
                  <h3 className="text-lg font-semibold truncate">{rate.rate_name}</h3>
                </div>
                {/* refundable chiếm 1 phần */}
                <div className="flex-basis-1/8 flex justify-center items-center px-1 ml-5">
                  {rate.refundable ? (
                    <span className="text-green-500">&#10003; Refunable</span> // Tích xanh
                  ) : (
                    <span className="text-red-500">&#10007; Non-refunable</span> // Dấu chéo đỏ
                  )}
                </div>
                {/* full_rate và price breakdown chiếm 1 phần */}
                <div className="flex-basis-1/8 text-center ml-5">
                  <p className="text-base font-bold">{rate.full_rate} {rate.currency}</p>
                  <p className="text-xs mt-2 underline cursor-pointer">Price Breakdown</p>
                </div>
                {/* button chiếm 1 phần */}
                <div className="flex-basis-1/8 text-center ml-5">
                  <button className="bg-teal-500 text-white rounded-lg py-2 px-6 hover:bg-teal-800">
                    Select
                  </button>
                </div>
              </div>
            ))
          }
        </div>

      </div>

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
    const totalMinutes = arrivalTime.diff(departureTime, 'minutes');

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes}m`;
  }

  const handleClose = () => {
    setHotelDetailOpen(false);
  };
  const getData = async () => {
    const task = [

      searchHotels(),
      getFlights(),
      getToursByRegion(),
      searchRegionDetail(),
      getTransferByRegion(),
    ]
    await Promise.all(task)

  }
  useEffect(() => {
    getData()
  }, [])
  // console.log(tours, hotels, vehicles)

  const FlightPane = ({ flight }) => {
    const airlineName = flight?.flight_id?.substring(0, 2)
    return (

      <div className="flex border rounded-lg shadow-sm p-4 mb-4 bg-white">
        {/* Left side with flight details */}
        <div className="flex flex-col w-full justify-center">
          {/* Outbound Flight */}
          <div className="border-b pb-2 mb-2">
            {flight.outbound.map((leg, index) => (
              <div key={index} className="flex items-center mb-1">
                <div className="w-14 h-14 mr-5 rounded-3xl bg-teal-500 text-white flex items-center justify-center text-xl font-bold">
                  {leg?.flight_no?.substring(0, 2)}
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
                 {leg?.flight_no?.substring(0, 2)}
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

  const FlightCard = () => {
    return (
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
                    <span>Less than USD 100</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="budget"
                      value="100-500"
                      onChange={handleFilterChange}
                      className="form-radio"
                    />
                    <span>USD 100 - USD 500</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="budget"
                      value="500-1000"
                      onChange={handleFilterChange}
                      className="form-radio"
                    />
                    <span>USD 500 - USD 1000</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Nearby Locations</h3>
                <div className="space-y-2">
                </div>
              </div>
            </div>
          </div>
          <div className='w-3/4'>

            {
              flights?.map((flightData) => (<FlightPane key={flightData.flight_id} flight={flightData} />))
            }
          </div>
        </div>

      </div>
    )
  }

  const HotelCard = () => {
    return (<>
      <div className='text-center font-bold text-xl text-teal-500'>Total: {hotels?.length} hotels!</div>
      <div className="flex">
        <div className="w-1/4">
          <div className="w-64 bg-white border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Stars</h3>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    onClick={() => setRating(star)}
                    className={star <= rating ? "text-blue-500" : "text-gray-300"}
                    style={{ cursor: "pointer" }}
                  />
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
                  <span>Less than USD 100</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="budget"
                    value="100-500"
                    onChange={handleFilterChange}
                    className="form-radio"
                  />
                  <span>USD 100 - USD 500</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="budget"
                    value="500-1000"
                    onChange={handleFilterChange}
                    className="form-radio"
                  />
                  <span>USD 500 - USD 1000</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Nearby Locations</h3>
              <div className="space-y-2 h-[495px] overflow-y-scroll">
                {[...regionDetail?.pointOfInterests || [], ...regionDetail?.cities || [], ...regionDetail?.trainStations || [], ...regionDetail?.metroStations || []].map(
                  (location) => (
                    <label key={location.region_id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="location"
                        value={location.region_id}
                        onChange={handleFilterChange}
                        className="form-checkbox"
                      />
                      <span>{location.region_name}</span>
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
    </>)
  }

  const Tour = ({ tours }) => {
    const handleFilterChange = (event) => {

    };
    return (
      <>
        <div className='text-center font-bold text-xl text-teal-500'>Total: {tours?.length} tours!</div>
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
                    <span>Less than USD 100</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="budget"
                      value="100-500"
                      onChange={handleFilterChange}
                      className="form-radio"
                    />
                    <span>USD 100 - USD 500</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="budget"
                      value="500-1000"
                      onChange={handleFilterChange}
                      className="form-radio"
                    />
                    <span>USD 500 - USD 1000</span>
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

            {tours?.slice(0, 250).map(tour => (
              <div key={tour.id} className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className=" font-bold text-lg text-teal-500">{tour.name}</h1>
                    {/* <p className="text-gray-600">{tour.city_code}</p> */}
                    <ul className="text-gray-600 space-y-1">
                      <li>🕒 Duration: {tour.duration}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-red-600">From {Math.round(tour.price)} {tour.currency}</p>
                    {/* <p className="text-sm text-gray-500">08/10/2024 - 09/10/2024</p> */}
                    <button className="bg-teal-500  text-white rounded-lg py-2 px-8 mt-0 hover:bg-gray-200">
                      Select
                    </button>
                  </div>
                </div>

                {/* Main Image */}
                <div className="flex gap-4">
                  {/* Image with flex-1 */}
                  <div className="relative mb-4 basis-1/3">
                    <img
                      src="http://res.cloudinary.com/trungkien2022001/image/upload/v1729613005/upload/ctqmmurfxrpglas4kd2i.webp"
                      alt="Tour Image"
                      width={350}
                      height={206}
                      className="rounded-md"
                    />
                  </div>

                  {/* Description with flex-2 */}
                  <div className="bg-gray-100 p-4 rounded-lg basis-2/3 max-h-[470px] overflow-y-scroll">
                    <h2 className="text-xl font-semibold mb-3">Overview</h2>
                    <div dangerouslySetInnerHTML={{ __html: tour.description }} />
                  </div>
                </div>

                {/* Details Section */}
                {/* <div className="flex justify-between items-start"> */}
                {/* <div>
                <ul className="text-gray-600 space-y-1">
                  <li>🕒 {tour.duration}</li>
                </ul>
              </div> */}
                {/* <div>
                <Image
                  src="/currency.jpg" // Add your currency image URL or use Next.js Image loader if needed
                  alt="Currency"
                  width={120}
                  height={80}
                  className="rounded-md"
                />
              </div> */}
                {/* </div> */}
                {/* Booking Button */}
              </div>

            ))}
          </div>
        </div>
      </>
    );
  };

  const Vehicle = ({ vehicles }) => {
    const handleFilterChange = (event) => {

    };
    return (
      <>
        <div className='text-center font-bold text-xl text-teal-500'>Total: {vehicles?.length} vehicles!</div>
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
                    <span>Less than USD 100</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="budget"
                      value="100-500"
                      onChange={handleFilterChange}
                      className="form-radio"
                    />
                    <span>USD 100 - USD 500</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="budget"
                      value="500-1000"
                      onChange={handleFilterChange}
                      className="form-radio"
                    />
                    <span>USD 500 - USD 1000</span>
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
            {vehicles?.map(vehicle => (
              <div key={vehicle.id} className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
                <div className="flex gap-4 w-full justify-items-end">
                  <div className="relative basis-1/4">
                    <img
                      src="http://res.cloudinary.com/trungkien2022001/image/upload/v1729613246/upload/athyidnxnzuhb7pmfrnu.webp"
                      alt="Vehicle"
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                  <div className="basis-2/4">
                    <div>
                      <h1 className=" text-xl font-bold text-teal-500 pb-1">{vehicle.name}</h1>
                      {/* <p className="text-gray-600">{vehicle.city_code}</p> */}
                      <ul className="py-1">
                        <li>
                          <p className="text-sm mt-2 text-teal-500 underline cursor-pointer">More info</p>
                        </li>
                      </ul>
                    </div>
                    <div className='py-1'>
                      {vehicle.refundable ? 'Refunable' : "Non-refunable"}
                    </div>
                    <div>
                      Maximum pax allowed: 4
                    </div>
                  </div>
                  <div className="ml-5 bg-white border border-teal-500 text-teal-500 rounded-lg p-4 text-center w-64 flex flex-col">
                    <p className="text-xl font-bold">From {Math.round(vehicle.price)} {vehicle.currency}</p>
                    <button className="bg-teal-500 text-white rounded-lg py-2 px-6 mt-4 hover:bg-teal-800">
                      Select
                    </button>
                    <p className="text-xs mt-2 underline cursor-pointer">Price Breakdown</p>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </>
    );
  };
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
                {activeTab === 'Hotels' && <HotelCard />}
                {activeTab === 'Flights' &&
                  <FlightCard />}
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
                    {packages.flight?.flight_id?.split('$')?.[0]}
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">{packages.flight?.fares?.[0]?.currency} {packages.flight?.fares?.[0]?.total_fare}</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <HotelOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    {packages.hotel.name}
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">{packages.hotel.total_price ? 'USD': ""} {packages.hotel.total_price}</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <TourOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    {packages.tour?.name}
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">{packages.tour?.currency} {packages.tour?.price?.toFixed(2)}</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <DirectionsCarFilledOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    {packages.transfer?.name}
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">{packages.transfer?.currency} {packages.transfer?.price?.toFixed(2)}</span>
              </div>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <SupportAgentOutlinedIcon className='text-teal-500' />
                  <span className="text-sm overflow-hidden text-ellipsis line-clamp-2 max-w-[200px]">
                    Nguyen Kieu Anh
                  </span>
                </div>
                <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 49.99</span>
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
              <span className="whitespace-nowrap min-w-16 text-teal-500 ml-2">USD 19.99</span>
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