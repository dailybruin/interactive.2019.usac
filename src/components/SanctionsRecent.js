import React from "react";

class SanctionsRecent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let firstThree = this.props.sanctions.slice(0, 3);
    let count = 0;
    const recents = firstThree.map(sanction => {
      return <div>{sanction.link}</div>;
    });

    return <div>{recents}</div>;
  }
}

export default SanctionsRecent;
