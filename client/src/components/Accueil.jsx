import logo from "../logo.svg";
import { Link } from "react-router-dom";
import localhost from "../config";
import { useEffect, useState } from "react";

export default function Accueil() {
  const [allProduct, setAllProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/products`);
      if(response.status === 200){
        // console.log(data);
        const data = await response.json();
        setAllProduct(data.allArticle);
      }
    };
    fetchData();
  }, [refresh]);

  const deleteProduct = async (id) => {
    const response = await fetch(`${localhost}/api/delete/${id}`);
    const data = await response.json();
    if (data.success) {
      setRefresh(true);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {allProduct &&
            allProduct.map((elem) => (
              <li>
                {elem.name} <button>Edit</button>
                <button onClick={() => deleteProduct(elem.id)}>Delete</button>
              </li>
            ))}
        </ul>
        <Link to={`/createArticle`}>Ajouter un produit</Link>
        <Link to={`/createCategory`}>Ajouter une categorie</Link>
        <Link to={`/register`}>S'inscrire</Link>
      </header>
    </div>
  );
}
