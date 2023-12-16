import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';

import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Mentors from "./components/Mentors";
import Opportunities from "./components/Opportunities";
import Students from "./components/Students";
import Login from "./Pages/Login";

// Import other page components as needed

function App() {


  return (
    <Router>
      <div className="app">
        <div className="content">
          
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mentors" element={<Mentors/>} />
            <Route path="/opportunities" element={<Opportunities/>} />
            <Route path="/students" element={<Students/>} />
            {/* Add more Route components for other paths as needed */}
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;


