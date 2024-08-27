import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import L from "leaflet";
import customMarker from "../leaf-red.png";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const parisPosition = [48.8566, 2.3522];
  const { t } = useTranslation();

  const stores = [
    {
      position: [48.8566, 2.3522],
      name: "Magasin GAMAZA Paris",
      address: "74 avenue GAMAZA, Paris",
    },
    {
      position: [43.6047, 1.4442],
      name: "Magasin GAMAZA Toulouse",
      address: "20 rue GAMAZA, Toulouse",
    },
    {
      position: [45.764, 4.8357],
      name: "Magasin GAMAZA Lyon",
      address: "15 place GAMAZA, Lyon",
    },
    {
      position: [50.6292, 3.0573],
      name: "Magasin GAMAZA Lille",
      address: "10 boulevard GAMAZA, Lille",
    },
    {
      position: [43.7102, 7.262],
      name: "Magasin GAMAZA Nice",
      address: "5 avenue GAMAZA, Nice",
    },
  ];

  const customIcon = new L.Icon({
    iconUrl: customMarker,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between bg-light-purple dark:bg-dark-mode-purple h-auto md:h-96 mt-10 w-full p-4 border-t rounded-md">
      <div className="flex-1 flex flex-col items-center md:items-start justify-center p-4 text-center md:text-left">
        <h2 className="text-gold text-4xl font-extrabold font-primary mb-2">
          {t("footer.title")}
        </h2>
        <p className="text-gold mb-4 text-2xl font-bold font-primary">
          {t("footer.adress")}
        </p>
        <p className="text-gold mb-4 text-2xl font-bold font-primary">
          Email : gamaza@gamaza.com
        </p>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            className="text-white hover:text-gray-400"
          >
            <FaFacebook size={24} color="#BF9553" />
          </a>
          <a
            href="https://twitter.com"
            className="text-white hover:text-gray-400"
          >
            <FaTwitter size={24} color="#BF9553" />
          </a>
          <a
            href="https://instagram.com"
            className="text-white hover:text-gray-400"
          >
            <FaInstagram size={24} color="#BF9553" />
          </a>
        </div>
      </div>
      <div className="flex-1 h-64 md:h-full w-full p-4">
        <MapContainer
          center={parisPosition}
          zoom={6}
          className="h-full w-full rounded-lg shadow-md"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {stores.map((store, index) => (
            <Marker key={index} position={store.position} icon={customIcon}>
              <Popup>
                {store.name} <br /> {store.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </footer>
  );
}
