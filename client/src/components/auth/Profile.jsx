import { useEffect } from "react";
import { Link } from "react-router-dom";
import localhost from "../../config";

export default function Profile() {
  const email = "alice@gmail.com";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/isAdmin/${email}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Link to={`/createArticle`}>Ajouter un produit</Link>
      <Link to={`/createCategory`}>Ajouter une categorie</Link>
    </>
  );
}
