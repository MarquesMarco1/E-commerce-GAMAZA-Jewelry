import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const position = [51.505, -0.09];

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between bg-dark-purple bg-opacity-20 h-auto md:h-96 mt-10 w-full p-4 border-t border-gray-300">
      <div className="flex-1 flex flex-col items-center md:items-start justify-center p-4 text-center md:text-left">
        <h2 className="text-gold text-4xl font-primary mb-2">Nous contacter</h2>
        <p className="text-white mb-4">74 avenue GAMAZA, GAMAZA CITY</p>
        <p className="text-white mb-4">Email: gamaza@gamaza.com</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-gray-400"><FaFacebook size={24} /></a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400"><FaTwitter size={24} /></a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400"><FaInstagram size={24} /></a>
        </div>
      </div>
      <div className="flex-1 h-64 md:h-full w-full md:w-1/2 p-4">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </footer>
  );
}
