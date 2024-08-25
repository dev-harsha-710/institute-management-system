import axios from "axios";

const BASE_URL = "https://developerschool-backend.onrender.com/api/v1";
export const addIncome = async (incomeData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/revenue/addIncome`,
      incomeData
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding income:", error);
    throw error;
  }
};
export const hasStudentEnrolled = async (userId: number, courseId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/enrollment/hasStudentEnrolled`,
      {
        params: {
          userId: userId,
          courseId: courseId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error checking enrollment:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export const enrollStudent = async (userId: number, courseId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/enrollment/post`, {
      user_id: userId,
      course_id: courseId,
    });
    console.log("Enrollment Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error enrolling student:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export const updateUserRoleById = async (userId: number, roleId: number) => {
  try {
    console.log(userId, roleId);
    console.log(`${BASE_URL}/users/updateRole/${userId}`);
    const response = await axios.put(`${BASE_URL}/users/updateRole/${userId}`, {
      role_id: roleId,
    });
    console.log("Update Role Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error updating user role:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
