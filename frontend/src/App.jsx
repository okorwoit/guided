import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Mentors from "./components/Mentors";
import Opportunities from "./components/Opportunities";
import Students from "./components/Students";
import Login from "./Pages/Login";

// Import other page components as needed

function App() {
  const [activeCategory, setActiveCategory] = useState("Dashboard");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Header activeCategory={activeCategory} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard activeCategory={activeCategory} handleCategoryClick={handleCategoryClick} />} />
            <Route path="/mentors" element={<Mentors activeCategory={activeCategory} handleCategoryClick={handleCategoryClick}/>} />
            <Route path="/opportunities" element={<Opportunities activeCategory={activeCategory} handleCategoryClick={handleCategoryClick}/>} />
            <Route path="/students" element={<Students activeCategory={activeCategory} handleCategoryClick={handleCategoryClick}/>} />
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


