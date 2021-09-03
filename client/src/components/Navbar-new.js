import { Link } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"
import NavbarLinks from "./NavbarLinks"

const Navigation = styled.nav`
  height: 10vh;
  display: flex;
  color: #ffffff;
  position: relative;
  justify-content: space-between;
  margin: 0 auto;
  z-index: 2;
  align-items: center;
  align-self: center;
  width: 100%;
  @media (max-width: 768px) {
    position: sticky;
    height: 8vh;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
  }
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`

const Navbox = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    width: 100%;
    justify-content: flex-start;
    padding-top: 10vh;
    transition: all 0.3s ease-in;
    top: 10vh;
    left: ${props => (props.open ? "-100%" : "0")};
  }
`

const Hamburger = styled.div`
  background-color: #FCD34D;
  width: 30px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #FCD34D;
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${props =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? "0" : "1")};
    transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
`
const NavbarNew = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <Navigation className="container w-4/5 px-4">
      <Link to="/" aria-label="home">
        <h1 className="text-3xl font-bold m-0">MET</h1>
      </Link>
      <Toggle
        navbarOpen={navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {navbarOpen ? <Hamburger open /> : <Hamburger />}
      </Toggle>
      {navbarOpen ? (
        <Navbox>
          <NavbarLinks
            navbarOpen={navbarOpen}
            setNavbarOpen={setNavbarOpen}
          />
        </Navbox>
      ) : (
        <Navbox open className="px-4">
          <NavbarLinks />
        </Navbox>
      )}
    </Navigation>
  )
}

export default NavbarNew
