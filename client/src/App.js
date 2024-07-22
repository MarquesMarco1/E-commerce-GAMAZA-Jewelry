import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreateArticle from "./components/admin/CreadArticle";
import CreateCategory from "./components/admin/CreateCategory";
import Authentication from "./components/auth/Authentication";
import Profile from "./components/auth/Profile";
import CategoryPage from "./components/CategoryPage";
import SpecProduct from "./components/SpecProduct";
import Admin from "./components/admin/Admin";
import EditProduct from "./components/admin/EditProduct";
import EditCategory from "./components/admin/EditCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/category/:id" element={<CategoryPage />}></Route>
        <Route path="/product/:id" element={<SpecProduct />}></Route>
        <Route path="/createArticle" element={<CreateArticle />}></Route>
        <Route path="/createCategory" element={<CreateCategory />}></Route>
        <Route path="/authentication" element={<Authentication />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/editProduct/:id" element={<EditProduct />}></Route>
        <Route path="/editCategory/:id" element={<EditCategory />}></Route>
        {/* <Route path="/authentication" element={<Authentication />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
