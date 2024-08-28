import React from 'react';
import Delete from '../../assets/delete.svg';
import Save4later from '../../assets/save4later.svg';
import { useTranslation } from "react-i18next";

export default function ProductItem({ item, onDelete, onSaveForLater, onQtyChange }) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col m-8">
            <div className="flex">
                <img
                    className="w-1/3 h-1/3 border border-grey"
                    src={`${item.product.images[0]}`}
                    alt={item.product.name}
                />
                <div className="flex flex-col ml-4">
                    <h2 className="font-primary text-3xl text-gold">
                        {item.product.name}
                    </h2>
                    <span className="font-primary flex text-2xl text-gold p-2">
                        {t("cartPage.productSize")}:&nbsp;<h2>{item.size}</h2>
                    </span>
                    <span className="font-primary flex text-2xl text-gold p-2">
                        {t("cartPage.productMaterial")}:&nbsp;<h2>{item.product.material.name}</h2>
                    </span>
                    {item.product.stone && (
                        <span className="font-primary flex text-2xl text-gold p-2">
                        {t("cartPage.productStone")}:&nbsp;<h2>{item.product.stone.name}</h2>
                        </span>
                    )}
                    <span className="font-primary flex text-2xl text-gold p-2">
                    {t("cartPage.productPrice")}:&nbsp;
                        {item.product.promotion.id !== 1 ? (
                            <>
                                <h2 className="line-through text-gold font-primary">
                                    ${item.product.price * item.itemQty}&nbsp;
                                </h2>
                                <h2>
                                    $
                                    {item.product.price * item.itemQty -
                                        (
                                            item.product.price *
                                            item.itemQty *
                                            ((item.product.promotion.id !== 1
                                                ? item.product.promotion.pourcentage
                                                : 0) /
                                                100)
                                        ).toFixed()}
                                </h2>
                            </>
                        ) : (
                            <h2>{item.product.price * item.itemQty}€</h2>
                        )}
                    </span>
                    <span className="flex text-2xl p-2 font-primary text-gold">
                        {t("cartPage.productQuantity")}:&nbsp;
                        <input
                            className="mt-2 p-2 border border-gray-300 rounded-lg w-full dark:bg-dark-mode-light-purple text-gold"
                            type="number"
                            min={0}
                            max={item.product.stockQty}
                            defaultValue={item.itemQty}
                            onChange={(e) =>
                                onQtyChange({
                                    ...item,
                                    itemQty: Number(e.target.value),
                                })
                            }
                        />
                    </span>
                </div>
            </div>
            <div>
                <div className="flex justify-around text-2xl p-2 mt-6">
                    <div>
                        <button className="flex font-primary" onClick={() => onDelete(item)}>
                            <img className="mr-4" src={Delete} alt="" />
                            {t("cartPage.productDelete")}
                        </button>
                    </div>
                    {localStorage.getItem('user') && (
                        <div>
                            <button className="flex font-primary" onClick={() => onSaveForLater(item)}>
                                <img className="mr-4" src={Save4later} alt="" />
                                {t("cartPage.productSave")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}