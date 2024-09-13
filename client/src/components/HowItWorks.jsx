// HowItWorks.jsx
import React from "react";
import { FaRegCircle } from "react-icons/fa";

const steps = [
  {
    title: "Register",
    description: "Sign up to create an account and access all features.",
  },
  {
    title: "Login",
    description: "Log in to your account to manage your profile and explore opportunities.",
  },
  {
    title: "Scholarship Recommendation System",
    description: "Use our recommendation engine to find scholarships tailored to your profile.",
  },
  {
    title: "Create Blogs",
    description: "Share your knowledge and experiences by creating and publishing blogs on our platform.",
  },
];

const HowItWorks = () => (
  <div className="py-12 px-4 md:px-10 bg-white">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
      <p className="text-lg text-gray-600 mb-8">
        Follow these simple steps to make the most of our platform. From registration to creating blogs, we guide you through every stage.
      </p>
      <div className="flex flex-col space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 mb-6"
          >
            <div className="flex-shrink-0 text-2xl text-blue-600">
              <FaRegCircle />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowItWorks;
