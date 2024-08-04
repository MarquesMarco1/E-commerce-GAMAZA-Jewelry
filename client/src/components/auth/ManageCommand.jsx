import { useTranslation } from "react-i18next";

export default function ManageCommand() {
  const { t } = useTranslation();
  return (
    <div>
      <ul className=" bg-white dark:bg-dark-mode-light-purple text-gold border m-2.5 rounded-2xl p-2.5">
        <li>
          <h3>{t("commandManage.order")}</h3>
        </li>
        <li>{t("commandManage.articles")}</li>
        <li>{t("commandManage.adress")}</li>
        <li>{t("commandManage.total")}</li>
        <li className=" text-center	">
          <button className="rounded-lg bg-light-purple dark:bg-dark-mode-light-purple p-2.5 mt-2">
            {t("commandManage.button")}
          </button>
        </li>
      </ul>
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
