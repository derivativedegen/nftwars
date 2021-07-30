import React, { useState } from "react";
import "./shop.css";
import { Link } from "react-router-dom";
import NftCard from "../components/NftCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setShopItems,
  selectShopItems,
  setFolderHash,
  selectFolderHash,
  setTokenJsons,
  selectTokenJsons,
} from "../redux/nfts";
import { selectContractNft, selectContractShop } from "../redux/contracts";
import { useEffect } from "react/cjs/react.development";
import { getShopItems } from "../helpers/getShopItems";
import { getAllTokenJsons } from "../helpers/getAllTokenJsons";
import Nft from "../components/Nft";

export default function Shop(props) {
  const dispatch = useDispatch();
  const nftContract = useSelector(selectContractNft);
  const shopContract = useSelector(selectContractShop);
  const shopItems = useSelector(selectShopItems);
  const hash = useSelector(selectFolderHash);
  const tokenJsons = useSelector(selectTokenJsons);

  const [itemNumber, setItemNumber] = useState(undefined);
  const [showItem, setShowItem] = useState(false);

  // Get Shop Items
  useEffect(() => {
    if (Object.keys(shopContract).length > 0) {
      const getItems = async () => {
        const items = await getShopItems(shopContract);
        dispatch(setShopItems(items));
      };
      getItems();
    }
  }, [shopContract]);

  // Get IFS Folder Hash
  useEffect(() => {
    if (Object.keys(nftContract).length > 0) {
      const getFolderHash = async () => {
        const itemHash = await nftContract.tokenURI(0);
        const folderHash = itemHash.slice(7, 53);
        dispatch(setFolderHash(folderHash));
      };
      getFolderHash();
    }
  }, [nftContract]);

  // Get Token JSONs
  useEffect(() => {
    if (Object.keys(nftContract).length > 0) {
      const getTokenJsons = async () => {
        const shopTokens = shopItems.map((item) => {
          return item.tokenId;
        });
        const tokenJsons = await getAllTokenJsons(hash, shopTokens);
        console.log(tokenJsons);
        dispatch(setTokenJsons(tokenJsons));
      };
      getTokenJsons();
    }
  }, [nftContract, hash]);

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
        {showItem && (
          <Nft
            id={itemNumber}
            json={tokenJsons[itemNumber]}
            displayItem={displayItem}
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
