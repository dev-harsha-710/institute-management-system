import React from "react";
interface Props {
  year: string;
}
const Footer: React.FC<Props> = ({ year }) => {
  return (
    <footer className="inset-0 bottom-0  text-center flex justify-center h-14 pt-3 bg-slate-200 w-full align-middle">
      Copyright © {year} @ Scholar Academy
    </footer>
  );
};

export default Footer;
