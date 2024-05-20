import React from "react";
import TableHeadingOrData from "../../components/table/TableHeadingOrData";

interface User {
  name: string;
  age: number;
  number: number;
  address: string;
}

interface TableProps {
  data: User[];
}

export const data = [
  {
    name: "Harsha",
    age: 19,
    number: 8898245773,
    address: "Mira Road",
  },
  {
    name: "Reshma",
    age: 20,
    number: 8898245773,
    address: "Navi Mumbai",
  },
  {
    name: "Shrutika",
    age: 21,
    number: 8898245773,
    address: "Nagpur",
  },
  {
    name: "Vaishanavi",
    age: 21,
    number: 8898245773,
    address: "Washim",
  },
  {
    name: "Ritu",
    age: 21,
    number: 8898245773,
    address: "Navi Mumbai",
  },
  {
    name: "kalpana",
    age: 19,
    number: 8898245773,
    address: "Ghansoli",
  },
  {
    name: "Rohini",
    age: 21,
    number: 8898245773,
    address: "Thane",
  },
  {
    name: "Karishma",
    age: 20,
    number: 8898245773,
    address: "Mumbai",
  },
];

const Table: React.FC<TableProps> = ({ data }) => {
  const headings = Object.keys(data[0]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-300">
      <header className="px-5 py-4 border-b border-gray-200">
        <h6 className="font-semibold text-base text-gray-800 text-left">
          Users
        </h6>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white">
            <thead className="p-2 text-md font-semibold uppercase text-gray-400 bg-gray-200">
              <tr>
                {headings.map((heading) => (
                  <TableHeadingOrData
                    key={heading}
                    text={heading}
                    type="heading"
                  />
                ))}
                <TableHeadingOrData text="Action" type="heading" />
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {data.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <TableHeadingOrData text={user.name} type="data" />
                  <TableHeadingOrData text={user.age} type="data" />
                  <TableHeadingOrData text={user.number} type="data" />
                  <TableHeadingOrData text={user.address} type="data" />
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-500">
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
