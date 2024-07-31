import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({})

    if(Object.keys(cart).length === 0 && cart.constructor === Object )
        return (
        <CartContext.Provider value={{cart}}>
            {children}
        </CartContext.Provider>
    );
};
