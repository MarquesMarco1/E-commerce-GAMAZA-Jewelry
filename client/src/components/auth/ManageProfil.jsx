import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";

export default function ManageProfil(data) {
  const [profil, setProfil] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setProfil(data.data);
  }, [data, refresh]);
  const editUser = (id) => {
    navigate(`/editProfil/${id}`, { replace: true });
  };
  const deleteUser = async (id) => {
    const response = await fetch(`${localhost}/api/deleteUser/${id}`);
    const data = await response.json();
    if (data.success) {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="flex flex-col w-full	">
      {profil.length > 0 &&
        profil.map((elem) => (
          <ul className="m-2.5	border-2 rounded-2xl p-2.5	bg-gray-200	">
            <div>
              <li>Email : {elem.email}</li>
              <li>Password : *******</li>
              <li>
                Adress : {elem.adress ? elem.adress : "No data"} <br />
                Zipcode : {elem.zIPCode ? elem.zIPCode : "No data"}
                <br />
                City : {elem.city ? elem.city : "No data"}
                <br />
                Country : {elem.country ? elem.country : "No data"}
              </li>
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
