import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../features/UserManagement/Services/UserService";
import axios from "axios";
import { IUser } from "../../../features/UserManagement/Modals/UserModals";

export interface RegisterUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact: number;
  address: string;
  qualification: string;
  passing_year: number;
  dob: string;
  gender: string;
  caste_category: string;
  sub_caste: string;
}
export interface RegisterUserResponse {
  user_id: number;
}

interface RegisterUserError {
  error: string;
}
interface GetAllUserError {
  error: string;
}
interface DeactivateUserError {
  error: string;
}

export const getUsersAction = createAsyncThunk<
  { users: IUser[] },
  { userType: string; isActive: boolean },
  { rejectValue: GetAllUserError }
>("user/get", async (payload, { rejectWithValue }) => {
  let users: IUser[] = [];
  try {
    switch (payload.userType) {
      case "admins":
        users = await UserService.getAllAdmins();
        break;
      case "faculties":
        users = await UserService.getAllFaculties();
        break;
      case "students":
        users = await UserService.getAllStudents();
        break;
      default:
        users = payload.isActive
          ? await UserService.getActiveUsers()
          : await UserService.getAllUsers();
        break;
    }
    return { users };
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});
export const registerUserAction = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserPayload,
  { rejectValue: RegisterUserError }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "https://developerschool-backend.onrender.com/api/v1/users/add",
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      error: error.response?.data?.message || error.message,
    });
  }
});
export const deactivateUserAction = createAsyncThunk<
  void,
  number,
  { rejectValue: DeactivateUserError }
>("user/deactivate", async (userId, { rejectWithValue }) => {
  try {
    await axios.put(
      `https://developerschool-backend.onrender.com/api/v1/users/deactivate/${userId}`
    );
  } catch (error: any) {
    return rejectWithValue({
      error: error.response?.data?.message || error.message,
    });
  }
});
