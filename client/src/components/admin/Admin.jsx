import { useState, useEffect } from "react";
import localhost from "../../config";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/products`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setProducts(data.allArticle);
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
      <h1>My dashboard</h1>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={`/createArticle`}>Add a product</Link>
        <Link to={`/createCategory`}>Add a category</Link>
        <br></br>
      </div>
      <div>
        <h2>Manage Articles :</h2>
        {products.length > 0 &&
          products.map((elem) => (
            <ul
              style={{
                margin: 10,
                borderWidth: 2,
                backgroundColor: "#DEDEE0",
                width: "50%",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <div>
                <li>{elem.name}</li>
                <li>{elem.size}</li>
                <li>{elem.color}</li>
                <li>{elem.price}</li>
              </div>
              <div style={{ textAlign: "end" }}>
                <li>
                  <button onClick={() => editProduct(elem.id)}>Edit</button>
                </li>
                <li>
                  <button onClick={() => deleteProduct(elem.id)}>Delete</button>
                </li>
              </div>
            </ul>
          ))}
      </div>
      <div style={{ display: "flex" }}>
        <div></div>
      </div>
    </>
  );
}
