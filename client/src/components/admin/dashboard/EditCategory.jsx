import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";

export default function EditCategory() {
  let navigate = useNavigate();

  ////////////////
  //  UseState  //
  ////////////////

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

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
    /////////////////////////////////////////////////
    //  Fetch All : Categories, Materials, Stones  //
    /////////////////////////////////////////////////

    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/TrueCategory/${id}`);

      if (response.status === 200) {
        const data = await response.json();

        setName(data.category[0].name);
        setImage(data.category[0].image);
        setDescription(data.category[0].description);
      }
    };
    fetchData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      image: image,
      description: description,
    };
    const response = await fetch(`${localhost}/api/editCategory/${id}`, {
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
        <label for="nom">Category name</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nom"
          id="nom"
          placeholder="Nom"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label for="content">description</label>
        <textarea
          className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" id="submit">
          Edit the category
        </button>
      </form>

      <Footer></Footer>
    </>
  );
}
