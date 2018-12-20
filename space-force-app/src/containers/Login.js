import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import axios from "axios";


//To pass the message to main
class Message extends Component{
    render(){
        return(
            <div className="message">
                {this.props.content}
            </div>
        );
     }
}


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""

    };
  }




  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }


//Start of login handler by Edwin
  loginHandler(event) {
    this.setState({
        username: event.target.username,
        password: event.target.password
    })
  }

  loginHandler = () => {
    const myData = new FormData();
    const userInfo = {
        username: this.state.username,
        password: this.state.password
    };
    myData.append("myjsonkey", JSON.stringify(userInfo));
    axios({
        method: 'POST',
        url: '/api/login',
        data: myData
    })
    .then(res => {
               console.log(res);
           }).catch((e) => {
               console.log(e);
           });
  }



  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            onClick={this.loginHandler}
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}