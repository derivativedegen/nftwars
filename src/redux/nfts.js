import { createSlice } from "@reduxjs/toolkit";
import { contractInfo } from "../constants/constants.js";
import nft1 from "../images/nft_1.png";
import nft2 from "../images/nft_2.png";
import nft3 from "../images/nft_3.png";
import nft4 from "../images/nft_4.png";
import nft5 from "../images/nft_5.png";
import nft6 from "../images/nft_6.png";
import nft7 from "../images/nft_7.png";
import nft8 from "../images/nft_8.png";

// Initial State
const initialState = {
  allNfts: [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8],
};

// Slice
const nfts = createSlice({
  name: "nfts",
  initialState: initialState,
  reducers: {
    setAllNfts: (state, action) => {
      state.allNfts = action.payload;
    },
  },
});

// Actions
export const { setAllNfts } = nfts.actions;

// Selectors
export const selectAllNfts = (state) => state.nfts.allNfts;

// Reducer
export default nfts.reducer;
