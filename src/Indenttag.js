import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import * as indenttagGraph from './d3Graph/Indenttag.js'; 
class Indenttag extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  questionNo : 0,
		  visible : false,
		  timeUse: 0
		}
	 }

	componentDidMount(){
		  indenttagGraph.create(this.props.data, ".indenttagGraph", this.updateByClick.bind(this));
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

	changeVisualizationState(){
		this.startTime();
		this.setState({
			visible : !this.state.visible
		})
	}

	startTime(){
		setInterval(function(){ 
			this.setState({
				timeUse: this.state.timeUse + 1
			})
		}.bind(this), 1000);
	}

	end(){
		this.props.recorder("Indenttag time: " + this.state.timeUse)
		this.props.updatePage();
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
				    <div class="indenttagGraph" style={{visibility: this.state.visible ? 'visible':'hidden'}}></div>
				  </div>
				</div>
			</div>
		);
	}
}

export default Indenttag;