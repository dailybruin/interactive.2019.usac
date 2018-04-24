import React from "React";
import SanctionsTable from "./SanctionsTable";
class SanctionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sanctionData: 1,
      candidates: null
    };
  }

  getInfo() {
    fetch("https://kerckhoff.dailybruin.com/api/packages/flatpages/usac.elections2018/")
      .then(res => res.json())
      .then(data => {
        const sanctions = data.data["data.aml"].sanctions;
        const candidateData = data.data["data.aml"].profiles;
        this.setState({ sanctionData: sanctions, candidates: candidateData });
        // candidateData.map(position => {
        //   console.log(position);
        //   this.setState({ post_data: data, candidates: position });
        // });
      });
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    // We want to separate sanctions (if one has multiple recipients create a sanction for each one)
    // Then we want to group the sanctions by candidate
    let table;
    if (!this.state.candidates) {
      return <div>Loading...</div>;
    }
    table = this.state.candidates.map(position => {
      return <SanctionsTable key={position.position} positionData={position} />;
    });
    // Group candidates by position

    return (
      <div>
        {/* TODO: Map each sanctions table to a different position */}
        {table}
      </div>
    );
  }
}

export default SanctionsPage;
