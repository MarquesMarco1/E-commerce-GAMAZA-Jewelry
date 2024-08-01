import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../config";
import Header from './Header';
import Footer from './Footer';
import Delete from '../assets/delete.svg'
import Save4later from '../assets/save4later.svg'
import { useCart } from '../CartContext';
import CheckoutForm from "./utils/CheckoutForm";

export default function Cart() {
    const { t } = useTranslation();
    let navigate = useNavigate();
    const [nbrArticle, setNbrArticle] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const { state: cart, dispatch } = useCart([]);

    useEffect(() => {
        const fetchIsLog = async () => {
            const email = localStorage.getItem("user");
            if (!email) {
                navigate("/authentication", { replace: true });
            }
        };
        fetchIsLog();
    }, []);

    const SetNbrArticle = () => {
        let nbr = 0;
        cart.map((item) => nbr += item.itemQty)
        setNbrArticle(nbr)
    }

    const SetSubTotal = () => {
        let total = 0;
        cart.map((item) => total += (item.product.price * item.itemQty) - ((item.product.price * item.itemQty) * ((item.product.promotion.id != 1 ? item.product.promotion.pourcentage : 0) / 100)).toFixed())
        setSubTotal(total)
    }

    useEffect(() => {
        SetNbrArticle();
        SetSubTotal();
    }, [cart])

    const handleQtyChange = (item) => {
        dispatch({ type: 'UPDATE_ITEM', payload: item })
    };

    const deleteProduct = async (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item })
    };

    const checkout = () => {
        navigate("/checkout", { replace: true });
    }

    const product_list = () => {
        return (
            <div className="flex">
                <div>
                    {cart.map((elem, index) => (
                        <div key={index} className="ml-8">
                            <div className="flex flex-col m-8">
                                <div className="flex">
                                    <img className="w-1/3 h-1/3 border border-grey" src={`${elem.product.images[0]}`} alt={elem.product.name} />
                                    <div className="flex flex-col ml-4">
                                        <h2 className="font-primary text-3xl text-gold">{elem.product.name}</h2>
                                        <span className="font-primary flex text-2xl p-2">Size:&nbsp;<h2>{elem.size}</h2></span>
                                        <span className="font-primary flex text-2xl p-2">Material:&nbsp;<h2>{elem.product.material.name}</h2></span>
                                        <span className="font-primary flex text-2xl p-2">Stone:&nbsp;<h2>{elem.product.stone.name}</h2></span>
                                        {elem.product.promotion.id != 1 && <span className="font-primary flex text-2xl p-2">Price:&nbsp;<h2 className="line-through">${(elem.product.price * elem.itemQty)}&nbsp;</h2><h2>${(elem.product.price * elem.itemQty) - ((elem.product.price * elem.itemQty) * ((elem.product.promotion.id != 1 ? elem.product.promotion.pourcentage : 0) / 100)).toFixed()}</h2></span>}
                                        {elem.product.promotion.id == 1 && <span className="font-primary flex text-2xl p-2">Price:&nbsp;<h2>${(elem.product.price * elem.itemQty)}</h2></span>}
                                        <span className="flex text-2xl p-2 font-primary">Quantity:&nbsp;<input
                                            className="border border-grey"
                                            type="number"
                                            min={0}
                                            max={elem.product.stockQty}
                                            defaultValue={elem.itemQty}
                                            onChange={(e) => handleQtyChange({ ...elem, itemQty: Number(e.target.value) })}
                                        /></span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-around text-2xl p-2 mt-6">
                                        <div>
                                            <button className="flex font-primary" onClick={() => deleteProduct(elem)}><img className="mr-4" src={Delete} alt="" />Delete</button>
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
                            <h3 className="font-primary text-xl text-center m-2">{subTotal}</h3>
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
                            <button className="font-primary text-3xl font-bold text-center m-2" onClick={() => checkout()}>ORDER NOW</button>
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
