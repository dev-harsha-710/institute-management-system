import React from "react";
import { IRadioInput } from "../../../modals/FormModal";

const RadioInput: React.FC<IRadioInput> = ({
  value,
  actualValue,
  onChange,
  name,
}) => {
  return (
    <div>
      <input
        type="radio"
        value={value}
        checked={value === actualValue}
        name={name}
        onClick={() => onChange(value)}
      />
    </div>
  );
};

export default RadioInput;
