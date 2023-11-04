// import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/dashboard.jsx";
import Opportunities from "../Pages/opportunities.jsx";

const Main = () => {
  // const [searchInput, setSearchInput] = useState('');

  // const handleSearch = (e) => {
  //     setSearchInput(e.target.value);
  // }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
