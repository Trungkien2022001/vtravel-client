// components/HotelList.js
import { useState } from 'react';
import Filters from '../hotel-filter/HotelFilter';
import HotelCard from '../hotel-card/HotelCard';

const hotels = [
  {
    name: 'Jeddah Hilton',
    location: 'North Corniche Road, Jeddah',
    rating: 5,
    price: 'SR 914.16',
    imageUrl: '/path/to/hilton-image.jpg',
  },
  {
    name: 'Radisson Blu Hotel, Jeddah Plaza',
    location: 'King Abdullah Road, Jeddah',
    rating: 4,
    price: 'SR 764.15',
    imageUrl: '/path/to/radisson-image.jpg',
  },
  {
    name: 'ibis Jeddah City Center',
    location: 'Madinah Branch Road, Jeddah',
    rating: 3,
    price: 'SR 526.27',
    imageUrl: '/path/to/ibis-image.jpg',
  },
  // Add more hotels
];

export default function HotelList() {
  const [filters, setFilters] = useState({
    stars: [],
    budget: '',
    location: [],
  });

  const filteredHotels = hotels.filter((hotel) => {
    const matchesStars =
      !filters.stars.length || filters.stars.includes(hotel.rating);
    const matchesBudget =
      !filters.budget ||
      (parseFloat(hotel.price.replace('SR', '')) >= parseInt(filters.budget.split('-')[0]) &&
        parseFloat(hotel.price.replace('SR', '')) <= parseInt(filters.budget.split('-')[1]));
    const matchesLocation =
      !filters.location.length || filters.location.some((loc) => hotel.location.includes(loc));

    return matchesStars && matchesBudget && matchesLocation;
  });

  return (
    <div className="flex">
      <div className="w-1/4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <div className="w-3/4 pl-8">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))
        ) : (
          <p>No hotels match your criteria.</p>
        )}
      </div>
    </div>
  );
}
