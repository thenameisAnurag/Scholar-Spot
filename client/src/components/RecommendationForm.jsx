import React, { useState } from 'react';

const RecommendationForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    category: '',
    qualification: '',
    income: '',
    type_: ''
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/recommend', {
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
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="qualification" placeholder="Qualification" onChange={handleChange} required />
        <input type="number" name="income" placeholder="Income" onChange={handleChange} required />
        <input type="text" name="type_" placeholder="Type" onChange={handleChange} required />
        <button type="submit">Get Recommendation</button>
      </form>
      {result && (
        <div>
          <h2>Recommendation</h2>
          <p>Name: {result.Name}</p>
          <p>Description: {result.Description}</p>
          <p>LINKS: {result.LINKS}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RecommendationForm;
