import React from "react";
import { NavLink } from "react-router-dom";

function MenuLink(props) {
  return (
    <li>
      <NavLink
        activeStyle={{ "borderBottom": "5px solid #FFE491" }}
        to={props.dest}
      >
        {props.name}
      </NavLink>
    </li>
  );
}

export default MenuLink;
