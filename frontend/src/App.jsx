import React, { useState } from "react";
import "./styles.css";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Main from "./components/Main.jsx";



function App() {
  const [activeCategory, setActiveCategory] = useState("Dashboard");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
      <div className="app">
        <div className="content">
          <Header activeCategory={activeCategory} />
          <Main />
        </div>
        <Sidebar
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      </div>
  );
}

export default App;
