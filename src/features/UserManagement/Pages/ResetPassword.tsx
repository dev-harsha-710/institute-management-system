import React, { useState } from "react";
import Header from "../../../components/Forms/Header/Header";
import Input from "../../../components/Forms/Input/Input";
import Button from "../../../components/Forms/Button/Button";
import Label from "../../../components/Forms/Label/label";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/Forms/Form/Form";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Reset password email:", email);
    navigate("/login");
  };

  return (
    <div className="w-1/2 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
      <Header text="Reset Password" className="" />
      <Form
        submit={handleSubmit}
        inputs={[
          {
            type: "email",
            placeholder: "Enter your Email",
            value: email,
            onChange: handleEmailChange,
            name: "email",
            label: "Email",
          },
        ]}
        buttons={[{ type: "reset", name: "Reset Password" }]}
        signinOrSignup={{
          link: "/login",
          text: "sign in",
          extraText: "Remember your password?",
        }}
      />
    </div>
  );
};

export default ResetPassword;
