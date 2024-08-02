import React, { useCallback, useEffect, useState } from "react";
import localhost from '../../config';
import { useCart } from "../../CartContext";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

export default function CheckoutForm(props) {
    const { state: cart, dispatch } = useCart([]);
    const [stripeData, setStripeData] = useState([]);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const newStripeData = cart.map((item) => {
            return {
                price: item.product.keyStripe,
                quantity: item.itemQty
            };
        });
        setStripeData(newStripeData);
    }, [cart]);

    const fetchClientSecret = useCallback(async () => {
        if (stripeData.length === 0) return;

            const res = await fetch(`${localhost}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stripeData),
            });

            const data = await res.json();
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            }
    }, [stripeData]);

    useEffect(() => {
        fetchClientSecret();
    }, [stripeData, fetchClientSecret]);

    const options = { clientSecret };

    return (
        <div id="checkout">
            {clientSecret && <EmbeddedCheckoutProvider
                stripe={props.stripe}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>}
        </div>
    );
}
