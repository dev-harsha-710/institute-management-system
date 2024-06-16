import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import { getUsersAction } from "../../../redux/Action/Users/UserAction";
import { useAppDispatch } from "../../../redux/Store/hooks";
import Table from "../../../components/table/Table";
import { User } from "../Services/UserService";

const Users: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("first_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const getUsers = async () => {
    await dispatch(getUsersAction({ userType, isActive }));
  };

  useEffect(() => {
    getUsers();
    console.log(users);
  }, [userType, isActive]);

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  const handleChangeUserType = (type: string) => {
    setUserType(type);
  };

  const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 1;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div></div>
      <Table
        data={users || []}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        sortBy={sortBy}
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        onSort={handleSort}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        handleChangeUserType={handleChangeUserType}
        userType={userType}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default Users;
