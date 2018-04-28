import React, { Component } from 'react';
import $ from 'jquery';
// import logo from './logo.svg';
// import './App.css';

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


	onSelectChange(e){
		var selectId = e.target.id.replace("select", "");
		selectId = parseInt(selectId);
		var newSelectedNodes = [];
		if(selectId == this.state.selectedNodes.length){
			{/*push new dropdown value*/}
			newSelectedNodes = this.state.selectedNodes.concat([e.target.value])
		}else{
			{/*delete dropdown values*/}
			newSelectedNodes = this.state.selectedNodes.slice(0, selectId+1);
		}

		this.setState({
			selectedNodes : newSelectedNodes
		})
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
			var newSelectList = [0].map(function(node) {
				var selectId = "select" + this.state.selectedNodes.length;
				return (
					<select id={selectId} onChange={this.onSelectChange} class="col-md-3 col-sm-3 col-xs-3 pl-sm-0 pr-sm-0 selectpicker">
						<option disabled="disabled" selected="selected">Select an option.</option>
						{this.getOptionList(this.state.selectedNodes.length)}
					</select>
				);
			}.bind(this));
			selectList = selectList.concat(newSelectList);
			return selectList;
		}
	}

	getOptionList(tier){
		var parentList = this.props.data.children;
		

		var parentNodeName = null;
		for(var i=0;i<tier;i++){
			parentNodeName = this.state.selectedNodes[i];
			var parentNode = parentList.find(function(node){
				return node.name == parentNodeName;
			}.bind(this))
			parentList = parentNode.children;
		}
		if(parentList == undefined){return}
		var optionList = parentList.map(function(node) {
			return (
				<option value={node.name}>{node.name}</option>
			);
		}.bind(this));

		return optionList;
	}

	render() {
		return (
		<div class="row pl-md-5 pr-md-5 pt-md-5">
			{this.showAllDropdowns()}
			<div>{this.state.selectedNodes.length}</div>
		</div>
		);
	}
}

export default Tabletool;