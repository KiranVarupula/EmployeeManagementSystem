import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../WishlistContext';

function Navbar() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.querySelector('.nav-bar');
      if (window.scrollY > 45) {
        navBar.classList.add('sticky-top');
      } else {
        navBar.classList.remove('sticky-top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out successfully!");
    navigate("/loginsignup");
  };

  return (
    <header className="container-fluid nav-bar bg-transparent mt-0">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
          <h1 className="m-0 logo">LOGO </h1>
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            {/* <Dropdown>
              <Dropdown.Toggle as={Link} to="#" className="nav-link">
                Property
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/apartment">Apartment</Dropdown.Item>
                <Dropdown.Item as={Link} to="/villa">Villa</Dropdown.Item>
                <Dropdown.Item as={Link} to="/house">House</Dropdown.Item>
                <Dropdown.Item as={Link} to="/office">Office</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              {/* Optional: Add an icon here */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {isLoggedIn ? (
                <>
                  <Dropdown.Item as={Link} to="/user/accountsettings">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/wishlist">
                    Wishlist 
                    <span className="wishlist-badge">{wishlist.length}</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item as={Link} to="/loginsignup">Login/SignUp</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
