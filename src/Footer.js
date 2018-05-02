import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class Footer extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  style : "absolute"
		}
	 }
	componentDidMount() {
        window.addEventListener("click", this.updateFootter.bind(this));
    }
    updateFootter(){
    	if(document.documentElement.scrollHeight > window.innerHeight){
    		this.setState({
				style : "relative"
			})
    	}else{
    		this.setState({
				style : "absolute"
			})
    	}

    }
	render() {
		
		
		return (
			<div class="footer" style={{position: this.state.style}}>
				<p>Created by: Nopphawit Karunlanchakorn</p>
    			<i class="fa fa-facebook"></i>   
			</div>
		);
	}
}

export default Footer;