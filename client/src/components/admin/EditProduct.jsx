import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import Header from "../Header";
import Footer from "../Footer";

export default function EditProduct() {
  const [allCategorie, setAllCategorie] = useState([]);
  const [allMaterial, setAllMaterial] = useState([]);
  const [allStone, setAllStone] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [nom, setNom] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [stone, setStone] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchIsAdmin = async () => {
      const email = localStorage.getItem("user");
      const response = await fetch(`${localhost}/api/isAdmin/${email}`);
      if (response.status === 200) {
        const data = await response.json();
        if (data.isAdmin) {
          fetchData();
        } else {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    };
    fetchIsAdmin();
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie`);
      if (response.status === 200) {
        const data = await response.json();
        setAllCategorie(data.allCategory);
      }
      const response_material = await fetch(`${localhost}/api/material`);
      if (response_material.status === 200) {
        const data_material = await response_material.json();
        setAllMaterial(data_material.allMaterial);
      }
      const response_stone = await fetch(`${localhost}/api/stone`);
      if (response_stone.status === 200) {
        const data_stone = await response_stone.json();
        setAllStone(data_stone.allStone);
      }
      const response_product = await fetch(`${localhost}/api/products/${id}`);
      if (response_product.status === 200) {
        const data_product = await response_product.json();
        setNom(data_product.products[0].name);
        setCategory_id(data_product.products[0].category.id);
        setMaterial(data_product.products[0].material.id);
        setStone(data_product.products[0].stone.id);
        setImage(data_product.products[0].image);
        setColor(data_product.products[0].color);
        setSize(data_product.products[0].size);
        setWeight(data_product.products[0].weight);
        setPrice(data_product.products[0].price);
        setStockQty(data_product.products[0].stockQty);
        setDescription(data_product.products[0].description);
      }
    };
    fetchData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category_id: parseInt(category_id),
      material_id: parseInt(material),
      stone_id: parseInt(stone),
      image: image,
      color: color,
      nom: nom,
      size: size,
      weight: weight,
      price: price,
      stockQty: stockQty,
      description: description,
    };
    const response = await fetch(`${localhost}/api/editProduct/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.status === 200) {
      const data = await response.json();
      navigate("/admin", { replace: true });
    }
  };
  return (
    <>
      <Header></Header>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        <label for="nom">Product name</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nom"
          id="nom"
          placeholder="Nom"
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label for="categorie">Choose a category:</label>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="cat"
          id="categorie"
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          {allCategorie &&
            allCategorie.map((elem) => (
              <option value={elem.id}>{elem.name}</option>
            ))}
        </select>

        <label for="material">Choose a material:</label>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="material"
          id="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          {allMaterial &&
            allMaterial.map((elem) => (
              <option value={elem.id}>{elem.name}</option>
            ))}
        </select>
        <label for="stone">Choose a stone:</label>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="stone"
          id="stone"
          value={stone}
          onChange={(e) => setStone(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          {allStone &&
            allStone.map((elem) => (
              <option value={elem.id}>{elem.name}</option>
            ))}
        </select>
        <label for="image">image link</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="image"
          id="image"
          placeholder="Image"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label for="color">color</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label for="size">size</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="size"
          id="size"
          placeholder="Size"
          required
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <label for="weight">weight</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight"
          step="0.01"
          required
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <label for="price">price</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          required
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label for="stockQty">stockQty</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="stockQty"
          id="stockQty"
          placeholder="StockQty"
          required
          value={stockQty}
          onChange={(e) => setStockQty(e.target.value)}
        />
        <label for="content">description</label>
        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" id="submit">
          Edit the product
        </button>
      </form>

      <Footer></Footer>
    </>
  );
}
