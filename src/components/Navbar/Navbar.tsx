import React from "react";
import avtarImage from "../../assets/images/th (1).jpeg";
import Logo from "../../assets/images/WhatsApp Image 2024-04-16 at 21.57.35_8732235d.jpg";
import Header from "../Forms/Header/Header";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-slate-600">
          <img src={Logo} className="w-20" />
        </div>
        <div className="ml-3  text-cyan-50 hover:text-cyan-100 font-serif font-extrabold">
          <Header text="Scholar's Academy" className="text-3xl font-bold" />
        </div>
      </div>
      <div className="max-w-7xl flex">
        <div className="flex space-x-4 pt-2 mr-3">
          <a href="#" className="hover:text-gray-300 cursor-pointer">
            Home
          </a>
          <a href="#" className="hover:text-gray-300 cursor-pointer">
            About
          </a>
          <a href="#" className="hover:text-gray-300 cursor-pointer">
            Contact
          </a>
          <a href="#" className="hover:text-gray-300 cursor-pointer">
            Sign out
          </a>
        </div>
        <img src={avtarImage} alt="" className="w-10 h-10 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;
