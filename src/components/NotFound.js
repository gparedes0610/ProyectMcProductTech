import React from "react";
import Nofunciona from "../assets/404notfound.webp";
export default function NotFound() {
  return (
    <div className="container py-3 d-flex justify-content-center">
      <img src={Nofunciona} alt="" className="w-75" />
    </div>
  );
}
