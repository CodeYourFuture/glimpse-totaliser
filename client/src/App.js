import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Totaliser from "./Totaliser";

const socket = socketIOClient("/");

class App extends Component {
  constructor() {
    super();
    this.state = {
      today: 0,
      yesterday: 0
    };
  }

  componentDidMount() {
    socket.on("todaysTotal", total => {
      this.setState({ today: total });
    });
    socket.on("yesterdaysTotal", total => {
      this.setState({ yesterday: total });
    });
  }

  render() {
    return <Totaliser totals={this.state} />;
  }
}

export default App;
