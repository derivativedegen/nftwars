import React from "react";
import "./addLp.css";
import SiteFrame from "../components/siteFrame";
import { Link } from "react-router-dom";

function AddLiquidity({ appChain }) {
  const determineExchange = () => {
    if (appChain === "0x13881" || appChain === "0x89") {
      return "https://quickswap.exchange/#/add/0x7F2841A5C7e69e921897fBfbCE95caEa34634A35/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
    } else {
      return "https://app.uniswap.org/#/add/v2/ETH/0x4d75D9e37667a2d4677Ec3d74bDD9049326Ad8d6";
      // V3 Liquidity Link -- 'https://app.uniswap.org/#/add/0x4d75d9e37667a2d4677ec3d74bdd9049326ad8d6/ETH'
    }
  };

  return (
    <div className="tradeframe col-xs-12 col-xl-10 offset-xl-1">
      <SiteFrame address={determineExchange()} />

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
}

export default AddLiquidity;
