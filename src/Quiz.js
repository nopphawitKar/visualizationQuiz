import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Stepper from 'react-stepper-horizontal';
import Learnability from './Learnability';
import Understandability from './Understandability';
import Footer from './Footer';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-directional-buttons/dist/bootstrap-directional-buttons.css';

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: [{
        title: 'Learnability 1 : plain text'
      }, {
        title: 'Learnability 2 : indent tree'
      }, {
        title: 'Learnability 3 : indent tag'
      }, {
        title: 'Learnability 4 : table tool'
      },{
        title: 'Learnability 1 : plain text'
      }, {
        title: 'Learnability 2 : indent tree'
      }, {
        title: 'Learnability 3 : indent tag'
      }, {
        title: 'Learnability 4 : table tool'
      }],
      currentStep : 0,
      graphTypeCount : 4,
      currentQuizGroup : 0,
      scores : []
    }
  }

  updateScores(score){
    var newScore = [score];
    this.setState({
      scores : this.state.scores.concat(newScore),
      currentStep : ++this.state.currentStep
    })
    if(this.state.currentStep == this.state.graphTypeCount){
      this.setState({
        currentQuizGroup : ++this.state.currentQuizGroup
      })
    }
  }


  render() {
    return (
      <div className="Quiz">
        <div class="row pl-md-5 pr-md-5">
          <Stepper steps={this.state.steps} activeStep={this.state.currentStep} />
        </div>
        <div class="row pl-md-5 pr-md-5 pt-md-5">
          <div class="col-md-6 Question-title" >จงเลือกกฎความสัมพันธ์ตามโจทย์ที่กำหนดให้</div>
        </div>
        {this.state.currentQuizGroup==0 && <Understandability setScores={this.updateScores.bind(this)}/>}
        {this.state.currentQuizGroup==1 && <Learnability setScores={this.updateScores.bind(this)}/>}
      </div>
    );
  }
}

export default Quiz;
