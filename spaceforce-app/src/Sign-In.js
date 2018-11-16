import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Sign-In.css";

export default class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username : "",
            password : ""

        };
    }

    validateForm() {
        return this.state.username.lenth > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState ({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event=> {
        event.preventDefualt();
    }

    render(){
        return(
            <div className = "Signin">
                <form onSubmit = {this.handleSubmit}>
                    <FormGroup conrolId = "username" bsSize = "large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl autoFocus type="username" value = {this.state.username} onChange = {this.handleChange} />
                    </FormGroup>
                    <FormGroup controlID = "password" bSize = "large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl autoFocus type="password" value = {this.state.password} onChange = {this.handleChange} />
                    </FormGroup>
                    <Button block bsSize = "large" disaled = {!this.validateForm()} type="submit">
                        Sign-In
                    </Button>
                </form>
            </div>
        );
    }
}