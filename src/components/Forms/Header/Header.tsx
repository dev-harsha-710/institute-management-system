import React from "react";
interface Props {
  text: string;
  className?: string;
}
const Header: React.FC<Props> = ({ text }) => {
  return (
    <header className="text-center py-4">
      <h1 className="text-2xl font-bold">{text}</h1>
    </header>
  );
};

export default Header;
