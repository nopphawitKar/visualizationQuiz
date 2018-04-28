import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Learnability from './Learnability';
import Understandability from './Understandability';
import Footer from './Footer';

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uScores : ["plainText time: -","indent tree time: -","indent tag time: -","table tool time: -"],
      lScores : ["plainText time: -","indent tree time: -","indent tag time: -","table tool time: -"]
    }
  }

  setUScores(scores){
    var newUScore = scores;
    if(scores.length < 4){
      var unscorePart = this.state.uScores.slice(scores.length)
      newUScore = scores.concat(unscorePart)
    }
    this.setState({
      uScores : newUScore
    })
    console.log(scores)
  }

  renderScores(){
    var scoresList = this.state.uScores.map(function(score) {
      return (
        <button type="button" class="btn btn-primary col-md-3">{score}</button>
      );
    }.bind(this));

    return scoresList;
  }

  render() {
    return (
      <div className="Quiz">
        <div class="row pl-md-5 pr-md-5">
          {this.renderScores()}
        </div>
        <div class="row pl-md-5 pr-md-5 pt-md-5">
          <div class="col-md-6 Question-title">จงเลือกกฎความสัมพันธ์ตามโจทย์ที่กำหนดให้</div>
        </div>
        <Understandability setScores={this.setUScores.bind(this)}/>
        {/*<Learnability/>*/}
      </div>
    );
  }
}

export default Quiz;
