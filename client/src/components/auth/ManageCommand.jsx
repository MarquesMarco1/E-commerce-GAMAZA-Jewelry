import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import localhost from "../../config";

export default function ManageCommand() {
  const { t } = useTranslation();
  const [command, setCommand] = useState([]);
  const [refresh, setRefresh] = useState(true);
  // const [commandStatus, setCommandStatus] = useState("");

  const updateStatus = async (elem, status) => {
    const formData = {
      tracking_id: elem.id,
      status: status,
    };

    const response = await fetch(`${localhost}/api/setStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      const data = await response.json();
      setCommand(data.command);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      const response = await fetch(`${localhost}/api/UserCommand/${user}`);

      if (response.ok) {
        const data = await response.json();
        setCommand(data.command);
        data.command.forEach(async (elem) => {
          if (elem.status === "PRE_TRANSIT") {
            setTimeout(() => {
              updateStatus(elem, "TRANSIT");

              setTimeout(() => {
                updateStatus(elem, "DELIVERED");
              }, 10000);
            }, 10000);
          }
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {command &&
        command.map((elem) => (
          <ul className=" bg-white dark:bg-dark-mode-light-purple text-gold border m-2.5 rounded-2xl p-2.5">
            <li>
              <h3>
                {t("commandManage.order")} : {elem.number}
              </h3>
            </li>
            <li>Status : {elem.status}</li>
            {/* <li>{t("commandManage.adress")}</li> */}
            {/* <li>{t("commandManage.total")}</li> */}
            <li className=" text-center	">
              <button className="rounded-lg bg-light-purple dark:bg-dark-mode-light-purple p-2.5 mt-2">
                {t("commandManage.button")}
              </button>
            </li>
          </ul>
        ))}

      <ul className=" bg-white dark:bg-dark-mode-light-purple text-gold border m-2.5 rounded-2xl p-2.5">
        <li>
          <h3>{t("commandManage.order")}</h3>
        </li>
        <li>{t("commandManage.articles")}</li>
        <li>{t("commandManage.adress")}</li>
        <li>{t("commandManage.total")}</li>
        <li className=" text-center	">
          <button className="rounded-lg bg-light-purple dark:bg-dark-mode-light-purple text-gold p-2.5 mt-2">
            {t("commandManage.buttonShip")}
          </button>
        </li>
      </ul>
    </div>
  );
}
