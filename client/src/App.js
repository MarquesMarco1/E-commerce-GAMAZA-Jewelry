import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import CreateArticle from "./components/admin/CreadArticle";
import CreateCategory from "./components/admin/CreateCategory";
import specProducts from "./components/specProducts";
import localhost from "./config";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />}></Route>
            <Route path="/createArticle" element={<CreateArticle />}></Route>
            <Route path="/createCategory" element={<CreateCategory />}></Route>
            <Route path="/specProducts" element={<specProducts />}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
