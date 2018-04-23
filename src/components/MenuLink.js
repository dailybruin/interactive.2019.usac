import React from "react";
import { NavLink } from "react-router-dom";

function MenuLink(props) {
  return (
    <li>
      <NavLink
        activeStyle={{ "text-decoration": "underline #FFE491 solid" }}
        to={props.dest}
      >
        {props.name}
      </NavLink>
    </li>
  );
}

export default MenuLink;
