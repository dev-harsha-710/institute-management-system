import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService, {
  User,
} from "../../../features/UserManagement/Services/UserService";
import { hostname } from "os";

interface GetAllUserError {
  error: string;
}

interface SetUserActiveError {
  error: string;
}

interface SetUserActivePayload {
  userId: string; // Ensure userId is always a string
  isActive: boolean;
}

export const getUsersAction = createAsyncThunk<
  { users: User[] },
  { userType: string; isActive: boolean },
  { rejectValue: GetAllUserError }
>("user/get", async (payload, { rejectWithValue }) => {
  let users: User[] = [];
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
