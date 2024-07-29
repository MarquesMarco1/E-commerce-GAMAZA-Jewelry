import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../config";

export default function Cart() {
    const [profil, setProfil] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { t } = useTranslation();
    let navigate = useNavigate();

    const fetchData = async (email) => {
        const response = await fetch(`${localhost}/api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        if (response.status === 200) {
            const data = await response.json();
            setProfil(data.user);
        }
    };

    
    useEffect(() => {
        const fetchIsLog = async () => {
            const email = localStorage.getItem("user");
            if (email) {
                fetchData(email);
            } else {
                navigate("/authentication", { replace: true });
            }
        };
        fetchIsLog();
        
    }, []);
    
    useEffect(() => {
        
        if(profil[0]) {
            const getCartItems = async (id) => {
                const response = await fetch(`${localhost}/api/cart/${id}`)
                
                if (response.status === 200) {
                    const data = await response.json();
                    setCartItems(data);
                }
            };
            getCartItems(profil[0].id);
        }
    }, [profil])
    console.log(cartItems)

    return (
        <>
        </>
    )
}