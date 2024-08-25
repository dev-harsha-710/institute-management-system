import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import HTML from "../../../assets/images/HTML.png";
import Form from "../../../components/Forms/Form/Form";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modals/Modal";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  addIncome,
  enrollStudent,
  hasStudentEnrolled,
  updateUserRoleById,
} from "../Services/EnrollmentService";
import { IEnrollmentData } from "../Modals/EnrollmentModal";

const Courses = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);

  const initialEnrollmentData: IEnrollmentData = {
    courseId: selectedCard?.id || 0,
    courseName: selectedCard?.course_name || "",
    courseFees: selectedCard?.course_fees?.toString() || "",
    paidFees: "",
    balanceFees: "",
    incomeAmount: "",
    transactionId: "454545",
    userId: auth.user.user_id || "",
    revenueCategoryId: "1063",
  };

  const [enrollmentData, setEnrollmentData] = useState<IEnrollmentData>(
    initialEnrollmentData
  );

  useEffect(() => {
    if (selectedCard) {
      setEnrollmentData({
        courseId: selectedCard?.id || 0,
        courseName: selectedCard ? selectedCard.productName : "",
        courseFees: selectedCard ? selectedCard.price.toString() : "",
        paidFees: "",
        balanceFees: "",
        incomeAmount: "",
        transactionId: "454545",
        userId: auth.user.user_id,
        revenueCategoryId: "1063",
      });
    }
  }, [selectedCard, auth.user.user_id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://developerschool-backend.onrender.com/api/v1/course2/get"
        );
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.body)) {
          setCourses(response.data.body);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const toggleModal = () => {
    setToggle(!toggle);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "paidFees") {
      const balance = calculateBalance(value, enrollmentData.courseFees);
      setEnrollmentData({
        ...enrollmentData,
        [name]: value,
        incomeAmount: value,
        balanceFees: balance,
      });
    } else {
      setEnrollmentData({
        ...enrollmentData,
        [name]: value,
      });
    }
  };

  const calculateBalance = (paidFees: string, courseFees: string) => {
    const paid = parseFloat(paidFees);
    const course = parseFloat(courseFees);
    if (!isNaN(paid) && !isNaN(course)) {
      return (course - paid).toString();
    }
    return "";
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(enrollmentData);
    console.log(auth.user.role_id);

    try {
      const incomeResponse = await addIncome({
        total_fees: parseFloat(enrollmentData.courseFees),
        balance_fees: parseFloat(enrollmentData.balanceFees),
        paid_fees: parseFloat(enrollmentData.paidFees),
        transaction_id: parseInt(enrollmentData.transactionId),
        amount: parseFloat(enrollmentData.incomeAmount),
        user_id: parseInt(enrollmentData.userId),
        revenue_category_id: parseInt(enrollmentData.revenueCategoryId),
      });
      console.log(incomeResponse);
      if (incomeResponse.message !== "INCOME_DETAILS_IS_ADDED_SUCCESSFULLY") {
        console.log("Income not added");
      } else {
        if (enrollmentData.courseId) {
          const enrollmentStatus = await hasStudentEnrolled(
            parseInt(enrollmentData.userId),
            enrollmentData.courseId
          );
          console.log("Enrollment status:", enrollmentStatus);

          if (enrollmentStatus.description !== "USER_HAS_ALREADY_ENROLLED") {
            // logic for enrollment
            const enrollmentResponse = await enrollStudent(
              parseInt(enrollmentData.userId),
              enrollmentData.courseId
            );
            console.log("Enrollment Response:", enrollmentResponse);

            if (enrollmentResponse.message !== "ENROLLMENT_SUCCESSFUL") {
              // check the role of user
              if (auth.user.role_id === 4) {
                // if the role_id is 4 then call the update role id = 4
                try {
                  // Update the user's role to a different role (example: role_id 3)
                  const updatedRoleResponse = await updateUserRoleById(
                    parseInt(enrollmentData.userId),
                    3
                  );
                  console.log(updatedRoleResponse);
                  console.log(
                    "Role updated successfully:",
                    updatedRoleResponse
                  );
                } catch (error) {
                  console.error("Error updating user role:", error);
                }
              }
            } else {
              console.log("Enrollment failed:", enrollmentResponse.message);
            }
          }
        } else {
          console.error("Course ID is missing in selectedCard");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to process enrollment:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
    setEnrollmentData(initialEnrollmentData);
    setToggle(false);
  };

  const handleCardClick = (data: any) => {
    setSelectedCard(data);
    setToggle(true);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form Submitted with card data:", formData);
  };

  return (
    <>
      {toggle && selectedCard ? (
        <Modal
          isOpen={toggle}
          toggle={toggleModal}
          onSubmit={handleFormSubmit}
          selectedCard={selectedCard}
          heading="Enrollment form"
        >
          <Form
            submit={handleSubmit}
            inputs={[
              {
                name: "courseName",
                label: "Course Name",
                type: "text",
                value: enrollmentData.courseName,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
              {
                name: "courseFees",
                label: "Course Fees",
                type: "number",
                value: enrollmentData.courseFees,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
              {
                name: "paidFees",
                label: "Enter Paid Fees",
                type: "number",
                value: enrollmentData.paidFees,
                onChange: handleInputChange,
                placeholder: "",
                min: "100",
                max: enrollmentData.courseFees,
              },
              {
                name: "balanceFees",
                label: "Balance Fees",
                type: "number",
                value: enrollmentData.balanceFees,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
              {
                name: "incomeAmount",
                type: "hidden",
                value: enrollmentData.incomeAmount,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
              {
                name: "transactionId",
                type: "hidden",
                value: enrollmentData.transactionId,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
              {
                name: "userId",
                type: "hidden",
                value: enrollmentData.userId,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
              {
                name: "revenueCategoryId",
                type: "hidden",
                value: enrollmentData.revenueCategoryId,
                onChange: handleInputChange,
                placeholder: "",
                readOnly: true,
              },
            ]}
            buttons={[
              { type: "submit", name: "submit" },
              { type: "reset", name: "reset" },
            ]}
          />
        </Modal>
      ) : null}
      <div className="text-3xl font-bold text-gray-600 mb-7 mt-2">
        Available Courses
      </div>

      {Array.isArray(courses) && courses.length > 0 ? (
        <Cards
          cardData={courses.map((course) => ({
            id: course.course_id,
            imageUrl: course.imageUrl || HTML,
            duration: course.course_duration,
            price: course.course_fees,
            productName: course.course_name,
            description: course.description || "",
            onClick: handleCardClick,
          }))}
          onCardClick={handleCardClick}
        />
      ) : (
        <p>No courses available.</p>
      )}
    </>
  );
};

export default Courses;
