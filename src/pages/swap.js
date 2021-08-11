import React, { useState } from "react";
import "./swap.css";
import SiteFrame from "../components/siteFrame";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddress,
  selectAppChain,
  selectSigner,
  selectTesting,
} from "../redux/network";
import { contractInfo, INFURA_ID } from "../constants/constants";
import { UNI_ABI } from "../constants/ABIs";
import { ethers } from "ethers";
import Web3 from "web3";
import { toggleLoading } from "../redux/transaction";

function Trade({ getTokenBalances }) {
  const dispatch = useDispatch();
  const testing = useSelector(selectTesting);
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
    if (amount <= 0) {
      alert("Please enter a number greater than 0.");
      return;
    }

    try {
      dispatch(toggleLoading(true));
      const convertedAmount = web3.utils.toWei(`${amount}`);
      const reserves = await uniswap.getAmountsIn(convertedAmount, [weth, war]);
      const wethReserve = reserves[0].toString();
      const wethNeededPerUnit = web3.utils.fromWei(wethReserve);
      const wethNeeded = wethNeededPerUnit * amount;
      const wethRounded = wethNeeded.toFixed(18);
      const wethConverted = ethers.utils.parseEther(wethRounded.toString());

      const options = { gasLimit: 200000, value: wethConverted };
      const swap = await uniswap.swapETHForExactTokens(
        convertedAmount,
        [weth, war],
        address,
        Date.now() + 60000,
        options
      );
      const tx = swap.wait();
      const balances = await getTokenBalances();
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(toggleLoading(false));
      alert(`Transaction Failed!`);
      console.log(error);
    }
  };

  const [amount, setAmount] = useState(0);

  return (
    <div className="col-xs-12 col-xl-10 offset-xl-1">
      {testing && (
        <div className="d-flex flex-column align-items-center col-6 offset-3">
          <h4>How many WAR Tokens would you like?</h4>
          <input
            type="number"
            placeholder="5"
            className="stakeclaiminput shadow-lg mt-3"
            id="swapinput"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <button className="btn-connect mt-5" onClick={() => swap(amount)}>
            Swap ETH
          </button>
          <h5 className="poweredby textspaced textred mt-3">
            Powered by Uniswap API
          </h5>
          <h5 className="poweredby textspaced mt-3">
            FOR USE ONLY ON ROPSTEN.
          </h5>
        </div>
      )}

      {!testing && (
        <div className="tradeframe mt-5">
          <SiteFrame address={determineExchange()} />
        </div>
      )}

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}

export default Trade;
