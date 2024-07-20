import { Link } from "react-router-dom";
import localhost from "../config";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/category/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setName(data.products[0].category.name);
        setProducts(data.products);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header></Header>
      <ul className="flex">
        <li>
          <Link to={`/`}>Homepage</Link>
        </li>
        <li> / </li>
        {name && <li>{name}</li>}
      </ul>
      <h1 className="text-gold text-center	text-5xl mb-9	">{name && name}</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: 10,
          marginBottom: "1rem",
          marginLeft: "5rem",
          marginRight: "5rem",
        }}
      >
        {products.length > 0 ? (
          products.map((elem) => (
            <Link to={`/product/${elem.id}`}>
              <li
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  borderStyle: "solid",
                  width: "auto",
                }}
              >
                <img style={{ maxWidth: "30%" }} src={elem.image} alt="logo" />
              </li>
            </Link>
          ))
        ) : (
          <p>No products yet</p>
        )}
      </ul>
      <Footer></Footer>
    </>
  );
}
