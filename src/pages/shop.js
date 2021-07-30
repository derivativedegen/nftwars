import React, { useState, useEffect } from "react";
import "./shop.css";
import { Link } from "react-router-dom";
import NftCard from "../components/NftCard";
import { useSelector } from "react-redux";
import { selectShopItems, selectTokenJsons } from "../redux/nfts";
import Nft from "../components/Nft";
import { selectUserChain } from "../redux/network";

export default function Shop(props) {
  const shopItems = useSelector(selectShopItems);
  const tokenJsons = useSelector(selectTokenJsons);
  const userChain = useSelector(selectUserChain);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (userChain === "0x3") {
      // CHANGE TO MAINNET FOR MARKETPLACE LAUNCH
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, [userChain]);

  const [itemId, setItemId] = useState(undefined);
  const [itemNumber, setItemNumber] = useState(undefined);
  const [showItem, setShowItem] = useState(false);

  const displayItem = (key, id) => {
    setShowItem(!showItem);
    setItemId(id);
    setItemNumber(key);
  };

  return (
    <div className="col-12">
      <div className="d-flex flex-column text-center justify-content-center">
        <h1 className="bomberescort textred textspaced shop-title">Shop</h1>
        <p>Collect all the NFT Wars pieces to reign supreme leader!</p>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-center col-12 col-md-10 offset-md-1 mt-3">
        {!tokenJsons && <h1 className="textred textspaced">Loading Shop...</h1>}

        {warning && (
          <div className="d-flex flex-column align-items-center mt-3 mb-3">
            <h1 className="textred text-center">
              The NFT Wars Shop is only available on Ropsten Network.
              {/* CHANGE FOR MARKETPLACE LAUNCH */}
            </h1>

            <Link to="/network">
              <button className="btn-disconnect">Change Network</button>
            </Link>
          </div>
        )}

        {showItem && (
          <Nft
            id={itemId}
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
                number={i}
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
