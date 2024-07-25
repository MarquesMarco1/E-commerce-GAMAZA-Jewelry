import { useEffect, useState } from "react";

export default function ManageProfil(data) {
  const [profil, setProfil] = useState([]);
  useEffect(() => {
    setProfil(data.data);
  }, [data]);
  const editUser = () => {};
  const deleteUser = () => {};
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
