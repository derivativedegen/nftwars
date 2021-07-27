import React from "react";
import "./NftCard.css";
import { Link } from "react-router-dom";

export default function Nftcard(props) {
  const { image, id } = props;

  return (
    <div className="card-container shadow-lg">
      <img src={image} className="nft_image" alt="" />
      <div className="info_button">
        <Link to={`/nft/${id}`}>
          <button className="purchase">INFO</button>
        </Link>
      </div>
    </div>
  );
}
