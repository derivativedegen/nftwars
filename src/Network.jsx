import React, { useState, useEffect, useCallback } from "react";
import App from "./App";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { INFURA_ID, contracts } from "./constants/constants.js";
import {
  STAKE_POLYGON_ABI,
  WAR_ABI,
  FIGHT_ABI,
  LP_ABI,
  LPSTAKE_POLYGON_ABI,
} from "./constants/ABIs";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddress,
  selectAddress,
  setProvider,
  selectProvider,
  setSigner,
  selectSigner,
  setConnected,
  selectConnected,
  setWarning,
  setNetwork,
  selectNetworkName,
  setUserChain,
  selectUserChain,
  setAppChain,
  selectAppChain,
} from "./redux/network";
import { chainCheck } from "./helpers/chainCheck";

const mainnetProvider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

function Network() {
  const ethereum = window.ethereum;
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);
  const provider = useSelector(selectProvider);
  const signer = useSelector(selectSigner);
  const connected = useSelector(selectConnected);
  const network = useSelector(selectNetworkName);
  const userChain = useSelector(selectUserChain);
  const appChain = useSelector(selectAppChain);

  // Set contract addresses based on network
  const [contractAddresses, setContractAddresses] = useState(
    contracts[network]
  );

  // Initialize Provider && get browser chain
  const initializeProvider = () => {
    if (ethereum) {
      // Create web3 provider and signer for app data and transactions
      const userProvider = new ethers.providers.Web3Provider(ethereum);
      dispatch(setProvider(userProvider));
      const userSigner = userProvider.getSigner();
      dispatch(setSigner(userSigner));

      getBrowserChain();
    } else {
      dispatch(setProvider(mainnetProvider));
      dispatch(setAppChain("0x1"));
      dispatch(setNetwork("mainnet"));
      setContractAddresses(contracts[network]);
    }
  };
  useEffect(() => {
    initializeProvider();
  }, []);

  const getBrowserChain = () => {
    ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      dispatch(setUserChain(chainId));
    });
  };

  // Check if chain is valid and supported, set appChain, and update when user chain updates
  const switchChain = (chainId) => {
    if (connected) {
      dispatch(setConnected(false));
    }
    if (chainCheck(chainId)) {
      dispatch(setAppChain(chainId));
    } else {
      dispatch(setAppChain("0x1"));
    }
  };
  useEffect(() => {
    switchChain(userChain);
  }, [userChain]);

  // Update network when app chain change is requested
  const selectNetwork = (chainId) => {
    if (chainId === "0x13881") {
      dispatch(setNetwork("mumbai"));
    } else if (chainId === "0x89") {
      dispatch(setNetwork("polygon"));
    } else if (chainId === "0x3") {
      dispatch(setNetwork("ropsten"));
    } else {
      dispatch(setNetwork("mainnet"));
    }
  };
  useEffect(() => {
    selectNetwork(appChain);
  }, [appChain]);

  // Pull in the correct contract addresses when the network updates
  useEffect(() => {
    if (network) {
      setContractAddresses(contracts[network]);
    }
  }, [network]);

  // Init Web3Modal
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: {},
    theme: "dark",
  });

  // Get user wallet provider
  const loadWeb3Modal = async () => {
    if (ethereum) {
      checkConnected();
      const provider = await web3Modal.connect();
      const web3Provider = new Web3Provider(provider);
      dispatch(setProvider(web3Provider));
      requestAccounts();
    } else {
      alert("Please install MetaMask Wallet to connect.");
    }
  };

  // Log out of user Web3 Provider
  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (connected) {
      dispatch(setConnected(false));
    }
    //window.location.reload();
  };

  // Check if user is connected or cached
  const checkConnected = () => {
    if (web3Modal) {
      web3Modal.cachedProvider
        ? dispatch(setConnected(true))
        : dispatch(setConnected(false));
    }
  };
  useEffect(() => {
    checkConnected();
    if (connected && chainCheck(userChain)) {
      requestAccounts();
    }
  }, [userChain, provider]);

  // Request the address of the first account in the connected user wallet
  const requestAccounts = () => {
    if (ethereum) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          if (accounts.length !== 0 && accounts[0] !== address) {
            dispatch(setAddress(accounts[0]));
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            alert("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    }
  };

  // Determine the explorer to use based on app network
  const chooseExplorer = (type) => {
    if (appChain == "0x13881") {
      if (type !== "tx") {
        return `https://explorer-mumbai.maticvigil.com/address/`;
      } else {
        return `https://explorer-mumbai.maticvigil.com/${type}/`;
      }
    } else if (appChain == "0x89") {
      return `https://polygonscan.com/${type}/`;
    } else if (appChain == "0x3") {
      return `https://ropsten.etherscan.io/${type}/`;
    } else {
      return `https://www.etherscan.io/${type}/`;
    }
  };

  // Event listeners for user chain change
  ethereum &&
    ethereum.on("chainChanged", async (chainId) => {
      await dispatch(setUserChain(chainId));
      await switchChain(chainId);
      window.location.reload();
    });

  // Event listener for wallet address change
  ethereum && ethereum.on("accountsChanged", () => requestAccounts());

  // Instansiate Contract Instances
  let contractWar = {};
  let contractLPToken = {};
  let contractStake = {};
  let contractLPStake = {};
  let contractFight = {};
  if (Object.keys(signer).length > 0) {
    contractWar = new ethers.Contract(contractAddresses.war, WAR_ABI, signer);
    contractLPToken = new ethers.Contract(contractAddresses.lp, LP_ABI, signer);
    contractStake = new ethers.Contract(
      contractAddresses.stake,
      STAKE_POLYGON_ABI,
      signer
    );
    contractLPStake = new ethers.Contract(
      contractAddresses.lpstake,
      LPSTAKE_POLYGON_ABI,
      signer
    );
    contractFight = new ethers.Contract(
      contractAddresses.fight,
      FIGHT_ABI,
      signer
    );
  }

  if (appChain !== userChain) {
    dispatch(setWarning(true));
  } else {
    dispatch(setWarning(false));
  }

  return (
    <div>
      <App
        switchChain={switchChain}
        contractAddresses={contractAddresses}
        web3Modal={web3Modal}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        chooseExplorer={chooseExplorer}
        contractWar={contractWar}
        contractLPToken={contractLPToken}
        contractStake={contractStake}
        contractLPStake={contractLPStake}
        contractFight={contractFight}
      />
    </div>
  );
}

export default Network;
