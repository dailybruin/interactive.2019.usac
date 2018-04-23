import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
