import React from "react";
import { Link } from "react-router-dom";

import HamburgerIcon from "./HamburgerIcon";

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-50">
      <div className="font-bold">MET</div>
      <HamburgerIcon onClick=""/>
      <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
        <ul className="text-base text-gray-50 pt-4 md:flex md:justify-between md:pt-0 ">
          <li>
            <Link className="md:p-4 py-2 block hover:text-yellow-200" to="#">
              Home
            </Link>
          </li>
          <li>
            <Link className="md:p-4 py-2 block hover:text-yellow-200" to="#">
              Transactions
            </Link>
          </li>
          <li>
            <Link className="md:p-4 py-2 block hover:text-yellow-200" to="#">
              History
            </Link>
          </li>
          <li>
            <Link className="md:p-4 py-2 block hover:text-yellow-200" to="#">
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="md:p-4 py-2 block hover:text-yellow-200 text-yellow-300"
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
