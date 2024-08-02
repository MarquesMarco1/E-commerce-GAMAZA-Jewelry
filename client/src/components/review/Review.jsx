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

  return (
    <>
      <div className="mb-4">
        <h2>{t("reviewPage.filter")}</h2>
        <select
          onChange={(e) => setNote(e.target.value)}
          onClick={handleSortNote}
        >
          <option value={0}>0</option>
          {stars.map((elem) => (
            <option value={elem}>
              {elem} {t("reviewPage.stars")}
            </option>
          ))}
        </select>
        <select onClick={(e) => handleSort(e.target.value)}>
          <option value=""> {t("reviewPage.date")}</option>
          <option value="desc">{t("reviewPage.desc")}</option>
          <option value="acs">{t("reviewPage.asc")}</option>
        </select>
      </div>
      {reviews.length > 0 &&
        reviews.map((elem) => (
          <ul className="mb-4">
            <li>
              {elem.stars} {t("reviewPage.stars")}
            </li>
            <li>{elem.user.email}</li>
            <li>{date(elem.publication)}</li>
            <li>{elem.description}</li>
          </ul>
        ))}
    </>
  );
}
