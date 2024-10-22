import Image from 'next/image';

const Tour = ({ tours }) => {
  console.log(tours)
  return (
    <>
    <div className='text-center text-2xl font-bold'>Your tour explore</div>
      {tours.slice(0, 5).map(tour => (
        <div key={tour.id} className="max-w-4xl mt-5 mx-auto p-6 bg-white shadow-md rounded-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className=" font-bold">{tour.name}</h1>
              {/* <p className="text-gray-600">{tour.city_code}</p> */}
              <ul className="text-gray-600 space-y-1">
                <li>🕒 Duration: {tour.duration}</li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">From {Math.round(tour.price)} {tour.currency}</p>
              {/* <p className="text-sm text-gray-500">08/10/2024 - 09/10/2024</p> */}
            </div>
          </div>

          {/* Main Image */}
          <div className="flex gap-4">
            {/* Image with flex-1 */}
            <div className="relative mb-4 basis-1/4">
              <Image
                src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/454777130_2130759000652254_1868790218362913884_n.jpg?stp=dst-jpg_s320x320&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFkUNNe71-8oYMfC-lgaeQGjywSi-aSyzyPLBKL5pLLPOe-OYC05AC9Q_-_ld9QDUPM6f10No2bR07iQPa0wIqX&_nc_ohc=1vXVpisGh24Q7kNvgF6pN3Y&_nc_ht=scontent-iad3-1.xx&_nc_gid=A4PeXp1jomjAtL5nA3N9pPw&oh=00_AYCS1d9IwiwWbF9bW0BWeX5C_Z8OcYFWteJ5PSgbY5_EJw&oe=670D5801"
                alt="Saudi Flag"
                width={206}
                height={206}
                className="rounded-md"
              />
            </div>

            {/* Description with flex-2 */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6 basis-3/4 max-h-52 w-52 overflow-y-scroll">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: tour.description }} />
            </div>
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

export default Tour;


{/* <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-2xl font-bold">Umrah Visa</h1>
      <p className="text-gray-600">Jeddah</p>
    </div>
    <div>
      <p className="text-xl font-bold text-red-600">From SR 960.00</p>
      <p className="text-sm text-gray-500">08/10/2024 - 09/10/2024</p>
    </div>
  </div>
  <div className="relative mb-4">
    <Image
      src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/454777130_2130759000652254_1868790218362913884_n.jpg?stp=dst-jpg_s320x320&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFkUNNe71-8oYMfC-lgaeQGjywSi-aSyzyPLBKL5pLLPOe-OYC05AC9Q_-_ld9QDUPM6f10No2bR07iQPa0wIqX&_nc_ohc=1vXVpisGh24Q7kNvgF6pN3Y&_nc_ht=scontent-iad3-1.xx&_nc_gid=A4PeXp1jomjAtL5nA3N9pPw&oh=00_AYCS1d9IwiwWbF9bW0BWeX5C_Z8OcYFWteJ5PSgbY5_EJw&oe=670D5801" // Add your flag image URL or use Next.js Image loader if needed
      alt="Saudi Flag"
      width={500}
      height={300}
      className="rounded-md"
    />
  </div>
  <div className="flex justify-between items-start mb-6">
    <div>
      <ul className="text-gray-600 space-y-1">
        <li>🕒 5 Days 0 Hours 0 Minutes</li>
        <li>🏨 Hotel Pickup</li>
        <li>No Booking Fees</li>
        <li>📄 E-Voucher</li>
      </ul>
    </div>
    <div>
      <Image
        src="/currency.jpg" // Add your currency image URL or use Next.js Image loader if needed
        alt="Currency"
        width={120}
        height={80}
        className="rounded-md"
      />
    </div>
  </div>
  <div className="bg-gray-100 p-4 rounded-lg mb-6">
    <h2 className="text-xl font-semibold mb-3">Overview</h2>
    <p className="text-gray-700 mb-4">
      Depending on the country and background check by the ministry - visa approval takes 4-5 working days.
    </p>
    <ul className="text-gray-700 list-disc list-inside">
      <li>Visa fee is non-refundable</li>
      <li>Approval is subject to the Saudi embassy</li>
      <li>
        Additional cost for Visa insurance is applicable of AED 250 for applicants above the age of 55.
      </li>
      <li>
        A fine of AED 30,000 will be imposed for absconding guests, chargeable to the customer's card.
      </li>
    </ul>
  </div>

  <div className="bg-gray-100 p-4 rounded-lg mb-6">
    <h2 className="text-xl font-semibold mb-3">Requirements</h2>
    <ul className="text-gray-700 list-disc list-inside">
      <li>Passport with minimum validity of 6 months</li>
      <li>Clear passport copy</li>
      <li>One recent passport-size color photo with white background</li>
    </ul>
  </div>

  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3">Activities</h2>
    <p className="text-gray-700">08/10/2024 - 09/10/2024</p>
    <p className="text-gray-700">Umrah Visa</p>
  </div>
  <div className="text-center">
    <button className="bg-teal-500 text-white py-2 px-4 rounded-lg text-lg">
      BOOK NOW - SR 960.00
    </button>
  </div>
</div> */}