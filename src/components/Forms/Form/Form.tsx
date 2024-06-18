import React from "react";
import Input from "../Input/Input";
import Label from "../Label/label";
import Button from "../Button/Button";
import { IForm } from "../../../modals/FormModal";
import Links from "../ExternalLinks/Links";
import SelectionInput from "../Input/SelectionInput";
import RadioInput from "../Input/RadioInput";

const Form: React.FC<IForm> = ({
  submit,
  inputs,
  selectInputs,
  buttons,
  resetPassword,
  signinOrSignup,
  radioInputs,
}) => {
  return (
    <form className="mt-4" onSubmit={submit}>
      <div
        className={
          inputs.length > 5
            ? `grid grid-cols-1 md:grid-cols-2 gap-6`
            : `relative`
        }
      >
        {inputs.map((myInput, index) => (
          <div className="relative" key={index}>
            <Label text={myInput.label} />
            <Input
              type={myInput.type}
              value={myInput.value}
              onChange={myInput.onChange}
              placeholder={myInput.placeholder}
              name={myInput.name}
              readOnly={myInput.readOnly}
              min={myInput.min}
              max={myInput.max}
            />
          </div>
        ))}
        {radioInputs && radioInputs.length > 0 && (
          <div className="relative">
            {radioInputs.map((radioInput, index) => (
              <div className="">
                <Label text={radioInput.label} />
                <div className="flex justify-between pt-3">
                  {radioInput.options &&
                    radioInput.options.map((option) => (
                      <div className="flex gap-3">
                        <Label text={option.text} />
                        <RadioInput
                          value={option.value}
                          actualValue={radioInput.value}
                          onChange={radioInput.onChange}
                          name={radioInput.name}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {selectInputs &&
          Array.isArray(selectInputs) &&
          selectInputs.map((selectInput, index) => (
            <div className="relative" key={index}>
              <Label text={selectInput.label} />
              <SelectionInput
                options={selectInput.options}
                value={selectInput.value}
                onChange={selectInput.onChange}
                name={selectInput.name}
              />
            </div>
          ))}
      </div>
      {resetPassword && (
        <div className="text-start">
          <Links link={resetPassword.link} text={resetPassword.text} />
        </div>
      )}

      <div
        className={
          buttons.length > 1 ? `grid grid-cols-1 md:grid-cols-2 gap-6` : ``
        }
      >
        {buttons.map((button, index) => (
          <div className="relative" key={index}>
            <Button type={button.type} name={button.name} />
          </div>
        ))}
      </div>
      {signinOrSignup && (
        <div className="mt-3">
          <Links
            link={signinOrSignup.link}
            text={signinOrSignup.text}
            extraText={signinOrSignup.extraText}
          />
        </div>
      )}
    </form>
  );
};

export default Form;
