import React from "react";
import "./trade.css";
import SiteFrame from "../components/siteFrame";
import { Link } from "react-router-dom";

function Trade({ appChain }) {
  const determineExchange = () => {
    if (appChain === "0x13881" || appChain === "0x89") {
      return "https://quickswap.exchange/#/swap";
    } else {
      return "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x4d75d9e37667a2d4677ec3d74bdd9049326ad8d6";
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

export default Trade;
