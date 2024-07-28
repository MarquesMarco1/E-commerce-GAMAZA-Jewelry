import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";

export default function EditProduct() {
  let navigate = useNavigate();
  const { id } = useParams();

  ////////////////
  //  UseState  //
  ////////////////

  const [allCategorie, setAllCategorie] = useState([]);
  const [allMaterial, setAllMaterial] = useState([]);
  const [allStone, setAllStone] = useState([]);
  const [allSize, setAllSize] = useState([]);

  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [colorEN, setColorEN] = useState("");
  const [nom, setNom] = useState("");
  const [nomEN, setNomEN] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [material, setMaterial] = useState("");
  const [stone, setStone] = useState("");
  const [imageAdd, setImageAdd] = useState("");

  useEffect(() => {
    ////////////////////////////////
    //  Check Middleware isAdmin  //
    ////////////////////////////////

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
    /////////////////////////////////////////////////////////////////
    //  Fetch All : Categories, Materials, Stones, Sizes, Product  //
    /////////////////////////////////////////////////////////////////

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

      const response_size = await fetch(`${localhost}/api/size`);

      if (response_size.status === 200) {
        const data_size = await response_size.json();
        setAllSize(data_size.allSize);
      }

      const response_product = await fetch(`${localhost}/api/products/${id}`);
      if (response_product.status === 200) {
        const data_product = await response_product.json();
        setNom(data_product.products[0].name);
        setNomEN(data_product.products[0].nameEn);
        setCategory_id(data_product.products[0].category.id);
        setMaterial(data_product.products[0].material.id);
        setStone(data_product.products[0].stone.id);
        setImage(data_product.products[0].images);
        setColorEN(data_product.products[0].colorEn);
        setColor(data_product.products[0].color);
        setSize(data_product.products[0].sizes.id);
        setWeight(data_product.products[0].weight);
        setPrice(data_product.products[0].price);
        setStockQty(data_product.products[0].stockQty);
        setDescription(data_product.products[0].description);
        setDescriptionEN(data_product.products[0].descriptionEn);
      }
    };
    fetchData();
  }, []);

  ///////////////////////////////////
  //  handelSubmit : Edit Product  //
  ///////////////////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category_id: parseInt(category_id),
      material_id: parseInt(material),
      stone_id: parseInt(stone),
      image: imageAdd ? [imageAdd] : null,
      color: color,
      colorEn: colorEN,
      nom: nom,
      nomEn: nomEN,
      size: size,
      weight: weight,
      price: price,
      stockQty: stockQty,
      description: description,
      descriptionEn: descriptionEN,
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

  //////////////////////////////////////
  //  deleteImage : Delete One Image  //
  //////////////////////////////////////

  const deleteImage = async (elem) => {
    console.log(elem);
    const response = await fetch(`${localhost}/api/deleteImage/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageURL: elem }),
    });
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      setImage(data.image);
    }
  };

  return (
    <>
      <Header></Header>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        {/* Name FR*/}

        <label for="nom">Product nom FR</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nom"
          id="nom"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        {/* Name EN*/}

        <label for="nom">Product name EN</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nomEn"
          id="nomEn"
          placeholder="Name"
          required
          value={nomEN}
          onChange={(e) => setNomEN(e.target.value)}
        />

        {/* Categories */}

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

        {/* Materials */}

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

        {/* Stones */}

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

        {/* Sizes */}

        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="size"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">--Please choose a Size--</option>
          {allSize &&
            allSize.map((elem) => <option value={elem.id}>{elem.name}</option>)}
        </select>

        {/* Images */}

        <label for="image">image link</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="image"
          id="image"
          placeholder="Image"
          value={imageAdd}
          onChange={(e) => setImageAdd(e.target.value)}
        />
        <ul className="flex">
          {image &&
            image.map((elem) => (
              <li className="text-center">
                <img
                  className="max-w-full max-h-80 cursor-pointer"
                  src={elem}
                  alt={elem}
                />
                <span
                  className="cursor-pointer	"
                  onClick={() => deleteImage(elem)}
                >
                  X
                </span>
              </li>
            ))}
        </ul>

        {/* Color FR*/}

        <label for="color">color FR</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        {/* Color EN*/}

        <label for="color">color EN</label>
        <input
          className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          required
          value={colorEN}
          onChange={(e) => setColorEN(e.target.value)}
        />

        {* Size */}
        <label for="size">Size</label>
        <input
          className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="size"
          id="size"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}

        {/* Weight */}

        <label for="weight">weight</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight"
          step="0.01"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        {/* Price */}

        <label for="price">price</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Stock Quantity */}

        <label for="stockQty">stockQty</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="stockQty"
          id="stockQty"
          placeholder="StockQty"
          value={stockQty}
          onChange={(e) => setStockQty(e.target.value)}
        />

        {/* Description */}

        <label for="content">description FR</label>
        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder="Description EN"
          required
          value={descriptionEN}
          onChange={(e) => setDescriptionEN(e.target.value)}
        ></textarea>

        {/* Submit Button */}

        <button type="submit" id="submit">
          Edit the product
        </button>
      </form>

      <Footer></Footer>
    </>
  );
}
