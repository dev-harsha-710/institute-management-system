import axios from "axios";
import {
  RegisterUserPayload,
  RegisterUserResponse,
} from "../../../redux/Action/Users/UserAction";
import { IUser } from "../Modals/UserModals";

const API_URL = "https://developerschool-backend.onrender.com/api/v1/";

class UserService {
  async getAllUsers(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}users`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch all users");
    }
  }

  async getAllAdmins(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}admin`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch admins");
    }
  }

  async getAllFaculties(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}faculties`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch faculties");
    }
  }

  async getAllStudents(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}students`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch students");
    }
  }

  async getActiveUsers(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}users/isActive`, {});
      console.log("getActiveUsers response:", response.data);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch active users");
    }
  }
  async registerUser(
    userData: RegisterUserPayload
  ): Promise<RegisterUserResponse> {
    try {
      const response = await axios.post(`${API_URL}users/add`, userData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to register user");
    }
  }
  async deactivateUser(userId: number): Promise<void> {
    try {
      await axios.put(`${API_URL}users/deactivate/${userId}`);
    } catch (error) {
      throw new Error("Failed to deactivate user");
    }
  }
  async updateUser(userId: number, userData: IUser): Promise<IUser> {
    try {
      const response = await axios.put(
        `${API_URL}urole/updateuser/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }
}

export default new UserService();
