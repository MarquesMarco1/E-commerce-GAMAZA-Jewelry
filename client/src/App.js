import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreateArticle from "./components/admin/CreadArticle";
import CreateCategory from "./components/admin/CreateCategory";
import Register from "./components/auth/register";

import localhost from "./config";
import CategoryPage from "./components/CategoryPage";
import SpecProduct from "./components/SpecProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/category/:id" element={<CategoryPage />}></Route>
        <Route path="/product/:id" element={<SpecProduct />}></Route>
        <Route path="/createArticle" element={<CreateArticle />}></Route>
        <Route path="/createCategory" element={<CreateCategory />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
