import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-blue-700">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
