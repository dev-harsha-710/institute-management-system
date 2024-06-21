import { FormEventHandler } from "react";

export interface IForm {
  submit: FormEventHandler<HTMLFormElement>;
  inputs: IInput[];
  buttons: IButton[];
  resetPassword?: ILinks;
  signinOrSignup?: ILinks;
  selectInputs?: ISelectionInput[];
  radioInputs?: IRadioInput[];
  dateInputs?: IDateInput[];
}
export type Option = {
  value: string;
  text: string;
  checked?: boolean;
};
export interface IInput {
  type: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  label?: string;
  readOnly?: boolean;
  min?: string;
  max?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IRadioInput {
  name: string;
  value: string;
  actualValue?: string;
  onChange: (value: string) => void;
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

export interface IDateInput {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat: string;
  name: string;
  label?: string;
}

export interface IButton {
  type: "button" | "submit" | "reset";
  name: string;
  onClick?: any;
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
  passingYear: string;
  casteCategory: string;
  subCaste: string;
  password: string;
  date: Date | null;
}

export interface IRegisterPayload extends IRegister {
  dob?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
