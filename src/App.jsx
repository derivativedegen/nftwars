import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ethers } from "ethers";
import { contractInfo, INFURA_ID } from "./constants/constants.js";
import { STAKE_ABI, WAR_ABI, FIGHT_ABI, LPSTAKE_ABI } from "./constants/ABIs";
import Start from "./pages/start";
import Web3 from "web3";
import Menu from "./pages/menu";
import About from "./pages/about";
import Stake from "./pages/stake";
import Social from "./pages/social";
import Trade from "./pages/trade";
import AddLiquidity from "./pages/addLp";
import Header from "./components/header";
import Stats from "./pages/stats";
import Network from "./pages/network";
import numberWithCommas from "./helpers/numberWithCommas";
import getTokenBalance from "./helpers/getTokenBalance";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoading, txApproved, txConfirmed } from "./redux/transaction";
import {
  selectSigner,
  selectConnected,
  selectUserChain,
  selectAppChain,
  selectAddress,
} from "./redux/network";
import {
  setWarSupply,
  setWarCirculating,
  setWarBalance,
  setWarStakedBalance,
  selectWarStakedBalance,
  setWarRewardsBalance,
  setLpTokenBalance,
  setLpStakedBalance,
  selectLpStakedBalance,
  setLpRewardsBalance,
  setFightTokenBalance,
  setFightSupply,
  setFightCirculating,
} from "./redux/tokens";
import {
  selectContractAddresses,
  selectContractWar,
  selectContractLPToken,
  selectContractStake,
  selectContractLPStake,
  selectContractFight,
} from "./redux/contracts";

