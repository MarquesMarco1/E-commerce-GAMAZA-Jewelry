import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import React, { useContext, useEffect } from "react";

import Landing from "./components/Landing";
import CreateArticle from "./components/admin/dashboard/CreateArticle";
import CreateCategory from "./components/admin/dashboard/CreateCategory";
import Authentication from "./components/auth/Authentication";
import Profile from "./components/auth/Profile";
import CategoryPage from "./components/CategoryPage";
import SpecProduct from "./components/SpecProduct";
import Admin from "./components/admin/dashboard/Admin";
import EditProduct from "./components/admin/dashboard/EditProduct";
import Search from "./components/Search";
import EditCategory from "./components/admin/dashboard/EditCategory";
import Stats from "./components/admin/stats/Stats";
import EditProfil from "./components/auth/EditProfil";
import CreateUser from "./components/admin/dashboard/CreateUser";
import EditUser from "./components/admin/dashboard/EditUser";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";
import Map from "./components/Map";
import { CartProvider } from "./components/CartContext";

function App() {
  const { i18n } = useTranslation();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase());
  }, [language, i18n]);

  return (
    <HelmetProvider>
      <CartProvider> {/* CartProvider ici */}
        <BrowserRouter>
          <Routes>
            {/* ALL */}
            <Route path="/" element={<Landing />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/product/:id" element={<SpecProduct />} />
            {/* ADMINS */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/createArticle" element={<CreateArticle />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
            <Route path="/editCategory/:id" element={<EditCategory />} />
            <Route path="/editAdminUser/:id" element={<EditUser />} />
            <Route path="/admin/stats" element={<Stats />} />
            {/* USERS */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/map" element={<Map />} />
            <Route path="/CartContext" element={<CartContext />} />
            <Route path="/editProfil/:id" element={<EditProfil />} />
            <Route path="/authentication" element={<Authentication />} />
          </Routes>
        </BrowserRouter>
        {/* GOOGLE ANALYTICS */}
        <Helmet>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-3DP4K2GG5P"
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-3DP4K2GG5P');
            `}
          </script>
        </Helmet>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
