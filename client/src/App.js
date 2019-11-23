import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
// const socketLink = socketIOClient('http://localhost:5000');

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      endpoint: 'http://localhost:5000/api/transaction'
    };
  }

  // componentDidMount() {
  //     // Call our fetch function below once the component mounts
  //     function socket(item) {
  //       socketLink.on('timer', timestamp => item(null, timestamp));
  //       socketLink.emit('socket', 1000);
  //     }
  //     console.log(socket);
      
      componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("totalPrice", data => this.setState({ response: data }));
        console.log(socket);
      }
      
      
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    msg = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        // Render the newly fetched data inside of this.state.data 
        <p className="App-intro">{this.state.data}</p>
        <p className="App-intro"> This is the timer value: {this.state.endpoint} </p>
    
      </div>
    );
  }
}

export default App;