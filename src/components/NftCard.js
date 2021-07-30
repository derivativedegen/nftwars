import React from "react";
import "./NftCard.css";
import { Link } from "react-router-dom";
import { gateway } from "../constants/constants";

export default function Nftcard(props) {
  const { name, image, artist, attributes, id, showItem } = props;
  const imageHash = image.slice(7);
  const imagePull = gateway + imageHash;

  return (
    <div
      className="card-container shadow-lg clickable"
      onClick={() => showItem(id)}
    >
      <img src={imagePull} className="nft_image" alt="" />
      {/* <div className="info_button">
        <button onClick={() => showItem(id)} className="purchase">
          INFO
        </button>
      </div> */}
    </div>
  );
}
