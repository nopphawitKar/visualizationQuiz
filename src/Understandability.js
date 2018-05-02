import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import Plaintext from './Plaintext';
import Indenttree from './Indenttree';
import Indenttag from './Indenttag';
import Tabletool from './Tabletool';
import Footer from './Footer';

class Understandability extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scores : [],
      pVisible: true,
      iTreeVisible: false,
      iTagVisible: false,
      tToolVisible: false,
      pageNo: 0
    }
  }

  updatePageNo(){
    this.setState({
      pageNo: ++this.state.pageNo
    })
  }

  recordUsedTime(time){
    console.log(time)
    this.setState({
      times: this.state.scores.push(time)
    })
    this.props.setScores(this.state.scores)
  }

  render() {
    //Understandability
    var understandabilityGraphData = {"name": "begin","children": [{"name": "Popcorn=Y","children": [{"name": "Softdrink=Y","children": [{"name": "{Movie_DVD=Y}", "size": 3938},{"name": "{Snack=Y}", "size": 3938}]}]}]};
    var understandabilityQuestion = [ {text: '{Popcorn=Y, Softdrink=Y} --> {Movie_DVD=Y}', id: '1)'}];

    //Learnability

    return (
      <div className="Understandability">

          {this.state.pageNo==0 && <Plaintext data={understandabilityGraphData} question={understandabilityQuestion} recorder={this.recordUsedTime.bind(this)} updatePage={this.updatePageNo.bind(this)}/>}
          {this.state.pageNo==1 && <Indenttree data={understandabilityGraphData} question={understandabilityQuestion} recorder={this.recordUsedTime.bind(this)} updatePage={this.updatePageNo.bind(this)}/>}
          {this.state.pageNo==2 && <Indenttag data={understandabilityGraphData} question={understandabilityQuestion} recorder={this.recordUsedTime.bind(this)} updatePage={this.updatePageNo.bind(this)} />}
          {this.state.pageNo==3 && <Tabletool data={understandabilityGraphData} question={understandabilityQuestion} recorder={this.recordUsedTime.bind(this)} updatePage={this.updatePageNo.bind(this)} />}
      </div>
    );
  }
}

export default Understandability;