import { useState, useEffect } from "react";
import localhost from "../../../config";
import { Link, useNavigate } from "react-router-dom";

export default function ManageCategory(data) {
  const [refresh, setRefresh] = useState(false);
  const [category, setCategory] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    setCategory(data.data);
  }, [data]);

  const deleteCategory = async (id) => {
    const response = await fetch(`${localhost}/api/delete/category/${id}`);
    const data = await response.json();
    if (data.success) {
      window.location.reload();
      setRefresh(true);
    }
  };
  const editCategory = async (id) => {
    navigate(`/editCategory/${id}`, { replace: true });
  };
  return (
    <div className="flex flex-col w-full	">
      <h2 className="text-gold">Manage Category :</h2>
      {category.length > 0 &&
        category.map((elem) => (
          <ul className="m-2.5	border-2  rounded-2xl p-2.5	bg-gray-200	">
            <div>
              <li>Title : {elem.name}</li>
            </div>
            <div style={{ textAlign: "end" }}>
              <li>
                <button onClick={() => editCategory(elem.id)}>Edit</button>
              </li>
              <li>
                <button onClick={() => deleteCategory(elem.id)}>Delete</button>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
}
