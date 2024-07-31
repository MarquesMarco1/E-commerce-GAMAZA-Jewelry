import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../config";
import Header from './Header';
import Footer from './Footer';
import Delete from '../assets/delete.svg'
import Save4later from '../assets/save4later.svg'
import { useCart } from '../CartContext';

export default function Cart() {
    const [profil, setProfil] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { t } = useTranslation();
    let navigate = useNavigate();
    const [nbrArticle, setNbrArticle] = useState(0);
    const [itemQty, setItemQty] = useState({});
    const {state: cart, dispatch} = useCart();

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
                    data.map(item => {
                        dispatch({type: 'ADD_ITEM', payload: item})
                    })
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
            let nbr = 0
            cartItems.map((elem) => {
                nbr += elem.itemQty
            })
            setNbrArticle(nbr);
        }
    }, [cartItems]);

    const handleQtyChange = (id, value) => {
        if (itemQty[id] < value)
            setNbrArticle(nbrArticle + 1)
        else
            setNbrArticle(nbrArticle - 1)

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
        return (
            <div className="flex">
                <div>
                    {cartItems.map((elem, index) => (
                        <div key={index} className="ml-8">
                            <div className="flex flex-col m-8">
                                <div className="flex">
                                    <img className="w-1/3 h-1/3 border border-grey" src={`${elem.product.images[0]}`} alt={elem.product.name} />
                                    <div className="flex flex-col ml-4">
                                        <h2 className="font-primary text-3xl text-gold">{elem.product.name}</h2>
                                        <span className="font-primary flex text-2xl p-2">Size:&nbsp;<h2>{elem.size}</h2></span>
                                        <span className="font-primary flex text-2xl p-2">Material:&nbsp;<h2>{elem.product.material.name}</h2></span>
                                        <span className="font-primary flex text-2xl p-2">Stone:&nbsp;<h2>{elem.product.stone.name}</h2></span>
                                        {elem.product.promotion.id != 1 && <span className="font-primary flex text-2xl p-2">Price:&nbsp;<h2 className="line-through">${(elem.product.price * (itemQty[elem.id] !== undefined ? itemQty[elem.id] : elem.itemQty))}&nbsp;</h2><h2>${(elem.product.price * (itemQty[elem.id] !== undefined ? itemQty[elem.id] : elem.itemQty)) - (elem.product.price * (itemQty[elem.id] !== undefined ? itemQty[elem.id] : elem.itemQty) * ((elem.product.promotion.id != 1 ? elem.product.promotion.pourcentage : 0) / 100)).toFixed()}</h2></span>}
                                        {elem.product.promotion.id == 1 && <span className="font-primary flex text-2xl p-2">Price:&nbsp;<h2>${(elem.product.price * (itemQty[elem.id] !== undefined ? itemQty[elem.id] : elem.itemQty)) - (elem.product.price * (itemQty[elem.id] !== undefined ? itemQty[elem.id] : elem.itemQty) * ((elem.product.promotion.id != 1 ? elem.product.promotion.pourcentage : 0) / 100)).toFixed()}</h2></span>}
                                        <span className="flex text-2xl p-2 font-primary">Quantity:&nbsp;<input
                                            className="border border-grey"
                                            type="number"
                                            min={0}
                                            max={elem.product.stockQty}
                                            defaultValue={elem.itemQty}
                                            onChange={(e) => handleQtyChange(elem.id, e.target.value)}
                                        /></span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-around text-2xl p-2 mt-6">
                                        <div>
                                            <button className="flex font-primary" onClick={() => deleteProduct(elem.id)}><img className="mr-4" src={Delete} alt="" />Delete</button>
                                        </div>
                                        <div>
                                            <button className="flex font-primary" ><img className="mr-4" src={Save4later} alt="" />Save for later</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-2/5  mr-8 flex flex-col justify-start">
                    <div className="bg-grey m-4 rounded-2xl p-4">
                        <h1 className="font-primary text-3xl text-center m-2">Order</h1>
                        <div className="flex justify-between my-4">
                            <h3 className="font-primary text-xl text-center m-2">Promo Code&nbsp;</h3>
                            <button className="font-primary text-xl text-center m-2 underline">Ajouter</button>
                        </div>
                        <div className="border border-black my-4" />
                        <div className="flex justify-between">
                            <h3 className="font-primary text-xl text-center m-2">Subtotal&nbsp;</h3>
                            <h3 className="font-primary text-xl text-center m-2">1000 $</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-primary text-xl text-center m-2">Shipping&nbsp;</h3>
                            <h3 className="font-primary text-xl text-center m-2">3 $</h3>
                        </div>
                        <div className="border border-black my-4" />
                        <div className="flex justify-between">
                            <h3 className="font-primary text-2xl text-center m-2">Total&nbsp;</h3>
                            <h3 className="font-primary text-2xl text-center m-2">1003 $</h3>
                        </div>
                        <div className="rounded-3xl bg-gold m-6 flex justify-center">
                            <button className="font-primary text-3xl font-bold text-center m-2">ORDER NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    console.log(cart)

    return (
        <>
            <Header />
            <div className="mb-24">
                <div className="m-16">
                    {nbrArticle >= 0 && nbrArticle !== 1 && <h1 className="font-primary text-3xl text-gold mr-4">{`My Cart (` + nbrArticle + ` articles)`}</h1>}
                    {nbrArticle === 1 && <h1 className="font-primary text-3xl text-gold mr-4">{`My Cart (` + nbrArticle + ` article)`}</h1>}
                    <div className="border border-grey w-2/4 mt-4" />
                </div>
                <div>
                    {product_list()}
                </div>
            </div>
            <Footer />
        </>
    );
}
