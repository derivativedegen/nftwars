import React, { useState, useEffect } from "react";
import NetworkCard from "../components/networkCard";
import "./network.css";
import { Link } from "react-router-dom";
import matic from "../images/matic.png";
import eth from "../images/eth.png";
import ethtest from "../images/ethtest.png";
import matictest from "../images/matictest.png";
import Button from "../ui/button";
import { useHistory } from "react-router-dom";
import {
  polygonData,
  mumbaiData,
  ethereumData,
  ropstenData,
} from "../constants/constants";
import { useSelector } from "react-redux";
import {
  selectWarning,
  selectUserChain,
  selectAppChain,
} from "../redux/network";

const Network = ({ switchChain }) => {
  const history = useHistory();
  const ethereum = window.ethereum;
  const testing = false;
  const warning = useSelector(selectWarning);
  const userChain = useSelector(selectUserChain);
  const appChain = useSelector(selectAppChain);

  const connectPolygon = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({ method: "wallet_addEthereumChain", params: polygonData })
          .catch((error) => {});
        if (tx) {
          console.log(tx);
        }
      } catch (e) {
        console.log(e);
      }
      //window.location.reload();
    }
  };

  const connectMumbai = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({ method: "wallet_addEthereumChain", params: mumbaiData })
          .catch((error) => {});
        if (tx) {
          console.log(tx);
        }
      } catch (e) {
        console.log(e);
      }
      //window.location.reload();
    }
  };

  const connectEthereum = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: ethereumData,
          })
          .catch((error) => {});
        if (tx) {
          console.log(tx);
        }
        //console.log("done");
      } catch (e) {
        console.log(e);
      }
      //window.location.reload();
    } else {
      //console.log("didn't work");
    }
  };

  const connectRopsten = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: ropstenData,
          })
          .catch((error) => {});
        if (tx) {
          console.log(tx);
        }
        //console.log("done");
      } catch (e) {
        console.log(e);
      }
      //window.location.reload();
    } else {
      //console.log("didn't work");
    }
  };

  const selectPolygon = () => {
    switchChain("0x89");
    connectPolygon();
    if (!ethereum) {
      history.push("/menu");
    }
  };

  const selectMumbai = () => {
    switchChain("0x13881");
    connectMumbai();
    if (!ethereum) {
      history.push("/menu");
    }
  };

  const selectEthereum = () => {
    switchChain("0x1");
    connectEthereum();
    if (!ethereum) {
      history.push("/menu");
    }
  };

  const selectRopsten = () => {
    switchChain("0x3");
    connectRopsten();
    if (!ethereum) {
      history.push("/menu");
    }
  };

  const selectedNetwork = (chain) => {
    if (chain == "0x1") {
      return "Ethereum";
    } else if (chain == "0x13881") {
      return "Mumbai";
    } else if (chain == "0x89") {
      return "Polygon";
    } else if (chain == "0x3") {
      return "Ropsten";
    } else {
      return "Unsupported Network";
    }
  };

  const selectNetwork = async () => {};

  const walletMessage = [];
  if (userChain && !warning) {
    walletMessage.push(
      <h5 className="textwhite stakeinfo">You're ready to use the app!</h5>
    );
  } else {
    walletMessage.push(
      <h5 className="textred stakeinfo">
        Make sure the App Network and your Wallet Network are the same!
      </h5>
    );
  }

  return (
    <div className="col-xs-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-3 pt-5 mt-5">
      <div className="menubox justify-content-center shadow-lg mb-3">
        <h2 class="textred textspaced bomberescortfill">
          <u>App Network</u>
        </h2>
        <h5 className="textwhite stakeinfo">
          Select which network to browse the app with.
        </h5>

        <div className="d-flex justify-content-around flex-wrap">
          <NetworkCard
            name="Ethereum"
            img={eth}
            onClick={selectEthereum}
            network={selectedNetwork(appChain)}
          />
          <NetworkCard
            name="Polygon"
            img={matic}
            onClick={selectPolygon}
            network={selectedNetwork(appChain)}
          />
        </div>
        {testing ? (
          <div className="d-flex justify-content-around flex-wrap">
            <NetworkCard
              name="Ropsten"
              img={ethtest}
              onClick={selectRopsten}
              network={selectedNetwork(appChain)}
            />
            <NetworkCard
              name="Mumbai"
              img={matictest}
              onClick={selectMumbai}
              network={selectedNetwork(appChain)}
            />
          </div>
        ) : null}
        {ethereum && userChain && warning ? (
          <div className="pt-5">
            <h2 class="textred textspaced bomberescortfill">
              <u>Wallet Network</u>
            </h2>
            <h4 className="textwhite">{selectedNetwork(userChain)}</h4>
            {walletMessage}
          </div>
        ) : null}
      </div>
      <div class="mt-0 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg">Main Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Network;
