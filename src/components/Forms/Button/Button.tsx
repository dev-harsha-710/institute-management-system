import React from "react";

interface Props {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  name?: string;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({
  type,
  name,
  children,
  className,
  onClick,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      type={type}
      className={
        className
          ? className
          : "w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      }
      onClick={onClick}
    >
      {name ? name : children}
    </button>
  );
};

export default Button;
