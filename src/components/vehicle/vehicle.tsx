import Image from 'next/image';

const Vehicle = ({ vehicles }) => {
  const handleFilterChange = (event) => {

  };
  return (
    <>
      <div className='text-center font-bold text-xl text-teal-500'>Total: {vehicles?.length} vehicles!</div>
      <div className='flex'>
        <div className="w-1/4">
          <div className="w-64 bg-white border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Stars</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="stars"
                      value={star}
                      onChange={handleFilterChange}
                      className="form-checkbox"
                    />
                    <span>{star} Stars</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Budget</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="budget"
                    value="0-100"
                    onChange={handleFilterChange}
                    className="form-radio"
                  />
                  <span>Less than SR 100</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="budget"
                    value="100-500"
                    onChange={handleFilterChange}
                    className="form-radio"
                  />
                  <span>SR 100 - SR 500</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="budget"
                    value="500-1000"
                    onChange={handleFilterChange}
                    className="form-radio"
                  />
                  <span>SR 500 - SR 1000</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Nearby Locations</h3>
              <div className="space-y-2">
                {['Central Fish Market', 'Shorbanty House', 'Fakieh Aquarium'].map(
                  (location) => (
                    <label key={location} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="location"
                        value={location}
                        onChange={handleFilterChange}
                        className="form-checkbox"
                      />
                      <span>{location}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='w-3/4'>
          {vehicles.slice(0, 5).map(vehicle => (
            <div key={vehicle.id} className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
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
                <div className="basis-2/4">
                  <div>
                    <h1 className=" text-xl font-bold text-teal-500 pb-1">{vehicle.name}</h1>
                    {/* <p className="text-gray-600">{vehicle.city_code}</p> */}
                    <ul className="py-1">
                      <li>
                        <p className="text-sm mt-2 text-teal-500 underline cursor-pointer">More info</p>
                      </li>
                    </ul>
                  </div>
                  <div className='py-1'>
                    {vehicle.refundable ? 'Refunable' : "Non-refunable"}
                  </div>
                  <div>
                    Maximum pax allowed: 4
                  </div>
                </div>
                <div className="ml-5 bg-white border border-teal-500 text-teal-500 rounded-lg p-4 text-center w-64 flex flex-col">
                  <p className="text-xl font-bold">From {Math.round(vehicle.price)} {vehicle.currency}</p>
                  <button className="bg-teal-500 text-white rounded-lg py-2 px-6 mt-4 hover:bg-teal-800">
                    Select
                  </button>
                  <p className="text-xs mt-2 underline cursor-pointer">Price Breakdown</p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );
};

export default Vehicle;