function App({ switchChain, loadWeb3Modal, logoutOfWeb3Modal }) {
  let web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  const dispatch = useDispatch();

  // Network Data
  const signer = useSelector(selectSigner);
  const connected = useSelector(selectConnected);
  const userChain = useSelector(selectUserChain);
  const appChain = useSelector(selectAppChain);
  const address = useSelector(selectAddress);
  const contractAddresses = useSelector(selectContractAddresses);

  // Token Data
  const warStakedBalance = useSelector(selectWarStakedBalance);
  const lpStakedBalance = useSelector(selectLpStakedBalance);

  // Contract Data
  const contractWar = useSelector(selectContractWar);
  const contractLPToken = useSelector(selectContractLPToken);
  const contractStake = useSelector(selectContractStake);
  const contractLPStake = useSelector(selectContractLPStake);
  const contractFight = useSelector(selectContractFight);

  // Get Balances
  const getAllBalances = (address) => {
    if (address) {
      dispatch(toggleLoading());
      getTokenBalances(address);
      getStakedBalances(address);
      getRewardBalances(address);
      dispatch(toggleLoading());
    }
  };
  const getTokenBalances = (address) => {
    getTokenBalance(contractWar, address, "balance").then((result) => {
      dispatch(setWarBalance(result));
    });
    getTokenBalance(contractLPToken, address, "balance").then((result) => {
      dispatch(setLpTokenBalance(result));
    });
    getTokenBalance(contractFight, address, "balance").then((result) => {
      dispatch(setFightTokenBalance(result));
    });
  };
  const getStakedBalances = (address) => {
    if (
      (appChain && userChain === "0x13881") ||
      (appChain && userChain === "0x89" && address)
    ) {
      getTokenBalance(contractStake, address, "stakedPolygon").then(
        (result) => {
          dispatch(setWarStakedBalance(result));
        }
      );
      getTokenBalance(contractLPStake, address, "stakedPolygon").then(
        (result) => {
          dispatch(setLpStakedBalance(result));
        }
      );
    } else {
      const warStakingContract = new ethers.Contract(
        contractAddresses.stake,
        STAKE_ABI,
        signer
      );
      const lpStakingContract = new ethers.Contract(
        contractAddresses.lpstake,
        LPSTAKE_ABI,
        signer
      );

      getTokenBalance(warStakingContract, address, "stakedEth").then(
        (result) => {
          dispatch(setWarStakedBalance(result));
        }
      );
      getTokenBalance(lpStakingContract, address, "stakedEth").then(
        (result) => {
          dispatch(setLpStakedBalance(result));
        }
      );
    }
  };
  const getRewardBalances = (address) => {
    getTokenBalance(contractStake, address, "earned").then((result) => {
      if (typeof result === "number") {
        dispatch(setWarRewardsBalance(result));
      }
    });
    getTokenBalance(contractLPStake, address, "earned").then((result) => {
      if (typeof result === "number") {
        dispatch(setLpRewardsBalance(result));
      }
    });
  };
  const refreshRewards = setInterval(() => {
    if (connected && address) {
      if (warStakedBalance > 0 || lpStakedBalance > 0) {
        getRewardBalances(address);
      }
    }
  }, 1000 * 60);
  setTimeout(() => {
    clearInterval(refreshRewards);
  }, 1000 * 60 * 10);

  // Get All Balances INIT and If Address Changes
  useEffect(() => {
    if (connected && address && userChain === appChain) {
      getAllBalances(address);
    }
  }, [address]);

  // Staking & Redeeming Functions
  const contractAction = async (contract, action) => {
    dispatch(toggleLoading());
    let tx;
    switch (action) {
      case "withdraw":
        tx = await contract.exit();
        break;
      case "redeem":
        tx = await contract.redeem();
        break;
    }
    const receipt = await tx.wait();
    if (receipt) {
      getAllBalances(address);
    }
    dispatch(toggleLoading());
  };
  const stake = async (tokenContract, stakeContract, amount) => {
    dispatch(toggleLoading());
    const convertedAmount = web3.utils.toWei(`${amount}`);
    const tx = await tokenContract.approve(
      stakeContract.address,
      convertedAmount
    );
    const approveReceipt = await tx.wait();

    dispatch(txApproved(approveReceipt));

    const tx2 = await stakeContract.stake(convertedAmount);
    const stakeReceipt = await tx2.wait();
    dispatch(txConfirmed(stakeReceipt));

    if (approveReceipt && stakeReceipt) {
      getAllBalances(address);
    }
    dispatch(toggleLoading());
  };

  // Pull WAR & FIGHT Token Statistics on INIT
  const getTokenStats = async () => {
    const warMainnetContract = new web3.eth.Contract(
      WAR_ABI,
      contractInfo["mainnet"].war
    );
    const fightMainnetContract = new web3.eth.Contract(
      FIGHT_ABI,
      contractInfo["mainnet"].fight
    );

    const convert = (number) => {
      const converted = web3.utils.fromWei(number);
      const integer = Number(converted);
      return numberWithCommas(integer.toFixed(0));
    };

    const supplyFight = await fightMainnetContract.methods.cap().call();
    dispatch(setFightSupply(convert(supplyFight)));
    const circulating = await fightMainnetContract.methods.totalSupply().call();
    dispatch(setFightCirculating(convert(circulating)));
    const supplyWar = await warMainnetContract.methods.cap().call();
    dispatch(setWarSupply(convert(supplyWar)));

    const circulatingWar = async () => {
      const marketingBalance = await warMainnetContract.methods
        .balanceOf("0x61Cfb7949Ad8284b4bf1323F59a845982827BD51")
        .call();
      const marketingSupply = Number(web3.utils.fromWei(marketingBalance));
      const adjustedSupply = 500000 - marketingSupply - 45500; // Team Lock Supply - 0x966eD4756561C27Ada53Dd726d6629Bd366B753E
      const circulatingWar = numberWithCommas(adjustedSupply);
      dispatch(setWarCirculating(circulatingWar));
    };
    circulatingWar();
  };
  useEffect(() => {
    getTokenStats();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />

        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/about" component={About} />
          <Route path="/addliquidity" component={AddLiquidity} />
          <Route path="/stats" component={Stats} />
          <Route path="/social" component={Social} />
          <Route path="/trade" component={Trade} />
          <Route path="/network">
            <Network switchChain={switchChain} />
          </Route>
          <Route path="/menu">
            <Menu logoutOfWeb3Modal={logoutOfWeb3Modal} />
          </Route>
          <Route path="/stake">
            <Stake stake={stake} contractAction={contractAction} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
