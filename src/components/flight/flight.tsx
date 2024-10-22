export default function FlightCard(flight) {
  const airlineName = flight.flight_id.substring(0, 2)
  return (
    <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 max-w-4xl mx-auto my-4">
      {/* Left side with flight details */}
      <div className="flex items-center space-x-4">
        {/* Airline Logo */}
        <img src={airlineName} alt={airlineName} className="w-16 h-16 rounded-md" />

        {/* Flight Info */}
        {flight.outbound.map(leg=>(
          <div>
            <h3 className="text-xl font-semibold">{airlineName}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <p>{departure.time}</p>
              <span className="text-gray-400">|</span>
              <p>{arrival.time}</p>
            </div>
            <div className="text-gray-500">
              <p>{departure.location} → {arrival.location}</p>
              <p className="text-teal-500">{flightDetails.duration} via {stops.location}</p>
              <p>{baggage}</p>
            </div>
            <a href="#" className="text-blue-500 text-sm">Flight details</a>
          </div>

        ))}
      </div>

      {/* Right side with price and actions */}
      <div className="bg-teal-500 text-white rounded-lg p-4 text-center w-64">
        <p className="text-lg">PRICE</p>
        <p className="text-2xl font-bold">{price}</p>
        <p className="text-sm">Round Trip</p>
        <button className="bg-white text-teal-500 rounded-lg py-2 px-6 mt-4 hover:bg-gray-200">
          Select
        </button>
        <p className="text-xs mt-2 underline cursor-pointer">Price Breakdown</p>
      </div>
    </div>
  );
}
