import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import HTML from "../../../assets/images/HTML.png";
import Modal from "../../../components/Modals/Modal";

const Courses = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const toggleModal = () => {
    setToggle(!toggle);
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
        />
      ) : null}
      <div className="text-3xl font-bold text-gray-600 mb-7 mt-2 ">
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
            onClick: toggleModal,
          },
          {
            imageUrl: HTML,
            duration: 1,
            price: 299,
            productName: "HTML 5",
            description: "Enhanced HTML",
            onClick: toggleModal,
          },
          {
            imageUrl: HTML,
            duration: 2,
            price: 399,
            productName: "CSS",
            description: "Styles the website",
            onClick: toggleModal,
          },
          {
            imageUrl: HTML,
            duration: 1,
            price: 399,
            productName: "CSS 3",
            description: "Enhanced CSS",
            onClick: toggleModal,
          },
          {
            imageUrl: HTML,
            duration: 3,
            price: 599,
            productName: "Javascript",
            description: "Makes the website dynamic",
            onClick: toggleModal,
          },
          {
            imageUrl: HTML,
            duration: 6,
            price: 1500,
            productName: "Java",
            description: "Makes the website dynamic",
            onClick: toggleModal,
          },
        ]}
        onCardClick={handleCardClick}
      />
    </>
  );
};

export default Courses;
