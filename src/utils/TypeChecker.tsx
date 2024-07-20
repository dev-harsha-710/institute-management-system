import { ICourse } from "../features/Courses/Modals/CourseModals";
import { IUser } from "../features/UserManagement/Modals/UserModals";

export const isUser = (obj: any): obj is IUser => {
  return (
    (obj as IUser).email !== undefined && (obj as IUser).contact !== undefined
  );
};

export const isCourse = (obj: any): obj is ICourse => {
  return (
    (obj as ICourse).course_name !== undefined &&
    (obj as ICourse).course_fees !== undefined
  );
};
