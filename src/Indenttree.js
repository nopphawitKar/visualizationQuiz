import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import * as d3 from "d3";
import { select } from 'd3-selection';

import * as indenttreeGraph from './d3Graph/Indenttree.js'; 

class Indenttree extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  questionNo : 0,
		  visible : false,
		  timeUse: 0
		}
	 }

	updateByClick(node){
		// var firstNode = null;
		var userAnswerNodes = [];
		while(node.parent){
			// console.log(node.data.name)
			userAnswerNodes.push(node.data.name);
			node = node.parent;
			// firstNode = node;
		}

		var currentAnswer = this.props.question[this.state.questionNo].text;
		if(this.isCorrectAnswer(userAnswerNodes, currentAnswer)){
			if(this.state.questionNo == this.props.question.length - 1){
				console.log("end");
				this.end()
			}

			this.setState({
				questionNo : ++this.state.questionNo
			})
		}
	}

	isCorrectAnswer(userAnswerNodes, currentAnswer){
		userAnswerNodes = userAnswerNodes.reverse()
		userAnswerNodes = userAnswerNodes.toString()

		currentAnswer = currentAnswer.replace(/ /g,'')
		currentAnswer = currentAnswer.replace("{", "")
		currentAnswer = currentAnswer.replace("}", "")
		currentAnswer = currentAnswer.replace("-->", ",")

		if(userAnswerNodes === currentAnswer){
			return true;
		}
		return false;
	}

	end(){
		this.props.recorder("Indenttree time: " + this.state.timeUse)
		this.props.updatePage();
	}

	startTime(){
		setInterval(function(){ 
			this.setState({
				timeUse: this.state.timeUse + 1
			})
		}.bind(this), 1000);
	}


	changeVisualizationState(){

		this.startTime();
		this.setState({
			visible : !this.state.visible
		})
		  indenttreeGraph.create(this.props.data, ".indenttreeGraph", this.updateByClick.bind(this));
	}
	
	render() {
		return (
			<div>
				<div class="row pl-md-5 pr-md-5 pt-md-5">
					<div class="col-md-6 col-sm-6 col-xs-6">
						<button type="button" class="btn btn-primary float-left" onClick={() => this.changeVisualizationState()}>Start</button>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-6">
						<div class="float-right">เวลาที่ใช้ {this.state.timeUse} วินาที</div>
					</div>
				</div>
				<div class="row pl-md-5 pr-md-5 pt-md-5">
					<div class="col-md-6 col-sm-6 col-xs-6">
						<div class="indenttreeGraph" style={{visibility: this.state.visible ? 'visible':'hidden'}}></div>
					</div>
				</div>
			</div>
			
		);
	}
}

export default Indenttree;