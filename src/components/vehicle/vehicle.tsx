import Image from 'next/image';

const Vehicle = ({ vehicles }) => {
  console.log(vehicles)
  return (
    <>
      <div className='text-center font-bold text-xl text-teal-500'>Total: {vehicles?.length} vehicles!</div>
      {vehicles.slice(0, 5).map(vehicle => (
        <div key={vehicle.id} className="max-w-4xl mt-5 mx-auto p-6 bg-white shadow-md rounded-lg">
          <div className="flex gap-4 w-full justify-items-end">
            <div className="relative basis-1/4">
              <Image
                src="https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/433442361_2035908053470683_3111102176583847310_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEacuQ5tT9mbCgz8ZHgTOYQQ9fLHTkjdDhD18sdOSN0OH6C_bbsdH_B9xGT0hXP-Av93ZO2mma1mkgUEIuitc6r&_nc_ohc=lrGF4oQuUrYQ7kNvgEYVGfH&_nc_ht=scontent-iad3-2.xx&_nc_gid=AUiC75pCw7eFd9s4aZ9m0bx&oh=00_AYDbmKRg8_nqZ_LIDj6jmF8AAlm_eS6VZFIx7UUL5VZ97A&oe=670D78C3"
                alt="Saudi Flag"
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>
            <div className="basis-3/4">
              <div>
                <h1 className=" text-xl font-bold text-teal-500 pb-1">{vehicle.name}</h1>
                {/* <p className="text-gray-600">{vehicle.city_code}</p> */}
                <ul className="py-1">
                  <li>Type: {vehicle.type}</li>
                </ul>
              </div>
              <div className='py-1'>
                {vehicle.refundable ? 'Refunable' : "Non-refunable"}
              </div>
              <div>
                Maximum pax allowed: 4
              </div>
              <div>
                <p className="font-bold text-teal-500">From {Math.round(vehicle.price)} {vehicle.currency}</p>
                {/* <p className="text-sm text-gray-500">08/10/2024 - 09/10/2024</p> */}
              </div>
              <div className="">
                <button className="bg-teal-500  text-white rounded-lg py-2 px-6 mt-4 hover:bg-gray-200">
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>

      ))}
    </>
  );
};

export default Vehicle;