import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import courseService from "../Services/CourseService";
import Modal from "../../../components/Modals/Modal";
import UpdateCourseForm from "../../../components/Forms/Form/UpdateCourseForm";
import AddCourseForm from "../../../components/Forms/Form/AddCourseForm";
import { ICourse } from "../Modals/CourseModals";
import Button from "../../../components/Forms/Button/Button"; // Ensure Button component is imported

interface Column {
  key: string;
  label: string;
  sortable: boolean;
  render?: (course: ICourse) => JSX.Element;
}

const CourseAdmin = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("course_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await courseService.getAllCourses();
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSort = (field: string) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(order);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    try {
      await courseService.deleteCourse(id);
      setCourses(courses.filter((course) => course.course_id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Failed to delete course");
    }
  };

  const openEditModal = (course: ICourse) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCourse(null);
    setIsEditModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (updatedCourse: ICourse) => {
    try {
      await courseService.updateCourse(updatedCourse.course_id, updatedCourse);
      setCourses(
        courses.map((course) =>
          course.course_id === updatedCourse.course_id ? updatedCourse : course
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating course:", error);
      setError("Failed to update course");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const columns: Column[] = [
    { key: "course_id", label: "ID", sortable: true },
    { key: "course_name", label: "Course Name", sortable: true },
    { key: "course_fees", label: "Fees", sortable: true },
    { key: "course_duration", label: "Duration", sortable: true },
  ];

  const mappedCourses = courses.map((course) => ({
    id: course.course_id,
    course_id: course.course_id,
    course_name: course.course_name,
    course_fees: course.course_fees,
    course_duration: course.course_duration,
  }));

  return (
    <div className="p-5">
      <div className="flex justify-between mb-4">
        <Button
          type="button"
          onClick={openAddModal}
          className="bg-slate-500 text-white px-4 py-2 rounded-2xl"
        >
          Add Course
        </Button>
      </div>
      <Table
        data={mappedCourses}
        columns={columns}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={Math.ceil(courses.length / itemsPerPage)}
        sortBy={sortBy}
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        onSort={handleSort}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
        actions={{ onEdit: openEditModal, onDelete: handleDelete }}
      />
      <Modal
        isOpen={isEditModalOpen}
        toggle={closeEditModal}
        heading="Edit Course"
      >
        {selectedCourse && (
          <UpdateCourseForm
            onSubmit={handleUpdate}
            initialValues={selectedCourse}
          />
        )}
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        toggle={closeAddModal}
        heading="Add Course"
      >
        <AddCourseForm />
      </Modal>
    </div>
  );
};

export default CourseAdmin;
