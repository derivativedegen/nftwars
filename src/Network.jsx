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

const mainnetProvider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

function Network() {
  const ethereum = window.ethereum;
  const [address, setAddress] = useState();

  // Set provider details state
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  // Set chain details state
  const [userChain, setUserChain] = useState();
  const [appChain, setAppChain] = useState();

  // Autoselect the network name, web3 instance, and contracts based on provider & chain
  const [network, setNetwork] = useState("mainnet");
  const [connected, setConnected] = useState();
  const [contractAddresses, setContractAddresses] = useState(
    contracts["mainnet"]
  );

  // Initialize Provider
  const initializeProvider = () => {
    if (ethereum) {
      // Create web3 provider and signer for app data and transactions
      const userProvider = new ethers.providers.Web3Provider(ethereum);
      setProvider(userProvider);
      const userSigner = userProvider.getSigner();
      setSigner(userSigner);

      getBrowserChain();
    } else {
      setProvider(mainnetProvider);
      setAppChain("0x1");
      setNetwork("mainnet");
      setContractAddresses(contracts["mainnet"]);
    }
  };
  useEffect(() => {
    initializeProvider();
  }, []);

  const getBrowserChain = () => {
    ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      setUserChain(chainId);
    });
  };

  // Check if chain is valid and supported, set appChain, and update when user chain updates
  const switchChain = (chainId) => {
    if (connected) {
      setConnected(false);
    }
    if (chainCheck(chainId)) {
      setAppChain(chainId);
    } else {
      setAppChain("0x1");
    }
  };
  useEffect(() => {
    switchChain(userChain);
  }, [userChain]);

  // Update network when app chain change is requested
  const selectNetwork = (chainId) => {
    if (chainId === "0x13881") {
      setNetwork("mumbai");
    } else if (chainId === "0x89") {
      setNetwork("polygon");
    } else if (chainId === "0x3") {
      setNetwork("ropsten");
    } else {
      setNetwork("mainnet");
    }
  };
  useEffect(() => {
    selectNetwork(appChain);
  }, [appChain]);

  // Validate Supported Chain
  const chainCheck = (chain) => {
    if (
      chain === "0x1" ||
      chain === "0x3" ||
      chain === "0x89" ||
      chain === "0x13881"
    ) {
      return true;
    } else {
      return false;
    }
  };

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
      setProvider(web3Provider);
      requestAccounts();
    } else {
      alert("Please install MetaMask Wallet to connect.");
    }
  };

  // Log out of user Web3 Provider
  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (connected) {
      setConnected(false);
    }
    //window.location.reload();
  };

  // Check if user is connected or cached
  const checkConnected = () => {
    if (web3Modal) {
      web3Modal.cachedProvider ? setConnected(true) : setConnected(false);
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
            setAddress(accounts[0]);
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
      await setUserChain(chainId);
      await switchChain(chainId);
      window.location.reload();
    });

  // Event listener for wallet address change
  ethereum && ethereum.on("accountsChanged", () => requestAccounts());

  // Warning if app and wallet network aren't matching
  const warning = appChain !== userChain;

  // Instansiate Contract Instances
  const contractWar = new ethers.Contract(
    contractAddresses.war,
    WAR_ABI,
    signer
  );
  const contractLPToken = new ethers.Contract(
    contractAddresses.lp,
    LP_ABI,
    signer
  );
  const contractStake = new ethers.Contract(
    contractAddresses.stake,
    STAKE_POLYGON_ABI,
    signer
  );
  const contractLPStake = new ethers.Contract(
    contractAddresses.lpstake,
    LPSTAKE_POLYGON_ABI,
    signer
  );
  const fightContract = new ethers.Contract(
    contractAddresses.fight,
    FIGHT_ABI,
    signer
  );

  return (
    <div>
      <App
        signer={signer}
        network={network}
        userChain={userChain}
        appChain={appChain}
        switchChain={switchChain}
        contractAddresses={contractAddresses}
        web3Modal={web3Modal}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        connected={connected}
        address={address}
        warning={warning}
        chooseExplorer={chooseExplorer}
        contractWar={contractWar}
        contractLPToken={contractLPToken}
        contractStake={contractStake}
        contractLPStake={contractLPStake}
        fightContract={fightContract}
      />
    </div>
  );
}

export default Network;
