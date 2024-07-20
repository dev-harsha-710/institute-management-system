import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deactivateUserAction,
  getUsersAction,
  registerUserAction,
} from "../../Action/Users/UserAction";
import { IUser } from "../../../features/UserManagement/Modals/UserModals";

interface UserState {
  users: IUser[] | null;
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
        (state, action: PayloadAction<{ users: IUser[] }>) => {
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
      })
      .addCase(deactivateUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.users) {
          state.users = state.users.filter(
            (user) => user.user_id !== action.meta.arg
          );
        }
      })
      .addCase(deactivateUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "An error occurred.";
      });
  },
});

export default userSlice.reducer;
