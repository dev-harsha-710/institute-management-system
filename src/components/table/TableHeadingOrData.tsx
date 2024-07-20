import React from "react";

interface TableHeadingOrDataProps {
  text?: string | number;
  type: "heading" | "data";
  className?: string;
  onClick?: () => void;
}

const TableHeadingOrData: React.FC<TableHeadingOrDataProps> = ({
  text,
  type,
  className,
}) => {
  return (
    <>
      {type === "heading" ? (
        <th className={className}>{text}</th>
      ) : (
        <td className={className}>{text}</td>
      )}
    </>
  );
};

export default TableHeadingOrData;
