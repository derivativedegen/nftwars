export const getBrowserChain = (ethereum, dispatch, setUserChain) => {
  ethereum.request({ method: "eth_chainId" }).then((chainId) => {
    dispatch(setUserChain(chainId));
  });
};
