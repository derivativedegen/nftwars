import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./tokens";
import transactionReducer from "./transaction";
import networkReducer from "./network";
import contractsReducer from "./contracts";

const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    transaction: transactionReducer,
    network: networkReducer,
    contracts: contractsReducer,
  },
});

export default store;
