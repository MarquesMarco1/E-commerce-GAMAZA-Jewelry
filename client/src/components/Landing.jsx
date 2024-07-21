import Header from "./Header";
import { useEffect, useState } from "react";
import localhost from "../config";
import { Link } from "react-router-dom";
import bague_homepage from '../assets/bague_homepage.PNG'


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
        <div className="w-full mt-20 flex">
          <ul className="flex justify-around">
            {category &&
              category.map((elem) => (
                <Link to={`/category/${elem.id}`}>
                  <li className="flex justify-center font-primary text-gold text-5xl">{elem.name}</li>
                </Link>
              ))}
          </ul>
        </div>
        <img 
        src={bague_homepage}
        alt="ring with blue diamond"
        className="mx-auto h-auto w-auto"
        />

      </div>
    );
}
