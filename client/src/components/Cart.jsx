import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../config";
import Header from './Header';
import Footer from './Footer';
import Delete from '../assets/delete.svg'
import Save4later from '../assets/save4later.svg'

export default function Cart() {
    const [profil, setProfil] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { t } = useTranslation();
    let navigate = useNavigate();
    const [nbrArticle, setNbrArticle] = useState(0);
    const [itemQty, setItemQty] = useState({});

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
        if (profil[0]) {
            const getCartItems = async (id) => {
                const response = await fetch(`${localhost}/api/cart/${id}`);

                if (response.status === 200) {
                    const data = await response.json();
                    setCartItems(data);

                    const initialItemQty = {};
                    data.forEach(item => {
                        initialItemQty[item.id] = item.itemQty;
                    });
                    setItemQty(initialItemQty);
                }
            };
            getCartItems(profil[0].id);
        }
    }, [profil]);

    useEffect(() => {
        if (cartItems.length !== 0) {
            setNbrArticle(cartItems.length);
        }
    }, [cartItems]);

    const handleQtyChange = (id, value) => {
        setItemQty(prevQty => ({
            ...prevQty,
            [id]: Number(value)
        }));
    };

    const deleteProduct = async (id) => {
        await fetch(`${localhost}/api/cart/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setCartItems(cartItems.filter(item => item.id !== id));
        setNbrArticle(nbrArticle - 1);
    };

    const product_list = () => {
        console.log(cartItems)
        return (
            <>
                {cartItems.map((elem, index) => (
                    <div key={index} className="w-3/5">
                        <div className="flex m-8">
                            <img className="w-1/3 h-1/3 border border-grey" src={`${elem.product.images[0]}`} alt={elem.product.name} />
                            <div className="flex flex-col ml-4">
                                <h2 className="text-xl text-gold">{elem.product.name}</h2>
                                <span className="flex text-lg p-2">Size:&nbsp;<h2>{elem.product.sizes.name}</h2></span>
                                <span className="flex text-lg p-2">Material:&nbsp;<h2>{elem.product.material.name}</h2></span>
                                <span className="flex text-lg p-2">Stone:&nbsp;<h2>{elem.product.stone.name}</h2></span>
                                <span className="flex text-lg p-2">Price:&nbsp;<h2>{elem.product.price * (itemQty[elem.id] !== undefined ? itemQty[elem.id] : elem.itemQty)}</h2></span>
                                <span className="flex text-lg p-2">Quantity:&nbsp;<input
                                    className="border border-grey"
                                    type="number"
                                    min={0}
                                    max={elem.product.stockQty}
                                    defaultValue={elem.itemQty}
                                    onChange={(e) => handleQtyChange(elem.id, e.target.value)}
                                /></span>
                                <div className="flex justify-around text-lg p-2 mt-8">
                                    <div>
                                        <button className="flex" onClick={() => deleteProduct(elem.id)}><img className="mr-4" src={Delete} alt="" />Delete</button>
                                    </div>
                                    <div>
                                        
                                        <button className="flex"><img className="mr-4" src={Save4later} alt="" />Save for later</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <>
            <Header />
            <div className="mb-24">
                <div className="m-16">
                    {nbrArticle >= 0 && nbrArticle !== 1 && <h1 className="text-3xl text-gold mr-4">{`My Cart (` + nbrArticle + ` articles)`}</h1>}
                    {nbrArticle === 1 && <h1 className="text-3xl text-gold mr-4">{`My Cart (` + nbrArticle + ` article)`}</h1>}
                    <div className="border border-grey w-2/4 mt-4" />
                    <br></br>
                </div>
                <div>
                    {product_list()}
                </div>
            </div>
            <Footer />
        </>
    );
}
