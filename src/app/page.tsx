/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/layout/footer";
import PictureGrid from "@/components/picture/picture";
import { SetStateAction, useEffect, useRef, useState } from "react";
import moment from 'moment';
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { REGION_TYPE_NAME } from "@/shared/constants";

export default function Home() {
  const router = useRouter();
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [departureAirport, setDepartureAirport] = useState();
  const [arrivalAirport, setArrivalAirport] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hotelId, setHotelId] = useState(false);
  const [propertyType, setPropertyType] = useState('');
  const dropdownRef = useRef(null);
  const [showDropdownArrival, setShowDropdownArrival] = useState(false);
  const dropdownRefArrival = useRef(null);
  const dropdownRefTravellers = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // Trạng thái hiển thị DatePicker
  const [activeInput, setActiveInput] = useState('checkin'); // Để xác định input đang hoạt động
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
  const [rooms, setRooms] = useState([{ adult: 1, children: 0, infant: 0 }]);
  const [query, setQuery] = useState('');
  const [queryArrival, setQueryArrival] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [debouncedQueryArrival, setDebouncedQueryArrival] = useState(queryArrival);
  const [departure, setDeparture] = useState({} as any)
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [arrival, setArrival] = useState({} as any)
  const [filteredArrivals, setFilteredArrivals] = useState([]);

  const handleCheckinChange = (date) => {
    setCheckinDate(date);
    // Nếu không có checkout date, set checkout date mặc định là 1 ngày sau check-in
    if (!checkoutDate || date >= checkoutDate) {
      setCheckoutDate(new Date(date.getTime() + 24 * 60 * 60 * 1000)); // Đặt ngày check-out là 1 ngày sau check-in
    }
    togglePicker('checkout')
  };

  const togglePicker = (inputType) => {
    setActiveInput(inputType); // Cập nhật input đang hoạt động
    setIsOpen(true); // Mở DatePicker
  };

  const handleCheckoutChange = (date) => {

    setCheckoutDate(date);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setShowDropdown(true)
  };

  const handleInputChangeArrival = (e) => {
    setShowDropdownArrival(true)
    const value = e.target.value.toLowerCase();
    setQueryArrival(value);
  };
  const getSuggested = async (text: string) => {
    try {
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/hotel-placeholder-suggested`,
        {
          method: "POST", // Specify the HTTP method
          headers: {
            "x-key": "superkey", // Add your x-key header
            "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
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
      const hotels: any[] = res.data.hotels.map(h => ({
        ...h,
        text: h.name,
        type: 'Hotel'
      }))
      const airports: any[] = res.data.airports.map(h => ({
        ...h,
        text: h.airport_name,
        type: 'Airport'
      }))
      const regions: any[] = res.data.regions.map(h => ({
        ...h,
        text: h.region_name_full,
        type: REGION_TYPE_NAME[h.region_type] || "Region"
      })).filter(i => i.region_type !== 'airport')
      // console.log(hotels, regions)
      const list = [...airports, ...regions, ...hotels]
      // console.log(list)
      setFilteredDepartures(list as SetStateAction<never[]>)
      // setShowDropdown(true)
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const getSuggestedArrival = async (text: string) => {
    try {
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/hotel-placeholder-suggested`,
        {
          method: "POST", // Specify the HTTP method
          headers: {
            "x-key": "superkey", // Add your x-key header
            "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
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
      const hotels: any[] = res.data.hotels.map(h => ({
        ...h,
        text: h.name,
        type: 'Hotel'
      }))
      const airports: any[] = res.data.airports.map(h => ({
        ...h,
        text: h.airport_name,
        type: 'Airport'
      }))
      const regions: any[] = res.data.regions.map(h => ({
        ...h,
        text: h.region_name_full,
        type: REGION_TYPE_NAME[h.region_type] || "Region"
      })).filter(i => i.region_type !== 'airport')


      // console.log(hotels, regions)
      const list = [...airports, ...regions, ...hotels]
      // console.log(list)
      setFilteredArrivals(list as SetStateAction<never[]>)
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Debounce the query input (delay of 0.5s)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Update the debounced query after 0.5s
    }, 250); // 500ms delay

    // Cleanup function to clear the timeout if query changes before 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQueryArrival(queryArrival); // Update the debounced queryArrival after 0.5s
    }, 250); // 500ms delay

    // Cleanup function to clear the timeout if queryArrival changes before 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [queryArrival]);

  // Effect to call the API whenever the debounced query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery) {
        await getSuggested(debouncedQuery); // Ensure this is in an async function
      }
    };

    fetchSuggestions(); // Call the async function
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQueryArrival) {
        await getSuggestedArrival(debouncedQueryArrival); // Ensure this is in an async function
      }
    };

    fetchSuggestions(); // Call the async function
  }, [debouncedQueryArrival]);


  const handleSubmit = async () => {
    // const result = await Promise.all(task)
    let propertyId
    switch (propertyType) {
      case 'region':
        propertyId = (arrival as any).region_id
        break;

      case 'hotel':
        propertyId = hotelId
        break;

      case 'airport':
        propertyId = (arrival as any).airport_code
        break;

      default:
        break;
    }
    const body = {
      property_id: propertyId,
      property_type: propertyType,
      hotel_id: hotelId,
      checkin: moment(checkinDate).format('YYYY-MM-DD'),
      checkout: moment(checkoutDate).format('YYYY-MM-DD'),
      rooms: JSON.stringify(rooms), // Assuming rooms is an object or array
      region_name_full: arrival.region_name_full || arrival.airport_name,
      currency: 'USD',
      departure_airport: departureAirport,
      arrival_airport: arrivalAirport,
    }


    const params = new URLSearchParams(body as Record<string, any>).toString();
    router.push(`/shopping?${params}`);
    // console.log(result)
  }






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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefTravellers.current && !dropdownRefTravellers.current.contains(event.target)) {
        setShowTravellerDropdown(false);
        console.log("hello")
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectDeparture = async (destination) => {
    setDeparture(destination);
    setQuery(destination.text)
    setShowDropdown(false);
    console.log(destination)
    switch (destination.type) {
      case 'Airport':
        setDepartureAirport(destination.airport_code)
        break;
      case 'Hotel':
        try {
          const _res = await fetch(
            `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/nearest-airport`,
            {
              method: "POST", // Specify the HTTP method
              headers: {
                "x-key": "superkey", // Add your x-key header
                "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
                "Content-Type": "application/json", // Ensure the request sends JSON
              },
              body: JSON.stringify({
                property_id: destination.hotel_id,
                property_type: "hotel"
              }), // Set the body of the request
              cache: "no-cache", // Prevents caching
            }
          );

          // Check if the response is OK
          if (!_res.ok) {
            throw new Error("Failed to fetch suggestions");
          }
          const res = await _res.json();
          setDepartureAirport(res.data.airport_code)
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
        break;
      default:
        try {
          const _res = await fetch(
            `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/nearest-airport`,
            {
              method: "POST", // Specify the HTTP method
              headers: {
                "x-key": "superkey", // Add your x-key header
                "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
                "Content-Type": "application/json", // Ensure the request sends JSON
              },
              body: JSON.stringify({
                property_id: destination.region_id,
                property_type: "region"
              }), // Set the body of the request
              cache: "no-cache", // Prevents caching
            }
          );

          // Check if the response is OK
          if (!_res.ok) {
            throw new Error("Failed to fetch suggestions");
          }
          const res = await _res.json();
          console.log(res.data)
          setDepartureAirport(res.data.airport_code)
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
        break;
    }
  }
  const handleSelectArrival = async (destination) => {
    setArrival(destination);
    setQueryArrival(destination.text)
    setShowDropdownArrival(false);
    switch (destination.type) {
      case 'Airport':
        setPropertyType('airport')
        setArrivalAirport(destination.airport_code)
        break;
      case 'Hotel':
        setPropertyType('hotel')
        setHotelId(destination.hotel_id)
        try {
          const _res = await fetch(
            `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/nearest-airport`,
            {
              method: "POST", // Specify the HTTP method
              headers: {
                "x-key": "superkey", // Add your x-key header
                "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
                "Content-Type": "application/json", // Ensure the request sends JSON
              },
              body: JSON.stringify({
                property_id: destination.hotel_id,
                property_type: "hotel"
              }), // Set the body of the request
              cache: "no-cache", // Prevents caching
            }
          );

          // Check if the response is OK
          if (!_res.ok) {
            throw new Error("Failed to fetch suggestions");
          }
          const res = await _res.json();
          setArrivalAirport(res.data.airport_code)
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
        break;
      default:
        try {
          setPropertyType('region')
          let _res = await fetch(
            `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/nearest-airport`,
            {
              method: "POST", // Specify the HTTP method
              headers: {
                "x-key": "superkey", // Add your x-key header
                "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
                "Content-Type": "application/json", // Ensure the request sends JSON
              },
              body: JSON.stringify({
                property_id: destination.region_id,
                property_type: "region"
              }), // Set the body of the request
              cache: "no-cache", // Prevents caching
            }
          );

          // Check if the response is OK
          if (!_res.ok) {
            throw new Error("Failed to fetch suggestions");
          }
          let res = await _res.json();
          setArrivalAirport(res.data.airport_code)
          console.log(destination)
          if (destination.region_type === 'point_of_interest') {
            _res = await fetch(
              `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/data-center/region/parent`,
              {
                method: "POST", // Specify the HTTP method
                headers: {
                  "x-key": "superkey", // Add your x-key header
                  "x-access-token": process.env.NEXT_PUBLIC_MICRO_SERVICE_TOKEN || '', // Add your token
                  "Content-Type": "application/json", // Ensure the request sends JSON
                },
                body: JSON.stringify({
                  region_id: destination.region_id,
                }), // Set the body of the request
                cache: "no-cache", // Prevents caching
              }
            );
            res = await _res.json();
            console.log(res)
            setArrival(prev => ({
              ...prev,
              region_id: res.data?.id,
              region_type: res.data?.type
            }))
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
        break;
    }
  }

  return (
    <div className="min-h-screen">
      <Header style={{height: 28}}/>
      <div
        className="banner w-full bg-cover bg-center"
        style={{ backgroundImage: "url('http://res.cloudinary.com/trungkien2022001/image/upload/v1729522787/upload/qirc6q8dea7l5imbv9rf.jpg')" }}
      >
        <img
          src="http://res.cloudinary.com/trungkien2022001/image/upload/v1729522787/upload/qirc6q8dea7l5imbv9rf.jpg"
          alt="Banner"
          className="opacity-0 w-full h-max"
        />
        <div className=" absolute top-40 left-32 bg-white border-b rounded-xl shadow">
          <div className="container lg-auto flex items-center justify-between p-6 h-24">
            {/* Destination Input */}
            <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search airport, destination, hotel"
                className="w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
              />
              <label
                htmlFor="Arrival"
                className="absolute left-2 top-[-8px] text-gray-500 text-sm transform -translate-y-1/2 transition-all 
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Departure Destination
              </label>
              {query && showDropdown && (
                <ul className="absolute left-0 right-0 mt-2 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {filteredDepartures.length > 0 ? (
                    filteredDepartures.map((destination: any, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectDeparture(destination)}
                      >
                        <div className="flex justify-between items-center">
                          {/* Destination Text */}
                          <div className=" truncate">
                            {destination.text}
                          </div>

                          {/* Destination Type */}
                          <div className="ml-4 whitespace-nowrap text-teal-500">
                            {destination.type}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No destinations found</li>
                  )}
                </ul>
              )}
            </div>
            <div className="relative w-full max-w-md mx-auto ml-2" ref={dropdownRefArrival}>
              <input
                type="text"
                value={queryArrival}
                onChange={handleInputChangeArrival}
                placeholder="Search airport, destination, hotel"
                className="w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
              />
              <label
                htmlFor="Arrival"
                className="absolute left-2 top-[-8px] text-gray-500 text-sm transform -translate-y-1/2 transition-all 
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Arrival Destination
              </label>
              {queryArrival && showDropdownArrival && (
                <ul className="absolute left-0 right-0 mt-2 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {filteredArrivals.length > 0 ? (
                    filteredArrivals.map((destination: any, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectArrival(destination)}
                      >
                        <div className="flex justify-between items-center">
                          {/* Destination Text */}
                          <div className=" truncate">
                            {destination.text}
                          </div>

                          {/* Destination Type */}
                          <div className="ml-4 whitespace-nowrap text-teal-500">
                            {destination.type}
                          </div>
                        </div>
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
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mx-2">
              {/* Check-in */}

              {/* <span className="p-2 text-gray-500">📅 Check-in</span> */}
              <div className=" relative flex border-2 rounded-md">
                <input
                  className="p-2 outline-none flex-1 appearance-none w-28" // Xóa kiểu dáng mặc định
                  style={{ background: 'transparent' }}
                  readOnly
                  value={moment(checkinDate).format('DD-MM-YYYY')}
                  onClick={() => togglePicker('checkin')}
                />
                <label
                  htmlFor="Arrival"
                  className="absolute left-0 top-[-8px] text-gray-500 text-sm transform -translate-y-1/2 transition-all 
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400"
                >
                  Checkin
                </label>

                {/* Check-out */}
                <span className="p-2 text-gray-500">-</span>

                {/* <span className="p-2 text-gray-500">📅 Check-out</span> */}
                <input
                  className="p-2 outline-none flex-1 appearance-none w-28"
                  readOnly
                  value={moment(checkoutDate).format('DD-MM-YYYY')}
                  onClick={() => togglePicker('checkout')}
                />
                <label
                  htmlFor="Arrival"
                  className="absolute right-[47px] top-[-8px] text-gray-500 text-sm transform -translate-y-1/2 transition-all 
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400"
                >
                  Checkout
                </label>
                {isOpen && activeInput === 'checkin' && (
                  <div className="absolute top-11">

                    <DatePicker
                      selected={checkinDate}
                      onChange={handleCheckinChange}
                      selectsStart
                      startDate={checkinDate}
                      endDate={checkoutDate}
                      minDate={new Date()} // Ngày hiện tại trở đi
                      dateFormat="yyyy-MM-dd"
                      inline // Hiển thị DatePicker ngay lập tức
                      // className="w-96"
                      onClickOutside={() => setIsOpen(false)} // Đóng DatePicker khi nhấp ra ngoài
                      onCalendarClose={() => setIsOpen(false)}
                    />
                  </div>
                )}
                {isOpen && activeInput === 'checkout' && (
                  <div className="absolute top-11">

                    <DatePicker
                      selected={checkoutDate}
                      onChange={handleCheckoutChange}
                      selectsEnd
                      startDate={checkinDate}
                      endDate={checkoutDate}
                      minDate={new Date()} // Ngày hiện tại trở đi
                      dateFormat="yyyy-MM-dd"
                      inline // Hiển thị DatePicker ngay lập tức
                      onClickOutside={() => setIsOpen(false)} // Đóng DatePicker khi nhấp ra ngoài
                      onCalendarClose={() => setIsOpen(false)}
                    // className="w-96"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Traveller Dropdown */}
            <div className="relative ">
              <div
                className="flex items-center border rounded-md cursor-pointer p-2 w-72"
                onClick={toggleTravellerDropdown}
                onFocus={toggleTravellerDropdown}
              >
                <span className="text-gray-500">
                  {rooms.length} rooms, {rooms.reduce((acc, room) => acc + room.adult, 0)} adult, {rooms.reduce((acc, room) => acc + room.children, 0)} children, {rooms.reduce((acc, room) => acc + room.infant, 0)} infant
                </span>
              </div>
              <label
                htmlFor="Arrival"
                className="absolute top-[-8px] text-gray-500 text-sm transform -translate-y-1/2 transition-all 
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Passengers
              </label>
              {showTravellerDropdown && (
                <div className="absolute  z-10 mt bg-white border rounded-md shadow-lg" ref={dropdownRefTravellers}>
                  <div className="p-4">
                    {rooms.map((room, index) => (
                      <div key={index} className="mb-4 border-b pb-2">
                        <h3 className="font-bold">Room {index + 1}</h3>
                        <div className="flex justify-between items-center">
                          <span>Adult (18 or above)</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                if (room.adult > 0) {
                                  const newRooms = [...rooms];
                                  newRooms[index].adult--;
                                  setRooms(newRooms);
                                }
                              }}
                              className="bg-teal-500 px-3 h-8 rounded-full text-white"
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
                              className="bg-teal-500 px-3 h-8 rounded-full text-white"
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
                              className="bg-teal-500 px-3 h-8 rounded-full text-white"
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
                              className="bg-teal-500 px-3 h-8 rounded-full text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span>Infant (Under 2)</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                if (room.infant > 0) {
                                  const newRooms = [...rooms];
                                  newRooms[index].infant--;
                                  setRooms(newRooms);
                                }
                              }}
                              className="bg-teal-500 px-3 h-8 rounded-full text-white"
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
                              className="bg-teal-500 px-3 h-8 rounded-full text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="text-red-500 mt-2 font-bold"
                          onClick={() => removeRoom(index)}
                        >
                          Remove Room
                        </button>
                      </div>
                    ))}
                    <div className="mt-4 text-teal-500 cursor-pointer" onClick={addRoom}>
                      <button className="bg-teal-500 text-white rounded px-20 h-12 font-bold" style={{ whiteSpace: 'nowrap' }}>ADD ROOM</button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Maximum room is 5 per booking. Age of children/infant should be considered from the date of departure.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button className="bg-teal-500 hover:bg-teal-900 text-white rounded-lg px-8 h-10 ml-2 font-bold" onClick={handleSubmit}>SEARCH</button>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}
