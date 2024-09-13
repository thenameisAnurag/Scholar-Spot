import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { authActions } from "../store"; // Import the actions from the auth slice
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ type, onClose }) => {
   // State to handle form type ('login' or 'register')
   const [formType, setFormType] = useState(type); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data to console for debugging

    try {
      // Use the full backend URL
      const url =
        type === "login"
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/users/register";

      // Make API request to backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include credentials (cookies) for session handling
      });

      const data = await response.json();

      // Check response status and handle accordingly
      if (response.ok) {
        alert(data.message);
        if (type === "login") {
          // Dispatch the login action to update the state in Redux
          dispatch(authActions.login());
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again.");
    }

    onClose(); // Close the modal after form submission
  };
  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded w-96 relative">
      {/* Close Icon */}
      <button onClick={onClose} className="absolute top-4 right-4 text-red-500">
        <IoMdCloseCircle size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-4">
        {formType === "login" ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit}>
        {formType === "register" && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {formType === "login" ? "Login" : "Register"}
        </button>
      </form>

      {/* Toggle between Login and Register */}
      <p className="mt-4 text-sm text-gray-600">
        {formType === "login" ? (
          <>
            Not registered yet?{" "}
            <button onClick={toggleFormType} className="text-blue-500 hover:underline">
              Register Now
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={toggleFormType} className="text-blue-500 hover:underline">
              Login Here
            </button>
          </>
        )}
      </p>
    </div>
  </div>
  );
};

export default Modal;
