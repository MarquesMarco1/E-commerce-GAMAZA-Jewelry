import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreateArticle from "./components/admin/dashboard/CreadArticle";
import CreateCategory from "./components/admin/dashboard/CreateCategory";
import Authentication from "./components/auth/Authentication";
import Profile from "./components/auth/Profile";
import CategoryPage from "./components/CategoryPage";
import SpecProduct from "./components/SpecProduct";
import Admin from "./components/admin/dashboard/Admin";
import EditProduct from "./components/admin/dashboard/EditProduct";
import EditCategory from "./components/admin/dashboard/EditCategory";
import Stats from "./components/admin/stats/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ALL */}
        <Route path="/" element={<Landing />}></Route>
        <Route path="/category/:id" element={<CategoryPage />}></Route>
        <Route path="/product/:id" element={<SpecProduct />}></Route>
        {/* ADMINS */}
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/createArticle" element={<CreateArticle />}></Route>
        <Route path="/createCategory" element={<CreateCategory />}></Route>
        <Route path="/editProduct/:id" element={<EditProduct />}></Route>
        <Route path="/editCategory/:id" element={<EditCategory />}></Route>
        <Route path="/admin/stats" element={<Stats />}></Route>
        {/* USERS */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/authentication" element={<Authentication />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
