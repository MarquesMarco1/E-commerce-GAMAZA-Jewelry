import { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import localhost from "../../config";

export default function CreadArticle() {
  const [allCategorie, setAllCategorie] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [nom, setNom] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie`);
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setAllCategorie(data.allCategory);
      }
    };
    fetchData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category_id: parseInt(category_id),
      image: image,
      color: color,
      nom: nom,
      size: size,
      weight: weight,
      price: price,
      stockQty: stockQty,
      description: description,
    };
    const response = await fetch(`${localhost}/api/admin/addArticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    console.log(response);
    if (response.status === 200) {
      navigate("/", { replace: true });
    }
  };
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handelSubmit}
    >
      <label for="nom">Product name</label>
      <input
        type="text"
        name="nom"
        id="nom"
        placeholder="Nom"
        required
        onChange={(e) => setNom(e.target.value)}
      />
      <label for="categorie">Choose a category:</label>
      <select
        name="cat"
        id="categorie"
        onChange={(e) => setCategory_id(e.target.value)}
      >
        <option value="">--Please choose an option--</option>
        {allCategorie &&
          allCategorie.map((elem) => (
            <option value={elem.id}>{elem.name}</option>
          ))}
      </select>
      <label for="image">imageLien</label>
      <input
        type="text"
        name="image"
        id="image"
        placeholder="Image"
        required
        onChange={(e) => setImage(e.target.value)}
      />
      <label for="color">color</label>
      <input
        type="text"
        name="color"
        id="color"
        placeholder="Color"
        required
        onChange={(e) => setColor(e.target.value)}
      />
      <label for="size">size</label>
      <input
        type="text"
        name="size"
        id="size"
        placeholder="Size"
        required
        onChange={(e) => setSize(e.target.value)}
      />
      <label for="weight">weight</label>
      <input
        type="text"
        name="weight"
        id="weight"
        placeholder="Weight"
        required
        onChange={(e) => setWeight(e.target.value)}
      />
      <label for="price">price</label>
      <input
        type="text"
        name="price"
        id="price"
        placeholder="Price"
        required
        onChange={(e) => setPrice(e.target.value)}
      />
      <label for="stockQty">stockQty</label>
      <input
        type="text"
        name="stockQty"
        id="stockQty"
        placeholder="StockQty"
        required
        onChange={(e) => setStockQty(e.target.value)}
      />
      <label for="content">description</label>
      <textarea
        name="content"
        id="content"
        placeholder="Description"
        required
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit" id="submit">
        Creer un article
      </button>
    </form>
  );
}
