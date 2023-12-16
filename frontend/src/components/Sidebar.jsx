import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import css from '../styles.css';
import '../styles.css';


function Sidebar({ onCategoryClick }) {

  const current__user = JSON.parse(localStorage.getItem('guided__user'));

    const categories = [
      'Dashboard',
      'Mentors',
      'Opportunities'
    ];

    const [menuItems, setMenuItems] = useState(categories);

    useEffect(()=>{
      if(current__user.role === 'Admin'){
        setMenuItems([
          ...categories,
          'Students'
        ]);
      }
    }, [])

    const navigate = useNavigate();

    return (
      <div className="sidebar">
        <div className="sidebar-logo">GUIDED</div>
        <hr className="divider" />
        <div className="sidebar-category">
          {menuItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => onCategoryClick(item)}
            >
              {item}
            </NavLink>
          ))}
        </div>
        <hr className="divider" />
        <div className="sidebar-category">
          <button onClick={()=>{localStorage.removeItem("guided__user"); navigate("/login")  }}>
            Logout
          </button>          
        </div>
      </div>
    );
}

export default Sidebar;

