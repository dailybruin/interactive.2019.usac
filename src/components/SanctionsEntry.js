import React from "react";

class SanctionsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return(
      <div>
        This is an element.
      </div>
    )
  }
}

export default SanctionsEntry;
