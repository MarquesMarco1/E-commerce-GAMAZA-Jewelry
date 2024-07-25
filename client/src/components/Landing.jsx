import Header from "./Header";
import { useEffect, useState } from "react";
import localhost from "../config";
import { Link } from "react-router-dom";
import Carousel from "./utils/Carousel";
import Footer from "./Footer";


export default function Accueil() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie`);
      if (response.status === 200) {
        const data = await response.json();

        setCategory(data.allCategory);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="w-full mt-20 flex-col items-center justify-center">
        <ul className="flex justify-evenly">
          {category &&
            category.map((elem) => (
              <Link to={`/category/${elem.id}`}>
                <li className="flex justify-center font-primary text-gold text-6xl">{elem.name}</li>
              </Link>
            ))}
        </ul>
      </div>
      {/* CAROUSSELLE */}
      <Carousel />
      <Footer />
    </div>
  );
}
