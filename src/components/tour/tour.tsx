import Image from 'next/image';

const Tour = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
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

      {/* Main Image */}
      <div className="relative mb-4">
        <Image 
          src="/flag.png" // Add your flag image URL or use Next.js Image loader if needed
          alt="Saudi Flag"
          width={500}
          height={300}
          className="rounded-md"
        />
      </div>

      {/* Details Section */}
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

      {/* Overview */}
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

      {/* Requirements */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">Requirements</h2>
        <ul className="text-gray-700 list-disc list-inside">
          <li>Passport with minimum validity of 6 months</li>
          <li>Clear passport copy</li>
          <li>One recent passport-size color photo with white background</li>
        </ul>
      </div>

      {/* Activities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Activities</h2>
        <p className="text-gray-700">08/10/2024 - 09/10/2024</p>
        <p className="text-gray-700">Umrah Visa</p>
      </div>

      {/* Booking Button */}
      <div className="text-center">
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg text-lg">
          BOOK NOW - SR 960.00
        </button>
      </div>
    </div>
  );
};

export default Tour;
