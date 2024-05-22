import React, { useEffect, useState, useMemo } from 'react';
import NavbarUser from './NavbarUser';
import { MapContainer, TileLayer, Popup, CircleMarker, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'react-router-dom';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import { BASE_URL } from '../utils/constants';
import userIcon1 from '../img/live-person-location.png';
import Namebar from './Namebar';
import L from 'leaflet';

const User = (props) => {
  // const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const userId = useParams();

  const customIcon = new L.Icon({
    iconUrl: userIcon1,
    iconSize: [32, 32], // Adjust the size of your icon as needed
    iconAnchor: [16, 32], // Adjust the anchor point if necessary
  });

  useEffect(() => {
    props.setProgress(10); // Set loading to 10% initially

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}employees/${userId.user}/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();

        const updatedUserData = json.map((item) => ({
          keyId: item._id,
          id: item.employeeId,
          lat: item.latitude,
          lng: item.longitude,
          trackedAt: item.tracked_at, // Add the tracked_at property
        }));

        if (updatedUserData.length > 0) {
          setNewCenter({ latitude: updatedUserData[0].lat, longitude: updatedUserData[0].lng });
        }

        setUserData(updatedUserData);

        props.setProgress(100); // Set loading to 100% when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array, so it only runs once
  return (
    <div className="App">
      <NavbarUser users={userData} userId={userId.user} />
      <Namebar name={userId.name??''} />
      <div className="map-container">
        <MapContainer
          key={`${newCenter.latitude}-${newCenter.longitude}`}
          center={[newCenter.latitude, newCenter.longitude]}
          zoom={15}
          style={{ height: '90vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <CircleMarker key={users.keyId} center={[user.lat, user.lng]} radius={5} color="red" fillOpacity={0.5}>
              <Popup>
                {new Date(user.trackedAt).toLocaleString()}
              </Popup>
            </CircleMarker>
          ))}
          <FullscreenControl position="topright" /> {/* Add FullscreenControl */}
        </MapContainer>
      </div>
    </div>
  );
};

export default User;
