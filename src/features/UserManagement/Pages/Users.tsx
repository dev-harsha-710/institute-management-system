import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/Store/hooks";
import {
  deactivateUserAction,
  getUsersAction,
} from "../../../redux/Action/Users/UserAction";
import { RootState } from "../../../redux/Store/store";
import Table from "../../../components/table/Table";

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("first_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [userType, setUserType] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [length, setLength] = useState<number | undefined>(0);
  const dispatch = useAppDispatch();
  const {
    users = [],
    loading,
    error,
  } = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    setLength(users?.length);
  }, [users]);
  useEffect(() => {
    dispatch(getUsersAction({ userType, isActive }));
  }, [dispatch, userType, isActive]);

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteUser = (userId: number) => {
    dispatch(deactivateUserAction(userId)).then(() => {
      dispatch(getUsersAction({ userType, isActive }));
    });
  };

  const columns = [
    { key: "first_name", label: "First Name", sortable: true },
    { key: "last_name", label: "Last Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "contact", label: "Contact", sortable: false },
    { key: "address", label: "Address", sortable: false },
    { key: "qualification", label: "Qualification", sortable: false },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div>
      <Table
        data={users}
        columns={columns}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={length ? Math.ceil(length / itemsPerPage) : 0}
        sortBy={sortBy}
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        onSort={handleSort}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        handleChangeUserType={setUserType}
        userType={userType}
        isActive={isActive}
        setIsActive={setIsActive}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Users;
