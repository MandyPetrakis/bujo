import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarIcon, ListIcon, BulbIcon, LogIcon, Logo } from "./Icons";

const linkStyles = {
  display: "flex",
  margin: "10px",
  borderStyle: "none",
};

function NavBar() {
  return (
    <>
      <div className="navBarContainer">
        <div className="logo">Intent</div>
        <div className="links">
          <NavLink
            to="/"
            exact
            style={{ linkStyles }}
            activeStyle={{
              borderBottom: "4px solid #405952",
            }}
          >
            <LogIcon />
          </NavLink>
          <NavLink
            to="/calendar"
            exact
            style={{ linkStyles }}
            activeStyle={{
              borderBottom: "4px solid #405952",
            }}
          >
            <CalendarIcon />
          </NavLink>
          <NavLink
            to="/todo"
            exact
            style={{ linkStyles }}
            activeStyle={{
              borderBottom: "4px solid #405952",
            }}
          >
            <ListIcon />
          </NavLink>
          <NavLink
            to="/ideas"
            exact
            style={{ linkStyles }}
            activeStyle={{
              borderBottom: "4px solid #405952",
            }}
          >
            <BulbIcon />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NavBar;
