import React, { useState, useEffect } from "react";
import "./header.css";
import "./icomoon.css";
import PlayerInfo from "./playerInfo";
import Button from "../ui/button";
import { useHistory } from "react-router-dom";
import Warning from "./Warning";
import Loader from "./loader";

const Header = ({
  appChain,
  userChain,
  address,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  warBalance,
  fightBalance,
  lpTokenBalance,
  connected,
  warning,
  chooseExplorer,
  loading,
}) => {
  const history = useHistory();

  const selectedNetwork = () => {
    if (appChain == "0x1") {
      return "Ethereum";
    } else if (appChain == "0x13881") {
      return "Mumbai";
    } else if (appChain == "0x89") {
      return "Polygon";
    } else if (appChain == "0x3") {
      return "Ropsten";
    }
  };

  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider && connected && !warning) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          text="Disconnect"
          buttonType={"btn-disconnect"}
          clickAction={logoutOfWeb3Modal}
        />
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          text="Connect"
          buttonType={"btn-connect"}
          clickAction={loadWeb3Modal}
        />
      );
    }
  }

  /*useEffect(() => {
    console.log("connected: " + connected);
    console.log("user chain: " + userChain);
    console.log("warning: " + warning);
  }, [connected]);*/

  return (
    <div className="mb-5">
      <div className="header headerbox shadow-lg mb-0">
        <div className="d-flex align-items-center">
          <h2
            className="p-1 sitename textred textspaced bomberescort"
            onClick={() => history.push("/menu")}
          >
            NFT WARS
          </h2>

          <div className="pl-2 pr-4">{loading ? <Loader /> : null}</div>

          <div className="ml-auto">
            <Button
              key="networkButton"
              text={selectedNetwork()}
              buttonType={"btn-network"}
              clickAction={() => history.push("/network")}
            />
          </div>
          <div className="ml-3">{modalButtons}</div>
        </div>
        {userChain && connected && !warning ? (
          <PlayerInfo
            chooseExplorer={chooseExplorer}
            address={address}
            warBalance={warBalance}
            fightBalance={fightBalance}
            lpTokenBalance={lpTokenBalance}
          />
        ) : null}
      </div>
      <div className="mt-0">
        {userChain && connected && warning ? <Warning /> : null}
      </div>
    </div>
  );
};

export default Header;
