// Determine the explorer to use based on app network
const chooseExplorer = (appChain, type) => {
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

export default chooseExplorer;
