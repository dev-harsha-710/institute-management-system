import React from "react";

interface TableHeadingOrDataProps {
  text: string | number;
  type: "heading" | "data";
}

const TableHeadingOrData: React.FC<TableHeadingOrDataProps> = ({
  text,
  type,
}) => {
  return <>{type === "heading" ? <th>{text}</th> : <td>{text}</td>}</>;
};

export default TableHeadingOrData;
