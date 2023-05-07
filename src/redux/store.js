import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commonApiCall } from "./commonApiCall";

export const store = configureStore({
  reducer: {
    [commonApiCall.reducerPath]: commonApiCall.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApiCall.middleware),
});

setupListeners(store.dispatch);
