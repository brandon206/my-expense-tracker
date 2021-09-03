import React from "react";

const HamburgerIcon = () => {
  return (
    <svg
      xmlns="<http://www.w3.org/2000/svg>"
      id="menu-button"
      className="h-6 w-6 cursor-pointer md:hidden block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default HamburgerIcon;
