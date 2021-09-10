import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const NavItem = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 200ms ease-in;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: #FCD34D;
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: #FCD34D;
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`;
const NavbarLinks = ({ onClick, logout, user }) => {
  return (
    <>
      <NavItem onClick={onClick} to="/">
        Home
      </NavItem>
      <NavItem onClick={onClick} to="/transactions">
        Transactions
      </NavItem>
      <NavItem onClick={onClick} to="/history">
        History
      </NavItem>
      <NavItem onClick={onClick} to="/profile">
        Profile
      </NavItem>
      {user ? (
        <button
          className="py-1 w-24 text-xl text-white bg-red-400 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <button
          className="py-1 w-24 text-xl text-white bg-blue-400 rounded-md"
          onClick={onClick}
          to="/login"
        >
          Login
        </button>
      )}
    </>
  );
};

export default NavbarLinks;
