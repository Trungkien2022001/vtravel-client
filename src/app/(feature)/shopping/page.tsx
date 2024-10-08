"use client";
import HotelList from '@/components/hotel-list/HotelList'
import Tour from '@/components/tour/tour';
import React from 'react'

const page = () => {
  return (
    <div>
       <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Your stay in Jeddah</h1>
      <HotelList />
      <Tour/>
    </div>
    </div>
  )
}

export default page