import React from "react";
import { IRadioInput } from "../../../modals/FormModal";

const RadioInput: React.FC<IRadioInput> = ({ value, onChange, name }) => {
  return (
    <div>
      <input
        type="radio"
        value={value}
        checked={value === value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default RadioInput;
