import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  address: "",
  provider: {},
  signer: {},
  connected: false,
  warning: false,
  network: "mainnet",
  userChain: "",
  appChain: "0x1",
  web3Modal: {},
  testing: false,
};

// Slice
const network = createSlice({
  name: "network",
  initialState: initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setSigner: (state, action) => {
      state.signer = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setWarning: (state, action) => {
      state.warning = action.payload;
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    setUserChain: (state, action) => {
      state.userChain = action.payload;
    },
    setAppChain: (state, action) => {
      state.appChain = action.payload;
    },
    setWeb3Modal: (state, action) => {
      state.web3Modal = action.payload;
    },
    setTesting: (state, action) => {
      state.testing = action.payload;
    },
  },
});

// Actions
export const {
  setAddress,
  setProvider,
  setSigner,
  setConnected,
  setWarning,
  setNetwork,
  setUserChain,
  setAppChain,
  setWeb3Modal,
  setTesting,
} = network.actions;

// Selectors
export const selectAddress = (state) => state.network.address;
export const selectProvider = (state) => state.network.provider;
export const selectSigner = (state) => state.network.signer;
export const selectConnected = (state) => state.network.connected;
export const selectWarning = (state) => state.network.warning;
export const selectNetworkName = (state) => state.network.network;
export const selectUserChain = (state) => state.network.userChain;
export const selectAppChain = (state) => state.network.appChain;
export const selectWeb3Modal = (state) => state.network.web3Modal;
export const selectTesting = (state) => state.network.testing;

// Reducer
export default network.reducer;
