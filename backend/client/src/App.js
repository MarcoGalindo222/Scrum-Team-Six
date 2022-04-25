
 import React from 'react'

 // We use Route in order to define the different routes of our application
 import { Route, Routes } from "react-router-dom";

 // We import all the components we need in our app
 import Navbar from "./components/navbar";
 import RecordList from "./components/recordList";
 import Edit from "./components/edit";
 import Create from "./components/create";

class App extends React.Component
{
	fields = {
		value: '',
		email: '',
		password: '',
	}
	
	getValue = (event) =>
	{
		const name = event.target.name;
		const value = event.target.value;
		
		this.setState({ [name]: value });
	}
	
	submitHandler = (event) =>
	{
		event.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		
		console.log('Email on submit: ', email);
		console.log('Password on Submit: ', password);
	}
	
	render() //HTML like code
	{
		console.log('State: ', this.state);
		return(
			<div>
				<h1>Input Test</h1>
				
				<form action = "">
					<div>
						<label htmlFor = ""></label>
						<input type = "email" onChange = {this.getValue} name = 'email'/>
					</div>
					
					<div>
						<label htmlFor = ""></label>
						<input type = "password" onChange = {this.getValue} name = 'password'/>
					</div>
					
					<div>
						<label htmlFor = ""></label>
						<input type = "Account ID" onChange = {this.getValue} name = 'Account ID'/>
					</div>
					
					<button onClick = {this.submitHandler} >Submit</button>
				</form>
			</div>
		);
	}
}

 export default App;
