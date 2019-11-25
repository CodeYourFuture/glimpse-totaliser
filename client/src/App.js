import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("/");

class App extends Component {
  constructor() {
    super();
    this.state = {
    response: ""
    };
  }

  componentDidMount() {
    socket.on("Total", data => {
      console.log("received data from server", data);
      this.setState({ response: data});
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
      {response
          ? <p> Total: {response} </p>
          : <p>Loading...</p>}
    </div>
    );
  }
}

export default App;