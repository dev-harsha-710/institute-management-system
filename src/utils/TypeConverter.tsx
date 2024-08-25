import { ICourse } from "../features/Courses/Modals/CourseModals";
import { IUser } from "../features/UserManagement/Modals/UserModals";
import { isCourse, isUser } from "./TypeChecker";

export function convertToObject<T extends any>(data: T): any {
  if (isUser(data)) {
    let userObject: IUser = {
      first_name: data.first_name,
      last_name: data.last_name,
      caste_category: data.caste_category,
      address: data.address,
      contact: data.contact,
      dob: data.dob,
      email: data.email,
      gender: data.gender,
      passing_year: data.passing_year,
      role_id: data.role_id,
      password: data.password,
      qualification: data.qualification,
      subcaste: data.subcaste,
      user_id: data.user_id,
      isActive: data.isActive,
      // id: data.id,
    };

    return userObject;
  } else if (isCourse(data)) {
    let courseObject: ICourse = {
      course_duration: data.course_duration,
      course_id: data.course_id,
      course_fees: data.course_fees,
      course_name: data.course_name,
      id: data.id,
    };

    return courseObject;
  } else throw new Error("Object is of unknown type");
}
