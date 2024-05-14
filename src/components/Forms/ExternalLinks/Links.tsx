import React from "react";
import { Link } from "react-router-dom";
import { ILinks } from "../../../modals/FormModal";

const Links: React.FC<ILinks> = ({ text, link, extraText }) => {
  return (
    <>
      <span className="text-sm">{extraText}</span>
      <Link to={link} className="text-blue-500 ml-1 underline ">
        {text}
      </Link>
    </>
  );
};

export default Links;
