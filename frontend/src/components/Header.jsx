// Header.jsx

function Header({ activeCategory, title }) {
    

  return (
    <div className="header">
      <div className="header-left">
        <div className="active-category">{title || "Dashboard"}</div>
      </div>
      {/* <div className="header-center">
        <input type="text" placeholder="Search" />
      </div> */}
      <div className="header-right">
        <div className="profile">User Profile</div>
      </div>
    </div>
  );
}

export default Header;
