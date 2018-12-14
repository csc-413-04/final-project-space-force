import React from "react";
import "./Post.css";
import { Panel } from "react-bootstrap";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import testimg from './testimg.jpg';



const post = (props) => {
    return (
        <Grid>
            <Row className = "post-grid">
            <Col xs={5} md ={3}></Col>
            <Col xs={8} md ={6}>
                <Panel>
                <Panel.Heading>
                <h2>{props.username}</h2>
                </Panel.Heading>
                <Panel.Body>
                <img width= {360} height = {360} src={testimg} />
                </Panel.Body>
                <Panel.Footer>
                <h5>
                   {props.description}
                </h5>
                </Panel.Footer>
                </Panel>
            </Col>
            <Col xs={5} md ={3}></Col>
            </Row>
           
        </Grid>
        

        
        
        
    
    );
    
};

export default post;