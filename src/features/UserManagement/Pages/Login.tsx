import React, { useState } from "react";
import Header from "../../../components/Forms/Header/Header";
import FormWrapper from "../../../components/Forms/FormWrapper/FormWrapper";
import Form from "../../../components/Forms/Form/Form";
import backgroundImage from "../../../assets/images/Untitled.jpeg";
import { login } from "../Services/authService";
import { ILogin } from "../../../modals/FormModal";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    password: "",
  });

  const { setAuth } = useAuth();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await login(credentials.email, credentials.password);
      console.log("Login successful! Result:", result);
      if (result === "USER NOT FOUND") {
        alert("USER NOT FOUND");
      } else {
        setAuth({
          user: result?.user,
          accessToken: result?.accessToken,
          role: result?.role,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleReset = () => {
    setCredentials({
      email: "",
      password: "",
    });
  };

  return (
    <FormWrapper>
      <div className="w-1/2">
        <div className="max-w-md mx-auto">
          <Header text="Login" />
          <Form
            submit={handleSubmit}
            inputs={[
              {
                label: "Email",
                type: "email",
                placeholder: "Enter your Email",
                value: credentials.email,
                onChange: handleInputChange,
                name: "email",
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
                value: credentials.password,
                onChange: handleInputChange,
              },
            ]}
            resetPassword={{
              link: "/reset-password",
              text: "Forgot Password?",
            }}
            signinOrSignup={{
              link: "/register",
              text: "Apply for new admission",
              extraText: "New here ?",
            }}
            buttons={[{ type: "submit", name: "Sign In" }]}
          />
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <img
          src={backgroundImage}
          alt="Background"
          className="max-h-full max-w-full"
        />
      </div>
    </FormWrapper>
  );
};

export default Login;
