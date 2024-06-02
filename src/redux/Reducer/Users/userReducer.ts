import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUsersAction } from "../../Action/Users/UserAction";
import { LoginError } from "../../Action/Auth/authActions";
import { User } from "../../../features/UserManagement/Services/UserService";

interface UserState {
  users: any;
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
      .addCase(getUsersAction.pending, (state) => {})
      .addCase(
        getUsersAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            users: User[];
          }>
        ) => {
          state.users = action.payload.users;
          state.error = null;
        }
      )
      .addCase(
        getUsersAction.rejected,
        (state, action: PayloadAction<LoginError | undefined>) => {
          if (action.payload) {
            state.error = action.payload.error;
          } else {
            state.error = "An error occurred.";
          }
          state.users = null;
        }
      );
  },
});
export default userSlice.reducer;
