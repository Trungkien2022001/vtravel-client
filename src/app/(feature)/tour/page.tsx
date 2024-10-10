// pages/hotel.js
"use client";
import HotelPage from "@/components/product/info";
import ProductList from "@/components/product/product-list";
import RoomTabs from "@/components/product/rooms";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Hotel() {
  const searchParams = useSearchParams();
  const hotel_id = searchParams.get('hotel_id');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const rooms = JSON.parse(searchParams.get('rooms') || '{}');
  const currency = searchParams.get('currency');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hotel, setHotel] = useState({} as any)
  const searchHotelsByRegion = async () => {
    try {
      const data = {
        rooms,
        checkin,
        checkout,
        hotel_id,
        currency
      }
      const _res = await fetch(
        `${process.env.NEXT_PUBLIC_MICRO_SERVICE_URL}/api/v1/hotel/detail`,
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
      // console.log(JSON.stringify(res.data));
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
  <Suspense>
  {hotel.id ? 
   <div className="max-w-5xl mx-auto p-4">
   <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Hotel Name and Star Rating */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{hotel.name}</h1>
        <div className="flex items-center mt-1">
          {/* Placeholder for star rating (replace with dynamic star rating if available) */}
          <span className="text-yellow-500 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        </div>
      </div>

      {/* Images Section */}
      <div className="flex">
        <div className="w-1/2">
          <Image
            src={hotel.images[0].urls[2].url}
            alt={hotel.name}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-1/2 grid grid-cols-2 gap-2 pl-4">
          {hotel.images.slice(1, 5).map((image, idx) => (
            <Image
              key={idx}
              src={image.urls[2].url}
              alt={`Image ${idx + 1}`}
              width={250}
              height={250}
              className="w-full h-32 object-cover rounded-lg"
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

   <RoomTabs/>

   <div className="mt-8">
     <ProductList rooms={hotel.rooms}/>
   </div>
   <HotelPage />
 </div>
 : <></>}
 
  </Suspense>
);
}
