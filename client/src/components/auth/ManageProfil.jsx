import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//////////////////
//  Components  //
//////////////////

import localhost from "../../config";

export default function ManageProfil(data) {
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [profil, setProfil] = useState([]);
  const [refresh, setRefresh] = useState(false);

  /////////////////////
  //  set user data  //
  /////////////////////

  useEffect(() => {
    setProfil(data.data);
  }, [data, refresh]);

  ///////////////////////////
  //  EDIT || DELETE USER  //
  ///////////////////////////

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
    <div className="flex flex-col w-full dark:bg-dark-mode-light-purple text-gold	">
      {/* User profil data  */}

      {profil.length > 0 &&
        profil.map((elem) => (
          <ul className="m-2.5	border-2 rounded-2xl p-2.5	bg-gray-200	">
            <div>
              <li>
                {t("editProfil.email")} : {elem.email}
              </li>
              <li>{t("editProfil.password")} : *******</li>
              <li>
                {t("editProfil.adress")} :{" "}
                {elem.adress ? elem.adress : "No data"} <br />
                {t("editProfil.zip")} :{" "}
                {elem.zIPCode ? elem.zIPCode : "No data"}
                <br />
                {t("editProfil.city")} : {elem.city ? elem.city : "No data"}
                <br />
                {t("editProfil.country")} :{" "}
                {elem.country ? elem.country : "No data"}
              </li>
            </div>
            <div style={{ textAlign: "end" }}>
              <li>
                {/* button edit user data  */}

                <button onClick={() => editUser(elem.id)}>
                  {" "}
                  {t("editProfil.edit")}
                </button>
              </li>
              <li>
                {/* button delete user  */}

                <button onClick={() => deleteUser(elem.id)}>
                  {" "}
                  {t("editProfil.delete")}
                </button>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
}
