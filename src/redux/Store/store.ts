import { Store, configureStore } from "@reduxjs/toolkit";
import authReducer from "../Store/authReducer";

const store: Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// import { Store, configureStore } from "@reduxjs/toolkit";
// import RootReducer from "./RootReducer";

// const store: Store = configureStore({
//   reducer: RootReducer,
// });
// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type Appdispatch = typeof store.dispatch;
// export const UseAppdispatch = () => UseAppdispatch;
