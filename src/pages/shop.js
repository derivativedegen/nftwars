import React from "react";
import "./shop.css";
import { Link } from "react-router-dom";
import NftCard from "../components/NftCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNfts } from "../redux/nfts";

export default function Shop(props) {
  const images = useSelector(selectAllNfts);

  return (
    <div className="col-12">
      <div className="d-flex flex-column text-center justify-content-center">
        <h1 className="bomberescort textred textspaced shop-title">NFT Shop</h1>
        <p>Collect all the NFT Wars collectibles to reign supreme leader!</p>
      </div>

      <div className="pagebox d-flex flex-row flex-wrap justify-content-center col-12 col-md-10 offset-md-1 mt-3">
        {images.map((nft, i) => {
          return <NftCard key={i} image={nft} id={i} />;
        })}
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}
