// components/ProductCard.js

import Image from 'next/image';

export default function ProductCard({ room, selectedRoom, onSelect }) {
  const roomLength = room.rate.length;
  const idx = Math.floor(Math.random() * roomLength);

  const isSelected = selectedRoom?.id === room.id;
  // console.log(room.images[0].urls[0].url)

  return (
    <div className={` h-auto p-4 mb-4 border rounded-lg ${isSelected ? 'border-teal-500' : 'border-gray-200'} bg-white shadow-sm`}>
      {/* Room Image and Title */}
      <div className="flex">
        <div className="">
          {/* Images chiếm 1/4 */}
          {room.images && room.images.length > 0 && room.images[0].urls.length > 0 ? (
            <div className="relative ">
              <Image
                src={room.images[0].urls[3] ? room.images[0].urls[3].url : room.images[0].urls[0].url}
                alt={`Image of ${room.name}`}
                width={520}
                height={450}
                className="rounded-md"
              />
            </div>
          ) : (
            <p>No image available</p>
          )}

          {/* Amenities chiếm 2/4 và sử dụng flex wrap */}
        </div>
        <div className='px-4' dangerouslySetInnerHTML={{ __html: room.overview }} />
      </div>
      <div className='flex border-t-2 mt-2 pt-2'>
        <div className="w-full flex flex-wrap  px-2">
          {room.amenities.map((a, index) => (
            <div key={index} className="flex-none w-1/5 py-1 pr-1 flex items-center">
              {/* Dấu tích xanh */}
              <span className="text-green-500 mr-1">&#10003;</span> {/* Ký hiệu dấu tích */}
              {a.name}
            </div>
          ))}
        </div>

        {/* Book chiếm 1/4 */}
      </div>
      <div className='border-t-2 pt-2 mt-2 overflow-y-scroll' style={{height: "440px"}}>

        {
          room.rate?.map(rate => (
            <div className=" ml-2 h-16 bg-white border border-teal-500 mb-2 text-teal-500 rounded-lg p-4 flex items-center">
              {/* rate_name chiếm 5 phần */}
              <div className="flex-basis-5/8 flex-grow">
                <h3 className="text-lg font-semibold truncate">{rate.rate_name}</h3>
              </div>
              {/* refundable chiếm 1 phần */}
              <div className="flex-basis-1/8 flex justify-center items-center px-1 ml-5">
                {rate.refundable ? (
                  <span className="text-green-500">&#10003; Refunable</span> // Tích xanh
                ) : (
                  <span className="text-red-500">&#10007; Non-refunable</span> // Dấu chéo đỏ
                )}
              </div>
              {/* full_rate và price breakdown chiếm 1 phần */}
              <div className="flex-basis-1/8 text-center ml-5">
                <p className="text-base font-bold">{rate.full_rate} {rate.currency}</p>
                <p className="text-xs mt-2 underline cursor-pointer">Price Breakdown</p>
              </div>
              {/* button chiếm 1 phần */}
              <div className="flex-basis-1/8 text-center ml-5">
                <button className="bg-teal-500 text-white rounded-lg py-2 px-6 hover:bg-teal-800">
                  Select
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </div>

  );
}

