import { Link } from "react-router-dom";
import localhost from "../config";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/products/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {products.length > 0 ? (
            products.map((elem) => (
              <Link to={`/product/${elem.id}`}>
                <li>
                  <img
                    style={{ maxWidth: "25%" }}
                    src={elem.image}
                    alt="logo"
                  />
                </li>
              </Link>
            ))
          ) : (
            <p>No products yet</p>
          )}
        </ul>
      </header>
    </div>
  );
}
