import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './OpportunityForm.css';
import { useNavigate } from 'react-router-dom';

// Form input component
const FormInput = ({ id, name, type, value, onChange, children }) => (
  <div className="form-group">
    <label htmlFor={id}>{children}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

// Form select component
const FormSelect = ({ id, name, value, onChange, children, options }) => (
    <div className="form-group">
      <label htmlFor={id}>{children}</label>
      <select id={id} name={name} value={value} onChange={onChange} required>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

FormSelect.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

const OpportunityForm = ({ onAddOpportunity, closeModal, isEdit, opportunityData, handleEditOpportunity }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Career Advice',
        date: '',
        duration: '',
    });

    useEffect(() => {
        if (isEdit) {
            console.log(opportunityData);
            setFormData({
                title: opportunityData?.title,
                description: opportunityData?.description,
                category: opportunityData?.category,
                date: opportunityData.date ? opportunityData.date.split('T')[0] : '',
                duration: opportunityData?.duration,
            });
        }
    }, [isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            handleEditOpportunity(opportunityData._id, formData);
            return;
        }

        onAddOpportunity(formData);
        console.log(formData);
        // Clear the form after submission
        setFormData({
            title: '',
            description: '',
            category: '',
            date: '',
            duration: '',
        });
        window.location.reload();
    };

    return (
        <div className="opportunity-form">
            <button className="cancel-button" onClick={closeModal}>X</button>

          <h2>{isEdit ? `Edit ${opportunityData?.title}`:"Add Opportunity"} </h2>
          <form onSubmit={handleSubmit}>
            <FormInput id="title" name="title" type="text" value={formData.title} onChange={handleChange}>Title:</FormInput>
            <FormInput id="description" name="description" type="text" value={formData.description} onChange={handleChange}>Description:</FormInput>
            <FormSelect id="category" name="category" value={formData.category} onChange={handleChange} options={['Career Advice', 'Resume Review', 'Mock Interviews']}>Category:</FormSelect>
            <FormInput id="date" name="date" type="date" value={formData.date} onChange={handleChange}>Date:</FormInput>
            <FormInput id="duration" name="duration" type="number" value={formData.duration} onChange={handleChange}>Duration (in hours):</FormInput>
            <button type="submit">{isEdit ? "Edit":"Add"}</button>
          </form>
        </div>
      );
};

OpportunityForm.propTypes = {
  onAddOpportunity: PropTypes.func.isRequired,
};

export default OpportunityForm;
