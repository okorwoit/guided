import React, { useReducer } from 'react';
import axios from 'axios';
import './Signup.css';

export const API_URL = "http://localhost:3000";

// Form input component
const FormInput = ({ type, placeholder, value, onChange }) => (
  <input type={type} placeholder={placeholder} required value={value} onChange={onChange} />
);

// Initial form state
const initialState = {
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Student',
  error: '',
  loading: false
};

// Form reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'field': // update field value
      return { ...state, [action.fieldName]: action.payload };
    case 'error': // set error message
      return { ...state, error: action.payload, loading: false };
    case 'start_loading': // start form submission
      return { ...state, error: '', loading: true };
    case 'success': // form submission successful
      return { ...state, error: '', loading: false };
    default:
      return state;
  }
};

const Signup = () => {
  const [{ firstName, email, password, confirmPassword, role, error, loading }, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !email || !password || !confirmPassword) {
      dispatch({ type: 'error', payload: 'All fields are required' });
      return;
    }

    if (password !== confirmPassword) {
      dispatch({ type: 'error', payload: 'Passwords do not match' });
      return;
    }

    dispatch({ type: 'start_loading' });

    try {
      const res = await axios.post(`http://localhost:3000/auth/signup`, { name, email, password, role });
      
      //Check res status
      if (res.status === 201) {
        window.location.href = '/login';
      }

    } catch (error) {
      dispatch({ type: 'error', payload: 'Signup failed: ' + error.message });
    }
  };

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <FormInput type="text" placeholder="Name" value={firstName} onChange={(e) => dispatch({ type: 'field', fieldName: 'firstName', payload: e.target.value })} />
        <FormInput type="email" placeholder="Email" value={email} onChange={(e) => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })} />
        <FormInput type="password" placeholder="Password" value={password} onChange={(e) => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })} />
        <FormInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => dispatch({ type: 'field', fieldName: 'confirmPassword', payload: e.target.value })} />
        <select value={role} onChange={(e) => dispatch({ type: 'field', fieldName: 'role', payload: e.target.value })}>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;