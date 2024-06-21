import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Forms/Button/Button";
import Label from "../../../components/Forms/Label/label";
import Input from "../../../components/Forms/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../../../components/Forms/FormWrapper/FormWrapper";
import Header from "../../../components/Forms/Header/Header";
import { IRegister } from "../../../modals/FormModal";
import Form from "../../../components/Forms/Form/Form";
import {
  convertDateToISO,
  convertDateToddMMyyyy,
  convertKeysToSnakeCase,
} from "../../../utils/CaseConvertor";
import { registerUserAction } from "../../../redux/Action/Users/UserAction";
import { AppDispatch } from "../../../redux/Store/store";
import { format } from "date-fns";

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [info, setInfo] = useState<IRegister>({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    contact: "",
    email: "",
    qualification: "",
    passingYear: "",
    casteCategory: "",
    subCaste: "",
    password: "",
    dob: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
      [name]: name === "dob" ? convertDateToISO(value) : value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleRadioChange = (value: string) => {
    setInfo({
      ...info,
      gender: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const snakeCaseInfo = convertKeysToSnakeCase(info);
    console.log("Submitting payload:", snakeCaseInfo);
    dispatch(registerUserAction(snakeCaseInfo));
    console.log("Form Submitted!");
  };

  const handleReset = () => {
    setInfo({
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
      contact: "",
      email: "",
      qualification: "",
      passingYear: "",
      casteCategory: "",
      subCaste: "",
      password: "",
      dob: "",
    });
  };

  return (
    <FormWrapper>
      <div className="w-full px-20">
        <div className="mx-auto">
          <Header text="Registration" className="" />
          <Form
            submit={handleSubmit}
            inputs={[
              {
                type: "text",
                placeholder: "Enter your first name",
                value: info.firstName,
                onChange: handleInputChange,
                name: "firstName",
                label: "First Name",
              },
              {
                type: "text",
                placeholder: "Enter your last name",
                value: info.lastName,
                onChange: handleInputChange,
                name: "lastName",
                label: "Last Name",
              },
              {
                type: "email",
                placeholder: "Enter your Email here",
                value: info.email,
                onChange: handleInputChange,
                name: "email",
                label: "Email",
              },
              {
                type: "password",
                placeholder: "Enter your correct password",
                value: info.password,
                onChange: handleInputChange,
                name: "password",
                label: "Password",
              },
              {
                type: "text",
                placeholder: "Enter your contact number",
                value: info.contact,
                onChange: handleInputChange,
                name: "contact",
                label: "Contact",
              },
              {
                type: "text",
                placeholder: "Enter your address here",
                value: info.address,
                onChange: handleInputChange,
                name: "address",
                label: "Address",
              },
              {
                type: "text",
                placeholder: "Enter your qualification",
                value: info.qualification,
                onChange: handleInputChange,
                name: "qualification",
                label: "Qualification",
              },
              // {
              //   type: "text",
              //   placeholder: "Enter your percentage",
              //   value: info.percentage,
              //   onChange: handleInputChange,
              //   name: "percentage",
              //   label: "Percentage",
              // },
              {
                type: "text",
                placeholder: "Enter your passing year",
                value: info.passingYear,
                onChange: handleInputChange,
                name: "passingYear",
                label: "Passing year",
              },
              // {
              //   type: "password",
              //   placeholder: "Confirm your password",
              //   value: info.confirmPassword,
              //   onChange: handleInputChange,
              //   name: "confirmPassword",
              //   label: "Confirm Password",
              // },
              {
                type: "date",
                placeholder: "",
                value: info.dob,
                onChange: handleInputChange,
                name: "dob",
                label: "Date of Birth",
              },
            ]}
            selectInputs={[
              {
                name: "casteCategory",
                value: info.casteCategory,
                onChange: handleSelectChange,
                label: "Caste",
                options: [
                  { value: "hindu", text: "Hindu" },
                  { value: "muslim", text: "Muslim" },
                  { value: "christian", text: "Christian" },
                  { value: "sikh", text: "Sikh" },
                  { value: "jain", text: "Jain" },
                  { value: "buddhist", text: "Buddhist" },
                  { value: "other", text: "Other" },
                ],
              },
              {
                name: "subCaste",
                value: info.subCaste,
                onChange: handleSelectChange,
                label: "SubCaste",
                options: [
                  { value: "hinduSubCaste", text: "Hindu-SubCaste" },
                  { value: "muslimSubCaste", text: "Muslim-SubCaste" },
                  { value: "christianSubCaste", text: "Christian-SubCaste" },
                  { value: "sikhSubCaste", text: "Sikh-SubCaste" },
                  { value: "jainSubCaste", text: "Jain-SubCaste" },
                  { value: "buddhistSubCaste", text: "Buddhist-SubCaste" },
                  { value: "otherSubCaste", text: "Other-SubCaste" },
                ],
              },
            ]}
            radioInputs={[
              {
                name: "gender",
                value: info.gender,
                onChange: handleRadioChange,
                label: "Gender",
                options: [
                  { value: "male", text: "Male" },
                  { value: "female", text: "Female" },
                  { value: "other", text: "Other" },
                ],
              },
            ]}
            buttons={[
              { type: "submit", name: "Submit" },
              { type: "reset", name: "Reset", onClick: handleReset },
            ]}
            signinOrSignup={{
              link: "/login",
              text: "Sign in",
              extraText: "Already a member?",
            }}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default RegistrationForm;
