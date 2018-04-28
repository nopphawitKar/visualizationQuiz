import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Plaintext from './Plaintext';
import Indenttree from './Indenttree';
import Indenttag from './Indenttag';
import Tabletool from './Tabletool';

class Learnability extends Component {
  render() {
    return (
      <div className="Learnability">
        Learnability
        <Plaintext/>
        <Indenttree/>
        <Indenttag/>
        <Tabletool/>
      </div>
    );
  }
}

export default Learnability;