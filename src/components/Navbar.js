import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from '../img/DishHome_Logo.svg.png';

export const Navbar = ({ users, userId }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
  
    // Check if the search query is a valid user ID
    const userToSearch = users.find((user) => user.id === searchQuery);
  
    if (userToSearch) {
      // If a user with the matching ID is found, navigate to their profile
      navigate(`/home/${userToSearch.name}`);
    } else {
      // If the search query is not a valid user ID, check if it's a user name
      const userByName = users.find((user) => user.name === searchQuery);
      
      if (userByName) {
        // If a user with the matching name is found, navigate to their profile
        navigate(`/home/${userByName.name}`);
      } else {
        // Handle the case when the user is not found
        alert('User not found.');
      }
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
             <img src={logo} alt="Logo" width="40" height="40" style={{ marginRight: '10px' }}  />
             E-LTS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link`} aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${userId ? 'disabled-dropdown' : ''}`}
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={userId ? true : false}
                >
                  {userId ? userId : 'All-Users'}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {users.map((user) => (
                    <li key={user.id}>
                      <Link to={`/home/${user.name}`} className="dropdown-item">
                        {user.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
            {!userId && ( <input
                className="form-control me-2"
                type="search"
                placeholder="Search by User ID"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />)}
              {!userId &&(<button className="btn btn-outline-success" type="submit">
                Search
              </button>)}
              <button className="btn btn-outline-success mx-2" onClick={handleLogout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
