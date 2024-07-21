import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";

export default function ManageUsers(data) {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setUsers(data.data);
  }, [data, refresh]);

  const deleteUser = async (id) => {
    // const response = await fetch(`${localhost}/api/delete/${id}`);
    // const data = await response.json();
    // if (data.success) {
    //   setRefresh(true);
    // }
  };
  const editUser = async (id) => {
    // navigate(`/editProduct/${id}`, { replace: true });
  };

  return (
    <div className="flex flex-col w-full	">
      <h2 className="text-gold">Manage Users :</h2>
      {users.length > 0 &&
        users.map((elem) => (
          <ul className="m-2.5	border-2 rounded-2xl p-2.5	bg-gray-200	">
            <div>
              <li>Full name : {elem.firstname ? elem.firstname : "No data"}</li>
              <li>Email : {elem.email}</li>
              <li>Password : *******</li>
              <li>Adress : {elem.adress ? elem.adress : "No data"}</li>
            </div>
            <div style={{ textAlign: "end" }}>
              <li>
                <button onClick={() => editUser(elem.id)}>Edit</button>
              </li>
              <li>
                <button onClick={() => deleteUser(elem.id)}>Delete</button>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
}
