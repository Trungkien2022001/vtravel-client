// components/HotelList.js
import { useState } from 'react';
import Filters from '../hotel-filter/HotelFilter';
import HotelCard from '../hotel-card/HotelCard';


export default function HotelList({list, conditional}) {
  // console.log(JSON.stringify(list[0]))
  const [filters, setFilters] = useState({
    stars: [],
    budget: '',
    location: [],
  });

  const filteredHotels = list?.filter((hotel) => {
    // const matchesStars =
    //   !filters.stars.length || filters.stars.includes(hotel.rating);
    // const matchesBudget =
    //   !filters.budget ||
    //   (parseFloat(hotel.price.replace('SR', '')) >= parseInt(filters.budget.split('-')[0]) &&
    //     parseFloat(hotel.price.replace('SR', '')) <= parseInt(filters.budget.split('-')[1]));
    // const matchesLocation =
    //   !filters.location.length || filters.location.some((loc) => hotel.location.includes(loc));

    // return matchesStars && matchesBudget && matchesLocation;
    return !!hotel
  });

  return (
    <>
    <div className='text-center font-bold text-2xl'>We find {filteredHotels?.length} hotels!</div>
    <div className="flex">
      <div className="w-1/4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <div className="w-3/4 pl-8">
        {filteredHotels?.length > 0 ? (
          filteredHotels?.slice(0,10).map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} conditional = {conditional}/>
          ))
        ) : (
          <p>No hotels match your criteria.</p>
        )}
      </div>
    </div>
    </>
  );
}
