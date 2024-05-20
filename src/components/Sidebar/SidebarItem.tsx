import React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: IconType;
  text: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, to }) => {
  return (
    <li className="text-gray-300 mb-4 hover:text-white cursor-pointer flex items-center">
      <Link to={to} className="flex items-center">
        <Icon className="w-6 h-6 mr-2" />
        {text}
      </Link>
    </li>
  );
};

export default SidebarItem;
