import React from "react";
import { NavLink } from "react-router-dom";

function MenuLink(props) {
  return (
    <li>
      <NavLink
        activeStyle={{ "color": "#1780CC" }}
        to={props.dest}
      >
        {props.name}
      </NavLink>
    </li>
  );
}

export default MenuLink;
