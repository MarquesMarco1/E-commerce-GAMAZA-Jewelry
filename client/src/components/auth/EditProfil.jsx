import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import localhost from "../../config";
import Header from "../Header";
import Footer from "../Footer";

export default function EditProfil() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/user/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setEmail(data.user.email);
        setAdress(data.user.adress);
        setZipcode(data.user.zIPCode);
        setCity(data.user.city);
        setCountry(data.user.country);
        setPhone("0" + data.user.phoneNumber);
      }
    };
    fetchData();
  }, [id]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password ? password : null,
      lastname: lastname,
      firstname: firstname,
      adress: adress,
      zipCode: zipCode,
      city: city,
      country: country,
      phone: phone,
    };
    const response = await fetch(`${localhost}/api/editUser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.status === 200) {
      navigate("/profile", { replace: true });
    }
  };
  return (
    <>
      <Header></Header>
      <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
        Create a product
      </h1>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Firstname"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Lastname"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="password"
          name="password"
          id="password"
          //   required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="adress"
          id="adress"
          required
          placeholder="Adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="zipCode"
          id="zipCode"
          required
          placeholder="ZipCode"
          value={zipCode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="city"
          id="city"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="country"
          id="country"
          required
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="phone"
          id="phone"
          required
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" id="submit">
          Edit
        </button>
      </form>
      <Footer></Footer>
    </>
  );
}
