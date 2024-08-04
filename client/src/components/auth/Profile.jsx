import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import ManageProfil from "./ManageProfil";
import Header from "../Header";
import ManageCommand from "./ManageCommand";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const [profil, setProfil] = useState([]);
  const { t } = useTranslation();
  let navigate = useNavigate();

  const fetchData = async (email) => {
    const response = await fetch(`${localhost}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.status === 200) {
      const data = await response.json();
      setProfil(data.user);
    }
  };

  useEffect(() => {
    const fetchIsLog = async () => {
      const email = localStorage.getItem("user");
      if (email) {
        fetchData(email);
      } else {
        navigate("/authentication", { replace: true });
      }
    };
    fetchIsLog();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };
  return (
    <>
    <div className="dark:bg-dark-mode-purple">
      <Header></Header>
      <div className="mr-24	ml-24	flex justify-between font-secondary">
        <div className="w-3/5	 mr-8">
          <h1 className="mt-16 text-3xl	text-gold mb-2">
            {t("profilPage.profil")}
          </h1>
          <div className="border border-gray-400	w-4/4	"></div>
          <br></br>
          <ManageProfil data={profil} />
          <div className="text-center">
            <button
              className="rounded-lg bg-light-purple dark:bg-dark-mode-light-purple p-2.5 mt-2 text-gold"
              onClick={() => logout()}
            >
              {t("profilPage.logout")}
            </button>
          </div>
        </div>
        <div className="w-2/5">
          <h1 className="mt-16 text-3xl	text-gold mb-2">
            {t("profilPage.command")}
          </h1>
          <div className="border border-gray-400 w-4/4 dark:border-gold"></div>
          <br></br>
          <ManageCommand />
        </div>
      </div>
      </div>
    </>
  );
}
