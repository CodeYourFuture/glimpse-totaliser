import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Totaliser from "./Totaliser";

const socket = socketIOClient("/");

class App extends Component {
  constructor() {
    super();
    this.state = {
      total: null
    };
  }

  componentDidMount() {
    socket.on("Total", total => {
      this.setState({ total });
    });
  }

  render() {
    const { total } = this.state;
    return <Totaliser total={total} />;
  }
}

export default App;
