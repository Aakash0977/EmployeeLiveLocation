import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../img/DishHome_Logo.svg.png';

export const Navbar = ({ users, userId, logData }) => {
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState(0);

  const handleSuccessfulSearch = (user) => {
    setMapKey((prevValue) => prevValue + 1);
    logData({ latitude: user.lat, longitude: user.lng, mapKey: mapKey });
  };

  return (
    <div className='navBar'>
      <nav className="navbar navbar-expand-lg p-1 navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="40" height="40" style={{ marginRight: '10px' }} />
            DH-RTLS
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
              <li className="nav-item dropdown">
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {users.map((user) => (
                    <li key={user.id}>
                      <Link to={`/${user.name}`} className="dropdown-item">
                        {user.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
