import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Delete from "../assets/delete.svg";
import Save4later from "../assets/save4later.svg";
import { useCart } from "../CartContext";
import localhost from "../config";
import { Shippo } from "shippo";

export default function Cart() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { state: cart, dispatch } = useCart([]);

  const [nbrArticle, setNbrArticle] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const [displayWishlist, setDisplayWishlist] = useState(false);
  const [displayAdressPopup, setDisplayAdressPopup] = useState(false);

  const [inputPromo, setInputPromo] = useState(false);
  const [tryCode, setTryCode] = useState(null);
  const [reduction, setReduction] = useState(null);

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [street1, setStreet1] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [shippingCost, setShippingCost] = useState(0)
  const [addressFrom, setAddressFrom] = useState(null)
  const [addressTo, setAddressTo] = useState(null)
  const [parcels, setParcels] = useState([])
  
  const user = localStorage.getItem("user");

  const shippo = new Shippo({
    apiKeyHeader: "shippo_test_55d32d12f5ff622308a3b56d970d6727d8cd7dee",
    // the API version can be globally set, though this is normally not required
    // shippoApiVersion: "<YYYY-MM-DD>",
  });

  const createShippoAddress = async () => {
    const data = await shippo.addresses.create({
      name: "GAMAZA", //required
      company: "",
      street1: "24 rue Pasteur", //required
      city: "Paris", //required
      state: "HB", //required
      zip: "94270", //required
      country: "FR", // iso2 country code //required
      phone: "",
      email: "",
    });

    setAddressFrom(data);
  };

  const fetchIsLog = (user) => {
    if (user === null) {
      return false;
    }
    validateAdress();
    return true;
  };

  const validateAdress = async (user) => {
    if(fetchIsLog()) {

      const response = await fetch(`${localhost}/api/validateAdress/${user}`);
      const data = await response.json();

      if (data.isAdressValide) {
        if(data.isAdressValide.firstname !== undefined &&
            data.isAdressValide.email !== undefined &&
            data.isAdressValide.phone_number !== undefined && 
            data.isAdressValide.city !== undefined &&
            data.isAdressValide.adress !== undefined &&
            data.isAdressValide.region !== undefined && 
            data.isAdressValide.zip_code !== undefined &&
            data.isAdressValide.country !== undefined) 
          {
          setName(data.isAdressValide.firstname)
          setEmail(data.isAdressValide.email)
          setPhone(data.isAdressValide.phone_number)
          setCity(data.isAdressValide.city)
          setStreet1(data.isAdressValide.adress)
          setState(data.isAdressValide.region)
          setZip(data.isAdressValide.zip_code)
          setCountry(data.isAdressValide.country)
          setAddressTo(true)
          return true;
        } else {
          setName(data.isAdressValide.firstname)
          setEmail(data.isAdressValide.email)
          setPhone(data.isAdressValide.phone_number)
          setCity(data.isAdressValide.city)
          setStreet1(data.isAdressValide.adress)
          setState(data.isAdressValide.region)
          setZip(data.isAdressValide.zip_code)
          setCountry(data.isAdressValide.country)
          return false;
        }
      } else {
        return false;
      }
    } 
    }


  useEffect(() => {
    createShippoAddress();
    if (fetchIsLog()) {
      setDisplayWishlist(true);
    }
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
    if (fetchIsLog()) {
      const response = await fetch(`${localhost}/api/cartItem/${item.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "REMOVE_ITEM", payload: item });
      }
    } else {
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

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const response = await fetch(`${localhost}/api/coupon/${tryCode}`);
      if (response.ok) {
        const data = await response.json();
        setReduction(data.promo[0].rate);
      } else {
        setReduction(null);
      }
    }
  };

  const adressPopup = () => {
    return (
      <div>
        {displayAdressPopup && <div className="flex flex-col justify-center items-center">
          <h1>Delevery & Billing adress</h1>
          <label className="m-4">
            Name:
            <input className="ml-4 bg-grey" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="required" required />
          </label>
          <label className="m-4">
            Email:
            <input className="ml-4 bg-grey" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="m-4">
            Phone:
            <input className="ml-4 bg-grey" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label className="m-4">
            Company:
            <input className="ml-4 bg-grey" type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <label className="m-4">
            Country:
            <input className="ml-4 bg-grey" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="required" required />
          </label>
          <label className="m-4">
            ZIP:
            <input className="ml-4 bg-grey" type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="required" required />
          </label>
          <label className="m-4">
            State:
            <input className="ml-4 bg-grey" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="required" required />
          </label>
          <label className="m-4">
            City:
            <input className="ml-4 bg-grey" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="required" required />
          </label>
          <label className="m-4">
            Street 1:
            <input className="ml-4 bg-grey" type="text" value={street1} onChange={(e) => setStreet1(e.target.value)} placeholder="required" required />
          </label>
          <button onClick={() => setDisplayAdressPopup(false)}>Confirm</button>
        </div>}
      </div>
    )
  }

  const product_list = () => {
    return (
      <div className="flex">
        <div>
          {cart.map((elem, index) => (
            <div key={index} className="ml-8">
              <div className="flex flex-col m-8">
                <div className="flex">
                  <img
                    className="w-1/3 h-1/3 border border-grey"
                    src={`${elem.product.images[0]}`}
                    alt={elem.product.name}
                  />
                  <div className="flex flex-col ml-4">
                    <h2 className="font-primary text-3xl text-gold">
                      {elem.product.name}
                    </h2>
                    <span className="font-primary flex text-2xl p-2">
                      Size:&nbsp;<h2>{elem.size}</h2>
                    </span>
                    <span className="font-primary flex text-2xl p-2">
                      Material:&nbsp;<h2>{elem.product.material.name}</h2>
                    </span>
                    {elem.product.stone && (
                      <span className="font-primary flex text-2xl p-2">
                        Stone:&nbsp;
                        <h2>{elem.product.stone.name}</h2>
                      </span>
                    )}
                    {elem.product.promotion.id != 1 && (
                      <span className="font-primary flex text-2xl p-2">
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
                      <span className="font-primary flex text-2xl p-2">
                        Price:&nbsp;
                        <h2>{elem.product.price * elem.itemQty}€</h2>
                      </span>
                    )}
                    <span className="flex text-2xl p-2 font-primary">
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
                  <div className="flex justify-around text-2xl p-2 mt-6">
                    <div>
                      <button
                        className="flex font-primary"
                        onClick={() => deleteProduct(elem)}
                      >
                        <img className="mr-4" src={Delete} alt="" />
                        Delete
                      </button>
                    </div>
                    {displayWishlist && (
                      <div>
                        <button
                          className="flex font-primary"
                          onClick={() => saveForLater(elem)}
                        >
                          <img className="mr-4" src={Save4later} alt="" />
                          Save for later
                        </button>
                      </div>
                    )}
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
              <h3 className="font-primary text-xl text-center m-2">
                Promo Code&nbsp;
              </h3>
              <button
                className="font-primary text-xl text-center m-2 underline"
                onClick={() => setInputPromo(true)}
              >
                Ajouter
              </button>
            </div>
            {inputPromo && (
              <input
                type="text"
                onChange={(e) => setTryCode(e.target.value)}
                onKeyDown={handleSearch}
              />
            )}
            {reduction && <p>Reduction : {reduction}%</p>}
            <div className="border border-black my-4" />
            <div className="flex justify-between">
              <h3 className="font-primary text-xl text-center m-2">
                Subtotal&nbsp;
              </h3>
              <h3 className="font-primary text-xl text-center m-2">
                {reduction ? (
                  <>
                    <span className="line-through">{subTotal}€</span>{" "}
                    <span>{subTotal - (subTotal * reduction) / 100}</span>
                  </>
                ) : (
                  <span>{subTotal}€</span>
                )}
              </h3>
            </div>
            <div className="flex justify-between">
              <h3 className="font-primary text-xl text-center m-2">
                Shipping&nbsp;
              </h3>
              <h3 className="font-primary text-xl text-center m-2">
                {addressTo === null ? 'Need an adress' : '25$'}
              </h3>
            </div>
            <div className="flex justify-between">
              <h3 className="font-primary text-xl text-center m-2">
                Adress&nbsp;
              </h3>
              <h3 className="font-primary text-xl text-center m-2">
                {addressTo === null ? <button onClick={() => validateAdress(user)}>No adress found</button> : `${country}, ${state} ${zip}, ${city}, ${street1}`}
              </h3>
            </div>
            <div className="rounded-3xl bg-gold m-6 flex justify-center">
              <button
                className="font-primary text-3xl font-bold text-center m-2"
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

  return (
    <>
      <Header />
      <div className="mb-24">
        <div className="m-16">
          {nbrArticle >= 0 && nbrArticle !== 1 && (
            <h1 className="font-primary text-3xl text-gold mr-4">
              {`My Cart (` + nbrArticle + ` articles)`}
            </h1>
          )}
          {nbrArticle === 1 && (
            <h1 className="font-primary text-3xl text-gold mr-4">
              {`My Cart (` + nbrArticle + ` article)`}
            </h1>
          )}
          <div className="border border-grey w-2/4 mt-4" />
        </div>
        {adressPopup()}
        <div>{product_list()}</div>
      </div>
      <Footer />
    </>
  );
}
