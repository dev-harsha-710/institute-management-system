import React from "react";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
  icon: IconType;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text }) => {
  return (
    <li className="text-gray-300 mb-4 hover:text-white cursor-pointer flex items-center">
      <Icon className="w-6 h-6 mr-2" />
      {text}
    </li>
  );
};

export default SidebarItem;
