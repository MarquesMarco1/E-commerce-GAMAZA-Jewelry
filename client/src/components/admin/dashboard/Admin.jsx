import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import NavBarAdmin from "../../utils/navbarAdmin";

export default function Admin() {
  let navigate = useNavigate();

  ////////////////
  //  UseState  //
  ////////////////

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("");

  /////////////////////////////////////////
  //  Fetch Categories, Products, Users  //
  /////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const language = localStorage.getItem("language");
      setLanguage(language);

      const response = await fetch(`${localhost}/api/products`);

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.allArticle);
      }

      const response_users = await fetch(`${localhost}/api/users`);

      if (response_users.status === 200) {
        const data_users = await response_users.json();
        setUsers(data_users.allUsers);
      }

      const response_category = await fetch(
        `${localhost}/api/categorie/${language}`
      );

      if (response.status === 200) {
        const data_category = await response_category.json();
        setCategory(data_category.allCategory);
      }
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  ////////////////////////////////
  //  Delete & Update Products  //
  ////////////////////////////////

  const deleteProduct = async (id) => {
    const response = await fetch(`${localhost}/api/delete/${id}`);

    const data = await response.json();

    if (data.success) {
      setRefresh(true);
    }
  };

  const editProduct = async (id) => {
    navigate(`/editProduct/${id}`, { replace: true });
  };

  ////////////////////////////////
  //  Delete & Update Users     //
  ////////////////////////////////

  const deleteUser = async (id) => {
    const response = await fetch(`${localhost}/api/deleteUser/${id}`);
    const data = await response.json();
    if (data.success) {
      setRefresh(true);
    }
  };

  const editUser = async (id) => {
    navigate(`/editAdminUser/${id}`, { replace: true });
  };

  const setAdmin = async (id) => {
    const response = await fetch(`${localhost}/api/setAdmin/${id}`);
    if (response.ok) {
      setRefresh(true);
    }
  };

  const setUser = async (id) => {
    const response = await fetch(`${localhost}/api/setUser/${id}`);
    if (response.ok) {
      // const data = await response.json();
      // console.log(data);
      setRefresh(true);
    }
  };

  ////////////////////////////////
  //  Delete & Update Category  //
  ////////////////////////////////

  const deleteCategory = async (id) => {
    const response = await fetch(`${localhost}/api/delete/category/${id}`);
    const data = await response.json();
    if (data.success) {
      setRefresh(true);
    }
  };

  const editCategory = async (id) => {
    navigate(`/editCategory/${id}`, { replace: true });
  };
  return (
    <>
      <Header></Header>
      <div className="mr-24	ml-24	">
        <NavBarAdmin></NavBarAdmin>
        <div className="border	border-grey	w-2/4	"></div>
        <br></br>

        {/* //////////////////////// */}
        {/* // Navigate to a CRUD // */}
        {/* //////////////////////// */}

        <div className="flex flex-col	">
          <Link to={`/createArticle`} className="w-max">
            Add a product
          </Link>
          <Link to={`/createCategory`} className="w-max">
            Add a category
          </Link>
          <Link to={`/createUser`} className="w-max">
            Add a user
          </Link>
          <br></br>
        </div>
        <div className="flex justify-between	">
          {/* ////////////////// */}
          {/* // Manage users // */}
          {/* ////////////////// */}

          <div className="flex flex-col w-full	">
            <h2 className="text-gold">Manage Users :</h2>
            {users.length > 0 &&
              users.map((elem) => (
                <ul className="m-2.5	border-2 rounded-2xl p-2.5	bg-gray-200	">
                  <div>
                    <li>
                      Full name : {elem.firstname ? elem.firstname : "No data"}
                    </li>
                    <li>Email : {elem.email}</li>
                    <li>Password : *******</li>
                    <li>Adress : {elem.adress ? elem.adress : "No data"}</li>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <li>
                      <button onClick={() => editUser(elem.id)}>Edit</button>
                    </li>
                    {!elem.roles.includes("ROLE_ADMIN") ? (
                      <li>
                        <button onClick={() => setAdmin(elem.id)}>
                          Become Admin
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button onClick={() => setUser(elem.id)}>
                          Become User
                        </button>
                      </li>
                    )}
                    <li>
                      <button onClick={() => deleteUser(elem.id)}>
                        Delete
                      </button>
                    </li>
                  </div>
                </ul>
              ))}
          </div>

          {/* ///////////////////////////// */}
          {/* // Manage Produts/Articles // */}
          {/* ///////////////////////////// */}

          <div className="flex flex-col w-full	">
            <h2 className="text-gold">Manage Articles :</h2>
            {products.length > 0 &&
              products.map((elem) => (
                <ul className="m-2.5	border-2  rounded-2xl p-2.5	bg-gray-200	">
                  <div>
                    <li>
                      Title : {language === "FR" ? elem.name : elem.nameEn}
                    </li>
                    <li>Size : {elem.size}</li>
                    <li>
                      Color : {language === "FR" ? elem.color : elem.colorEn}
                    </li>
                    <li>Price : ${elem.price}</li>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <li>
                      <button onClick={() => editProduct(elem.id)}>Edit</button>
                    </li>
                    <li>
                      <button onClick={() => deleteProduct(elem.id)}>
                        Delete
                      </button>
                    </li>
                  </div>
                </ul>
              ))}
          </div>
        </div>
      </div>

      {/* ///////////////////////////// */}
      {/* // Manage Category         // */}
      {/* ///////////////////////////// */}

      <div className="flex flex-col w-full	">
        <h2 className="text-gold">Manage Category :</h2>
        {category.length > 0 &&
          category.map((elem) => (
            <ul className="m-2.5	border-2  rounded-2xl p-2.5	bg-gray-200	">
              <div>
                <li>Title : {language === "FR" ? elem.name : elem.nameEn}</li>
              </div>
              <div style={{ textAlign: "end" }}>
                <li>
                  <button onClick={() => editCategory(elem.id)}>Edit</button>
                </li>
                <li>
                  <button onClick={() => deleteCategory(elem.id)}>
                    Delete
                  </button>
                </li>
              </div>
            </ul>
          ))}
      </div>

      <Footer></Footer>
    </>
  );
}
