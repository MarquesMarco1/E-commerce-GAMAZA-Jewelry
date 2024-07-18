import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreateArticle from "./components/admin/CreadArticle";
import CreateCategory from "./components/admin/CreateCategory";
import Register from "./components/auth/register";
import Profile from "./components/auth/Profile";
import Login from "./components/auth/login";
import CategoryPage from "./components/CategoryPage";
import SpecProduct from "./components/SpecProduct";
import Admin from "./components/admin/Admin";

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
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
