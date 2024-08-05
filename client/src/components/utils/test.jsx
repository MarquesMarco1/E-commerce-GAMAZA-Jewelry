import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="App">
      <button onClick={openPopup}>Open Login Popup</button>
      
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Login</h2>
            <form>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
              </div>
              <button type="submit">Login</button>
            </form>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

