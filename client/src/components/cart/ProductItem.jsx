import React from 'react';
import Delete from '../../assets/delete.svg';
import Save4later from '../../assets/save4later.svg';

export default function ProductItem({ item, onDelete, onSaveForLater, onQtyChange }) {
    return (
        <div className="flex flex-col m-8">
            <div className="flex">
                <img
                    className="w-1/3 h-1/3 border-8 border-grey"
                    src={`${item.product.images[0]}`}
                    alt={item.product.name}
                />
                <div className="flex flex-col ml-4">
                    <h2 className="font-primary font-bold text-3xl dark:text-white">
                        {item.product.name}
                    </h2>
                    <span className="font-primary font-medium flex text-2xl p-2 dark:text-white">
                        Price:&nbsp;
                        {item.product.promotion.id !== 1 ? (
                            <>
                                <h2 className="line-through">
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
                    <span className="font-primary font-medium flex text-2xl p-2 dark:text-white">
                        Size:&nbsp;<h2>{item.size}</h2>
                    </span>
                    <span className="font-primary font-medium flex text-2xl p-2 dark:text-white">
                        Material:&nbsp;<h2>{item.product.material.name}</h2>
                    </span>
                    {item.product.stone && (
                        <span className="font-primary font-medium flex text-2xl p-2 dark:text-white">
                            Stone:&nbsp;<h2>{item.product.stone.name}</h2>
                        </span>
                    )}
                    <span className="flex text-2xl p-2 font-primary font-semibold dark:text-white">
                        Quantity:&nbsp;
                        <input
                            className="border border-grey rounded-md dark:border-gold text-black dark:text-gold"
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
                        <button className="flex font-primary font-medium dark:text-white" onClick={() => onDelete(item)}>
                            <img className="mr-4" src={Delete} alt="" />
                            Delete
                        </button>
                    </div>
                    {localStorage.getItem('user') && (
                        <div>
                            <button className="flex font-primary font-medium dark:text-white" onClick={() => onSaveForLater(item)}>
                                <img className="mr-4" src={Save4later} alt="" />
                                Save for later
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}