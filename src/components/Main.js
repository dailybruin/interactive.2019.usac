import React from "react";
import { Switch, Route } from "react-router-dom";
import EndorsementsPage from "./EndorsementsPage";
import ResultsPage from "./ResultsPage";
import SanctionsPage from "./SanctionsPage";
import ProfilePage from "./ProfilesPage";
import RelatedStories from "./RelatedStories";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/candidates" component={ProfilePage} />
          <Route path="/endorsements" component={EndorsementsPage} />
          <Route path="/results" component={ResultsPage} />
          <Route path="/violations" component={SanctionsPage} />
          <Route path="/related" component={RelatedStories} />
        </Switch>
      </div>
    );
  }
}

export default Main;
