import React from "react";
import SidebarItem from "../../components/Sidebar/SidebarItem";
import { RiAdminFill } from "react-icons/ri";
import { BsBookHalf } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { RiMailCheckFill } from "react-icons/ri";
import { MdLibraryBooks } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="bg-slate-700 h-full w-60 text-left">
      <div className="p-4">
        <ul>
          <SidebarItem icon={RiAdminFill} text="Admin" />
          <SidebarItem icon={BsBookHalf} text="Courses" />
          <SidebarItem icon={BsGraphUpArrow} text="Revenue" />
          <SidebarItem icon={MdCurrencyRupee} text="Income" />
          <SidebarItem icon={RiCoinsFill} text="Expense" />
          <SidebarItem icon={FaUserCircle} text="User Roles" />
          <SidebarItem icon={FaUserPlus} text="All Enrolled Users" />
          <SidebarItem icon={FaUsers} text="All Users" />
          <SidebarItem icon={FaUserCheck} text="All Active Users" />
          <SidebarItem icon={GiTakeMyMoney} text="Salary Annexure" />
          <SidebarItem icon={FaRegCalendarCheck} text="Attendance Records" />
          <SidebarItem icon={MdPayments} text="Payroll Processing" />
          <SidebarItem icon={IoMdMail} text="Relieving Letter" />
          <SidebarItem icon={RiMailCheckFill} text="Offer Letter" />
          <SidebarItem icon={MdLibraryBooks} text="Available Courses" />
          <SidebarItem icon={FaBookReader} text="Faculty" />
          <SidebarItem icon={IoAddCircle} text="Enrollment" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
