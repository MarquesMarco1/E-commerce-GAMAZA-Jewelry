import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CreateArticle from "./components/admin/CreadArticle";
import CreateCategory from "./components/admin/CreateCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/createArticle" element={<CreateArticle />}></Route>
        <Route path="/createCategory" element={<CreateCategory />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
