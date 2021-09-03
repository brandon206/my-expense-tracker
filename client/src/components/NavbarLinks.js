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
`
const NavbarLinks = ({ navbarOpen, setNavbarOpen }) => {
  const handleLinkClick = e => {
    setNavbarOpen(!navbarOpen);
  }
  return (
    <>
      <NavItem onClick={handleLinkClick} to="/">
        Home
      </NavItem>
      <NavItem onClick={handleLinkClick} to="/transactions">
        Transactions
      </NavItem>
      <NavItem onClick={handleLinkClick} to="/history">
        History
      </NavItem>
      <NavItem onClick={handleLinkClick} to="/profile">
        Profile
      </NavItem>
      <button className="py-1 w-24 text-xl text-white bg-blue-400 rounded-md" onClick={handleLinkClick} to="/login">
        Login
      </button>
    </>
  )
}

export default NavbarLinks
