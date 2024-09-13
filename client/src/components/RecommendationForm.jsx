import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

const RecommendationForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    category: '',
    qualification: '',
    income: '',
    type: '',
  });

  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false); // To toggle recommendation modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsRecommendationOpen(false); // Close any previous recommendation when new one is being fetched

    try {
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setRecommendation(data);
      setIsRecommendationOpen(true); // Open recommendation modal after fetching the data
    } catch (error) {
      setError(error.message);
    }
  };

  const closeRecommendation = () => {
    setIsRecommendationOpen(false); // Close the recommendation modal
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Get Scholarship Recommendation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="all">All</option>
            <option value="SEBC">SEBC</option>
            <option value="open">Open</option>
            <option value="ST">ST</option>
            <option value="SC">SC</option>
            <option value="EBC">EBC</option>
            <option value="VJNT or SBC">VJNT or SBC</option>
            <option value="OBC">OBC</option>
            <option value="SBC">SBC</option>
            <option value="VJNT">VJNT</option>
            <option value="Minority">Minority</option>
            <option value="PWD">PWD</option>
          </select>
        </div>

        {/* Qualification Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">Qualification:</label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Qualification</option>
            <option value="Post-Graduation">Post-Graduation</option>
            <option value="FYJC">FYJC</option>
            <option value="HSC">HSC</option>
            <option value="Medical">Medical</option>
            <option value="Graduation">Graduation</option>
            <option value="PhD">PhD</option>
            <option value="B.Tech., M.B.B.S.">B.Tech., M.B.B.S.</option>
          </select>
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm font-semibold mb-1">Income:</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Get Recommendation
        </button>
      </form>

      {/* Recommendation Modal */}
      {isRecommendationOpen && recommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] relative shadow-lg">
            <button 
              onClick={closeRecommendation} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <IoCloseCircle size={30} />
            </button>

            <h2 className="text-xl font-bold mb-2">Recommendation</h2>
            <p className="mb-2"><strong>Name:</strong> {recommendation.Name}</p>
            <p className="mb-2"><strong>Description:</strong> {recommendation.Description}</p>
            <a href={recommendation.LINKS} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View More
            </a>
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default RecommendationForm;
