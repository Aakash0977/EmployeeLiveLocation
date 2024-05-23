import React, { useEffect, useState } from 'react';
import './SCSS/NewHome.scss';
import MapComponent from './Map';
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import logo from '../img/DishHome_Logo.svg.png';

import edrIcon from '../img/tech-edr.png';
import cdrIcon from '../img/tech-cdr.png';
import mwdrIcon from '../img/tech-mwdr.png';
import pokIcon from '../img/tech-pok.png';
import fwdrIcon from '../img/tech-fwdr.png';
import wdrIcon from '../img/tech-wdr.png';
import Sidedetails from './Sidedetails';

export const NewHome = (props) => {
  useEffect(() => {
    const handleSidebarToggle = () => {
      document.getElementById('sidebar').classList.toggle('active');
    };

    document.getElementById('sidebarCollapse').addEventListener('click', handleSidebarToggle);

    return () => {
      document.getElementById('sidebarCollapse').removeEventListener('click', handleSidebarToggle);
    };
  }, []);

  const [users, setUsers] = useState([]);
  const [orgResponse, setOrgResponse] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const getAllEmployees = async (jsonResponse) => {
    const allEmployees = [];

    jsonResponse.forEach(vendor => {

      const { employees } = vendor;
      allEmployees.push(...employees);

    });
    return allEmployees;
  }

  const vendorToIconMap = {
    'POK': pokIcon,
    'EDR': cdrIcon,
    'WDR-Butwal': wdrIcon,
    'CDR': edrIcon,
    'FWDR': fwdrIcon,
    'MWDR': mwdrIcon,
    'Bagmati': edrIcon,
    'Bagmati Central': edrIcon
  }

  const fetchData = async () => {
    props.setProgress(10);
    const response = await fetch(BASE_URL + "locations/live-location-traces", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let orgResponse = await response.json();
    setOrgResponse(orgResponse);

    let json = await getAllEmployees(orgResponse);

    const userData = json.map((item) => ({
      id: item.employeeId,
      name: item.name,
      lat: item.location.latitude,
      lng: item.location.longitude,
      time: item.location.tracked_at,
      icon: vendorToIconMap[item.vendor_name],
      vendorName: item.vendor_name
    }));

    setUsers(userData);
    props.setProgress(100);
  }


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [users]);

  // Function to toggle full-screen mode
  const toggleFullScreen = () => {
    var elem = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      setIsFullScreen(true); // Update state when entering full-screen mode
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullScreen(false); // Update state when exiting full-screen mode
    }
  };

  const [receivedData, setReceivedData] = useState();

  const logDataFromSidedetails = (data) => {
    setReceivedData(data);
  };

  const bodyStyle = {
    overflow: 'hidden'
  };


  return (
    <div>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="40" height="40" style={{ marginRight: '10px' }} />
            DH-RTLS
          </Link>
          </div>
          <div className="p-2 bd-highlight ">
            <Sidedetails orgResponse={orgResponse} users={users} logData={logDataFromSidedetails} />
          </div>
        </nav>

        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button type="button" id="sidebarCollapse" className="btn btn-info">
                <i className="fas fa-align-left"></i>
                <span>Vendors</span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              </div>
            </div>
          </nav>
          <MapComponent users={users} />
        </div>
      </div>
    </div>
  );
};
