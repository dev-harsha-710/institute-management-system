import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducer/rootReducer"; // Adjust the path as necessary

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
