
import React from 'react';


function Sidebar({ activeCategory, onCategoryClick }) {
    const categories = [
      'Dashboard',
      'Mentors',
      'Opportunities',
      'Messages',
      'Documents',
      'Community',
    ];
    const otherLinks = ['Settings', 'Log Out', 'Profile'];
  
    return (
      <div className="sidebar">
        <div className="sidebar-logo">Your Logo</div>
        <hr className="divider" />
        <div className="sidebar-category">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <hr className="divider" />
        <div className="sidebar-category">
          {otherLinks.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    );
  }
  
  export default Sidebar;

