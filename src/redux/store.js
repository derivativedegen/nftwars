import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import transactionReducer from "./transactionSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    transaction: transactionReducer,
  },
});

export default store;
