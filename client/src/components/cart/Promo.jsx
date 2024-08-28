import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function PromoCodeInput({ onApply }) {
    const [inputPromo, setInputPromo] = useState(false);
    const [tryCode, setTryCode] = useState('');
    const { t } = useTranslation();

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            onApply(tryCode);
        }
    };

    return (
        <div className="flex justify-between my-4">
            <h3 className="font-primary text-xl text-center m-2">
                {t("cartPage.isPromoCode")}&nbsp;
            </h3>
            <button
                className="font-primary text-xl text-center m-2 underline"
                onClick={() => setInputPromo(true)}
            >
                {t("cartPage.addPromo")}
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