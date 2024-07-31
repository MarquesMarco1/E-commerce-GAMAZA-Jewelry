import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ModeleProduct(data) {
  const [modele, setModele] = useState([]);
  useEffect(() => {
    setModele(data.data);
  }, [data]);
  return (
    <div>
      <h1>Personnaliser son bijoux :</h1>
      {modele &&
        modele.map((elem) => (
          <>
            <p>Couleur : {elem.material.name}</p>
            <Link to={`/product/${elem.id}`}>
              <img
                className={`w-20 h-20 cursor-pointer border-2`}
                src={elem.images}
                alt={elem.images}
              />
            </Link>
          </>
        ))}
    </div>
  );
}
