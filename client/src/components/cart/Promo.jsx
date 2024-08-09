import React, { useState } from 'react';

export default function PromoCodeInput({ onApply }) {
    const [inputPromo, setInputPromo] = useState(false);
    const [tryCode, setTryCode] = useState('');

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            onApply(tryCode);
        }
    };

    return (
        <div className="flex justify-between my-4">
            <h3 className="font-primary text-xl text-center m-2">
                Promo Code&nbsp;
            </h3>
            <button
                className="font-primary text-xl text-center m-2 underline"
                onClick={() => setInputPromo(true)}
            >
                Add
            </button>
            {inputPromo && (
                <input
                    type="text"
                    className='bg-grey'
                    onChange={(e) => setTryCode(e.target.value)}
                    onKeyDown={handleSearch}
                />
            )}
        </div>
    );
}