import React, { useState } from "react";
import "./trade.css";
import SiteFrame from "../components/siteFrame";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAddress, selectAppChain, selectSigner } from "../redux/network";
import { contractInfo, INFURA_ID } from "../constants/constants";
import { UNI_ABI } from "../constants/ABIs";
import { ethers } from "ethers";
import Web3 from "web3";

function Trade() {
  const appChain = useSelector(selectAppChain);
  const signer = useSelector(selectSigner);
  const address = useSelector(selectAddress);
  let web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  const war = contractInfo.ropsten.war;
  const weth = "0xc778417e063141139fce010982780140aa0cd5ab";

  let uniswap = {};
  if (Object.keys(signer).length > 0) {
    uniswap = new ethers.Contract(
      contractInfo.ropsten.uniswap,
      UNI_ABI,
      signer
    );
  }

  const determineExchange = () => {
    if (appChain === "0x13881" || appChain === "0x89") {
      return "https://quickswap.exchange/#/swap";
    } else {
      return "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x4d75d9e37667a2d4677ec3d74bdd9049326ad8d6";
    }
  };

  const swap = async (amount) => {
    const convertedAmount = web3.utils.toWei(`${amount}`);
    const reserves = await uniswap.getAmountsIn(convertedAmount, [weth, war]);
    const wethReserve = reserves[0].toString();
    const wethNeededPerUnit = web3.utils.fromWei(wethReserve);
    const wethNeeded = wethNeededPerUnit * amount;
    const wethConverted = ethers.utils.parseEther(wethNeeded.toString());

    const options = { gasLimit: 200000, value: wethConverted };
    const swap = await uniswap.swapETHForExactTokens(
      convertedAmount,
      [weth, war],
      address,
      Date.now() + 60000,
      options
    );
    const tx = swap.wait();
    alert(tx);
  };

  const [amount, setAmount] = useState(0);

  return (
    <div className="tradeframe col-xs-12 col-xl-10 offset-xl-1">
      {/* <SiteFrame address={determineExchange()} /> */}
      <div className="d-flex justify-content-center col-6 offset-3">
        <input
          type="number"
          placeholder="5"
          className="stakeclaiminput shadow-lg"
          id="stakeclaiminput"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />
        <button className="btn-connect" onClick={() => swap(amount)}>
          Swap
        </button>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}

export default Trade;
