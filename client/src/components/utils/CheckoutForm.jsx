import React, { useCallback, useState } from "react";
import localhost from '../../config';
import { useCart } from "../../CartContext";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

export default function CheckoutForm(props) {
    const { state: cart, dispatch } = useCart([]);
    const [stripeData, setStripeData] = useState([])
    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        cart.map((item)=>{
            // const formData = {
            //     price: item.produ
            // }
            console.log(item)
        })
        const res = await fetch(`${localhost}/api/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ formData }),
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={props.stripe}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}