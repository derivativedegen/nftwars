import React, { useState } from "react";
import "./shop.css";
import { Link } from "react-router-dom";
import NftCard from "../components/NftCard";
import { useSelector } from "react-redux";
import { selectShopItems, selectTokenJsons } from "../redux/nfts";
import Nft from "../components/Nft";
import { selectAppChain } from "../redux/network";

export default function Shop(props) {
  const shopItems = useSelector(selectShopItems);
  const tokenJsons = useSelector(selectTokenJsons);

  const [itemNumber, setItemNumber] = useState(undefined);
  const [showItem, setShowItem] = useState(false);

  const displayItem = (id) => {
    setShowItem(!showItem);
    setItemNumber(id);
  };

  return (
    <div className="col-12">
      <div className="d-flex flex-column text-center justify-content-center">
        <h1 className="bomberescort textred textspaced shop-title">NFT Shop</h1>
        <p>Collect all the NFT Wars collectibles to reign supreme leader!</p>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-center col-12 col-md-10 offset-md-1 mt-3">
        {!tokenJsons && <h1 className="textred textspaced">Loading Shop...</h1>}

        {showItem && (
          <Nft
            id={itemNumber}
            json={tokenJsons[itemNumber]}
            displayItem={displayItem}
            price={shopItems[itemNumber].price}
          />
        )}

        {tokenJsons &&
          !showItem &&
          tokenJsons.map((nft, i) => {
            return (
              <NftCard
                key={i}
                name={nft.name}
                image={nft.image}
                artist={nft.artist}
                attributes={nft.attributes}
                id={shopItems[i].tokenId}
                showItem={displayItem}
              />
            );
          })}
      </div>

      <div class="mt-4 d-flex justify-content-center">
        {!showItem && (
          <Link to="/menu">
            <button className="menuButton shadow-lg"> Main Menu </button>
          </Link>
        )}
      </div>
    </div>
  );
}
