import React, { useState } from 'react';

export default function StockAlert({ isOpen, onClose, onSubmit}) {
    const [email, setEmail] = useState("");

    if(!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(email);
        setEmail("");
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
                <h2 className='text-lg mb-4'>Notify me when back in stock</h2>
                <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded mb-4'
                />
                <div className='flex justify-end space-x-2'>
                    <button
                    onClick={onClose}
                    className='px-4 py-2 bg-grey text-black rounded'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='px-4 py-2 bg-gold text-white rounded'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}