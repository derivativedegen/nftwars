import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  loading: false,
  approved: {},
  approvedData: [],
  confirmed: {},
  confirmedData: [],
};

// Slice
const transaction = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    txApproved: (state, action) => {
      state.approved = action.payload;
      if (action.payload.transactionHash) {
        state.approvedData.push(action.payload.transactionHash);
      }
    },
    txConfirmed: (state, action) => {
      state.confirmed = action.payload;
      if (action.payload.transactionHash) {
        state.confirmedData.push(action.payload.transactionHash);
      }
    },
  },
});

// Actions
export const { toggleLoading, txApproved, txConfirmed } = transaction.actions;

// Selectors
export const selectLoading = (state) => state.transaction.loading;
export const selectApproved = (state) => state.transaction.approved;
export const selectConfirmed = (state) => state.transaction.confirmed;

// Reducer
export default transaction.reducer;
