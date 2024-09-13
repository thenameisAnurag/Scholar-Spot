import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RecommendationForm from '../components/RecommendationForm'; // Import the form component

const Scholarships = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Check if the user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scholarships</h1>
      {isLoggedIn ? (
        <>
          <button
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Get Recommendations
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <button
                  onClick={closeModal}
                  className="text-red-500 font-bold mb-4"
                >
                  Close
                </button>
                <RecommendationForm />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Please log in to get scholarship recommendations.</p>
      )}
    </div>
  );
};

export default Scholarships;
