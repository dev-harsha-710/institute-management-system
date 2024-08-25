import React from "react";
import TableHeadingOrData from "../../components/table/TableHeadingOrData";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SelectionInput from "../Forms/Input/SelectionInput";
import Button from "../Forms/Button/Button";
import { convertToObject } from "../../utils/TypeConverter";
import { ICourse } from "../../features/Courses/Modals/CourseModals";
import { isCourse } from "../../utils/TypeChecker";
import { IUser } from "../../features/UserManagement/Modals/UserModals";

export interface Column<T> {
  key: string;
  label: string;
  sortable: boolean;
  render?: (item: T) => JSX.Element;
}

interface TableProps<T> {
  data: T[] | null;
  columns: Column<T>[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  searchTerm: string;
  onSort: (field: string) => void;
  onSearch: (term: string) => void;
  onPageChange: (page: number) => void;
  handleChangeUserType?: (type: string) => void;
  userType?: string;
  isActive?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (id: number) => void;
  children?: React.ReactNode;
  actions?: {
    onEdit: (item: T) => void;
    onDelete: (id: number) => Promise<void>;
  };
  showAddButton?: boolean;
  onAdd?: () => void;
}

const Table = <T extends IUser | ICourse>({
  data,
  columns,
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
  isActive,
  setIsActive,
  onDelete,
  children,
  actions,
  showAddButton,
  onAdd,
}: TableProps<T>) => {
  const handleEdit = (item: T) => {
    actions?.onEdit(item);
  };

  const handleCheckboxChange = async () => {
    setIsActive && setIsActive(!isActive);
  };

  data = data ? data : [];
  console.log(data);
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy as keyof T]?.toString() ?? "";
    const bValue = b[sortBy as keyof T]?.toString() ?? "";
    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-300">
      {children}
      <header className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {handleChangeUserType && (
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
            />
          )}
          {isActive !== undefined && setIsActive && (
            <th className="px-6 py-3 text-left text-gray-600 font-semibold text-lg">
              Active
              <input
                className="ml-2"
                type="checkbox"
                checked={isActive}
                onChange={handleCheckboxChange}
              />
            </th>
          )}
        </div>
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
        {showAddButton && (
          <Button
            type="button"
            onClick={onAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </Button>
        )}
      </header>
      <div className="p-3">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full bg-white">
            <thead className="bg-gray-200 uppercase">
              <tr>
                {columns.map((column) => (
                  <TableHeadingOrData
                    key={column.key}
                    text={column.label}
                    type="heading"
                    className={`px-6 py-3 text-left text-gray-500 font-semibold uppercase cursor-pointer ${
                      column.sortable ? "cursor-pointer" : ""
                    }`}
                    onClick={() => column.sortable && onSort(column.key)}
                  />
                ))}
                <TableHeadingOrData
                  text="Action"
                  type="heading"
                  className="px-6 py-3 text-left text-gray-500 font-semibold uppercase"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableHeadingOrData
                      key={colIndex}
                      type="data"
                      text={
                        column.render
                          ? (column.render(item) as unknown as string)
                          : (item[column.key as keyof T] as unknown as string)
                      }
                      className="px-6 py-3"
                    />
                  ))}
                  <td className="px-7 py-6 flex justify-between">
                    <Button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="bg-white"
                    >
                      <FaPencilAlt className="cursor-pointer text-slate-600" />
                    </Button>
                    <Button
                      type="button"
                      className="bg-white"
                      onClick={() => {
                        if (isCourse(item)) {
                          actions?.onDelete(item.course_id);
                        } else {
                          actions?.onDelete(item.user_id);
                        }
                      }}
                    >
                      <FaTrash className="cursor-pointer text-red-500" />
                    </Button>
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
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
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
