import React from "react";
import "../../scss/style.scss";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { When } from "react-if";
import { LoginContext } from "../../context/Login-context";
import { useContext } from "react";
export default function Header() {
  const login = useContext(LoginContext);
  return (
    <>
      <Navbar className="Navbar">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>To Do</Navbar.Heading>
          <Navbar.Divider />
          <Link to="/">
            <Button className="bp3-minimal" icon="home" text="Home" />
          </Link>

          <Link to="/settings">
            <Button className="bp3-minimal" icon="settings" text="Settings" />
          </Link>
        </Navbar.Group>
        <When condition={login.loggedIn}> 
        <button
          onClick={() => {
            login.logout();
          }}
        >
          {" "}
          LogOut
        </button>
        </When>
      </Navbar>
    </>
  );
}
