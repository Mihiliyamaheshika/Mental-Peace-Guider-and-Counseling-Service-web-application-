import React from "react";

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between bg-white shadow-md px-6 py-2 h-12">
      {/* Logo - Right aligned */}
      <img src="/logo.png" alt="MindPeace Logo" className="h-8 w-auto ml-auto" />
      
      {/* Navbar Title (you can remove this if you just want the logo) */}
      {/* <h1 className="text-xl font-semibold text-blue-900">Mind Peace</h1> */}
    </header>
  );
};

export default Navbar;
