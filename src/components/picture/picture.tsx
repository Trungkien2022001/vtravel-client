// components/PictureGrid.js
import Image from 'next/image';

const destinations = [
  { name: 'UAE', image: '/uae.jpg' },
  { name: 'Maldives', image: '/maldives.jpg' },
  { name: 'Kenya', image: '/kenya.jpg' },
  { name: 'Italy', image: '/italy.jpg' },
  { name: 'Thailand', image: '/thailand.jpg' },
  { name: 'Tanzania', image: '/tanzania.jpg' },
];

export default function PictureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {destinations.map((destination, index) => (
        <div key={index} className="relative group">
          <Image
            src={destination.image}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">{destination.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
