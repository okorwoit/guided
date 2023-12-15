import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Opportunities from './Opportunities';
import LandingPage from '../Pages/LandingPage';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import React from 'react';


const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={< Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
      </Routes>

    </div>
  );
};

export default Main;