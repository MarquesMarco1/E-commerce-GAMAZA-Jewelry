import { useEffect, useState, useContext } from "react";
import localhost from "../../../config";
import { useTranslation } from "react-i18next";
import switchIcon from '../../../assets/switchList.svg';

//////////////////
//  Components  //
//////////////////

import { LanguageContext } from "../../../LanguageContext";
import Footer from "../../Footer";
import Header from "../../Header";

export default function ManageShipping() {
    const { t } = useTranslation();
  

  ////////////////
  //  UseState  //
  ////////////////

  const [whitelist, setWhitelist] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

    ///////////////////////////////////////////////
  //  Fetch Whitelist, Blacklist, language, shipping  //
  ///////////////////////////////////////////////

  async function getCountries() {
    try {
      const res = await fetch(`${localhost}/api/shippingCountry`);
      if(!res.ok) {
        throw new Error(`HTTP error : ${res.status}`);
      }
      const data = await res.json();  
      setWhitelist(data.whitelist);
      setBlacklist(data.blacklist);
    } catch (error) {
      console.log("Failed to fetch shipping countries:", error);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  const sortedWhitelist = whitelist.slice().sort((a, b) => a.name.localeCompare(b.name));
  const sortedBlacklist = blacklist.slice().sort((a, b) => a.name.localeCompare(b.name));

  const switchLists = () => {
    if(!selectedCountry) return;

    const whitelistCountries = whitelist.find(country => country.name === selectedCountry);
    const blacklistCountries = blacklist.find(country => country.name === selectedCountry);

    if(whitelistCountries) {
      setWhitelist(whitelist.filter(country => country.name !== selectedCountry));
      setBlacklist([...blacklist, whitelistCountries]);
    }else if (blacklistCountries) {
      setBlacklist(blacklist.filter(country => country.name !== selectedCountry));
      setWhitelist([...whitelist, blacklistCountries]);
    }
    setSelectedCountry(null);
  };

  const handleSelect = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <>
        <div className="dark:bg-dark-mode-purple">
            <Header />
            <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold font-primary">
                {t("manageShipping.shippingTitle")}
            </h1>
            <div className="dropdown-container flex justify-center space-x-4">
              <div className="dropdown">
                <h2 className="text-center text-xl mb-4 mt-4 text-black dark:text-gold font-primary">
                {t("manageShipping.whitelist")}
              </h2>
              <select 
                className="w-full p-2 border border-gold rounded dark:bg-dark-mode-purple dark:border-gold"
                onChange={handleSelect}
                value={selectedCountry || ""}
                >
                  <option value="" disabled>Select a country</option>
                {sortedWhitelist.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
                ))}
              </select>
            </div>

            <button
            onClick={switchLists}
            className="bg-transparent border-none cursor-pointer"
          >
            <img
              src={switchIcon}
              className="w-10 h-10 md:w-20 md:h-20"
              alt="double arrow icon to switch countries between whitelist and blacklist"
            />
          </button>

            <div className="dropdown">
              <h2 className="text-center text-xl mb-4 mt-4 text-black dark:text-gold font-primary">
                {t("manageShipping.blacklist")}
              </h2>
              <select 
                className="w-full p-2 border border-gold rounded dark:bg-dark-mode-purple dark:border-gold hover:bg-light-purple dark:hover:bg-dark-mode-light-purple"
                onChange={handleSelect}
                value={selectedCountry || ""}
              >
                <option value="" disabled>Select a country</option>
                {sortedBlacklist.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
          </div>
          <h1 className="text-center text-2xl mb-4 mt-4 text-gold">
            {t("manageShipping.thresholdsTitle")}
          </h1>
          <Footer></Footer>
        </div>
    </>
  );
}