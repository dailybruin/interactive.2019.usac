import React from "react";
import { Link } from "react-router-dom";
import "../sass/navbar.scss";

class Navbar extends React.Component {
  render() {
    return(
      <nav>
        <header>USAC Elections 2018</header>
        <ul className="links">
          <li><Link to="/">CANDIDATES</Link></li>
          <li><Link to="/violations">VIOLATIONS</Link></li>
          <li><Link to="/endorsements">ENDORSEMENTS</Link></li>
          <li><Link to="/results">RESULTS</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
