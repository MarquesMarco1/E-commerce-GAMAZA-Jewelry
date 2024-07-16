import logo from "../logo.svg";
import { Link } from "react-router-dom";

export default function Accueil() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to={`/createArticle`}>Créer un quizz</Link>
        <Link to={`/createCategory`}>Créer une categorie</Link>
      </header>
    </div>
  );
}
