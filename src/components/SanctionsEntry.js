import React from "react";
/*
key={c.name}
name={c.name}
slate={c.slate}
image={c.image}
count={c.sanctionCount}
list={c.sanctionList} */
class SanctionsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.toggleList = this.toggleList.bind(this);
  }

  toggleList(e) {
    const current = this.state.active;
    this.setState({ active: !current });
  }

  render() {
    let list = this.props.list.map(sanctions => {
      return (
        <div className="sanction-list-entry">
          <div className="entry-title">{sanctions.title}</div>
          <div className="entry-time">{sanctions.time}</div>
          <hr />
        </div>
      );
    });

    return (
      <div
        className={
          this.state.active ? "sanctions-entry active" : "sanctions-entry"
        }
      >
        <div onClick={this.toggleList} className="entry-header">
          <div className="photo">
            <img src={this.props.image} />
          </div>
          <div className="info">
            <div className="name">{this.props.name}</div>
            <div className="slate">{this.props.slate.toUpperCase()}</div>
          </div>
          <div className="score">{this.props.count}</div>
        </div>
        <div className="entry-body">{list}</div>
      </div>
    )
  }
}

export default SanctionsEntry;
