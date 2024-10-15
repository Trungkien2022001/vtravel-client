"use client";
import HotelList from '@/components/hotel-list/HotelList'
import Tour from '@/components/tour/tour';
import Vehicle from '@/components/vehicle/vehicle';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  
  const region_id = searchParams.get('region_id');
  const region_name_full = searchParams.get('region_name_full');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const rooms = JSON.parse(searchParams.get('rooms') || '{}');
  const currency = searchParams.get('currency');
  const [hotels, setHotels]= useState([])
  const [tours, setTours]= useState([])
  const [vehicles, setVehicles]= useState([])

  const searchHotelsByRegion = async () => {
    try {
      const data = {
        rooms,
        checkin,
        checkout,
        region_id,
        currency
      }
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/hotel/search/region`,
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
        adult: rooms.reduce((s, r)=> r.adult + s, 0),
        children: rooms.reduce((s, r)=> r.children + s, 0),
        infant: rooms.reduce((s, r)=> r.infant + s, 0),
        currency: "USD",
        region_id
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

  const getTransferByRegion = async () => {
    try {
      const data = {
        checkin,
        duration: 1,
        adult: rooms.reduce((s, r)=> r.adult + s, 0),
        children: rooms.reduce((s, r)=> r.children + s, 0),
        infant: rooms.reduce((s, r)=> r.infant + s, 0),
        currency: "USD",
        region_id
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
  const getData =async  () => {
    const task = [

      searchHotelsByRegion(),
      getToursByRegion(),
      getTransferByRegion(),
    ]
    await Promise.all(task)
    
  }
  useEffect(()=>{
    getData()
  }, [])
  // console.log(tours, hotels, vehicles)
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Your stay in {region_name_full}</h1>
      <HotelList list={hotels} conditional ={{region_id, checkin, checkout, rooms, currency}}/>
      <Tour tours = {tours}/>
      <Vehicle vehicles = {vehicles}/>
    </div>
    </Suspense>
  )
}

export default Page