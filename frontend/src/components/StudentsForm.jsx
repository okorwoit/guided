import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './StudentsForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormInput = ({ id, name, type, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
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

const StudentsForm = ({ onCancel, isEdit, studentData }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        role: 'Student',
        expertise: '',
        bio: '',
    });

    useEffect(() => {
        if (isEdit) {
            console.log(studentData);
            setFormData({
                firstName: studentData?.firstName,
                email: studentData?.email,
                password: studentData?.password,
                expertise: studentData?.expertise,
                bio: studentData?.bio,
            });
        }
    }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [message, setMessage] = useState({
        type: '',
        content: '',
    })
    const [loading, setLoading] = useState(false)
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        try {
          setLoading(true)
          const res = await axios.post(`http://localhost:3000/auth/signup`, formData);
          
          //Check res status
          if (res.status === 201) {
            setMessage({
              type: 'success',
              content: 'Student added successfully'
            });

            setTimeout(() => {
              navigate('/students');
            }, 1000);

          }
    
        } catch (error) {
          setMessage({
            type: 'error',
            content: 'Student not added'
          });
          
        }
        finally{
          setLoading(false)
        }
        
    };

    const handleUpdate = async(e) => {
      e.preventDefault();
      console.log(formData);

      try {
        setLoading(true)
        const res = await axios.put(`http://localhost:3000/users/${studentData._id}`, formData);
        
        //Check res status
        if (res.status === 200) {
          setMessage({
            type: 'success',
            content: 'Student updated successfully'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);

        }
  
      } catch (error) {
        setMessage({
          type: 'error',
          content: 'Student not updated'
        });
        
      }
      finally{
        setLoading(false)
      }
    }

    return (
      <div className="students-form">
        <button className="cancel-button" onClick={onCancel}>X</button>

        <h2>{isEdit ? "Edit" : "Add"} Student {isEdit && studentData.firstName}</h2>
        <form onSubmit={!isEdit ? handleSubmit: handleUpdate} className="student-form">
          <div className="message">
            {message.content && (
              <div className={`message__container form__${message.type}`}>
                {message.content}
              </div>
            )}
          </div>
          <FormInput id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="form-input">First Name:</FormInput>
          <FormInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="form-input">Email:</FormInput>
          {!isEdit && <FormInput id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="form-input">Password:</FormInput>}
          <FormInput id="expertise" name="expertise" type="text" value={formData.expertise} onChange={handleChange} className="form-input">Expertise:</FormInput>
          <FormInput id="bio" name="bio" type="text" value={formData.bio} onChange={handleChange} className="form-input">Bio:</FormInput>
          <button type="submit" className="form-button">{loading ? "Saving...":"Add"}</button>
        </form>
      </div>
  );
};



export default StudentsForm;