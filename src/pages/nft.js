import React from "react";
import "./nft.css";
import "../components/NftCard.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllNfts } from "../redux/nfts";
import { Link } from "react-router-dom";

export default function Nft(props) {
  const { id } = useParams();
  const allNfts = useSelector(selectAllNfts);
  const image = allNfts[id];
  const itemDisplay = Number(id) + 1;

  return (
    <div className="col-12">
      <div className="pagebox d-flex flex-column align-items-center col-6 offset-3">
        <h1 className="textred textspaced">Collectible #{itemDisplay}</h1>

        <div className="col-12 d-flex flex-row justify-content-around mt-4 mb-4">
          <div className="card-container-lg shadow-lg">
            <img src={image} className="nft_image" alt="nft_image" />
          </div>

          <div className="nft_details">
            <h4 className="textspaced">Minted: 7/27/2021</h4>
            <h4 className="textspaced">Artist: Dominic Racho</h4>
            <h4 className="textspaced">Power: xxxxxxx</h4>
            <h4 className="textspaced">Weakness: xxxxxxx</h4>
          </div>
        </div>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/shop">
          <button className="menuButton shadow-lg"> Shop </button>
        </Link>
      </div>
    </div>
  );
}
