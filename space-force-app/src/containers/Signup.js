import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";



export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmpassword;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  //Edwin Code for signup
  signupHandler = () => {
      const myData = new FormData();
      const userInfo = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
      };
      myData.append("myjsonkey", JSON.stringify(userInfo));
      axios({
          method: 'POST',
          url: '/api/signup',
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
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
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
          <FormGroup controlId="confirmpassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmpassword}
              onChange={this.handleChange}
              type="confirmpassword"
            />
          </FormGroup>
          <LinkContainer to = "/login">
              <Button
                onClick={this.signupHandler}
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Signup
              </Button>
          </LinkContainer>
        </form>
      </div>
    );
  }
}