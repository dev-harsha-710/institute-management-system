import React, { useState } from "react";
import CourseService from "../../../features/Courses/Services/CourseService";
import { ICourse } from "../../../features/Courses/Modals/CourseModals";
import Form from "./Form";
import { IButton } from "../../../modals/FormModal";

const AddCourseForm: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const [course, setCourse] = useState<Omit<ICourse, "id">>({
    course_id: 0,
    course_name: "",
    course_fees: "",
    course_duration: "",
  });
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await CourseService.addCourse(course);
      alert("Course added successfully!");
      closeAddModal();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add course");
    }
  };

  const inputs = [
    {
      type: "text",
      label: "Course Name",
      value: course.course_name,
      onChange: handleChange,
      name: "course_name",
      placeholder: "Enter course name",
    },
    {
      type: "text",
      label: "Fees",
      value: course.course_fees,
      onChange: handleChange,
      name: "course_fees",
      placeholder: "Enter course fees",
    },
    {
      type: "text",
      label: "Duration",
      value: course.course_duration,
      onChange: handleChange,
      name: "course_duration",
      placeholder: "Enter course duration",
    },
  ];

  const buttons: IButton[] = [
    {
      type: "submit",
      name: "Add Course",
    },
  ];

  return <Form submit={handleSubmit} inputs={inputs} buttons={buttons} />;
};

export default AddCourseForm;
