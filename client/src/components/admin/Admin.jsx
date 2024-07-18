import { useState, useEffect } from "react";
import localhost from "../../config";
import { Link } from "react-router-dom";

export default function Admin() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/products`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setProducts(data.allArticle);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to={`/createArticle`}>Ajouter un produit</Link>
      <Link to={`/createCategory`}>Ajouter une categorie</Link>
      {products.length > 0 && products.map((elem) => <p>{elem.name}</p>)}
    </div>
  );
}
