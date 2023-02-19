import React from "react";
import { NavLink } from "react-router-dom";
import CalendarIcon from "./Icons/ CalendarIcon";
import ListIcon from "./Icons/ListIcon";
import LogIcon from "./Icons/LogIcon";
import IdeaIcon from "./Icons/IdeaIcon";
import BulbIcon from "./Icons/BuldIcon";

const linkStyles = {
  display: "flex",
  margin: "100px",
  borderStyle: "none",
};

const activeLinkStyle = {
  background: "#f2f2f2",
  color: "#222222",
  borderRadius: "12px",
};

function NavBar() {
  return (
    <div className="navBarContainer">
      <NavLink
        to="/"
        exact
        style={{ linkStyles }}
        activeStyle={{
          background: "#f2f2f2",
          color: "#222222",
          borderRadius: "12px",
        }}
      >
        <LogIcon />
      </NavLink>
      <NavLink
        to="/calendar"
        exact
        style={{ linkStyles }}
        activeStyle={{
          background: "#f2f2f2",
          color: "#222222",
          borderRadius: "12px",
        }}
      >
        <CalendarIcon />
      </NavLink>
      <NavLink
        to="/todo"
        exact
        style={{ linkStyles }}
        activeStyle={{
          background: "#f2f2f2",
          color: "#222222",
          borderRadius: "12px",
        }}
      >
        <ListIcon />
      </NavLink>
      <NavLink
        to="/ideas"
        exact
        style={{ linkStyles }}
        activeStyle={{
          background: "#f2f2f2",
          color: "#222222",
          borderRadius: "12px",
        }}
      >
        <BulbIcon />
      </NavLink>
    </div>
  );
}

export default NavBar;
