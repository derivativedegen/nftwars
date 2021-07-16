import React from "react";
import "./shop.css";
import { Link } from "react-router-dom";

export default function Shop(props) {
  return (
    <div className="col-12">
      <div className="d-flex flex-column text-center justify-content-center">
        <h1 className="bomberescort textred textspaced shop-title pb-4">
          NFT Shop
        </h1>
      </div>

      <div className="pagebox d-flex justify-content-center col-12 col-md-10 offset-md-1">
        Test
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}
