import React, { useState } from 'react';

const OpportunityForm = ({ onAddOpportunity }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    const opportunityData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      duration: parseInt(formData.duration),
    };
    onAddOpportunity(opportunityData);
    // Reset form after submission
    setFormData({
      title: '',
      description: '',
      date: '',
      duration: '',
    });
  };

  return (
      <div className="opportunity-form">
        <h2>Add New Opportunity</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes):</label>
          <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
          />
        </div>
        <button onClick={handleFormSubmit}>Save Opportunity</button>
      </div>
  );
};

export default OpportunityForm;
