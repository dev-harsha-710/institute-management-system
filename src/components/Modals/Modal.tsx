import React, { useEffect, useState } from "react";
import Form from "../Forms/Form/Form";
import Button from "../Forms/Button/Button";

export interface IModal {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (data: any) => void;
  selectedCard: any;
}

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

const Modal: React.FC<IModal> = ({
  isOpen,
  toggle,
  onSubmit,
  selectedCard,
}) => {
  const [enrollmentData, setEnrollmentData] = useState<IEnrollmentData>({
    courseName: selectedCard?.productName || "",
    courseFees: selectedCard?.price.toString() || "",
    paidFees: "",
    balanceFees: "",
    incomeAmount: "",
    transactionId: "454545",
    userId: "44",
    revenueCategoryId: "1063",
  });

  useEffect(() => {
    if (isOpen && selectedCard) {
      setEnrollmentData({
        ...enrollmentData,
        courseName: selectedCard.productName,
        courseFees: selectedCard.price.toString(),
      });
    }
  }, [isOpen, selectedCard]);

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
    onSubmit(enrollmentData);
    toggle();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-blue-950 bg-opacity-50 z-50">
          <div className="authentication-modal overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-lg max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Enrollment Form
                  </h3>
                  <Button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={toggle}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </Button>
                </div>
                <div className="p-4 md:p-5 dark:text-white">
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
                      },
                      {
                        name: "courseFees",
                        label: "Course Fees",
                        type: "number",
                        value: enrollmentData.courseFees,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                      {
                        name: "paidFees",
                        label: "Enter Paid Fees",
                        type: "number",
                        value: enrollmentData.paidFees,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                      {
                        name: "balanceFees",
                        label: "Balance Fees",
                        type: "number",
                        value: enrollmentData.balanceFees,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                      {
                        type: "number",
                        label: "Income Amount",
                        name: "incomeAmount",
                        value: enrollmentData.incomeAmount,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                      {
                        name: "transactionId",
                        label: "Transaction Id",
                        type: "number",
                        value: enrollmentData.transactionId,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                      {
                        name: "userId",
                        label: "User Id",
                        type: "number",
                        value: enrollmentData.userId,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                      {
                        name: "revenueCategoryId",
                        label: "Revenue Category Id",
                        type: "number",
                        value: enrollmentData.revenueCategoryId,
                        onChange: handleInputChange,
                        placeholder: "",
                      },
                    ]}
                    buttons={[
                      { type: "submit", name: "submit" },
                      { type: "reset", name: "reset" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
