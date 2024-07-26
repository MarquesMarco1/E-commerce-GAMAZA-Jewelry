import Header from "./Header";
import { useEffect, useState } from "react";
import localhost from "../config";
import { Link } from "react-router-dom";
import Carousel from "./utils/Carousel";
import Search from "./Search";


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
      <div className="mt-20 flex flex-col items-center justify-center">
      <ul className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
      {category && category.map((elem) => (
              <Link to={`/category/${elem.id}`}>
                <li className="flex justify-center items-center font-primary text-gold text-xl md:text-2xl lg:text-3xl xl:text-4xl hover:text-light-purple transition duration-300">
                  {elem.name}
                </li>
              </Link>
            ))}
        </ul>
      </div>

      {/* SEARCH BAR  */}
      <Search />
      {/* CAROUSSELLE */}
      {/* <div className="w-full md:w-3/4 lg:w-1/2 mx-auto"> */}
        <Carousel />
      {/* </div> */}
    </div>
  );
}
