import React, { useState } from "react";
import TableHeadingOrData from "../../components/table/TableHeadingOrData";
import { User } from "../../features/UserManagement/Services/UserService";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch } from "../../redux/Store/hooks";
import { getUsersAction } from "../../redux/Action/Users/UserAction";
import { Select } from "@material-tailwind/react";
import SelectionInput from "../Forms/Input/SelectionInput";
import Label from "../Forms/Label/label";

interface TableProps {
  data: User[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  searchTerm: string;
  onSort: (field: string) => void;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
  handleChangeUserType: (type: string) => void;
  userType: string;
}

const Table: React.FC<TableProps> = ({
  data,
  currentPage,
  itemsPerPage,
  totalPages,
  sortBy,
  sortOrder,
  searchTerm,
  onSort,
  onSearch,
  onPageChange,
  handleChangeUserType,
  userType,
}) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = async () => {
    setIsActive((prevIsActive) => !prevIsActive);
    if (!isActive) {
      await dispatch(getUsersAction({ userType: "", isActive: true }));
    } else {
      await dispatch(getUsersAction({ userType: "", isActive: false }));
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy as keyof User]?.toString() ?? "";
    const bValue = b[sortBy as keyof User]?.toString() ?? "";
    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredData = sortedData.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-300">
      <header className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <SelectionInput
            name=""
            onChange={(e) => handleChangeUserType(e.target.value)}
            value={userType}
            options={[
              { value: "", text: "All" },
              { value: "admins", text: "Admins" },
              { value: "faculties", text: "Faculties" },
              { value: "students", text: "Students" },
            ]}
          ></SelectionInput>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold text-lg">
            Active
            <input
              className="ml-2"
              type="checkbox"
              checked={isActive}
              onChange={handleCheckboxChange}
            />
          </th>
        </div>
        {/* <h2 className="text-center font-bold text-2xl text-gray-800 uppercase ">
          Users
        </h2> */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
          <CiSearch className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" />
        </div>
      </header>
      <div className="p-3">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full bg-white">
            <thead className="bg-gray-200 uppercase ">
              <tr>
                <TableHeadingOrData
                  key="first_name"
                  text="First Name"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase cursor-pointer"
                  onClick={() => onSort("first_name")}
                />
                <TableHeadingOrData
                  key="last_name"
                  text="Last Name"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase cursor-pointer"
                  onClick={() => onSort("last_name")}
                />
                <TableHeadingOrData
                  key="email"
                  text="Email"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase cursor-pointer"
                  onClick={() => onSort("email")}
                />
                <TableHeadingOrData
                  key="contact"
                  text="Contact"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase"
                />
                <TableHeadingOrData
                  key="address"
                  text="Address"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase"
                />
                <TableHeadingOrData
                  key="gender"
                  text="Gender"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase"
                />
                <TableHeadingOrData
                  text="Action"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <TableHeadingOrData
                    text={user.first_name}
                    type="data"
                    className="px-6 py-3"
                  />
                  <TableHeadingOrData
                    text={user.last_name}
                    type="data"
                    className="px-6 py-3"
                  />
                  <TableHeadingOrData
                    text={user.email}
                    type="data"
                    className="px-6 py-3"
                  />
                  <TableHeadingOrData
                    text={user.contact?.toString()}
                    type="data"
                    className="px-6 py-3"
                  />
                  <TableHeadingOrData
                    text={user.address}
                    type="data"
                    className="px-6 py-3"
                  />
                  <TableHeadingOrData
                    text={user.gender}
                    type="data"
                    className="px-6 py-3"
                  />
                  {/* <TableHeadingOrData
                    text="Edit/Delete"
                    type="data"
                    className="px-6 py-3"
                  /> */}
                  <td className="px-6 py-6 flex justify-between">
                    <FaPencilAlt className="cursor-pointer text-slate-600" />
                    <FaTrash className="cursor-pointer text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() =>
                onPageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 "
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                onPageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
