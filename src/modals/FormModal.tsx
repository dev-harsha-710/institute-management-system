import { FormEventHandler } from "react";

export interface IForm {
  submit: FormEventHandler<HTMLFormElement>;
  inputs: IInput[];
  buttons: IButton[];
  resetPassword?: ILinks;
  signinOrSignup?: ILinks;
  selectInputs?: ISelectionInput[];
  radioInputs?: IRadioInput[];
}
export type Option = {
  value: string;
  text: string;
};
export interface IInput {
  type: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IRadioInput {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  options?: Option[];
}

export interface ISelectionInput {
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  name: string;
  options: Option[];
}

export interface IButton {
  type: "button" | "submit" | "reset";
  name: string;
}

export interface ILinks {
  text: string;
  link: string;
  extraText?: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  contact: string | undefined;
  email: string;
  qualification: string;
  percentage: string | undefined;
  passingYear: string;
  selectedCourse: string;
  caste: string;
  subCaste: string;
  password: "";
  confirmPassword: "";
  dateOfBirth: "";
}

export interface ILogin {
  email: string;
  password: string;
}
