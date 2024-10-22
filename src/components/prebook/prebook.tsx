// pages/prebook.js
import React, { useState } from 'react';

const PreBookPage = () => {
  const [contact, setContact] = useState({
    title: 'Mr',
    firstName: 'Amber Demo',
    lastName: 'Agency',
    email: '',
    phone: '',
    country: 'Vietnam',
    agencyReference: ''
  });

  const [traveller, setTraveller] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    birthday: '',
    nationality: ''
  });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const copyFromContact = () => {
    setTraveller({
      ...traveller,
      title: contact.title,
      firstName: contact.firstName,
      lastName: contact.lastName
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <span className="text-teal-500">Search Results</span>
            <span className="text-teal-500">Add On</span>
            <span className="text-teal-500 font-bold">Traveler Details</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Contact Section */}
            <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Contact and Traveler Details</h2>
              <p className="text-sm text-gray-500 mb-6">
                Accurate traveler details per your travel document are essential for a hassle-free experience.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Title *</label>
                    <select
                      name="title"
                      value={contact.title}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option>Mr</option>
                      <option>Mrs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={contact.firstName}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={contact.lastName}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contact.phone}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={contact.country}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Agency Reference</label>
                    <input
                      type="text"
                      name="agencyReference"
                      value={contact.agencyReference}
                      onChange={(e) => handleInputChange(e, setContact)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Traveller Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Traveller 1</h3>
                  <button
                    className="text-teal-500"
                    onClick={copyFromContact}
                  >
                    Copy From Contact
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Title *</label>
                    <select
                      name="title"
                      value={traveller.title}
                      onChange={(e) => handleInputChange(e, setTraveller)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option>Mr</option>
                      <option>Mrs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={traveller.firstName}
                      onChange={(e) => handleInputChange(e, setTraveller)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={traveller.lastName}
                      onChange={(e) => handleInputChange(e, setTraveller)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Birthday *</label>
                    <input
                      type="date"
                      name="birthday"
                      value={traveller.birthday}
                      onChange={(e) => handleInputChange(e, setTraveller)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Nationality *</label>
                    <select
                      name="nationality"
                      value={traveller.nationality}
                      onChange={(e) => handleInputChange(e, setTraveller)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option>Vietnam</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Booking Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">Hotel in North Corniche Road, Jeddah</h3>
              <p>08/10/2024 - 09/10/2024</p>
              <p className="text-teal-500">Jeddah Hilton</p>
              <p>North Corniche Road, Jeddah...</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold">Prices</h4>
              <p>Jeddah Hilton</p>
              <p>Total: <span className="font-bold text-lg">SR 914.16</span></p>
            </div>
            <button className="w-full py-3 bg-teal-500 text-white font-bold rounded-lg">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreBookPage;
