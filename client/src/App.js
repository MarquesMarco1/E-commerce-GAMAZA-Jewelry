import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import CreateArticle from "./components/admin/CreadArticle";
import CreateCategory from "./components/admin/CreateCategory";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetData = async () => {
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      console.log(data);
    };
    fetData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />}></Route>
            <Route path="/createArticle" element={<CreateArticle />}></Route>
            <Route path="/createCategory" element={<CreateCategory />}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
