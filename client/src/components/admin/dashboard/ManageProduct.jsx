import { useState, useEffect } from "react";
import localhost from "../../../config";
import { Link, useNavigate } from "react-router-dom";

export default function ManageProducts(data) {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setProducts(data.data);
  }, [data]);

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
                <button onClick={() => deleteProduct(elem.id)}>Delete</button>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
}
