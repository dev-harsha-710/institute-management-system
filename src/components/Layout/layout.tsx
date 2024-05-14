import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ sidebar }: { sidebar: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex">
        <div className="w-1/5">{sidebar}</div>
        <div className="w-4/5 p-5">
          <Outlet />
        </div>
      </div>
      <Footer year="2024" />
    </div>
  );
};

export default Layout;
