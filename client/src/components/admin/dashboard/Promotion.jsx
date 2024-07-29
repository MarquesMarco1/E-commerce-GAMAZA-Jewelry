import { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../../Header";
import localhost from "../../../config";
import { useNavigate } from "react-router-dom";

export default function Promotion() {
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [pourcentage, setPourcentage] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.allArticle);
      }
    };
    fetchData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!pourcentage || !productSelected) {
      setError("invalide");
      return;
    }
    const formData = {
      product: productSelected,
      pourcentage: pourcentage,
    };
    const response = await fetch(`${localhost}/api/addPromotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.ok) {
      navigate(`/admin`, { replace: true });
    }
  };
  return (
    <>
      <Header></Header>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
          Add an promotion{" "}
        </h1>
        <label htmlFor="">Select product </label>
        {products &&
          products.map((elem) => (
            <div
              key={elem.id}
              className="flex flex-col justify-between h-full bg-white border border-gold rounded-lg p-5 shadow-lg"
            >
              <img
                src={elem.images}
                alt={elem.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="font-primary text-gold text-2xl mt-4">
                {elem === "FR" ? elem.name : elem.nameEn}
              </h3>
              <p className="font-primary text-black text-lg">
                {elem === "FR" ? elem.description : elem.descriptionEn}
              </p>
              <p className="font-bold font-primary text-black">${elem.price}</p>
              <button
                className="mt-4 w-full bg-light-purple text-black border border-black py-2 rounded-lg hover:bg-gold transition duration-300"
                onClick={() => setProductSelected(elem.id)}
              >
                Add
              </button>
            </div>
          ))}

        <label htmlFor="">Pourcentage</label>
        <select
          name=""
          id=""
          className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          onChange={(e) => setPourcentage(e.target.value)}
        >
          <option value="" disabled>
            --Choose an pourcentage--
          </option>
          <option value="20">20%</option>
          <option value="30">30%</option>
          <option value="40">40%</option>
        </select>
      </form>
      {error && <p>{error}</p>}
      <Footer></Footer>
    </>
  );
}
