import { useEffect, useState } from "react";
import localhost from "../../config";
import { useTranslation } from "react-i18next";
import Review from "./Review";

export default function ReviewForm(data) {
  const [id, setId] = useState("");
  const [review, setReview] = useState("");
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState([]);
  const stars = [1, 2, 3, 4, 5];
  const { t } = useTranslation();

  useEffect(() => {
    setId(data.id);
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/review/${id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      }
    };
    fetchData();
  }, [data]);

  const setStar = (index) => {
    setSelectedStar(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("user");
    const formData = {
      selectedStar: selectedStar,
      review: review,
      product: parseInt(id),
      user: email,
    };

    const response = await fetch(`${localhost}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.ok) {
      setSelectedStar(0);
      setReview("");
      const data = await response.json();
      setReviews(data.reviews);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{t("reviewPage.title")}</h1>
        <div className="flex">
          {stars.map((elem) =>
            elem <= (hoveredStar || selectedStar) ? (
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHoveredStar(elem)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setStar(elem)}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M7.62951 40L10.911 25.2067L0 15.261L14.3725 13.9524L20.0013 0L25.6302 13.9496L40 15.2582L29.089 25.204L32.3731 39.9972L20.0013 32.1453L7.62951 40Z"
                  fill="#BF9553"
                />
              </svg>
            ) : (
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHoveredStar(elem)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setStar(elem)}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M11.6652 34.1584L20.0013 28.8682L28.3374 34.228L26.1542 24.2044L33.4979 17.5219L23.8386 16.617L20.0013 7.15022L16.1641 16.5474L6.5048 17.4523L13.8485 24.2044L11.6652 34.1584ZM7.62951 40L10.911 25.2067L0 15.261L14.3725 13.9524L20.0013 0L25.6302 13.9496L40 15.2582L29.089 25.204L32.3731 39.9972L20.0013 32.1453L7.62951 40Z"
                  fill="#BF9553"
                />
              </svg>
            )
          )}
        </div>
        <textarea
          className="border border-solid border-slate-500 w-96 p-2.5 rounded-xl mb-4"
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button>{t("reviewPage.button")}</button>
      </form>
      <div className="border border-gray-300"></div>
      <Review data={{ reviews: reviews, id: id }} />
    </>
  );
}