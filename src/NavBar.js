import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  margin: "10px",
  paddingTop: "5px",
  paddingBottom: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
  background: "#222222",
  borderStyle: "none",
  borderRadius: "12px",
  fontSize: "15px",
  color: "#f2f2f2",
  textDecoration: "none",
};

function NavBar() {
  return (
    <div className="navBar">
      <NavLink
        to="/"
        exact
        className="link"
        style={linkStyles}
        activeStyle={{ background: "#f2f2f2", color: "#222222" }}
      >
        Rapid Log
      </NavLink>
      <NavLink
        to="/calendar"
        exact
        style={linkStyles}
        activeStyle={{ background: "#f2f2f2", color: "#222222" }}
      >
        Monthly View
      </NavLink>
      <NavLink
        to="/todo"
        exact
        className="link"
        style={linkStyles}
        activeStyle={{ background: "#f2f2f2", color: "#222222" }}
      >
        Tasks
      </NavLink>
      <NavLink
        to="/ideas"
        exact
        className="link"
        style={linkStyles}
        activeStyle={{ background: "#f2f2f2", color: "#222222" }}
      >
        Ideas
      </NavLink>
    </div>
  );
}

export default NavBar;
