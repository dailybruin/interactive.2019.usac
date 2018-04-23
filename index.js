import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import App from "./src/App"

// class HelloMessage extends React.Component {
//   render() {
//     return <div>Hello update {this.props.name}</div>;
//   }
// }

// var mountNode = document.getElementById("app");
// ReactDOM.render(<HelloMessage name="Jane" />, mountNode);



ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'));
