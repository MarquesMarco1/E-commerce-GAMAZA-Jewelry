import React, { useState, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";

const Autocomplete = ({ suggestions }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  // const [error, setError] = useState("");
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

      // static contextType = SuggestionsContext;

  const onChange = e => {
    const userInput = e.currentTarget.value.toLowerCase();

    const filteredSuggestions = suggestions.filter(suggestion => 
        // suggestion.toLocaleLowerCase().indexOf(userInput.toLocaleLowerCase()) > -1
        (suggestion.name && suggestion.name.toLocaleLowerCase().indexOf(userInput) > -1) || 
        (suggestion.nameEn && suggestion.nameEn.toLocaleLowerCase().indexOf(userInput) > - 1)
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClick = e => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = e => {

    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);

    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

    let suggestionsListComponent;
    
    console.log("showSuggestions:", showSuggestions);
    console.log("userInput:", userInput);
    console.log("suggestions:", suggestions);
    console.log("filteredSuggestions:", filteredSuggestions);

    
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className="absolute border border-gray-600 border-t-0 list-none mt-12 max-h-36 overflow-y-auto pl-0 w-full bg-grey shadow-lg md:w-72">
                {filteredSuggestions.map((suggestion, index) => {
                    let className = "p-2 flex items-center ";
    
                    if (index === activeSuggestion) {
                    className += "hover:bg-light-purple hover:text-black hover:cursor-pointer hover:font-bold";
                    }
                    
                    return (
                      <li 
                        className={`${className} border-b border-gray-600:last:border-0`}
                        key={language === 'FR' ? suggestion.name : suggestion.nameEn} 
                        onClick={onClick}
                      >
                          <img src={suggestion.images} alt={language === 'FR' ? suggestion.name : suggestion.nameEn}
                        className="w-10 h-10 mr-2 object-cover"
                        />
                      <div>
                          <div className="font-bold text-gold font-primary text-lg">{language === 'FR' ? suggestion.name : suggestion.nameEn}</div>
                          <div className="text-gray-600 font-bold font-primary">${suggestion.price}</div>
                      </div>
                      </li>
                    );
                })}
            </ul>
          );
      } else {
        suggestionsListComponent = (
            <div className="no-suggestions text-gray-600 p-2" >
                <em>No suggestions available.</em>
            </div>
            );
          }
        }
        return (
        <Fragment>
          <input
            type="text"
            // className="border border-gray-600 p-2 w-72"
            className="w-full md:w-72 p-2 border border-gold rounded-md font-primary bg-white dark:bg-dark-mode-light-purple dark:placeholder-gold"
            placeholder={t("search.searchBar")}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {suggestionsListComponent}
        </Fragment>
      );
    }

Autocomplete.propTypes = {
   suggestions: PropTypes.arrayOf(PropTypes.string)
 };

export default Autocomplete;