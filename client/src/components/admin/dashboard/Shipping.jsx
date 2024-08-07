import { useEffect, useState, useContext } from "react";
import localhost from "../../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


//////////////////
//  Components  //
//////////////////

import { LanguageContext } from "../../../LanguageContext";
import Footer from "../../Footer";
import Header from "../../Header";

export default function ManageShipping() {
    let navigate = useNavigate();
    const { t } = useTranslation();
  

  ////////////////
  //  UseState  //
  ////////////////

  const { language } = useContext(LanguageContext);

    ///////////////////////////////////////////////
  //  Fetch Whitelist, Blacklist, language, shipping  //
  ///////////////////////////////////////////////


  return (
    <>
        <div className="dark:bg-dark-mode-purple">
            <Header></Header>
            <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
                {t("manageShipping.shippingTitle")}
            </h1>
            <h1 className="text-center text-2xl mb-4 mt-4 text-gold">
              {t("manageShipping.thresholdsTitle")}
            </h1>
            <Footer></Footer>
        </div>
    </>
  )
}