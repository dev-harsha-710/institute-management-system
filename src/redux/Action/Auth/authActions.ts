import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../../features/UserManagement/Services/authService"; // Adjust the path as necessary
import { ILogin, IRegister } from "../../../modals/FormModal";

interface LoginPayload {
  user: IRegister;
  accessToken: string;
  role: string;
}

export interface LoginError {
  error: string;
}

export const loginAction = createAsyncThunk<
  LoginPayload,
  ILogin,
  { rejectValue: LoginError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await login(credentials.email, credentials.password);

    // Log the response to check its structure
    console.log("Login response structure:", response);

    // Ensure the response contains the expected properties
    if (!response || !response.email) {
      throw new Error("Invalid response structure");
    }

    return {
      user: response,
      accessToken: response.token,
      role: response.role_id,
    };
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});
