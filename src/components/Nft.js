import React from "react";
import { useSelector } from "react-redux";
import { MARKETPLACE_ABI } from "../constants/ABIs";
import { ethers } from "ethers";
import { gateway } from "../constants/constants";
import { selectContractNft, selectContractShop } from "../redux/contracts";

export default function Nft(props) {
  const { id, json, displayItem, price } = props;
  const imageHash = json.image.slice(7);
  const image = gateway + imageHash;
  const artist = json.artist;
  const weakness = json.attributes[0].value;
  const level = json.attributes[1].value;
  const power = json.attributes[2].value;

  const shopContract = useSelector(selectContractShop);
  const nftContract = useSelector(selectContractNft);
  //   console.log(MARKETPLACE_ABI);

  const buyNft = async (id) => {
    const cost = price; // price * amount (for multiple amounts);
    const priceString = cost.toString();
    const priceEther = ethers.utils.parseEther(priceString);
    const gasLimit = 200000; // 200000 * amount (for multiple amounts);

    const options = { gasLimit: gasLimit, value: priceEther };

    try {
      const tx = await shopContract.createMarketSale(
        nftContract.address,
        id,
        options
      );
      const receipt = await tx.wait();
      const hash = receipt.transactionHash;
      console.log(hash);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="col-12">
      <div className="pagebox d-flex flex-column align-items-center col-8 offset-2">
        <div className="col-12 d-flex flex-row justify-content-around mt-4 mb-4">
          <div className="card-container-lg shadow-lg">
            <img src={image} className="nft_image" alt="nft_image" />
          </div>

          <div className="d-flex flex-column">
            <div className="nft_details">
              <h1 className="textred textspaced">Collectible #{id}</h1>
              <h4 className="textspaced">Level: {level}</h4>
              <h4 className="textspaced">Power: {power}</h4>
              <h4 className="textspaced">Weakness: {weakness}</h4>
              <h4 className="textspaced">Artist: {artist}</h4>
            </div>
            <div className="d-flex flex-column align-items-center mt-5">
              <h1 className="textred textspaced">{price} ETH</h1>
              <button onClick={() => buyNft(id)} className="btn-connect">
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <button
          onClick={() => displayItem(undefined)}
          className="menuButton shadow-lg"
        >
          Shop
        </button>
      </div>
    </div>
  );
}
