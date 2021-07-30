import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  shopItems: [],
  folderHash: "",
  tokenJsons: [],
};

// Slice
const nfts = createSlice({
  name: "nfts",
  initialState: initialState,
  reducers: {
    setShopItems: (state, action) => {
      state.shopItems = action.payload;
    },
    setFolderHash: (state, action) => {
      state.folderHash = action.payload;
    },
    setTokenJsons: (state, action) => {
      state.tokenJsons = action.payload;
    },
  },
});

// Actions
export const { setShopItems, setFolderHash, setTokenJsons } = nfts.actions;

// Selectors
export const selectShopItems = (state) => state.nfts.shopItems;
export const selectFolderHash = (state) => state.nfts.folderHash;
export const selectTokenJsons = (state) => state.nfts.tokenJsons;

// Reducer
export default nfts.reducer;
