import React, { useState } from "react";
import Header from "../../../components/Forms/Header/Header";
import FormWrapper from "../../../components/Forms/FormWrapper/FormWrapper";
import Form from "../../../components/Forms/Form/Form";
import backgroundImage from "../../../assets/images/Untitled.jpeg";
import { ILogin } from "../../../modals/FormModal";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../redux/Store/hooks";
import { loginAction } from "../../../redux/Action/Auth/authActions";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
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
      const resultAction = await dispatch(loginAction(credentials));
      console.log(resultAction);

      if (loginAction.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        if (resultAction.payload?.error) {
          console.error(resultAction.payload.error);
        } else {
          alert("Login failed. Please try again.");
        }
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
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
