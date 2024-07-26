import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";

export default function CreateCategory() {
  let navigate = useNavigate();

  ////////////////
  //  UseState  //
  ////////////////

  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {

    ////////////////////////////////
    //  Check Middleware isAdmin  //
    ////////////////////////////////

    fetchIsAdmin();

    const fetchIsAdmin = async () => {
      const email = localStorage.getItem("user");

      const response = await fetch(`${localhost}/api/isAdmin/${email}`);

      if (response.status === 200) {
        const data = await response.json();

        if (data.isAdmin === false) {
          navigate("/", { replace: true });
        };

      } else {
        navigate("/", { replace: true });
      }
    };
  }, []);

  ////////////////////
  //  HandleSubmit  //
  ////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();

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
    <>
      <Header></Header>
      <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
        Create a category
      </h1>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >

        {/* Name */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nom"
          id="categorie"
          placeholder="Categorie name"
          required
          onChange={(e) => setCategorie(e.target.value)}
        />

        {/* Images */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl  mb-4"
          type="text"
          name="image"
          id="image"
          placeholder="Image"
          required
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Description */}

        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl  mb-4"
          name="description"
          id="description"
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Submit */}

        <input type="submit" value="Create a category" />
      </form>
      <Footer></Footer>
    </>
  );
}
