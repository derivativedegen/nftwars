import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import "./stake.css";
import StakeInterface from "../components/StakeInterface";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectUserChain,
  selectWarning,
  selectWeb3Modal,
} from "../redux/network";
import {
  selectWarBalance,
  selectFightSupply,
  selectFightCirculating,
  selectWarStakedBalance,
  selectWarRewardsBalance,
  selectLpTokenBalance,
  selectLpStakedBalance,
  selectLpRewardsBalance,
} from "../redux/tokens";

const Stake = ({ stake, contractAction }) => {
  // Hooks
  const ethereum = window.ethereum;
  const history = useHistory();
  const userChain = useSelector(selectUserChain);
  const warning = useSelector(selectWarning);
  const web3Modal = useSelector(selectWeb3Modal);

  // Component State
  const [typeOfStake, setTypeOfStake] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [staked, setStaked] = useState(0);
  const [rewards, setRewards] = useState(0);

  // Tokens State
  const warBalance = useSelector(selectWarBalance);
  const warStakedBalance = useSelector(selectWarStakedBalance);
  const warRewardsBalance = useSelector(selectWarRewardsBalance);
  const lpTokenBalance = useSelector(selectLpTokenBalance);
  const lpStakedBalance = useSelector(selectLpStakedBalance);
  const lpRewardsBalance = useSelector(selectLpRewardsBalance);
  const fightSupply = useSelector(selectFightSupply);
  const fightCirculating = useSelector(selectFightCirculating);

  // Check wallet connection
  let connected = false;
  if (web3Modal) {
    web3Modal.cachedProvider ? (connected = true) : (connected = false);
  }

  // Set component data based on staking type
  const setData = (typeOfStake) => {
    switch (typeOfStake) {
      case "WAR Tokens":
        setBalance(warBalance);
        setStaked(warStakedBalance);
        setRewards(warRewardsBalance);
        setDescription("Earn 1 FIGHT Token each day per WAR Token staked.");
        break;
      case "LP Tokens":
        setBalance(lpTokenBalance);
        setStaked(lpStakedBalance);
        setRewards(lpRewardsBalance);
        setDescription(
          "Earn 100 FIGHT Tokens each day per ETH-WAR-LP Token staked."
        );
        break;
    }
  };

  // Update component data if type of stake or balances change
  useEffect(() => {
    setData(typeOfStake);
  }, [
    typeOfStake,
    warBalance,
    warStakedBalance,
    warRewardsBalance,
    lpTokenBalance,
    lpStakedBalance,
    lpRewardsBalance,
    userChain,
  ]);

  return (
    <div className="col-12">
      <div className="d-flex justify-content-center">
        {!ethereum ? (
          <h1 className="textred textspaced wallet align-self-center pt-2">
            Install MetaMask wallet to continue.
          </h1>
        ) : null}

        {ethereum && !connected ? (
          <h1 className="textred textspaced wallet align-self-center pt-2">
            Connect a wallet.
          </h1>
        ) : null}

        {ethereum && connected && warning ? (
          <Button
            text="Change Network"
            clickAction={() => {
              history.push("/network");
            }}
            buttonType={"btn-connect"}
          />
        ) : null}

        {userChain && ethereum && connected && !warning ? (
          <div className="stakeselect d-flex justify-content-around pt-2">
            <Button
              text="WAR Token"
              buttonType={
                typeOfStake !== "WAR Tokens" ? "btn-retro" : "btn-selected"
              }
              clickAction={() => setTypeOfStake("WAR Tokens")}
            />

            <Button
              text="LP Token"
              buttonType={
                typeOfStake !== "LP Tokens" ? "btn-retro" : "btn-selected"
              }
              clickAction={() => setTypeOfStake("LP Tokens")}
            />
          </div>
        ) : null}
      </div>

      {connected && typeOfStake ? (
        <div className="mt-4 text-center">
          <p className="stakeinfo textwhite m-0 p-0">{description}</p>
          <p className="stakeinfo textwhite m-0 p-0">
            Max: {fightSupply} FIGHT
          </p>
          <p className="stakeinfo textwhite m-0 p-0">
            Circulating: {fightCirculating} FIGHT
          </p>
        </div>
      ) : null}

      <div className="d-flex justify-content-center mt-4 col-8 offset-2">
        {connected && typeOfStake ? (
          <StakeInterface
            type={typeOfStake}
            balance={balance}
            staked={staked}
            rewards={rewards}
            stake={stake}
            contractAction={contractAction}
          />
        ) : null}
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <Link to="/menu">
          <button className="menuButton shadow-lg"> Main Menu </button>
        </Link>
      </div>
    </div>
  );
};

export default Stake;
