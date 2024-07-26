import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../../config";

export default function ManageUsers(data) {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(data.data);
    setUsers(data.data);
  }, [data, refresh]);

  const deleteUser = async (id) => {
    const response = await fetch(`${localhost}/api/deleteUser/${id}`);
    const data = await response.json();
    if (data.success) {
      // setRefresh(true);
      window.location.reload();
    }
  };

  const editUser = async (id) => {
    navigate(`/editAdminUser/${id}`, { replace: true });
  };

  const setAdmin = async (id) => {
    const response = await fetch(`${localhost}/api/setAdmin/${id}`);
    if (response.ok) {
      const data = await response.json();
      setRefresh(true);
    }
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
              {!elem.roles.includes("ROLE_ADMIN") && (
                <li>
                  <button onClick={() => setAdmin(elem.id)}>
                    Become Admin
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => deleteUser(elem.id)}>Delete</button>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
}
