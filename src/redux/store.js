import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./tokens";
import transactionReducer from "./transaction";
import networkReducer from "./network";
import contractsReducer from "./contracts";
import nftsReducer from "./nfts";

const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    transaction: transactionReducer,
    network: networkReducer,
    contracts: contractsReducer,
    nfts: nftsReducer,
  },
});

export default store;
