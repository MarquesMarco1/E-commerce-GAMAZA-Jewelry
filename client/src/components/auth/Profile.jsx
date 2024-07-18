import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localhost from "../../config";
import Header from "../Header";
export default function Profile() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header></Header>
    </div>
  );
}
