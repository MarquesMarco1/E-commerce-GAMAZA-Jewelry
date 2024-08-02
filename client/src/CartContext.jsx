import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.find(item => item.id === action.payload.id);
            
            if(existingItem) {
                return state.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item)
            } else {
                return [...state, action.payload];
            }
        case 'REMOVE_ITEM':

            return state.filter(item => item.id !== action.payload.id);

        case 'UPDATE_ITEM':

            return state.map(item =>
                item.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        case 'RESET_CART':

            return action.payload;

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, [], () => {
        let localData = localStorage.getItem('cart');
        if (!localData) {
            localStorage.setItem('cart', JSON.stringify([]));
            return [];
        }
        return JSON.parse(localData);
    });
    

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);    

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};