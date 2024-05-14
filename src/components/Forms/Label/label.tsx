import React from "react";

interface Props {
  text: string | undefined;
  className?: string;
}

const Label: React.FC<Props> = ({ text }) => {
  return <label className="block mb-1 text-start">{text}</label>;
};

export default Label;
