import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

class Plaintext extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  questionNo : 0,
		  visible : false,
		  timeUse: 0
		}
	 }

	toPlaintext(allRules, rules, parentText){
		var parentText = parentText;

		if(rules.children != null){
			var children = rules.children;

			if(rules.name !== 'begin'){
					parentText += rules.name + ', ';
			}else{
				parentText += '{';
			}

			for(var i in children){
				this.toPlaintext(allRules, children[i], parentText);
			}
		}else{
			parentText = parentText.slice(0, -2);
			parentText = parentText + '} --> ' + rules.name;
			allRules.push(parentText);
		}
	}

	startTime(){
		setInterval(function(){ 
			this.setState({
				timeUse: this.state.timeUse + 1
			})
		}.bind(this), 1000);
	}

	end(){
		this.props.recorder("plainText time: " + this.state.timeUse);
		this.props.updatePage();
	}

	changeVisualizationState(){
		if(this.state.visible == true){return}

		this.setState({
			visible: !this.state.visible
		})
		this.startTime()
	}

	returnOnclickResult(e, data) {
		var answer = this.props.question[this.state.questionNo].text;
		if(data != answer){
			console.log("incorrect");
			return;
		}
		if(this.state.questionNo == this.props.question.length - 1){
			console.log("out of question");
			this.end()
			return;
		}

		this.setState({
		    questionNo: this.state.questionNo + 1
	    })

	};

	renderPlaintext(){
		var wekaData = null;
		var allRules = [];
		console.log(this.props.data)
		if(this.props.data != null){
			wekaData = this.props.data;
			this.toPlaintext(allRules, wekaData, "");
		}
		if(allRules !== []){
			console.log('lenght: ' + allRules.length)

			var ruleList = allRules.map(function(rule) {
				return (
					<div value={rule} class="Table-cell col-md-6" onClick={((e) => this.returnOnclickResult(e, rule))}>{rule}</div>
				);
			}.bind(this));
			return ruleList;
		}
		
		return <div value={"text"}>{"text"}</div>;
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
          			 <div class="Question-title col-md-6">{this.state.questionNo + 1}. {this.props.question[this.state.questionNo].text}</div>
				</div>
				<div className="Plaintext" class="row pl-md-5 pr-md-5 pt-md-5">
					{this.state.visible && this.renderPlaintext()}
				</div>
			</div>
		);
	}
}

export default Plaintext;