import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService, {
  User,
} from "../../../features/UserManagement/Services/UserService";

interface GetAllUserError {
  error: string;
}

export const getUsersAction = createAsyncThunk<
  any,
  { userType: string; isActive: boolean },
  { rejectValue: GetAllUserError }
>("user/get", async (payload, { rejectWithValue }) => {
  let users: User[] = [];
  try {
    switch (payload?.userType) {
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
          ? await UserService.getActiveUsers(true)
          : await UserService.getAllUsers();
        break;
    }
    console.log("Active Users:", users);
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
  return { users };
});
