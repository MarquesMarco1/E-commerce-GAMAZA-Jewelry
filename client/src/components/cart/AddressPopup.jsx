import React, { useState, useEffect } from "react";

export default function AddressPopup({
  displayAdressPopup,
  onClose,
  onSave,
  initialData = {},
}) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [name, setName] = useState(initialData.name || "");
  const [company, setCompany] = useState(initialData.company || "");
  const [street1, setStreet1] = useState(initialData.street1 || "");
  const [city, setCity] = useState(initialData.city || "");
  const [state, setState] = useState(initialData.state || "");
  const [zip, setZip] = useState(initialData.zip || "");
  const [country, setCountry] = useState(initialData.country || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");

  useEffect(() => {
    const storedAddresses =
      JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setSavedAddresses(storedAddresses);
  }, []);

  useEffect(() => {
    if (selectedAddressIndex !== null && selectedAddressIndex !== "") {
      const address = savedAddresses[selectedAddressIndex];
      setName(address.name);
      setCompany(address.company);
      setStreet1(address.street1);
      setCity(address.city);
      setState(address.state);
      setZip(address.zip);
      setCountry(address.country);
      setPhone(address.phone);
      setEmail(address.email);
    } else {
      setName("");
      setCompany("");
      setStreet1("");
      setCity("");
      setState("");
      setZip("");
      setCountry("");
      setPhone("");
      setEmail("");
    }
  }, [selectedAddressIndex, savedAddresses]);

  const handleSave = () => {
    const address = {
      name,
      company,
      street1,
      city,
      state,
      zip,
      country,
      phone,
      email,
    };

    const updatedAddresses = [...savedAddresses];
    if (selectedAddressIndex !== null && selectedAddressIndex !== "") {
      updatedAddresses[selectedAddressIndex] = address;
    } else {
      updatedAddresses.push(address);
    }

    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    onSave(address);
    onClose();
  };

  if (!displayAdressPopup) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Delivery & Billing Address</h1>
      {savedAddresses.length > 0 && (
        <div className="m-4">
          <label>
            Select an address:
            <select
              className="ml-4 bg-grey"
              onChange={(e) => setSelectedAddressIndex(e.target.value)}
              value={selectedAddressIndex || ""}
            >
              <option value="">Choose Address</option>
              {savedAddresses.map((address, index) => (
                <option key={index} value={index}>
                  {`${address.name}, ${address.country}, ${address.zip}, ${address.state}, ${address.city}, ${address.street1}`}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <label className="m-4">
        Name:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <label className="m-4">
        Email:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <label className="m-4">
        Phone:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label className="m-4">
        Company:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>
      <label className="m-4">
        Country:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <label className="m-4">
        ZIP:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <label className="m-4">
        State:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <label className="m-4">
        City:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <label className="m-4">
        Street 1:
        <input
          className="ml-4 bg-grey"
          type="text"
          value={street1}
          onChange={(e) => setStreet1(e.target.value)}
          placeholder="required"
          required
        />
      </label>
      <button onClick={handleSave}>Confirm</button>
    </div>
  );
}
