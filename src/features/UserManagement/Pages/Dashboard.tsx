import React from "react";

const Dashboard = () => {
  return (
    <div className="mt-6 w-80 bg-slate-700 text-white rounded-lg overflow-hidden shadow-md">
      <div className="px-4 py-3 text-left">
        <h5 className="text-blue-gray mb-2 text-lg font-bold">Student</h5>
        <h4 className="text-blue-gray mb-2 text-lg font-bold">153</h4>
        <p className="text-sm text-white">24 new since late visit</p>
      </div>
    </div>
  );
};

export default Dashboard;
