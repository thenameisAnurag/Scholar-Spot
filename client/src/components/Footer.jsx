// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Services Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-bold mb-4">Our Services</h2>
          <p className="text-gray-400">
            We offer a range of services to help you find and utilize scholarship opportunities effectively. Explore our scholarship recommendations, read insightful blogs, and contribute your own knowledge to our platform.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="text-gray-300 hover:text-white transition">
                Scholarships
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-gray-300 hover:text-white transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="text-gray-300 hover:text-white transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
