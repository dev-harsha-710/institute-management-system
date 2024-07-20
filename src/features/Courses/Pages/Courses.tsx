import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import HTML from "../../../assets/images/HTML.png"; // Default image for courses
import Form from "../../../components/Forms/Form/Form";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modals/Modal";
import { useSelector } from "react-redux";
import axios from "axios";

interface IEnrollmentData {
  courseName: string;
  courseFees: string;
  paidFees: string;
  balanceFees: string;
  incomeAmount: string;
  transactionId: string;
  userId: string;
  revenueCategoryId: string;
}

const Courses = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);

  const initialEnrollmentData: IEnrollmentData = {
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(enrollmentData);
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
