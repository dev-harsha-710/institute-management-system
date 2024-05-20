import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import HTML from "../../../assets/images/HTML.png";
import Form from "../../../components/Forms/Form/Form";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modals/Modal";

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
  const { auth } = useAuth();

  const initialEnrollmentData: IEnrollmentData = {
    courseName: selectedCard ? selectedCard.productName : "",
    courseFees: selectedCard ? selectedCard.price.toString() : "",
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
    if (toggle && selectedCard) {
      setEnrollmentData({
        courseName: selectedCard.productName,
        courseFees: selectedCard.price.toString(),
        paidFees: "",
        balanceFees: "",
        incomeAmount: "",
        transactionId: "454545",
        userId: auth.user.user_id,
        revenueCategoryId: "1063",
      });
    }
  }, [toggle, selectedCard, auth]);

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
    toggleModal();
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
                type: "hidden",
                name: "incomeAmount",
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

      <Cards
        cardData={[
          {
            imageUrl: HTML,
            duration: 1,
            price: 299,
            productName: "HTML 4",
            description: "Skeleton of website",
            onClick: handleCardClick,
          },
          {
            imageUrl: HTML,
            duration: 1,
            price: 299,
            productName: "HTML 5",
            description: "Enhanced HTML",
            onClick: handleCardClick,
          },
          {
            imageUrl: HTML,
            duration: 2,
            price: 399,
            productName: "CSS",
            description: "Styles the website",
            onClick: handleCardClick,
          },
          {
            imageUrl: HTML,
            duration: 1,
            price: 399,
            productName: "CSS 3",
            description: "Enhanced CSS",
            onClick: handleCardClick,
          },
          {
            imageUrl: HTML,
            duration: 3,
            price: 599,
            productName: "Javascript",
            description: "Makes the website dynamic",
            onClick: handleCardClick,
          },
          {
            imageUrl: HTML,
            duration: 6,
            price: 1500,
            productName: "Java",
            description: "Makes the website dynamic",
            onClick: handleCardClick,
          },
        ]}
        onCardClick={handleCardClick}
      />
    </>
  );
};

export default Courses;
