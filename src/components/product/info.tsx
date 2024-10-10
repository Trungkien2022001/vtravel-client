// pages/hotel.js
import React from 'react';

const HotelPage = () => {

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
  );
};

export default HotelPage;
