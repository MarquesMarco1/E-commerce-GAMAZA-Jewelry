import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import localhost from "../../config";
import { LanguageContext } from "../../LanguageContext";
import { useTranslation } from "react-i18next";

export default function Review(data) {
  const [reviews, setReviews] = useState([]);
  const [note, setNote] = useState(0);
  const [id, setId] = useState("");
  const stars = [1, 2, 3, 4, 5];
  const { t } = useTranslation();

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setReviews(data.data.reviews);
    setId(data.data.id);
  }, [data, language]);

  const date = (elem) => {
    const date = new Date(elem);
    return format(date, "dd-MM-yyyy HH:mm:ss", { locale: fr });
  };

  const handleSortNote = async () => {
    const response = await fetch(`${localhost}/api/filterReview/${note}`);
    if (response.ok) {
      const data = await response.json();
      setReviews(data.reviews);
    }
  };

  const handleSort = async (elem) => {
    if (elem !== "") {
      const response = await fetch(
        `${localhost}/api/reviewASCDESC/${elem}/${parseInt(id)}`
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      }
    }
  };

    <div className="mb-4">
      <h2 className="text-gold font-primary font-bold text-lg mb-2">
        {t("reviewPage.filter")}
      </h2>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <select
          className="dark:bg-dark-mode-light-purple text-gold p-2 rounded"
          onChange={(e) => setNote(e.target.value)}
          onClick={handleSortNote}
        >
          <option value={0}>0</option>
          {stars.map((elem) => (
            <option key={elem} value={elem}>
              {elem} {t("reviewPage.stars")}
            </option>
          ))}
        </select>
        <select
          className="dark:bg-dark-mode-light-purple dark:text-gold p-2 rounded"
          onClick={(e) => handleSort(e.target.value)}
        >
          <option value="">{t("reviewPage.date")}</option>
          <option value="desc">{t("reviewPage.desc")}</option>
          <option value="asc">{t("reviewPage.asc")}</option>
        </select>
      </div>
    </div>
    {reviews.length > 0 && (
      <div className="space-y-4">
        {reviews.map((elem) => (
          <div
            key={elem.id}
            className="p-4 border rounded-lg dark:border-dark-mode-light-purple text-gold"
          >
            <ul className="space-y-2">
              <li className="font-primary font-bold text-gold">
                {elem.stars} {t("reviewPage.stars")}
              </li>
              <li className="text-sm text-gold font-primary">{elem.user.email}</li>
              <li className="text-sm text-gold font-primary">{date(elem.publication)}</li>
              <li className="text-base font-primary">{elem.description}</li>
            </ul>
          </div>
        ))}
    </div>
  )}
}
