// Home.jsx
import React from "react";
import Scholarship from "../assets/scholarship_01.jpg";
import Features from "../components/features";
import HowItWorks from './../components/HowItWorks';

const Home = () => (
  <>


  <div className="flex flex-col md:flex-row w-full p-4">
    {/* Content Section */}
    <div className="bg-white w-full md:w-1/2 py-8 px-4 md:px-10 mb-4 md:mb-0 ">
      <div className="max-w-4xl flex flex-col justify-center content-center h-screen justify-items-center mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Discover the Best Scholarships and Stay Updated with Our Blogs
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Explore a wide range of scholarship opportunities that can help you
          achieve your academic goals. Our platform also offers insightful blogs
          to keep you informed about the latest trends and tips related to
          scholarships.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/blogs"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Blogs
          </a>
          <a
            href="/scholarships"
            className="bg-yellow-500 text-blue-800 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
          >
            Browse Scholarships
          </a>
        </div>
      </div>
    </div>

    {/* Image Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <img
        src={Scholarship}
        alt="Scholarship"
        className="w-full h-auto object-cover"
      />
    </div>

  </div>
  <Features></Features>
  <HowItWorks></HowItWorks>
  </>
);

export default Home;
