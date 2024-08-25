import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/Store/hooks";
import {
  deactivateUserAction,
  getUsersAction,
} from "../../../redux/Action/Users/UserAction";
import { RootState } from "../../../redux/Store/store";
import Table from "../../../components/table/Table";
import Modal from "../../../components/Modals/Modal";
import UpdateUserForm from "../../../components/Forms/Form/UpdateUserForm";
import Button from "../../../components/Forms/Button/Button";
import UserService from "../Services/UserService";
import { IUser } from "../Modals/UserModals";

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("first_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [userType, setUserType] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [length, setLength] = useState<number | undefined>(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
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
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDeleteUser = (userId: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(deactivateUserAction(userId))
        .then(() => {
          return dispatch(getUsersAction({ userType, isActive }));
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const openEditModal = (user: IUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateUser = async (updatedUser: IUser) => {
    try {
      if (!updatedUser.user_id) {
        throw new Error("User ID is required to update user");
      }

      const response = await UserService.updateUser(
        updatedUser.user_id,
        updatedUser
      );
      console.log("User updated successfully:", response);
      dispatch(getUsersAction({ userType, isActive }));
      closeEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
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
        actions={{ onEdit: openEditModal, onDelete: handleDeleteUser }}
      />
      <Modal
        isOpen={isEditModalOpen}
        toggle={closeEditModal}
        heading="Edit User"
      >
        {selectedUser && (
          <UpdateUserForm
            onSubmit={handleUpdateUser}
            initialValues={selectedUser}
          />
        )}
      </Modal>
    </div>
  );
};

export default Users;
