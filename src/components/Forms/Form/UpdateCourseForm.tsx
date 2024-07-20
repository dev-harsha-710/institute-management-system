import React, { useState, useEffect } from "react";
import { ICourse } from "../../../features/Courses/Modals/CourseModals";
import Form from "./Form";
import { IButton } from "../../../modals/FormModal";

interface UpdateCourseFormProps {
  onSubmit: (updatedCourse: ICourse) => void;
  initialValues?: ICourse | null;
}

const UpdateCourseForm: React.FC<UpdateCourseFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [course, setCourse] = useState<ICourse>({
    id: 0,
    course_id: 0,
    course_name: "",
    course_fees: "",
    course_duration: "",
  });

  useEffect(() => {
    if (initialValues) {
      setCourse(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(course);
  };

  const inputs = [
    {
      type: "text",
      label: "Course Name",
      value: course.course_name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCourse({ ...course, course_name: e.target.value }),
      name: "course_name",
      placeholder: "Enter course name",
    },
    {
      type: "text",
      label: "Fees",
      value: course.course_fees,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCourse({ ...course, course_fees: e.target.value }),
      name: "course_fees",
      placeholder: "Enter course fees",
    },
    {
      type: "text",
      label: "Duration",
      value: course.course_duration,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCourse({ ...course, course_duration: e.target.value }),
      name: "course_duration",
      placeholder: "Enter course duration",
    },
  ];

  const buttons: IButton[] = [
    {
      type: "submit",
      name: "Update",
    },
  ];

  return <Form submit={handleSubmit} inputs={inputs} buttons={buttons} />;
};

export default UpdateCourseForm;
