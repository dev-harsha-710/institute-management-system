import React from "react";
import { ISelectionInput, Option } from "../../../modals/FormModal";

const SelectionInput: React.FC<ISelectionInput> = ({
  value,
  onChange,
  name,
  options,
}) => {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className=" border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option: Option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectionInput;
{
  /* <select
                    value={info.selectedCourse}
                    onChange={handleInputChange}
                    name="selectedCourse"
                  >
                    <option value="">Select Course</option>
                    <option value="BscIT">BscIT</option>
                    <option value="BscCS">BscCS</option>
                    <option value="BBA">BBA</option>
                    <option value="BCOM">BCOM</option>
                    <option value="BTech">BTech</option>
                    <option value="BE">BE</option>
                  </select>  */
}
