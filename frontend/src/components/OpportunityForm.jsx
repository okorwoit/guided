import React, { useState } from "react";
import './OpportunityForm.css';

const OpportunityForm = ({ onAddOpportunity }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddOpportunity(formData);
        // Clear the form after submission
        setFormData({
            title: '',
            description: '',
            category: '',
            date: '',
            duration: '',
        });
    };

    return (
        <div className="opportunity-form">
            <h2>Add Opportunity</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />

                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

                <label htmlFor="duration">Duration (in hours):</label>
                <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default OpportunityForm;
