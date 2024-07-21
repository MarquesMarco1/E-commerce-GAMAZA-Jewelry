import { useState, useEffect } from "react";
import localhost from "../../config";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import ManageProducts from "./ManageProduct";
import ManageUsers from "./ManageUsers";
import Footer from "../Footer";

export default function Admin() {
  const [products, setProducts] = useState([]);
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
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);
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
          <ManageProducts data={products} />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
