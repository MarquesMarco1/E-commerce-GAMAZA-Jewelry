import { useState, useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import localhost from "../../config";

export default function CreateCategory() {
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  let navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(categorie, description, image);
    const formData = {
      nom: categorie,
      description: description,
      image: image,
    };
    const response = await fetch(`${localhost}/api/admin/addCategorie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.status === 200) {
      navigate(`/createArticle`, { replace: true });
    }
  };
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handelSubmit}
    >
      <label for="categorie">categorie</label>
      <input
        type="text"
        name="nom"
        id="categorie"
        placeholder="Nom"
        required
        onChange={(e) => setCategorie(e.target.value)}
      />
      <label for="image">imageLien</label>
      <input
        type="text"
        name="image"
        id="image"
        placeholder="Image"
        required
        onChange={(e) => setImage(e.target.value)}
      />
      <label for="description">description</label>
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        required
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input type="submit" value="Creer la categorie" />
    </form>
  );
}
