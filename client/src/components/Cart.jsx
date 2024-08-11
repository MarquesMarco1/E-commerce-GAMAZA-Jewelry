import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Delete from "../assets/delete.svg";
import Save4later from "../assets/save4later.svg";
import { useCart } from "../CartContext";
import localhost from "../config";

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
    cart.map((item) => (nbr += item.itemQty));
    setNbrArticle(nbr);
  };

  const SetSubTotal = () => {
    let total = 0;
    cart.map(
      (item) =>
      (total +=
        item.product.price * item.itemQty -
        (
          item.product.price *
          item.itemQty *
          ((item.product.promotion.id != 1
            ? item.product.promotion.pourcentage
            : 0) /
            100)
        ).toFixed())
    );
    setSubTotal(total);
  };

  useEffect(() => {
    SetNbrArticle();
    SetSubTotal();
  }, [cart]);

  const handleQtyChange = (item) => {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  };

  const deleteProduct = async (item) => {
    const response = await fetch(`${localhost}/api/cartItem/${item.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // const data = await response.json();
      dispatch({ type: "REMOVE_ITEM", payload: item });
    }
  };

  const checkout = () => {
    navigate("/checkout", { replace: true });
  };

  const saveForLater = async (elem) => {
    const formData = {
      user: parseInt(elem.cart.user.id),
      product: parseInt(elem.product.id),
      quantity: parseInt(elem.itemQty),
      size: elem.size,
    };

    const response = await fetch(`${localhost}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.sucess) {
        dispatch({ type: "REMOVE_ITEM", payload: elem });
      }
    }
  };

  const product_list = () => {
    return (
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5">
          {cart.map((elem, index) => (
            <div key={index} className="ml-4 lg:ml-8 mb-8">
              <div className="flex flex-col lg:flex-row m-4 lg:m-8">
                <div className="flex">
                  <img
                    className="w-1/2 lg:w-1/3 h-auto border border-grey"
                    src={`${elem.product.images[0]}`}
                    alt={elem.product.name}
                  />
                  <div className="flex flex-col ml-4">
                    <h2 className="font-primary text-2xl lg:text-3xl text-gold">
                      {elem.product.name}
                    </h2>
                    <span className="font-primary flex text-xl lg:text-2xl p-2">
                      Size:&nbsp;<h2>{elem.size}</h2>
                    </span>
                    <span className="font-primary flex text-xl lg:text-2xl p-2">
                      Material:&nbsp;<h2>{elem.product.material.name}</h2>
                    </span>
                    {elem.product.stone && (
                    <span className="font-primary flex text-xl lg:text-2xl p-2">
                        Stone:&nbsp;
                        <h2>{elem.product.stone.name}</h2>
                      </span>
                    )}
                    {elem.product.promotion.id != 1 && (
                    <span className="font-primary flex text-xl lg:text-2xl p-2">
                        Price:&nbsp;
                        <h2 className="line-through">
                          ${elem.product.price * elem.itemQty}&nbsp;
                        </h2>
                        <h2>
                          $
                          {elem.product.price * elem.itemQty -
                            (
                              elem.product.price *
                              elem.itemQty *
                              ((elem.product.promotion.id != 1
                                ? elem.product.promotion.pourcentage
                                : 0) /
                                100)
                            ).toFixed()}
                        </h2>
                      </span>
                    )}
                    {elem.product.promotion.id == 1 && (
                    <span className="font-primary flex text-xl lg:text-2xl p-2">
                        Price:&nbsp;
                        <h2>{elem.product.price * elem.itemQty}€</h2>
                      </span>
                    )}
                    <span className="font-primary flex text-xl lg:text-2xl p-2">
                    Quantity:&nbsp;
                      <input
                        className="border border-grey"
                        type="number"
                        min={0}
                        max={elem.product.stockQty}
                        defaultValue={elem.itemQty}
                        onChange={(e) =>
                          handleQtyChange({
                            ...elem,
                            itemQty: Number(e.target.value),
                          })
                        }
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-around text-xl lg:text-2xl p-2 mt-6">
                    <div>
                      <button
                        className="flex font-primary"
                        onClick={() => deleteProduct(elem)}
                      >
                        <img className="mr-4" src={Delete} alt="" />
                        Delete
                      </button>
                    </div>
                    <div>
                      <button
                        className="flex font-primary"
                        onClick={() => saveForLater(elem)}
                      >
                        <img className="mr-4" src={Save4later} alt="" />
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-2/5 mr-4 lg:mr-8 flex flex-col justify-start">
          <div className="bg-grey m-4 rounded-2xl p-4">
            <h1 className="font-primary text-2xl lg:text-3xl text-center m-2">Order</h1>
            <div className="flex justify-between my-4">
              <h3 className="font-primary text-lg lg:text-xl text-center m-2">
                Promo Code&nbsp;
              </h3>
              <button className="font-primary text-lg lg:text-xl text-center m-2 underline">
                Ajouter
              </button>
            </div>
            <div className="border border-black my-4" />
            <div className="flex justify-between">
              <h3 className="font-primary text-lg lg:text-xl text-center m-2">
                Subtotal&nbsp;
              </h3>
              <h3 className="font-primary text-lg lg:text-xl text-center m-2">
                {subTotal}€
              </h3>
            </div>
            <div className="rounded-3xl bg-gold m-6 flex justify-center">
              <button
                className="font-primary text-2xl lg:text-3xl font-bold text-center m-2"
                onClick={() => checkout()}
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // console.log(cart);

  return (
    <>
      <Header />
      <div className="mb-24">
        <div className="m-8 lg:m-16">
          {nbrArticle >= 0 && nbrArticle !== 1 && (
            <h1 className="font-primary text-2xl lg:text-3xl text-gold mr-4">
              {`My Cart (` + nbrArticle + ` articles)`}
            </h1>
          )}
          {nbrArticle === 1 && (
            <h1 className="font-primary text-2xl lg:text-3xl text-gold mr-4">
              {`My Cart (` + nbrArticle + ` article)`}
            </h1>
          )}
          <div className="border border-grey w-full lg:w-2/4 mt-4" />
        </div>
        <div>{product_list()}</div>
      </div>
      <Footer />
    </>
  );
}