import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, FormGroup, FormControl, Button,Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Space Force</Link>
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
    );
  }
}

export default App;