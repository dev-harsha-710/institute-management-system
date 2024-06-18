import axios from "axios";
import {
  RegisterUserPayload,
  RegisterUserResponse,
} from "../../../redux/Action/Users/UserAction";

const API_URL = "https://developerschool-backend.onrender.com/api/v1/";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: number;
  address: string;
  qualification: string;
  passing_year: number;
  dob: string;
  gender: string;
  caste_category: string;
  subcaste: string;
  role_id: number;
  password: string;
  isActive: boolean;
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}users`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch all users");
    }
  }

  async getAllAdmins(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}admin`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch admins");
    }
  }

  async getAllFaculties(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}faculties`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch faculties");
    }
  }

  async getAllStudents(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}students`);
      return response.data.body;
    } catch (error) {
      throw new Error("Failed to fetch students");
    }
  }

  async getActiveUsers(): Promise<User[]> {
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
}

export default new UserService();
