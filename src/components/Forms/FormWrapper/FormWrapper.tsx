import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const FormWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full justify-center items-center mt-10">
      <div className="max-w-screen-lg w-full flex items-center">
        <div className="w-full pt-6 pb-6 border rounded-lg shadow-lg flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
