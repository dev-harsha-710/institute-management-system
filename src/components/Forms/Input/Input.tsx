import React from "react";
import { IInput } from "../../../modals/FormModal";

const Input: React.FC<IInput> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="mb-4 text-left text-md">
      <input
        type={type}
        className="appearance-none border border-gray-300 rounded min-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
