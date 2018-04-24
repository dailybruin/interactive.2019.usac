import React from "react";
import SanctionsEntry from "./SanctionsEntry";
import { Accordion, AccordionItem } from "react-sanfona";
import "../sass/sanctions.scss";

class SanctionsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // TODO: Map each candidate within the position + their sanctions
      <div>
        <h2>{this.props.positionData.position}</h2>
        <SanctionsEntry />
      </div>
    );
  }
}

export default SanctionsTable;
