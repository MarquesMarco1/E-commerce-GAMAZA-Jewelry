import React, { useState, useEffect, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";

const Autocomplete = ({ suggestions = [] }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  // const [error, setError] = useState("");
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

      // static contextType = SuggestionsContext;

  const onChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(suggestion => 
        suggestion.toLocaleLowerCase().indexOf(userInput.toLocaleLowerCase()) > -1
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
    console.log("filteredSuggestions:", filteredSuggestions);

    
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
            suggestionsListComponent = (
            <ul className="border border-gray-600 border-t-0 list-none mt-0 max-h-36 overflow-y-auto pl-0 w-72">
                {filteredSuggestions.map((suggestion, index) => {
                    let className = "p-2";
    
                    if (index === activeSuggestion) {
                    className += "bg-green-700 text-yellow-400 cursor-pointer font-bold";
                    }
                    
                    return (
                        <li 
                        className={`${className} hover:bg-green-700 hover:text-yellow-400 hover:cursor-pointer hover:font-bold border-b border-gray-600:last:border-0`}
                        key={suggestion} 
                        onClick={onClick}>
                    {suggestion}
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
            className="w-full md:w-80 p-2 border border-gold rounded-md font-primary mr-4"
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

// Autocomplete.contextType = SuggestionsContext;

export default Autocomplete;