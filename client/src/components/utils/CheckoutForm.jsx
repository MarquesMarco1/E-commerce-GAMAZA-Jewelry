import React, { useCallback } from "react";
import localhost from '../../config';

import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

export default function CheckoutForm (props) {
    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        const res = await fetch(`${localhost}/api/checkout`, {
            method: "POST",
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