import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { SuggestionsContext } from '../contexts/SuggestionsContext';

class Autocomplete extends Component {
    static propTypes = {
        // suggestions: PropTypes.instanceOf(Array),
        onChange: PropTypes.func.isRequired
      };
      
      
      static defaultProps = {
        suggestions: []
      };
      
      static contextType = SuggestionsContext;
      
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.context;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(suggestion =>
      typeof suggestion === 'string' && 
        suggestion.toLocaleLowerCase().indexOf(userInput.toLocaleLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });

    this.props.onChange(e);
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
        onChange,
        onClick,
        onKeyDown,
        state: {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput
        }
    } = this;

    let suggestionsListComponent;
    
    console.log("showSuggestions:", showSuggestions);
    console.log("userInput:", userInput);
    console.log("filteredSuggestions:", filteredSuggestions);

    
        if (showSuggestions) {
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
            className="border border-gray-600 p-2 w-72"
            // className="w-full md:w-80 p-2 border border-gold rounded-md font-primary mr-4"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {suggestionsListComponent}
        </Fragment>
      );
    }
}

Autocomplete.contextType = SuggestionsContext;

export default Autocomplete;