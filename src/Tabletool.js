import React, { Component } from 'react';

class Tabletool extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  questionNo : 0,
		  visible : false,
		  selectedNodes : [],
		  timeUse: 0
		}

		this.onSelectChange = this.onSelectChange.bind(this)
	 }

	 startTime(){
		setInterval(function(){ 
			this.setState({
				timeUse: this.state.timeUse + 1
			})
		}.bind(this), 1000);
	}

	onStart(){
		this.setState({
			visible : !this.state.visible
		})
		this.startTime();
	}

	onSelectChange(e){
		
		var selectId = e.target.id.replace("select", "");
		selectId = parseInt(selectId);
		var newSelectedNodes = [];
		if(selectId == this.state.selectedNodes.length){
			{/*push new dropdown value*/}
			console.log("add")
			newSelectedNodes = this.state.selectedNodes.concat([e.target.value])
		}else if(selectId == this.state.selectedNodes.length - 1){
			console.log("delete and add")
			newSelectedNodes = this.state.selectedNodes.slice(0, selectId);
			newSelectedNodes = newSelectedNodes.concat([e.target.value])
		}else{
			{/*delete dropdown values*/}
			console.log("delete")
			newSelectedNodes = this.state.selectedNodes.slice(0, selectId);
		}

		this.updateSelectedNode(newSelectedNodes);
		var questionNo = this.state.questionNo;
		var questionText = this.props.question[questionNo].text;
		if(this.isConsequent(newSelectedNodes) && this.isCorrectAnswer(newSelectedNodes, questionText)){
			if(questionNo == this.props.question.length-1){
				this.end();
			}
			this.updateQuestionNo();
		}
	}
	end(){
		this.props.recorder("tabletool time: " + this.state.timeUse);
		this.props.updatePage();
	}

	updateQuestionNo(){
		this.setState({
			questionNo : ++this.state.questionNo
		})
	}
	updateSelectedNode(newSelectedNodes){
		this.setState({
			selectedNodes : newSelectedNodes
		});
	}

	isConsequent(updatedSelectedNode){
		var nodes = this.props.data.children;
		for(var tierIndex=0;tierIndex<updatedSelectedNode.length;tierIndex++){
			var nodeIndex = updatedSelectedNode[tierIndex];
			console.log("tierindex "+tierIndex + "nodes" + JSON.stringify(nodes) + " updateNodes "+JSON.stringify(updatedSelectedNode));
			console.log(" current node "+nodes[nodeIndex].name + " nodeIndex "+nodeIndex + "updatedSelectedNode length" + updatedSelectedNode.length);

			nodes = nodes[nodeIndex].children;
		}

		if(!nodes){
			return true;
		}
		return false;
	}

	isCorrectAnswer(updatedSelectedNodes, currentAnswer){
		var tierNodes = this.props.data.children;
		var userAnswer = "";
		for(var tierNo=0;tierNo<updatedSelectedNodes.length;tierNo++){
			var nodeIndex = updatedSelectedNodes[tierNo];
			var tierNodeName = tierNodes[nodeIndex].name;
			(tierNo == updatedSelectedNodes.length-1)? userAnswer += tierNodeName : userAnswer += tierNodeName + ",";
			tierNodes = tierNodes[nodeIndex].children;
		}


		currentAnswer = currentAnswer.replace(/ /g,'')
		currentAnswer = currentAnswer.replace("{", "")
		currentAnswer = currentAnswer.replace("}", "")
		currentAnswer = currentAnswer.replace("-->", ",")

		if(userAnswer === currentAnswer){
			return true;
		}
		return false;
	}

	showAllDropdowns(){
		if(this.state.selectedNodes.length === 0){
			return (
				<select id="select0" onChange={this.onSelectChange} class="col-md-3 col-sm-3 col-xs-3 pl-sm-0 pr-sm-0 selectpicker">
					<option disabled="disabled" selected="selected">Select an option.</option>
					{this.getOptionList()}
				</select>
			);
		}else{
			var selectList = this.state.selectedNodes.map(function(node, index) {
				var selectId = "select"+index;
				return (
					<select id={selectId} onChange={this.onSelectChange} class="col-md-3 col-sm-3 col-xs-3 pl-sm-0 pr-sm-0 selectpicker">
						<option disabled="disabled" selected="selected">Select an option.</option>
						{this.getOptionList(index)}
					</select>
				);
			}.bind(this));

			if(!this.isConsequent(this.state.selectedNodes)){
				var newSelectList = [0].map(function(node) {
				var selectId = "select" + this.state.selectedNodes.length;
					return (
						<select id={selectId} onChange={this.onSelectChange} class="col-md-3 col-sm-3 col-xs-3 pl-sm-0 pr-sm-0 selectpicker">
							<option disabled="disabled" selected="selected">Select an option.</option>
							{this.getOptionList(this.state.selectedNodes.length)}
						</select>
					);
				}.bind(this));
				selectList = selectList.concat(newSelectList)
			}

			return selectList;
		}
	}

	getOptionList(tier){
		var parentList = this.props.data.children;
		

		var parentNodeNumber = 0;
		for(var i=0;i<tier;i++){
			parentNodeNumber = this.state.selectedNodes[i];
			var parentNode = parentList[parentNodeNumber];
			parentList = parentNode.children;
		}
		if(!parentList){return}
		var optionList = parentList.map(function(node, index) {
			if(this.state.selectedNodes[tier]==index){
				return(<option value={index} selected>{node.name}</option>)
			}else{
				return(<option value={index}>{node.name}</option>);
			}
			
		}.bind(this));


		return optionList;
	}

	render() {
		return (
			<div>
				<div class="row pl-md-5 pr-md-5 pt-md-5">
					<div class="col-md-6 col-sm-6 col-xs-6">
						<button type="button" class="btn btn-primary float-left" onClick={() => this.onStart()}>Start</button>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-6">
						<div class="float-right" onClick={() => this.end()}>เวลาที่ใช้ {this.state.timeUse} วินาที</div>
					</div>
				</div>
				<div class="row pl-md-5 pr-md-5 pt-md-5">
          			 <div class="Question-title col-md-6">{this.state.questionNo + 1}. {this.props.question[this.state.questionNo].text}</div>
				</div>
				<div class="row pl-md-5 pr-md-5 pt-md-5" style={{visibility: this.state.visible ? 'visible':'hidden'}}>
					{this.showAllDropdowns()}
					{this.state.selectedNodes}
					question{this.state.questionNo}
				</div>
			</div>
		);
	}
}

export default Tabletool;