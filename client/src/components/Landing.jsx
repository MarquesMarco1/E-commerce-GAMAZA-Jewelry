import Header from "./Header";
import { useEffect, useState } from "react";
import localhost from "../config";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

import bague_homepage from '../assets/bague_homepage.PNG'


export default function Accueil() {
  const [category, setCategory] = useState([]);
  // const { id } = useParams();
  // const [product, setProduct] = useState(null);
  // const [error, setError] = useState(null);

  
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
  
//   useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const response = await fetch(`${localhost}/api/products/${id}`);
//       if (response.ok) {
//         const data = await response.json();

//         if (data.products && data.products.length > 0) {
//           setProduct(data.products[0]);
//         } else {
//           setError(new Error("Product not found"));
//         }
//       } else {
//         setError(new Error("Failed to fetch product"));
//       }
//     } catch (err) {
//       setError(err);
//     }
//   };

//   fetchProduct();
// }, [id]);

// if (error)
//   return (
//     <div className="text-center py-4 text-red-500">
//       Error: {error.message}
//     </div>
//   );
// if (!product) return <div className="text-center py-4">No product found</div>;

  return (
      <div>
        <Header></Header>
        <div className="w-full mt-20 flex-col items-center justify-center">
          <ul className="flex justify-evenly">
            {category &&
              category.map((elem) => (
                <Link to={`/category/${elem.id}`}>
                  <li className="flex justify-center font-primary text-gold text-5xl">{elem.name}</li>
                </Link>
              ))}
          </ul>
        </div>
        <div className="space-y-4 flex flex-col items-center ">
        <img 
        src={bague_homepage}
        alt="ring with blue diamond"
        className="mx-auto h-auto w-auto"
        />
        <h1 className="text-gold text-5xl mb-9 text-center font-primary">
          {/* {product.name} */}
          Blue Diamond Engagement Ring
          </h1>
        <p className="text- font-primary">
              Price: <span className="text-green-500 font-primary">$
                {/* {product.price} */}
                1 000
                </span>
            </p>
        </div>
        <p className="text-lg font-semibold font-primary text-center text-black">
        {/* product.description */}
        Blue surrounds us in the natural world. It is the color of the sky, the sea, the pure arctic ice. 
        In western culture blue color evokes rich imagery and is commonly associated with harmony and faithfulness.  
        At G.A.M.A.Z.A .Co we are masters working with colored diamonds. 
        </p>
      </div>
    );
}
