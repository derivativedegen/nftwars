import React from "react";
import "./stats.css";
import Button from "../ui/button";
import { Link } from "react-router-dom";

const Stats = ({
  network,
  warAddress,
  warSupply,
  warCirculating,
  fightAddress,
  fightSupply,
  fightCirculating,
  stakingAddress,
  lpAddress,
  lpStakingAddress,
  chooseExplorer,
}) => {
  const ethereum = window.ethereum;

  const addFightToken = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: fightAddress,
                symbol: "FIGHT",
                decimals: 18,
              },
            },
          })
          .then((success) => {
            if (success) {
              //console.log("FIGHT successfully added to wallet!");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please install MetaMask Wallet to add Tokens.");
    }
  };

  const addWarToken = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: warAddress,
                symbol: "WAR",
                decimals: 18,
              },
            },
          })
          .then((success) => {
            if (success) {
              //console.log("WAR successfully added to wallet!");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please install MetaMask Wallet to add Tokens.");
    }
  };

  const addLpToken = async () => {
    if (ethereum) {
      try {
        const tx = await ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: lpAddress,
                symbol: "UNI-V2",
                decimals: 18,
              },
            },
          })
          .then((success) => {
            if (success) {
              //console.log("WAR successfully added to wallet!");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please install MetaMask Wallet to add Tokens.");
    }
  };

  return (
    <div className="col-12">
      {/*
      <div className="d-flex justify-content-center pb-4">
        <h1 className="textred textspaced bomberescort">STATS</h1>
      </div>
      */}

      <div className="d-flex justify-content-around flex-wrap">
        <div className="col-9 col-lg-3 col-xs-12 statbox shadow-lg pt-5 mb-4 mr-3 ml-3">
          <h1 className="textred textspaced bomberescortfill text-center">
            <u>WAR</u>
          </h1>
          <p className="raleway textwhite stat-item">
            <b>Token Contract: </b>
            <br />
            <a
              href={chooseExplorer("token") + warAddress}
              className="stataddress textred"
              target="_blank"
              rel="noreferrer"
            >
              {warAddress}
            </a>
          </p>
          <p className="raleway textwhite stat-item">
            <b>Staking Contract: </b>
            <br />
            <a
              href={chooseExplorer("address") + stakingAddress}
              className="stataddress textred"
              target="_blank"
              rel="noreferrer"
            >
              {stakingAddress}
            </a>
          </p>
          <p className="raleway textwhite stat-item">
            <b>Max Supply:</b> {warSupply}
          </p>
          <p className="raleway textwhite stat-item">
            <b>Circulating:</b> {warCirculating}
          </p>
          <div className="d-flex justify-content-center">
            <div className="mb-4 bottom">
              <Button
                text={"Add to Wallet"}
                clickAction={() => addWarToken()}
                buttonType={"btn-connect"}
              />
            </div>
          </div>
        </div>

        <div className="col-9 col-lg-3 col-xs-12 statbox shadow-lg pt-5 mb-4 mr-3 ml-3">
          <h1 className="textpurple2 textspaced bomberescortfill text-center">
            <u>FIGHT</u>
          </h1>
          <p className="raleway textwhite stat-item">
            <b>Token Contract: </b>
            <br />
            <a
              href={chooseExplorer("token") + fightAddress}
              className="stataddress textpurple2"
              target="_blank"
              rel="noreferrer"
            >
              {fightAddress}
            </a>
          </p>
          <p className="raleway textwhite stat-item">
            <b>Max Supply:</b> {fightSupply}
          </p>
          <p className="raleway textwhite stat-item">
            <b>Circulating:</b> {fightCirculating}
          </p>
          <div className="d-flex justify-content-center">
            <div className="mb-4 bottom">
              <Button
                text={"Add to Wallet"}
                clickAction={() => addFightToken()}
                buttonType={"btn-disconnect"}
              />
            </div>
          </div>
        </div>

        <div className="col-9 col-lg-3 col-xs-12 statbox shadow-lg pt-5 mb-4 mr-3 ml-3">
          <h1 className="textred textspaced bomberescortfill text-center">
            <u>LP</u>
          </h1>
          <p className="raleway textwhite stat-item">
            <b>WAR-ETH LP Token:</b>
            <br />
            <a
              href={chooseExplorer("token") + lpAddress}
              className="stataddress textred"
              target="_blank"
              rel="noreferrer"
            >
              {lpAddress}
            </a>
          </p>
          <p className="raleway textwhite stat-item">
            <b>WAR-ETH LP Token Staking Contract:</b>
            <br />
            <a
              href={chooseExplorer("address") + lpStakingAddress}
              className="stataddress textred"
              target="_blank"
              rel="noreferrer"
            >
              {lpStakingAddress}
            </a>
          </p>
          <div className="d-flex justify-content-center">
            <div className="mb-4 bottom">
              <Button
                text={"Add to Wallet"}
                clickAction={() => addLpToken()}
                buttonType={"btn-connect"}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
};

export default Stats;
