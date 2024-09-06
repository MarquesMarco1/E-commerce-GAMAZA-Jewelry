import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FooterModal from "./FooterModal";

export default function Footer() {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

  const handleModalOpen = (e, content) => {
    e.preventDefault();
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalContent("");
  };

  return (
    <>
      <footer className="flex flex-col md:flex-row items-start justify-between bg-purple bg-opacity-20 h-auto mt-10 w-full p-8 border-t border-gray-300">
        <div className="flex flex-col flex-1 p-4 text-left">
          <h2 className="text-gold text-4xl font-primary mb-4">
            {t("footer.title")}
          </h2>
          <p className="text-gold mb-4 font-primary">
            {t("footer.adress")}
          </p>
          <p className="text-gold mb-4 font-primary">
            Email : gamaza@gamaza.com
          </p>
          <div className="flex space-x-4 mb-6">
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
              <FaTwitter size={24} color="#BF9553"/>
            </a>
            <a
              href="https://instagram.com"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} color="#BF9553" />
            </a>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row justify-between md:pl-8">
          {/* Section Service Client */}
          <div className="flex flex-col mb-6 md:mb-0 p-4">
            <h3 className="text-gold text-2xl font-primary mb-2">Service Client</h3>
            <ul className="text-greyy">
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "contact")} className="hover:underline">
                  Contactez-nous
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "retours")} className="hover:underline">
                  Retours et remboursement
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "suivi")} className="hover:underline">
                  Suivi de commande
                </a>
              </li>
            </ul>
          </div>

          {/* Section Politiques Légales */}
          <div className="flex flex-col mb-6 md:mb-0 p-4">
            <h3 className="text-gold text-2xl font-primary mb-2">Politiques Légales</h3>
            <ul className="text-greyy">
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "mentions")} className="hover:underline">
                  Mentions Légales
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "confidentialite")} className="hover:underline">
                  Politique de Confidentialité
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "protection")} className="hover:underline">
                  Protection des Données
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "conditions")} className="hover:underline">
                  Conditions Générales de Vente
                </a>
              </li>
            </ul>
          </div>

          {/* Section À Propos */}
          <div className="flex flex-col mb-6 md:mb-0 p-4">
            <h3 className="text-gold text-2xl font-primary mb-2">À Propos</h3>
            <ul className="text-greyy">
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "map")} className="hover:underline">
                  Trouver une Boutique
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "histoire")} className="hover:underline">
                  Notre Histoire
                </a>
              </li>
            </ul>
          </div>

          {/* Section Modes de Paiements */}
          <div className="flex flex-col mb-6 md:mb-0 p-4">
            <h3 className="text-gold text-2xl font-primary mb-2">Modes de Paiement</h3>
            <ul className="text-greyy">
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "paiement")} className="hover:underline">
                  Cartes de Crédit
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "paiement")} className="hover:underline">
                  PayPal
                </a>
              </li>
            </ul>
          </div>
          {/* Section Livraisons */}
          <div className="flex flex-col mb-6 md:mb-0 p-4">
            <h3 className="text-gold text-2xl font-primary mb-2">Modes de Livraison</h3>
            <ul className="text-greyy">
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "livraison")} className="hover:underline">
                  Livraison Standard
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "livraison")} className="hover:underline">
                  Livraison Express
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleModalOpen(e, "livraison")} className="hover:underline">
                  Click & Collect
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Composant FooterModal */}
      <FooterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        content={modalContent}
        stores={stores}
      />
    </>
  );
}
