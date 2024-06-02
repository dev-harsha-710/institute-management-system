import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { loginAction, LoginError } from "../../Action/Auth/authActions";
import { login } from "../../../features/UserManagement/Services/authService";

interface AuthState {
  user: any;
  accessToken: string | null;
  role: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  role: null,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {})
      .addCase(
        loginAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: any;
            accessToken: string;
            role: string;
          }>
        ) => {
          console.log(state);
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.role = action.payload.role;
          state.error = null;
        }
      )
      .addCase(
        loginAction.rejected,
        (state, action: PayloadAction<LoginError | undefined>) => {
          if (action.payload) {
            state.error = action.payload.error;
          } else {
            state.error = "An error occurred.";
          }
          state.user = null;
          state.accessToken = null;
          state.role = null;
        }
      );
  },
});

export default authSlice.reducer;
