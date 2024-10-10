// pages/hotel.js
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const HotelPage = () => {
  const searchParams = useSearchParams();
  const region_id = searchParams.get('region_id');
  const region_name_full = searchParams.get('region_name_full');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const rooms = JSON.parse(searchParams.get('rooms') || '{}');
  const currency = searchParams.get('currency');
  const [tours, setTours]= useState([])
  const [vehicles, setVehicles]= useState([])
  const getToursByRegion = async () => {
    try {
      const data = {
        checkin,
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
      setTours(res.data)
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  };

  const getTransferByRegion = async () => {
    try {
      const data = {
        checkin,
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
      setVehicles(res.data)
    } catch (error) {
      console.error("Error searching transfers:", error);
    }
  };

  // const getData =async  () => {
  //   const task = [

  //     getToursByRegion(),
  //     getTransferByRegion(),
  //   ]
  //   await Promise.all(task)
    
  // }
  // useEffect(()=>{
  //   getData()
  // }, [])
  return (
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
            <p>With a stay at Jeddah Hilton, you'll be centrally located...</p>

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
  );
};

export default HotelPage;
