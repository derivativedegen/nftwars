import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warBalance: 0,
  warStakedBalance: 0,
  warRewardsBalance: 0,
  lpTokenBalance: 0,
  lpStakedBalance: 0,
  lpRewardsBalance: 0,
  fightBalance: 0,

  fightSupply: 0,
  fightCirculating: 0,
  warSupply: 0,
  warCirculating: 0,
};

const data = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setWarBalance: (state, action) => {
      state.warBalance = action.payload;
    },
    setFightSupply: (state, action) => {
      state.fightSupply = action.payload;
    },
    setFightCirculating: (state, action) => {
      state.fightCirculating = action.payload;
    },
    setWarSupply: (state, action) => {
      state.warSupply = action.payload;
    },
    setWarCirculating: (state, action) => {
      state.warCirculating = action.payload;
    },
  },
});

// Actions
export const {
  setWarBalance,
  setFightSupply,
  setFightCirculating,
  setWarSupply,
  setWarCirculating,
} = data.actions;

// Selectors
export const selectWarBalance = (state) => state.data.warBalance;
export const selectFightSupply = (state) => state.data.fightSupply;
export const selectFightCirculating = (state) => state.data.fightCirculating;
export const selectWarSupply = (state) => state.data.warSupply;
export const selectWarCirculating = (state) => state.data.warCirculating;

// Reducer
export default data.reducer;
