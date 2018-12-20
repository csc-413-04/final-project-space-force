import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, FormGroup, FormControl, Button,Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { connect } from 'react-redux';
import {loadUserid} from './redux/actions';
//Extra
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  
  ComponentDidMount(){
    this.props.loadUserid('user1');
    /*axios.get('/api/messages')
    .then((res) => {
        console.log(res.data);
        this.props.loadAllMessages(res.data);
    }).catch((e) => {
        console.log(e);
    });*/
  }

  render() {
    return (
    <Router>
      <div className="App container">
        <Navbar fluid collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Welcome {this.props.userid}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

             <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search For Users" />
              </FormGroup>{' '}
              <Button type="submit">Search</Button>
            </Navbar.Form>

           
            <Nav pullRight>
            
              <LinkContainer to = "/upload">
                <NavItem href="/upload"><Glyphicon glyph="plus"/>Upload</NavItem>
              </LinkContainer>
              <LinkContainer to = "/signup">
                <NavItem href="/signup">Signup</NavItem>
              </LinkContainer>
              <LinkContainer to = "/login">
                <NavItem href="/login">Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      userid : state.testReducer.userid,
  };
};

const mapDispatchToProps = {loadUserid};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);