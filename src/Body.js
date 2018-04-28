import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Quiz from './Quiz';
import Footer from './Footer';

class Body extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Quiz</h1>
        </header>
        <Quiz></Quiz>
        <Footer></Footer>
      </div>
    );
  }
}

export default Body;
