import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/profile');
    onClose();
  };

  const handleCartRedirect = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <div className="bg-grey p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-500 hover:bg-blue-600 text-black font-medium py-2 rounded-lg transition duration-200"
          >
            Se connecter
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleCartRedirect}
            className="bg-green-500 hover:bg-green-600 text-black font-medium py-2 rounded-lg transition duration-200"
          >
            Continuer la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
