// pages/hotel.js
"use client";
import HotelPage from "@/components/product/info";
import ProductList from "@/components/product/product-list";
import RoomTabs from "@/components/product/rooms";

export default function Hotel() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex">
        <div className="w-1/2">
          <img
            src="/path/to/hotel-image.jpg"
            alt="Jeddah Hilton"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 pl-4">
          <h1 className="text-3xl font-bold mb-2">Jeddah Hilton</h1>
          <p className="text-gray-600 mb-4">North Corniche Road, Jeddah, Makkah Region, 21362, SA</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </div>
          <p className="text-lg font-semibold">SR 914.16 per night</p>
        </div>
      </div>

      <RoomTabs />

      <div className="mt-8">
        <ProductList />
      </div>
      <HotelPage/>
    </div>
  );
}
