// pages/hotel.js
"use client";


export default function Guilder() {

  const guilder = {
    "id": 744606,
    "name": "Anh Nguyen Thi",
    age: 25,
    "country_code": "GT",
    "airport_code_code": null,
    "city_code": null,
    "district_code": null,
    "street_code": null,
    "postal_code": "1010",
    "currency": "GTQ",
    "country_name": "Vietnam",
    gender: "female",
    body_measurements: "90-60-90",
    height: "156cm",
    weight: "45kg",
    services: [
      { name: 'Holding hands: 50k' },
      { name: 'Hug: 100k' },
      { name: 'Tour guide: 200k' },
      { name: 'Photography: 150k' },
      { name: 'Private transport: 300k' },
      { name: 'VIP Access: 500k' },
      { name: 'Meal included: 120k' },
      { name: 'Souvenir: 80k' },
      // Thêm các dịch vụ mới
      { name: 'Cultural performance: 250k' },
      { name: 'Bicycle rental: 100k' },
      { name: 'Cooking class: 200k' },
      { name: 'Local market tour: 75k' }
    ],
    languages: [
      { name: 'English: Fluent' },
      { name: 'French: Conversational' },
      { name: 'Vietnamese: Native' },
      { name: 'Thailand: Conversational' },
    ],

    experiences: [
      { name: '10+ years of experience as a tour guide' },
      { name: 'Featured tours: Mekong Delta, Hanoi City, Sapa Trekking' },
    ],

    specializations: [
      { name: 'Eco-tourism' },
      { name: 'Cultural tours' },
      { name: 'History tours' },
      { name: 'Food tours' },
    ],

    areas: [
      { name: 'Ho Chi Minh City' },
      { name: 'Hanoi' },
      { name: 'Sapa' },
      { name: 'Mekong Delta' },
    ],
    about_me: "I'm passionate about showcasing the beauty of Vietnam, with a focus on culture, history, and nature. With over a decade of experience, I have guided many successful tours that leave lasting memories for travelers.",
    "rating": {
      "type": "Star",
      "count": 945,
      "value": "5.0",
      "rating": "3.5",
      "comfort": "4.5",
      "overall": "4.4",
      "service": "4.5",
      "location": "4.5",
      "amenities": "4.5",
      "condition": "4.4",
      "cleanliness": "4.6",
      "neighborhood": "4.5",
      "recommendation_percent": "86.5"
    },


    "multi_unit": true,
    "payment_registration_recommended": false,
    "supply_source": "expedia",
    "created_at": "2024-09-20T04:54:36.722Z",
    "updated_at": "2024-09-20T04:54:36.722Z",
    "created_by": null,
    "updated_by": null,
    "is_deleted": false,
    "deleted_at": null,
    "images": [
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-4.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-2.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-3.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-1.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-5.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-6.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-7.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-8.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
      {
        "urls": [
          {
            "url": "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-rose-9.jpg",
            "size": "350px"
          },
        ],
        "caption": "Primary image",
        "category": 3,
        "hero_image": true
      },
    ]
  }

  return (
    <div className="flex border rounded-lg shadow-sm mb-4 bg-white">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full m-2 bg-white shadow-lg rounded-lg overflow-hidden p-4">
          {/* Hotel Name and Star Rating */}
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-teal-500">{guilder.name}</h1>
            <div className="flex items-center mt-1">
              {/* Placeholder for star rating (replace with dynamic star rating if available) */}
              <span className="text-yellow-500 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
          </div>

          {/* Images Section */}
          <div className="flex">
            <div className="w-1/2">
              <img
                src={guilder.images[0].urls[0].url}
                alt={guilder.name}
                width={480}
                height={480}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="w-1/2 grid grid-cols-3 gap-3 pl-3 overflow-y-scroll" style={{ height: "500px" }}>
              {guilder.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image.urls[0].url}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Address Section */}
        </div>
        {/* Thông tin cá nhân */}
        <div className="m-2 shadow-lg rounded-lg p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Ảnh và thông tin cá nhân */}
            <div className="flex items-start">
              <div>
                <h2 className="text-2xl font-bold">{guilder.name}</h2>
                <p>Age: {guilder.age}</p>
                <p>Nationality: {guilder.country_name}</p>
                <p>Gender: {guilder.gender}</p>
                <p>Body Measurements: {guilder.body_measurements}</p>
                <p>Weight: {guilder.weight}</p>
                <p>Height: {guilder.height}</p>

              </div>
            </div>

            {/* Thông tin ngôn ngữ */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">Languages</h3>
              <div className="flex flex-wrap">
                {guilder.languages.map((language, index) => (
                  <div key={index} className="flex-none w-full py-1 pr-1 flex items-center">
                    <span className="text-green-500 mr-1">&#10003;</span> {/* Dấu tích xanh */}
                    {language.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Kinh nghiệm */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">Experience</h3>
              <div className="flex flex-wrap">
                {guilder.experiences.map((experience, index) => (
                  <div key={index} className="flex-none w-full py-1 pr-1 flex items-center">
                    <span className="text-green-500 mr-1">&#10003;</span>
                    {experience.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Chuyên môn */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">Specialization</h3>
              <div className="flex flex-wrap">
                {guilder.specializations.map((specialization, index) => (
                  <div key={index} className="flex-none w-full py-1 pr-1 flex items-center">
                    <span className="text-green-500 mr-1">&#10003;</span>
                    {specialization.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Địa điểm hoạt động */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">Operating Area</h3>
              <div className="flex flex-wrap">
                {guilder.areas.map((area, index) => (
                  <div key={index} className="flex-none w-full py-1 pr-1 flex items-center">
                    <span className="text-green-500 mr-1">&#10003;</span>
                    {area.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Giới thiệu ngắn */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">About Me</h3>
              <p>
                {guilder.about_me}
              </p>
            </div>
          </div>
        </div>

        <div className="m-2 h-auto border text-teal-500 rounded-lg p-4 flex mt-5 bg-white">
          {/* Danh sách dịch vụ chiếm 2/3 */}
          <div className="flex-basis-2/3 flex-grow">
            <h3 className="text-lg font-semibold truncate mb-2">Choose Additional Services</h3>
            <div className="flex flex-wrap">
              {guilder.services.map((service, index) => (
                <div key={index} className="w-1/3 sm:w-1/3 flex items-center mb-1">
                  <input type="checkbox" id={`service-${index}`} className="mr-2" />
                  <label htmlFor={`service-${index}`}>{service.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Group select chiếm 1/3 */}
          <div className="ml-5 bg-white border border-teal-500 text-teal-500 rounded-lg p-4 text-center w-80 flex flex-col ">
            {/* Tích xanh hoặc dấu chéo đỏ */}
            <div className="flex justify-center items-center mb-1">
              {false ? (
                <span className="text-green-500">&#10003; Refundable</span> // Tích xanh
              ) : (
                <span className="text-red-500">&#10007; Non-refundable</span> // Dấu chéo đỏ
              )}
            </div>

            {/* Giá */}
            <p className="text-xl font-bold mb-5">500000 VND</p> {/* Tăng kích thước chữ cho giá */}

            {/* Button Select */}
            <button className="bg-teal-500 text-white rounded-lg py-2 px-6 hover:bg-teal-800 mb-1">
              Select
            </button>

            {/* Chính sách pháp lý nằm dưới button */}
            <p className="text-xs underline cursor-pointer text-center">
              Legal Policy
            </p>
          </div>
        </div>



      </div>
    </div>
  );
}
