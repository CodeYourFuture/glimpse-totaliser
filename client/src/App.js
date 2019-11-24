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
    socket.on("FromAPI", data => {
      console.log("received data from server");
      this.setState({ response: data });
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <p>The temperature in Florence is: {response} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
