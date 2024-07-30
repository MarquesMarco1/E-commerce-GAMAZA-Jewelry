import React, { createContext, useState } from 'react';
import localhost from "../config";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = async (product, quantity, selectedSize, selectedColor) => {
        const cartItem = { productId: product.id, quantity, selectedSize, selectedColor };
        
    try {
        const response = await fetch(`${localhost}/api/cart`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem),
        });

        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }

        const updatedCart = await response.json();
        setCart(updatedCart);
        } catch (error) {
        console.error('Error adding item to cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
        {children}
        </CartContext.Provider>
    );
};
