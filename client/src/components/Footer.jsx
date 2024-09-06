import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FooterModal from "./FooterModal";

export default function Footer() {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const stores = [
    { position: [48.8566, 2.3522], name: "Magasin GAMAZA Paris", address: "74 avenue GAMAZA, Paris" },
    { position: [43.6047, 1.4442], name: "Magasin GAMAZA Toulouse", address: "20 rue GAMAZA, Toulouse" },
    { position: [45.764, 4.8357], name: "Magasin GAMAZA Lyon", address: "15 place GAMAZA, Lyon" },
    { position: [50.6292, 3.0573], name: "Magasin GAMAZA Lille", address: "10 boulevard GAMAZA, Lille" },
    { position: [43.7102, 7.262], name: "Magasin GAMAZA Nice", address: "5 avenue GAMAZA, Nice" },
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
      <footer className="bg-purple bg-opacity-20 p-8 border-t border-gray-300">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between">
            {/* Logo & Informations */}
            <div className="flex-1 mb-6 md:mb-0 md:w-1/4">
              <h2 className="text-gold text-4xl font-primary mb-4">{t("footer.title")}</h2>
              <p className="text-gold mb-4 font-primary">{t("footer.adress")}</p>
              <p className="text-gold mb-4 font-primary">Email : gamaza@gamaza.com</p>
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" className="text-white hover:text-gray-400">
                  <FaFacebook size={24} color="#BF9553" />
                </a>
                <a href="https://twitter.com" className="text-white hover:text-gray-400">
                  <FaTwitter size={24} color="#BF9553" />
                </a>
                <a href="https://instagram.com" className="text-white hover:text-gray-400">
                  <FaInstagram size={24} color="#BF9553" />
                </a>
              </div>
            </div>

            {/* Menu Burger Button */}
            <div className="md:hidden flex items-center mb-6">
              <button
                className="text-gold text-2xl"
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>

            {/* Menu Content */}
            <div className={`flex-1 md:w-3/4 ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-between`}>
              <div className="flex space-x-8">
                {/* Service Client */}
                <div>
                  <h3 className="text-gold text-2xl font-primary mb-4">Service Client</h3>
                  <ul className="text-greyy">
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "contact")} className="hover:underline">Contactez-nous</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "retours")} className="hover:underline">Retours et remboursement</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "suivi")} className="hover:underline">Suivi de commande</a></li>
                  </ul>
                </div>

                {/* Politiques Légales */}
                <div>
                  <h3 className="text-gold text-2xl font-primary mb-4">Politiques Légales</h3>
                  <ul className="text-greyy">
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "mentions")} className="hover:underline">Mentions Légales</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "confidentialite")} className="hover:underline">Politique de Confidentialité</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "protection")} className="hover:underline">Protection des Données</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "conditions")} className="hover:underline">Conditions Générales de Vente</a></li>
                  </ul>
                </div>

                {/* À Propos */}
                <div>
                  <h3 className="text-gold text-2xl font-primary mb-4">À Propos</h3>
                  <ul className="text-greyy">
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "map")} className="hover:underline">Trouver une Boutique</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "histoire")} className="hover:underline">Notre Histoire</a></li>
                  </ul>
                </div>

                {/* Modes de Paiements */}
                <div>
                  <h3 className="text-gold text-2xl font-primary mb-4">Modes de Paiement</h3>
                  <ul className="text-greyy">
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "paiement")} className="hover:underline">Cartes de Crédit</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "paiement")} className="hover:underline">PayPal</a></li>
                  </ul>
                </div>

                {/* Modes de Livraisons */}
                <div>
                  <h3 className="text-gold text-2xl font-primary mb-4">Modes de Livraison</h3>
                  <ul className="text-greyy">
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "livraison")} className="hover:underline">Livraison Standard</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "livraison")} className="hover:underline">Livraison Express</a></li>
                    <li><a href="#" onClick={(e) => handleModalOpen(e, "livraison")} className="hover:underline">Click & Collect</a></li>
                  </ul>
                </div>
              </div>
            </div>
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
