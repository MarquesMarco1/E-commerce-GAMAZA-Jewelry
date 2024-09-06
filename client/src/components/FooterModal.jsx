import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarker from "../leaf-red.png";
import lotus from "../assets/lotus.svg";
import { FaCreditCard, FaPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";

const FooterModal = ({ isOpen, onClose, content, stores }) => {
    const [activeTab, setActiveTab] = useState(content);

    useEffect(() => {
        if (content) {
            setActiveTab(content);
        }
    }, [content]);

    if (!isOpen) return null;

    const customIcon = new L.Icon({
        iconUrl: customMarker,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg border border-gray-300 w-11/12 md:w-3/4 lg:w-1/2 flex shadow-lg relative overflow-hidden">
                <button
                    className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-gray-900 focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="flex w-full">
                    {/* Sidebar des onglets dans le modal */}
                    <div className="w-1/3 bg-gray-100 border-r border-gray-300">
                        <ul className="p-4">
                            {[
                                { name: "contact", label: "Contactez-nous" },
                                { name: "retours", label: "Retours" },
                                { name: "suivi", label: "Suivi de commande" },
                                { name: "mentions", label: "Mentions Légales" },
                                { name: "confidentialite", label: "Politique de Confidentialité" },
                                { name: "protection", label: "Protection des Données" },
                                { name: "conditions", label: "Conditions Générales de Vente" },
                                { name: "map", label: "Trouver une Boutique" },
                                { name: "histoire", label: "Notre Histoire" },
                                { name: "paiement", label: "Modes de Paiement" },
                                { name: "livraison", label: "Modes de Livraison" },
                            ].map((tab) => (
                                <li
                                    key={tab.name}
                                    className={`cursor-pointer p-3 rounded-lg transition-colors duration-300 ${
                                        activeTab === tab.name
                                            ? "bg-gray-300 border-l-4 border-blue-500 font-semibold text-gray-900"
                                            : "border-b border-gray-200 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                    }`}
                                    onClick={() => setActiveTab(tab.name)}
                                >
                                    {tab.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Modal */}
                    <div className="w-2/3 p-6 bg-white space-y-6">
                        {/* Section Modes de Paiement */}
                        {activeTab === "paiement" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Modes de Paiement
                                </h2>
                                <div className="flex space-x-4 items-center">
                                    <FaCreditCard size={48} color="#2d3748" /> 
                                    <FaCcVisa size={48} color="#1a1f71" /> 
                                    <FaCcMastercard size={48} color="#ff5f00" /> 
                                    <FaPaypal size={48} color="#0070ba" /> 
                                </div>
                            </div>
                        )}

                        {/* Section Trouver une Boutique */}
                        {activeTab === "map" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Trouver une Boutique
                                </h2>
                                <div className="w-full h-64 mb-4">
                                    <MapContainer
                                        center={[48.8566, 2.3522]}
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
                                            <Marker
                                                key={index}
                                                position={store.position}
                                                icon={customIcon}
                                            >
                                                <Popup>
                                                    {store.name} <br /> {store.address}
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                </div>

                                {/* Section Listing de nos Boutiques */}
                                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                                    Nos Boutiques
                                </h3>
                                <ul className="space-y-2">
                                    {stores.map((store, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-600 border-b border-gray-200 pb-2"
                                        >
                                            <strong>{store.name}</strong>
                                            <br />
                                            {store.address}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Modes de Livraison */}
                        {activeTab === "livraison" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Modes de Livraison
                                </h2>
                                <div className="space-y-4">
                                    <ul className="list-disc pl-5">
                                        <li className="mb-4">
                                            <strong>Livraison Standard:</strong> Livraison en 5 à 7 jours ouvrés. Frais de livraison : 5€.
                                        </li>
                                        <li className="mb-4">
                                            <strong>Livraison Express:</strong> Livraison en 2 à 3 jours ouvrés. Frais de livraison : 15€.
                                        </li>
                                        <li>
                                            <strong>Click & Collect:</strong> Commandez en ligne et récupérez vos articles dans notre boutique physique.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Notre Histoire */}
                        {activeTab === "histoire" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Notre Histoire
                                </h2>
                                <p className="text-gray-600">
                                    Web@cademie by Epitech projet e-commerce GAMAZA -> Guillaume, Aymeric, Marco, Alice, Zoé, Ambroise.
                                </p>
                                <p className="text-gray-600 mt-4">
                                    Nous avons créé notre boutique de bijoux en ligne afin de sublimer les femmes avec des bijoux raffinés et de qualité.
                                </p>
                            </div>
                        )}

                        {/* Section Contacter */}
                        {activeTab === "contact" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Nous contacter
                                </h2>
                                <p className="text-gray-600">
                                    Téléphone : +33 1 23 45 67 89 <br />
                                    Email : contact@gamaza.com <br />
                                    Adresse : 74 avenue GAMAZA, Paris
                                </p>
                                <img src={lotus} alt="Lotus Icon" className="w-80 h-80 mt-8 mx-auto" />
                            </div>
                        )}

                        {/* Politique de Retours */}
                        {activeTab === "retours" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Politique de Retours
                                </h2>
                                <p className="text-gray-600">
                                    Vous pouvez retourner vos produits dans un délai de 30 jours après réception. Assurez-vous que les produits soient dans leur état d'origine.
                                </p>
                            </div>
                        )}

                        {/* Suivi de Commande */}
                        {activeTab === "suivi" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Suivi de Commande
                                </h2>
                                <p className="text-gray-600">
                                    Utilisez notre outil en ligne pour suivre l'état de votre commande. Vous aurez besoin de votre numéro de commande pour accéder aux informations.
                                </p>
                            </div>
                        )}

                        {/* Mentions Légales */}
                        {activeTab === "mentions" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Mentions Légales
                                </h2>
                                <p className="text-gray-600">
                                    Voici les mentions légales concernant notre boutique en ligne.
                                </p>
                            </div>
                        )}

                        {/* Politique de Confidentialité */}
                        {activeTab === "confidentialite" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Politique de Confidentialité
                                </h2>
                                <p className="text-gray-600">
                                    Découvrez comment nous protégeons vos informations personnelles.
                                </p>
                            </div>
                        )}

                        {/* Protection des Données */}
                        {activeTab === "protection" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Protection des Données
                                </h2>
                                <p className="text-gray-600">
                                    Nous nous engageons à protéger vos données personnelles conformément à la législation en vigueur.
                                </p>
                            </div>
                        )}

                        {/* Conditions Générales de Vente */}
                        {activeTab === "conditions" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    Conditions Générales de Vente
                                </h2>
                                <p className="text-gray-600">
                                    Découvrez les conditions générales régissant vos achats sur notre site.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterModal;
