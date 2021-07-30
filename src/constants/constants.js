export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const POLYGON_ID = process.env.REACT_APP_POLYGON_ID;

export const gateway = "https://gateway.pinata.cloud/ipfs/";

export const chainData = {
  mainnet: {
    network: 1,
    chain: "0x1",
  },
  ropsten: {
    network: 3,
    chain: "0x3",
  },
  polygon: {
    network: 137,
    chain: "0x89",
  },
  mumbai: {
    network: 80001,
    chain: "0x13881",
  },
};

export const contractInfo = {
  mainnet: {
    war: "0x4d75d9e37667a2d4677ec3d74bdd9049326ad8d6",
    stake: "0x8f9593F98Bf8307236c4FaD94e5b1A9D724D95c2",
    lp: "0x3127bbbc05f343192855ea40b54a34831ce72e04",
    lpstake: "0xd7c0dB1d716d11FDE3D9B375C086fCA99252D62F",
    fight: "0x2ba55a162a86c005b900c9cc63be0336e2bb8305",
    marketplace: {
      nft: "0xC7D73947c84E84193b42B33c195aD857c62306F2",
      shop: "0x736D550bFF53D9B4cF2f98F2eC9188A864A185C8",
    },
  },
  ropsten: {
    war: "0x00F8B0C5137619359E6587671b84D0fB090740cB",
    stake: "0x52280Dd6b7543AbDaBedbFdcC8D417E44e93dDc4",
    lp: "0x95e7d627e0043930fb44a0af6ecd42006c0de3a3",
    lpstake: "0xE16F7a5F519dF5C2B0B2f96Ed78421780Ea0440c",
    fight: "0xe7d526b8E8F9d9342960461c57f7AA299b05fCB7",
  },
  mumbai: {
    war: "0x43bF5978E3569d360414C9ddefEf302353763888",
    stake: "0x384527e176dE725d1094aE4Ea6b62E7915350144",
    lp: "0x219F06Be688b7c74Fff3CCe8f8a29F6854DC79EE",
    lpstake: "0x9E630F9043616BCf5033eb65Bf4d6a2806a8a30f",
    fight: "0x3EE21815b66C329A94f16994D13Cb1b183AB6526",
  },
  polygon: {
    war: "0x7f2841a5c7e69e921897fbfbce95caea34634a35",
    stake: "0x2BA55A162a86C005B900C9cC63bE0336e2bB8305",
    lp: "0xc7fceb0dd93f357ab44c35415ee200286f106404",
    lpstake: "0x8f9593F98Bf8307236c4FaD94e5b1A9D724D95c2",
    fight: "0x656010c92127623AD59991b392F9b9CF1D5B4C7a",
  },
};

export const NETWORK = (chainId) => {
  for (let n in NETWORKS) {
    if (NETWORKS[n].chainId == chainId) {
      return NETWORKS[n];
    }
  }
};

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + window.location.hostname + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  polygon: {
    name: "matic",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: `https://rpc-mainnet.maticvigil.com/v1/${POLYGON_ID}`,
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://explorer-mainnet.maticvigil.com//",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: `https://rpc-mumbai.maticvigil.com/v1/${POLYGON_ID}`,
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://explorer-mumbai.maticvigil.com/",
  },
};

export const polygonData = [
  {
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [`https://rpc-mainnet.matic.network/v1/${POLYGON_ID}`],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
];

export const mumbaiData = [
  {
    chainId: "0x13881",
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [`https://rpc-mumbai.maticvigil.com/`],
    blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
  },
];

export const ethereumData = [
  {
    chainId: "0x1",
  },
];

export const ropstenData = [
  {
    chainId: "0x3",
  },
];
