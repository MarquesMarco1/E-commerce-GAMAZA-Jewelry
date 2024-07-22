import { useState, useEffect } from "react";
import localhost from "../../config";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import ManageUsers from "./ManageUsers";
import Footer from "../Footer";
import ManageCategory from "./ManageCategory";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
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
      const response_category = await fetch(`${localhost}/api/categorie`);
      if (response.status === 200) {
        const data_category = await response_category.json();
        setCategory(data_category.allCategory);
      }
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);
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
  return (
    <>
      <Header></Header>
      <div className="mr-24	ml-24	">
        <h1 className="mt-16 text-3xl	text-gold mb-2">My dashboard</h1>
        <div className="border	border-gray-400	w-2/4	"></div>
        <br></br>
        <div className="flex flex-col	">
          <Link to={`/createArticle`} className="w-max">
            Add a product
          </Link>
          <Link to={`/createCategory`} className="w-max">
            Add a category
          </Link>
          <br></br>
        </div>
        <div className="flex justify-between	">
          <ManageUsers data={users} />
          <div className="flex flex-col w-full	">
            <h2 className="text-gold">Manage Articles :</h2>
            {products.length > 0 &&
              products.map((elem) => (
                <ul className="m-2.5	border-2  rounded-2xl p-2.5	bg-gray-200	">
                  <div>
                    <li>Title : {elem.name}</li>
                    <li>Size : {elem.size}</li>
                    <li>Color : {elem.color}</li>
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
      <ManageCategory data={category} />

      <Footer></Footer>
    </>
  );
}
