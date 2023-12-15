import React from 'react';
import { Link } from 'react-router-dom';
// import css from '../styles.css';
import '../styles.css';


function Sidebar({ activeCategory, onCategoryClick }) {
    const categories = [
      'Dashboard',
      'Mentors',
      'Opportunities',
      'Students',
    ];
const otherLinks = ['Settings', 'Log Out', 'Profile'];

    return (
      <div className="sidebar">
        <div className="sidebar-logo">GUIDED</div>
        <hr className="divider" />
        <div className="sidebar-category">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase()}`}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Link>
          ))}
        </div>
        <hr className="divider" />
        <div className="sidebar-category">
          {otherLinks.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase()}`}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    );
}

export default Sidebar;




















// import React from 'react';

// // Start of Sidebar component
// function Sidebar({ activeCategory, onCategoryClick }) {
//   // Array of categories and other links
//     const categories = [
//       'Dashboard',
//       'Mentors',
//       'Opportunities',
//       'Messages',
//       'Documents',
//       'Community',
//     ];
//     const otherLinks = ['Settings', 'Log Out', 'Profile'];
  
//     // Return the JSX for the sidebar component
//     return (
//       <div className="sidebar">
//         <div className="sidebar-logo">Your Logo</div>
//         <hr className="divider" />
//         <div className="sidebar-category">
//           {/* Map the categories array and create a button for each category */}
//           {categories.map((category) => (
//             <button
//               key={category} // Unique key for each category
//               className={activeCategory === category ? 'active' : ''}
//               onClick={() => onCategoryClick(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <hr className="divider" />
//         <div className="sidebar-category">
//           {otherLinks.map((category) => (
//             <button
//               key={category}
//               className={activeCategory === category ? 'active' : ''}
//               onClick={() => onCategoryClick(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//       </div>
//     );
//   }
  
//   export default Sidebar;

