import Image from 'next/image';

const Vehicle = ({ vehicles }) => {
  console.log(vehicles)
  return (
    <>
    <div className='text-center text-2xl font-bold'>Your Vehicle explore</div>
      {vehicles.slice(0, 5).map(vehicle => (
        <div key={vehicle.id} className="max-w-4xl mt-5 mx-auto p-6 bg-white shadow-md rounded-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className=" font-bold">{vehicle.name}</h1>
              {/* <p className="text-gray-600">{vehicle.city_code}</p> */}
              <ul className="text-gray-600 space-y-1">
                <li>Type: {vehicle.type}</li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">From {Math.round(vehicle.price)} {vehicle.currency}</p>
              {/* <p className="text-sm text-gray-500">08/10/2024 - 09/10/2024</p> */}
            </div>
          </div>

          {/* Main Image */}
          <div className="flex gap-4">
            {/* Image with flex-1 */}
            <div className="relative mb-4 basis-1/4">
              <Image
                src="https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/433442361_2035908053470683_3111102176583847310_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEacuQ5tT9mbCgz8ZHgTOYQQ9fLHTkjdDhD18sdOSN0OH6C_bbsdH_B9xGT0hXP-Av93ZO2mma1mkgUEIuitc6r&_nc_ohc=lrGF4oQuUrYQ7kNvgEYVGfH&_nc_ht=scontent-iad3-2.xx&_nc_gid=AUiC75pCw7eFd9s4aZ9m0bx&oh=00_AYDbmKRg8_nqZ_LIDj6jmF8AAlm_eS6VZFIx7UUL5VZ97A&oe=670D78C3"
                alt="Saudi Flag"
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>

            {/* Description with flex-2 */}
            {/* <div className="bg-gray-100 p-4 rounded-lg mb-6 basis-3/4">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: vehicle.description }} />
            </div> */}
          </div>

          {/* Details Section */}
          {/* <div className="flex justify-between items-start"> */}
            {/* <div>
              <ul className="text-gray-600 space-y-1">
                <li>🕒 {tour.duration}</li>
              </ul>
            </div> */}
            {/* <div>
              <Image
                src="/currency.jpg" // Add your currency image URL or use Next.js Image loader if needed
                alt="Currency"
                width={120}
                height={80}
                className="rounded-md"
              />
            </div> */}
          {/* </div> */}
          {/* Booking Button */}
          <div className="text-center">
            <button className="bg-teal-500 text-white py-2 px-4rounded-lg text-lg">
              BOOK NOW - SR 960.00
            </button>
          </div>
        </div>

      ))}
    </>
  );
};

export default Vehicle;