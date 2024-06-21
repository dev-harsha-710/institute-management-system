import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUsersAction,
  registerUserAction,
} from "../../Action/Users/UserAction";
import { User } from "../../../features/UserManagement/Services/UserService";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/UserManagement/Services/authService";

interface UserState {
  users: User[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching users: pending");
      })
      .addCase(
        getUsersAction.fulfilled,
        (state, action: PayloadAction<{ users: User[] }>) => {
          state.users = action.payload.users;
          state.loading = false;
          state.error = null;
          console.log("Fetching users: fulfilled", action.payload.users);
        }
      )
      .addCase(
        getUsersAction.rejected,
        (state, action: PayloadAction<{ error: string } | undefined>) => {
          state.loading = false;
          state.error = action.payload
            ? action.payload.error
            : "An error occurred.";
          console.log("Fetching users: rejected", state.error);
          state.users = null;
        }
      )
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Registering user: pending");
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Registering user: fulfilled", action.payload);
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "An error occurred.";
        console.log("Registering user: rejected", state.error);
      });
  },
});

export default userSlice.reducer;
