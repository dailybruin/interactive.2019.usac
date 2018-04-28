import React from "React";
import SanctionsTable from "./SanctionsTable";
import SanctionsRecent from "./SanctionsRecent";
import "../sass/sanctions.scss";
class SanctionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sanctionData: 1,
      candidates: null,
    };
  }

  getInfo() {
    fetch("https://kerckhoff.dailybruin.com/api/packages/flatpages/usac.elections2018/")
      .then(res => res.json())
      .then(data => {
        const sanctions = data.data["data.aml"].sanctions;
        const candidateData = data.data["data.aml"].profiles;
        const images = data.images.s3;
        candidateData.map(candidate => {
          candidate.candidates.map(indv => {
            if (indv.image) {
              const img = images[indv.image];
              if (img) {
                indv.image = img.url;
              }
            }
          });
        });
        //Get images from Kerckhoff
        console.log(candidateData);
        this.setState({ sanctionData: sanctions, candidates: candidateData });
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
      return (
        <SanctionsTable
          key={position.position}
          positionData={position}
          sanctions={this.state.sanctionData}
          candidateData={position.candidates}
        />
      );
    });
    // Group candidates by position
    return (
      <div>
        <h2>RECENT SANCTIONS</h2>
        <SanctionsRecent sanctions={this.state.sanctionData} />
        {table}
      </div>
    );
  }
}

export default SanctionsPage;
