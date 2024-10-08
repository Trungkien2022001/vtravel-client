// components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-teal-500 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold">holidayme</h3>
            <p>Contact Us: +971 42 45 7300</p>
            <p>Travazy DMCC (Registered Office)</p>
            <p>Unit No. 1503, Swiss Tower, Cluster Y, JLT, Dubai UAE P.O. Box no. 93853</p>
          </div>
  
          <div>
            <h3 className="text-lg font-bold">Quicklinks</h3>
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
            </ul>
          </div>
  
          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <ul>
              <li><a href="#" className="hover:underline">Umrah Packages</a></li>
              <li><a href="#" className="hover:underline">Umrah Plus Packages</a></li>
              <li><a href="#" className="hover:underline">Hotels</a></li>
              <li><a href="#" className="hover:underline">Destinations</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  