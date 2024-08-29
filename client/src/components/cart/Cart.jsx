import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Content from "./Content";
import { useCart } from "../../CartContext";

export default function Cart() {
  const { state: cart, dispatch } = useCart([]);
  const [nbrArticle, setNbrArticle] = useState(0);

  const SetNbrArticle = () => {
    let nbr = 0;
    cart.map((item) => (nbr += item.itemQty));
    setNbrArticle(nbr);
};

useEffect(() => {
  SetNbrArticle();
}, [cart]);

  return (
    <>
      <Header />
      <div className="p-4 -mb-10 bg-light-purple bg-opacity-20 dark:bg-dark-mode-purple rounded-xl">
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
          <div className="border border-grey w-2/4" />
        </div>
        <div><Content /></div>
      </div>
      <Footer />
    </>
  );
}