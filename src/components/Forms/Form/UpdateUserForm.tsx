import React, { useState, useEffect } from "react";
import Form from "./Form";
import { IButton, IInput } from "../../../modals/FormModal";
import { IUser } from "../../../features/UserManagement/Modals/UserModals";

interface UpdateUserFormProps {
  onSubmit: (updatedUser: IUser) => void;
  initialValues?: IUser;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [user, setUser] = useState<IUser>({
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    address: "",
    qualification: "",
    passing_year: "",
    dob: "",
    gender: "",
    caste_category: "",
    subcaste: "",
    role_id: 0,
    password: "",
    isActive: false,
  });

  useEffect(() => {
    if (initialValues) {
      setUser(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
    if (!user.user_id) {
      console.error("User ID is missing");
      return;
    }
    onSubmit(user);
  };

  const inputs: IInput[] = [
    {
      type: "text",
      label: "First Name",
      value: user.first_name,
      onChange: handleChange,
      name: "first_name",
      placeholder: "Enter first name",
    },
    {
      type: "text",
      label: "Last Name",
      value: user.last_name,
      onChange: handleChange,
      name: "last_name",
      placeholder: "Enter last name",
    },
    {
      type: "text",
      label: "Email",
      value: user.email,
      onChange: handleChange,
      name: "email",
      placeholder: "Enter email",
    },
    {
      type: "text",
      label: "Contact",
      value: user.contact,
      onChange: handleChange,
      name: "contact",
      placeholder: "Enter contact number",
    },
    {
      type: "text",
      label: "Address",
      value: user.address,
      onChange: handleChange,
      name: "address",
      placeholder: "Enter address",
    },
    {
      type: "text",
      label: "Qualification",
      value: user.qualification,
      onChange: handleChange,
      name: "qualification",
      placeholder: "Enter qualification",
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

export default UpdateUserForm;
