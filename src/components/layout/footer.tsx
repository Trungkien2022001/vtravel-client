// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-teal-500 text-white py-8 h-80 flex flex-col justify-between">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
        <div>
          <h3 className="text-lg font-bold">VTravel</h3>
          <p>Contact Us: +84 989 983 025</p>
          <p>LV Center (Registered Office)</p>
          <p>10.69 Thuy Khe Street, Thuy Khe, HaNoi City, Vietnam</p>
        </div>

        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul>
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Company</h3>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Partner</a></li>
            <li><a href="#" className="hover:underline">Contribute</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Resources</h3>
          <ul>
            <li><a href="#" className="hover:underline">Packages</a></li>
            <li><a href="#" className="hover:underline">Trips</a></li>
            <li><a href="#" className="hover:underline">Flights</a></li>
            <li><a href="#" className="hover:underline">Hotels</a></li>
            <li><a href="#" className="hover:underline">Tours</a></li>
            <li><a href="#" className="hover:underline">Vehicles</a></li>
            <li><a href="#" className="hover:underline">Insurances</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-teal-600 text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} VTravel. All rights reserved. Author: nguyenkien2022001@gmail.com
        </p>
      </div>
    </footer>

  );
}
