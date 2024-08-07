import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
    onClose();
  };

  const handleCartRedirect = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Veuillez vous connecter</h2>
        <p className="mt-2">Vous devez être connecté pour passer une commande.</p>
        <div className="mt-4 flex justify-around">
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Se connecter
          </button>
          <button
            onClick={handleCartRedirect}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Retourner au panier
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-red-500 underline"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;
