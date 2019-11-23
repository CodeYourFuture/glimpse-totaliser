import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
// const socketLink = socketIOClient('http://localhost:5000');

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      response: "",
      endpoint: "http://localhost:5000"
    };
  }

      componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("fromAPI", data => console.log("Sattusssssss",data.status))//this.setState({ response: data }));
        console.log(socket);
        console.log("here ");
        
      }
    

  render() {
    const {response} = this.state;
    return (
      <div style={{ textAlign: "center" }}>
      {response
          ? <p>
            The temperature in Florence is: {response} °F
          </p>
          : <p>Loading...</p>}
    </div>

    );
  }
}

export default App;