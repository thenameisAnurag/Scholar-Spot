// Features.jsx
import React from "react";

const features = [
  {
    title: "Browse Scholarships",
    description:
      "Explore a wide range of scholarships available for various academic levels and fields.",
    icon: "🔍", // Replace with appropriate icon or image if available
  },
  {
    title: "Find Blogs",
    description:
      "Read insightful blogs to stay updated with the latest trends and tips in the scholarship world.",
    icon: "📰", // Replace with appropriate icon or image if available
  },
  {
    title: "Create Blogs",
    description:
      "Share your experiences and knowledge by creating and publishing your own blogs on our platform.",
    icon: "✍️", // Replace with appropriate icon or image if available
  },
  {
    title: "Scholarship Recommendation Engine",
    description:
      "Get personalized scholarship recommendations based on your preferences and academic profile.",
    icon: "🔮", // Replace with appropriate icon or image if available
  },
];

const Features = () => (
  <div className="py-12 px-4 md:px-10 flex gap-5 w-10/12 bg-gray-50 mx-auto">
    <div className="w-5/12 mx-auto justify-center content-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Features</h2>
      <p className="text-lg font-medium text-gray-600 mb-8">
        We offer a range of Features designed to help you find and make the most
        of scholarship opportunities. Whether you’re looking for detailed
        information on available scholarships, engaging blogs, or a platform to
        share your own insights, we’ve got you covered.
      </p>
    </div>
    <div className="w-7/12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {features.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Features;
