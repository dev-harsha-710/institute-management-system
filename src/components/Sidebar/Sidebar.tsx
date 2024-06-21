import React from "react";
import SidebarItem from "./SidebarItem";
import { RiAdminFill } from "react-icons/ri";
import { BsBookHalf, BsGraphUpArrow } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import {
  FaUserCircle,
  FaUserPlus,
  FaUsers,
  FaUserCheck,
  FaRegCalendarCheck,
  FaBookReader,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { RiMailCheckFill } from "react-icons/ri";
import { MdLibraryBooks } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="bg-slate-700 h-full w-60 text-left">
      <div className="p-4">
        <ul>
          <SidebarItem icon={RiAdminFill} text="Admin" to="/admin" />
          <SidebarItem icon={BsBookHalf} text="Courses" to="/" />
          <SidebarItem icon={BsGraphUpArrow} text="Revenue" to="/revenue" />
          <SidebarItem icon={MdCurrencyRupee} text="Income" to="/income" />
          <SidebarItem icon={RiCoinsFill} text="Expense" to="/expense" />
          <SidebarItem icon={FaUserCircle} text="User Roles" to="/user-roles" />
          <SidebarItem
            icon={FaUserPlus}
            text="All Enrolled Users"
            to="/enrolled-users"
          />
          <SidebarItem icon={FaUsers} text="All Users" to="/all-users" />
          <SidebarItem
            icon={FaUserCheck}
            text="All Active Users"
            to="/active-users"
          />
          <SidebarItem
            icon={GiTakeMyMoney}
            text="Salary Annexure"
            to="/salary-annexure"
          />
          <SidebarItem
            icon={FaRegCalendarCheck}
            text="Attendance Records"
            to="/attendance-records"
          />
          <SidebarItem
            icon={MdPayments}
            text="Payroll Processing"
            to="/payroll-processing"
          />
          <SidebarItem
            icon={IoMdMail}
            text="Relieving Letter"
            to="/relieving-letter"
          />
          <SidebarItem
            icon={RiMailCheckFill}
            text="Offer Letter"
            to="/offer-letter"
          />
          <SidebarItem
            icon={MdLibraryBooks}
            text="Available Courses"
            to="/available-courses"
          />
          <SidebarItem icon={FaBookReader} text="Faculty" to="/faculty" />
          <SidebarItem icon={IoAddCircle} text="Enrollment" to="/enrollment" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
