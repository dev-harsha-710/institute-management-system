import axios from "axios";
import { ICourse } from "../Modals/CourseModals";

const API_URL = "https://developerschool-backend.onrender.com/api/v1/";

class CourseService {
  async getAllCourses(): Promise<ICourse[]> {
    try {
      const response = await axios.get(`${API_URL}course2/get`);
      console.log(response);
      return response?.data?.body;
    } catch (error) {
      throw new Error("Failed to get all courses");
    }
  }
  async deleteCourse(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}course2/delete/${id}`);
    } catch (error) {
      throw new Error("Failed to delete course");
    }
  }
  async updateCourse(id: number, updatedCourse: ICourse): Promise<void> {
    try {
      await axios.put(`${API_URL}course2/update/${id}`, updatedCourse);
    } catch (error) {
      throw new Error("Failed to update course");
    }
  }
  async addCourse(newCourse: Omit<ICourse, "id">): Promise<void> {
    try {
      await axios.post(`${API_URL}course2/post`, newCourse);
    } catch (error) {
      throw new Error("Failed to add course");
    }
  }
}

export default new CourseService();
